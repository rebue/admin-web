<template>
    <fragment>
        <div class="table-operator">
            <div class="table-commands">
                <slot name="commands">
                    <template v-for="(item, index) in commands">
                        <a-button :type="item.buttonType" :icon="item.icon" @click="item.onClick" :key="index">
                            {{ item.title }}
                        </a-button>
                    </template>
                </slot>
            </div>
            <div class="table-tools">
                <a-tooltip title="刷新">
                    <a-button type="link" icon="reload" @click="refreshData" />
                </a-tooltip>
                <a-divider type="vertical" />
                <a-tooltip title="表格边框" :autoAdjustOverflow="false">
                    <a-button type="link" size="large" @click="toggleTableBorder">
                        <a-icon type="table" :style="{ color: settingStore.tableBorder ? '#1890ff' : '#ddd' }" />
                    </a-button>
                </a-tooltip>
                <a-tooltip title="表格斑马条纹" :autoAdjustOverflow="false">
                    <a-button type="link" size="large" @click="toggleTableStrip">
                        <svg-icon icon="table-strip" :style="{ color: settingStore.tableStrip ? '#1890ff' : '#ddd' }" />
                    </a-button>
                </a-tooltip>
                <a-tooltip title="竖向间隔" :autoAdjustOverflow="false">
                    <a-dropdown>
                        <a-button type="link" icon="column-height" />
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a @click="setTableSize('default')">大</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a @click="setTableSize('middle')">中</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a @click="setTableSize('small')">小</a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a-tooltip>
                <a-tooltip title="列显示配置">
                    <a-popover placement="bottom">
                        <template slot="title">
                            <a-checkbox
                                :indeterminate="indeterminate"
                                :defaultChecked="isCheckColsAll"
                                :checked="isCheckColsAll"
                                @change="changeColsCheckAll"
                            >
                                全选
                            </a-checkbox>
                        </template>
                        <template slot="content">
                            <a-checkbox-group
                                class="col-config-checkbox-group"
                                v-model="checkedCols"
                                :options="defaultOptionCols"
                                @change="changeColCheck"
                            />
                        </template>
                        <a-button type="link" icon="project" />
                    </a-popover>
                </a-tooltip>
                <a-divider type="vertical" />
                <fragment v-if="expandable">
                    <a-tooltip title="全部展开">
                        <a-button type="link" size="large" @click="expandAll">
                            <icon-font type="rebue-expand-all" />
                        </a-button>
                    </a-tooltip>
                    <a-tooltip title="全部收缩">
                        <a-button type="link" size="large" @click="collapseAll">
                            <icon-font type="rebue-collapse-all" />
                        </a-button>
                    </a-tooltip>
                    <a-divider type="vertical" />
                </fragment>
                <a-tooltip :title="fullScreenTitle">
                    <a-button type="link" :icon="fullScreenIcon" @click="handleToggleFullScreen" />
                </a-tooltip>
            </div>
        </div>

        <a-table
            :bordered="settingStore.tableBorder"
            :size="settingStore.tableSize"
            :rowKey="(record, index) => (record.id ? record.id : index)"
            :columns="displayColumns"
            :expandedRowKeys="expandedRowKeys"
            :dataSource="dataSource"
            :loading="loading"
            :scroll="{ x: this.scrollX, y: this.scrollY }"
            :rowClassName="
                (record, index) => (settingStore.tableStrip ? (index % 2 === 0 ? 'row-odd' : 'row-even') : '')
            "
            :pagination="pagination"
            :components="components"
            @expand="handleTableExpand"
            @change="handleTableChange"
        >
            <span slot="serial" slot-scope="text, record, index">
                {{
                    pagination === false
                        ? index + 1
                        : (pagination.current ? (pagination.current - 1) * pagination.pageSize : 0) + index + 1
                }}
            </span>
            <span slot="action" slot-scope="text, record">
                <template v-for="(item, index) in actions">
                    <span :key="index">
                        <a v-if="item.type == 'a'" @click="item.onClick(record)">{{ item.title }}</a>
                        <a-popconfirm
                            v-if="item.type == 'confirm'"
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
            <span slot="sort" slot-scope="text, record">
                <span>
                    <a-tooltip title="上移">
                        <a-button
                            :disabled="record.seqNo === 0"
                            shape="circle"
                            size="small"
                            @click="$emit('moveUp', record)"
                        >
                            <icon-font type="rebue-up" />
                        </a-button>
                    </a-tooltip>
                    <a-divider type="vertical" />
                    <a-tooltip title="下移">
                        <a-button
                            :disabled="record.seqNo === record.maxSeqNo"
                            shape="circle"
                            size="small"
                            @click="$emit('moveDown', record)"
                        >
                            <icon-font type="rebue-down" />
                        </a-button>
                    </a-tooltip>
                </span>
            </span>
        </a-table>

        <slot name="editForm" :handleEditFormClose="handleEditFormClose"></slot>
    </fragment>
