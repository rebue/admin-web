import { default as Database } from 'better-sqlite3';
import { default as fs } from 'fs';
import { join } from 'path';

/**
 * 连接数据库
 * @param dbName 数据库名称
 * @returns 操作数据库的实例
 */
export const connect = (dbName: string) => {
    const dbPath = join(__dirname, '..', 'data', `${dbName}.sqlite`);
    const exist = fs.existsSync(dbPath);
    const db = new Database(dbPath);
    if (!exist) {
        let sql = fs.readFileSync(join(__dirname, '..', 'script', 'db', `${dbName}Db.sql`), { encoding: 'utf-8' });
        db.exec(sql);

        sql = fs.readFileSync(join(__dirname, '..', 'script', 'data', `${dbName}Data.sql`), { encoding: 'utf-8' });
        db.exec(sql);
    }
    return db;
};

export const convert = (data: any) => {
    if (Array.isArray(data)) {
        const result: any[] = [];
        data.forEach((item) => {
            const obj = {};
            for (const key in item) {
                obj[constantToCamel(key)] = item[key];
            }
            result.push(obj);
        });
        return result;
    } else {
        const obj = {};
        for (const key in data) {
            obj[constantToCamel(key)] = data[key];
        }
        return obj;
    }
};

/**
 * 将常量风格转成小驼峰风格(HELLO_WORLD => helloWorld)
 * @param value 常量风格的字符串
 * @returns 小驼峰风格的字符串
 */
function constantToCamel(value: string) {
    const temp = value.toLowerCase();
    if (temp.indexOf('_') >= 0) {
        return temp.replace(/_(\w)/g, function ($0, $1) {
            return $1.toUpperCase();
        });
    } else {
        return temp;
    }
}
