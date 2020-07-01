import { User } from "../../../../user/User.js";
import { EntityClass } from "../../../EntityClass.js";
import { AuriaRow } from "../../../../database/schema/default/AuriaRow.js";
import { DefaultSchemaData } from "../../../../database/schemaInterface/default/DefaultSchemaData.js";
import { EntityProcedureHistory } from "../../../system/index.js";
import { IEntityProcedureHistory } from "../../../../database/schemaInterface/IEntityActivity.js";
import { ProcedureAuthority } from "../ProcedureAuthority.js";
import { ProcedureHistory } from "../ProcedureHistory.js";
import { IRowProcedure, IRowProcedureParams } from "../row/IRowProcedure.js";

export class CreateProcedureClass implements IRowProcedure {

    protected _name: string = "CREATE";

    protected _resourceEntity!: EntityProcedureHistory;

    public get name(): string {
        return this._name;
    }

    public setResourceHistoryEntity(entity: EntityProcedureHistory) {
        this._resourceEntity = entity;
    }

    public async run<T extends DefaultSchemaData = DefaultSchemaData>(
        {
            user,
            entity,
            row,
            authority,
            useTransaction
        }: IRowProcedureParams<T>
    ) {

        const authorityToCreate = await this.getAuthorityToCreate({ user, authority: authority, entity });

        if (useTransaction)
            row.save(useTransaction);
        else
            useTransaction = await row.startSaveTransaction();

        ProcedureHistory.saveProcedureHistory({
            authority: authorityToCreate,
            procedure: this._name,
            user: user,
            useTransaction,
            historyEntity: this._resourceEntity
        });

        const rowProcedureHistory = this._resourceEntity.row<IEntityProcedureHistory>();
        rowProcedureHistory.set({
            data_procedure: this._name,
            entity_name: entity.auriaRow.get("name"),
            user_id: await user.getId(),
            extra_information: row.asJSON(),
        });

    }

    private async getAuthorityToCreate({ user, authority, entity }: { user: User; authority?: ProcedureAuthority; entity: EntityClass; }): Promise<ProcedureAuthority> {
        // Authority, initially is the same as the user that requested the procedure!
        const procedureAuthority: ProcedureAuthority = {
            user: await user.getId(),
            role: await (await (user.roles())).getRolesId()
        };

        // If an Procedure Authority was passed, use it!
        if (authority) {
            procedureAuthority.user = authority.user;
            if (authority.role)
                procedureAuthority.role = authority.role;
        }

        return procedureAuthority;

    }

}

export const CreateProcedure = new CreateProcedureClass();