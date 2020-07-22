import { SystemApiListener } from "../system/SystemApiListener.js";
import { ExposedApiRoutesMetadata } from "../ExposedApiEnpointsMetadata.js";
import { SystemApiRoute } from "../system/SystemApiRoute.js";
import { SystemEntityCatalog } from "../../database/schema/SystemEntityCatalog.js";
import { nanoid } from "nanoid";

export class ColumnListener extends SystemApiListener {

  public get name(): string {
    return "column";
  }

  public baseUrl(): string {
    return "column";
  }

  public exposedApiRoutes(): ExposedApiRoutesMetadata {
    return {
      ":entity/list": {
        functionName: "list",
        httpMethods: ["get"],
        requiredParams: ["entity"],
        requiresExplicitPermission : false,
      },
      ":entity/list/:column": {
        functionName: "show",
        httpMethods: ["get"],
        requiredParams: ["entity", "column"],
        requiresExplicitPermission : false,
      },
      ':entity/create': {
        functionName: "create",
        httpMethods: ["post"],
        requiredParams: ["entity", "column_name"],
        requiresExplicitPermission : false,
      },
      ":entity/update/:column": {
        functionName: "update",
        httpMethods: ["put"],
        requiredParams: ["entity", "column"],
        requiresExplicitPermission : false,
      },
      ":entity/delete/:column": {
        functionName: "delete",
        httpMethods: ["delete"],
        requiredParams: ["entity", "column"],
        requiresExplicitPermission : false,
      },
    };
  }

  public list: SystemApiRoute = (req, sys) => {
    return sys
      .getConnection()
      .select("*")
      .from(SystemEntityCatalog.Column.table_name)
      .where("entity_name", req.parameters.entity)
      .then((columns) => {
        return columns;
      });
  };

  public show: SystemApiRoute = (req, sys) => {
    return sys
      .getConnection()
      .select("*")
      .from(SystemEntityCatalog.Column.table_name)
      .where("entity_name", req.parameters.entity)
      .where("column_name", req.parameters.column)
      .then((columns) => {
        return columns[0];
      });
  };

  public create: SystemApiRoute = (req, sys) => {
    let ent = req.parameters.entity;
    delete req.parameters.entity;

    console.log(">>> CREATE Column!");
    
    let insertValues = {
      _id: nanoid(22),
      status: "active",
      entity_name: ent,
      ...req.parameters,
    };

    return sys
      .getConnection()
      .insert(insertValues)
      .into(SystemEntityCatalog.Column.table_name)
      .then((c) => {
        return "Column created for entity " + ent;
      })
      .catch((e) => {
        console.error("Error while creating column! ", e);
        return "Failed to create column for entity!";
      });
  };

  public update: SystemApiRoute = (req, sys) => {
    let entity = req.parameters.entity;
    let column_name = req.parameters.column;

    delete req.parameters.column;
    delete req.parameters.entity;

    return sys
      .getConnection()
      .table(SystemEntityCatalog.Column.table_name)
      .update(req.parameters)
      .where("entity_name", entity)
      .where("name", column_name)
      .then((updated) => {
        return 'Updated ' + updated + ' columns!';
      });
  };

  public delete: SystemApiRoute = (req, sys) => {
    let entity = req.parameters.entity;
    let column_name = req.parameters.column;

    sys
      .getConnection()
      .table(SystemEntityCatalog.Column.table_name)
      .delete()
      .where("entity_name", entity)
      .where("name", column_name)
      .then((deleted) => {
        return 'Deleted ' + deleted + ' columns!';
      });
  };

}
