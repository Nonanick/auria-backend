import { AuriaException } from "auria-lib";
export declare class LoginAttemptDenied extends AuriaException {
    getCode(): string;
    constructor(message: string, options?: {
        cooldown?: number;
    });
}
