<template>
    <a-card class="manager-card" :bordered="false" :class="{ 'element-fullscreen': fullScreen }">
        <div class="manager-operator">
            <div class="manager-commands">
                <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
            </div>
            <div class="table-tools">
                <a-tooltip title="刷新">
                    <a-button type="link" icon="reload" @click="refreshData" />
                </a-tooltip>
                <a-tooltip title="竖向间隔" autoAdjustOverflow="false">
                    <a-dropdown>
                        <a-button type="link" icon="column-height" />
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a @click="tableSize = 'default'">大</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a @click="tableSize = 'middle'">中</a>
                            </a-menu-item>
                            <a-menu-item>
                                <a @click="tableSize = 'small'">小</a>
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
            ref="table"
            :size="tableSize"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :loading="loading"
            :pagination="false"
            :rowClassName="(record, index) => (index % 2 === 0 ? 'row-odd' : 'row-even')"
        >
            <span slot="serial" slot-scope="text, record, index">
                {{ index + 1 }}
            </span>
            <span slot="action" slot-scope="text, record">
                <template>
                    <a @click="handleModify(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        title="你确定要删除本条记录吗?"
                        @confirm="handleDel(record)"
                        okText="确定"
                        cancelText="取消"
                    >
                        <a>删除</a>
                    </a-popconfirm>
                </template>
            </span>
        </a-table>
        <edit-form
            ref="editForm"
            :title="this.$route.meta.title"
            :editFormType="editFormType"
            :visible="editFormVisible"
            :model="model"
            @close="handleClose"
        />
    </a-card>
</template>

<script>
import RacDomainApi from '@/api/rac/RacDomainApi';
import RacDomainMo from '@/mo/rac/RacDomainMo';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';

const columns = [
    {
        title: '#',
        scopedSlots: { customRender: 'serial' },
        width: '30px',
    },
    {
        title: '编码',
        dataIndex: 'id',
        width: '150px',
    },
    {
        title: '名称',
        dataIndex: 'name',
        width: '150px',
    },
    {
        title: '备注',
        dataIndex: 'remark',
        ellipsis: true,
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    name: 'Manager',
    components: {
        // STable,
        EditForm,
    },
    data() {
        this.columns = columns;
        return {
            loading: false,
            editFormType: EditFormTypeDic.None,
            editFormVisible: false,
            model: new RacDomainMo(),
            dataSource: [],
            fullScreen: false,
            fullScreenIcon: 'fullscreen',
            fullScreenTitle: '全屏',
            tableSize: 'default',
        };
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            return RacDomainApi.listAll()
                .then(ro => (this.dataSource = ro.extra.list))
                .finally(() => (this.loading = false));
        },
        toggleFullScreen() {
            this.$fullscreen.toggle(undefined, {
                wrap: false,
                callback: this.handleFullScreenChanged,
            });
        },
        handleFullScreenChanged(fullScreen) {
            this.fullScreen = fullScreen;
            this.fullScreenIcon = !fullScreen ? 'fullscreen' : 'fullscreen-exit';
            this.fullScreenTitle = !fullScreen ? '全屏' : '退出全屏';
        },
        handleAdd() {
            this.model = new RacDomainMo();
            this.editFormType = EditFormTypeDic.Add;
            this.editFormVisible = true;
        },
        handleModify(record) {
            this.model = record;
            this.editFormType = EditFormTypeDic.Modify;
            this.editFormVisible = true;
        },
        handleClose() {
            this.refreshData();
            this.editFormVisible = false;
        },
        handleDel(record) {
            this.loading = true;
            RacDomainApi.del(record.id).finally(() => {
                this.refreshData();
            });
        },
    },
};
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

.manager-card {
    // height: 100%; /** 全屏的时候撑开高度 */
    .manager-operator {
        display: flex;
        margin-bottom: 18px;
        .manager-commands {
            flex-grow: 1;
        }
        .table-tools {
            flex-grow: 0;
        }
    }
}

.row-even {
    background-color: #fafafa;
}
</style>
