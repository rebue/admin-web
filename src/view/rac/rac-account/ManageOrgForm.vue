<template>
    <!-- a-drawer -->

    <a-drawer
        :title="'管理-- ' + this.red.signInName + ' --的组织'"
        placement="right"
        :closable="true"
        :mask="true"
        :keyboard="true"
        :after-visible-change="afterVisibleChange"
        :width="720"
        v-bind="$attrs"
        v-on="$listeners"
        @close="onClose"
    >
        <div class="table-commands">
            <slot name="commands">
                <template v-for="(item, index) in tableCommands">
                    <a-button
                        style="margin-right: 50px"
                        :type="item.buttonType"
                        :icon="item.icon"
                        @click="item.onClick"
                        :key="index"
                    >
                        {{ item.title }}
                    </a-button>
                </template>
            </slot>
        </div>

        <a-table
            :columns="columns"
            :data-source="dataSource"
            v-bind="$attrs"
            v-on="$listeners"
            :rowKey="(record, index) => (record.id ? record.id : index)"
        >
            <span slot="action" slot-scope="text, record">
                <template v-for="(item, index) in actions">
                    <span :key="index">
                        <a v-if="item.type === 'a'" @click="item.onClick(record)">{{ item.title }}</a>
                        <a-popconfirm
                            v-if="item.type === 'confirm' && red.orgId !== record.id"
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
        <manage-add-org-form
            ref="manageAddOrgForm"
            :visible.sync="manageAddOrgFormVisible"
            :record="red"
            @close="refreshData()"
            @show="handleShow()"
        />
    </a-drawer>
</template>

<script>
import { racOrgApi } from '@/api/Api';
import ManageAddOrgForm from './ManageAddOrgForm.vue';

export default {
    components: {
        ManageAddOrgForm,
        // BaseModal,
    },
    props: {
        record: {
            type: Object,
            required: false,
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
                width: 200,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];
        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '添加',
                onClick: this.handleAdd,
            },
        ];
        const actions = [
            {
                type: 'a',
                title: '修改',
                onClick: record => this.handleModify(record),
            },
            {
                type: 'confirm',
                title: '移除',
                confirmTitle: '你确定要将账户移除出该组织吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'confirm',
                title: '设置默认',
                confirmTitle: '你确定要将该组织设置为账户默认组织吗?',
                visible: false,
                onClick: record => this.handleDefaultOrg(record),
            },
        ];
        return {
            loading: false,
            dataSource: [],
            columns,
            actions: actions,
            manageAddOrgFormVisible: false,
            selectedRowKeys: [], // Check here to configure the default column
            red: {},
        };
    },
    computed: {},
    mounted() {
        this.manageAddOrgForm = this.$refs.manageAddOrgForm;
    },
    methods: {
        /** 刷新数据 */
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { id, orgId } = { ...this.red };
                const accountId = id;
                const { domainId } = { ...this.record };
                const data = { domainId, accountId, orgId };
                // if (keywords && keywords.trim() !== '') data.keywords = keywords.trim();
                this.api.listByAccountId(data).then(ro => {
                    this.dataSource = ro.extra.list;
                    this.loading = false;
                });
            });
        },
        /**切换抽屉时动画结束后的回调 */
        afterVisibleChange(val) {
            console.log('visible', val);
        },
        //关闭抽屉
        onClose() {
            this.$emit('update:visible', false);
        },
        /**
         * 处理添加组织关系的事件
         */
        handleAdd() {
            console.log('handleAdd', this);
            this.manageAddOrgFormVisible = true;
            //this.manageAddOrgForm.show(this.red);
        },
        /** 处理修改组织关系 */
        handleModify(record) {
            console.log('handleModify', record);
        },
        /**
         * 处理删除组织关系的事件
         */
        handleDel(record) {
            console.log('handleDel', record);
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.red };
                const accountIds = [];
                accountIds.push(id);
                const orgId = record.id; //选择列组织ID
                const data = { accountIds, orgId };
                this.api
                    .delOrgAccount(data)
                    .then(ro => {
                        this.loading = false;
                    })
                    .finally(() => {
                        this.refreshData();
                    });
            });
        },
        /**
         * 处理设置默认组织关系的事件
         */
        handleDefaultOrg(record) {
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.red };
                const accountId = id;
                const orgId = record.id; //选择列组织ID
                const { domainId } = { ...this.record };
                const data = { domainId, accountId, orgId };
                this.api
                    .modifyDefaultOrg(data)
                    .then(ro => {
                        this.loading = false;
                        if (ro.msg === '修改成功') {
                            this.red.orgId = record.id;
                        }
                    })
                    .finally(() => {
                        this.refreshData();
                    });
            });
        },
        handleShow() {
            console.log('handleShow');
        },
        //**点击返回 */
        handleCancel() {
            this.$emit('update:visible', false);
            this.$emit('close');
        },
        show(record) {
            this.red = record;
            //this.$emit('update:visible', true);
            this.refreshData();
        },
    },
};
</script>
