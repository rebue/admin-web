/**
 * 账户
 *
 */
export class RacAccountMo {
    /**
     * 账户ID
     * @mbg.generated 自动生成，如需修改，请删除本行
     */

    id = '';
    /**
     * 是否启用
     */
    isEnabled = false;

    /**
     * 登录名称
     */
    signInName = '';

    /**
     * 登录手机
     */
    signInMobile = '';

    /**
     * 登录邮箱
     */
    signInEmail = '';

    /**
     * 登录密码(小写(MD5(小写(MD5(密码明文))+小写(密码组合码))))
     *              注意：
     *              1. 计算方法中的密码在前端传过来时推荐先进行md5序列化，以避免在密码传递过程中使用明码被截获
     *              2. 密码组合码在生成密码时随机生成并保存下来，和密码组合起来使用，增加破解的难度
     */
    signInPswd = '';

    /**
     * 登录密码组合码(与密码组合加密用，详见登录密码备注)
     */
    signInPswdSalt = '';

    /**
     * 登录账户昵称
     */
    signInNickname = '';

    /**
     * 登录账户头像
     */
    signInAvatar = '';

    /**
     * 微信的OpenId
     */
    wxOpenId = '';

    /**
     * 微信的UnionId
     */
    wxUnionId = '';

    /**
     * 微信昵称
     */
    wxNickname = '';

    /**
     * 微信头像
     */
    wxAvatar = '';

    /**
     * QQ的OpenId
     */
    qqOpenId = '';

    /**
     * QQ的UnionId
     */
    qqUnionId = '';

    /**
     * QQ昵称
     */
    qqNickname = '';

    /**
     * QQ头像
     */
    qqAvatar = '';

    /**
     * 是否测试者
     */
    isTester = '';

    /**
     * 建立时间戳
     */
    createTimestamp = '';

    /**
     * 修改时间戳
     */
    updateTimestamp = '';

    /**
     * 组织ID
     */
    orgId = '';

    /**
     * 组织
     */
    org = '';

    /**
     * 支付密码(小写(MD5(小写(MD5(密码明文))+小写(密码组合码))))
     */
    payPswd = '';

    /**
     * 支付密码组合码(与支付密码组合加密用，详见支付密码备注)
     */
    payPswdSalt = '';

    /**
     * 用户ID
     */
    userId = '';

    /**
     * 用户
     */
    user = '';

    /**
     * 备注
     */
    remark = '';

    /**
     * 领域ID
     */
    realmId = '';

    /**
     * 领域
     */
    realm = '';

    /**
     * 锁定原因
     */
    lockReason = '';
    /**
     * 解锁原因
     */
    unlockReason = '';
}
