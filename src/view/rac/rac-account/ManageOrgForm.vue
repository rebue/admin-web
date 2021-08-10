<template>
    <a-drawer
        :title="'账户(' + (account.signInName || account.signInMobile || account.signInEmail) + ')的组织'"
        placement="right"
        :closable="true"
        :mask="true"
        :keyboard="true"
        :visible="visible"
        :after-visible-change="afterVisibleChange"
        :width="600"
        v-bind="$attrs"
        v-on="$listeners"
        @close="onClose"
    >
        <div class="table-commands">
            <slot name="commands">
                <a-button style="margin-right: 50px" type="primary" icon="plus" @click="handleAdd"> 添加 </a-button>
            </slot>
        </div>
        <p></p>
        <a-table
            :columns="columns"
            :data-source="dataSource"
            v-bind="$attrs"
            v-on="$listeners"
            :rowKey="(account, index) => (account.id ? account.id : index)"
            :pagination="false"
        >
            <span slot="action" slot-scope="text, orgMo">
                <a @click="handleModify(orgMo)">变更组织</a>

                <a-divider v-if="account.orgId !== orgMo.id" type="vertical" />
                <a-popconfirm
                    v-if="account.orgId !== orgMo.id"
                    title="你确定要将该组织设置为账户默认组织吗?"
                    @confirm="handleDefaultOrg(orgMo)"
                    okText="确定"
                    cancelText="取消"
                >
                    <a>设为默认</a>
                </a-popconfirm>
                <a-divider v-if="account.orgId !== orgMo.id" type="vertical" />
                <a-popconfirm
                    v-if="account.orgId !== orgMo.id"
                    title="你确定要将账户移除出该组织吗?"
                    @confirm="handleDel(orgMo)"
                    okText="确定"
                    cancelText="取消"
                >
                    <a>移除组织</a>
                </a-popconfirm>
            </span>
            <span slot="tagName" slot-scope="text, orgMo">
                <template>
                    <span :class="{ defaultRow: account.orgId === orgMo.id }">{{ text }} </span>
                    &nbsp;
                    <a-tag color="#666" v-if="account.orgId === orgMo.id"> 默认 </a-tag>
                </template>
            </span>
        </a-table>
        <manage-add-org-form
            :visible.sync="manageAddOrgFormVisible"
            :account.sync="account"
            :width="width"
            :existOrgIds="existOrgIds"
            :realmId="account.realmId"
            @close="refreshData()"
        />
        <manager-modify-org-form
            :visible.sync="managerModifyOrgFormVisible"
            :account.sync="account"
            :width="width"
            :existOrgIds="existOrgIds"
            :modifyOrgId="modifyOrgId"
            :realmId="account.realmId"
            @close="refreshData()"
        />
    </a-drawer>
</template>

<script>
import { racOrgApi } from '@/api/Api';
import ManageAddOrgForm from './ManageAddOrgForm.vue';
import ManagerModifyOrgForm from './ManagerModifyOrgForm.vue';

export default {
    components: {
        ManageAddOrgForm,
        ManagerModifyOrgForm,
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
        this.width = 550;
        this.api = racOrgApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '组织名称',
                fixed: 'left',
                scopedSlots: { customRender: 'tagName' },
            },
            {
                dataIndex: 'fullName',
                title: '组织全称',
            },
            {
                dataIndex: 'action',
                title: '操作',
                //width: 250,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];
        return {
            loading: false,
            dataSource: [],
            existOrgIds: [],
            modifyOrgId: '',
            columns,
            showOrg: false,
            manageAddOrgFormVisible: false,
            managerModifyOrgFormVisible: false,
        };
    },
    computed: {},
    watch: {
        visible(val) {
            if (val) {
                this.$nextTick(() => {
                    this.refreshData();
                });
            }
        },
    },
    mounted() {
        // this.manageAddOrgForm = this.$refs.manageAddOrgForm;
        // this.managerModifyOrgForm = this.$refs.managerModifyOrgForm;
    },
    methods: {
        /** 刷新数据 */
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { id, orgId } = { ...this.account };
                const accountId = id;
                const { realmId } = { ...this.account };
                const data = { realmId, accountId, orgId, deep: false };
                // if (keywords && keywords.trim() !== '') data.keywords = keywords.trim();
                this.api
                    .listByAccountId(data)
                    .then(ro => {
                        this.dataSource = ro.extra.list;
                    })
                    .finally(() => {
                        this.existOrgIds = [];
                        for (const list of this.dataSource) {
                            this.existOrgIds.push(list.id);
                        }
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
            this.manageAddOrgFormVisible = true;
        },
        /** 处理修改组织关系 */
        handleModify(orgMo) {
            this.modifyOrgId = orgMo.id;
            this.managerModifyOrgFormVisible = true;
        },
        /**
         * 处理删除组织关系的事件
         */
        handleDel(orgMo) {
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
                const { realmId } = { ...this.account };
                const data = { realmId, accountId, orgId };
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
<style lang="less" scoped>
.defaultRow {
    font-weight: bolder;
}
</style>
