<template>
    <base-modal
        ref="baseModal"
        title="代理登录"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
    >
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item key="targetSysId" label="登录系统" prop="targetSysId">
                <a-radio-group v-model="model.targetSysId" button-style="solid" @change="onChange">
                    <a-radio-button v-for="(item, index) in syses" :value="item.id" :key="index">
                        {{ item.name }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAgentSignInApi, racSysApi } from '@/api/Api';

export default {
    components: {
        BaseModal,
    },
    props: {
        record: {
            type: Object,
            required: true,
        },
        domainId: {
            type: String,
            required: true,
        },
    },
    data() {
        this.rules = {
            targetSysId: [
                {
                    required: true,
                    message: '请选择登录系统',
                    trigger: ['change', 'blur'],
                },
            ],
        };
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
            loading: false,
            model: {},
            syses: [],
        };
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();
                racSysApi
                    .list({ domainId: this.domainId })
                    .then(ro => {
                        this.syses = ro.extra.list;
                    })
                    .catch(() => (this.visible = false))
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        handleOk() {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    racAgentSignInApi
                        .signIn({ accountId: this.record.id, sysId: this.model.targetSysId })
                        .then(ro => {
                            console.log('ro', ro);
                            for (const sys of this.syses) {
                                if (sys.id === this.model.targetSysId) {
                                    console.log('sys', sys);
                                    window.location.href = sys.url;
                                    break;
                                }
                            }
                        })
                        .finally(() => (this.loading = false));
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        onChange(e) {
            this.model = { ...this.model, targetSysId: e.target.value };
        },
    },
};
</script>
