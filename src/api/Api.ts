import RacDomainApi from './rac/RacDomainApi';
import RacSysApi from './rac/RacSysApi';
import RacPermGroupApi from './rac/RacPermGroupApi';
import RacPermApi from './rac/RacPermApi';
import RacSignInApi from './rac/RacSignInApi';
import RacRoleApi from './rac/RacRoleApi';
import RacOrgApi from './rac/RacOrgApi';
import RacAccountApi from './rac/RacAccountApi';
import RacOpLogApi from './rac/RacOpLogApi';

export const racDomainApi = new RacDomainApi();
export const racSysApi = new RacSysApi();
export const racPermGroupApi = new RacPermGroupApi();
export const racPermApi = new RacPermApi();
export const racRoleApi = new RacRoleApi();
export const racOrgApi = new RacOrgApi();
export const racAccountApi = new RacAccountApi();
export const racSignInApi = new RacSignInApi();
export const racOpLogApi = new RacOpLogApi();
