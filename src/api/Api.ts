/*
 * @Date: 2021-09-29 10:38:47
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-29 20:18:21
 * @FilePath: \admin-web\src\api\Api.ts
 */
import RacRealmApi from './rac/RacRealmApi';
import RacAppApi from './rac/RacAppApi';
import RacPermGroupApi from './rac/RacPermGroupApi';
import RacPermApi from './rac/RacPermApi';
import RacSignInApi from './rac/RacSignInApi';
import RacAgentSignInApi from './rac/RacAgentSignInApi';
import RacAgentSignOutApi from './rac/RacAgentSignOutApi';
import RacRoleApi from './rac/RacRoleApi';
import RacOrgApi from './rac/RacOrgApi';
import RacAccountApi from './rac/RacAccountApi';
import RacOpLogApi from './rac/RacOpLogApi';
import RacLockLogApi from './rac/RacLockLogApi';
import RacDisableLogApi from './rac/RacDisableLogApi';
import RacPermUrnApi from './rac/RacPermUrnApi';
import RacPermMenuApi from './rac/RacPermMenuApi';
import RacDicApi from './rac/RacDicApi';
import RacDicItemApi from './rac/RacDicItemApi';
import RacPermCommandApi from './rac/RacPermCommandApi';
import RacVerifitionApi from './rac/RacVerifitionApi';
import RacUserApi from './rac/RacUserApi';
import RacSignInUnlockApi from './rac/RacSignInUnlockApi';
import OapAppApi from './oap/OapAppApi';
import OapConfig from './oap/OapConfig';
import EtlStrategyApi from './etl/EtlStrategyApi';
import EtlConnApi from './etl/EtlConnApi';
import RacStatusApi from './rac/RacStatusApi';
import RaclevelProtectApi from './rac/RaclevelProtectApi';

export const racRealmApi = new RacRealmApi();
export const racAppApi = new RacAppApi();
export const racPermGroupApi = new RacPermGroupApi();
export const racPermApi = new RacPermApi();
export const racRoleApi = new RacRoleApi();
export const racOrgApi = new RacOrgApi();
export const racAccountApi = new RacAccountApi();
export const racSignInApi = new RacSignInApi();
export const racAgentSignInApi = new RacAgentSignInApi();
export const racAgentSignOutApi = new RacAgentSignOutApi();
export const racOpLogApi = new RacOpLogApi();
export const racLockLogApi = new RacLockLogApi();
export const racDisableLogApi = new RacDisableLogApi();
export const racPermUrnApi = new RacPermUrnApi();
export const racPermMenuApi = new RacPermMenuApi();
export const racDicApi = new RacDicApi();
export const racDicItemApi = new RacDicItemApi();
export const racPermCommandApi = new RacPermCommandApi();
export const racVerifitionApi = new RacVerifitionApi();
export const racUserApi = new RacUserApi();
export const racSignInUnlockApi = new RacSignInUnlockApi();
export const oapAppApi = new OapAppApi();
export const oapConfig = new OapConfig();
export const etlStrategyApi = new EtlStrategyApi();
export const etlConnApi = new EtlConnApi();
export const racStatusApi = new RacStatusApi();
export const raclevelProtectApi = new RaclevelProtectApi();
