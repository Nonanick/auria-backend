/// <reference types="node" />
import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import { ResourceRow } from "./resources/sql/ResourceRow.js";
import { System } from "../System.js";
export declare class ResourceManager extends EventEmitter implements Bootable {
    private resources;
    private system;
    constructor(system: System);
    getBootDependencies: () => string[];
    getBootableName: () => string;
    getBootFunction: () => () => Promise<boolean>;
    getAllResources(): ResourceRow[];
    getResource(name: string): ResourceRow;
}
