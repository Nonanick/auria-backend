import { AuriaException } from 'auria-lib';

export class ConnectionFailed extends AuriaException {
  getCode() {
    return 'SYS.DB.CONNECTION_FAILED';
  }
}