import { ExposedApiRoutesMetadata } from "../../ExposedApiEnpointsMetadata.js";
import { ApiRoute } from "../../ApiEndpoint.js";
import { System } from "../../../System.js";
import { SystemApiListener } from "../SystemApiListener.js";

export class DataListener extends SystemApiListener {
  public get name(): string {
    return "DataListener";
  }

  constructor(system: System) {
    super(system);
  }

  public baseUrl(): string {
    return "data";
  }

  public exposedApiRoutes(): ExposedApiRoutesMetadata {
    return {
      read: {
        functionName: "read",
        requiredParams: ["from"],
        optionalParams: [
          {
            name: "procedure",
            validators: (value) => {
              const allowedValues = ["FETCH", "COUNT", "PERMISSION"];
              const isAllowedValue = allowedValues.includes(
                String(value).toLocaleUpperCase()
              );

              if (!isAllowedValue) {
                return (
                  "Only " + allowedValues.join(" , ") + " values are allowed!"
                );
              }
              return true;
            },
          },
          "filter",
          "limit",
          "page",
          "order",
          "considerAsFirst",
        ],
        allowGuestUser: false,
      },
      create: {
        functionName: "create",
        requiredParams: ["entity"],
        allowGuestUser: false,
        requiresExplicitPermission: false,
      },
    };
  }

  protected read: ApiRoute = async (req) => {};

  protected create: ApiRoute = async (req) => {
    const entity = req.parameters.entity; // Marked as required!

    return "Entity " + entity;
  };
}
