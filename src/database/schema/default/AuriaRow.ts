import { DefaultSchemaData } from "../../schemaInterface/default/DefaultSchemaData.js";
import { EntityClass } from "../../../entity/EntityClass.js";
import { ColumnClass } from "../../../entity/ColumnClass.js";
import { InvalidEntityProcedure } from "../../../exception/system/database/InvalidEntityProcedure.js";
import { Row } from "../../Row.js";
import { User } from "../../../user/User.js";
import { ProcedureAuthority } from "../../../entity/standart/procedures/ProcedureAuthority.js";
import { IEntityProcedureHook } from "../../../entity/standart/procedures/IEntityProcedureHook.js";
import { ProcedureHookContext } from "../../../entity/standart/procedures/ProcedureHookContext.js";
import Knex from "knex";

export class AuriaRow<T extends DefaultSchemaData> extends Row<T> {

    protected systemConnection! : Knex;
    
    private entity: EntityClass;

    protected procedureHooks: {
        [procedure: string]: IEntityProcedureHook[]
    } = {};

    constructor(entity: EntityClass, data?: Partial<T>) {
        super(data);
        this.entity = entity;
        this.setTableName(entity.schema.get("table_name"));
        this.setRowState("NOT_ON_DATABASE");

        this.applyEntityRules(entity);
    }

    public runProcedure<T extends DefaultSchemaData = any>(user: User, procedure: string, authority?: ProcedureAuthority) {
        if (this.entity.hasRowProcedure(procedure)) {
            this.checkUserPermission(user, procedure);
        } else {
            console.error("[AuriaRow] Entity does not possess procedure!");
            throw new InvalidEntityProcedure(`Entity '${this.entity.name}' does not accept procedure ${procedure}`);
        }
    }

    public setSystemConnection(connection : Knex) {
        this.systemConnection = connection;
    }

    private applyEntityRules(entity: EntityClass) {
        for (let columnName in entity.columns) {
            const column = entity.columns[columnName];
            // Get Proxies
            this.applyGetProxiesFromColumn(column);

            // Set Proxies
            this.applySetProxiesFromColumn(column);

            // Validators
            this.applyValidatorsFromColumn(column);
        }
    }

    private applyValidatorsFromColumn(column: ColumnClass) {
        for (let procedure in column.validators) {
            const validations = column.validators[procedure];

            if (this.procedureHooks[procedure] == null)
                this.procedureHooks[procedure] = [];

            this.procedureHooks[procedure].push(
                async (context: ProcedureHookContext) => {
                    // TODO apply validation!
                }
            );
        }
    }

    private applyGetProxiesFromColumn(column: ColumnClass) {
        for (let proxy of column.getProxies) {
            this.addGetProxy(column.schema.get("column_name"), proxy);
        }
    }

    private applySetProxiesFromColumn(column: ColumnClass) {
        for (let proxy of column.setProxies) {
            this.addSetProxy(column.schema.get("column_name"), proxy);
        }
    }

    public async byId(id: string, column?: keyof T): Promise<AuriaRow<T>> {
        const searchColumn = column ?? this.getPrimaryFieldName();

        return this.connection
            .select<T[]>('*')
            .from(this.entity.schema.get("table_name"))
            .where(searchColumn as string, id)
            .then((res) => {
                if (res.length === 1) {
                    this.set(res[0]);
                    this.setRowState("SYNCED");
                }
                else {
                    console.error("[AuriaRow] Failed to pinpoint row with id ", id, ' in Table ', this.entity.schema.get("table_name"), ' searched in column ', column);
                }

                return this;
            });
    }

    public checkUserPermission(user: User, procedure: string, authority?: ProcedureAuthority) {
        this.systemConnection;
    }

}