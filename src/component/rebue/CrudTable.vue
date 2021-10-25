<template>
    <fragment>
        <div class="main">
            <div class="left">
                <slot name="left" />
            </div>
            <div class="client">
                <div class="table-operator">
                    <div class="table-commands">
                        <slot name="commands">
                            <template v-for="(item, index) in commands">
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
                    <div class="table-keywords">
                        <slot name="keywordsLeft"> </slot>
                        <slot name="keywords">
                            <a-input-search
                                :style="{ width: searchWidth + 'px' }"
                                v-if="showKeywords"
                                v-model.trim="keywords"
                                :loading="loading"
                                placeholder="关键字"
                                @search="refreshData"
                            />
                        </slot>
                    </div>
                    <div class="table-tools">
                        <a-tooltip title="刷新">
                            <a-button type="link" icon="reload" @click="refreshData" />
                        </a-tooltip>
                        <a-divider type="vertical" />
                        <a-tooltip :title="this.iconTips" v-show="showHierarchical">
                            <a-button type="link" size="large" @click="toggleAccountDisplay">
                                <a-icon
                                    :type="this.changeIcon ? 'unordered-list' : 'apartment'"
                                    :style="{ color: '#1890ff' }"
                                />
                            </a-button>
                            <a-divider type="vertical" />
                        </a-tooltip>
                        <a-tooltip title="表格边框" :autoAdjustOverflow="false">
                            <a-button type="link" size="large" @click="toggleTableBorder">
                                <a-icon
                                    type="table"
                                    :style="{ color: settingStore.tableBorder ? '#1890ff' : '#ddd' }"
                                />
                            </a-button>
                        </a-tooltip>
                        <a-tooltip title="表格斑马条纹" :autoAdjustOverflow="false">
                            <a-button type="link" size="large" @click="toggleTableStrip">
                                <svg-icon
                                    icon="table-strip"
                                    :style="{ color: settingStore.tableStrip ? '#1890ff' : '#ddd' }"
                                />
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
                        <a-tooltip v-if="expandable" title="全部展开">
                            <a-button type="link" size="large" @click="expandAll">
                                <icon-font type="rebue-expand-all" />
                            </a-button>
                        </a-tooltip>
                        <a-tooltip v-if="expandable" title="全部收缩">
                            <a-button type="link" size="large" @click="collapseAll">
                                <icon-font type="rebue-collapse-all" />
                            </a-button>
                        </a-tooltip>
                        <a-divider v-if="expandable" type="vertical" />
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
                    v-bind="$attrs"
                    v-on="$listeners"
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
                                <a-dropdown v-if="item.type === 'more'">
                                    <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                                        更多 <a-icon type="down" />
                                    </a>
                                    <a-menu slot="overlay">
                                        <template v-for="(moreItem, moreIndex) in item.items">
                                            <a-menu-item :key="moreIndex">
                                                <a @click="moreItem.onClick(record)">{{ moreItem.title }}</a>
                                            </a-menu-item>
                                        </template>
                                    </a-menu>
                                </a-dropdown>
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
            </div>
        </div>
    </fragment>
</template>

<script>
import Vue from 'vue';
import { observer } from 'mobx-vue';
import { settingStore } from '@/store/Store';
import { settingAction } from '@/action/Action';
import { forEachTree } from '@/util/tree';
import SvgIcon from './SvgIcon.vue';

