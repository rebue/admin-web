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
        return {
            //
            loading: false,
            dataSource: [],
            showOrg: false,
            columns,
            pagination: {
                ...this.defaultPagination,
            },
            keywords: '',
            curOrg: '',
            checkable: true,
            checkStrictly: true,
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
        },
        /**
         * 添加
         */
        handleAdd(orgMo) {
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
                        this.loading = false;
                        this.curOrg = undefined;
                        this.$emit('update:visible', false);
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
            this.curOrg = item;
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrg = isSelected ? item : undefined;
        },
        /**点击提交*/
        handleOk() {
            if (this.curOrg) {
                this.handleAdd(this.curOrg);
            }
        },
    },
};
</script>
