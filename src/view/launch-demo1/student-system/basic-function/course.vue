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
                    :defaultPagination="true"
                    :rowSelection="{}"
                >
                    <template #commands>
                        <div style="width: 100%;overflow: hidden">
                            <div style="float:left;margin-top: 10px">
                                全部课程
                            </div>
                            <div style="float:right;">
                                <a-form-model layout="inline" :model="formInline">
                                    <a-form-model-item label="显示">
                                        <a-select v-model="formInline.user" placeholder="请选择部门">
                                            <a-select-option value="">
                                                一周
                                            </a-select-option>
                                            <a-select-option value="学校">
                                                学校
                                            </a-select-option>
                                            <a-select-option value="个人">
                                                个人
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                </a-form-model>
                            </div>
                        </div>
                        <hr />
                        <div style="width: 100%;">
                            <div style="float: left">年 第{{ moth }}周[{{ startTime }}至{{ endTime }}]</div>
                        </div>
                    </template>
                    <template #left>
                        <div
                            style="margin-right: 10px"
                            :style="{ width: '250px', border: '1px solid #d9d9d9', borderRadius: '4px' }"
                        >
                            <a-calendar :fullscreen="false" @panelChange="onPanelChange" />
                        </div>
                        <div style="height: 200px;margin-right: 10px;overflow: auto;border: 1px solid #000">
                            根据《中华人民共和国人民防空法》规定，为增强人民群众的国防观念和防空意识，使广大市民了解和熟悉我国防空警报信号规定，
                            提高人民群众应对突发灾害能力，自治区人民政府决定于2018年9月18日上午10时30分至10时45分，在全区范围内统一试鸣防空警报暨组织部分
                            人员疏散隐蔽演练。试鸣的防空警报信号为：预先警报：鸣响36秒，停24秒，
                            反复3遍为一个周期（时间3分钟）；空袭警报：鸣响6秒，停6秒，反复15遍为一个周期（时间3分钟）；解除警报：连续鸣响180秒（时间3分钟）
                            。防空警报试鸣期间，全区生产、生活及社会活动照常进行。届时，除参加防空疏散隐蔽演练的人员外，其他市民和过往人员保持正常的工作、学习和生活秩序。
                        </div>
                    </template>
                </crud-table>
            </template>
        </base-manager>
        <!-- <edit-form ref="editForm" @close="handleEditFormClose" /> -->
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
// import EditForm from './EditForm';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'course',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const arr = ['上午', '下午', '晚上'];
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3': [
                        {
                            'id|+1': 1,
                            date: '["上午", "下午","晚上"]',
                            Monday:
                                '@pick(["c语言程序与设计,数据结构", "大学物理，操作系统","高等数学，java程序与设计"])',
                            dataIndex:
                                '@pick(["c语言程序与设计,数据结构", "毛泽东思想概论，马克思理论与哲学","高等数学，数据结构"])',
                            Tuesday:
                                '@pick(["数据集原理,jsp程序设计", "设计模式，马克思理论与哲学","高等数学，数据结构"])',
                            Wednesday:
                                '@pick(["数据集原理,jsp程序设计", "设计模式，马克思理论与哲学","高等数学，数据结构"])',
                            Thursday:
                                '@pick(["数据集原理,jsp程序设计", "设计模式，马克思理论与哲学","高等数学，数据结构"])',
                            Friday:
                                '@pick(["数据集原理,jsp程序设计", "设计模式，马克思理论与哲学","高等数学，数据结构"])',

                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            status: '@pick(["正在进行", "未开始","已结束"])',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            // lastModifiedTime: '@date("yyyy-MM-dd")',
                            // lastChecker: '@cname()',
                            // by: '@pick(["自驾","公交","火车", "飞机"])',
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
                for (let i = 0; i < mockList.list.length; i++) {
                    mockList.list[i].date = arr[i];
                }
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
                dataIndex: 'date',
                title: '时间',
                width: 150,
            },
            {
                dataIndex: 'Monday',
                title: '周一',
                width: 250,
            },
            {
                dataIndex: 'Tuesday',
                title: '周二',
                width: 250,
            },
            {
                dataIndex: 'Wednesday',
                title: '周三',
                width: 250,
                ellipsis: true,
            },
            {
                dataIndex: 'Thursday',
                title: '周四',
                width: 250,
                ellipsis: true,
            },
            {
                dataIndex: 'Friday',
                title: '周五',
                width: 250,
                ellipsis: true,
            },
            {
                dataIndex: 'Saturday',
                title: '周六',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'Sunday',
                title: '周日',
                width: 150,
                ellipsis: true,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '同步',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'more',
                items: [
                    {
                        type: 'a',
                        title: '查看班级课程',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '查看学员宿舍',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '设置班级编码',
                        onClick: () => {
                            /**/
                        },
                    },
                    {
                        type: 'a',
                        title: '设置网上报名注册码',
                        onClick: () => {
                            /**/
                        },
                    },
                ],
            },
        ];

        return {
            columns,
            formInline: {
                name: '',
                user: '',
            },
            i: 0,
            moth: 37,
            startTime: '2021-12-8',
            endTime: '2021-12-15',
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        onPanelChange(value, mode) {
            console.log(value, mode);
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        /**
         * 处理添加场地的事件
         */
        handleAdd() {
            this.editForm.show(EditFormTypeDic.Add, {});
        },
        /**
         * 处理编辑场地的事件
         */
        handleEdit(record) {
            // this.editForm.show(EditFormTypeDic.Modify, record);
        },
        /**
         * 处理删除场地的事件
         */
        handleDel(record) {
            this.loading = true;
            this.api.delById(record.id).finally(() => {
                this.refreshTableData();
            });
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
