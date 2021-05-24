<template>
    <!-- a-drawer -->

    <a-drawer
        title="管理组织"
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
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
    </a-drawer>
</template>

<script>
import { racAccountApi, racOrgApi } from '@/api/Api';

export default {
    components: {
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
                confirmTitle: '你确定要删除该组织吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'confirm',
                title: '设置默认',
                confirmTitle: '你确定要将该组织设置为默认组织吗?',
                onClick: record => this.handleDefaultOrg(record),
            },
        ];
        return {
            loading: false,
            dataSource: [],
            columns,
            actions: actions,
            selectedRowKeys: [], // Check here to configure the default column
            red: {},
        };
    },
    computed: {},
    mounted() {
        //
    },
    methods: {
        /** 刷新数据 */
        refreshData() {
            this.loading = true;
            console.log('record', this.record);
            const { id, orgId } = { ...this.red };
            const { domainId } = { ...this.record };
            const data = { domainId, id, orgId };
            // if (keywords && keywords.trim() !== '') data.keywords = keywords.trim();
            this.api.list(data).then(ro => {
                this.loading = false;
                this.dataSource = ro.extra.list;
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
        onSelectChange(selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            this.selectedRowKeys = selectedRowKeys;
        },
        /**
         * 处理添加组织关系的事件
         */
        handleAdd(record) {
            console.log('handleAdd', record);
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
        },
        /**
         * 处理设置默认组织关系的事件
         */
        handleDefaultOrg(record) {
            console.log('handleDefaultOrg', record);
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
            this.refreshData(record);
        },
    },
};
</script>
