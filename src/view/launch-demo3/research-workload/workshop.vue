<template>
    <base-manager>
        <template #managerCard>
            <a-row type="flex">
                <a-col :span="5">
                    <a-button class="btn">编辑</a-button>
                    <a-button class="btn">删除</a-button>
                    <a-dropdown>
                        <a-menu slot="overlay" @click="testBtn">
                            <a-menu-item key="1">
                                1st item
                            </a-menu-item>
                            <a-menu-item key="2">
                                2nd item
                            </a-menu-item>
                            <a-menu-item key="3">
                                3rd item
                            </a-menu-item>
                        </a-menu>
                        <a-button> 新增 <a-icon type="down" /> </a-button>
                    </a-dropdown>
                    <div v-show="showOrg" class="table-left" style="margin-top:10px">
                        <org-tree ref="orgTree.platform" :show.sync="showOrg" realmId="platform" />
                    </div>
                </a-col>
                <a-col :span="1">
                    <a-divider type="vertical" style="height:100%"></a-divider>
                </a-col>
                <a-col :span="18">
                    <crud-table
                        ref="crudTable"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :scrollX="300"
                        :defaultPagination="true"
                    >
                        <template #commands>
                            <a-button class="btn">编辑</a-button>
                            <a-button class="btn">删除</a-button>
                            <a-button class="btn">审核</a-button>
                        </template>
                    </crud-table>
                </a-col>
            </a-row>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
import baseSearch from '../search/baseSearch';
import OrgTree from '@/view/rac/rac-org/Tree';
import log from '../result-allocation/log';
import moment from 'moment';

export default {
    name: 'press',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
        // eslint-disable-next-line no-undef
        OrgTree,
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|4': [
                        {
                            'id|+1': 10000000,

                            examine: '@pick(["审核通过","审核未通过"])',
                            // level: '@pick(["一级","二级","三级"])',
                            'workshopName|+1': [
                                '“庆祝新中国成立70周年”理论研讨会',
                                '“中国战胜绝对贫困:实践特色和经验总结”理论研讨会',
                                '第一届“思贤论坛”暨“纪念百色起义90周年”理论研讨会',
                                '“建党100年来我们党保持先进性和纯洁性、不断增强生机活力的实践与经验研究”课题征文研讨会',
                            ],
                            'details|+1': [
                                '2019年12月在百色干部学院举办',
                                '2019年12月在百色干部学院举办',
                                '2019年12月在百色干部学院举办',
                                '“建党100年来我们党保持先进性和纯洁性、不断增强生机活力的实践与经验研究”课题征文研讨会',
                            ],
                            createTime: '@dateTime',
                            startTime: '@dateTime',
                        },
                    ],
                });
                //时间设置
                const date = new Date();
                for (let i = 0; i < mockList.list.length; i++) {
                    let dateTime = date.getTime() / 1000;

                    const time = 86400 * Math.round(Math.random() * 15);
                    const MonthTime = 2626560 * Math.round(Math.random() * 5);

                    dateTime = dateTime - time - MonthTime;
                    const applyTime = new Date(dateTime * 1000);
                    const year = Math.round(Math.random() * 2);

                    mockList.list[i].createTime = moment(
                        applyTime.getFullYear() - year + '-' + (applyTime.getMonth() + 1) + '-' + applyTime.getDate()
                    ).format('YYYY-MM-DD');
                    mockList.list[i].startTime = moment(
                        applyTime.getFullYear() - year + '-' + (applyTime.getMonth() + 1) + '-' + applyTime.getDate()
                    ).format('YYYY-MM-DD');
                }
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
                dataIndex: 'workshopName',
                title: '研讨会名称',
                width: 300,
            },
            {
                dataIndex: 'startTime',
                title: '开始时间',
                width: 180,
            },
            {
                dataIndex: 'details',
                title: '会议详情',
                width: 250,
            },
            {
                dataIndex: 'createTime',
                title: '添加时间',
                width: 180,
            },
            {
                dataIndex: 'examine',
                title: '审核',
                width: 150,
            },
        ];

        // this.tableActions = [
        //     {
        //         type: 'a',
        //         title: '编辑',
        //         onClick: record => this.handleEdit(record),
        //     },
        //     {
        //         type: 'confirm',
        //         title: '删除',
        //         confirmTitle: '你确定要删除本条记录吗?',
        //         onClick: record => this.handleDel(record),
        //     },
        //
        // ];

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
            showOrg: false,
            realm: {
                id: 1,
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
        testBtn(v) {
            console.dir(v);
        },
    },
};
</script>

<style scoped>
.btn {
    margin-right: 10px;
}
</style>
