export declare class ResourcePolicy {
    name: string;
    title: string;
    description: string;
    constructor(data?: Partial<ResourcePolicyData>);
}
export interface ResourcePolicyData {
    name: string;
    title: string;
    description: string;
    procedure: string | string[];
}
