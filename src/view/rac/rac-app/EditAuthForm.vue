<template>
    <fragment>
        <base-modal
            ref="baseModal"
            :title="EditFormTypeDic.getName(this.editFormType) + '认证'"
            :visible.sync="visible"
            :loading="loading"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
            :width="750"
        >
            <a-button type="primary" icon="reload" style="float:right">重置</a-button>
            <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                <a-form-model-item label="应用名称" prop="name">
                    <a-input :value="model.name" disabled />
                </a-form-model-item>
                <a-form-model-item label="应用ID(AppID)" prop="clientId">
                    <a-input v-model.trim="model['clientId']" />
                </a-form-model-item>
                <a-form-model-item label="应用密钥(AppSecret)" prop="secret">
                    <a-input v-model.trim="model.secret" />
                </a-form-model-item>
                <a-form-model-item label="安全域名" required>
                    <a-form-model-item
                        v-for="(item, index) in model.redirectUris"
                        :key="'redirectUris' + item.key"
                        :prop="'redirectUris.' + index + '.value'"
                        :rules="{
                            required: true,
                            message: '请输入安全域名',
                            trigger: 'blur',
                        }"
                    >
                        <a-input v-model.trim="item.value" style="width:85%" />
                        <a-icon class="dynamic-add-button" type="plus-circle" @click="addUri(index)" />
                        <a-icon
                            v-if="model.redirectUris.length > 1"
                            class="dynamic-delete-button"
                            type="minus-circle-o"
                            @click="removeUri(index)"
                        />
                    </a-form-model-item>
                </a-form-model-item>

                <a-form-model-item label="IP白名单" required>
                    <a-form-model-item
                        v-for="(item, index) in model.ipAddrs"
                        :key="'ipAddrs' + item.key"
                        :prop="'ipAddrs.' + index + '.value'"
                        :rules="{
                            required: true,
                            message: '请输入IP白名单',
                            trigger: 'blur',
                        }"
                    >
                        <a-input v-model.trim="item.value" style="width:85%" />
                        <a-icon class="dynamic-add-button" type="plus-circle" @click="addIp(index)" />
                        <a-icon
                            v-if="model.ipAddrs.length > 1"
                            class="dynamic-delete-button"
                            type="minus-circle-o"
                            @click="removeIp(index)"
                        />
                    </a-form-model-item>
                </a-form-model-item>
            </a-form-model>
        </base-modal>
    </fragment>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { oapAppApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';

const modelSource = {
    appId: '',
    clientId: '',
    secret: '',
    redirectUris: [
        {
            value: '',
            key: new Date().getTime(),
        },
    ],
    ipAddrs: [
        {
            value: '',
            key: new Date().getTime(),
        },
    ],
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
            rules: {
                clientId: [
                    { required: true, message: '请输入应用ID', trigger: 'blur', transform: val => val && val.trim() },
                ],
                secret: [
                    { required: true, message: '请输入应用钥', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
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
        formatList(list) {
            return list.map((v, index) => {
                return {
                    value: v,
                    key: new Date().getTime() + index,
                };
            });
        },
        show: function(editFormType, record) {
            this.editFormType = editFormType;
            const { redirectUris, ipAddrs } = record;
            if (redirectUris) {
                record.redirectUris = this.formatList(redirectUris);
            }
            if (ipAddrs) {
                record.ipAddrs = this.formatList(ipAddrs);
            }
            this.model = {
                ...JSON.parse(JSON.stringify(modelSource)),
                ...JSON.parse(JSON.stringify(record)),
            };
            this.visible = true;
        },
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();

                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.api
                        .getByAppId(this.model.appId)
                        .then(ro => {
                            const { redirectUris, ipAddrs } = ro.extra;
                            if (redirectUris) {
                                ro.extra.redirectUris = this.formatList(redirectUris);
                            }
                            if (ipAddrs) {
                                ro.extra.ipAddrs = this.formatList(ipAddrs);
                            }
                            this.model = {
                                ...JSON.parse(JSON.stringify(modelSource)),
                                ...JSON.parse(JSON.stringify(ro.extra)),
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
                    const data = { ...JSON.parse(JSON.stringify(this.model)) };
                    data.redirectUris = data.redirectUris.map(v => {
                        return v.value;
                    });
                    data.ipAddrs = data.ipAddrs.map(v => {
                        return v.value;
                    });

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
        addUri(index) {
            const item = {
                key: new Date().getTime(),
                label: '',
            };
            //在指定位置后面插入元素
            if (index + 1 === this.model.redirectUris.length) {
                this.model.redirectUris.push(item);
                return;
            }
            this.model.redirectUris.splice(index + 1, 0, item);
        },
        removeUri(index) {
            this.model.redirectUris.splice(index, 1);
        },
        addIp(index) {
            // 插入空项
            //递增， 解决dom复用问题
            const item = {
                key: new Date().getTime(),
                label: '',
            };
            //在指定位置后面插入元素
            if (index + 1 === this.model.ipAddrs.length) {
                this.model.ipAddrs.push(item);
                return;
            }
            this.model.ipAddrs.splice(index + 1, 0, item);
        },
        removeIp(index) {
            this.model.ipAddrs.splice(index, 1);
        },
    },
};
</script>
<style scoped>
.dynamic-add-button {
    margin: 0 10px;
}
</style>
