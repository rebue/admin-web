// 免试资格审核
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    :showKeywords="true"
                    ref="crudTable"
                    :query="{ orgId: curOrg.id }"
                    :commands="tableCommands"
                    :actions="tableActions"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                >
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
                            teachPoint: '@pick(["中共广西区委党校", "中共广西区政法大学"])',
                            name: '@cname',
                            grade: '@pick(["2021", "2020", "2019", "2018", "2017", "2016"])',
                            'number|1-100': 1,
                            examQualifications: '@pick(["是","否"])',
                            ExemptExamQualifications: '@pick(["已审核","未审核"])',
                            sex: '@pick(["男", "女"])',
                            classes: '@pick(["党校研究生"])',
                            major: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务"])',
                            birthData: '@date',
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            culture: '@pick(["本科","大专"])',
                            'phone|13000000000-19000000000': 13000000000,
                            post:
                                '@pick(["第一书记","干部","科员","教师","人事科科员","党委组织委员","副书记","科长","民政办负责人","副组长"])',
                            postLevel:
                                '@pick(["管理岗八级","专技岗十二级","一级科员","其他","管理岗九级","四级主任科员","三级主任科员","四级调研员"])',
                            title: '@pick(["初级","中级","高级","其他"])',
                            political: '@pick(["中共党员","共青团员","群众"])',
                            partyData: '@date',
                            workCity: '@city',
                            workCompany:
                                '@pick(["那坡县平孟镇人民政府","广西揽胜企业管理服务集团有限公司","横线横州镇人民政府","河池市人民政府办公室","广西来本银海铝业有限责任公司","融安县农业技术推广中心","南宁轨道交通集团有限责任公司","广西大新县就业社保服务中心","崇左市人民政府办公室","柳州东城置地有限公司"])',
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
                dataIndex: 'teachPoint',
                title: '教学点',

                width: 250,
            },
            {
                dataIndex: 'name',
                title: '姓名',
                width: 150,
            },
            {
                dataIndex: 'grade',
                title: '年级',
                width: 150,
            },
            {
                dataIndex: 'number',
                title: '序号',
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
                dataIndex: 'sex',
                title: '性别',
                width: 150,
            },
            {
                dataIndex: 'classes',
                title: '班次',
                width: 150,
            },
            {
                dataIndex: 'major',
                title: '专业',

                width: 150,
            },
            {
                dataIndex: 'birthData',
                title: '出生时间',

                width: 150,
            },
            {
                dataIndex: 'nation',
                title: '民族',
                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',
                width: 150,
            },
            {
                dataIndex: 'phone',
                title: '电话',
                width: 150,
            },
            {
                dataIndex: 'post',
                title: '职务',
                width: 150,
            },
            {
                dataIndex: 'postLevel',
                title: '职级',
                width: 150,
            },
            {
                dataIndex: 'title',
                title: '职称',
                width: 150,
            },
            {
                dataIndex: 'political',
                title: '政治面貌',
                width: 150,
            },
            {
                dataIndex: 'partyData',
                title: '入党时间',

                width: 150,
            },
            {
                dataIndex: 'workCity',
                title: '工作所在城市',
                width: 150,
            },
            {
                dataIndex: 'workCompany',
                title: '工作单位',

                width: 250,
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
                icon: 'plus',
                title: '保存',
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
            showOrg: false,
            curOrg: '',
        };
    },
    mounted() {
        this.crudTable = this.$refs['orgTree.platform'];
    },
    methods: {
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleOrgMenuClick(item) {
            this.curOrg = item;
            this.refreshTableData();
            //
        },
        handleOrgTreeSelect(item) {
            this.curOrg = item;
            //
        },
        handleAdd() {
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
