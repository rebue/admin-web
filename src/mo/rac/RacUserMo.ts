/**
 * 用户
 *
 */
export class RacUserMo {
    /**
     * 用户ID
     * @mbg.generated 自动生成，如需修改，请删除本行
     */

    id = '';
    /**
     * 用户名
     */
    realName = '';
    isVerifiedRealname = '';
    /**
     * 身份证信息
     */
    idCard = '';
    isVerifiedIdcard = '';
    /**
     * 性别
     */
    sex = '';
    /**
     * 手机号
     */
    mobile = '';
    isVerifiedMobile = '';
    /**
     * 电子邮箱
     */
    email = '';
    isVerifiedEmail = '';

    /**
     * 建立时间戳
     */
    createTimestamp = '';

    /**
     * 修改时间戳
     */
    updateTimestamp = '';

    /**
     * 锁定原因
     */
    lockReason = '';
    /**
     * 解锁原因
     */
    unlockReason = '';
}
