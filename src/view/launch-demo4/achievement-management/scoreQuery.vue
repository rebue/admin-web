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
                    :defaultPagination="false"
                >
                </crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { racRealmApi } from '@/api/Api';

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
                dataIndex: 'name',
                title: '学号',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'gradeName',
                title: '姓名',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'remark',
                title: '班级',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'startTime',
                title: '作业',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'endTime',
                title: '考勤',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '卷面',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '期评',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '补考分',
                ellipsis: true,
                width: 150,
            },
            {
                dataIndex: 'desc',
                title: '总补考分',
                ellipsis: true,
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
