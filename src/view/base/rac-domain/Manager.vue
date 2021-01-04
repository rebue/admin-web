<template>
    <!-- <page-header-wrapper> -->
    <a-card :bordered="false">
        <div class="table-operator">
            <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        </div>

        <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" :showPagination="false">
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
        </s-table>

        <edit-form
            ref="editForm"
            :visible="editFormVisible"
            :loading="confirmLoading"
            :record="record"
            @cancel="handleCancel"
            @ok="handleOk"
        />
    </a-card>
    <!-- </page-header-wrapper> -->
</template>

<script>
import { STable } from '@/component/ant-design-pro';
import { listAll } from '@/api/rac/RacDomainApi';
import { RacDomainMo } from '@/mo/rac/RacDomainMo';
import EditForm from './EditForm';

const columns = [
    {
        title: '#',
        scopedSlots: { customRender: 'serial' },
        width: '30px',
    },
    {
        title: '领域编码',
        dataIndex: 'id',
        width: '150px',
    },
    {
        title: '领域名称',
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
        STable,
        EditForm,
    },
    data() {
        this.columns = columns;
        return {
            editFormVisible: false,
            confirmLoading: false,
            record: null,
            // 加载数据方法 必须为 Promise 对象
            loadData: parameter => {
                return listAll().then(res => {
                    return { length: res.extra.list.length, data: res.extra.list };
                });
            },
        };
    },
    methods: {
        handleAdd() {
            this.record = new RacDomainMo();
            this.editFormVisible = true;
        },
        handleEdit(record) {
            this.editFormVisible = true;
            this.record = { ...record };
        },
        handleOk() {
            const form = this.$refs.editForm.form;
            this.confirmLoading = true;
            form.validateFields((errors, values) => {
                if (!errors) {
                    console.log('values', values);
                    if (values.id > 0) {
                        // 修改 e.g.
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }).then(res => {
                            this.editFormVisible = false;
                            this.confirmLoading = false;
                            // 重置表单数据
                            form.resetFields();
                            // 刷新表格
                            this.$refs.table.refresh();

                            this.$message.info('修改成功');
                        });
                    } else {
                        // 新增
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve();
                            }, 1000);
                        }).then(res => {
                            this.editFormVisible = false;
                            this.confirmLoading = false;
                            // 重置表单数据
                            form.resetFields();
                            // 刷新表格
                            this.$refs.table.refresh();

                            this.$message.info('新增成功');
                        });
                    }
                } else {
                    this.confirmLoading = false;
                }
            });
        },
        handleCancel() {
            this.editFormVisible = false;

            const form = this.$refs.editForm.form;
            form.resetFields(); // 清理表单数据（可不做）
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
