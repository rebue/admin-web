<template>
    <base-modal
        ref="baseModal"
        title="可添加组织"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        :hiddenOkButton="true"
        @show="handleShow"
        @cancel="handleCancel"
    >
        <a-input-search
            v-model.trim="keywords"
            enter-button
            :loading="loading"
            placeholder="关键字"
            @search="refreshData"
        />
        <a-table
            :columns="columns"
            :data-source="dataSource"
            v-bind="$attrs"
            v-on="$listeners"
            :pagination="pagination"
            :scroll="{ x: false, y: 400 }"
            :rowKey="(record, index) => (record.id ? record.id : index)"
            @change="handleTableChange"
        >
            <span slot="action" slot-scope="text, record">
                <template v-for="(item, index) in actions">
                    <span :key="index">
                        <a v-if="item.type === 'a'" @click="item.onClick(record)">{{ item.title }}</a>
                        <a-popconfirm
                            v-if="item.type === 'confirm'"
                            :title="item.confirmTitle"
                            @confirm="item.onClick(record)"
                            okText="确定"
                            cancelText="取消"
                        >
                            <a>{{ item.title }}</a>
                        </a-popconfirm>
                        <a-divider v-if="index < actions.length - 1" type="vertical" />
                    </span>
                </template>
            </span>
        </a-table>
    </base-modal>
</template>

<script>
import { racOrgApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';

export default {
    components: {
        BaseModal,
    },
    props: {
        record: {
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
        this.api = racOrgApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '名称',
                fixed: 'left',
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 100,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];
        const actions = [
            {
                type: 'a',
                title: '添加',
                onClick: record => this.handleAdd(record),
            },
        ];
        return {
            //
            loading: false,
            dataSource: [],
            columns,
            pagination: {
                ...this.defaultPagination,
            },
            actions: actions,
            keywords: '',
            red: {},
        };
    },
    computed: {
        //
    },
    methods: {
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { id, orgId } = { ...this.record };
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
            this.refreshData();
        },
        /**
         * 添加
         */
        handleAdd(record) {
            //
            console.log('添加', record);
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.record };
                const accountIds = [];
                accountIds.push(id);
                const orgId = record.id; //选择列组织ID
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
        handleCancel() {
            // this.$emit('close');
            this.$emit('update:visible', false);
        },
        show() {
            //
        },
    },
};
</script>
