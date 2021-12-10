//员工管理
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-row type="flex">
                        <a-col :span="4" style="overflow: auto">
                            <a-tree :defaultExpandAll="true" :tree-data="treeData" />
                            <div class="table-divider"></div>
                        </a-col>
                        <a-col :span="1">
                            <a-divider type="vertical" style="height: 100%"></a-divider>
                        </a-col>
                        <a-col :span="19">
                            <crud-table
                                :showKeywords="true"
                                ref="crudTable"
                                :commands="tableCommands"
                                :actions="tableActions"
                                :columns="columns"
                                :api="api"
                                :scrollX="600"
                                :defaultPagination="true"
                                :rowSelection="{}"
                            >
                                <template #left>
                                    <div>
                                        <a-modal
                                            width="600px"
                                            title="新增部门"
                                            :visible="visible"
                                            :confirm-loading="confirmLoading"
                                            @ok="handleOk"
                                            @cancel="handleCancel"
                                        >
                                            <a-form-model
                                                :label-col="{ span: 3 }"
                                                :wrapper-col="{ span: 20 }"
                                                layout="horizontal"
                                            >
                                                <a-form-model-item label="部门编号:">
                                                    <a-input placeholder="20314523" disabled="true" />
                                                </a-form-model-item>
                                                <a-form-model-item label="部门编码:">
                                                    <a-input placeholder="请输入部门编码" />
                                                </a-form-model-item>
                                                <a-form-model-item label="部门级别:">
                                                    <a-select
                                                        :default-value="depLevel[3]"
                                                        @change="handleProvinceChange"
                                                    >
                                                        <a-select-option v-for="depLevel in depLevel" :key="depLevel">
                                                            {{ depLevel }}
                                                        </a-select-option>
                                                    </a-select>
                                                </a-form-model-item>
                                                <a-form-model-item label="部门领导:">
                                                    <a-input-search placeholder="请输入部门领导名称" />
                                                </a-form-model-item>
                                                <a-form-model-item label="部门邮箱:">
                                                    <a-input placeholder="请输入部门邮箱" />
                                                </a-form-model-item>
                                                <a-form-model-item label="部门名称:">
                                                    <a-input placeholder="请输入部门名称" />
                                                </a-form-model-item>
                                                <a-form-model-item label="顺序号:">
                                                    <a-input placeholder="请输入顺序号" />
                                                </a-form-model-item>
                                                <a-form-model-item label="上级部门:">
                                                    <a-select
                                                        :default-value="superiorDep[0]"
                                                        @change="handleProvinceChange"
                                                    >
                                                        <a-select-option
                                                            v-for="superiorDep in superiorDep"
                                                            :key="superiorDep"
                                                        >
                                                            {{ superiorDep }}
                                                        </a-select-option>
                                                    </a-select>
                                                </a-form-model-item>
                                                <a-form-model-item label="部门电话:">
                                                    <a-input placeholder="请输入部门电话" />
                                                </a-form-model-item>
                                                <a-form-model-item label="部门活动:">
                                                    <a-select
                                                        :default-value="depActivity[0]"
                                                        @change="handleProvinceChange"
                                                    >
                                                        <a-select-option
                                                            v-for="depActivity in depActivity"
                                                            :key="depActivity"
                                                        >
                                                            {{ depActivity }}
                                                        </a-select-option>
                                                    </a-select>
                                                </a-form-model-item>
                                                <a-form-model-item label="部门职责:">
                                                    <a-textarea
                                                        placeholder="请输入部门职责"
                                                        :auto-size="{ minRows: 2, maxRows: 6 }"
                                                    />
                                                </a-form-model-item>
                                            </a-form-model>
                                        </a-modal>
                                    </div>
                                </template>
                            </crud-table>
                        </a-col>
                    </a-row>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

const depLevel = ['低一级', '低二级', '低三级', '中一级', '中二级', '中三级', '高一级', '高二级', '高三级'];
const superiorDep = ['办公室', '绩效办', '组织部', '研发部'];
const depActivity = ['下午茶', '团建'];

