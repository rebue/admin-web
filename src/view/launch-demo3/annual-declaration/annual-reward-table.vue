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
            <div>
                <a-modal
                    width="600px"
                    :title="title"
                    :visible="visible"
                    :confirm-loading="confirmLoading"
                    @cancel="handleCancel"
                >
                    <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" layout="horizontal">
                        <a-form-model-item label="填报人:">
                            <a-input v-model="tableObj.memberName" :disabled="idEdit" />
                        </a-form-model-item>
                        <a-form-model-item label="作者:">
                            <a-input :disabled="context" v-model="tableObj.author" />
                        </a-form-model-item>
                        <a-form-model-item label="奖励类型:">
                            <a-select
                                v-model="tableObj.rewardType"
                                v-decorator="['gender', { rules: [{ required: true, message: '请选择!' }] }]"
                                placeholder="请选择奖励类型"
                                @change="handleSelectChange"
                            >
                                <a-select-option value="个人">
                                    个人
                                </a-select-option>
                                <a-select-option value="群体">
                                    群体
                                </a-select-option>
                            </a-select>
                            <!-- <a-input :disabled="context" v-model="tableObj.rewardType" /> -->
                        </a-form-model-item>
                        <a-form-model-item label="奖励名称:">
                            <a-input :disabled="context" v-model="tableObj.rewardName" />
                        </a-form-model-item>
                        <a-form-model-item label="奖励工作量:">
                            <a-input :disabled="context" v-model="tableObj.rewardWorkload" />
                        </a-form-model-item>
                        <a-form-model-item label="系统时间:">
                            <!-- <a-input :disabled="context" v-model="tableObj.date" /> -->
                            <a-date-picker
                                :disabled="context"
                                v-model="tableObj.date"
                                v-decorator="['系统时间', config]"
                                show-time
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </a-form-model-item>
                    </a-form-model>
                </a-modal>
            </div>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
export default {
    name: 'annual-reward-table',
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

                            'rewardWorkload|50-500': 500,
                            memberName: '@cname',
                            sex: '@pick(["男", "女"])',
                            author: '@cname',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            status: '@pick(["审核中", "审核通过","审核未通过"])',
                            //department: '@pick(["计算机一班", "计算机二班","GC班"])',
                            rewardType: '@pick(["个人","群体"])',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            date: '@now("yyyy-MM-dd")',
                            // lastChecker: '@cname()',
                            rewardName: '@pick(["自然科学奖","科学进步奖","科学发明奖"])',
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
                dataIndex: 'no',
                title: '序号',
                width: 100,

                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'memberName',
                title: '填报人',
                width: 150,
            },

            {
                dataIndex: 'author',
                title: '作者',
                width: 150,
            },
            {
                dataIndex: 'rewardType',
                title: '奖励类型',
                width: 150,
            },
            {
                dataIndex: 'rewardName',
                title: '科研奖励名称',
                width: 150,
            },
            {
                dataIndex: 'rewardWorkload',
                title: '科研奖励工作量',
                width: 150,
            },
            {
                dataIndex: 'date',
                title: '系统时间',
                width: 180,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,

                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
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
            visible: false,
            tableObj: {
                rewardType: '',
                memberName: '',
                author: '',
                rewardName: '',
                date: '',
                rewardWorkload: '',
            },
            title: '',
            columns,
        };
    },
    methods: {
        handleCancel() {
            this.visible = false;
        },

        handleAdd() {
            this.title = '新增';
            (this.tableObj = {
                rewardType: '',
                memberName: '',
                author: '',
                rewardName: '',
                date: '',
                rewardWorkload: '',
            }),
                (this.visible = true);
        },
        handleEdit(value) {
            this.title = '编辑';
            this.tableObj = value;
            this.visible = true;
        },
        handleDel() {
            //
        },
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
};
</script>

<style scoped></style>
