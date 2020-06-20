export const PasswordDataType = {
    name: "Password",
    validators: [
        // Not Null and > 2 characters
        (pass) => {
            if (pass != null)
                return pass.length > 2 ? true : "Password length is too short!";
            return "Password cannot be null!";
        },
        // At least 1 uppercase
        (pass) => {
            if (String(pass).match(/[A-Z]/))
                return true;
            else
                return "Password must have AT LEAST 1 uppercase character!";
        }
    ]
};
//# sourceMappingURL=PasswordDataType.js.map