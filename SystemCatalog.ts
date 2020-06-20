import { Architect } from "./src/systems/Architect/Architect.js";
import { System } from "./src/System.js";

export const SystemCatalog = asSystem({
    Architect: new Architect({
        name: "Architect"
    })
});

export function asSystem<T extends { [systemName: string]: System }>(arg: T) {
    return arg;
}