</template>

<script>
import Vue from 'vue';
import { observer } from 'mobx-vue';
import { settingStore } from '@/store/Store';
import { settingAction } from '@/action/Action';
import SvgIcon from './SvgIcon.vue';

export default observer({
    components: { SvgIcon },
    name: 'CrudTable',
    props: {
        commands: {
            type: Array,
            default: [],
        },
        actions: {
            type: Array,
            default: [],
        },
        columns: {
            type: Array,
            required: true,
        },
        api: {
            type: Object,
            required: true,
        },
        query: {
            type: Object,
        },
        scrollX: {
            type: Number,
            default: 800,
        },
        scrollY: {
            type: Number,
            default: 0,
        },
        /** 表格行数据是否可展开 */
        expandable: {
            type: Boolean,
            default: false,
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
        /** 实现拖曳调整列宽度 */
        const resizeableTitle = (h, props, children) => {
            let thDom = null;
            const { key, ...restProps } = props;
            const col = this.displayColumns.find(col => {
                const k = col.key || col.dataIndex;
                return k === key;
            });

            if (!col.width) {
                return <th {...restProps}>{children}</th>;
            }

            const onDrag = x => {
                // this.draggingState[key].width = 0;
                const propCol = this.columns.find(val => (val.dataIndex || val.key) === key);
                const configCol = this.configColumns.find(val => (val.dataIndex || val.key) === key);
                if (this.draggingState[key].isLeft) {
                    configCol.width = Math.max(propCol.width * 2 - x, 1);
                } else {
                    configCol.width = Math.max(x, 1);
                }
            };

            const onDragstop = () => {
                // this.draggingState[key].width = thDom.getBoundingClientRect().width;
            };

            return (
                <th {...restProps} v-ant-ref={r => (thDom = r)} width={col.width} class="resize-table-th">
                    {children}
                    <vue-draggable-resizable
                        key={col.key}
                        class={
                            this.draggingState[key].isLeft
                                ? 'table-draggable-handle-left'
                                : 'table-draggable-handle-right'
                        }
                        w={10}
                        x={this.draggingState[key].width || col.width}
                        z={1}
                        axis="x"
                        draggable={true}
                        resizable={false}
                        onDragging={onDrag}
                        onDragstop={onDragstop}
                    ></vue-draggable-resizable>
                </th>
            );
        };

        this.components = {
            header: {
                cell: resizeableTitle,
            },
        };

        return {
            loading: false,
            settingStore,
            dataSource: [],
            configColumns: [], // 列配置的列表
            indeterminate: false, // 设置 indeterminate 状态，只负责样式控制
            checkedCols: [], // 选择的列列表(用于列选择配置)
            isCheckColsAll: true, // 是否全选了列列表(用于列选择配置)
            expandedRowKeys: [], //展开的行
            fullScreenIcon: 'fullscreen',
            fullScreenTitle: '全屏',
            pagination: {},
            filters: {},
            sorter: {},
        };
    },
    computed: {
        draggingState() {
            const draggingMap = {};
            let isLeft = false;
            this.displayColumns.forEach(col => {
                if (!col.width) {
                    isLeft = true;
                }
                draggingMap[col.key || col.dataIndex] = {
                    isLeft,
                    width: col.width,
                };
            });
            // const draggingState = Vue.observable(draggingMap);
            return draggingMap;
        },
        /** 默认选项的列列表(用于列选择配置) */
        defaultOptionCols() {
            const defaultOptionCols = [];
            for (const item of this.configColumns) {
                defaultOptionCols.push(item.title);
            }
            return defaultOptionCols;
        },
        /** 最终显示的列列表 */
        displayColumns() {
            const displayColumns = [];
            for (const item of this.configColumns) {
                if (!item.visible) continue;
                displayColumns.push({ ...item });
            }
            return displayColumns;
        },
    },
    inject: ['toggleFullScreen'],
    mounted() {
        for (const item of this.columns) {
            this.configColumns.push({ visible: true, ...item });
            this.checkedCols.push(item.title);
        }
        this.pagination = this.defaultPagination;
        this.refreshData();
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;

            let promise;
            const sorter =
                JSON.stringify(this.sorter) === '{}'
                    ? undefined
                    : { orderBy: this.sorter.sortFilter + this.sorter.sortOrder === 'descend' ? ' DESC' : '' };
            if (this.pagination) {
                // 分页查询
                const { current, pageSize } = this.pagination;
                console.log('current', current);
                const data = { ...this.query, pageNum: current ?? 1, pageSize, ...this.filters, ...sorter };
                promise = this.api.page(data).then(ro => {
                    this.pagination = {
                        ...this.pagination,
                        total: ro.extra.page.total,
                    };
                    this.dataSource = ro.extra.page.list;
                });
            } else {
                // 不分页查询
                const data = { ...this.query, ...this.filters, ...sorter };
                promise = (JSON.stringify(data) === '{}' ? this.api.listAll() : this.api.list(data)).then(
                    ro => (this.dataSource = ro.extra.list)
                );
            }
            return promise.finally(() => (this.loading = false));
        },
        /** 改变表格边框 */
        toggleTableBorder() {
            settingAction.toggleTableBorder();
        },
        /** 改变表格斑马条纹 */
        toggleTableStrip() {
            settingAction.toggleTableStrip();
        },
        /**
         * 改变表格大小
         */
        setTableSize(size) {
            settingAction.setTableSize(size);
        },
        /**
         * 改变列是否选择
         */
        changeColCheck(checkedCols) {
            console.log('changeColCheck');
            this.indeterminate = !!this.checkedCols.length && this.checkedCols.length < this.defaultOptionCols.length;
            this.isCheckColsAll = this.checkedCols.length === this.defaultOptionCols.length;
            for (const item of this.configColumns) {
                item.visible = checkedCols.find(value => value === item.title);
            }
        },
        /**
         * 改变列全选
         */
        changeColsCheckAll(e) {
            console.log('changeColsCheckAll', e);
            Object.assign(this, {
                checkedCols: e.target.checked ? this.defaultOptionCols : [],
                indeterminate: false,
                isCheckColsAll: e.target.checked,
            });
            for (const item of this.configColumns) {
                item.visible = e.target.checked;
            }
        },
        /**
         * 展开树指定节点
         */
        expand(id) {
            this.expandedRowKeys.push(id);
        },
        /**
         * 收缩树指定节点
         */
        collapse(id) {
            this.expandedRowKeys.splice(this.expandedRowKeys.findIndex(item => item.id === id));
        },
        /**
         * 展开树所有节点
         */
        expandAll() {
            for (const record of this.dataSource) {
                this.expandedRowKeys.push(record.id);
            }
        },
        /**
         * 收缩树所有节点
         */
        collapseAll() {
            this.expandedRowKeys = [];
        },
        /**
         * 切换全屏
         */
        handleToggleFullScreen() {
            this.toggleFullScreen(fullScreen => {
                this.fullScreenIcon = !fullScreen ? 'fullscreen' : 'fullscreen-exit';
                this.fullScreenTitle = !fullScreen ? '全屏' : '退出全屏';
            });
        },
        /**
         * 处理树节点的展开与收缩
         */
        handleTableExpand(expanded, record) {
            if (expanded) this.expandedRowKeys.push(record.id);
            else
                this.expandedRowKeys.splice(
                    this.expandedRowKeys.findIndex(item => item.id === record.id),
                    1
                );
        },
        /**
         * 处理分页、排序、筛选的变化
         */
        handleTableChange(pagination, filters, sorter, { currentDataSource }) {
            console.log('handleTableChange', pagination, filters, sorter, currentDataSource);
            this.filters = filters;
            this.sorter = sorter;
            if (this.pagination !== false) {
                this.pagination = {
                    ...this.pagination,
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                };
            }
            this.$nextTick(() => {
                this.refreshData();
            });
        },
        /**
         * 编辑窗体关闭
         */
        handleEditFormClose() {
            this.refreshData();
        },
        /**
         * 删除
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshData();
            });
        },
    },
});
</script>

<style lang="less" scoped>
.table-operator {
    display: flex;
    margin-bottom: 18px;
    .table-commands {
        flex-grow: 1;
    }
    .table-tools {
        flex-grow: 0;
    }
}

.col-config-checkbox-group {
    display: flex;
    flex-direction: column;
}
</style>

<style lang="less">
.row-even {
    background-color: #fafafa;
}
</style>
