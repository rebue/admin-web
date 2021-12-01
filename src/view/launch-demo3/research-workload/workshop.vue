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
                    <a-row type="flex" style="margin-left: 20px">
                        <a-col style="margin-left: 20px">
                            <a-button>编辑</a-button>
                            <a-button>删除</a-button>
                            <a-button>审核</a-button>
                        </a-col>
                    </a-row>
                </template>
                <template #left>
                    <a-button>编辑</a-button>
                    <a-button>删除</a-button>
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
                    <div v-show="showOrg" class="table-left">
                        <org-tree ref="orgTree.platform" :show.sync="showOrg" realmId="platform" />
                        <div class="table-divider"></div>
                    </div>
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
import OrgTree from '@/view/rac/rac-org/Tree';
import log from '../result-allocation/log';

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
        this.api = racRealmApi;

        const columns = [
            {
                dataIndex: 'achievementNo',
                title: '研讨会名称',
            },
            {
                dataIndex: 'achievementNo',
                title: '开始时间',
            },
            {
                dataIndex: 'achievementNo',
                title: '会议详情',
            },
            {
                dataIndex: 'achievementNo',
                title: '添加时间',
            },
            {
                dataIndex: 'achievementNo',
                title: '审核',
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

<style scoped></style>
