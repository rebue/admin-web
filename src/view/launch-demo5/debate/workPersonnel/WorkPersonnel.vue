//工作人员
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
                                title="新增工作人员"
                                :visible="visible"
                                :confirm-loading="confirmLoading"
                                @ok="handleOk"
                                @cancel="handleCancel"
                            >
                                <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
                                    <a-form-model-item label="所属场次ID:">
                                        <a-select
                                            :default-value="venueId[0]"
                                            style="width: 315px"
                                            @change="handleProvinceChange"
                                        >
                                            <a-select-option v-for="venueId in venueId" :key="venueId">
                                                {{ venueId }}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-model-item>
                                    <a-form-model-item label="工作员姓名:">
                                        <a-input placeholder="请输入工作员姓名" />
                                    </a-form-model-item>
                                    <a-form-model-item label="工作员职称:">
                                        <a-input placeholder="请输入工作员职称" />
                                    </a-form-model-item>
                                    <a-form-model-item label="工作员类型:">
                                        <a-radio-group name="radioGroup" :default-value="1">
                                            <a-radio :value="1"> 评委主任 </a-radio>
                                            <a-radio :value="2"> 评委成员 </a-radio>
                                            <a-radio :value="3"> 主持人 </a-radio>
                                            <a-radio :value="4"> 联络员 </a-radio>
                                            <a-radio :value="5"> 计时员 </a-radio>
                                            <a-radio :value="6"> 其他 </a-radio>
                                        </a-radio-group>
                                    </a-form-model-item>
                                    <a-form-model-item label="显示序号:">
                                        <a-input placeholder="请输入显示序号" />
                                    </a-form-model-item>
                                    <a-form-model-item label="工作员描述:">
                                        <a-textarea
                                            placeholder="请输入工作员描述"
                                            :auto-size="{ minRows: 2, maxRows: 6 }"
                                        />
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

const venueId = ['CFDSA', 'LJYHJ', 'POIUY', 'LMBFC', 'EDFRT', 'CVDFG'];
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
                dataIndex: 'num',
                title: '显示序号',
                width: 150,
            },
            {
                dataIndex: 'name',
                title: '工作员姓名',
                width: 150,
            },
            {
                dataIndex: 'staffTitle',
                title: '工作员职称',
                width: 150,
            },
            {
                dataIndex: 'staffType',
                title: '工作员类型',
                width: 150,
            },
            {
                dataIndex: 'staffDesc',
                title: '工作员描述',
                width: 150,
            },
            {
                dataIndex: 'venueId',
                title: '所属场次ID',
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
            venueId,
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
