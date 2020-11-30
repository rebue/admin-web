/**
 * 门锁信息
 */
export default interface SignInByUserNameTo {
    /** 系统ID */
    sysId: string;
    /** 组织ID */
    orgId?: string;
    /** 用户名称(手机号/电子邮箱/登录名称) */
    userName: string;
    /** 登录密码(需进行MD5摘要) */
    signInPswd: string;
}
