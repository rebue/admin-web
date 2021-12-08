<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :query="{ ...formInline }"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                >
                    <template #commands>
                        <a-form-model layout="inline">
                            <a-form-model-item>
                                <a-select default-value="lucy" style="width: 120px" @change="handleTermChange">
                                    <a-select-option value="lucy">
                                        2021年秋季学期
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item>
                                <a-select default-value="lucy" style="width: 120px" @change="handleClassChange">
                                    <a-select-option value="lucy">
                                        全区党校（行政院校）系统师资培训班
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item label="排序">
                                <a-select default-value="lucy" style="width: 120px">
                                    <a-select-option value="lucy">
                                        学号
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item label="方向">
                                <a-select default-value="lucy" style="width: 120px">
                                    <a-select-option value="lucy">
                                        升序
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item>
                                <a-input-search
                                    :style="{ width: '250px' }"
                                    v-model.trim="formInline.keywords"
                                    placeholder="关键字"
                                    @search="() => {}"
                                />
                            </a-form-model-item>
                        </a-form-model>
                        <div class="btn-group">
                            <a-button type="primary" class="btn">批量设置组号</a-button>
                            <a-button type="primary" class="btn">生成excel报表</a-button>
                            <a-button type="primary" class="btn">手动打印报表</a-button>
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
    name: 'Manager',
    components: {
        BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 20 个元素
                    'list|1-20': [
                        {
                            'orgId|+1': 100,
                            level: '@pick(["班长","副班长"])',
                            name: '@cname()',
                            sex: '@pick(["男","女"])',
                            'stunum|+1': 2021100,
                            nation: '@pick(["汉族","壮族","苗族"])',
                            birth: '@date(yyyy-MM)',
                            graduated: '@pick(["大学本科","硕士研究生"])',
                            place: '@city(true)',
                            workTime: '@date(yyyy-MM)',
                            partyTime: '@date(yyyy-MM)',
                            joinTime: '@date(yyyy-MM)',
                            company:
                                '@pick(["中共博白县委员会党校（博白县行政学校）","中共广西柳州钢铁集团有限公司委员会党校"])',
                            worklevel: '@pick(["副校长","培训管理","总务处主任"])',
                            tel: '0779-@integer(10000,99999)',
                            phone: '137@integer(10000000,99999999)',
                            'dormitoryId|+1': 200,
                            'postal-code': '@zip()',
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
                dataIndex: 'orgId',
                title: '所属组号',
                width: 150,
                // scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'level',
                title: '班级职务',
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'stunum',
                title: '学号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'birth',
                title: '出生年月',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'graduated',
                title: '文化程度',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'place',
                title: '籍贯',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'workTime',
                title: '参加工作时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'partyTime',
                title: '入党时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'joinTime',
                title: '任现职时间',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'company',
                title: '工作单位',
                width: 200,
            },
            {
                dataIndex: 'worklevel',
                title: '职务',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'tel',
                title: '电话',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'phone',
                title: '手机',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'dormitoryId',
                title: '宿舍编号',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'postal-code',
                title: '邮政编码',
                width: 150,
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 240,
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '批量设置组号',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '生成excel报表',
                onClick: () => {
                    /**/
                },
            },
            {
                buttonType: 'primary',
                // icon: 'plus',
                title: '手动打印报表',
                onClick: () => {
                    /**/
                },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '小组信息',
                onClick: () => {
                    /**/
                },
            },
            {
                type: 'a',
                title: '编辑',
                onClick: () => {
                    /**/
                },
            },
        ];

        return {
            columns,
            formInline: {
                keywords: '',
            },
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
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
        // 学期下拉菜单
        handleTermChange() {
            //
        },
        // 班级下拉菜单
        handleClassChange() {
            //
        },
    },
};
</script>
<style scoped>
.btn-group {
    margin: 10px 0;
}
.btn {
    margin-right: 10px;
}
</style>
