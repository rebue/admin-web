<template>
    <base-modal
        ref="baseModal"
        title="将账户添加到分组"
        :hiddenOkButton="true"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        :width="920"
        :ok-button-props="{ props: { disabled: true } }"
    >
        <template #footer="{ handleCancel }">
            <a-button icon="rollback" @click="handleCancel"> 返回 </a-button>
        </template>
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
                    :pagination="direction === 'left' ? leftPagination : rightPagination"
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
                    @change="direction === 'left' ? handleLeftTableChange($event) : handleRightTableChange($event)"
                />
            </template>
        </a-transfer>
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
                    pageSize: 5,
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
            operations: ['添加', '移除'],
            disabled: false,
            showSearch: true,
            leftColumns: leftTableColumns,
            rightColumns: rightTableColumns,
            leftPagination: {
                ...this.defaultPagination,
            },
            rightPagination: {
                ...this.defaultPagination,
            },
            keywords: '',
        };
    },
    computed: {
        titles() {
            return ['可以添加的账户', this.curOrgName + '的账户'];
        },
    },
    // mounted() {
    //     this.leftPagination = {
    //         ...this.defaultPagination,
    //     };
    //     this.rightPagination = {
    //         ...this.defaultPagination,
    //     };
    // },
    methods: {
        handleShow() {
            this.keywords = '';
            this.refreshData();
        },
        refreshData() {
            this.$nextTick(() => {
                this.loading = true;
                const { current, pageSize } = this.leftPagination;
                const data = {
                    pageNum: current ?? 1,
                    pageSize,
                    domainId: this.record.domainId,
                    orgId: this.record.id,
                    keywords: this.keywords,
                };
                racAccountApi
                    .listTransferOfOrg(data)
                    .then(ro => {
                        const { addableList, existList } = ro.extra;
                        this.leftPagination = {
                            ...this.leftPagination,
                            total: addableList.total - 0,
                        };
                        const allList = [...addableList.list, ...existList];
                        const targetKeys = [];
                        const mockData = [];
                        for (let i = 0; i < allList.length; i++) {
                            const data = {
                                key: allList[i].id,
                                title: (
                                    <a-popover
                                        title={
                                            (allList[i].signInName ||
                                                allList[i].signInMobile ||
                                                allList[i].signInEmail) + '详情'
                                        }
                                    >
                                        {allList[i].signInName || allList[i].signInMobile || allList[i].signInEmail}
                                        <template slot="content">
                                            <p>账户ID：{allList[i].id}</p>
                                            <p>
                                                账户名：
                                                {allList[i].signInName ||
                                                    allList[i].signInMobile ||
                                                    allList[i].signInEmail}
                                            </p>
                                            <p>
                                                昵称：
                                                {allList[i].signInNickname ||
                                                    allList[i].wxNickname ||
                                                    allList[i].qqNickname}
                                            </p>
                                        </template>
                                    </a-popover>
                                ),
                                description: `${allList[i].signInNickname ||
                                    allList[i].wxNickname ||
                                    allList[i].qqNickname}`,
                                //chosen: this.record.id === allList[i].orgId,
                                disabled: this.record.id === allList[i].orgId,
                            };
                            // if (data.chosen) {
                            //     targetKeys.push(data.key);
                            // }
                            for (const exist of existList) {
                                targetKeys.push(exist.id);
                            }
                            mockData.push(data);
                        }
                        console.log('mockData', mockData);
                        this.mockData = mockData;
                        this.targetKeys = targetKeys;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        filterOption(inputValue, item) {
            // return item.title.indexOf(inputValue) !== -1;
            return item.description.indexOf(inputValue) > -1;
        },
        //点击移除/添加时触发
        handleChange(targetKeys, direction, moveKeys) {
            this.targetKeys = targetKeys;
            if (direction === 'right') {
                racOrgApi
                    .addOrgAccount({ orgId: this.record.id, accountId: moveKeys })
                    .then(ro => {
                        console.log('添加完成');
                    })
                    .finally(() => {
                        this.loading = false;
                        this.refreshData();
                    });
            } else {
                racOrgApi
                    .delOrgAccount({ orgId: this.record.id, accountIds: moveKeys })
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
            console.log('search:', dir, this.selectedKeys);
            this.keywords = value.trim();
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
        handleLeftTableChange: function(pagination, filters, sorter) {
            // console.log('handleTableChange', 'pagination', pagination, 'filters', filters);
            // this.filters = filters;
            //this.sorter = sorter;
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
        handleRightTableChange: function(pagination, filters, sorter) {
            console.log('handleTableChange', 'pagination', pagination, 'filters', filters);
            this.filters = filters;
            this.sorter = sorter;
            this.rightPagination = {
                ...this.pagination,
                current: pagination.current,
                pageSize: pagination.pageSize,
            };
        },
    },
};
</script>
