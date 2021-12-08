<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="6">
                        <div v-show="showOrg" style="margin-right: 10px;margin-top: 20px" class="table-left">
                            <org-tree ref="form.platform" :show.sync="showOrg" realmId="platform" />
                            <div class="table-divider"></div>
                        </div>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="17">
                        <a-form-model
                            ref="ruleForm"
                            style="width: 500px"
                            :model="form"
                            :rules="rules"
                            :label-col="{ span: 8 }"
                            :wrapper-col="{ span: 16 }"
                        >
                            <a-form-model-item label="问卷调查模板"> </a-form-model-item>
                            <a-form-model-item ref="name" required label="结构名称">
                                <a-input v-model="form.name" />
                            </a-form-model-item>
                            <a-form-model-item required label="关键字">
                                <a-input v-model="form.keyword"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="结构类型" required prop="">
                                <a-select>
                                    <a-select-option value="问卷">
                                        问卷
                                    </a-select-option>
                                    <a-select-option value="调查">
                                        调查
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                            <a-form-model-item label="结构内容" prop="delivery">
                                <a-textarea> </a-textarea>
                            </a-form-model-item>
                            <a-form-model-item label="解决方法" prop="type">
                                <a-input></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="说明" prop="desc">
                                <a-input v-model="form.desc" type="textarea" />
                            </a-form-model-item>
                            <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                                <!-- <a-button type="primary" @click="onSubmit">
                                Create
                            </a-button>
                            <a-button style="margin-left: 10px;" @click="resetForm">
                                Reset
                            </a-button> -->
                            </a-form-model-item>
                        </a-form-model>
                    </a-col>
                </a-row>
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
    name: 'evaluation-template',
    components: {
        BaseManager,

        OrgTree,
    },
    props: [],
    data() {
        this.api = racAccountApi;

        const columns = [
            {
                dataIndex: 'photo',
                title: '头像',

                width: 100,
            },
            {
                dataIndex: 'name2',
                title: '姓名',

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
            //
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
            form: '',
            showOrg: false,
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
