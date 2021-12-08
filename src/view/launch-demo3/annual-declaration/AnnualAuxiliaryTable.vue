<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :commands="tableCommands"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="600"
                :defaultPagination="true"
                :showKeywords="showKeywords"
            ></crud-table>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
export default {
    name: 'AnnualAuxiliaryTable',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|5-20': [
                        {
                            'id|+1': 10000000,

                            'auxiliaryWorkload|50-400': 400,
                            memberName: '@cname',
                            //sex: '@pick(["男", "女"])',
                            author: '@cname',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            status: '@pick(["审核中", "审核通过","审核未通过"])',
                            //department: '@pick(["计算机一班", "计算机二班","GC班"])',
                            rewardType: '@pick(["个人","群体"])',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            createTime: '@now("yyyy-MM-dd")',
                            workTime: '@now("yyyy-MM-dd")',
                            // lastChecker: '@cname()',
                            auxiliaryWork: '@pick(["微分子研究","新教学方法","新科学发展观", "物理模型"])',
                            // arriveTime: '@now("yyyy-MM-dd")',
                            // meet: '@pick(["是", "否"])',
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
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

        this.showKeywords = true;
        const columns = [
            {
                dataIndex: 'memberName',
                title: '填写人',
                width: 150,
            },

            {
                dataIndex: 'author',
                title: '作者',
                ellipsis: true,
            },
            {
                dataIndex: 'auxiliaryWork',
                title: '辅助的工作',
                ellipsis: true,
            },
            {
                dataIndex: 'workTime',
                title: '工作日期',
                ellipsis: true,
            },
            {
                dataIndex: 'auxiliaryWorkload',
                title: '辅助的工作量',
                ellipsis: true,
            },
            {
                dataIndex: 'createTime',
                title: '添加时间',
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '修改',
                onClick: this.handleEdit,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '删除',
                onClick: this.handleDel,
            },
            {
                buttonType: 'primary',
                icon: 'plus',
                title: '新增',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
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
        this.crudTable = this.$refs.crudTable;
    },
};
</script>

<style scoped></style>
