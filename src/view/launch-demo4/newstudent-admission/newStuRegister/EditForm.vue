<template>
    <base-edit-form
        ref="baseEditForm"
        title=""
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
        width="1000px"
    >
        <template #formItems>
            <a-row>
                <a-col :span="11">
                    <a-form-model-item label="年级">
                        <a-select v-model="model.grade" style="width: 320px">
                            <a-select-option v-for="grade in grade" :key="grade">
                                {{ grade }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="教学点">
                        <a-select v-model="model.teachPoint" style="width: 320px">
                            <a-select-option v-for="teachPoint in teachPoint" :key="teachPoint">
                                {{ teachPoint }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="专业">
                        <a-select v-model="model.major" style="width: 320px">
                            <a-select-option v-for="major in major" :key="major">
                                {{ major }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="序号">
                        <a-input v-model="model.number" placeholder="请输入序号" style="width: 320px" />
                    </a-form-model-item>
                    <a-form-model-item label="姓名">
                        <a-input v-model="model.name" placeholder="请输入姓名" style="width: 320px" />
                    </a-form-model-item>
                    <a-form-model-item label="录取">
                        <a-select v-model="model.admission" style="width: 320px">
                            <a-select-option v-for="admission in admission" :key="admission">
                                {{ admission }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="转专业">
                        <a-select v-model="model.turnMajor" style="width: 320px">
                            <a-select-option v-for="turnMajor in turnMajor" :key="turnMajor">
                                {{ turnMajor }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="生成学籍">
                        <a-select v-model="model.studentStatus" style="width: 320px">
                            <a-select-option v-for="studentStatus in studentStatus" :key="studentStatus">
                                {{ studentStatus }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="总成绩">
                        <a-input v-model="model.allAchievement" placeholder="请输入总成绩" style="width: 320px" />
                    </a-form-model-item>
                    <a-form-model-item label="考生注册">
                        <a-select v-model="model.stuRegister" style="width: 320px">
                            <a-select-option v-for="stuRegister in stuRegister" :key="stuRegister">
                                {{ stuRegister }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="民族">
                        <a-select v-model="model.nation" style="width: 320px">
                            <a-select-option v-for="nation in nation" :key="nation">
                                {{ nation }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :span="13">
                    <a-form-model-item label="班次">
                        <a-select v-model="model.shift" style="width: 320px">
                            <a-select-option v-for="shift in shift" :key="shift">
                                {{ shift }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="身份证号">
                        <a-input v-model="model.ID" placeholder="请输入身份证号" style="width: 320px" />
                    </a-form-model-item>
                    <a-form-model-item label="性别">
                        <a-select v-model="model.sex" style="width: 320px">
                            <a-select-option v-for="sex in sex" :key="sex">
                                {{ sex }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="出生时间">
                        <a-date-picker v-model="model.birthDate" style="width: 320px" />
                    </a-form-model-item>
                    <a-form-model-item label="籍贯">
                        <a-select v-model="model.nativePlace" style="width: 320px">
                            <a-select-option v-for="nativePlace in nativePlace" :key="nativePlace">
                                {{ nativePlace }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="文化程度">
                        <a-select v-model="model.culture" style="width: 320px">
                            <a-select-option v-for="culture in culture" :key="culture">
                                {{ culture }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="所学专业">
                        <a-select v-model="model.learnMajor" style="width: 320px">
                            <a-select-option v-for="learnMajor in learnMajor" :key="learnMajor">
                                {{ learnMajor }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="毕业院校">
                        <a-select v-model="model.graduationSchool" style="width: 320px">
                            <a-select-option v-for="graduationSchool in graduationSchool" :key="graduationSchool">
                                {{ graduationSchool }}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="毕业时间">
                        <a-date-picker v-model="model.graduationDate" style="width: 320px" />
                    </a-form-model-item>
                    <a-form-model-item label="工作时间">
                        <a-date-picker v-model="model.workDate" style="width: 320px" />
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

const grade = ['2021', '2020', '2019', '2018', '2017', '2016', '2015'];
const teachPoint = ['中共广西区委党校', '中共广西政法大学'];
const major = ['电子商务', '公共管理', '计算机应用', '政治与法律', '软件技术', '中共党史'];
const admission = ['录取', '未录取'];
const shift = ['中科大研究生', '党校研究生'];
const sex = ['男', '女'];
const nation = ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '壮族', '布依族', '土家族', '白族', '瑶族'];
const nativePlace = [
    '广西壮族自治区',
    '广东省',
    '上海',
    '湖北省',
    '浙江省',
    '湖南省',
    '江苏省',
    '黑龙江省',
    '陕西省',
    '山西省',
    '吉林省',
];
const culture = ['本科', '专科'];
const learnMajor = [
    '电子商务',
    '政治与法律',
    '软件技术',
    '计算机应用',
    '中共党史',
    '公共管理',
    '马克思主义中国化研究',
    '应用数学',
];
const graduationSchool = [
    '重庆大学',
    '广西民族大学',
    '广西师范大学',
    '河北师范大学',
    '天津商业大学',
    '中央党校函授学院',
    '山西财经大学',
    '广西农业职业技术大学',
];
const turnMajor = ['是', '否'];
const studentStatus = ['是', '否'];
const stuRegister = ['是', '否'];
export default {
    components: {
        BaseEditForm,
    },
    data() {
        // this.api=racRealmApi
        return {
            record: {},
            editFormType: EditFormTypeDic.None,
            model: {},
            rules: {
                teachPointNum: [
                    {
                        required: true,
                        message: '请输入教学点编号',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                majorNum: [
                    { required: true, message: '请输入专业编号', trigger: 'blur', transform: val => val && val.trim() },
                ],
                admissionIndex: [
                    { required: true, message: '请输入录取指标', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
            major,
            grade,
            teachPoint,
            admission,
            turnMajor,
            stuRegister,
            shift,
            sex,
            nation,
            nativePlace,
            culture,
            learnMajor,
            graduationSchool,
            studentStatus,
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'grade', title: '年级' },
                { dataIndex: 'teachPoint', title: '教学点' },
                { dataIndex: 'major', title: '专业' },
                { dataIndex: 'number', title: '序号' },
                { dataIndex: 'name', title: '姓名' },
                { dataIndex: 'admission', title: '录取' },
                { dataIndex: 'turnMajor', title: '转专业' },
                { dataIndex: 'studentStatus', title: '生成学籍' },
                { dataIndex: 'allAchievement', title: '总成绩' },
                { dataIndex: 'stuRegister', title: '考生注册' },
                { dataIndex: 'nation', title: '民族' },
                { dataIndex: 'shift', title: '班次' },
                { dataIndex: 'ID', title: '身份证号' },
                { dataIndex: 'sex', title: '性别' },
                { dataIndex: 'birthDate', title: '出生时间' },
                { dataIndex: 'nativePlace', title: '籍贯' },
                { dataIndex: 'culture', title: '文化程度' },
                { dataIndex: 'learnMajor', title: '所学专业' },
                { dataIndex: 'graduationSchool', title: '毕业院校' },
                { dataIndex: 'graduationDate', title: '毕业时间' },
                { dataIndex: 'workDate', title: '工作时间' },
            ];
        },
    },
    methods: {
        show: function(...params) {
            this.record = { ...params[1] };
            this.$refs.baseEditForm.show(...params);
        },
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
