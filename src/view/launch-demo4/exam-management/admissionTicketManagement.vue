// 准考证管理
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <crud-table
                        ref="crudTable"
                        :showKeywords="true"
                        :commands="tableCommands"
                        :actions="tableActions"
                        :columns="columns"
                        :api="api"
                        :scrollX="600"
                        :defaultPagination="true"
                        :rowSelection="{}"
                    >
                        <template #keywordsLeft>
                            <div style="margin-right: 10px">
                                <a-select
                                    :default-value="provinceData[0]"
                                    style="width: 140px"
                                    @change="handleProvinceChange"
                                >
                                    <a-select-option v-for="province in provinceData" :key="province">
                                        {{ province }}
                                    </a-select-option>
                                </a-select>
                            </div>
                        </template>
                    </crud-table>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

const provinceData = ['显示2021年考生', '显示2020年考生', '显示2019年考生'];
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
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            grade: '@pick(["2021"])',
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            'number|1-1000': 1,
                            name: '@cname',
                            examQualifications: '@pick(["是","否"])',
                            ExemptExamQualifications: '@pick(["已审核", "未审核"])',
                            registrationReviewState: '@pick(["通过", "处理中"])',
                            paymentState: '@pick(["已缴费", "未缴费"])',
                            sex: '@pick(["男", "女"])',
                            workCity: '@city',
                            'admissionTicketNum|1000000000-9999999999': 1111111111,
                            examinationRoomSite:
                                '@pick(["中共广西区委党校会议中心报告厅-A区","中共广西区委党校会议中心报告厅-B区","中共广西区委党校会议中心报告厅-C区","中共广西区委党校会议中心报告厅-D区"])',
                            'seatNum|1-35': 30,
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            'ID|100000000000000000-600000000000000000': 400000000000000000,
                            'birthData|+1': [
                                '1998-3-15',
                                '1999-5-23',
                                '1998-7-13',
                                '2000-4-26',
                                '1999-1-05',
                                '1999-7-24',
                                '2000-2-18',
                                '2000-5-02',
                                '1999-8-15',
                                '1999-10-02',
                                '2000-12-15',
                            ],
                            nativePlace: '@province',
                            culture: '@pick(["本科", "大专"])',
                            majorStudied:
                                '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
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
                dataIndex: 'grade',
                title: '年级',
                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                width: 250,
            },
            {
                dataIndex: 'major',
                title: '专业',
                width: 150,
            },
            {
                dataIndex: 'number',
                title: '序号',
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'examQualifications',
                title: '报考资格',
                width: 150,
            },
            {
                dataIndex: 'ExemptExamQualifications',
                title: '免试资格',
                width: 150,
            },
            {
                dataIndex: 'registrationReviewState',
                title: '报名审核状态',
                width: 150,
            },
            {
                dataIndex: 'paymentState',
                title: '缴费情况',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
            },
            {
                dataIndex: 'workCity',
                title: '工作所在城市',
                width: 150,
            },
            {
                dataIndex: 'admissionTicketNum',
                title: '准考证号',
                width: 150,
            },
            {
                dataIndex: 'examinationRoomSite',
                title: '考场地址',
                ellipsis: true,
                width: 300,
            },
            {
                dataIndex: 'seatNum',
                title: '座位号',
                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                width: 150,
            },
            {
                dataIndex: 'ID',
                title: '身份证号',
                width: 250,
            },
            {
                dataIndex: 'birthData',
                title: '出生时间',
                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',
                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',
                width: 150,
            },
            {
                dataIndex: 'majorStudied',
                title: '所学专业',
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '生成准考证号',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '清除准考证号',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '预览准考证',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '同步到报名系统',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '导出',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '打印准考证',
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
                type: 'a',
                title: '查看',
                onClick: record => this.handleEdit(record),
            },
        ];

        return {
            columns,
            provinceData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleAdd() {
            //
        },
        handleEdit() {
            //
        },
        handleDel() {
            //
        },
        handleProvinceChange(value) {
            //
        },
    },
};
</script>
