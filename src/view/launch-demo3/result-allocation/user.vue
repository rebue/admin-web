<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="300"
                :defaultPagination="false"
            >
                <template #commands>
                    <a-row type="flex" style="margin-left: 20px">
                        <a-col>
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-item label="关键字:">
                                    <a-input v-model="formInline.keyword"></a-input>
                                </a-form-item>
                                <a-form-item label="职称:">
                                    <a-select v-model="formInline.user">
                                        <a-select-option value="">
                                            --请选择--
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="权限:">
                                    <a-select v-model="formInline.user">
                                        <a-select-option value="">
                                            --请选择--
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                                <a-form-item label="是否配置:">
                                    <a-select v-model="formInline.user">
                                        <a-select-option value="">
                                            --请选择--
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-form-model>
                        </a-col>
                        <a-col style="margin-left: 20px">
                            <a-button>查询</a-button>
                        </a-col>
                    </a-row>
                </template>
                <template #left>
                    <div v-show="showOrg" class="table-left">
                        <org-tree ref="orgTree.platform" :show.sync="showOrg" realmId="platform" />
                        <div class="table-divider"></div>
                    </div>
                </template>
            </crud-table>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
import baseSearch from '../search/baseSearch';
import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'user',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
        // eslint-disable-next-line no-undef
        OrgTree,
    },
    data() {
        this.api = racRealmApi;

        const columns = [
            {
                dataIndex: 'achievementNo',
                title: '部门',

                fixed: 'left',
            },
            {
                dataIndex: 'memberName',
                title: '姓名',
            },
            {
                dataIndex: 'author',
                title: '职称',
                ellipsis: true,
            },
            {
                dataIndex: 'author',
                title: '学科',
                ellipsis: true,
            },
            {
                dataIndex: 'author',
                title: '专属教师',
                ellipsis: true,
            },
            {
                dataIndex: 'author',
                title: '处室领导',
                ellipsis: true,
            },
            {
                dataIndex: 'author',
                title: '公务员/参公人员',
                ellipsis: true,
            },
            {
                dataIndex: 'author',
                title: '工作任务量',
                ellipsis: true,
            },
            {
                dataIndex: 'action',
                title: '操作',
                fixed: 'right',
                width: '150',
                scopedSlots: { customRender: 'action' },
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

            formInline: {
                user: '',
                password: '',
                name: '',
                achievementName: '',
                startTime: '',
                endTime: '',
                status: '',
                year: '',
            },
            showOrg: false,
            realm: {
                id: 1,
            },
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        search() {
            console.log(this.api);
        },
    },
};
</script>

<style scoped></style>
