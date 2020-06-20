import { SystemCatalog } from "../SystemCatalog.js";
import { SystemRequest } from "../src/http/SystemRequest.js";
const args = process.argv;
const indexOfSystemOption = args.indexOf("--system");
const indexOfApiUrl = args.indexOf("--url");
const indexOfApiParameters = args.indexOf("--params");
let apiParams = {};
if (indexOfSystemOption < 0) {
    console.error("Please provide the name of the system to be queried! Missing --system");
    process.exit(1);
}
if (indexOfApiUrl < 0) {
    console.error("Please provide the name of the system to be installed! Missing --url");
    process.exit(1);
}
if (indexOfApiParameters >= 0 && args[indexOfApiParameters + 1] != null) {
    for (let a = indexOfApiParameters + 1; a < args.length; a++) {
        let paramStr = args[a];
        if (paramStr.indexOf('--') === 0) {
            break;
        }
        let pieces = paramStr.split('=');
        apiParams[pieces[0]] = pieces[1] || true;
    }
}
if (indexOfSystemOption >= args.length - 1) {
    console.error("Could not find system name in the argument list!");
    process.exit(2);
}
if (indexOfApiUrl >= args.length - 1) {
    console.error("Could not find api url in the argument list!");
    process.exit(2);
}
const systemName = args[indexOfSystemOption + 1];
const requestURL = args[indexOfApiUrl + 1];
const system = SystemCatalog[systemName];
if (system == null) {
    console.error("System does no exists in Catalog!");
    process.exit(2);
}
const systemRequest = new SystemRequest({
    fullUrl: requestURL,
    url: requestURL,
    parameters: apiParams,
    headers: {
        "x-auria-access-token": ""
    }
});
const response = system.answerRequest(systemRequest);
response.then((response) => {
    console.log(response);
});
//# sourceMappingURL=call-api.js.map