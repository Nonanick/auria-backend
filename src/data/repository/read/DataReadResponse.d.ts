import { IReadResponse, IReadRequest } from "auria-lib";
export declare class DataReadResponse implements IReadResponse {
    from: string;
    request: IReadRequest<any>;
    length: number;
    success: boolean;
    constructor(request: IReadRequest);
    all(): any[];
}
