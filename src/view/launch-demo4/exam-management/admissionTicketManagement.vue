// 准考证管理
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :showKeywords="true"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
                    :rowSelection="{}"
                >
                    <template #keywordsLeft>
                        <div style="margin-right: 10px">
                            <a-select
                                :default-value="provinceData[0]"
                                style="width: 140px"
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

const provinceData = ['显示2021年考生', '显示2020年考生', '显示2019年考生'];
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
                dataIndex: 'number',
                title: '序号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'examQualifications',
                title: '报考资格',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'ExemptExamQualifications',
                title: '免试资格',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'registrationReviewState',
                title: '报名审核状态',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'paymentState',
                title: '缴费情况',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'workCity',
                title: '工作所在城市',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'examinationRoomSite',
                title: '考场地址',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'seatNum',
                title: '座位号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'id',
                title: '身份证号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'birthData',
                title: '出生时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'majorStudied',
                title: '所学专业',
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
                title: '生成准考证号',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '清除准考证号',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '预览准考证',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '同步到报名系统',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '导出',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '打印准考证',
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
                type: 'a',
                title: '查看',
                onClick: record => this.handleEdit(record),
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
