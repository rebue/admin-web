// 收件箱
<template>
    <div>
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
                        :defaultPagination="true"
                        :rowSelection="{}"
                    >
                    </crud-table>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-11': [
                        {
                            'id|+1': 10000000,
                            n: '',
                            title: '新邮件',
                            'sendDate|+1': [
                                '2021-12-15 10:21:21',
                                '2021-12-05 09:25:32',
                                '2021-12-01 12:31:06',
                                '2021-11-25 07:03:22',
                                '2021-11-03 09:54:56',
                                '2021-10-15 15:36:45',
                                '2021-10-10 10:55:32',
                                '2021-09-16 10:27:22',
                                '2021-09-09 08:00:06',
                                '2021-09-01 11:26:45',
                                '2021-08-11 17:06:52',
                            ],
                            sender: '@cname',
                            enclosure: '',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 20,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });
            return p;
        };
        this.api = {
            page,
            listAll: page,
            list: page,
        };
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
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
                width: 150,
            },
            {
                dataIndex: 'sendDate',
                title: '发送时间',
                width: 150,
            },
            {
                dataIndex: 'sender',
                title: '发送人',
                width: 150,
            },
            {
                dataIndex: 'enclosure',
                title: '附件',
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 150,
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
