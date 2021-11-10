<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :setLevelProtect="{ setLevelProtect: setLevelProtect, racDicItemApi: racDicItemApi }"
                    isNewApiFun="levelProtect"
                ></crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import CrudTable from '@/component/rebue/CrudTable.vue';
import BaseManager from '@/component/rebue/BaseManager';
import { accountStore } from '@/store/Store';
import { racDicApi, raclevelProtectApi, racDicItemApi } from '@/api/Api';

// passwordErrors     输入密码错误次数/次
// lockDuration       账号锁定时长/分钟
// passwordMinLength  密码最小长度/位数
// passwordCharacter  密码最少包含字符/种
// passwordTips       输强制修改密码
// passworDoverdue    密码过期时长/天
export default {
    name: 'Manager',
    components: {
        CrudTable,
        BaseManager,
    },
    data() {
        this.api = racDicApi;
        this.racDicItemApi = racDicItemApi;
        const columns = [
            {
                title: '配置内容',
                dataIndex: 'name',
            },
            {
                title: '配置项',
                dataIndex: 'dicItemValue',
                scopedSlots: { customRender: 'dicItemValue' },
            },
            {
                title: '备注',
                dataIndex: 'remark',
            },
        ];
        return {
            columns,
            accountStore,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        setLevelProtect() {
            const data = {
                id: this.accountStore.id,
            };
            raclevelProtectApi
                .setLevelProtect(data)
                .then(() => {
                    //
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
