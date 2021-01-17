import RacDomainApi from './rac/RacDomainApi';
import RacSysApi from './rac/RacSysApi';
import RacPermGroupApi from './rac/RacPermGroupApi';
import RacPermApi from './rac/RacPermApi';
import RacSignInApi from './rac/RacSignInApi';
import RacUserApi from './rac/RacUserApi';

export const racDomainApi = new RacDomainApi();
export const racSysApi = new RacSysApi();
export const racPermGroupApi = new RacPermGroupApi();
export const racPermApi = new RacPermApi();
export const racUserApi = new RacUserApi();
export const racSignInApi = new RacSignInApi();
