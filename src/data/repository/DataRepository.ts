import { System } from "../../System.js";
import { User } from "../../user/User.js";
import { IReadRequest, IReadResponse } from "auria-lib";
import { ReadFetchProcedure } from "./read/procedures/ReadFetchProcedure.js";

export class DataRepository {

    public static ReadProcedures = {
        "FETCH": new ReadFetchProcedure(),
        "COUNT": new ReadFetchProcedure(),
        "PERMISSION": new ReadFetchProcedure()
    };

    constructor(private system: System) { }

    public async read(user: User, request: IReadRequest): Promise<IReadResponse> {
        const resource = this.system.resourceManager().getResource(request.from);

        let procedure = "FETCH"; // Default procedure

        if (request.procedure) {
            if (Array.from(Object.keys(DataRepository.ReadProcedures)).includes(request.procedure)) {
                procedure = request.procedure;
            }
        }

        return DataRepository.ReadProcedures
        [procedure as keyof typeof DataRepository.ReadProcedures]
            .processRequest(request, resource, user);
    }
}