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
                        <a-col :span="20">
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-model-item label="作者姓名">
                                    <a-input style="width: 195px" v-model="formInline.name"> </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="部门名称">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="请选择部门">
                                        <a-select-option value="">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item label="成果名称">
                                    <a-input v-model="formInline.achievementName"> </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="起始时间">
                                    <a-date-picker
                                        style="min-width: 195px;"
                                        placeholder="开始时间"
                                        v-model="formInline.startTime"
                                        show-time
                                        type="date"
                                        class="dateType"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="结束时间">
                                    <a-date-picker
                                        style="min-width: 195px;"
                                        placeholder="结束时间"
                                        v-model="formInline.endTime"
                                        show-time
                                        type="date"
                                        class="dateType"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="审核状态">
                                    <a-input v-model="formInline.status" type="text" placeholder=""> </a-input>
                                </a-form-model-item>
                            </a-form-model>
                        </a-col>
                        <a-col :span="4">
                            <a-button>查找</a-button>
                            <a-button style="margin-left: 10px">导出</a-button>
                        </a-col>
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
    name: 'annual-profile-table',
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
                title: '成果编号',
                width: 150,
                fixed: 'left',
            },
            {
                dataIndex: 'memberName',
                title: '填报人',
                width: 140,
            },
            {
                dataIndex: 'author',
                title: '作者',
                ellipsis: true,
            },
            {
                dataIndex: 'department',
                title: '部门',
                ellipsis: true,
            },
            {
                dataIndex: 'achievementName',
                title: '成果名称',
                ellipsis: true,
            },
            {
                dataIndex: 'applyTime',
                title: '申请日期',
                ellipsis: true,
            },
            {
                dataIndex: 'state',
                title: '状态',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
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
