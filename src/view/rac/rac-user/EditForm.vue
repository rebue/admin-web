<template>
    <base-edit-form
        ref="baseEditForm"
        title="用户"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
    >
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racUserApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racUserApi;
        this.addRules = {
            realName: [
                { required: true, message: '请输入用户名', trigger: 'blur', transform: val => val && val.trim() },
            ],
            idCard: [
                { required: true, message: '请输入身份证信息', trigger: 'blur', transform: val => val && val.trim() },
            ],
            // mobile: [
            //     { required: true, message: '请输入手机号码', trigger: 'blur', transform: val => val && val.trim() },
            // ],
            // email: [
            //     { required: true, message: '请输入电子邮箱', trigger: 'blur', transform: val => val && val.trim() },
            // ],

            // signInPswdAgain: [
            //     {
            //         required: true,
            //         message: '请输入登录密码(再次确认)',
            //         trigger: ['change', 'blur'],
            //         validator: (rule, value, callback) => {
            //             if (this.editFormType === 'modify') {
            //                 callback();
            //                 return;
            //             }

            //             if (value === undefined) value = '';

            //             value = value.trim();
            //             if (value === '') {
            //                 callback(new Error('请输入登录密码(再次确认)'));
            //                 return;
            //             }

            //             if (value !== this.$refs.baseEditForm.model.signInPswd) {
            //                 callback(new Error('两次输入的登录密码不相同'));
            //                 return;
            //             }

            //             callback();
            //         },
            //     },
            // ],
        };
        this.modifyRules = {
            realName: [
                {
                    required: true,
                    message: '请输入',
                    trigger: 'blur',
                    transform: val => val && val.trim(),
                },
            ],
        };
        return {
            editFormType: EditFormTypeDic.None,
            model: {},
            rules: this.addRules,
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'realName', title: '用户名' },
                { dataIndex: 'idCard', title: '身份证信息' },
                { dataIndex: 'mobile', title: '手机号码' },
                { dataIndex: 'email', title: '电子邮箱' },
            ];
        },
    },
    methods: {
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
        handleShow() {
            console.log('editFormType', this.editFormType);
            // if (this.editFormType === EditFormTypeDic.Modify) {
            //     this.rules = this.modifyRules;
            // } else {
            //     this.rules = this.addRules;
            // }
        },
    },
};
</script>
