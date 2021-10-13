<template>
    <fragment>
        <base-modal
            ref="baseModal"
            :title="EditFormTypeDic.getName(this.editFormType) + '应用'"
            :visible.sync="visible"
            :loading="loading"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
            :width="750"
        >
            <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                <a-form-model-item label="编码" prop="id">
                    <a-input v-model.trim="model.id" :disabled="editFormType === EditFormTypeDic.Modify" />
                </a-form-model-item>
                <a-form-model-item label="名称" prop="name">
                    <a-input v-model.trim="model.name" />
                </a-form-model-item>
                <a-form-model-item label="认证">
                    <a-select placeholder="请选择应用" v-model="model.authnType">
                        <a-select-option v-for="(item, index) in autoEnable" :key="index" :value="index">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                    <!-- <a-switch v-model="enable" checked-children="认证" un-checked-children="不认证" default-checked /> -->
                </a-form-model-item>
                <a-form-model-item label="标签">
                    <a-select mode="multiple" v-model="model.dicItemIds" showArrow>
                        <a-select-option v-for="(item, index) in labelSelect" :key="index" :value="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="URL" prop="url">
                    <a-input v-model.trim="model.url" />
                </a-form-model-item>
                <a-form-model-item label="领域ID" prop="realmId" v-show="false">
                    <a-input v-model.trim="model.realmId" type="hidden" />
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-input v-model.trim="model.remark" type="textarea" />
                </a-form-model-item>
                <a-form-model-item label="应用图片" prop="imgUrl">
                    <a-input v-model.trim="model.imgUrl" type="hidden" />
                    <div
                        v-if="model.imgUrl != '' && model.imgUrl != undefined"
                        class="uploadImg"
                        @click="uploadClick()"
                    >
                        <img :src="model.imgUrl" alt="" />
                    </div>
                    <div v-else class="uploadClick" @click="uploadClick()">
                        <a-icon type="plus" />
                    </div>

                    <image-uploader
                        v-model="showImageUploader"
                        :width="180"
                        :height="180"
                        :noRotate="false"
                        :params="params"
                        url="/oss-svr/oss/obj/upload"
                        @crop-upload-success="handleCropUploadSuccess"
                        @crop-upload-fail="handleCropUploadFail"
                        @crop-success="cropSuccess"
                        @src-file-set="srcFileSet"
                    />
                    <!-- <a-upload
                        name="avatar"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action="/oss-svr/oss/obj/upload"
                        :before-upload="beforeUpload"
                        accept="image/*"
                        @change="handleUploadChange"
                    >
                        <img v-if="model.imgUrl" :src="model.imgUrl" alt="avatar" width="80" height="80" />
                        <div v-else>
                            <a-icon :type="imgLoading ? 'loading' : 'plus'" />
                        </div>
                    </a-upload> -->
                </a-form-model-item>
            </a-form-model>
        </base-modal>
    </fragment>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racAppApi, racDicApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
import { message } from 'ant-design-vue';
import ImageUploader from 'vue-image-crop-upload/upload-2.vue';
const modelSource = {
    id: '',
    name: '',
    url: '',
    realmId: '',
    remark: '',
    imgUrl: '',
};
export default {
    components: {
        BaseModal,
        ImageUploader,
    },
    data() {
        this.api = racAppApi;
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {
            showImageUploader: false,
            visible: false,
            loading: false,
            EditFormTypeDic,
            editFormType: EditFormTypeDic.None,
            model: { ...modelSource },
            rules: {
                id: [
                    { required: true, message: '请输入应用编码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                name: [
                    { required: true, message: '请输入应用名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
            imgLoading: false,
            storagePhoto: '',
            params: {
                orignFileName: '',
            },
            labelSelect: [],
            autoEnable: ['未认证', '共用cookie（内部系统）', '授权码', '凭证'],
        };
    },
    methods: {
        /**请求标签下拉框内容 */
        getRacDicApiFun() {
            racDicApi.page().then(ro => {
                const data = ro.extra.page.list,
                    newArray = [];
                data.map(item => {
                    if (item.dicKey == 'ApplyLabel') {
                        item.children.map(childItem => {
                            newArray.push({
                                name: childItem.name,
                                id: childItem.id,
                            });
                        });
                    }
                });
                this.labelSelect = newArray;
            });
        },
        //点击显示上传图片组件
        uploadClick() {
            this.showImageUploader = true;
        },
        cropSuccess(imgDataUrl) {
            //imgDataUrl其实就是经过base64转码过的图片
            this.storagePhoto = imgDataUrl;
        },
        srcFileSet(fileName) {
            this.params.orignFileName = fileName;
        },
        /**
         * upload success
         *
         * [param] jsonData  server api return data, already json encode
         * [param] field
         */
        handleCropUploadSuccess(jsonData, field) {
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
            //成功
            if (jsonData.result == 1) {
                this.model.imgUrl = jsonData?.extra.url;
            }
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        handleCropUploadFail(status, field) {
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        },
        linetoArr(val) {
            //处理textarea值为数组
            const arr = val.split(/\n/);
            return arr.filter(v => {
                return v !== '';
            });
        },
        show: function(editFormType, record) {
            this.editFormType = editFormType;
            this.model = {
                ...modelSource,
                ...record,
            };
            this.getRacDicApiFun();
            this.visible = true;
        },
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();

                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.api
                        .getById(this.model.id)
                        .then(ro => {
                            const dicItemIds = [];
                            ro.extra.one.appLabelList?.map(item => {
                                dicItemIds.push(item.id);
                            });
                            this.model = {
                                ...ro.extra.one,
                                dicItemIds,
                            };
                            console.log(this.model);
                            // 图片初始化
                            this.logoURL = ro.extra.one?.obj?.url;
                        })
                        .catch(() => (this.visible = false))
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    // 图片初始化
                    this.logoURL = '';
                    this.loading = false;
                }
            });
        },
        handleOk() {
            //验证表单，处理表单数据，提交处理
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    //处理重定向URL，IP白名单
                    const data = { ...this.model };
                    if (this.editFormType === EditFormTypeDic.Add) {
                        this.api
                            .add(data)
                            .then(() => (this.visible = false))
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        this.api
                            .modify(data)
                            .then(() => (this.visible = false))
                            .finally(() => (this.loading = false));
                    }
                    this.loading = false;
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        handleUploadChange(info) {
            if (info.file.status === 'uploading') {
                this.imgLoading = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                const res = info.file.response;
                this.model.imgUrl = res.extra.url;
            }
            this.imgLoading = false;
        },
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('只能上传jpg图片!');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('图片大小不超过 2MB!');
            }
            return isJpgOrPng && isLt2M;
        },
    },
};
</script>
<style lang="less">
.uploadClick {
    width: 90px;
    height: 90px;
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: #ddd;
    background-color: #fafafa;
    cursor: pointer;
}
.uploadImg {
    width: 90px;
    height: 90px;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    img {
        width: 100%;
    }
}
</style>
