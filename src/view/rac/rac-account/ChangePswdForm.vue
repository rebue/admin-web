<template>
    <base-edit-form
        ref="baseEditForm"
        title="账户登录密码"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racAccountApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racAccountApi;
        this.rules = {
            signInPswd: [
                { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInPswdAgain: [
                {
                    required: true,
                    message: '请输入登录密码(再次确认)',
                    trigger: ['change', 'blur'],
                    validator: (rule, value, callback) => {
                        console.log('value', value);
                        if (value === undefined) value = '';

                        value = value.trim();
                        if (value === '') {
                            callback(new Error('请输入登录密码(再次确认)'));
                            return;
                        }

                        if (value !== this.$refs.baseEditForm.model.signInPswd) {
                            callback(new Error('两次输入的登录密码不相同'));
                            return;
                        }

                        callback();
                    },
                },
            ],
        };
        return {
            editFormType: EditFormTypeDic.None,
        };
    },
    computed: {
        formItems() {
            return [
                {
                    dataIndex: 'signInPswd',
                    title: '登录密码',
                    type: 'password',
                    visible: this.editFormType === EditFormTypeDic.Add,
                },
                {
                    dataIndex: 'signInPswdAgain',
                    title: '登录密码(再次确认)',
                    type: 'password',
                    visible: this.editFormType === EditFormTypeDic.Add,
                },
            ];
        },
    },
    methods: {
        show: function(editFormType, ...params) {
            this.editFormType = editFormType;
            this.$refs.baseEditForm.show(editFormType, ...params);
        },
    },
};
</script>