export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
    },
    data() {
        //侧边栏数据
        const treeData = [
            {
                title: '教工部',
                key: 'dxyjs',
                children: [
                    {
                        title: '校(院)领导',
                        key: '101',
                    },
                    {
                        title: '办公室',
                        key: '102',
                    },
                    {
                        title: '组织人事处',
                        key: '103',
                    },
                    {
                        title: '机关党委',
                        key: '104',
                    },
                    {
                        title: '财务处',
                        key: '105',
                    },
                    {
                        title: '资产管理处',
                        key: '106',
                    },
                    {
                        title: '学员工作处',
                        key: '107',
                    },
                ],
            },
            {
                title: '工作处/干部教育学院',
                key: 'zzdyjs',
                children: [
                    {
                        title: '校(院)领导',
                        key: '201',
                    },
                    {
                        title: '办公室',
                        key: '202',
                    },
                    {
                        title: '组织人事处',
                        key: '203',
                    },
                    {
                        title: '机关党委',
                        key: '204',
                    },
                    {
                        title: '财务处',
                        key: '205',
                    },
                    {
                        title: '资产管理处',
                        key: '206',
                    },
                    {
                        title: '学员工作处',
                        key: '207',
                    },
                ],
            },
        ];
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|3-20': [
                        {
                            'id|+1': 10000000,
                            'number|100000-900000': 111111,
                            name: '@cname',
                            account: '@cname',
                            sex: '@pick(["男", "女"])',
                            dep: '离退休人员',
                            birthDate: '@date',
                            workDate: '@date',
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            nativePlace: '@province',
                            culture: '@pick("本科","专科")',
                            graduationSchool:
                                '@pick(["广西民族大学","河北师范大学","重庆大学","广西大学","中央党校函授学院","广西师范大学","广西民族大学","天津商业大学","山西财经大学"])',
                            level:
                                '@pick(["管理岗八级","专技岗十二级","一级科员","其他","管理岗九级","四级主任科员","三级主任科员","四级调研员"])',
                            post:
                                '@pick(["第一书记","干部","科员","教师","人事科科员","党委组织委员","副书记","科长","民政办负责人","副组长"])',
                            titleType: '',
                            titleLevel: '@pick(["初级","中级","高级","其他"])',
                            organization: '',
                            'telephone|1000000-9000000': 2222222,
                            'phone|13000000000-19000000000': 11111111111,
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
                dataIndex: 'number',
                title: '编号',
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'account',
                title: '账号',
                width: 150,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 150,
            },
            {
                dataIndex: 'dep',
                title: '部门',
                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '出生年月',
                width: 150,
            },
            {
                dataIndex: 'workDate',
                title: '工作时间',
                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
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
                dataIndex: 'graduationSchool',
                title: '毕业院校',
                width: 150,
            },
            {
                dataIndex: 'level',
                title: '级别',
                width: 150,
            },
            {
                dataIndex: 'post',
                title: '职务',
                width: 150,
            },
            {
                dataIndex: 'titleType',
                title: '职称种类',
                width: 150,
            },
            {
                dataIndex: 'titleLevel',
                title: '职称级别',
                width: 150,
            },
            {
                dataIndex: 'organization',
                title: '人员编制',
                width: 150,
            },
            {
                dataIndex: 'telephone',
                title: '固定电话',
                width: 150,
            },
            {
                dataIndex: 'phone',
                title: '移动电话',
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
                title: '新增',
                onClick: this.showModal,
            },
            {
                buttonType: 'primary',
                title: '导入',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '导出',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '排序',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '人员模式',
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
            showOrg: true,
            realm: {
                id: '1',
            },
            visible: false,
            confirmLoading: false,
            depLevel,
            superiorDep,
            depActivity,
            treeData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleAdd() {
            //
        },
        // 弹窗打开
        showModal() {
            this.visible = true;
        },
        // 弹窗点击ok
        handleOk(e) {
            this.ModalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                this.confirmLoading = false;
            }, 2000);
        },
        // 弹窗点击取消
        handleCancel(e) {
            console.log('Clicked cancel button');
            this.visible = false;
        },
        // 下拉选项
        handleProvinceChange(value) {
            //
        },
    },
};
</script>
<style lang="less" scoped>
.realm-tabs {
    overflow: visible; /* 否则表格的分页选择框展开时会被遮挡 */
}

.table-left {
    display: flex;
    height: 100%;
    margin: 4px 0;
    .table-divider {
        width: 20px;
        border-left: 1px solid #eee;
        margin-left: 10px;
    }
}
</style>
