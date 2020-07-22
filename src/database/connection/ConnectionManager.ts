import Knex from "knex";
import { SystemEntityCatalog } from "../schema/SystemEntityCatalog.js";
import { IConnection } from "../schemaInterface/IConnection.js";
import { ConnectionFailed } from "../../exception/system/database/ConnectionFailed.js";

export class ConnectionManager {
  static installedDbDrivers = ["mysql2"];

  private _sysConnection: Knex;

  protected _cachedConnectionById: {
    [id: string]: Knex;
  } = {};

  protected _cachedConnectionByName: {
    [name: string]: Knex;
  } = {};

  constructor(systemConn: Knex) {
    this._sysConnection = systemConn;
  }

  /**
   * List
   * -----
   * 
   * Return all connection information inside the connection table!
   */
  public list() {
    return this._sysConnection
      .select("*")
      .from(SystemEntityCatalog.Connection.table_name)
      .then((allTables) => {
        return allTables;
      });
  }

  /**
   * From Name
   * ----------
   * Open a connection from the Connection table
   * using its Name as the identifier
   *
   * 1. If the connection FAILS to connect an error is thrown
   * 2. The connection is therefore cached and the same instance is used
   * in all calls to connections that share the same ID/Name
   * 3. Calling connection destroy on the Knex object might
   * lead to unexpected behaviour! Use ConnectionManager.close(_id/name) to close a connection
   * ans invalidate its instance!
   * @param connName
   */
  public async fromName(connName: string): Promise<Knex> {
    // Return from cache
    if (this._cachedConnectionByName[connName] != null) {
      return this._cachedConnectionByName[connName];
    }

    let { success } = await this.testConnection(connName, "name");

    if (success) {
      return this._sysConnection
        .select<IConnection[]>("*")
        .from(SystemEntityCatalog.Connection.table_name)
        .where("name", connName)
        .then(async (ret) => {
          if (ret.length != 1)
            throw new Error("Failed to pinpoint connection!");

          let info = ret[0];
          let conn = this.openConnectionFromInfo(info);
          return conn;
        });
    } else {
      throw new ConnectionFailed(
        "Failed to connect to database definition with name " + connName
      );
    }
  }
  /**
   * From ID
   * --------
   * Open a connection from the Connection table
   * using its ID as the identifier
   *
   * 1. If the connection FAILS to connect an error is thrown
   * 2. The connection is therefore cached and the same instance is used
   * in all calls to connections that share the same ID/Name
   * 3. Calling connection destroy on the Knex object might
   * lead to unexpected behaviour! Use ConnectionManager.close(_id/name) to close a connection
   * ans invalidate its instance!
   *
   * @param connId
   */
  public async fromId(connId: string): Promise<Knex> {
    // Return from cache
    if (this._cachedConnectionById[connId] != null) {
      return this._cachedConnectionById[connId];
    }

    let { success } = await this.testConnection(connId, "_id");

    if (success) {
      return this._sysConnection
        .select<IConnection[]>("*")
        .from(SystemEntityCatalog.Connection.table_name)
        .where("_id", connId)
        .then(async (ret) => {
          if (ret.length != 1)
            throw new Error("Failed to pinpoint connection!");

          let info = ret[0];
          let conn = this.openConnectionFromInfo(info);

          return conn;
        });
    } else {
      throw new ConnectionFailed(
        "Failed to connect to database definition with id " + connId
      );
    }
  }

  /**
   * Open Connection From Info
   * --------------------------
   *
   * Using the information that came from the 'connection' table
   * is possible open and cache a connection in the connection manager!
   * @param info
   */
  public openConnectionFromInfo(info: IConnection): Knex {
    // Serve from cache
    if (this._cachedConnectionById[info._id] != null)
      return this._cachedConnectionById[info._id];

    if (this._cachedConnectionByName[info.name] != null)
      return this._cachedConnectionByName[info.name];

    let conn = Knex({
      client: info.driver,
      connection: {
        host: info.host,
        database: info.database,
        user: info.username,
        password: info.password,
        port: info.port,
      },
    });

    // Cache connection
    this._cachedConnectionById[info._id] = conn;
    this._cachedConnectionByName[info.name] = conn;

    return conn;
  }

  /**
   * Create
   * -------
   * 
   * Creates a new connection row in the connection table!
   * The database should already exists as Auria cannot handle database creation yet!
   * The user that is used to connect should have DML permission (at least)
   * 
   * @param connectionInfo 
   */
  public create(connectionInfo: IConnection) {
    return this._sysConnection
      .insert(connectionInfo)
      .into(SystemEntityCatalog.Connection.table_name)
      .then((res) => {
        return "Rows created -> " + res;
      });
  }

  /**
   * Update
   * -------
   * 
   * Changes information on the connection table
   * 
   * @param id 
   * @param info 
   */
  public update(id: string, info: Partial<IConnection>) {
    return this._sysConnection
      .table(SystemEntityCatalog.Connection.table_name)
      .update(info)
      .where("_id", id)
      .then((updated) => {
        return {
          message: `Found and updated ${updated} row(s) with id ${id}`,
          values: info,
        };
      });
  }

  public testConnection(identifier: string, by: "_id" | "name" = "_id") {
    return this._sysConnection
      .select("*")
      .from(SystemEntityCatalog.Connection.table_name)
      .where(by, identifier)
      .then(async (ret) => {
        if (ret.length != 1) {
          throw new Error("Failed to pinpoint connection!");
        }

        let connInfo = ret[0];

        return {
          success: await this.tryConnectionBasedOnInfo(connInfo),
        };
      });
  }

  protected async tryConnectionBasedOnInfo(info: any): Promise<boolean> {
    if (!ConnectionManager.installedDbDrivers.includes(info.driver)) {
      throw new Error(
        "Could not testdb connection! Driver " +
          info.driver +
          " is not installed on auria!"
      );
    }

    let conn = Knex({
      client: info.driver,
      connection: {
        host: info.host,
        database: info.database,
        user: info.username,
        password: info.password,
        port: info.port,
      },
    });

    //Execute dummy query to test connection!
    let ans = conn
      .raw("select 1+1 as result")
      .then((_) => true)
      .catch((err) => {
        console.log("DB Test failed: ", err);
        return false;
      })
      .finally(() => {
        conn.destroy();
      });

    return ans;
  }

  public delete(id: string) {
    return this._sysConnection
      .delete()
      .table(SystemEntityCatalog.Connection.table_name)
      .where("_id", id)
      .then((deleted) => {
        return "Rows deleted : " + deleted;
      });
  }
}
