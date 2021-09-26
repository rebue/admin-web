<!--
 * @Date: 2021-09-23 17:09:56
 * @LastEditors: likelin
 * @LastEditTime: 2021-09-26 08:47:05
 * @FilePath: \admin-web\src\view\rac\rac-user-synchro\EditForm.vue
-->
<template>
    <base-edit-form
        ref="baseEditForm"
        title="策略"
        :editFormType.sync="editFormType"
        :model.sync="model"
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
            model: {},
            rules: {
                id: [
                    { required: true, message: '请输入领域编码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                name: [
                    { required: true, message: '请输入领域名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
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
                // {
                //     dataIndex: 'sourceConnector',
                //     title: '连接器',
                //     type: 'select',
                //     disabled: this.editFormType === EditFormTypeDic.Modify,
                //     selectData:[
                //         {
                //             name:'数据库1',
                //             value:'数据库1'
                //         },
                //         {
                //             name:'数据库2',
                //             value:'数据库2'
                //         },
                //     ]
                // },
                // {
                //     dataIndex: 'endConnector',
                //     title: '连接器',
                //     type: 'select',
                //     disabled: this.editFormType === EditFormTypeDic.Modify,
                //     selectData:[
                //         {
                //             name:'数据库1',
                //             value:'数据库1'
                //         },
                //         {
                //             name:'数据库2',
                //             value:'数据库2'
                //         },
                //     ]
                // },
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
