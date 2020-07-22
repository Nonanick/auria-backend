import { System } from "../System.js";
import { EntityClass } from "../entity/EntityClass.js";
import { IConnection } from "../database/schemaInterface/IConnection.js";
import { SystemEntityCatalog } from "../database/schema/SystemEntityCatalog.js";
import { nanoid } from "nanoid";

export class SystemInstaller {
  protected _system: System;

  protected _systemConnectionInfo?: IConnection;

  constructor(system: System) {
    this._system = system;
  }

  async installSystemSchema() {
    const allSystemEntities = this._system
      .entityManager()
      .getAllSystemEntities();

    // Install Table + Column Schema!
    for (const entity of allSystemEntities) {
      await this.installEntitySchema(entity);
    }

    // Instal Table References!
    for (const entity of allSystemEntities) {
      const references = entity.getReferences();
      for (const reference of references) {
        await reference.schema.install(this._system.getConnection());
      }
    }
  }

  async installEntitySchema(entity: EntityClass) {
    // Install Table schema already fires column installation ( CREATE cannot be done in 2 queries!);
    return entity.schema.install(this._system.getConnection());
  }

  async saveSystemConnectionIfNotExists() {
    const connExists = await this.systemConnectionExistsInTable();

    if (!connExists) {
      let def = this._system.getConnectionDefinition();

      let insValue: IConnection = {
        _id: nanoid(22),
        name: this._system.name + "[System]",
        host: def.host,
        driver: def.client,
        port: def.port,
        username: def.user,
        password: def.password,
        database: def.database,
        status: "active",
        title: this._system.name + " system connection",
      };

      this._systemConnectionInfo = insValue;

      await this._system
        .getConnection()
        .insert(insValue)
        .into(SystemEntityCatalog.Connection.table_name);
    }
    return true;
  }

  getSystemConnectionInfo() : IConnection {
    if(this._systemConnectionInfo == null) {
      throw new Error('Connection info was not found or created! Call saveSystemConnection first!');
    }
    return this._systemConnectionInfo;
  }

  protected async systemConnectionExistsInTable() {
    let def = this._system.getConnectionDefinition();

    return this._system
      .getConnection()
      .select("*")
      .from(SystemEntityCatalog.Connection.table_name)
      .where("host", def.host)
      .where("port", def.port)
      .where("driver", def.client)
      .where("username", def.user)
      .where("password", def.password)
      .where("database", def.database)
      .then((res) => {
        if (res.length == 1) {
          this._systemConnectionInfo = res[0];
        }
        return res.length == 1;
      });
  }

  async saveAllSystemEntities(connInfo : IConnection) {
    const allSystemEntities = this._system
      .entityManager()
      .getAllSystemEntities();

    // Create Entities + Columns entries on system tables
    for (const entity of allSystemEntities) {
      await this.saveEntity(entity, connInfo);
    }

    // Create Reference entries on system tables
    for (const entity of allSystemEntities) {
      const references = entity.getReferences();
      for (const reference of references) {
        await reference.saveInAuria(this._system.getConnection());
      }
    }
  }

  async saveEntity(entity: EntityClass, conn : IConnection) {
    // To save entities
    await entity.saveIfNotExistsInAuria(this._system.getConnection(), conn);
  }
}
