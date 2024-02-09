/** 字节转换 */
export function byteConvert(size: number) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    size = Math.abs(size);
    let i = 0;
    for (; size >= 1024 && i < 4; i++) size /= 1024;
    return (size < 0 ? '-' : '') + size.toFixed(2) + units[i];
}

/**
 * 格式化百分比(保留小数后两位)
 * @param value 要格式化的百分比值
 */
export function formatPercent(value: number) {
    return value.toFixed(2) + '%';
}
