<template>
    <div>
        <table class="tableFile">
            <tr>
                <td class="td1">姓名</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">性别</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">身份证</td>
                <td class="td2">{{ name }}</td>
                <td rowspan="4"><img style="height: 120px" src="@/asset/logo.png" /></td>
            </tr>
            <tr>
                <td class="td1">名族</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">籍贯</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">文化程度</td>
                <td class="td2">{{ name }}</td>
            </tr>
            <tr>
                <td class="td1">毕业院校</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">专业</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">学位</td>
                <td class="td2">{{ name }}</td>
            </tr>
            <tr>
                <td class="td1">出生年月</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">出生地址</td>
                <td colspan="3">{{ name }}</td>
            </tr>
            <tr>
                <td class="td1">工作单位及职务</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">工作地址</td>
                <td colspan="4">{{ name }}</td>
            </tr>
            <tr>
                <td class="td1">工作职务</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">工作职称</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">行政级别</td>
                <td class="td2" colspan="2">{{ name }}</td>
            </tr>
            <tr>
                <td class="td1">参加工作日期</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">先任职日期</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">政治面貌</td>
                <td class="td2" colspan="2">{{ name }}</td>
            </tr>
            <tr>
                <td class="td1">一卡通号作日期</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">宿舍编号</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">班级职务</td>
                <td class="td2" colspan="2">{{ name }}</td>
            </tr>
            <tr>
                <td class="td1">学号</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">入学时间</td>
                <td class="td2">{{ name }}</td>
                <td class="td3">毕业时间</td>
                <td class="td2" colspan="2">{{ name }}</td>
            </tr>

            <tr>
                <td class="td1" colspan="7">联系情况:</td>
            </tr>
            <tr>
                <td class="td1" rowspan="4" style="text-align: center">联系<br />方式</td>
                <td class="td3">个人手机</td>
                <td class="td2" colspan="2">{{ name }}</td>
                <td class="td3">邮政编码</td>
                <td class="td2" colspan="2">{{ name }}</td>
            </tr>
            <tr>
                <td class="td3">办公电话</td>
                <td class="td2" colspan="2">{{ name }}</td>
                <td class="td3">车牌号码</td>
                <td class="td2" colspan="2">{{ name }}</td>
            </tr>
            <tr>
                <td class="td3">电子邮箱</td>
                <td class="td2" colspan="2">{{ name }}</td>
                <td class="td3"></td>
                <td class="td2" colspan="2">{{ name }}</td>
            </tr>
            <tr>
                <td class="td3">其他联系方式</td>
                <td class="td2" colspan="5">{{ name }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'StudentsFile',
    data() {
        return {
            name: 'lsl',
        };
    },
};
</script>

<style scoped>
* {
    margin: 0 auto;
}
.tableFile {
    width: 1000px;
}
.tableFile td {
    border: 2px solid #000;
    height: 30px;
    padding-left: 5px;
}
.td1 {
    width: 120px;
}
.td2 {
    width: 200px;
}
.td3 {
    width: 90px;
}
</style>
