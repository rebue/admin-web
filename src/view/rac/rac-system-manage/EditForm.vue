<template>
    <fragment>
        <base-modal
            ref="baseModal"
            :title="EditFormTypeDic.getName(this.editFormType) + '公众号'"
            :visible.sync="visible"
            :loading="loading"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleSubmit"
            :width="750"
        >
            <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                <a-form-model-item label="类型">
                    <a-select placeholder="请选择类型" v-model="model.type">
                        <a-select-option v-for="(item, index) in autoEnable" :key="index" :value="index">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="名称" prop="name">
                    <a-input v-model.trim="model.name" />
                </a-form-model-item>
                <a-form-model-item label="appid" prop="appid">
                    <a-input v-model.trim="model.appid" />
                </a-form-model-item>
                <a-form-model-item label="appsecret" prop="appsecret">
                    <a-input v-model.trim="model.appsecret" />
                </a-form-model-item>
                <a-form-model-item label="备注">
                    <a-input v-model.trim="model.textarea" type="textarea" />
                </a-form-model-item>
            </a-form-model>
        </base-modal>
    </fragment>
</template>
<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { oapAppApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
// 表单空数据结构
const modelSource = {
    type: '企业微信号',
    name: '',
    appid: '',
    appsecret: '',
    textarea: '',
};
export default {
    components: {
        BaseModal,
    },
    data() {
        this.api = oapAppApi;
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
            model: { ...JSON.parse(JSON.stringify(modelSource)) },
            secretShow: false,
            rules: {
                name: [{ required: true, message: '请输入名称', trigger: 'blur', transform: val => val && val.trim() }],
                appid: [
                    { required: true, message: '请输入appid', trigger: 'blur', transform: val => val && val.trim() },
                ],
                appsecret: [
                    {
                        required: true,
                        message: '请输入appsecret',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            enable: true, // false不认证：表单域会disabled, 表单清除校验，禁用点击添加和删除
            autoEnable: ['企业微信号'],
        };
    },
    computed: {
        disabled() {
            return !this.enable;
        },
    },
    methods: {
        formatList(list) {
            if (list.length) {
                return list.map((v, index) => {
                    return {
                        value: v,
                        key: new Date().getTime() + index,
                    };
                });
            } else {
                return [
                    {
                        value: '',
                        key: new Date().getTime(),
                    },
                ];
            }
        },
        formatDetail(detail) {
            const { redirectUris, ipAddrs } = detail;
            if (redirectUris) {
                detail.redirectUris = this.formatList(redirectUris);
            }
            if (ipAddrs) {
                detail.ipAddrs = this.formatList(ipAddrs);
            }
            return detail;
        },
        show: function(editFormType, record) {
            this.editFormType = editFormType;
            this.model = {
                ...JSON.parse(JSON.stringify(modelSource)),
                ...JSON.parse(JSON.stringify(this.formatDetail(record))),
            };
            console.log(this.model);
            this.visible = true;
            this.enable = true;
        },
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();
                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.api
                        .getByAppId(this.model.appId)
                        .then(ro => {
                            const authnType = ro.extra.racAppMo.authnType;
                            this.model = {
                                ...JSON.parse(JSON.stringify(this.model)),
                                ...JSON.parse(JSON.stringify(this.formatDetail(ro.extra))),
                                authnType,
                            };
                            this.secretShow = false;
                        })
                        .catch(() => (this.visible = false))
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    this.secretShow = true;
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
                    const data = { ...JSON.parse(JSON.stringify(this.model)) };
                    data.redirectUris = data.redirectUris.map(v => {
                        return v.value;
                    });
                    data.ipAddrs = data.ipAddrs.map(v => {
                        return v.value;
                    });
                    if (!this.secretShow) {
                        delete data.secret;
                    }
                    if (this.editFormType === EditFormTypeDic.Add) {
                        this.api
                            .add(data)
                            .then(() => (this.visible = false))
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        console.log(data);
                        if (data.authnType == 0) {
                            this.api
                                .delById(data.id)
                                .then(() => (this.visible = false))
                                .finally(() => (this.loading = false));
                        } else {
                            this.api
                                .modify(data)
                                .then(() => (this.visible = false))
                                .finally(() => (this.loading = false));
                        }
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
        handleSubmit() {
            if (this.enable) {
                this.handleOk();
            } else {
                if (this.editFormType === EditFormTypeDic.Add) {
                    //不认证，添加，提交，直接关闭弹窗
                    this.visible = false;
                } else if (this.editFormType === EditFormTypeDic.Modify) {
                    //不认证，修改，提交，删除认证
                    this.loading = true;
                    this.api
                        .delById(this.model.id)
                        .then(() => (this.visible = false))
                        .finally(() => (this.loading = false));
                }
            }
        },
    },
    watch: {
        enable(val) {
            if (!val) {
                this.$refs.form.clearValidate();
            }
        },
    },
};
</script>
<style scoped>
.dynamic-add-button {
    margin: 0 10px;
}
.copyIconStyle {
    cursor: pointer;
    margin: 0 10px;
}
.copyIconStyle + .refresh-btn {
    position: absolute;
    top: -8px;
}
</style>
