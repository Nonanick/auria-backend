import { SystemCatalog } from "../SystemCatalog.js";
import { SystemInstaller } from "../src/install/SystemInstaller.js";
import { rejects } from 'assert';

const args = process.argv;
const indexOfSystemOption = args.indexOf("--system");

if (indexOfSystemOption < 0) {
  console.error(
    "Please provide the name of the system to be installed! -system options"
  );
  process.exit(1);
}

if (indexOfSystemOption >= args.length - 1) {
  console.error("Could not find system name in the argument list!");
  process.exit(2);
}

const systemName = args[indexOfSystemOption + 1];

if (SystemCatalog[systemName as keyof typeof SystemCatalog] == null) {
  console.error("System name is not registered in catalog!");
  process.exit(3);
}

let installer = new SystemInstaller(
  SystemCatalog[systemName as keyof typeof SystemCatalog]
);

console.log('Installer!', installer);

let p = new Promise(async (resolve, reject) => {
  try {
    // First install schema
    await installer.installSystemSchema();

    await installer.saveSystemConnectionIfNotExists();
    let connInfo = installer.getSystemConnectionInfo();

    // Then populate tables
    await installer.saveAllSystemEntities(connInfo);

    resolve();
  } catch (err) {
    console.error("Failed to install! ", err);
    reject(err);
  } finally {
    process.exit(0);
  }
});

p.then(_ => {
  console.info('Installation finished!');
});
// SystemCatalog[systemName as keyof typeof SystemCatalog].install()
//     .then((ans) => {
//         console.log("End of install routine!\n", ans);
//         process.exit(0);
//     });
