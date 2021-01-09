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
            ref="table"
            :size="settingStore.tableSize"
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
            :width="640"
            :visible="editFormVisible"
            :editFormType="editFormType"
            :model="model"
            @close="handleEditFormClose"
        />
    </a-card>
</template>

<script>
import { observer } from 'mobx-vue';
import { settingStore } from '@/store/Store';
import { racDomainApi } from '@/api/Api';
import RacDomainMo from '@/mo/rac/RacDomainMo';
import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { settingAction } from '@/action/Action';

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

export default observer({
    name: 'Manager',
    components: {
        EditForm,
    },
    data() {
        this.columns = columns;
        return {
            loading: false,
            editFormType: EditFormTypeDic.None,
            editFormVisible: false,
            model: new RacDomainMo(),
            settingStore,
            dataSource: [],
            fullScreen: false,
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
            return racDomainApi
                .listAll()
                .then(ro => (this.dataSource = ro.extra.list))
                .finally(() => (this.loading = false));
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
            this.$fullscreen.toggle(undefined, {
                wrap: false,
                callback: fullScreen => {
                    this.fullScreen = fullScreen;
                    this.fullScreenIcon = !fullScreen ? 'fullscreen' : 'fullscreen-exit';
                    this.fullScreenTitle = !fullScreen ? '全屏' : '退出全屏';
                },
            });
        },
        /**
         * 添加
         */
        handleAdd() {
            this.model = new RacDomainMo();
            this.editFormType = EditFormTypeDic.Add;
            this.editFormVisible = true;
        },
        /**
         * 修改
         */
        handleModify(record) {
            this.model = record;
            this.editFormType = EditFormTypeDic.Modify;
            this.editFormVisible = true;
        },
        /**
         * 编辑窗体关闭
         */
        handleEditFormClose() {
            this.refreshData();
            this.editFormVisible = false;
        },
        /**
         * 删除
         */
        handleDel(record) {
            this.loading = true;
            racDomainApi.delById(record.id).finally(() => {
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
