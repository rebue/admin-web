<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="基础配置">
                        <crud-table
                            :api="api"
                            :commands="tableCommands"
                            :actions="tableActions"
                            :columns="columns"
                            :scrollX="600"
                            :rowSelection="{}"
                            :showKeywords="true"
                            :defaultPagination="false"
                        >
                            <template #left>
                                <div v-show="showOrg" style="margin-right: 10px" class="table-left">
                                    <org-tree ref="form.platform" :show.sync="showOrg" realmId="platform" />
                                    <div class="table-divider"></div>
                                </div>
                            </template>
                        </crud-table>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="提醒配置" force-render>
                        <div style="height: 500px;margin-right: 300px;float: right">
                            <a-form-model
                                style="width: 500px"
                                :model="form"
                                :label-col="{ span: 8 }"
                                :wrapper-col="{ span: 8 }"
                            >
                                <a-form-model-item label="默认平台">
                                    <a-select>
                                        <a-select-option value="shanghai">
                                            广西
                                        </a-select-option>
                                        <a-select-option value="beijing">
                                            北京
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item label="账户名">
                                    <a-input></a-input>
                                </a-form-model-item>
                                <a-form-model-item label="发送密码">
                                    <a-input></a-input>
                                </a-form-model-item>
                                <a-form-model-item label="字数限制">
                                    <a-input></a-input>
                                </a-form-model-item>
                                <a-form-model-item label="定时发送">
                                    <a-input></a-input>
                                </a-form-model-item>
                            </a-form-model>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racAccountApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'message-option',
    components: {
        BaseManager,
        CrudTable,
        OrgTree,
    },
    props: [],
    data() {
        this.api = racAccountApi;

        const columns = [
            {
                dataIndex: 'photo',
                title: '头像',
                fixed: 'left',
                width: 100,
            },
            {
                dataIndex: 'name2',
                title: '姓名',
                fixed: 'left',
                width: 100,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 100,
            },
            {
                dataIndex: 'mobile',
                title: '移动电话',
                ellipsis: true,
            },
            {
                dataIndex: 'GdMobile',
                title: '固定电话',
                ellipsis: true,
            },
            {
                dataIndex: 'department',
                title: '部门',
                ellipsis: true,
            },
            {
                dataIndex: 'work',
                title: '职务',
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //     fixed: 'right',
            //     scopedSlots: { customRender: 'action' },
            // },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     icon: 'plus',
            //     title: '新建',
            //     onClick: this.handleAdd,
            // },
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
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            showOrg: false,
            form: '',
        };
    },

    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {},
    watch: {},
    filters: {},
};
</script>

<style scoped></style>
