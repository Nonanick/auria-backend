import { SystemApiListener } from "../system/SystemApiListener.js";
import { ExposedApiRoutesMetadata } from "../ExposedApiEnpointsMetadata.js";
import { SystemApiRoute } from "../system/SystemApiRoute.js";
import { SystemEntityCatalog } from "../../database/schema/SystemEntityCatalog.js";
import Knex from "knex";
import { IEntity } from "../../database/schemaInterface/IEntity.js";

export class EntityListener extends SystemApiListener {
  public get name(): string {
    return "entity";
  }

  public baseUrl(): string {
    return "entity";
  }

  public exposedApiRoutes(): ExposedApiRoutesMetadata {
    return {
      "list/:connection?": {
        functionName: "list",
        httpMethods: ["get", "post"],
        requiresExplicitPermission: false,
        optionalParams: ["connection"],
      },
      "show/:entity": {
        functionName: "show",
        httpMethods: ["get"],
      },
      create: {
        functionName: "create",
        httpMethods: ["post"],
        requiresExplicitPermission: false,
        requiredParams: ["connection_id", "name", "table_name", "title"],
        optionalParams: ["description"],
      },
      synchronize: {
        functionName: "synchronize",
        httpMethods: ["post"],
        requiredParams: ["entity"],
      },
      "update/:entityToBeUpdatedByName": {
        functionName: "update",
        httpMethods: ["put"],
        requiredParams: ["entityToBeUpdatedByName"],
      },
      "delete/:entityToBeDeletedByName": {
        functionName: "delete",
        httpMethods: ["delete"],
        requiredParams: ["entityToBeDeletedByName"],
        optionalParams: ["deleteTable"],
      },
    };
  }

  public list: SystemApiRoute = async (req, sys) => {
    let q = sys
      .getConnection()
      .select("*")
      .from(SystemEntityCatalog.Entity.table_name);

    if (req.parameters.connection) {
      q.where("connection_id", req.parameters.connection);
    }

    return q.then((entities) => {
      return entities ?? [];
    });
  };

  public show: SystemApiRoute = async (req, sys) => {
    let entity = req.parameters.entity;
    return sys
      .getConnection()
      .select("*")
      .from(SystemEntityCatalog.Entity.table_name)
      .where("name", entity)
      .then((res) => {
        return res[0];
      });
  };

  public synchronize: SystemApiRoute = async (req, sys) => {
    let entityInfo = await this.findEntityByName(
      sys.getConnection(),
      req.parameters.entity
    );

    let tableName = entityInfo.table_name;
    let tableConn: Knex =
      entityInfo.connection_id == null
        ? sys.getConnection()
        : await sys.connectionManager().fromId(entityInfo.connection_id);

    let tableExists = await this.tableExistsInConn(tableConn, tableName);
    let tasks: string[] = [];
    if (tableExists) {
      // Implement versioning (?)
    } else {
      // Create table
      await this.createTable(tableConn, tableName, "_id");
      tasks.push("Created table with name " + tableName);
    }

    return "Synchronize table finished, tasks executed:" + tasks.join("\n");
  };

  public update: SystemApiRoute = async (req, sys) => {
    let entity = req.parameters.entityToBeUpdatedByName;
    let entityInfo = await this.findEntityByName(sys.getConnection(), entity);

    let data = { ...req.parameters };
    delete data.entityToBeUpdatedByName;

    let tasks: string[] = [];

    // Rename table in database
    if (data.table_name != null) {
      await this.renameTableInConn(
        sys.getConnection(),
        entityInfo.table_name,
        data.table_name
      );
      tasks.push("Updated table name in database!");
    }

    await sys
      .getConnection()
      .update(data)
      .table(SystemEntityCatalog.Entity.table_name)
      .where("name", entity);
    tasks.push("Update entity info in table!");

    return "Update finished! Tasks executed: " + tasks.join("\n");
  };

  public create: SystemApiRoute = async (req, sys) => {
    let data = {
      status: "active",
      ...req.parameters,
    };

    return sys
      .getConnection()
      .insert(data)
      .into(SystemEntityCatalog.Entity.table_name)
      .then((empty) => {
        return "Inserted into entity table values: " + JSON.stringify(data);
      });
  };

  public delete: SystemApiRoute = async (req, sys) => {
    let entity = req.parameters.entityToBeDeletedByName;
    let tasks: string[] = [];

    if (req.parameters.deleteTable === true) {
      let entityInfo = await this.findEntityByName(sys.getConnection(), entity);
      let tableConn =
        entityInfo.connection_id != null
          ? await sys.connectionManager().fromId(entityInfo.connection_id)
          : sys.getConnection();

      await this.deleteTableInConn(tableConn, entityInfo.table_name);
      tasks.push("Deleted physical table on connection!");
    }

    await sys
      .getConnection()
      .delete()
      .from(SystemEntityCatalog.Entity.table_name)
      .where("name", entity);
    tasks.push("Deleted entity description on database!");
  };

  protected async tableExistsInConn(conn: Knex, name: string) {
    return conn.schema.hasTable(name);
  }

  protected async findEntityByName(conn: Knex, name: string): Promise<IEntity> {
    return conn
      .select("*")
      .from(SystemEntityCatalog.Entity.table_name)
      .where("name", name)
      .then((res) => {
        if (res.length != 1) {
          throw new Error("Failed to pinpoint entity using its name!");
        }
        return res[0];
      });
  }

  protected async createTable(
    conn: Knex,
    tableName: string,
    idFieldName: string
  ) {
    return conn.schema.createTable(tableName, (builder) => {
      builder.specificType(idFieldName, "CHAR(22)").primary().notNullable();
    });
  }

  protected async renameTableInConn(
    conn: Knex,
    oldName: string,
    newName: string
  ) {
    return conn.schema.renameTable(oldName, newName);
  }

  protected async deleteTableInConn(conn: Knex, name: string) {
    return conn.schema.dropTable(name);
  }
}
