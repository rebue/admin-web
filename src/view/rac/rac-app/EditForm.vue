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
                <a-form-model-item label="应用名称" prop="name">
                    <a-input v-model.trim="model.name" />
                </a-form-model-item>
                <a-form-model-item label="应用编号" prop="id">
                    <a-input v-model.trim="model.id" :disabled="editFormType === EditFormTypeDic.Modify" />
                </a-form-model-item>
                <a-form-model-item label="URL" prop="url">
                    <a-input v-model.trim="model.url" />
                </a-form-model-item>
                <a-form-model-item label="领域ID" prop="realmId" v-show="false">
                    <a-input v-model.trim="model.realmId" type="hidden" />
                </a-form-model-item>
                <a-form-model-item label="Secret" prop="secret">
                    <a-input v-model.trim="model.secret" />
                </a-form-model-item>
                <a-form-model-item label="Client-Id" prop="clientId">
                    <a-input v-model.trim="model['clientId']" />
                </a-form-model-item>
                <a-form-model-item label="Redirect-URL" prop="redirectUrl">
                    <a-input v-model.trim="model['redirectUrl']" type="textarea" />
                </a-form-model-item>
                <a-form-model-item label="IP白名单" prop="ipWhiteList">
                    <a-input v-model.trim="model['ipWhiteList']" type="textarea" />
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-input v-model.trim="model.remark" type="textarea" />
                </a-form-model-item>
                <a-form-model-item label="应用图片" prop="logo">
                    <a-input v-model.trim="model.logo" type="hidden" />
                    <a-upload
                        name="logo"
                        list-type="picture-card"
                        class="avatar-uploader"
                        :show-upload-list="false"
                        action="/oss-svr/oss/obj/upload"
                        :before-upload="beforeUpload"
                        accept="image/*"
                        @change="handleUploadChange"
                    >
                        <img v-if="logoURL" :src="logoURL" alt="avatar" width="80" height="80" />
                        <div v-else>
                            <a-icon :type="logoLoading ? 'loading' : 'plus'" />
                        </div>
                    </a-upload>
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

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
const modelSource = {
    name: '',
    id: '',
    url: '',
    realmId: '',
    secret: '',
    clientId: '',
    redirectUrl: '',
    ipWhiteList: '',
    remark: '',
    logo: '',
};
export default {
    components: {
        BaseModal,
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
            logoURL: '',
            logoLoading: false,
        };
    },
    methods: {
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
                redirectUrl: record.redirectUrl ? record.redirectUrl.join('\n') : '',
                ipWhiteList: record.ipWhiteList ? record.ipWhiteList.join('\n') : '',
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
                            const { redirectUrl, ipWhiteList } = ro.extra.one;
                            this.model = {
                                ...ro.extra.one,
                                redirectUrl: redirectUrl ? redirectUrl.join('\n') : '',
                                ipWhiteList: ipWhiteList ? ipWhiteList.join('\n') : '',
                            };
                        })
                        .catch(() => (this.visible = false))
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
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
                    data['redirectUrl'] = this.linetoArr(data['redirectUrl']);
                    data['ipWhiteList'] = this.linetoArr(data['ipWhiteList']);

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
                this.logoLoading = true;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                const res = info.file.response;
                this.model.logo = res.extra.id;
                // this.logoURL = res.extra.url
                getBase64(info.file.originFileObj, imageUrl => {
                    this.logoURL = imageUrl;
                    this.logoLoading = false;
                });
            }
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
