import { ApiAccess } from './apiAccess/ApiAccess.js';
import { ColumnEntityInstance } from './column/ColumnEntityInstance.js';
import { ColumnProxy } from './columnProxy/ColumnProxy.js';
import { ColumnValidation } from './columnValidation/ColumnValidation.js';
import { Connection } from './connection/Connection.js';
import { EntityInstance } from './entity/EntityInstance.js';
import { EntityFacade } from './entityFacade/EntityFacade.js';
import { EntityProcedureHistory } from './entityProcedureHistory/EntityProcedureHistory.js';
import { EntityProcedurePermission } from './entityProcedurePermission/EntityProcedurePermission.js';
import { EntityRowAccessShare } from './entityRowAccessShare/EntityRowAccessShare.js';
import { Module } from './module/Module.js';
import { ModuleMenu } from './moduleMenu/ModuleMenu.js';
import { ModulePage } from './modulePage/ModulePage.js';
import { ModulePagePermission } from './modulePagePermission/ModulePagePermission.js';
import { PersistentLogin } from './persistentLogin/PersistentLogin.js';
import { Proxy } from './proxy/Proxy.js';
import { ReferenceInstance } from './reference/ReferenceInstance.js';
import { Role } from './role/Role.js';
import { User } from './user/User.js';
import { UserInfo } from './userInfo/UserInfo.js';
import { UserRole } from './userRole/UserRole.js';
import { Validation } from './validation/Validation.js';


export const SystemEntities = {
  ApiAccess : new ApiAccess(),
  ColumnEntityInstance : new ColumnEntityInstance(),
  ColumnProxy : new ColumnProxy(),
  ColumnValidation : new ColumnValidation(),
  Connection : new Connection(),
  EntityInstance : new EntityInstance(),
  EntityFacade : new EntityFacade(),
  EntityProcedureHistory : new EntityProcedureHistory(),
  EntityProcedurePermission : new EntityProcedurePermission(),
  EntityRowAccessShare : new EntityRowAccessShare(),
  Module : new Module(),
  ModuleMenu : new ModuleMenu(),
  ModulePage : new ModulePage(),
  ModulePagePermission : new ModulePagePermission(),
  PersistentLogin : new PersistentLogin(),
  Proxy : new Proxy(),
  ReferenceInstance : new ReferenceInstance(),
  Role : new Role(),
  User : new User(),
  UserInfo : new UserInfo(),
  UserRole : new UserRole(),
  Validation : new Validation(),
};