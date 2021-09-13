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
                    <div v-if="model.imgUrl == ''" class="uploadClick" @click="uploadClick()">+</div>
                    <div v-else class="uploadImg" @click="uploadClick()">
                        <img :src="model.imgUrl" alt="" />
                    </div>

                    <image-uploader
                        v-model="showImageUploader"
                        :width="180"
                        :height="180"
                        :noRotate="false"
                        url="/oss-svr/oss/obj/upload"
                        @crop-upload-success="handleCropUploadSuccess"
                        @crop-upload-fail="handleCropUploadFail"
                        @crop-success="cropSuccess"
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
import { racAppApi } from '@/api/Api';
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
        };
    },
    methods: {
        //点击显示上传图片组件
        uploadClick() {
            this.showImageUploader = true;
        },
        cropSuccess(imgDataUrl) {
            //imgDataUrl其实就是经过base64转码过的图片
            this.model.imgUrl = imgDataUrl;
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
                            this.model = {
                                ...ro.extra.one,
                            };
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
    width: 80px;
    height: 80px;
    border: 1px dotted #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #ddd;
    cursor: pointer;
}
.uploadImg {
    width: 80px;
    height: 80px;
    cursor: pointer;
    img {
        width: 100%;
    }
}
</style>