export default observer({
    components: { SvgIcon },
    name: 'CrudTable',
    props: {
        sortedInfo: {
            type: Object,
            required: false,
        },
        searchWidth: {
            type: Number,
            default: 250,
        },
        showKeywords: {
            type: Boolean,
            default: false,
        },
        commands: {
            type: Array,
            default: () => [],
        },
        actions: {
            type: Array,
            default: () => [],
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
        /** 是否展示全部账户 */
        showHierarchical: {
            type: Boolean,
            default: false,
        },
        defaultPagination: {
            type: [Boolean, Object],
            default: function () {
                return {
                    pageSize: 10,
                    pageSizeOptions: ['5', '10', '20', '30'],
                    showSizeChanger: true,
                };
            },
        },
        isNewApiFun:{
            type:[Boolean,String],
            default:false,
        }
    },
    data() {
        /** 实现拖曳调整列宽度 */
        const resizeableTitle = (h, props, children) => {
            let thDom = null;
            const { key, ...restProps } = props;
            const col = this.displayColumns.find((col) => {
                const k = col.key || col.dataIndex;
                return k === key;
            });

            if (!col.width) {
                return <th {...restProps}>{children}</th>;
            }

            const onDrag = (x) => {
                // this.draggingState[key].width = 0;
                const propCol = this.columns.find((val) => (val.dataIndex || val.key) === key);
                const configCol = this.configColumns.find((val) => (val.dataIndex || val.key) === key);
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
                <th {...restProps} v-ant-ref={(r) => (thDom = r)} width={col.width} class="resize-table-th">
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
            keywords: '',
            configColumns: [], // 列配置的列表
            indeterminate: false, // 设置 indeterminate 状态，只负责样式控制
            checkedCols: [], // 选择的列列表(用于列选择配置)
            isCheckColsAll: true, // 是否全选了列列表(用于列选择配置)
            expandedRowKeys: [], //展开的行
            fullScreenIcon: 'fullscreen',
            fullScreenTitle: '全屏',
            pagination: false,
            filters: {},
            sorter: {},
            changeIcon: false,
            iconTips: '展示组织下全部账户',
        };
    },

    computed: {
        draggingState() {
            const draggingMap = {};
            let isLeft = false;
            this.displayColumns.forEach((col) => {
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
            const { query, keywords, filters } = this;
            if (query !== undefined) {
                if (query.orgId !== undefined) {
                    query['hierarchical'] = !this.changeIcon;
                }
            }
            const sorter =
                JSON.stringify(this.sorter) === '{}'
                    ? undefined
                    : { orderBy: this.sorter.field + (this.sorter.order === 'descend' ? ' DESC' : '') };
            // 分页查询
            if(this.isNewApiFun){
                if(this.isNewApiFun == 'today'){
                    const data = { ...query};
                    promise = this.api.getCountSurvey(data).then(ro => {
                        //根据属性取属性对应的值
                        let newData = [
                            ro.extra.id
                        ];
                        this.dataSource = newData;
                    });
                }else{
                    promise = this.api.getNacosConfig().then(ro => {
                        this.dataSource = ro.extra[this.isNewApiFun]
                    });
                }
                return promise.finally(() => (this.loading = false));
            }
            if (this.pagination) {
                const { current, pageSize } = this.pagination;
                const data = { ...query, pageNum: current ?? 1, pageSize, ...filters, ...sorter };
                if (keywords && keywords.trim() !== '') data.keywords = keywords.trim();
                promise = this.api.page(data).then((ro) => {
                    this.pagination = {
                        ...this.pagination,
                        total: ro.extra.page.total - 0,
                    };
                    this.dataSource = ro.extra.page.list;
                });
            }
            // 不分页查询
            else {
                const data = { ...query, ...filters, ...sorter };
                if (keywords && keywords.trim() !== '') data.keywords = keywords.trim();
                promise = (JSON.stringify(data) === '{}' ? this.api.listAll() : this.api.list(data)).then(
                    (ro) => (this.dataSource = ro.extra.list)
                );
            }
            return promise.finally(() => (this.loading = false));
        },
        /** 改变改变账户展示方式 */
        toggleAccountDisplay() {
            this.changeIcon = !this.changeIcon;
            if (this.changeIcon) {
                this.refreshData();
                this.iconTips = '展示组织下全部账户';
            } else {
                this.refreshData();
                this.iconTips = '展示组织下当前账户';
            }
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
                item.visible = checkedCols.find((value) => value === item.title);
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
            this.expandedRowKeys.splice(
                this.expandedRowKeys.findIndex((item) => item.id === id),
                1
            );
        },
        /**
         * 展开树所有节点
         */
        expandAll() {
            this.expandedRowKeys = [];
            forEachTree(this.dataSource, (node) => {
                // if (node['children']) {
                //     //有节点的数据添加到key中
                //     this.expandedRowKeys.push(node.id);
                // }
                node['children'] && this.expandedRowKeys.push(node.id);
            });
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
            this.toggleFullScreen((fullScreen) => {
                this.fullScreenIcon = !fullScreen ? 'fullscreen' : 'fullscreen-exit';
                this.fullScreenTitle = !fullScreen ? '全屏' : '退出全屏';
            });
        },
        /**
         * 处理树节点的展开与收缩
         */
        handleTableExpand(expanded, record) {
            if (expanded) {
                this.expandedRowKeys.push(record.id);
            } else {
                const keyIndex = this.expandedRowKeys.findIndex((item) => item === record.id);
                this.expandedRowKeys.splice(keyIndex, 1);
            }
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
.main {
    display: flex;
    align-items: stretch;
    .client {
        flex-grow: 1;
        .table-operator {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 8px;
            .table-commands {
                flex-grow: 1;
            }
            .table-keywords {
                display: flex;
                margin: 0 15px;
            }
        }
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
