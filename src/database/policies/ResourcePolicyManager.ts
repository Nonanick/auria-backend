import { ResourcePolicy } from "./ResourcePolicy.js";

export class ResourcePolicyManager {

    protected policies : Map<string, ResourcePolicy>;

    constructor() {
        this.policies = new Map();
    }
}