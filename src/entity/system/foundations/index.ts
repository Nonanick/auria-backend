import { EntityFoundation } from 'auria-entity';
import { EntityEntityFoundation } from './EntityEntityFoundation.js';

export const SystemEntities = asSystemEntity({
  entities : new EntityEntityFoundation()
});

function asSystemEntity<T extends {
  [name: string]: EntityFoundation
}>(arg: T): T {
  return arg;
}