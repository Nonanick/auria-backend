import { IParameterDataType } from "./IParameterDataType.js";

export const PasswordDataType: IParameterDataType = {
    name: "Password",
    validators: [
        // Not Null and > 2 characters
        (pass: string) => {
            if (pass != null) return pass.length > 2 ? true : "Password length is too short!";
            return "Password cannot be null!";
        },
        // At least 1 uppercase
        (pass: string) => {
            if (String(pass).match(/[A-Z]/)) return true;
            else return "Password must have AT LEAST 1 uppercase character!";
        }
    ]
};