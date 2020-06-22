import { IReadResponse, IReadRequest } from "auria-lib";

export class DataReadResponse implements IReadResponse {

    public from!: string;
    public request!: IReadRequest<any>;
    public length: number = 0;
    public success: boolean = false;

    constructor(request : IReadRequest) {
        //this.request = request;
        this.from = request.from;
    }

    public all(): any[] {
        throw new Error("Method not implemented.");
    }

}