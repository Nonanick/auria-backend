import { ISystemResponse } from "auria-lib";
import { CookieOptions } from "express";

export class SystemResponse implements ISystemResponse {

    protected _exitCode: string;

    public get exitCode(): string {
        return this._exitCode;
    }

    public message: string;

    public errors: string[] = [];

    public data: any;

    public httpStatus: number = 200;

    public headers: {
        [name: string]: string
    } = {};

    public cookies : {
        [name : string] : {
            value : string,
            options : CookieOptions
        }
    } = {};


    constructor(message: string) {
        this.message = message;
        this._exitCode = "SYS.REQUEST.DONE";
    }

    public setExitCode(code: string) {
        this._exitCode = code;
    }

}