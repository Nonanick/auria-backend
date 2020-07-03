import { SystemCatalog } from "../SystemCatalog.js";
import fs from 'fs/promises';
import path from 'path';
import Knex from "knex";

async function isDirectory(path: string): Promise<boolean> {
    return fs.lstat(path).then(ob => (!ob.isFile()));
}

async function emptyDirectory(dir: string) {
    fs.readdir(dir).then(async (contents) => {
        console.log("Directory contents: ", contents);
        for (let content of contents) {
            if (await isDirectory(path.resolve(dir, content))) {
                await emptyDirectory(path.resolve(dir, content));
                fs.rmdir(path.resolve(dir, content));
            } else {
                fs.unlink(path.resolve(dir, content));
            }
        }
    });
}

async function getTablesFromConnection(connection: Knex): Promise<string[]> {
    return connection.raw("SHOW TABLES").then(([allTables, dunno]) => {
        const tables: string[] = [];
        if (Array.isArray(allTables)) {
            allTables.forEach((table) => {
                for (let propName in table) {
                    if (propName.indexOf("Tables_in") == 0) {
                        tables.push(table[propName]);
                    }
                }
            });
        }
        console.log("Tables in conn: ", tables);
        return tables;
    });


}

async function getColumnsFromTable(connection: Knex, table: string) {
    return connection.raw(`DESCRIBE \`${table}\``)
        .then(([descriptions, dunno]) => {
            let retInt: ColumnToInterfaceDescription[] = [];
            if (Array.isArray(descriptions)) {
                descriptions.forEach((desc) => {
                    let properType = desc.Type.split("(")[0];

                    retInt.push({
                        name: desc.Field,
                        type: properType,
                        required: desc.Null == "NO"
                    });
                });
            }
            return retInt;
        })
}

interface ColumnToInterfaceDescription {
    name: string;
    type: "string" | "number" | "boolean" | "Date";
    required: boolean;
}

function parseTableName(tableName: string) {
    let pieces = tableName.split('_');
    pieces = pieces.map(p => {
        return p[0].toLocaleUpperCase() + p.slice(1);
    });

    return pieces.join('');
}

const generateToFolder = path.resolve(process.cwd(), 'src', 'database', 'generatedInterfaces');

const args = process.argv;

const indexOfSystemOption = args.indexOf("--system");

if (indexOfSystemOption < 0) {
    console.error("Please provide the name of the system to be queried! Missing --system");
    process.exit(1);
}

if (indexOfSystemOption >= args.length - 1) {
    console.error("Could not find system name in the argument list!");
    process.exit(2);
}
const systemName = args[indexOfSystemOption + 1];

const system = SystemCatalog[systemName as keyof typeof SystemCatalog];

if (system == null) {
    console.error("System does no exists in Catalog!");
    process.exit(2);
}

emptyDirectory(generateToFolder);

const tsTypes: any = {
    "string": ["varchar", "char", "text"],
    "number": ["int", "integer", "numeric", "decimal", "float"],
    "Date": ["datetime", "timestamp"]
};
// @todo iterate throu ALL connections and create subfolders!

getTablesFromConnection(system.getConnection())
    .then(async (tables: string[]) => {
        for (let table of tables) {
            const interfaceName = "I" + parseTableName(table);
            let fileContent = `export interface ${interfaceName} { \n`;
            let cols = await getColumnsFromTable(system.getConnection(), table);
            cols.forEach((column) => {
                for (const tsType in tsTypes) {
                    if (tsTypes[tsType].includes(column.type)) {
                        fileContent += `    ${column.name + (column.required ? "" : "?")}:  ${tsType};\n`;
                    }
                }
            });
            fileContent += `}`;

            fs.writeFile(path.resolve(generateToFolder, interfaceName + ".ts"), fileContent);
        }
        process.exit(0);
    });

