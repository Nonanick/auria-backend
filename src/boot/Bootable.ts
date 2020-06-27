export interface Bootable {
    emit(name: string): void;
    getBootDependencies: () => string[];
    getBootableName: () => string;
    getBootFunction: (dependencies: { [name: string]: any & Bootable }) => (() => Promise<boolean> | boolean);
}