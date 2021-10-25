<template>
    <fragment>
        <base-modal
            ref="baseModal"
            :title="EditFormTypeDic.getName(this.editFormType) + configType + '配置'"
            :visible.sync="visible"
            :loading="loading"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
            :width="750"
        >
            <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                <!-- <a-form-model-item label="类型">
                    <a-select placeholder="请选择类型" v-model="model.type">
                        <a-select-option v-for="(item, index) in autoEnable" :key="index" :value="index">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item> -->
                <a-form-model-item label="名称" prop="newName">
                    <a-input v-model.trim="model.newName" />
                </a-form-model-item>
                <a-form-model-item label="appid" prop="newAppKey">
                    <a-input v-model.trim="model.newAppKey" />
                </a-form-model-item>
                <a-form-model-item label="appsecret" prop="newAppSecret">
                    <a-input v-model.trim="model.newAppSecret" />
                </a-form-model-item>
                <!-- <a-form-model-item label="备注">
                    <a-input v-model.trim="model.textarea" type="textarea" />
                </a-form-model-item> -->
            </a-form-model>
        </base-modal>
    </fragment>
</template>
<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { oapConfig } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
// 表单空数据结构
const modelSource = {
    // type: '企业微信号',
    newName: '',
    newAppKey: '',
    newAppSecret: '',
    // textarea: '',
};
export default {
    components: {
        BaseModal,
    },
    props: {
        configType: {
            type: String,
        },
    },
    data() {
        this.api = oapConfig;
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
                newName: [
                    { required: true, message: '请输入名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
                newAppKey: [
                    { required: true, message: '请输入appid', trigger: 'blur', transform: val => val && val.trim() },
                ],
                newAppSecret: [
                    {
                        required: true,
                        message: '请输入appsecret',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            enable: true, // false不认证：表单域会disabled, 表单清除校验，禁用点击添加和删除
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
            this.visible = true;
            this.enable = true;
        },
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();
                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.model = {
                        oldName: this.model.name,
                        oldAppKey: this.model.id,
                        oldAppSecret: this.model.secret,
                        newAppKey: this.model.id,
                        newAppSecret: this.model.secret,
                        newName: this.model.name,
                    };
                    this.loading = false;
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
                    const configType = this.configType == '钉钉' ? 'ding-talk' : 'wechat-open';
                    const data = { ...this.model, configType };
                    if (this.editFormType === EditFormTypeDic.Add) {
                        this.api
                            .setNacosAddConfig(data)
                            .then(() => (this.visible = false))
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        this.api
                            .setNacosModifyConfig(data)
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
