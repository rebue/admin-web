<template>
    <base-modal
        ref="baseModal"
        title="将账户添加到分组"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
        :width="850"
        :ok-button-props="{ props: { disabled: true } }"
    >
        <template #footer="{ handleCancel }">
            <a-button icon="rollback" @click="handleCancel"> 返回 </a-button>
        </template>
        <a-form-model ref="form" :model="model">
            <a-form-model-item>
                <div>
                    <a-transfer
                        :titles="titles"
                        :data-source="mockData"
                        :filter-option="filterOption"
                        :target-keys="targetKeys"
                        :render="item => item.title"
                        :disabled="disabled"
                        :show-search="showSearch"
                        :show-select-all="false"
                        @change="handleChange"
                        :operations="operations"
                        @search="handleSearch"
                        :locale="{
                            itemUnit: '项',
                            itemsUnit: '项',
                            notFoundContent: '列表为空',
                            searchPlaceholder: '请输入搜索内容',
                        }"
                        :list-style="{
                            width: '400px',
                            height: '500px',
                        }"
                    >
                        <template
                            slot="children"
                            slot-scope="{
                                props: { direction, filteredItems, selectedKeys, disabled: listDisabled },
                                on: { itemSelectAll, itemSelect },
                            }"
                        >
                            <a-table
                                :scroll="{ x: false, y: 300 }"
                                :pagination="pagination"
                                :row-selection="
                                    getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })
                                "
                                :columns="direction === 'left' ? leftColumns : rightColumns"
                                :data-source="filteredItems"
                                size="small"
                                :style="{ pointerEvents: listDisabled ? 'none' : null }"
                                :custom-row="
                                    ({ key, disabled: itemDisabled }) => ({
                                        on: {
                                            click: () => {
                                                if (itemDisabled || listDisabled) return;
                                                itemSelect(key, !selectedKeys.includes(key));
                                            },
                                        },
                                    })
                                "
                            />
                        </template>
                    </a-transfer>
                </div>
            </a-form-model-item>
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAccountApi, racOrgApi } from '@/api/Api';
import difference from 'lodash/difference';

const leftTableColumns = [
    {
        dataIndex: 'title',
        title: '名称',
    },
    {
        dataIndex: 'description',
        title: '昵称',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'title',
        title: '名称',
    },
    {
        dataIndex: 'description',
        title: '昵称',
    },
];

export default {
    components: {
        BaseModal,
    },
    props: {
        curOrgName: {
            type: String,
            required: true,
        },
        record: {
            type: Object,
            required: true,
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
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {
            loading: false,
            mockData: [],
            targetKeys: [],
            model: {},
            operations: ['添加', '移除'],
            disabled: false,
            showSearch: true,
            leftColumns: leftTableColumns,
            rightColumns: rightTableColumns,
            pagination: false,
        };
    },
    computed: {
        titles() {
            return ['需要添加的账户', this.curOrgName + '的账户'];
        },
    },
    mounted() {
        this.pagination = this.defaultPagination;
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                this.model = {};
                this.loading = true;
                this.$refs.form.resetFields();
                console.log('titles', this.titles);
                racAccountApi
                    .list({ domainId: this.record.domainId, orgId: this.record.id })
                    .then(ro => {
                        const list = ro.extra.list;
                        const ids = ro.extra.ids;
                        const targetKeys = [];
                        const mockData = [];
                        for (let i = 0; i < list.length; i++) {
                            const data = {
                                key: list[i].id,
                                title: `${list[i].signInName}`,
                                description: `${list[i].signInNickname}`,
                                chosen: this.record.id === list[i].orgId,
                            };
                            if (data.chosen) {
                                targetKeys.push(data.key);
                            }
                            for (const id of ids) {
                                targetKeys.push(id);
                            }
                            mockData.push(data);
                        }
                        this.mockData = mockData;
                        this.targetKeys = targetKeys;
                    })
                    .finally(() => {
                        this.loading = false;
                        this.orgName = this.record.name;
                    });
            });
        },
        filterOption(inputValue, item) {
            // return item.title.indexOf(inputValue) !== -1;
            return item.description.indexOf(inputValue) > -1;
        },
        handleChange(targetKeys, direction, moveKeys) {
            console.log(targetKeys);
            console.log(direction);
            console.log(moveKeys);
            this.targetKeys = targetKeys;
            if (direction === 'right') {
                racOrgApi
                    .addOrgAccount({ orgId: this.record.id, accountId: moveKeys })
                    .then(ro => {
                        console.log('添加完成');
                    })
                    .finally(() => {
                        this.loading = false;
                        this.handleShow();
                    });
            } else {
                racOrgApi
                    .delOrgAccount({ orgId: this.record.id, accountIds: moveKeys })
                    .then(ro => {
                        console.log('移除完成');
                    })
                    .finally(() => {
                        this.loading = false;
                        this.handleShow();
                    });
            }
        },
        handleSearch(dir, value) {
            console.log('search:', dir, value);
            console.log('this.targetKeys', this.targetKeys);
        },
        getRowSelection({ disabled, selectedKeys, itemSelectAll, itemSelect }) {
            return {
                getCheckboxProps: item => ({ props: { disabled: disabled || item.disabled } }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows.filter(item => !item.disabled).map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, selectedKeys)
                        : difference(selectedKeys, treeSelectedKeys);
                    itemSelectAll(diffKeys, selected);
                },
                onSelect({ key }, selected) {
                    itemSelect(key, selected);
                },
                selectedRowKeys: selectedKeys,
            };
        },

        handleOk() {
            this.record.unlockReason = this.model.unlockReason;

            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.record.lockAccountId = this.record.id;
                    racAccountApi
                        .enable(this.record)
                        .then(() => this.$emit('update:visible', false))
                        .finally(() => (this.loading = false));
                    this.loading = false;
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
    },
};
</script>
