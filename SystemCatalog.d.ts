import { Architect } from "./src/systems/Architect/Architect.js";
import { System } from "./src/System.js";
export declare const SystemCatalog: {
    Architect: Architect;
};
export declare function asSystem<T extends {
    [systemName: string]: System;
}>(arg: T): T;
