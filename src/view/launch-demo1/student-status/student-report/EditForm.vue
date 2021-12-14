<template>
    <base-edit-form
        ref="baseEditForm"
        title="学员报表"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="editFormType == EditFormTypeDic.View ? { footer: null } : {}"
        v-on="$listeners"
    >
        <template #formItems>
            <a-row class="ro">
                <a-col :span="12">
                    <a-form-model-item label="所属组号">
                        <a-input v-model="model.orgId" placeholder="请输入所属组号" />
                    </a-form-model-item>
                    <a-form-model-item label="班级职务">
                        <a-select v-model="model.level">
                            <a-select-option v-for="(level, index) in level" :key="index">
                                {{ level }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="姓名">
                        <a-input v-model="model.name" placeholder="请输入姓名" />
                    </a-form-model-item>
                    <a-form-model-item label="性别">
                        <a-radio-group :default-value="model.sex">
                            <a-radio :value="'男'">男</a-radio>
                            <a-radio :value="'女'">女</a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-form-model-item label="学号">
                        <a-input v-model="model.stunum" placeholder="请输入学号" />
                    </a-form-model-item>
                    <a-form-model-item label="民族">
                        <a-input v-model="model.nation" placeholder="请输入民族" />
                    </a-form-model-item>
                    <a-form-model-item label="出生年月">
                        <a-month-picker v-model="model.birth" :format="dateFormat" />
                    </a-form-model-item>
                    <a-form-model-item label="文化程度">
                        <a-select v-model="model.graduated">
                            <a-select-option v-for="(gra, index) in graduated" :key="index">
                                {{ gra }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="籍贯">
                        <a-input v-model="model.place" placeholder="请输入籍贯" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="参加工作时间">
                        <a-month-picker v-model="model.workTime" :format="dateFormat" />
                    </a-form-model-item>
                    <a-form-model-item label="入党时间">
                        <a-month-picker v-model="model.partyTime" :format="dateFormat" />
                    </a-form-model-item>
                    <a-form-model-item label="任现职时间">
                        <a-month-picker v-model="model.joinTime" :format="dateFormat" />
                    </a-form-model-item>
                    <a-form-model-item label="工作单位">
                        <a-select class="sele" v-model="model.company">
                            <a-select-option v-for="(com, index) in company" :key="index">
                                {{ com }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="职务">
                        <a-select class="sele" v-model="model.worklevel">
                            <a-select-option v-for="(wor, index) in worklevel" :key="index">
                                {{ wor }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="电话">
                        <a-input v-model="model.tel" placeholder="请输入电话" />
                    </a-form-model-item>
                    <a-form-model-item label="手机">
                        <a-input v-model="model.phone" placeholder="请输入手机" />
                    </a-form-model-item>
                    <a-form-model-item label="宿舍编号">
                        <a-input v-model="model.dormitoryId" placeholder="请输入宿舍编号" />
                    </a-form-model-item>
                    <a-form-model-item label="邮政编码">
                        <a-input v-model="model.postalCode" placeholder="请输入邮政编码" />
                    </a-form-model-item>
                </a-col>
            </a-row>
        </template>
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';
import moment from 'moment';

const graduated = ['大学本科', '硕士研究生'];
const level = ['班长', '学习委员', '副班长', '生活委员'];
const company = ['中共博白县委员会党校（博白县行政学校）', '中共广西柳州钢铁集团有限公司委员会党校'];
const worklevel = ['副校长', '培训管理', '总务处主任'];

export default {
    components: {
        BaseEditForm,
    },
    data() {
        // this.api=racRealmApi
        return {
            record: {},
            editFormType: EditFormTypeDic.None,
            EditFormTypeDic,
            model: {},
            rules: {
                orgId: [
                    {
                        required: true,
                        message: '请输入所属组号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                level: [
                    {
                        required: true,
                        message: '请选择班级职务',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                sex: [
                    {
                        required: true,
                        message: '请选择性别',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                stunum: [
                    {
                        required: true,
                        message: '请输入学号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                nation: [
                    {
                        required: true,
                        message: '请输入民族',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                birth: [
                    {
                        required: true,
                        message: '请选择出生年月',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                graduated: [
                    {
                        required: true,
                        message: '请选择文化程度',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                place: [
                    {
                        required: true,
                        message: '请输入籍贯',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                workTime: [
                    {
                        required: true,
                        message: '请选择参加工作时间',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                partyTime: [
                    {
                        required: true,
                        message: '请选择入党时间',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                joinTime: [
                    {
                        required: true,
                        message: '请选择任现职时间',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                company: [
                    {
                        required: true,
                        message: '请选择工作单位',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                worklevel: [
                    {
                        required: true,
                        message: '请选择职务',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                tel: [
                    {
                        required: true,
                        message: '请输入电话',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                phone: [
                    {
                        required: true,
                        message: '请输入手机',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                postalCode: [
                    {
                        required: true,
                        message: '请输入宿舍编号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            level,
            graduated,
            company,
            worklevel,
            api: {},
            dateFormat: 'YYYY-MM',
        };
    },
    computed: {
        formItems() {
            return [
                {
                    dataIndex: 'orgId',
                    title: '所属组号',
                    disabled: this.editFormType === EditFormTypeDic.Modify,
                },
                { dataIndex: 'level', title: '班级职务' },
                { dataIndex: 'name', title: '姓名' },
                { dataIndex: 'sex', title: '性别' },
                { dataIndex: 'stunum', title: '学号' },
                { dataIndex: 'nation', title: '民族' },
                { dataIndex: 'birth', title: '出生年月' },
                { dataIndex: 'graduated', title: '文化程度' },
                { dataIndex: 'place', title: '籍贯' },
                { dataIndex: 'workTime', title: '参加工作时间' },
                { dataIndex: 'partyTime', title: '入党时间' },
                { dataIndex: 'joinTime', title: '任现职时间' },
                { dataIndex: 'company', title: '工作单位' },
                { dataIndex: 'worklevel', title: '职务' },
                { dataIndex: 'tel', title: '电话' },
                { dataIndex: 'phone', title: '手机' },
                { dataIndex: 'dormitoryId', title: '宿舍编号' },
                { dataIndex: 'postalCode', title: '邮政编码' },
            ];
        },
    },
    methods: {
        show: function(...params) {
            this.record = { ...params[1] };
            this.$refs.baseEditForm.show(...params);
        },
        moment,
    },
    watch: {
        record: {
            handler(val) {
                this.api = {
                    getById(id) {
                        const p = new Promise(resolve => {
                            const ro = {
                                extra: {
                                    one: { ...val },
                                },
                            };
                            console.log('----ro', ro);
                            resolve(ro);
                        });
                        return p;
                    },
                };
            },
        },
    },
};
</script>
