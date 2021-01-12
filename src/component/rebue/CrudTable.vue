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
                    <a-dropdown>
                        <a-button type="link" :icon="settingStore.tableBorder ? 'table' : 'small-dash'"></a-button>
                        <div slot="overlay">
                            <a-switch
                                :default-checked="settingStore.tableBorder"
                                checked-children="有边框"
                                un-checked-children="无边框"
                                @change="changeTableBorder"
                            />
                        </div>
                    </a-dropdown>
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
                <a-tooltip title="列选择">
                    <a-button type="link" icon="project" />
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
            :columns="columns"
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
        const draggingMap = {};
        let isLeft = false;
        this.columns.forEach(col => {
            if (!col.width) {
                isLeft = true;
            }
            draggingMap[col.key || col.dataIndex] = {
                isLeft,
                width: col.width,
            };
        });
        const draggingState = Vue.observable(draggingMap);
        const resizeableTitle = (h, props, children) => {
            let thDom = null;
            const { key, ...restProps } = props;
            const col = this.columns.find(col => {
                const k = col.key || col.dataIndex;
                return k === key;
            });

            if (!col.width) {
                return <th {...restProps}>{children}</th>;
            }

            const onDrag = x => {
                // draggingState[key].width = 0;
                if (draggingState[key].isLeft) {
                    col.width = Math.max(draggingState[key].width * 2 - x, 1);
                } else {
                    col.width = Math.max(x, 1);
                }
            };

            const onDragstop = () => {
                draggingState[key].width = thDom.getBoundingClientRect().width;
            };

            return (
                <th {...restProps} v-ant-ref={r => (thDom = r)} width={col.width} class="resize-table-th">
                    {children}
                    <vue-draggable-resizable
                        key={col.key}
                        class={
                            draggingState[key].isLeft ? 'table-draggable-handle-left' : 'table-draggable-handle-right'
                        }
                        w={10}
                        x={draggingState[key].width || col.width}
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
            fullScreenIcon: 'fullscreen',
            fullScreenTitle: '全屏',
        };
    },
    mounted() {
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
        changeTableBorder(checked) {
            settingAction.changeTableBorder(checked);
        },
        /**
         * 改变表格大小
         */
        setTableSize(size) {
            settingAction.setTableSize(size);
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
</style>
