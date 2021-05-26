<template>
    <a-drawer
        :title="'账户(' + (account.signInName || account.signInMobile || account.signInEmail) + ')的组织'"
        placement="right"
        :closable="true"
        :mask="true"
        :keyboard="true"
        :visible="visible"
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
            :rowKey="(account, index) => (account.id ? account.id : index)"
        >
            <span slot="action" slot-scope="text, orgMo">
                <template v-for="(item, index) in actions">
                    <span :key="index">
                        <a v-if="item.type === 'a'" @click="item.onClick(orgMo)">{{ item.title }}</a>
                        <a-popconfirm
                            v-if="item.type === 'confirm' && account.orgId !== orgMo.id"
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
        </a-table>
        <manage-add-org-form
            ref="manageAddOrgForm"
            :visible.sync="manageAddOrgFormVisible"
            :account="account"
            @close="refreshData()"
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
        account: {
            type: Object,
            required: false,
        },
        visible: {
            type: Boolean,
            required: true,
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
                onClick: orgMo => this.handleModify(orgMo),
            },
            {
                type: 'confirm',
                title: '移除',
                confirmTitle: '你确定要将账户移除出该组织吗?',
                onClick: orgMo => this.handleDel(orgMo),
            },
            {
                type: 'confirm',
                title: '设置默认',
                confirmTitle: '你确定要将该组织设置为账户默认组织吗?',
                visible: false,
                onClick: orgMo => this.handleDefaultOrg(orgMo),
            },
        ];
        return {
            loading: false,
            dataSource: [],
            columns,
            actions: actions,
            manageAddOrgFormVisible: false,
            selectedRowKeys: [], // Check here to configure the default column
        };
    },
    computed: {},
    watch: {
        visible(val) {
            if (val) {
                this.refreshData();
            }
        },
    },
    mounted() {
        this.manageAddOrgForm = this.$refs.manageAddOrgForm;
    },
    methods: {
        /** 刷新数据 */
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { id, orgId } = { ...this.account };
                const accountId = id;
                const { domainId } = { ...this.account };
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
        },
        /** 处理修改组织关系 */
        handleModify(orgMo) {
            console.log('handleModify', orgMo);
        },
        /**
         * 处理删除组织关系的事件
         */
        handleDel(orgMo) {
            console.log('handleDel', orgMo);
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.account };
                const accountIds = [];
                accountIds.push(id);
                const orgId = orgMo.id; //选择列组织ID
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
        handleDefaultOrg(orgMo) {
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.account };
                const accountId = id;
                const orgId = orgMo.id; //选择列组织ID
                const { domainId } = { ...this.account };
                const data = { domainId, accountId, orgId };
                this.api
                    .modifyDefaultOrg(data)
                    .then(ro => {
                        this.loading = false;
                        if (ro.msg === '修改成功') {
                            this.account.orgId = orgMo.id;
                        }
                    })
                    .finally(() => {
                        this.refreshData();
                    });
            });
        },
        //**点击返回 */
        handleCancel() {
            this.$emit('update:visible', false);
            this.$emit('close');
        },
    },
};
</script>
