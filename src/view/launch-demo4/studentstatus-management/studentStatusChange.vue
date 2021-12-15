// 学籍变动
<template>
    <div>
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
                        :defaultPagination="true"
                        :rowSelection="{}"
                    >
                    </crud-table>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            'stuOriginalNum|100-999': 111,
                            changeType: '@pick(["退学", "休学"])',
                            'changeDate|+1': [
                                '2021-9-13 07:26:43',
                                '2021-10-26 10:58:21',
                                '2021-9-23 07:01:30',
                                '2021-11-26 09:46:45',
                                '2021-9-05 08:47:58',
                                '2021-9-10 10:01:13',
                                '2021-10-18 09:25:32',
                                '2021-11-25 16:52:45',
                                '2021-9-15 15:25:43',
                                '2021-10-14 07:12:15',
                                '2021-12-01 07:06:23',
                            ],
                            'stuNum|111111111-999999999': 111111111,
                            name: '@cname',
                            'shift|+1': [
                                '电子商务研究生',
                                '应用数学研究生',
                                '计算机科学研究生',
                                '软件技术研究生',
                                '汉语言文学研究生',
                                '财务管理研究生',
                                '通信工程研究生',
                                '国际经济法研究生',
                                '建筑学研究生',
                                '土木工程研究生',
                                '信息资源管理研究生',
                            ],
                            grade: '@pick(["2021"])',
                            changeSemester: 1,
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
                            'group|1-10': 1,
                            classDuties: '',
                            company:
                                '@pick(["那坡县平孟镇人民政府","广西揽胜企业管理服务集团有限公司","横线横州镇人民政府","河池市人民政府办公室","广西来本银海铝业有限责任公司","融安县农业技术推广中心","南宁轨道交通集团有限责任公司","广西大新县就业社保服务中心","崇左市人民政府办公室","柳州东城置地有限公司"])',
                            duties:
                                '@pick(["第一书记","干部","科员","教师","人事科科员","党委组织委员","副书记","科长","民政办负责人","副组长"])',
                            postLevel:
                                '@pick(["管理岗八级","专技岗十二级","一级科员","其他","管理岗九级","四级主任科员","三级主任科员","四级调研员"])',
                            title: '@pick(["初级","中级","高级","其他"])',
                            'phone|13000000000-19000000000': 11111111111,
                            'telephone|1111111-9999999': 1111111,
                            'zipCode|111111-999999': 111111,
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
                dataIndex: 'stuOriginalNum',
                title: '学员原编号',

                width: 150,
            },
            {
                dataIndex: 'changeType',
                title: '变动类型',

                width: 150,
            },
            {
                dataIndex: 'changeDate',
                title: '变动时间',

                width: 250,
            },
            {
                dataIndex: 'stuNum',
                title: '学号',

                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',

                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',

                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '年级',

                width: 150,
            },
            {
                dataIndex: 'changeSemester',
                title: '变动学期',

                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',

                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '出生年月',

                width: 150,
            },
            {
                dataIndex: 'group',
                title: '小组',

                width: 150,
            },
            {
                dataIndex: 'classDuties',
                title: '班级职务',

                width: 150,
            },
            {
                dataIndex: 'company',
                title: '工作单位',

                width: 300,
            },
            {
                dataIndex: 'duties',
                title: '职务',

                width: 150,
            },
            {
                dataIndex: 'postLevel',
                title: '职级',

                width: 150,
            },
            {
                dataIndex: 'title',
                title: '职称',

                width: 150,
            },
            {
                dataIndex: 'phone',
                title: '手机',

                width: 150,
            },
            {
                dataIndex: 'telephone',
                title: '电话',

                width: 150,
            },
            {
                dataIndex: 'zipCode',
                title: '邮编',

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
                icon: 'plus',
                title: '学员增加',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '学员减少',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '学员新增',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '转学学员以前成绩',
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
    },
};
</script>
