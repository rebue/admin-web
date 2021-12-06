// 写信页面
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
                    :rowSelection="{}"
                >
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'n',
                title: '邮件',
                width: 100,
            },
            {
                dataIndex: 'title',
                title: '标题',
                ellipsis: true,
            },
            {
                dataIndex: 'sendDate',
                title: '发送时间',
                ellipsis: true,
            },
            {
                dataIndex: 'Sender',
                title: '发送人',
                ellipsis: true,
            },
            {
                dataIndex: 'enclosure',
                title: '附件',
                ellipsis: true,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 150,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '阅读',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '放入废件箱',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '标记为已读',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '标记为未读',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '打印',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '删除',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '回复',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'a',
                title: '转发',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
        ];
        return {
            columns,
        };
    },
    mounted() {
        //
    },
    methods: {
        //
    },
};
</script>
