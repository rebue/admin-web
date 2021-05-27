<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="可添加组织"
            :loading="loading"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
        >
            <div>
                <org-tree
                    :ref="`orgTree.${account.domainId}`"
                    :show.sync="showOrg"
                    :width="width"
                    :domainId="account.domainId"
                    @click="handleOrgMenuClick"
                    @select="handleOrgTreeSelect"
                />
            </div>
            <!-- <a-input-search
            v-model.trim="keywords"
            enter-button
            :loading="loading"
            placeholder="关键字"
            @search="refreshData"
        />
        <p></p>
        <a-table
            :columns="columns"
            :data-source="dataSource"
            v-bind="$attrs"
            v-on="$listeners"
            :pagination="pagination"
            :scroll="{ x: false, y: 400 }"
            :rowKey="(orgMo, index) => (orgMo.id ? orgMo.id : index)"
            @change="handleTableChange"
        >
            <span slot="action" slot-scope="text, orgMo">
                <template v-for="(item, index) in actions">
                    <span :key="index">
                        <a v-if="item.type === 'a'" @click="item.onClick(orgMo)">{{ item.title }}</a>
                        <a-popconfirm
                            v-if="item.type === 'confirm'"
                            :title="item.confirmTitle"
                            @confirm="item.onClick(orgMo)"
                            okText="确定"
                            cancelText="取消"
                        >
                            <a>{{ item.title }}</a>
                        </a-popconfirm>
                        <a-divider v-if="index < actions.length - 1" type="vertical" />
                    </span>
                </template>
            </span>
        </a-table> -->
        </base-modal>
    </fragment>
</template>

<script>
import { racOrgApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
import OrgTree from '../rac-org/Tree';

export default {
    components: {
        BaseModal,
        OrgTree,
    },
    props: {
        account: {
            type: Object,
            required: false,
        },
        defaultPagination: {
            type: [Boolean, Object],
            default: function() {
                return {
                    pageSize: 10,
                    pageSizeOptions: ['5', '10', '20', '30'],
                    showSizeChanger: true,
                };
            },
        },
    },
    data() {
        this.width = 550;
        this.api = racOrgApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 100,
                scopedSlots: { customRender: 'action' },
            },
        ];
        const actions = [
            {
                type: 'a',
                title: '添加',
                onClick: orgMo => this.handleAdd(orgMo),
            },
        ];
        return {
            //
            loading: false,
            dataSource: [],
            showOrg: false,
            columns,
            pagination: {
                ...this.defaultPagination,
            },
            actions: actions,
            keywords: '',
        };
    },
    computed: {
        //
    },
    methods: {
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { id, orgId } = { ...this.account };
                const accountId = id;
                const { current, pageSize } = this.pagination;
                const data = { pageNum: current ?? 1, pageSize, accountId, orgId, keywords: this.keywords };
                this.api.listAddableOrg(data).then(ro => {
                    this.pagination = {
                        ...this.pagination,
                        total: ro.extra.page.total - 0,
                    };
                    this.dataSource = ro.extra.page.list;
                    this.loading = false;
                });
            });
        },
        handleShow() {
            this.keywords = '';
            // this.refreshData();
        },
        /**
         * 添加
         */
        handleAdd(orgMo) {
            //
            console.log('添加', orgMo);
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.account };
                const accountIds = [];
                accountIds.push(id);
                const orgId = orgMo.id; //选择列组织ID
                const data = { accountIds, orgId };
                this.api
                    .addOrgAccount(data)
                    .then(ro => {
                        this.loading = false;
                    })
                    .finally(() => {
                        this.refreshData();
                    });
            });
        },
        /**
         * 处理分页、排序、筛选的变化
         */
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
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            // this.curOrgId = item.id;
            // this.$nextTick(() => {
            //     this.refreshTableData();
            // });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrg = isSelected ? item : undefined;
            //this.$nextTick(this.refreshTableData);
        },
        /**点击提交*/
        handleOk() {
            this.handleAdd(this.curOrg);
        },
    },
};
</script>
