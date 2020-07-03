import { DefaultSchemaData } from "../../schemaInterface/default/DefaultSchemaData.js";
import { EntityClass } from "../../../entity/EntityClass.js";
import { ColumnClass } from "../../../entity/ColumnClass.js";
import { InvalidEntityProcedure } from "../../../exception/system/database/InvalidEntityProcedure.js";
import { Row } from "../../Row.js";
import { User } from "../../../user/User.js";
import { ProcedureAuthority } from "../../../entity/standart/procedures/ProcedureAuthority.js";
import { IEntityProcedureHook } from "../../../entity/standart/procedures/IEntityProcedureHook.js";
import { ProcedureHookContext } from "../../../entity/standart/procedures/ProcedureHookContext.js";
import { ProcedurePermission } from "../../../security/procedurePermission/ProcedurePermission.js";
import { RowProcedureCatalog } from "../../../entity/standart/procedures/row/RowProcedureCatalog.js";
import { UserUnauthorizedToExecuteProcedure } from "../../../exception/system/security/UserUnauthorizedToExecuteProcedure.js";

export class AuriaRow<T extends DefaultSchemaData> extends Row<T> {

    protected procedurePermission!: ProcedurePermission;

    private entity: EntityClass;

    protected procedureHooks: {
        [procedure: string]: IEntityProcedureHook[]
    } = {};

    constructor(entity: EntityClass, data?: Partial<T>) {
        super(data);
        this.entity = entity;
        this.setTableName(entity.schema.get("table_name"));
        this.setRowState("NOT_ON_DATABASE");
       // console.log("[---------- Apply entity rules!", entity);
        this.applyEntityRules(entity);
    }

    public runProcedure(user: User, procedure: keyof typeof RowProcedureCatalog, authority?: ProcedureAuthority) {
        if (this.entity.hasRowProcedure(procedure)) {
            const permissionToExecute = this.checkUserPermission(user, procedure);
            if (permissionToExecute) {
                return RowProcedureCatalog[procedure]
                    .run<T>({
                        entity: this.entity,
                        row: this,
                        user: user,
                        authority
                    });
            } else {
                throw new UserUnauthorizedToExecuteProcedure("Cannot execute procedure! User lacks authority!");
            }
        } else {
            console.error("[AuriaRow] Row does not possess procedure!");
            throw new InvalidEntityProcedure(`Entity '${this.entity.name}' does not accept procedure ${procedure}`);
        }
    }

    public setProcedurePermissions(permission: ProcedurePermission) {
        this.procedurePermission = permission;
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
        if (column.getProxies.length != 0) {
            console.log("Found column without an empty GET PROXY!", column.name);
        }
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

    public async checkUserPermission(user: User, procedure: string, authority?: ProcedureAuthority): Promise<boolean> {
        return this.procedurePermission
            .checkPermissionToExecuteProcedure({
                entity: this.entity,
                procedure: procedure,
                user: user,
                usingAuthority: authority
            });
    }

    public asJSON(keys?: (keyof T)[]): Partial<T> {

        let ret: any = {};

        for (let columnName in this.entity.columns) {
            let col = this.entity.columns[columnName];
            let cName = col.schema.get("column_name");

            console.log("AS JSON: column with name:", cName);
            if (this.get(cName) != null) {
                ret[cName] = this.get(cName);
            } else {
                if (col.schema.get("default_value")) {
                    ret[cName] = col.schema.get("default_value");
                }
            }
        }

        return ret;
    }

}