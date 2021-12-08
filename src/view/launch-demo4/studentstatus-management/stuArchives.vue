// 学员档案
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
                    :rowSelection="{}"
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
                            'stuNum|1000000000-9999999999': 1111111111,
                            name: '@cname',
                            sex: '@pick(["男","女"])',
                            birthDate: '@date',
                            group: '@cname',
                            classDuties: '',
                            workUnit:
                                '@pick(["那坡县平孟镇人民政府","广西揽胜企业管理服务集团有限公司","横线横州镇人民政府","河池市人民政府办公室","广西来本银海铝业有限责任公司","融安县农业技术推广中心","南宁轨道交通集团有限责任公司","广西大新县就业社保服务中心","崇左市人民政府办公室","柳州东城置地有限公司"])',
                            duties:
                                '@pick(["第一书记","干部","科员","教师","人事科科员","党委组织委员","副书记","科长","民政办负责人","副组长"])',
                            rank:
                                '@pick(["管理岗八级","专技岗十二级","一级科员","其他","管理岗九级","四级主任科员","三级主任科员","四级调研员"])',
                            title: '@pick(["初级","中级","高级","其他"])',
                            'phone|13000000000-19000000000': 13333333333,
                            telephone: '',
                            'zipCode|100000-999999': 111111,
                            workDate: '@date',
                            partyDate: '@date',
                            culture: '@pick(["本科","专科"])',
                            'ID|100000000000000000-600000000000000000': 400000000000000000,
                            nation:
                                '@pick(["汉族", "苗族", "壮族", "回族", "藏族", "白族", "土家族", "黎族", "布依族"])',
                            nativePlace: '@province',
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
                dataIndex: 'stuNum',
                title: '学号',

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
            },
            {
                dataIndex: 'birthDate',
                title: '出生年月',

                width: 150,
            },
            {
                dataIndex: 'group',
                title: '小组',

                width: 150,
            },
            {
                dataIndex: 'classDuties',
                title: '班级职务',

                width: 150,
            },
            {
                dataIndex: 'workUnit',
                title: '工作单位',

                width: 300,
            },
            {
                dataIndex: 'duties',
                title: '职务',

                width: 150,
            },
            {
                dataIndex: 'rank',
                title: '职级',

                width: 150,
            },
            {
                dataIndex: 'title',
                title: '职称',

                width: 150,
            },
            {
                dataIndex: 'phone',
                title: '手机',

                width: 150,
            },
            {
                dataIndex: 'telephone',
                title: '电话',

                width: 150,
            },
            {
                dataIndex: 'zipCode',
                title: '邮编',

                width: 150,
            },
            {
                dataIndex: 'workDate',
                title: '工作时间',

                width: 150,
            },
            {
                dataIndex: 'partyDate',
                title: '入党时间',

                width: 150,
            },
            {
                dataIndex: 'culture',
                title: '文化程度',

                width: 150,
            },
            {
                dataIndex: 'ID',
                title: '身份证号',

                width: 250,
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
                dataIndex: 'operation',
                title: '操作',
                width: 150,
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
                type: 'a',
                title: '查看',
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
