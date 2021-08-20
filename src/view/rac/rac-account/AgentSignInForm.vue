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
            <a-form-model-item key="targetAppId" label="登录应用" prop="targetAppId">
                <a-radio-group v-model="model.targetAppId" button-style="solid" @change="onChange">
                    <a-radio-button v-for="(item, index) in appes" :value="item.id" :key="index">
                        {{ item.name }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAgentSignInApi, racAppApi } from '@/api/Api';

export default {
    components: {
        BaseModal,
    },
    props: {
        record: {
            type: Object,
            required: true,
        },
        realmId: {
            type: String,
            required: true,
        },
    },
    data() {
        this.rules = {
            targetAppId: [
                {
                    required: true,
                    message: '请选择登录应用',
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
            appes: [],
        };
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();
                racAppApi
                    .list({ realmId: this.realmId })
                    .then(ro => {
                        this.appes = ro.extra.list;
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
                        .signIn({
                            accountId: this.record.id,
                            appId: this.model.targetAppId,
                            curUrl: window.location.href,
                        })
                        .then(() => {
                            for (const app of this.appes) {
                                if (app.id === this.model.targetAppId) {
                                    window.location.href = app.url;
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
            this.model = { ...this.model, targetAppId: e.target.value };
        },
    },
};
</script>
