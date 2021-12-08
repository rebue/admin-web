<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-form-model layout="inline" :model="formInline">
                    <a-form-model-item>
                        <span slot="label">
                            教师学员身份组&nbsp;
                            <a-tooltip title="只有该组中的教师才能创建学员">
                                <a-icon type="question-circle-o" />
                            </a-tooltip>
                        </span>
                        <a-select default-value="lucy" style="width: 120px">
                            <a-select-option value="lucy">
                                教师学员身份组
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item>
                        <span slot="label">
                            学员身份最大保持时间&nbsp;
                            <a-tooltip
                                title="教师以该学员身份登录后，到达设置时间后，系统强制学员退出系统并删除学员的评教数据，如果需要，可以再次登录，建议最大持续时间30分钟"
                            >
                                <a-icon type="question-circle-o" />
                            </a-tooltip>
                        </span>
                        <a-input :style="{ width: '50px' }" v-model.trim="formInline.keywords" />
                        分钟
                    </a-form-model-item>
                    <a-form-model-item>
                        <span slot="label">
                            学员默认班级&nbsp;
                            <a-tooltip title="当学员处于非激活状态时所处的班级">
                                <a-icon type="question-circle-o" />
                            </a-tooltip>
                        </span>
                        <a-select default-value="lucy" style="width: 120px">
                            <a-select-option value="lucy">
                                教师学员身份班
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-form-model>

                <crud-table ref="crudTable" :columns="columns" :api="api" :scrollX="600" :defaultPagination="true">
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
                            teacher: '@cname',
                            student: '@cname',
                            creator: '@cname',
                            createdTime: '@date(yyyy-MM-dd)',
                            lastSigninTime: '@date(yyyy-MM-dd hh:mm:ss)',
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
                dataIndex: 'teacher',
                title: '教师用户',
                width: 150,
            },
            {
                dataIndex: 'student',
                title: '学员用户',
                width: 150,
            },
            {
                dataIndex: 'creator',
                title: '创建人',
                width: 150,
            },
            {
                dataIndex: 'createdTime',
                title: '创建时间',
                width: 150,
            },
            {
                dataIndex: 'lastSigninTime',
                title: '最近一次允许登录时间',
                width: 150,
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
        this.crudTable = this.$refs.crudTable;
    },
    methods: {},
};
</script>
