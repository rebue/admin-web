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
                    <a-button type="link" @click="switchTableBorder">
                        <a-icon type="table" :style="{ color: settingStore.tableBorder ? '#1890ff' : '#ddd' }" />
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
                                v-model="checkedCols"
                                :options="defaultOptionCols"
                                @change="changeColCheck"
                            />
                        </template>
                        <a-button type="link" icon="project" />
                    </a-popover>
                </a-tooltip>
                <a-tooltip :title="fullScreenTitle">
                    <a-button type="link" :icon="fullScreenIcon" @click="toggleFullScreen" />
                </a-tooltip>
            </div>
        </div>

        <a-table
            :bordered="settingStore.tableBorder"
            :size="settingStore.tableSize"
            :rowKey="(record, index) => index"
            :columns="displayColumns"
            :dataSource="dataSource"
            :loading="loading"
            :pagination="pagination"
            :components="components"
            :rowClassName="(record, index) => (index % 2 === 0 ? 'row-odd' : 'row-even')"
        >
            <span slot="serial" slot-scope="text, record, index">
                {{ index + 1 }}
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
        </a-table>

        <slot name="editForm" :handleEditFormClose="handleEditFormClose"></slot>
    </fragment>
</template>

<script>
import Vue from 'vue';
import { observer } from 'mobx-vue';
import { settingStore } from '@/store/Store';
import { settingAction } from '@/action/Action';

export default observer({
    name: 'CrudTable',
    props: {
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
        pagination: {
            type: Boolean,
            default: () => false,
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
            fullScreenIcon: 'fullscreen',
            fullScreenTitle: '全屏',
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
    mounted() {
        for (const item of this.columns) {
            this.configColumns.push({ visible: true, ...item });
            this.checkedCols.push(item.title);
        }
        this.refreshData();
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            return (this.pagination ? this.api.page() : this.api.listAll())
                .then(ro => (this.dataSource = ro.extra.list))
                .finally(() => (this.loading = false));
        },
        /** 改变表格边框 */
        switchTableBorder() {
            settingAction.switchTableBorder();
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
         * 切换全屏
         */
        toggleFullScreen() {
            this.$parent.$parent.toggleFullScreen(fullScreen => {
                this.fullScreenIcon = !fullScreen ? 'fullscreen' : 'fullscreen-exit';
                this.fullScreenTitle = !fullScreen ? '全屏' : '退出全屏';
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
.element-fullscreen {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
}

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

.row-even {
    background-color: #fafafa;
}

.ant-checkbox-group {
    display: flex;
    flex-direction: column;
}
</style>
