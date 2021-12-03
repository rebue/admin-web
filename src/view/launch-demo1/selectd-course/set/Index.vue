<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row>
                    <a-col :span="6">
                        <p>学员初次网上选择选修课时间设置</p>
                        <p>学员初次网上选择选修课情况</p>
                        <p>教务处确定可开设的选修课</p>
                        <p>学员二次网上选择选修课时间设置</p>
                        <p>学员二次网上选择选修课情况</p>
                        <p>选课结束</p>
                    </a-col>
                    <a-col :span="18">
                        <h4>学员初次网上选择选修课时间设置</h4>
                        <div>
                            提示：如果只填写日期，实际有效时间是日期当日的00:00
                            <a-form-model layout="inline">
                                <a-form-model-item label="开始时间">
                                    <a-date-picker
                                        style="width: 120px"
                                        :default-value="moment('2019-02-23', dateFormat)"
                                        :format="dateFormat"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="结束时间">
                                    <a-date-picker
                                        style="width: 120px"
                                        :default-value="moment('2019-02-24', dateFormat)"
                                        :format="dateFormat"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="最小选课数量">
                                    <a-input style="width: 50px"></a-input>
                                </a-form-model-item>
                                <a-form-model-item label="最大选课数量">
                                    <a-input style="width: 50px"></a-input>
                                </a-form-model-item>
                                <a-form-model-item>
                                    <a-button>保存</a-button>
                                </a-form-model-item>
                            </a-form-model>
                            提示：如果初次选课开始时间大于二次选课开始时间，系统将删除二次选课时间的设置
                        </div>
                        <a-divider />
                        <h4>学员初次网上选择选修课情况</h4>
                        <div>
                            <Table1 />
                        </div>
                        <h4>教务处确定可开设的选修课</h4>
                        <div>
                            <Table2 />
                        </div>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import Table1 from './table1.vue';
import Table2 from './table2.vue';

import moment from 'moment';
export default {
    name: 'Manager',
    components: {
        BaseManager,
        Table1,
        Table2,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise((resolve, reject) => {
                // 数据列表在这里设置
                const dataSource = [
                    {
                        id: 1,
                        no: 1,
                        updator: 'zzm',
                        updatedTime: '2021-12-01 16:39:00',
                        course: '计算机科学与技术',
                        startTime: '2021-12-04 16:39:00',
                        student: '章三',
                        before: 'xx',
                        after: 'xx',
                    },
                ];
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 50,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });
            return p;
        };
        this.api = {
            page,
            listAll: page,
            list: page,
        };
        // 初始化数据end
        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'orign',
                title: '课程名称',
                width: 150,
            },
            {
                dataIndex: 'date',
                title: '教师名称',
                width: 150,
            },
            {
                dataIndex: 'wubie',
                title: '选课人数',
                width: 150,
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
        ];
        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '添加选修课',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            // {
            //     type: 'a',
            //     title: '取消选修课',
            //     onClick: () => {
            //         /**/
            //     },
            // },
        ];
        return {
            columns,
            moment,
            dateFormat: 'YYYY/MM/DD',
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
    },
};
</script>
<style lang="less" scoped>
.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
