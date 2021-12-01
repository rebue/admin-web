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
                        <a-col>
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-model-item label="成果名称:">
                                    <a-input style="width: 195px" v-model="formInline.name"> </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="发布情况:">
                                    <a-input style="width: 195px" v-model="formInline.name"></a-input>
                                </a-form-model-item>
                                <a-form-model-item label="开始年份:">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="全部">
                                        <a-select-option value="">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="2020">
                                            2020
                                        </a-select-option>
                                        <a-select-option value="2019">
                                            2019
                                        </a-select-option>
                                        <a-select-option value="2018">
                                            2018
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item label="结束年份:">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="全部">
                                        <a-select-option value="">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="2020">
                                            2020
                                        </a-select-option>
                                        <a-select-option value="2019">
                                            2019
                                        </a-select-option>
                                        <a-select-option value="2018">
                                            2018
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item label="发布项目:">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="全部">
                                        <a-select-option value="">
                                            --请选择--
                                        </a-select-option>
                                        <a-select-option value="2020">
                                            2020
                                        </a-select-option>
                                        <a-select-option value="2019">
                                            2019
                                        </a-select-option>
                                        <a-select-option value="2018">
                                            2018
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                            </a-form-model>
                        </a-col>
                        <a-col style="margin-top: 10px">
                            <a-button>查找</a-button>
                            <a-button style="margin-left: 10px">导出</a-button>
                            <a-button style="margin-left: 10px">条件清除</a-button>
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
