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
                            <p>帐号ID：{record.id}</p>
                            <p>账户名：{text}</p>
                            <p>手机号：{record.signInMobile}</p>
                            <p>邮箱：{record.signInEmail}</p>
                        </template>
                    </a-popover>
                ),
            },
            {
                dataIndex: 'description',
                title: '昵称',
                customRender: (text, record) => (
                    <a-popover title={'昵称详情'}>
                        {text}
                        <template slot="content">
                            <p>账户昵称：{record.signInNickname}</p>
                            <p>微信昵称：{record.wxNickname}</p>
                            <p>QQ昵称：{record.qqNickname}</p>
                        </template>
                    </a-popover>
                ),
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
            return ['可以添加的账户', this.curOrgName + '的账户'];
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
                    realmId: this.record.realmId,
                    orgId: this.record.id,
                    addableKeywords: this.addableKeywords,
                    existKeywords: this.existKeywords,
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
                                title: `${allList[i].signInName || allList[i].signInMobile || allList[i].signInEmail}`,
                                description: `${allList[i].signInNickname ||
                                    allList[i].wxNickname ||
                                    allList[i].qqNickname}`,
                                disabled: this.record.id === allList[i].orgId,
                            };
                            for (const exist of existList) {
                                targetKeys.push(exist.id);
                            }
                            mockData.push({ ...allList[i], ...data });
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
                racOrgApi
                    .addOrgAccount({ orgId: this.record.id, accountIds: moveKeys })
                    .then(() => {
                        console.log('添加完成');
                    })
                    .finally(() => {
                        this.loading = false;
                        this.refreshData();
                    });
            } else {
                racOrgApi
                    .delOrgAccount({ orgId: this.record.id, accountIds: moveKeys })
                    .then(() => {
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
