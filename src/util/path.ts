/**
 * 获取文件目录
 * @param filePath 文件路径
 */
export function getFileDir(filePath: string): string {
    const index = filePath.lastIndexOf('/');
    if (index == -1) return '';
    return filePath.substring(0, index + 1);
}

/**
 * 联合路径
 * @param paths 路径列表
 */
export function contactPath(...paths: string[]): string {
    let result = '';
    for (const path of paths) {
        if (result[result.length - 1] !== '/' && path[0] !== '/') {
            result += '/';
        }
        result += path;
    }
    return result;
}

/**
 * 获取图片超链接
 * @param imgPath 图片路径(相对于/assets/img/目录)
 */
export function getAssetsImgHref(imgPath: string) {
    return new URL(`../assets/img/${imgPath}`, import.meta.url).href;
}
