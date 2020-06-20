import { Architect } from "./src/systems/Architect/Architect.js";
export const SystemCatalog = asSystem({
    Architect: new Architect({
        name: "Architect"
    })
});
export function asSystem(arg) {
    return arg;
}
//# sourceMappingURL=SystemCatalog.js.map