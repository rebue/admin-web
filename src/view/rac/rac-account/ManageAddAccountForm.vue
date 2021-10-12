<template>
    <fragment>
        <p style="font-weight: bolder; font-size: 16px">请选择账号提交</p>
        <div class="menu-toolbar">
            <a-input-search v-model.trim="keywords" :loading="loading" placeholder="账号关键字" @search="refreshData" />
        </div>
        <a-table
            :scroll="{ x: false, y: 300 }"
            :pagination="pagination"
            :columns="columns"
            :dataSource="dataSource"
            :rowKey="(account, index) => (account.id ? account.id : index)"
            :rowSelection="getRowSelection()"
            size="small"
            @change="handleTableChange"
        />
    </fragment>
</template>

<script>
import { racAccountApi } from '@/api/Api';

export default {
    // props: {
    //     account: {
    //         type: Object,
    //         required: false,
    //     },
    //     realmId: {
    //         type: String,
    //         required: true,
    //     },
    //     existOrgIds: {
    //         type: Array,
    //         default: () => [],
    //     },
    // },
    data() {
        this.api = racAccountApi;
        const columns = [
            {
                dataIndex: 'signInName',
                title: '账号',
            },
            {
                dataIndex: 'signInNickname',
                title: '昵称',
            },
        ];
        this.columns = columns;
        return {
            //
            loading: false,
            dataSource: [],
            keywords: '',
            curRow: null,
            pageNum: 1,
            pageSize: 5,
            total: 0,
            pagination: {
                pageSize: 10,
                pageSizeOptions: ['5', '10', '20', '30'],
                showSizeChanger: true,
            },
            accountId: '',
            realmId: '',
        };
    },
    mounted() {
        //
        this.$nextTick(() => {
            this.refreshData();
        });
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            const { pageNum, pageSize, accountId, realmId, keywords } = this;
            this.loading = true;
            const qo = { pageNum, pageSize, accountId, realmId, deep: false };
            if (keywords && keywords.trim() !== '') qo.keywords = keywords.trim();
            racAccountApi
                .getAccountByUser(qo)
                .then(ro => {
                    this.total = ro.extra.page.total - 0;
                    this.dataSource = ro.extra.page.list.map(node => {
                        let flat = false;
                        if (node.id == this.mapAccountId) {
                            flat = true;
                        }
                        node.disabled = flat;
                        return node;
                    });
                })
                .finally(() => (this.loading = false));
        },
        handleTableChange(pagination) {
            this.pagination = {
                ...this.pagination,
                current: pagination.current,
                pageSize: pagination.pageSize,
            };
            this.$nextTick(() => {
                this.refreshData();
            });
        },
        getRowSelection() {
            const that = this;
            return {
                type: 'radio',
                getCheckboxProps: item => ({ props: { disabled: item.disabled } }),
                onSelect(record, selected) {
                    that.handleItemSelect(record, selected);
                },
            };
        },
        handleItemSelect(record, selected) {
            this.curRow = selected ? record : null;
        },
        //  getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
        //     return {
        //         getCheckboxProps: item => ({ props: { disabled: disabled || item.disabled } }),
        //         onSelectAll(selected, selectedRows) {
        //             const treeSelectedKeys = selectedRows.filter(item => !item.disabled).map(({ key }) => key);
        //             const diffKeys = selected
        //                 ? difference(treeSelectedKeys, selectedKeys)
        //                 : difference(selectedKeys, treeSelectedKeys);
        //             itemSelectAll(diffKeys, selected);
        //         },
        //         onSelect({ key }, selected) {
        //             itemSelect(key, selected);
        //         },
        //         selectedRowKeys: selectedKeys,
        //     };
        // },
        /**
         * 添加
         */
        handleAdd(curRow) {
            this.$nextTick(() => {
                this.loading = true;
                const data = {
                    srcId: this.accountId,
                    dstId: curRow.id,
                };
                this.api
                    .addUnionMapper(data)
                    .then(ro => {
                        this.callback && this.callback(ro);
                        this.closeDialog && this.closeDialog();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },

        /**点击提交*/
        ok() {
            if (this.curRow) {
                this.handleAdd(this.curRow);
            } else {
                this.$message.info('请选择账号提交');
            }
        },
    },
};
</script>
<style lang="less" scoped>
.menu-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .ant-btn {
        margin-right: 10px;
        flex-shrink: 0;
    }
}
.spin {
    height: 100%;
}
.ant-pagination {
    margin-top: 20px;
}
</style>
