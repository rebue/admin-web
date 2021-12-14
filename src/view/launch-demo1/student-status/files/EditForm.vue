<template>
    <base-edit-form
        ref="baseEditForm"
        title="学籍档案"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="editFormType == EditFormTypeDic.View ? { footer: null } : {}"
        v-on="$listeners"
    >
        <template #formItems>
            <a-row>
                <a-col :span="12">
                    <a-form-model-item label="数据来源">
                        <a-input v-model="model.source" placeholder="请输入数据来源" />
                    </a-form-model-item>
                    <a-form-model-item label="小组号">
                        <a-input v-model="model.orgId" placeholder="请输入小组号" />
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
                    <a-form-model-item label="出生年月">
                        <a-month-picker v-model="model.birth" :format="dateFormat" />
                    </a-form-model-item>
                    <a-form-model-item label="学号">
                        <a-input v-model="model.stunum" placeholder="请输入学号" />
                    </a-form-model-item>
                    <a-form-model-item label="IC卡号">
                        <a-input v-model="model.ICCard" placeholder="请输入IC卡号" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="车牌号">
                        <a-input v-model="model.carId" placeholder="请输入车牌号" />
                    </a-form-model-item>
                    <a-form-model-item label="证件号">
                        <a-input v-model="model.IdCard" placeholder="请输入证件号" />
                    </a-form-model-item>
                    <a-form-model-item label="班级职务">
                        <a-select v-model="model.level">
                            <a-select-option v-for="(level, index) in level" :key="index">
                                {{ level }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="手机">
                        <a-input v-model="model.phone" placeholder="请输入手机" />
                    </a-form-model-item>
                    <a-form-model-item label="宿舍编号">
                        <a-input v-model="model.dormitoryId" placeholder="请输入证件号" />
                    </a-form-model-item>
                    <a-form-model-item label="班级">
                        <a-select v-model="model.className">
                            <a-select-option v-for="(cla, index) in className" :key="index">
                                {{ cla }}
                            </a-select-option>
                        </a-select>
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

const className = ['县处级领导干部理论研修班（第5期）', '县处级领导干部理论研修班（第14期）'];
const level = ['班长', '学习委员', '副班长', '生活委员'];
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
                source: [
                    {
                        required: true,
                        message: '请输入数据来源',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                orgId: [
                    {
                        required: true,
                        message: '请输入小组号',
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
                birth: [
                    {
                        required: true,
                        message: '请选择出生年月',
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
                ICCard: [
                    {
                        required: true,
                        message: '请输入IC卡号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                carId: [
                    {
                        required: true,
                        message: '请输入车牌号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                IdCard: [
                    {
                        required: true,
                        message: '请输入证件号',
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
                phone: [
                    {
                        required: true,
                        message: '请输入手机号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                dormitoryId: [
                    {
                        required: true,
                        message: '请输入宿舍编号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                className: [
                    {
                        required: true,
                        message: '请选择班级',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            level,
            className,
            api: {},
            dateFormat: 'YYYY-MM',
        };
    },
    computed: {
        formItems() {
            return [
                {
                    dataIndex: 'source',
                    title: '数据来源',
                    disabled: this.editFormType === EditFormTypeDic.Modify,
                },
                { dataIndex: 'orgId', title: '小组号' },
                { dataIndex: 'name', title: '姓名' },
                { dataIndex: 'sex', title: '性别' },
                { dataIndex: 'birth', title: '出生年月' },
                { dataIndex: 'stunum', title: '学号' },
                { dataIndex: 'ICCard', title: 'IC卡号' },
                { dataIndex: 'carId', title: '车牌号' },
                { dataIndex: 'IdCard', title: '证件号' },
                { dataIndex: 'level', title: '班级职务' },
                { dataIndex: 'phone', title: '手机' },
                { dataIndex: 'dormitoryId', title: '宿舍编号' },
                { dataIndex: 'className', title: '班级' },
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
