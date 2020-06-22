import Knex from "knex";
import { Bootable } from "../boot/Bootable.js";
import { EventEmitter } from "events";
import { ResourceSchema } from "../database/schema/sql/ResourceSchema.js";
import { Reference } from "./Reference.js";
import { IResourceFacade } from "./standart/facade/IResourceFacade.js";
import { IResourceProcedure } from "./standart/procedures/IResourceProcedure.js";
import { IResourceAccessRule } from "./standart/accessRules/IResourceAccessRule.js";
import { IDataFilterProvider } from "../database/query/IDataFilterProvider.js";
import { ColumnClass } from "./ColumnClass.js";
import { ColumnSchema } from "../database/schema/sql/ColumnSchema.js";
import { nanoid } from "nanoid";
import { ProcedureCatalog } from "./standart/procedures/ProcedureCatalog.js";

export abstract class ResourceClass extends EventEmitter implements Bootable {

    protected _connection!: Knex;

    protected _name!: string;

    public get name(): string {
        return this._name;
    }

    protected _schema!: ResourceSchema;

    public get schema() : ResourceSchema {
        return this._schema;
    }

    protected _columns: {
        [name: string]: ColumnClass
    } = {};

    protected _accessRules: {
        [name: string]: IResourceAccessRule
    } = {};

    protected _procedures: {
        [name: string]: IResourceProcedure
    } = {};

    protected _references: {
        [name: string]: Reference
    } = {};

    protected _facades: {
        [name: string]: IResourceFacade
    } = {};

    constructor() {
        super();
        this._schema = this.buildSchema();
    }

    protected buildDefaultIdColumn() : ColumnClass {
        return new ColumnClass({
            name : "ID",
            schema : new ColumnSchema({
                name : "ID",
                column_name : "_id",
                sql_type : "CHAR",
                length : 22,
                column_keys : ["PRI"],
                data_type : "IDColumn",
                title : "@{Auria.Defaults.IdColumn.Title}",
                description : "@{Auria.Defaults.IdColumn.Description}",
                nullable : false,
                readable : true,
                required : true,
                status : "active"
            }),
            getProxies : {
                [ProcedureCatalog.CREATE] : () => nanoid(22)
            }
        });
    }

    public addColumns(...columns: ColumnClass[]) {

        if (Array.isArray(columns)) {
            for (let column of columns) {
                this._columns[column.name] = column;
                this._schema.addColumns(column.schema);
            }
        }
    }

    public addReferences(...references: Reference[]) {

        if (Array.isArray(references)) {

            for (let reference of references) {
                this._references[reference.name] = reference;
                this._schema.addReferences(reference.schema);
            }
        }

    }

    public addAccessRule(...rules: IResourceAccessRule[]) {
        if (Array.isArray(rules)) {
            for (let rule of rules) {
                this._accessRules[rule.name] = rule;
            }
        }
    }

    public getFilterProviderForProcedure(procedure: string): IDataFilterProvider {
        return {
            applyFilter : async (query, context) => {
                return query;
            }
        }
    }


    public abstract getBootDependencies(): string[];
    public abstract getBootableName(): string;
    public abstract getBootFunction(): () => boolean | Promise<boolean>;

    protected abstract buildSchema(): ResourceSchema;
}