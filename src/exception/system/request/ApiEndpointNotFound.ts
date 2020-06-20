import { AuriaException } from "auria-lib";

export class ApiEndpointNotFound extends AuriaException {

    getCode() {
        return "SYS.REQUEST.API_ENDPOINT_NOT_FOUND";
    }
    
}