import { EventEmitter } from "events";
import { Bootable } from "../boot/Bootable.js";
import { System } from "../System.js";
import { EntityClass } from "./EntityClass.js";

import { SystemEntities } from './system/SystemEntities.js';

export class EntityManager extends EventEmitter implements Bootable {
  private _systemEntities: {
    [entityName: string]: EntityClass;
  } = {};

  private entities: { [entityName: string]: EntityClass } = {};

  private system: System;

  constructor(system: System) {
    super();
    this.system = system;

    this._systemEntities = SystemEntities;

    for (let name in this._systemEntities) {
      this._systemEntities[name].setConnection(this.system.getConnection());
      this._systemEntities[name].systemConnection = this.system.getConnection();
    }
  }

  public getBootDependencies: () => string[] = () => [];

  getBootableName: () => string = () => "EntityManager";

  getBootFunction: () => () => Promise<boolean> = () => {
    return async () => {
      return true;
    };
  };

  public getAllEntities(): EntityClass[] {
    const allEntitys: EntityClass[] = [];

    for (let entityName in this.entities) {
      if (this.entities.hasOwnProperty(entityName)) {
        allEntitys.push(this.entities[entityName]);
      }
    }
    return allEntitys;
  }

  public getAllSystemEntities(): EntityClass[] {
    const allSystemEntities: EntityClass[] = [];

    for (let entityName in this._systemEntities) {
      if (this._systemEntities.hasOwnProperty(entityName)) {
        allSystemEntities.push(this._systemEntities[entityName]);
      }
    }
    return allSystemEntities;
  }

  public getEntity(name: string): EntityClass {
    if (this.entities[name] != null) {
      return this.entities[name];
    }

    if (this._systemEntities[name] != null) {
      return this._systemEntities[name];
    }

    throw new Error(
      "[EntityManager] Entity with name " + name + " does not exists!"
    );
  }

  public getSystemEntity(name: string): EntityClass {
    if (this._systemEntities[name] != null) {
      return this._systemEntities[name];
    }

    throw new Error(
      "[EntityManager] System Entity with name " + name + " does NOT exists!"
    );
  }
}
