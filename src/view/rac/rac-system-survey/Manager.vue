<template>
    <base-manager ref="baseManager">
        <template #managerCard>
            <crud-table
                v-if="JSON.stringify(query) !== '{}'"
                ref="crudTable"
                :columns="columns"
                :api="api"
                :query="query"
                :scrollX="600"
                :defaultPagination="false"
            >
                <template #keywordsLeft>
                    <!-- <label style="width: 100px; line-height: 30px">选择日期：</label> -->
                    <a-range-picker
                        format="YYYY-MM-DD HH:mm:ss"
                        :show-time="{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
                        }"
                        @change="onChangeBir"
                        @openChange="onOpenChange"
                        @ok="onOK"
                        style="width: 350px; padding-right: 20px"
                    />
                </template>
            </crud-table>
        </template>
    </base-manager>
</template>
<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racOpLogApi } from '@/api/Api';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh_cn');

export default {
    name: 'Manager',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = {
            list(data) {
                return racOpLogApi.getCountSurvey(data).then(ro => {
                    const data = ro.extra.id;
                    ro.extra.list = [data];
                    return ro;
                });
            },
        };
        this.columns = [
            {
                dataIndex: '账户添加',
                key: '账户添加',
                title: '账户添加/次',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: '账户修改',
                key: '账户修改',
                title: '账户修改/次',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: '账户删除',
                key: '账户删除',
                title: '账户删除/次',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: '账户密码修改',
                key: '账户密码修改',
                title: '账户密码修改/次',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: '启用账户',
                key: '启用账户',
                title: '启用账户/次',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: '禁用账户',
                key: '禁用账户',
                title: '禁用账户/次',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: '账户解锁',
                key: '账户解锁',
                title: '账户解锁/次',
                width: 120,
                ellipsis: true,
            },
            {
                dataIndex: '账户锁定',
                key: '账户锁定',
                title: '账户锁定/次',
                width: 120,
                ellipsis: true,
            },
        ];
        return {
            loading: false,
            curRealmId: '',
            query: {},
            realms: [],
            moment,
            startDate: '',
            endDate: '',
        };
    },
    mounted() {
        this.getCurrentTime();
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        getCurrentTime() {
            //获取当前时间并打印
            const yy = new Date().getFullYear();
            const mm = new Date().getMonth() + 1;
            const dd = new Date().getDate();
            const gettime = yy + '-' + mm + '-' + dd + '';
            const startDate = gettime + ' ' + '00:00:00';
            const endDate = gettime + ' ' + '23:59:59';
            this.query = {
                pageNum: 1,
                startDate,
                endDate,
            };
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            if (!this.crudTable) {
                this.crudTable = this.$refs.crudTable;
            }
            this.crudTable.refreshData();
        },
        /**
         * 弹出日历和关闭日历的回调
         */
        onOpenChange(status) {
            if (!status) {
                this.refreshTableData();
            }
        },
        /**
         * ok按扭回调
         */
        onOK() {
            this.refreshTableData();
        },
        /**
         * 根据时间发生变化的回调
         */
        onChangeBir(date, dateDates) {
            this.query.startDate = dateDates[0];
            this.query.endDate = dateDates[1];
            if (dateDates[0] === '') {
                delete this.query['startDate'];
                delete this.query['endDate'];
                this.refreshTableData();
            }
        },
    },
};
</script>
<style lang="less" scoped>
.realm-tabs {
    overflow: visible; // 否则表格的分页选择框展开时会被遮挡
}
</style>
<style type="text/css">
.mystyle {
    width: 50%;
    right: 200px;
}
</style>
