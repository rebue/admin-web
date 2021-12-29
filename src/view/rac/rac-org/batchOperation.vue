<template>
    <a-form-model ref="form" :model="model" v-bind="formLayout">
        <!-- <a-form-model-item key="selectValue" label="账号状态">
            <a-select :value="model.selectValue" @change="handleChange">
                <a-select-option :value="item" v-for="(item, index) in checkedData" :key="index">
                    {{ item }}
                </a-select-option>
            </a-select>
        </a-form-model-item> -->
        <a-form-model-item key="uploadExcel" label="选择上传的Excel文件">
            <a-upload
                name="excel"
                :multiple="true"
                :action="uploadUrl"
                :before-upload="beforeUpload"
                :remove="handleRemove"
                :headers="{ 'App-Id': getAppIdByUrl() }"
                :fileList="fileList"
                accept=".xls,.xlsx"
            >
                <a-button type="primary"> <a-icon type="upload" /> 上传文件 </a-button>
            </a-upload>
            <a-button class="export" style="width:125px;height:32px;font-size: 12px" @click="exportData()">
                <i class="iconfont icon-printdaoru"></i>
                点击下载模板文件
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>

<script>
import { racExcelApi } from '@/api/Api';
import { getAppIdByUrl } from '@/util/common';
export default {
    name: 'account-batch-operation',
    data() {
        this.getAppIdByUrl = getAppIdByUrl;
        this.formLayout = {
            labelCol: {
                xs: { span: 20 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        this.api = racExcelApi;
        return {
            loading: false,
            checkedData: ['启用', '禁用'],
            model: {
                selectValue: '启用',
            },
            //文件数据
            fileList: [],
            //上传文件地址
            uploadUrl: `/rac-svr/rac/excel/account/template-upload`,
        };
    },
    methods: {
        handleChange(e) {
            this.model.selectValue = e;
        },
        /** 下载excel样例 */
        exportData() {
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = racExcelApi.getDownload('org');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); //下载完成移除元素
        },
        handleRemove(file) {
            const index = this.fileList.indexOf(file);
            const newFileList = this.fileList.slice();
            newFileList.splice(index, 1);
            this.fileList = newFileList;
        },
        beforeUpload(file) {
            this.fileList = [...this.fileList, file];
            return false;
        },
        //上传文件
        handleImportExcel() {
            const { fileList } = this;
            const formData = new FormData();
            fileList.forEach(file => {
                formData.append('excel', file);
            });
            this.uploading = true;
            racExcelApi.getUpload('org', formData).finally(() => {
                this.$message.success('导入成功');
                this.callback();
            });
        },
        ok() {
            this.handleImportExcel();
            this.closeDialog();
        },
    },
};
</script>
<style lang="less" scoped>
/deep/ .export {
    position: absolute;
    top: -6px;
    right: -187px;
}
</style>
