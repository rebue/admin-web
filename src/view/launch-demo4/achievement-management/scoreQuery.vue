//成绩查询
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-form-model layout="inline">
                    <a-form-model-item label="研究生类型:">
                        <div>
                            <a-select :default-value="stuType[0]" style="width: 230px" @change="handleProvinceChange">
                                <a-select-option v-for="province in stuType" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item label="年级:" style="margin-left:50px">
                        <div>
                            <a-select :default-value="grade[0]" style="width: 230px" @change="handleProvinceChange">
                                <a-select-option v-for="province in grade" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item label="学期:" style="margin-left:50px">
                        <div>
                            <a-select :default-value="semester[0]" style="width: 230px" @change="handleProvinceChange">
                                <a-select-option v-for="province in semester" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                </a-form-model>
                <a-form-model layout="inline">
                    <a-form-model-item label="专业:" style="margin-left:40px">
                        <div>
                            <a-select :default-value="major[0]" style="width: 230px" @change="handleProvinceChange">
                                <a-select-option v-for="province in major" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item label="班级:" style="margin-left:50px">
                        <div>
                            <a-select :default-value="classes[0]" style="width: 230px" @change="handleProvinceChange">
                                <a-select-option v-for="province in classes" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item label="课程:" style="margin-left:50px">
                        <div>
                            <a-select
                                :default-value="curriculum[0]"
                                style="width: 230px"
                                @change="handleProvinceChange"
                            >
                                <a-select-option v-for="province in curriculum" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                </a-form-model>
                <a-form-model layout="inline">
                    <a-form-model-item label="学号或姓名:">
                        <div>
                            <a-select
                                :default-value="studentName[0]"
                                style="width: 230px"
                                @change="handleProvinceChange"
                            >
                                <a-select-option v-for="province in studentName" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item label="学员类型:" style="margin-left:20px">
                        <div>
                            <a-select
                                :default-value="studentType[0]"
                                style="width: 230px"
                                @change="handleProvinceChange"
                            >
                                <a-select-option v-for="province in studentType" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item label="成绩类型:" style="margin-left:20px">
                        <div>
                            <a-select
                                :default-value="achievementType[0]"
                                style="width: 230px"
                                @change="handleProvinceChange"
                            >
                                <a-select-option v-for="province in achievementType" :key="province">
                                    {{ province }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </a-form-model-item>
                </a-form-model>
                <crud-table
                    ref="crudTable"
                    :columns="columns"
                    :commands="tableCommands"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="true"
                >
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';

const stuType = ['类型1', '类型2', '类型3'];
const grade = ['年级1', '年级2', '年级3'];
const semester = ['第一学期', '第二学期', '第三学期'];
const major = ['专业1', '专业2', '专业3'];
const classes = ['班级1', '班级2', '班级3'];
const curriculum = ['课程1', '课程2', '课程3'];
const studentName = ['姓名1', '姓名2', '姓名3'];
const studentType = ['学员类型1', '学员类型2', '学员类型3'];
const achievementType = ['成绩类型1', '成绩类型2', '成绩类型3'];
export default {
    name: 'signupConf',
    components: {
        BaseManager,
        CrudTable,
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
                            classes: '@pick(["公共管理","政治与法律","计算机应用","软件技术","电子商务","中共党史"])',
                            'homeWork|10-20': 10,
                            'check|7-10': 7,
                            'surface|0-100': 1,
                            'evaluate|0-100': 1,
                            makeScore: '',
                            allMakeScore: '',
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
                dataIndex: 'classes',
                title: '班级',
                width: 150,
            },
            {
                dataIndex: 'homeWork',
                title: '作业',
                width: 150,
            },
            {
                dataIndex: 'check',
                title: '考勤',
                width: 150,
            },
            {
                dataIndex: 'surface',
                title: '卷面',
                width: 150,
            },
            {
                dataIndex: 'evaluate',
                title: '期评',
                width: 150,
            },
            {
                dataIndex: 'makeScore',
                title: '补考分',
                width: 150,
            },
            {
                dataIndex: 'allMakeScore',
                title: '总补考分',
                width: 150,
            },
        ];

        this.tableCommands = [
            {
                buttonType: 'primary',
                title: '提交',
                onClick: this.handleAdd,
            },
        ];
        return {
            columns,
            stuType,
            grade,
            semester,
            major,
            classes,
            curriculum,
            studentName,
            studentType,
            achievementType,
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        handleAdd() {
            //
        },
        handleEdit() {
            //
        },
        handleDel() {
            //
        },
        handleProvinceChange(value) {
            //
        },
    },
};
</script>
