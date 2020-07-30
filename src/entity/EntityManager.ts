import { IEntityManager } from './IEntityManager.js';
import { Bootable } from '../boot/Bootable.js';
import { EventEmitter } from 'events';

export class EntityManager extends EventEmitter implements IEntityManager, Bootable {

  protected _name : string;
  get name() : string {
    return this._name;
  }

  constructor(name : string) {
    super();
    this._name = name;
  }
 
  getBootDependencies() : string[] {
    return [];
  }

  getBootableName() {
    return this.name;
  }

  getBootFunction(dependencies: { [name: string]: any; }) {
    return () => {
      return true;
    };
  }

}