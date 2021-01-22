/**
 * 通过用户名称登录方法的参数
 */
export default class SignInByAccountNameTo {
    /** 系统ID */
    sysId = '';
    /** 组织ID */
    orgId?: string;
    /** 用户名称(手机号/电子邮箱/登录名称) */
    userName = '';
    /** 登录密码(需进行MD5摘要) */
    signInPswd = '';
}
