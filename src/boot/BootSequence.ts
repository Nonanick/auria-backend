
import { EventEmitter } from "events";
import { Bootable } from "./Bootable.js";

export type BootOptions = {
    item: Bootable;
    dependencies: string[];
    triggerEvent: string | string[];

}

export type BootableOptions = {
    dependencies?: string[];
    triggerEvent?: string | string[];

};

export class BootSequence extends EventEmitter {


    private static defaultBootableOptions: BootableOptions = {
        dependencies: [],
        triggerEvent: "ready"
    };

    private __actionBootableResolved: (bootableName: string, resolution: boolean) => void =
        (name, resolution) => {

            this.__resolvedBootables[name] = resolution;
            console.debug("[Bootstrap] Bootable Item '" + name + "' resolved with status", resolution);

            let all = Array.from(this.__bootItens.keys());

            if (this.checkDependencies(all)) {
                this.emit(BootSequenceBootFinished, all);
            }

        };

    protected initializePromise!: Promise<any>;

    private __bootItens: Map<string, BootOptions>;

    private __bootItensPromise: Map<string, Promise<boolean>>;

    private __resolvedBootables: { [name: string]: boolean } = {};

    constructor() {
        super();
        this.__bootItens = new Map();
        this.__bootItensPromise = new Map();

        this.on(BootSequenceItemResolved, this.__actionBootableResolved);
    }

    public addBootable(name: string, item: Bootable, options?: BootableOptions) {
        this.__bootItens.set(
            name,
            {
                item: item,
                dependencies: [],
                triggerEvent: "ready",
                ...BootSequence.defaultBootableOptions,
                ...options
            }
        )

    }

    /**
     * [Create] Initialize Promise
     * ----------------------------
     * 
     * Creates a Promise that will resolve after 'initialize'
     * event is emitted, rejects if ANY of its itens throw an
     * Error/Exception
     * 
     */
    private createInitializePromise(): Promise<boolean> {

        let initializePromise = new Promise<boolean>((resolve, reject) => {

            // # - Create Listener to be triggered only once
            let initFn = async () => {
                // # - Find all the bootables by name
                let allBootables: string[] = Array.from(this.__bootItens.keys());

                // # - If there are none, resolve!
                if (allBootables.length == 0) {
                    resolve(true);
                }

                this.__bootItens.forEach((bootableOpts, name) => {
                    // # - Check dependencies existence
                    if (bootableOpts.dependencies.length > 0) {
                        // # - Make sure that all dependencies exists
                        bootableOpts.dependencies.forEach((dep) => {
                            if (allBootables.indexOf(dep) < 0) {
                                throw new Error("[Bootstrap] Boot error, dependecy '"
                                    + dep + "' was not found in this bootstrap!" +
                                    "\nAll loaded bootable itens:" + allBootables);
                            }
                        });
                        console.log("[Boot] After dependencies!", name, bootableOpts.dependencies);

                        this.bootAfterDependencies(name, bootableOpts.item, bootableOpts.dependencies);
                    } else {
                        this.bootItem(name, bootableOpts.item);
                    }
                });

                this.once(BootSequenceBootFinished, _ => {
                    console.debug("[Bootstrap] Boot finished!");
                    //Release Boot Itens
                    delete this.__bootItens;
                    resolve(true);
                });
            };

            this.once('initialize', initFn)
        });

        this.initializePromise = initializePromise;

        return initializePromise;
    }

    protected bootItem(name: string, item: Bootable) {

        let ans = item.getBootFunction()();

        if (ans instanceof Promise) {
            ans
                .then(
                    success => {
                        console.log("[BootSequence] Bootable resolved!", name, success);
                        this.__resolvedBootables[name] = success;
                        const trigger = this.__bootItens.get(name)!.triggerEvent;
                        if (Array.isArray(trigger)) {
                            trigger.forEach((t) => item.emit(t));
                        } else {
                            item.emit(trigger);
                        }

                        this.emit(BootSequenceItemResolved, name, success);
                    }
                )
                .catch(err => {
                    console.error("[Bootstrap] Failed to boot ", name, " error: ", err);
                });
        } else {
            this.__resolvedBootables[name] = ans == true;
            this.emit(BootSequenceItemResolved, name, ans == true);
        }

    }

    protected bootAfterDependencies(name: string, item: Bootable, dependencies: string[]) {

        if (this.checkDependencies(dependencies)) {
            this.bootItem(name, item);
        } else {
            console.log("[BootSequence] Will boot AFTER dependencies", name, dependencies);

            let resolveFn = () => {
                console.log("[BootSequence] Boot after dependencies resolveFn -> ", name, dependencies, this.__resolvedBootables);
                /*
                 * # - If once a 'bootableResolved' was triggered but all dependencies were not satisfied
                 * assign it again!
                 */
                if (this.checkDependencies(dependencies)) {
                    console.log("[BootSequence] Will now boot item ", name);
                    this.off(BootSequenceItemResolved, resolveFn);
                    this.bootItem(name, item);
                }
            };

            //# - Check dependencies on 'bootableResolved' **only once**, will cause recursion if 'on' instead!
            this.on(BootSequenceItemResolved, resolveFn);
        }
    }

    protected checkDependencies(dependencies: string[]): boolean {

        let allResolved = true;

        dependencies.forEach((dep) => {
            if (this.__resolvedBootables[dep] === undefined) {
                allResolved = false;
            }
        });
        return allResolved;
    }

    public onInitialize(): Promise<boolean> {
        if (this.initializePromise == null)
            this.createInitializePromise();

        return this.initializePromise;
    }

    async initialize(): Promise<boolean> {
        let initPromise = this.onInitialize();
        this.emit('initialize');
        return initPromise;
    }
}

export const BootSequenceItemResolved = "bootableResolved";
export const BootSequenceBootFinished = "allResolved";