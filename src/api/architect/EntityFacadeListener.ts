import { SystemApiListener } from "../system/SystemApiListener.js";
import { ExposedApiRoutesMetadata } from "../ExposedApiEnpointsMetadata.js";
import { SystemApiRoute } from "../system/SystemApiRoute.js";
import { SystemEntityCatalog } from "../../database/schema/SystemEntityCatalog.js";
import { nanoid } from 'nanoid';

export class EntityFacadeListener extends SystemApiListener {
  public get name(): string {
    return "entity_facade";
  }
  public baseUrl(): string {
    return "entity_facade";
  }
  public exposedApiRoutes(): ExposedApiRoutesMetadata {
    return {
      "list/:entity": {
        functionName: "list",
        requiredParams: ["entity"],
        httpMethods: ["get"],
      },
      "list/:entity/:facade": {
        functionName: "show",
        requiredParams: ["entity"],
      },
      "create/:entity": {
        functionName: "create",
        requiredParams: ["entity", "name"],
        httpMethods: ["post"],
      },
      "update/:entity/:facade": {
        functionName: "update",
        requiredParams: ["entity", "facade"],
        httpMethods: ["put"],
      },
      "delete/:entity/:facade": {
        functionName: "delete",
        requiredParams: ["entity", "facade"],
        httpMethods: ["delete"],
      },
    };
  }

  public list: SystemApiRoute = async (req, sys) => {
    return sys
      .getConnection()
      .select("*")
      .from(SystemEntityCatalog.EntityFacade.table_name)
      .where("entity", req.parameters.entity)
      .then((res) => {
        return res;
      });
  };

  public show: SystemApiRoute = async (req, sys) => {
    return sys
      .getConnection()
      .select("*")
      .from(SystemEntityCatalog.EntityFacade.table_name)
      .where("entity", req.parameters.entity)
      .where("name", req.parameters.facade)
      .then((res) => {
        return res[0];
      });
  };

  public create: SystemApiRoute = async (req, sys) => {

    let insertValues = {
      _id : nanoid(22),
      status : 'active',
      ...req.parameters
    };
    return sys
      .getConnection()
      .insert(insertValues)
      .into(SystemEntityCatalog.EntityFacade.table_name)
      .then((created) => {
        return 'Created facade for entity ' + req.parameters.entity;
      });
  };

  public update: SystemApiRoute = async (req, res) => {
    
    let updValues = {};

  };

  public delete: SystemApiRoute = async (req, res) => {};
}
