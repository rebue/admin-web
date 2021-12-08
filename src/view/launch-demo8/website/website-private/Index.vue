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
                            :showKeywords="false"
                            :defaultPagination="false"
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
    name: 'website-private',
    components: {
        BaseManager,
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
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

                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',

                            urlName: '@pick(["青少年预防犯罪","自我保护的方法","如何高效学习","创业就业","新发展观"])',
                            url: '',

                            // meet: '@pick(["是", "否"])',
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
                        },
                    ],
                });
                // 数据列表在这里设置
                for (let i = 0; i < mockList.list.length; i++) {
                    const name = mockList.list[i].urlName;
                    if (name === '青少年预防犯罪') {
                        mockList.list[i].url = 'http://www.kids21.cn/jzxt/zx/jjyf/201109/t20110927_706167.htm';
                    } else if (name === '自我保护的方法') {
                        mockList.list[i].url = 'https://www.xuexila.com/baikezhishi/1267051.html';
                    } else if (name === '自我保护的方法') {
                        mockList.list[i].url =
                            'https://baike.baidu.com/item/%E5%A6%82%E4%BD%95%E9%AB%98%E6%95%88%E5%AD%A6%E4%B9%A0/12978814?fr=aladdin';
                    } else if (name === '创业就业') {
                        mockList.list[i].url = 'http://www.csee-china.com/';
                    } else if (name === '新发展观') {
                        mockList.list[i].url =
                            'https://baike.baidu.com/item/%E7%A7%91%E5%AD%A6%E5%8F%91%E5%B1%95%E8%A7%82/317422?fr=aladdin';
                    } else {
                        mockList.list[i].url = 'https://baike.baidu.com';
                    }
                }
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
                dataIndex: 'urlName',
                title: '网站名称',
                ellipsis: true,
            },
            {
                dataIndex: 'url',
                title: '网址',
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
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新建',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '编辑',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '上移',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '下移',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '删除',
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
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: false,
        };
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
