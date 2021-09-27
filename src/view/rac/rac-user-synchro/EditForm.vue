<!--
 * @Date: 2021-09-23 17:09:56
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-27 19:02:54
 * @FilePath: \admin-web\src\view\rac\rac-user-synchro\EditForm.vue
-->
<template>
    <base-edit-form
        ref="baseEditForm"
        title="策略"
        :editFormType.sync="editFormType"
        :formItems="formItems"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi } from '@/api/Api';
import BaseEditForm from './BaseEditForm';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racRealmApi;
        return {
            editFormType: EditFormTypeDic.None,
        };
    },
    computed: {
        formItems() {
            return [
                {
                    dataIndex: 'policyName',
                    title: '策略名称',
                },
                {
                    dataIndex: 'sourceName',
                    title: '来源',
                },
                {
                    dataIndex: 'endName',
                    title: '目的',
                },
            ];
        },
    },
    methods: {
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
    },
};
</script>
