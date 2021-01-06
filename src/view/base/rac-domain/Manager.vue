<template>
    <!-- <page-header-wrapper> -->
    <a-card :bordered="false">
        <div class="table-operator">
            <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        </div>

        <a-table
            ref="table"
            size="default"
            rowKey="id"
            :columns="columns"
            :dataSource="dataSource"
            :loading="loading"
            :pagination="false"
        >
            <span slot="serial" slot-scope="text, record, index">
                {{ index + 1 }}
            </span>
            <span slot="action" slot-scope="text, record">
                <template>
                    <a @click="handleEdit(record)">编辑</a>
                    <a-divider type="vertical" />
                    <a @click="handleDel(record)">删除</a>
                </template>
            </span>
        </a-table>

        <edit-form
            ref="editForm"
            :title="this.$route.meta.title"
            :editFormType="editFormType"
            :visible="editFormVisible"
            :model="record"
            @close="handleClose"
        />
    </a-card>
    <!-- </page-header-wrapper> -->
</template>

<script>
import { listAll } from '@/api/rac/RacDomainApi';
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
            record: new RacDomainMo(),
            // 加载数据方法 必须为 Promise 对象
            // loadData: this.refreshData,
            dataSource: [],
        };
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.loading = true;
            return listAll()
                .then(ro => {
                    this.dataSource = ro.extra.list;
                    // return { length: ro.extra.list.length, data: ro.extra.list };
                })
                .finally(() => (this.loading = false));
        },
        handleAdd() {
            this.model = new RacDomainMo();
            this.editFormType = EditFormTypeDic.Add;
            this.editFormVisible = true;
        },
        handleEdit(record) {
            this.model = record;
            this.editFormType = EditFormTypeDic.Update;
            this.editFormVisible = true;
        },
        handleClose() {
            this.editFormVisible = false;
            this.editFormType = EditFormTypeDic.None;
            this.model = null;
            this.refreshData();
        },
        handleDel(record) {
            if (record.status !== 0) {
                this.$message.info(`${record.no} 订阅成功`);
            } else {
                this.$message.error(`${record.no} 订阅失败，规则已关闭`);
            }
        },
    },
};
</script>
