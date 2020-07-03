import { System } from "../../System.js";
import { User } from "../../user/User.js";
import { IReadRequest, IWriteRequest } from "auria-lib";
import { EntityProcedureCatalog } from "../../entity/standart/procedures/entity/EntityProcedureCatalog.js";
import { ProcedureAuthority } from "../../entity/standart/procedures/ProcedureAuthority.js";
import { RowProcedureCatalog } from "../../entity/standart/procedures/row/RowProcedureCatalog.js";
import { AuriaRow } from "../../database/schema/default/AuriaRow.js";
import { DefaultSchemaData } from "../../database/schemaInterface/default/DefaultSchemaData.js";

export interface CustomProcedureParameters {
    appliesTo: "ROW" | "ENTITY";
    user: User;
    procedure: string;
    values: any;
    authority?: ProcedureAuthority;
}

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

        let readDigest = EntityProcedureCatalog[procedure as keyof typeof EntityProcedureCatalog]
            .run({ user, entity, using: request });

        return readDigest;
    }

    public async write(user: User, request: IWriteRequest, authority?: ProcedureAuthority) {
        const entity = this.system.entityManager().getEntity(request.writeIn);

        if (!WriteAllowedProcedures.includes(request.procedure as any)) {
            throw new Error("Unrecognizable write procedure: " + request.procedure);
        }

        let row: AuriaRow<DefaultSchemaData>;

        if (request.procedure !== "CREATE") {
            if (typeof request.identifier === "string") {
                row = await entity.row<DefaultSchemaData>().byId(request.identifier);
            } else {
                row = await entity.row<DefaultSchemaData>().byId(request.identifier?.byId!, request.identifier?.usingColumn! as any);
            }
        } else {
            row = entity.row();
        }

        row.set(request.values);

        let procedureDigest = RowProcedureCatalog[request.procedure as keyof typeof RowProcedureCatalog]
            .run({
                user: user,
                entity: entity,
                row: row,
                authority: authority
            });

        return procedureDigest;
    }

    public async executeProcedure({
        appliesTo,
        user,
        procedure,
        values,
        authority
    }: CustomProcedureParameters) {

    }
}

const ReadAllowedProcedures: (keyof typeof EntityProcedureCatalog)[] = [
    "READ_FETCH"
];

const WriteAllowedProcedures: (keyof typeof RowProcedureCatalog)[] = [
    "CREATE"
];