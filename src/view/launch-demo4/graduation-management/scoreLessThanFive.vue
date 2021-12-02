// 分数小于五分
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
                >
                    <template #keywordsLeft>
                        <div style="margin-right: 10px">
                            <a-select
                                :default-value="provinceData[0]"
                                style="width: 100px"
                                @change="handleProvinceChange"
                            >
                                <a-select-option v-for="province in provinceData" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </template>
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

const provinceData = ['2021年', '2020年', '2019年'];
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'stuNum',
                title: '学号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'semester',
                title: '学期',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'curriculum',
                title: '课程',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'homeworkAchievement',
                title: '作业成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'attendanceScore',
                title: '考勤成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'achievement',
                title: '卷面成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'makeUpExamAchievement',
                title: '补考成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'allMakeUpExamAchievement',
                title: '总补考成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'courseAchievement',
                title: '课程成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '年级',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'major',
                title: '专业',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '期考和补考成绩清零',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
        ];

        return {
            columns,
            provinceData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleAdd() {
            //
        },
        handleEdit() {
            //
        },
        handleDel() {
            //
        },
        handleProvinceChange(value) {
            //
        },
    },
};
</script>
