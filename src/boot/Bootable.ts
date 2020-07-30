import { EventEmitter } from 'events';

export interface Bootable extends EventEmitter{
    getBootDependencies: () => string[];
    getBootableName: () => string;
    getBootFunction: (dependencies: { [name: string]: any & Bootable }) => (() => Promise<boolean> | boolean);
}