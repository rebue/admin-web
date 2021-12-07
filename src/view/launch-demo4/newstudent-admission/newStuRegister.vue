// 新生注册
<template>
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
                >
                    <template #keywordsLeft>
                        <div style="margin-right: 10px">
                            <a-select
                                :default-value="provinceData[0]"
                                style="width: 110px"
                                @change="handleProvinceChange"
                            >
                                <a-select-option v-for="province in provinceData" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </template>
                    <template #left>
                        <div v-show="showOrg" class="table-left">
                            <org-tree
                                ref="orgTree.platform"
                                :show.sync="showOrg"
                                realmId="platform"
                                @click="handleOrgMenuClick"
                                @select="handleOrgTreeSelect"
                            />
                            <div class="table-divider"></div>
                        </div>
                    </template>
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import OrgTree from '@/view/rac/rac-org/Tree';

const provinceData = ['全部', '已注册', '未注册'];
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
        OrgTree,
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
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            'number|1-1000': 1,
                            name: '@cname',
                            admission: '@pick(["录取","未录取"])',
                            turnMajor: '',
                            studentStatus: '@pick("是")',
                            'allAchievement|250-300': 250,
                            stuRegister: '@pick(["是","否"])',
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            shift: '@pick(["党校研究生","中科大研究生"])',
                            'ID|100000000000000000-600000000000000000': 400000000000000000,
                            sex: '@pick(["男","女"])',
                            birthDate: '@date',
                            nativePlace: '@province',
                            culture: '@pick(["本科","专科"])',
                            learnMajor:
                                '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            graduationSchool:
                                '@pick(["广西民族大学","河北师范大学","重庆大学","广西大学","中央党校函授学院","广西师范大学","广西民族大学","天津商业大学","山西财经大学"])',
                            graduationDate: '@date',
                            workDate: '@date',
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
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'grade',
                title: '年级',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'teachPoint',
                title: '教学点',
                ellipsis: true,
                width: 250,
            },
            {
                dataIndex: 'major',
                title: '专业',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'number',
                title: '序号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'admission',
                title: '录取',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'turnMajor',
                title: '转专业',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'studentStatus',
                title: '生成学籍',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'allAchievement',
                title: '总成绩',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'stuRegister',
                title: '考生注册',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'shift',
                title: '班次',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'ID',
                title: '身份证号',
                ellipsis: true,
                width: 250,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'birthDate',
                title: '出生时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'nativePlace',
                title: '籍贯',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'learnMajor',
                title: '所学专业',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'graduationSchool',
                title: '毕业院校',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'graduationDate',
                title: '毕业时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'workDate',
                title: '工作时间',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'operation',
                title: '操作',
                width: 110,
                fixed: 'right',
                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '保存',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '查看转专业',
                onClick: this.handleAdd,
            },
            {
                buttonType: 'primary',
                title: '生成学籍',
                onClick: this.handleAdd,
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '查看',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
        ];

        return {
            columns,
            showOrg: true,
            realm: {
                id: '1',
            },
            provinceData,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrgId = item.id;
            this.$nextTick(() => {
                // this.refreshTableData();
            });
        },
        /** 处理组织树选择节点的事件 */
        handleOrgTreeSelect({ isSelected, item }) {
            this.curOrgId = isSelected ? item.id : undefined;
            // this.$nextTick(this.refreshTableData);
        },
        handleAdd() {
            //
        },
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
