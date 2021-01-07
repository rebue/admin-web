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
                    <a @click="handleModify(record)">编辑</a>
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
            :model="model"
            @close="handleClose"
        />
    </a-card>
    <!-- </page-header-wrapper> -->
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
            return RacDomainApi.listAll()
                .then(ro => (this.dataSource = ro.extra.list))
                .finally(() => (this.loading = false));
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
            if (record.status !== 0) {
                this.$message.info(`${record.no} 订阅成功`);
            } else {
                this.$message.error(`${record.no} 订阅失败，规则已关闭`);
            }
        },
    },
};
</script>
