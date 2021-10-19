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
            @ok="handleSubmit"
            :width="750"
        >
            <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
                <a-form-model-item label="应用名称">
                    <a-input :value="model.appName" disabled />
                </a-form-model-item>
                <a-form-model-item label="认证">
                    <a-select placeholder="请选择应用" v-model="model.authnType">
                        <a-select-option v-for="(item, index) in autoEnable" :key="index" :value="index">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                    <!-- <a-switch v-model="enable" checked-children="认证" un-checked-children="不认证" default-checked /> -->
                </a-form-model-item>
                <a-form-model-item label="应用ID(clientId)" prop="clientId">
                    <a-input v-model.trim="model['clientId']" disabled style="width:85%" />
                    <a-icon class="copyIconStyle" type="copy" @click="copyClick(model.clientId)" />
                </a-form-model-item>
                <a-form-model-item label="应用密钥(AppSecret)" prop="secret">
                    <a-input v-if="secretShow" v-model.trim="model.secret" disabled style="width:85%" />
                    <a-icon class="copyIconStyle" v-if="secretShow" type="copy" @click="copyClick(model.secret)" />
                    <a-button
                        class="refresh-btn"
                        v-if="editFormType === EditFormTypeDic.Modify"
                        type="link"
                        icon="sync"
                        @click="secretClick"
                        >更新
                    </a-button>
                    <a-alert
                        v-if="secretShow"
                        size="small"
                        type="warning"
                        banner
                        message="复制 应用密钥 保存下来，方便后续使用"
                    />
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
                        <a-input v-model.trim="item.value" style="width:85%" :disabled="disabled" />
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
                        <a-input v-model.trim="item.value" style="width:85%" :disabled="disabled" />
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
// 表单空数据结构
const modelSource = {
    appId: '',
    appName: '',
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
            secretShow: false,
            rules: {
                // clientId: [
                //     { required: true, message: '请输入应用ID', trigger: 'blur', transform: val => val && val.trim() },
                // ],
                // secret: [
                //     { required: true, message: '请输入应用钥', trigger: 'blur', transform: val => val && val.trim() },
                // ],
            },
            enable: true, // false不认证：表单域会disabled, 表单清除校验，禁用点击添加和删除
            autoEnable: ['未认证', '共用cookie', '授权码', '凭证', 'CAS'],
        };
    },
    computed: {
        disabled() {
            return !this.enable;
        },
    },
    methods: {
        //点击复制
        copyClick(data) {
            const url = data;
            const oInput = document.createElement('input');
            oInput.value = url;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象;
            console.log(oInput.value);
            document.execCommand('Copy'); // 执行浏览器复制命令
            this.$message.success('复制成功');
            oInput.remove();
        },
        linetoArr(val) {
            //处理textarea值为数组
            const arr = val.split(/\n/);
            return arr.filter(v => {
                return v !== '';
            });
        },
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
        //点击重置密钥事件
        secretClick() {
            const that = this;
            this.$confirm({
                title: '你确认要更新应用密钥吗？',
                content: '应用密钥会在提交表单后生效, 所有使用旧应用密钥的接口会在提交表单后失效',
                onOk() {
                    that.api.getAppSecret().then(res => {
                        that.model.secret = res?.extra.secret;
                        that.secretShow = true;
                    });
                },
            });
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
        addUri(index) {
            if (this.disabled) {
                return;
            }
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
            if (this.disabled) {
                return;
            }
            this.model.redirectUris.splice(index, 1);
        },
        addIp(index) {
            if (this.disabled) {
                return;
            }
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
            if (this.disabled) {
                return;
            }
            this.model.ipAddrs.splice(index, 1);
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
