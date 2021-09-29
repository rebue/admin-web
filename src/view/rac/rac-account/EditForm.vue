<template>
    <base-edit-form
        ref="baseEditForm"
        title="账户"
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
import { racAccountApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racAccountApi;
        this.addRules = {
            signInName: [
                { required: true, message: '请输入登录账号', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInPswd: [
                { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val && val.trim() },
            ],
            signInPswdAgain: [
                {
                    required: true,
                    trigger: ['change', 'blur'],
                    validator: (rule, value, callback) => {
                        if (this.editFormType === 'modify') {
                            callback();
                            return;
                        }

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
        this.modifyRules = {
            signInName: [
                {
                    required: true,
                    message: '请输入登录账号',
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
                { dataIndex: 'code', title: '账号编码' },
                { dataIndex: 'signInNickname', title: '登录昵称' },
                { dataIndex: 'signInName', title: '登录账号' },
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
                { dataIndex: 'isTester', title: '测试者', type: 'switch' },
                { dataIndex: 'remark', title: '备注' },
                { dataIndex: 'id', title: '编码', type: 'hidden' },
                { dataIndex: 'realmId', title: '领域ID', type: 'hidden' },
                { dataIndex: 'orgId', title: '组织ID', type: 'hidden' },
            ];
        },
    },
    methods: {
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
        handleShow() {
            console.log('editFormType', this.editFormType);
            if (this.editFormType === EditFormTypeDic.Modify) {
                this.rules = this.modifyRules;
            } else {
                this.rules = this.addRules;
            }
        },
    },
};
</script>
