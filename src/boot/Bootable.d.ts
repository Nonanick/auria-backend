export interface Bootable {
    emit(name: string): void;
    getBootDependencies: () => string[];
    getBootableName: () => string;
    getBootFunction: () => (() => Promise<boolean> | boolean);
}
