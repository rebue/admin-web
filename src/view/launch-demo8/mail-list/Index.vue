<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5">
                        <div v-show="showOrg" style="margin-right: 10px" class="table-left">
                            <org-tree ref="form.platform" :show.sync="showOrg" realmId="platform" />
                            <div class="table-divider"></div>
                        </div>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <crud-table
                            :api="api"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :scrollX="600"
                            :rowSelection="{}"
                            :showKeywords="true"
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
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racAccountApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'mail-list',
    components: {
        BaseManager,
        CrudTable,
        OrgTree,
    },
    props: [],
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|21-25': [
                        {
                            'id|+1': 10000000,
                            GdMobile: '',
                            photo: '@image("200x100", "#894FC4", "#FFF", "png", "!")',
                            sex: '@pick(["男", "女"])',
                            name: '@cname',
                            className: '@pick(["计算机一班", "计算机二班","GC班"])',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            // lastModifiedTime: '@date("yyyy-MM-dd")',
                            // lastChecker: '@cname()',
                            // by: '@pick(["自驾","公交","火车", "飞机"])',
                            startTime: '@now("yyyy-MM-dd")',
                            endTime: '@now("yyyy-MM-dd")',
                            mobile: '',
                            // ["校(院)领导","行政部"]
                            department: '@pick(["行政部", "校（院）领导"])',
                            work: '@pick(["常务副校长，常务副院长", "副校长，副院长","普通教师"])',
                            // meet: '@pick(["是", "否"])',
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
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
        this.photo1 = require('./image/1.jpeg');
        this.api = {
            page,
            listAll: page,
            list: page,
        };

        const columns = [
            {
                dataIndex: 'photo',
                title: '头像',
                width: 100,
                customRender: () => {
                    return (
                        <div>
                            <img width="50" src={this.photo1}></img>
                        </div>
                    );
                },
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 100,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 100,
            },
            {
                dataIndex: 'mobile',
                title: '移动电话',
                width: 150,
                ellipsis: true,
                customRender: function() {
                    const numArray = [
                        '139',
                        '138',
                        '137',
                        '136',
                        '135',
                        '134',
                        '159',
                        '158',
                        '157',
                        '150',
                        '151',
                        '152',
                        '188',
                        '187',
                        '182',
                        '183',
                        '184',
                        '178',
                        '130',
                        '131',
                        '132',
                        '156',
                        '155',
                        '186',
                        '185',
                        '176',
                        '133',
                        '153',
                        '189',
                        '180',
                        '181',
                        '177',
                    ];
                    let str = Math.random();
                    str = Math.round(str * numArray.length);

                    const strMobile = numArray[str] + '' + Math.round(Math.random() * 99999999) + '';
                    return strMobile;
                },
            },
            {
                dataIndex: 'GdMobile',
                title: '固定电话',
                width: 150,
                ellipsis: true,
                customRender: function() {
                    const strMobile = '0771' + '-' + Math.round(Math.random() * 99999999) + '';
                    return strMobile;
                },
            },
            {
                dataIndex: 'department',
                title: '部门',
                width: 200,
                ellipsis: true,
            },
            {
                dataIndex: 'work',
                width: 200,
                title: '职务',
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //
            //     scopedSlots: { customRender: 'action' },
            // },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     icon: 'plus',
            //     title: '新建',
            //     onClick: this.handleAdd,
            // },
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
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: false,
        };
    },

    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {},
    watch: {},
    filters: {},
};
</script>

<style scoped></style>
