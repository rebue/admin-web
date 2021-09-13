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
                    <a-switch v-model="enable" checked-children="认证" un-checked-children="不认证" default-checked />
                </a-form-model-item>
                <a-form-model-item label="应用ID(AppID)" prop="clientId">
                    <a-input v-model.trim="model['clientId']" :disabled="disabled" />
                </a-form-model-item>
                <a-form-model-item label="应用密钥(AppSecret)" prop="secret">
                    <a-input v-model.trim="model.secret" disabled style="width:65%;margin-right:20px;" />
                    <a-button type="primary" html-type="submit" @click="secretClick()">{{ secretName }}</a-button>
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
            rules: {
                clientId: [
                    { required: true, message: '请输入应用ID', trigger: 'blur', transform: val => val && val.trim() },
                ],
                secret: [
                    { required: true, message: '请输入应用钥', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
            enable: true, // false不认证：表单域会disabled, 表单清除校验，禁用点击添加和删除
            secretName: '生产密钥',
        };
    },
    computed: {
        disabled() {
            return !this.enable;
        },
    },
    methods: {
        secretClick() {
            this.model.secret = this.randomWord(false, 16);
        },
        randomWord(randomFlag, min, max) {
            let str = '';
            let range = min;
            const arr = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                'a',
                'b',
                'c',
                'd',
                'e',
                'f',
                'g',
                'h',
                'i',
                'j',
                'k',
                'l',
                'm',
                'n',
                'o',
                'p',
                'q',
                'r',
                's',
                't',
                'u',
                'v',
                'w',
                'x',
                'y',
                'z',
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z',
            ];
            if (randomFlag) {
                range = Math.round(Math.random() * (max - min)) + min;
            }
            let pos = '';
            for (let i = 0; i < range; i++) {
                pos = Math.round(Math.random() * (arr.length - 1));
                str += arr[pos];
            }
            return str;
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
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();

                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.api
                        .getByAppId(this.model.appId)
                        .then(ro => {
                            this.model = {
                                ...JSON.parse(JSON.stringify(this.model)),
                                ...JSON.parse(JSON.stringify(this.formatDetail(ro.extra))),
                            };
                            this.model.secret = '****************';
                            this.secretName = '更新密钥';
                        })
                        .catch(() => ((this.visible = false), (this.secretName = '生产密钥'), (this.model.secret = '')))
                        .finally(() => {
                            this.loading = false;
                            this.secretName = '生产密钥';
                            this.model.secret = '';
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
</style>
