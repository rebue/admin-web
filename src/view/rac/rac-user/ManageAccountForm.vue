<template>
    <a-drawer
        :title="'用户(' + user.realName + ')的账号'"
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
        </a-table>
        <manage-add-account-form
            :visible.sync="manageAddAccountFormVisible"
            :user.sync="user"
            :width="width"
            :existAccountIds="existAccountIds"
            @close="refreshData()"
        />
    </a-drawer>
</template>

<script>
import { racAccountApi } from '@/api/Api';
import ManageAddAccountForm from './ManageAddAccountForm.vue';

export default {
    components: {
        ManageAddAccountForm,
    },
    props: {
        user: {
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
        this.api = racAccountApi;
        const columns = [
            {
                dataIndex: 'name',
                title: '账号名称',
                fixed: 'left',
                scopedSlots: { customRender: 'tagName' },
            },
            {
                dataIndex: 'fullName',
                title: '账号全称',
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
            existAccountIds: [],
            columns,
            showAccount: false,
            manageAddAccountFormVisible: false,
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
        // this.manageAddAccountForm = this.$refs.manageAddAccountForm;
        // this.managerModifyAccountForm = this.$refs.managerModifyAccountForm;
    },
    methods: {
        /** 刷新数据 */
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.user };
                const userId = id;
                const data = { userId, deep: false };
                // if (keywords && keywords.trim() !== '') data.keywords = keywords.trim();
                this.api
                    .listByUserId(data)
                    .then(ro => {
                        this.dataSource = ro.extra.list;
                    })
                    .finally(() => {
                        this.existAccountIds = [];
                        for (const list of this.dataSource) {
                            this.existAccountIds.push(list.id);
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
         * 处理添加账号关系的事件
         */
        handleAdd() {
            this.manageAddAccountFormVisible = true;
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
