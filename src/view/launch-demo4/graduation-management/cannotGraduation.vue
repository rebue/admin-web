// 不可毕业管理
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="4" style="overflow: auto">
                        <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                        <div class="table-divider"></div>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height: 100%"></a-divider>
                    </a-col>
                    <a-col :span="19">
                        <crud-table
                            ref="crudTable"
                            :actions="tableActions"
                            :columns="columns"
                            :api="api"
                            :scrollX="600"
                            :defaultPagination="true"
                        >
                        </crud-table>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
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
        //侧边栏数据
        const treeData = [
            {
                title: '党校研究生',
                key: 'dxyjs',
                children: [
                    {
                        title: '2021',
                        key: '1',
                        children: [
                            {
                                title: '公共管理',
                                key: '101',
                            },
                            {
                                title: '工商企业管理',
                                key: '102',
                            },
                            {
                                title: '经济管理',
                                key: '103',
                            },
                            {
                                title: '政治学',
                                key: '104',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '2',
                        children: [
                            {
                                title: '公共管理',
                                key: '201',
                            },
                            {
                                title: '工商企业管理',
                                key: '202',
                            },
                            {
                                title: '经济管理',
                                key: '203',
                            },
                            {
                                title: '政治学',
                                key: '204',
                            },
                        ],
                    },
                    {
                        title: '2019',
                        key: '3',
                        children: [
                            {
                                title: '公共管理',
                                key: '301',
                            },
                            {
                                title: '工商企业管理',
                                key: '302',
                            },
                            {
                                title: '经济管理',
                                key: '303',
                            },
                            {
                                title: '政治学',
                                key: '304',
                            },
                        ],
                    },
                    {
                        title: '2018',
                        key: '4',
                        children: [
                            {
                                title: '公共管理',
                                key: '401',
                            },
                            {
                                title: '工商企业管理',
                                key: '402',
                            },
                            {
                                title: '经济管理',
                                key: '403',
                            },
                            {
                                title: '政治学',
                                key: '404',
                            },
                        ],
                    },
                    {
                        title: '2017',
                        key: '5',
                        children: [
                            {
                                title: '公共管理',
                                key: '501',
                            },
                            {
                                title: '工商企业管理',
                                key: '502',
                            },
                            {
                                title: '经济管理',
                                key: '503',
                            },
                            {
                                title: '政治学',
                                key: '504',
                            },
                        ],
                    },
                    {
                        title: '2016',
                        key: '6',
                        children: [
                            {
                                title: '公共管理',
                                key: '601',
                            },
                            {
                                title: '工商企业管理',
                                key: '602',
                            },
                            {
                                title: '经济管理',
                                key: '603',
                            },
                            {
                                title: '政治学',
                                key: '604',
                            },
                        ],
                    },
                ],
            },
            {
                title: '中政大研究生',
                key: 'zzdyjs',
                children: [
                    {
                        title: '2021',
                        key: '7',
                        children: [
                            {
                                title: '公共管理',
                                key: '701',
                            },
                            {
                                title: '工商企业管理',
                                key: '702',
                            },
                            {
                                title: '经济管理',
                                key: '703',
                            },
                            {
                                title: '政治学',
                                key: '704',
                            },
                        ],
                    },
                    {
                        title: '2020',
                        key: '8',
                        children: [
                            {
                                title: '公共管理',
                                key: '801',
                            },
                            {
                                title: '工商企业管理',
                                key: '802',
                            },
                            {
                                title: '经济管理',
                                key: '803',
                            },
                            {
                                title: '政治学',
                                key: '804',
                            },
                        ],
                    },
                    {
                        title: '2019',
                        key: '9',
                        children: [
                            {
                                title: '公共管理',
                                key: '901',
                            },
                            {
                                title: '工商企业管理',
                                key: '902',
                            },
                            {
                                title: '经济管理',
                                key: '903',
                            },
                            {
                                title: '政治学',
                                key: '904',
                            },
                        ],
                    },
                    {
                        title: '2018',
                        key: '10',
                    },
                    {
                        title: '2017',
                        key: '11',
                    },
                    {
                        title: '2016',
                        key: '12',
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
                            'stuNum|100000000-200000000': 111111111,
                            name: '@cname',
                            'diplomaNum|20000000-30000000': 20000000,
                            canGraduation: '缓毕业',
                            sex: '@pick(["男","女"])',
                            birthDate: '@date',
                            'group|1-10': 1,
                            level: '',
                            company:
                                '@pick(["那坡县平孟镇人民政府","广西揽胜企业管理服务集团有限公司","横线横州镇人民政府","河池市人民政府办公室","广西来本银海铝业有限责任公司","融安县农业技术推广中心","南宁轨道交通集团有限责任公司","广西大新县就业社保服务中心","崇左市人民政府办公室","柳州东城置地有限公司"])',
                            duties:
                                '@pick(["第一书记","干部","科员","教师","人事科科员","党委组织委员","副书记","科长","民政办负责人","副组长"])',
                            rank:
                                '@pick(["管理岗八级","专技岗十二级","一级科员","其他","管理岗九级","四级主任科员","三级主任科员","四级调研员"])',
                            title: '@pick(["初级","中级","高级","其他"])',
                            'phone|13000000000-19000000000': 13000000000,
                            'telephone|1000000-9000000': 1111111,
                            'zipCode|100000-900000': 555555,
                            workDate: '@date',
                            partyData: '@date',
                            culture: '@pick(["本科","专科"])',
                            'ID|100000000000000000-600000000000000000': 400000000000000000,
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            nativePlace: '@province',
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
                dataIndex: 'diplomaNum',
                title: '毕业证号',

                width: 150,
            },
            {
                dataIndex: 'canGraduation',
                title: '允许毕业',

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
                dataIndex: 'level',
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
                dataIndex: 'rank',
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
                dataIndex: 'partyData',
                title: '入党时间',

                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',

                width: 150,
            },
            {
                dataIndex: 'ID',
                title: '身份证号',

                width: 250,
            },
            {
                dataIndex: 'nation',
                title: '民族',

                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',

                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                scopedSlots: { customRender: 'action' },
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
            showOrg: true,
            realm: {
                id: '1',
            },
            treeData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleAdd() {
            //
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
