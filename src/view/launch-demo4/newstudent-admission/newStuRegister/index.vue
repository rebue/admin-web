// 新生注册
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="5" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="18">
                            <crud-table
                                ref="crudTable"
                                :showKeywords="true"
                                :commands="tableCommands"
                                :actions="tableActions"
                                :columns="columns"
                                :api="api"
                                :scrollX="600"
                                :defaultPagination="true"
                            >
                                <template #keywordsLeft>
                                    <div style="margin-right: 10px">
                                        <a-select
                                            :default-value="provinceData[0]"
                                            style="width: 110px"
                                            @change="handleProvinceChange"
                                        >
                                            <a-select-option v-for="province in provinceData" :key="province">
                                                {{ province }}
                                            </a-select-option>
                                        </a-select>
                                    </div>
                                </template>
                            </crud-table>
                        </a-col>
                    </a-row>
                </template>
            </base-manager>
            <edit-form ref="editForm" @close="handleEditFormClose" />
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

const provinceData = ['全部', '已注册', '未注册'];
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
        EditForm,
    },
    data() {
        //侧边栏数据
        const treeData = [
            {
                title: '党校研究生',
                key: 'dxyjs',
                children: [
                    {
                        title: '2021',
                        key: '20211',
                        children: [
                            {
                                title: '中共广西区委党校',
                                key: '20211-1',
                            },
                            {
                                title: '中共党史与党的建设',
                                key: '20211-2',
                            },
                            {
                                title: '经济管理',
                                key: '20211-3',
                            },
                            {
                                title: '马克思主义中国化研究',
                                key: '20211-4',
                            },
                            {
                                title: '宪法与行政法',
                                key: '20211-5',
                            },
                            {
                                title: '公共管理',
                                key: '20211-6',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '20201',
                        children: [
                            {
                                title: '中共广西区委党校',
                                key: '20201-1',
                            },
                            {
                                title: '中共党史与党的建设',
                                key: '20201-2',
                            },
                            {
                                title: '经济管理',
                                key: '20201-3',
                            },
                            {
                                title: '马克思主义中国化研究',
                                key: '20201-4',
                            },
                            {
                                title: '宪法与行政法',
                                key: '20201-5',
                            },
                            {
                                title: '公共管理',
                                key: '20201-6',
                            },
                        ],
                    },
                ],
            },
        ];
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            grade: '@pick(["2021"])',
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            'number|1-1000': 1,
                            name: '@cname',
                            admission: function() {
                                return this.allAchievement > 250 ? '录取' : '未录取';
                            },
                            turnMajor: '@pick(["是","否"])',
                            studentStatus: '@pick("是")',
                            'allAchievement|240-300': 250,
                            stuRegister: '@pick(["是","否"])',
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            shift: '@pick(["党校研究生","中政大研究生"])',
                            'ID|100000000000000000-600000000000000000': 400000000000000000,
                            sex: '@pick(["男","女"])',
                            'birthDate|+1': [
                                '1998-3-15',
                                '1999-5-23',
                                '1998-7-13',
                                '2000-4-26',
                                '1999-1-05',
                                '1999-7-24',
                                '2000-2-18',
                                '2000-5-02',
                                '1999-8-15',
                                '1999-10-02',
                                '2000-12-15',
                            ],
                            nativePlace: '@province',
                            culture: '@pick(["本科","专科"])',
                            learnMajor:
                                '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            graduationSchool:
                                '@pick(["广西民族大学","河北师范大学","重庆大学","广西大学","中央党校函授学院","广西师范大学","广西民族大学","天津商业大学","山西财经大学"])',
                            graduationDate: '2021-06-29',
                            'workDate|+1': [
                                '2020-3-11',
                                '2019-5-26',
                                '2020-8-13',
                                '2020-2-26',
                                '2019-12-05',
                                '2019-7-22',
                                '2020-2-18',
                                '2020-7-02',
                                '2019-8-15',
                                '2019-11-27',
                                '2019-12-20',
                            ],
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 20,
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
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'grade',
                title: '年级',

                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',

                width: 250,
            },
            {
                dataIndex: 'major',
                title: '专业',

                width: 150,
            },
            {
                dataIndex: 'number',
                title: '序号',

                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',

                width: 150,
            },
            {
                dataIndex: 'admission',
                title: '录取',

                width: 150,
            },
            {
                dataIndex: 'turnMajor',
                title: '转专业',

                width: 150,
            },
            {
                dataIndex: 'studentStatus',
                title: '生成学籍',

                width: 150,
            },
            {
                dataIndex: 'allAchievement',
                title: '总成绩',

                width: 150,
            },
            {
                dataIndex: 'stuRegister',
                title: '考生注册',

                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',

                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',

                width: 150,
            },
            {
                dataIndex: 'ID',
                title: '身份证号',

                width: 250,
            },
            {
                dataIndex: 'sex',
                title: '性别',

                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '出生时间',

                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',

                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',

                width: 150,
            },
            {
                dataIndex: 'learnMajor',
                title: '所学专业',

                width: 150,
            },
            {
                dataIndex: 'graduationSchool',
                title: '毕业院校',

                width: 150,
            },
            {
                dataIndex: 'graduationDate',
                title: '毕业时间',

                width: 150,
            },
            {
                dataIndex: 'workDate',
                title: '工作时间',

                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '保存',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '查看转专业',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '生成学籍',
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
                onClick: record => this.handlePreview(record),
            },
        ];

        return {
            columns,
            showOrg: true,
            realm: {
                id: '1',
            },
            provinceData,
            treeData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
        this.editForm = this.$refs.editForm;
    },
    methods: {
        handleProvinceChange(value) {
            //
        },
        /**
         * 处理添加领域的事件
         */
        handleAdd() {
            //this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑领域的事件
         */
        handleEdit(record) {
            this.editForm.show(EditFormTypeDic.Modify, record);
        },
        handlePreview(record) {
            this.editForm.show(EditFormTypeDic.View, record);
        },
        handleEditFormClose() {
            // this.refreshTableData();
        },
    },
};
</script>
<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}

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
