/** 校验身份证号 */
export function isIdCard(str): boolean {
    // 身份证号码为18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    const reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(str);
}
// 检查字符串是否为合法手机号码
export function isPhone(str): boolean {
    const reg = /^1\d{10}$/;
    return reg.test(str);
}

// 检查字符串是否为合法Email地址
export function isEmail(str): boolean {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(str);
}

// 检查字符串是否为合法URL地址
export function isURL(str): boolean {
    // const reg = /^((\/)|(http|https):\/\/)/
    const reg = /^((http|https):\/\/)(([a-zA-Z0-9_\-.]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,})*(\/[.+]*)*/;
    return reg.test(str);
}
