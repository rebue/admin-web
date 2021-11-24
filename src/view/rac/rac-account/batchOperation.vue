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
            <a-upload name="file" :multiple="true" :action="uploadUrl" @change="handleImportExcel" accept=".xls,.xlsx">
                <a-button type="primary"> <a-icon type="upload" /> 上传文件 </a-button>
                <!-- <a-button style="width:100px;height:30px;font-size: 12px">
                    <i class="iconfont icon-printdaoru"></i>
                    上传文件
                </a-button> -->
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
// import XLSX from 'xlsx';
// import Excel from '../../../util/excel.js';

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
        return {
            loading: false,
            checkedData: ['启用', '禁用'],
            model: {
                selectValue: '启用',
            },
            //文件数据
            fileList: [],
            //上传文件地址
            // uploadUrl: `/oss-svr/oss/obj/upload`,
            uploadUrl: `/rac-svr/rac/excel/account/template-upload`,
        };
    },
    created() {
        this.rewriteFRread();
    },
    methods: {
        handleChange(e) {
            this.model.selectValue = e;
        },
        /** 下载excel样例 */
        exportData() {
            racExcelApi.getDownload('account').then(ro => {
                console.log(ro);
            });
            // this.getDownload()
            // const data = [
            //     {
            //         code: '20211104',
            //         signInNickname: '张三',
            //         signInName: 'zhangsan',
            //         signInPswd: 'a1234567',
            //         isTester: '否',
            //         remark: '备注',
            //         realName: '李四',
            //         idCard: '452501200000000000',
            //         mobile: '18200001234',
            //         email: '9999999@qq.com',
            //     },
            // ];
            // const date = new Date();
            // const year = date.getFullYear();
            // let month = date.getMonth() + 1;
            // let day = date.getDate();
            // month = month < 10 ? '0' + month : month;
            // day = day < 10 ? '0' + day : day;
            // const currentDate = year + '' + month + '' + day;
            // Excel.exportExcel(data, '上传文件模板' + currentDate);
        },
        //导入功能不兼容IE方法
        rewriteFRread() {
            FileReader.prototype.readAsBinaryString = function(fileData) {
                let binary = '';
                // eslint-disable-next-line consistent-this
                const pt = this;
                const reader = new FileReader();
                reader.onload = function(e) {
                    const bytes = new Uint8Array(reader.result);
                    const length = bytes.byteLength;
                    for (let i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    pt.content = binary;
                    pt.onload(pt);
                };
                reader.readAsArrayBuffer(fileData);
            };
            console.log('rewrite success');
        },
        //上传文件
        uploadFile(info) {
            // const files = [...info.fileList];
            // if (files.length <= 0) {
            //     //如果没有文件名
            //     return false;
            // } else if (files[0].name.includes('xls') == false && files[0].name.includes('xlsx') == false) {
            //     this.$message.error('上传格式不正确，请上传xls或者xlsx格式');
            //     return false;
            // }
            // const fileReader = new FileReader();
            // if (info.file.status !== 'uploading') {
            //     fileReader.onload = ev => {
            //         try {
            //             // const data = ev.target.result;
            //             const data = ev.content;
            //             const workbook = XLSX.read(data, {
            //                 type: 'binary',
            //             });
            //             const wsname = workbook.SheetNames[0]; //取第一张表
            //             const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
            //             console.log(ws);
            //             // ws.map((item, index) => {
            //             //     item.value = item.value == undefined ? '' : _this.Base64.decode(item.value);
            //             //     _this.dataList.map((childItem, childIndex) => {
            //             //         if (childIndex == index) {
            //             //             if (item.value == undefined) {
            //             //                 childItem.value == '';
            //             //             } else {
            //             //                 childItem.value = item.value;
            //             //             }
            //             //         }
            //             //     });
            //             //     _this.headerList.push({
            //             //         PARAM_NAME: item.PARAM_NAME,
            //             //         value: item.value,
            //             //         PARAM_TYPE: item.PARAM_TYPE,
            //             //         PARAM_ID: item.PARAM_ID,
            //             //         IS_REQUIREDFIELDS: item.IS_REQUIREDFIELDS,
            //             //         IS_GROUP: item.IS_GROUP,
            //             //         DATA_PARAM: item.DATA_PARAM,
            //             //     });
            //             // });
            //         } catch (e) {
            //             return false;
            //         }
            //     };
            //     fileReader.readAsBinaryString(files[0].originFileObj);
            // }
            // if (info.file.status === 'done') {
            //     this.$message.success(`${info.file.name} file uploaded successfully`);
            // } else if (info.file.status === 'error') {
            //     // this.$message.success(`${info.file.name} file uploaded successfully`);
            // }
        },
        handleImportExcel(info) {
            console.log(info);
            // if (info.file.status !== 'uploading') {
            // 	console.log(info.file, info.fileList);
            // }
            // if (info.file.status === 'done') {
            // 	if (info.file.response.success) {
            // 		// this.$message.success(`${info.file.name} 文件上传成功`);
            // 		if (info.file.response.code === 201) {
            // 			let {
            // 				message,
            // 				result: {
            // 					msg,
            // 					fileUrl,
            // 					fileName
            // 				}
            // 			} = info.file.response
            // 			let href = window._CONFIG['domianURL'] + fileUrl
            // 			this.$warning({
            // 				title: message,
            // 				content: (
            // 					<div >
            // 						<span> {msg}</span><br/>
            // 						<span> 具体详情请 <a href = {href} target = "_blank" download = {fileName} >点击下载</a></span >
            // 					</div>
            // 				)
            // 			})
            // 		} else {
            // 			this.$message.success(info.file.response.message || `${info.file.name} 文件上传成功`)
            // 		}
            // 		this.loadData()
            // 	} else {
            // 		this.$message.error(`${info.file.name} ${info.file.response.message}.`);
            // 	}
            // } else if (info.file.status === 'error') {
            // 	this.$message.error(`文件上传失败: ${info.file.msg} `);
            // }
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
