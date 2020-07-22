import { SystemApiListener } from "../system/SystemApiListener.js";
import { ExposedApiRoutesMetadata } from "../ExposedApiEnpointsMetadata.js";
import { SystemApiRoute } from "../system/SystemApiRoute.js";
import { nanoid } from "nanoid";
import { MissingRequiredParameter } from "../../exception/system/validation/MissingRequiredParameter.js";
import Knex from "knex";

export class ConnectionListener extends SystemApiListener {
  static installedDbDrivers = ["mysql2"];

  public get name(): string {
    return "connection";
  }
  public baseUrl(): string {
    return "connection";
  }

  public exposedApiRoutes(): ExposedApiRoutesMetadata {
    return {
      list: {
        functionName: "list",
        httpMethods: ["get"],
        requiresExplicitPermission: false,
      },
      create: {
        functionName: "create",
        httpMethods: ["post"],
        requiresExplicitPermission: false,
        requiredParams: [
          "name",
          "title",
          "driver",
          "host",
          "port",
          "database",
          "username",
          "password",
        ],
      },
      "update/:id": {
        functionName: "update",
        httpMethods: ["put"],
        requiresExplicitPermission: false,
        requiredParams: ["id"],
      },
      test: {
        functionName: "test",
        httpMethods: ["get"],
        requiresExplicitPermission: false,
        optionalParams: ["byName", "byId"],
      },
      "delete/:id": {
        functionName: "delete",
        httpMethods: ["delete"],
        requiresExplicitPermission: false,
        requiredParams: ["id"],
      },
    };
  }

  public list: SystemApiRoute = (req, system) => {
    return system.connectionManager().list();
  };

  public create: SystemApiRoute = (req, system) => {
    return system.connectionManager().create({
      _id: nanoid(22),
      ...req.parameters,
    });
  };

  public update: SystemApiRoute = (req, system) => {
    let id = req.parameters["id"];
    delete req.parameters.id;

    return system.connectionManager().update(id, req.parameters);
  };

  public test: SystemApiRoute = async (req, system) => {
    let id: string;
    let by: "_id" | "name";

    // Try to find by name
    if (req.parameters.byName != null) {
      id = req.parameters.byName;
      by = "name";
    } else if (req.parameters.byId != null) {
      id = req.parameters.byId;
      by = "_id";
    } else {
      throw new MissingRequiredParameter(
        'You must provide either "byName" or "byId" paremeters to pinpoint the connection to be tested!'
      );
    }

    return system.connectionManager().testConnection(id, by);
  };

  public delete: SystemApiRoute = async (req, system) => {
    let id = req.parameters.id;
    return system.connectionManager().delete(id);
  };
}
