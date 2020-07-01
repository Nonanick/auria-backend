import { System } from "../../System.js";
import { User } from "../../user/User.js";
import { IReadRequest } from "auria-lib";
import { EntityProcedureCatalog } from "../../entity/standart/procedures/entity/EntityProcedureCatalog.js";

export class DataRepository {

    constructor(private system: System) { }

    public async read(user: User, request: IReadRequest) //: Promise<IReadResponse> 
    {
        const entity = this.system.entityManager().getEntity(request.from);

        let procedure: keyof typeof EntityProcedureCatalog = "READ_FETCH"; // Default procedure

        if (request.procedure) {
            if (Array.from(Object.keys(EntityProcedureCatalog)).includes(request.procedure)) {
                procedure = request.procedure as keyof typeof EntityProcedureCatalog;
            }
        }

        EntityProcedureCatalog[procedure as keyof typeof EntityProcedureCatalog].run({ user, entity, using: request });
    }
}