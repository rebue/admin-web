<template>
    <base-edit-form
        ref="baseEditForm"
        title="账户"
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
        return {
            editFormType: EditFormTypeDic.None,
            rules: {
                signInName: [
                    { required: true, message: '请输入登录名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
                signInPswd: [
                    { required: true, message: '请输入登录密码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                signInNickname: [
                    { required: true, message: '请输入登录昵称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'signInName', title: '登录名称' },
                {
                    dataIndex: 'signInPswd',
                    title: '登录密码',
                    type: 'password',
                    visible: this.editFormType === EditFormTypeDic.Add,
                },
                { dataIndex: 'signInNickname', title: '登录昵称' },
                { dataIndex: 'isTester', title: '测试者', type: 'switch' },
                { dataIndex: 'remark', title: '账户备注' },
                { dataIndex: 'id', title: '编码', type: 'hidden' },
                { dataIndex: 'domainId', title: '领域ID', type: 'hidden' },
                { dataIndex: 'orgId', title: '组织ID', type: 'hidden' },
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
