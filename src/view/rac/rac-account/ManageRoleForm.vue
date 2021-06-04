<template>
    <base-modal
        ref="baseModal"
        title="将角色添加到账户中"
        :hiddenOkButton="true"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        :width="920"
        :ok-button-props="{ props: { disabled: true } }"
    >
        <a-transfer
            :titles="titles"
            :data-source="mockData"
            :filter-option="() => true"
            :target-keys="targetKeys"
            :render="item => item.title"
            :disabled="disabled"
            :show-search="showSearch"
            :show-select-all="false"
            :operations="operations"
            @change="handleChange"
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
                    props: { filteredItems, selectedKeys, disabled: listDisabled },
                    on: { itemSelectAll, itemSelect },
                }"
            >
                <a-table
                    :scroll="{ x: false, y: 300 }"
                    :row-selection="
                        getRowSelection({ disabled: listDisabled, selectedKeys, itemSelectAll, itemSelect })
                    "
                    :columns="leftColumns"
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
                <!-- :pagination="direction === 'left' ? leftPagination : rightPagination" -->
                <!-- @change="direction === 'left' ? handleLeftTableChange($event) : handleRightTableChange($event)" -->
            </template>
        </a-transfer>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAccountApi, racOrgApi, racRoleApi } from '@/api/Api';
import difference from 'lodash/difference';

export default {
    components: {
        BaseModal,
    },
    props: {
        account: {
            type: Object,
            required: true,
        },
        defaultPagination: {
            type: [Boolean, Object],
            default: function() {
                return {
                    pageSize: 5,
                    pageSizeOptions: ['5', '10', '20'],
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
        const leftTableColumns = [
            {
                dataIndex: 'title',
                title: '名称',
                customRender: (text, record) => (
                    <a-popover title={text + '详情'}>
                        {text}
                        <template slot="content">
                            <p>角色ID：{record.id}</p>
                            <p>角色名：{text}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'description',
                title: '备注',
            },
        ];
        return {
            loading: false,
            mockData: [],
            targetKeys: [],
            operations: ['添加', '移除'],
            disabled: false,
            showSearch: true,
            leftColumns: leftTableColumns,
            // rightColumns: rightTableColumns,
            leftPagination: {
                ...this.defaultPagination,
            },
            rightPagination: {
                ...this.defaultPagination,
            },
            addableKeywords: '',
            existKeywords: '',
        };
    },
    computed: {
        titles() {
            return [
                '可以添加的角色身份',
                (this.account.signInName || this.account.signInMobile || this.account.signInEmail) + '拥有的角色身份',
            ];
        },
    },
    methods: {
        handleShow() {
            this.addableKeywords = '';
            this.existKeywords = '';
            this.refreshData();
        },
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { current, pageSize } = this.leftPagination;
                const data = {
                    pageNum: current ?? 1,
                    pageSize,
                    domainId: this.account.domainId,
                    accountId: this.account.id,
                    addableKeywords: this.addableKeywords,
                    existKeywords: this.existKeywords,
                };
                racRoleApi
                    .listTransferOfRole(data)
                    .then(ro => {
                        const { addableList, existList } = ro.extra;
                        const targetKeys = [];
                        const mockData = [];
                        for (let i = 0; i < addableList.length; i++) {
                            const data = {
                                key: addableList[i].id,
                                title: `${addableList[i].name}`,
                                description: `${addableList[i].remark}`,
                            };
                            for (const exist of existList) {
                                targetKeys.push(exist.roleId);
                            }
                            mockData.push({ ...data });
                        }
                        this.mockData = mockData;
                        this.targetKeys = targetKeys;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        //点击移除/添加时触发
        handleChange(targetKeys, direction, moveKeys) {
            this.targetKeys = targetKeys;
            if (direction === 'right') {
                racRoleApi
                    .addAccountRole({ accountId: this.account.id, roleIds: moveKeys })
                    .then(ro => {
                        console.log('添加完成');
                    })
                    .finally(() => {
                        this.loading = false;
                        this.refreshData();
                    });
            } else {
                racRoleApi
                    .delAccountRole({ accountId: this.account.id, roleIds: moveKeys })
                    .then(ro => {
                        console.log('移除完成');
                    })
                    .finally(() => {
                        this.loading = false;
                        this.refreshData();
                    });
            }
        },
        //搜索框的内容改变时触发
        handleSearch(dir, value) {
            if (dir === 'left') {
                this.addableKeywords = value.trim();
            } else {
                this.existKeywords = value.trim();
            }
            this.refreshData();
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
        /**
         * 左边表格处理分页、排序、筛选的变化
         */
        handleLeftTableChange: function(pagination) {
            this.leftPagination = {
                ...this.pagination,
                current: pagination.current,
                pageSize: pagination.pageSize,
            };
            this.$nextTick(() => {
                this.refreshData();
            });
        },
        /**
         * 右边处理分页、排序、筛选的变化
         */
        handleRightTableChange: function(pagination) {
            this.rightPagination = {
                ...this.pagination,
                current: pagination.current,
                pageSize: pagination.pageSize,
            };
            this.$nextTick(() => {
                this.refreshData();
            });
        },
    },
};
</script>
