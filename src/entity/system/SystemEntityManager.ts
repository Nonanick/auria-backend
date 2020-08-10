import { EntityManager } from 'auria-entity';
import { Bootable } from '../../boot/Bootable.js';

export class SystemEntityManager extends EntityManager implements Bootable {

  constructor() {
    super("SystemEntityManager");
  }

  getBootDependencies() : string[] {
    return [];
  }

  getBootableName() : string {
    return 'SystemEntityManager';
  }

  getBootFunction(dependencies: { [name: string]: any; }) {

    return () => {

      return true;
    };
  }
 
}