<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="300"
                :defaultPagination="true"
            >
                <template #commands>
                    <a-row type="flex" style="margin-left: 20px">
                        <a-col>
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-item label="部门名称:">
                                    <a-input v-model="formInline.keyword"></a-input>
                                </a-form-item>
                                <a-form-item label="排序级别:">
                                    <a-input v-model="formInline.keyword"></a-input>
                                </a-form-item>
                            </a-form-model>
                        </a-col>
                        <a-col style="margin-top: 10px">
                            <a-button>查询</a-button>
                            <a-button style="margin-left: 10px">条件清空</a-button>
                            <a-button style="margin-left: 10px">同步数据</a-button>
                        </a-col>
                    </a-row>
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

export default {
    name: 'DepartmentManagement',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
        // eslint-disable-next-line no-undef
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|5-20': [
                        {
                            'id|+1': 10000000,

                            level: '@pick(["一级","二级","三级"])',
                            department:
                                '@pick(["党委办公室、校长办公室",' +
                                '"党委组织部",' +
                                '"党委宣传部",' +
                                '"党委统战部",' +
                                '"学生工作部（处）",' +
                                '"党委教师工作部、人事处",' +
                                '"教务处",' +
                                '"科研处",' +
                                '"财务处",' +
                                '"审计处",' +
                                '"国有资产管理处",' +
                                '"武装部、后勤保卫处",' +
                                '"基建处",' +
                                '"离退休工作处",' +
                                '"纪委办公室、监察室",' +
                                '"工会",' +
                                '"团委",' +
                                '"图书馆",' +
                                '"现代教育技术中心",' +
                                '"学报编辑部",' +
                                '"会计与审计学院",' +
                                '"工商管理学院",' +
                                '"计算机与信息工程学院",' +
                                '"土木建筑工程学院",' +
                                '"经济与贸易学院",' +
                                '"旅游与公共管理学院",' +
                                '"传媒学院",' +
                                '"外国语与国际教育学院",' +
                                '"教育学院",' +
                                '"马克思主义学院",' +
                                '"继续教育学院"])',
                            createTime: '@dateTime',
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
                title: '序号',
                width: 80,

                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'department',
                title: '部门名称',
            },
            {
                dataIndex: 'level',
                title: '部门排序级别',
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
