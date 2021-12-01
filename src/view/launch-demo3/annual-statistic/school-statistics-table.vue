<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="300"
                :defaultPagination="false"
            >
                <template #commands>
                    <a-row type="flex">
                        <a-col :span="15">
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-item label="年度:">
                                    <a-input v-model="formInline.year"> </a-input>
                                </a-form-item>
                                <a-form-item>
                                    <a-button>查找</a-button
                                    ><a-button style="margin-left: 15px">导出</a-button></a-form-item
                                >
                            </a-form-model>
                        </a-col>

                        <a-col :span="14"> </a-col>
                    </a-row>
                </template>
            </crud-table>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
import baseSearch from '../search/baseSearch';

export default {
    name: 'school-statistics-table',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
    },
    data() {
        this.api = racRealmApi;

        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'achievementNo',
                title: '总费用名称',
            },
            {
                dataIndex: 'memberName',
                title: '年份',
            },
            {
                dataIndex: 'author',
                title: '工作量',
                ellipsis: true,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '修改',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'a',
                title: '查看',

                onClick: record => this.handleEdit(record),
            },
        ];

        return {
            columns,

            formInline: {
                user: '',
                password: '',
                name: '',
                achievementName: '',
                startTime: '',
                endTime: '',
                status: '',
                year: '',
            },
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        search() {
            console.log(this.api);
        },
    },
};
</script>

<style scoped></style>
