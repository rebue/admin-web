//场次管理
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
                    :defaultPagination="false"
                    :rowSelection="{}"
                >
                    <template #left>
                        <div>
                            <a-modal
                                width="800px"
                                title="新增场次"
                                :visible="visible"
                                :confirm-loading="confirmLoading"
                                @ok="handleOk"
                                @cancel="handleCancel"
                            >
                                <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                                    <a-form-model-item label="所属学期:">
                                        <a-select
                                            :default-value="provinceData[0]"
                                            style="width: 500px"
                                            @change="handleProvinceChange"
                                        >
                                            <a-select-option v-for="province in provinceData" :key="province">
                                                {{ province }}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                    <a-form-model-item label="场次名称:">
                                        <a-input placeholder="请输入场次名称" />
                                    </a-form-model-item>
                                    <a-form-model-item label="题目名称:">
                                        <a-input placeholder="请输入题目名称" />
                                    </a-form-model-item>
                                    <a-form-model-item label="题目描述:">
                                        <a-textarea
                                            placeholder="请输入题目描述"
                                            :auto-size="{ minRows: 2, maxRows: 6 }"
                                        />
                                    </a-form-model-item>
                                    <a-form-model-item label="场次级别:">
                                        <a-radio-group name="radioGroup" :default-value="1">
                                            <a-radio :value="1"> 小组赛 </a-radio>
                                            <a-radio :value="2"> 半决赛 </a-radio>
                                            <a-radio :value="3"> 总决赛 </a-radio>
                                        </a-radio-group>
                                    </a-form-model-item>
                                    <a-form-model-item label="正方团队:">
                                        <a-select
                                            :default-value="mainTeam[0]"
                                            style="width: 500px"
                                            @change="handleProvinceChange"
                                        >
                                            <a-select-option v-for="mainTeam in mainTeam" :key="mainTeam">
                                                {{ mainTeam }}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                    <a-form-model-item label="反方团队:">
                                        <a-select
                                            :default-value="antiTeam[0]"
                                            style="width: 500px"
                                            @change="handleProvinceChange"
                                        >
                                            <a-select-option v-for="antiTeam in antiTeam" :key="antiTeam">
                                                {{ antiTeam }}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                    <a-form-model-item label="获胜团队:">
                                        <a-select
                                            :default-value="winTeam[0]"
                                            style="width: 500px"
                                            @change="handleProvinceChange"
                                        >
                                            <a-select-option v-for="winTeam in winTeam" :key="winTeam">
                                                {{ winTeam }}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                </a-form-model>
                            </a-modal>
                        </div>
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
import { racRealmApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';

const provinceData = [
    '2021年春季学期',
    '2021年秋季学期',
    '2020年春季学期',
    '2020年秋季学期',
    '2019年春季学期',
    '2019年秋季学期',
];
const mainTeam = ['正方团队一', '正方团队二', '正方团队三', '正方团队四', '正方团队五', '正方团队六'];
const antiTeam = ['反方团队一', '反方团队二', '反方团队三', '反方团队四', '反方团队五', '反方团队六'];
const winTeam = ['获胜团队一', '获胜团队二', '获胜团队三', '获胜团队四', '获胜团队五', '获胜团队六'];
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
        OrgTree,
    },
    data() {
        this.api = racRealmApi;
        const columns = [
            {
                dataIndex: 'no',
                title: '#',
                width: 50,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'state',
                title: '流程状态',
                width: 150,
            },
            {
                dataIndex: 'venueName',
                title: '场次名称',
                width: 150,
            },
            {
                dataIndex: 'titleName',
                title: '题目名称',
                width: 150,
            },
            {
                dataIndex: 'venueLevel',
                title: '场次级别',
                width: 150,
            },
            {
                dataIndex: 'mainTeam',
                title: '正方团队',
                width: 150,
            },
            {
                dataIndex: 'antiTeam',
                title: '反方团队',
                width: 150,
            },
            {
                dataIndex: 'winTeam',
                title: '获胜团队',
                width: 150,
            },
            {
                dataIndex: 'mainvExcellentPlayer',
                title: '正方优秀辩手',
                width: 150,
            },
            {
                dataIndex: 'antiExcellentPlayer',
                title: '反方优秀辩手',
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
                title: '新增',
                onClick: this.showModal,
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
            provinceData,
            mainTeam,
            antiTeam,
            winTeam,
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
