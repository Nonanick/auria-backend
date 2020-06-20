export class ResourcePolicy {

    public name!: string;
    public title!: string;
    public description!: string;

    constructor(data?: Partial<ResourcePolicyData>) {

    }


}

export interface ResourcePolicyData {
    name: string;
    title : string;
    description : string;
    procedure : string | string[];
    
}