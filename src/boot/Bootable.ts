export interface Bootable {
    getBootDependencies : () => string[];
    getBootableName : () => string;
    getBootFunction : () => (() => Promise<boolean>|boolean);
}