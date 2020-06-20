import { User } from "../User.js";

export class UserAccessibleInterface {

    protected user: User;
    
    constructor(user: User) {
        this.user = user;
    }
}