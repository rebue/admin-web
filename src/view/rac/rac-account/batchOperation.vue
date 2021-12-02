<template>
    <a-form-model ref="form" :model="model" v-bind="formLayout">
        <a-form-model-item key="selectValue" label="账号状态">
            <a-select :value="model.selectValue" @change="handleChange">
                <a-select-option :value="item" v-for="(item, index) in checkedData" :key="index">
                    {{ item }}
                </a-select-option>
            </a-select>
        </a-form-model-item>
        <a-form-model-item key="uploadExcel" label="选择上传的Excel文件">
            <!-- <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="uploadFile"
                accept=".xls,.xlsx"
            > -->
            <a-upload
                name="excel"
                :multiple="true"
                :action="uploadUrl"
                @change="handleImportExcel"
                :headers="{ 'App-Id': getAppIdByUrl() }"
                :fileList="fileList"
                accept=".xls,.xlsx"
            >
                <!--accept=".xls,.xlsx"" -->
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
            link.href = racExcelApi.getDownload('account');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); //下载完成移除元素
        },
        //上传文件
        handleImportExcel(info) {
            console.log(info);
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            const fileList = [...info.fileList];
            this.fileList = fileList.slice(-1);
            console.log(fileList);
            console.log(this.fileList);
            if (info.file.status === 'done') {
                if (info.file.response.success) {
                    // this.$message.success(`${info.file.name} 文件上传成功`);
                    // if (info.file.response.code === 201) {
                    //     let {
                    //         message,
                    //         result: { msg, fileUrl, fileName },
                    //     } = info.file.response;
                    //     let href = window._CONFIG['domianURL'] + fileUrl;
                    //     this.$warning({
                    //         title: message,
                    //         content: (
                    //             <div>
                    //                 <span> {msg}</span>
                    //                 <br />
                    //                 <span>
                    //                     {' '}
                    //                     具体详情请{' '}
                    //                     <a href={href} target="_blank" download={fileName}>
                    //                         点击下载
                    //                     </a>
                    //                 </span>
                    //             </div>
                    //         ),
                    //     });
                    // } else {
                    //     this.$message.success(info.file.response.message || `${info.file.name} 文件上传成功`);
                    // }
                    // this.loadData();
                } else {
                    this.$message.error(`${info.file.name} ${info.file.response.message}.`);
                }
            } else if (info.file.status === 'error') {
                this.$message.error(`文件上传失败: ${info.file.msg} `);
            }
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
