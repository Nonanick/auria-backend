import { SystemCatalog } from "../SystemCatalog.js";
const args = process.argv;
const indexOfSystemOption = args.indexOf("--system");
if (indexOfSystemOption < 0) {
    console.error("Please provide the name of the system to be installed! -system options");
    process.exit(1);
}
if (indexOfSystemOption >= args.length - 1) {
    console.error("Could not find system name in the argument list!");
    process.exit(2);
}
const systemName = args[indexOfSystemOption + 1];
if (SystemCatalog[systemName] == null) {
    console.error("System name is not registered in catalog!");
    process.exit(3);
}
SystemCatalog[systemName].install()
    .then((ans) => {
    console.log("End of install routine!\n", ans);
    process.exit(0);
});
//# sourceMappingURL=install.js.map