<template>
    <base-modal
        :title="fullTitle"
        :loading="loading"
        :visible.sync="visible"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
        :width="1000"
    >
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <slot name="formItems">
                <a-form-model-item key="policyName" label="策略名称" prop="policyName">
                    <a-input v-model.trim="model.policyName" :placeholder="'请输入策略名称'" />
                </a-form-model-item>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item key="sourceName" label="来源" prop="sourceName">
                            <a-input v-model.trim="model.sourceName" :placeholder="'请输入来源名称'" />
                        </a-form-model-item>
                        <a-form-model-item key="sourceSelectVlaue" label="连接器" prop="sourceSelectVlaue">
                            <div class="selectStyle">
                                <a-select v-model="sourceSelectVlaue" placeholder="请选择">
                                    <a-select-option
                                        :value="item.value"
                                        v-for="(item, index) in sourceSelect"
                                        :key="index"
                                        style="width:80px"
                                    >
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                                <span class="clickIcon" @click="addUserClick()"><a-icon type="plus"/></span>
                                <!-- <span class="clickIcon"><a-icon type="minus"/></span> -->
                                <span
                                    class="clickIcon"
                                    @click="editUserClick(sourceSelectVlaue)"
                                    :class="sourceSelectVlaue == undefined ? 'huiclickIcon' : ''"
                                    ><a-icon type="edit"
                                /></span>
                                <a-button type="primary" size="small">链接测试</a-button>
                            </div>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item key="endName" label="目的" prop="endName">
                            <a-input v-model.trim="model.endName" :placeholder="'请输入目的名称'" />
                        </a-form-model-item>
                        <a-form-model-item key="sourceSelectEndVlaue" label="连接器" prop="sourceSelectEndVlaue">
                            <div class="selectStyle">
                                <a-select v-model="sourceSelectEndVlaue" placeholder="请选择">
                                    <a-select-option
                                        :value="item.value"
                                        v-for="(item, index) in sourceendSelect"
                                        :key="index"
                                        style="width:80px"
                                    >
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                                <span class="clickIcon" @click="addUserClick()"><a-icon type="plus"/></span>
                                <!-- <span class="clickIcon"><a-icon type="minus"/></span> -->
                                <span
                                    class="clickIcon"
                                    @click="editUserClick(sourceSelectEndVlaue)"
                                    :class="sourceSelectEndVlaue == undefined ? 'huiclickIcon' : ''"
                                    ><a-icon type="edit"
                                /></span>
                                <a-button type="primary" size="small">链接测试</a-button>
                            </div>
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="选择表" v-for="(item, index) in tableField" :key="index">
                            <div class="startSelect">
                                <a-select v-model="item.startSurface.model" placeholder="请选择表">
                                    <a-select-option
                                        :value="childItem.value"
                                        v-for="(childItem, childIndex) in item.startSurface.selectData"
                                        :key="childIndex"
                                        style="width:80px"
                                    >
                                        {{ childItem.name }}
                                    </a-select-option>
                                </a-select>
                            </div>
                            <div class="endSelect">
                                <a-select
                                    placeholder="请选择关联表字段"
                                    v-for="(childEndItem, childEndIndex) in item.endSurface"
                                    :key="childEndIndex"
                                    v-model="childEndItem.model"
                                    :disabled="item.startSurface.model == undefined ? true : false"
                                >
                                    <a-select-option
                                        :value="childTtem.value"
                                        v-for="(childTtem, childIndex) in childEndItem.selectData"
                                        :key="childIndex"
                                        style="width:80px"
                                    >
                                        {{ childTtem.name }}
                                    </a-select-option>
                                </a-select>
                                <span class="clickIcon" @click="addendSelect(index)"><a-icon type="plus-circle"/></span>
                                <!-- <span class="clickIconminus" @click="minusendSelect(index)"
                                    ><a-icon type="minus-circle"
                                /></span> -->
                            </div>
                            <span class="clickStart" v-show="index == tableField.length - 1" @click="addbiaoSelect()"
                                ><a-icon type="plus-circle"
                            /></span>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="选择表" v-for="(item, index) in tableFieldEnd" :key="index">
                            <div class="startSelect">
                                <a-select v-model="item.startSurface.model" placeholder="请选择表">
                                    <a-select-option
                                        :value="childItem.value"
                                        v-for="(childItem, childIndex) in item.startSurface.selectData"
                                        :key="childIndex"
                                        style="width:80px"
                                    >
                                        {{ childItem.name }}
                                    </a-select-option>
                                </a-select>
                                <!-- <span class="clickStart" @click="addendSelect()"><a-icon type="plus-circle"/></span> -->
                            </div>
                            <div class="endSelect">
                                <a-select
                                    placeholder="请选择关联表字段"
                                    v-for="(childEndItem, childEndIndex) in item.endSurface"
                                    :key="childEndIndex"
                                    v-model="childEndItem.model"
                                    :disabled="item.startSurface.model == undefined ? true : false"
                                >
                                    <a-select-option
                                        :value="childTtem.value"
                                        v-for="(childTtem, childIndex) in childEndItem.selectData"
                                        :key="childIndex"
                                        style="width:80px"
                                    >
                                        {{ childTtem.name }}
                                    </a-select-option>
                                </a-select>
                                <!-- <span class="clickIcon" @click="addendSelect(index)"><a-icon type="plus-circle"/></span> -->
                            </div>
                            <!-- <span class="clickStart" v-show="index == tableFieldEnd.length - 1" @click="addbiaoSelect()"
                                ><a-icon type="plus-circle"
                            /></span> -->
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </slot>
        </a-form-model>
        <a-modal
            title="添加数据库"
            :visible="databaseVisible"
            :confirm-loading="confirmLoading"
            @ok="datahandleOk"
            @cancel="handleCancel"
        >
            <a-form-model ref="dataform" :model="dataModel" :rules="databaseRules" v-bind="formLayout">
                <slot name="formItems">
                    <a-form-model-item
                        v-for="formItem in formDatabase"
                        :key="formItem.dataIndex"
                        :label="formItem.title"
                        :prop="formItem.dataIndex"
                    >
                        <a-input
                            v-model.trim="dataModel[formItem.dataIndex]"
                            :placeholder="'请输入' + formItem.title"
                            :type="formItem.type"
                            :disabled="formItem.disabled"
                        />
                    </a-form-model-item>
                </slot>
            </a-form-model>
        </a-modal>
    </base-modal>
</template>
<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
export default {
    components: {
        BaseModal,
    },
    props: {
        title: {
            type: String,
            default: () => '',
        },
        editFormType: {
            type: String,
            default: () => '',
        },
        model: {
            type: Object,
            required: true,
        },
        formItems: {
            type: Array,
            default: () => [],
        },
        rules: {
            type: Object,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            default: () => {},
        },
        api: {
            type: Object,
            required: true,
        },
    },
    data() {
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {
            loading: true,
            visible: false,
            databaseVisible: false,
            confirmLoading: false,
            linksurface1: '',
            linksurface2: '',
            dataModel: {},
            formDatabase: [
                {
                    dataIndex: 'connectorName',
                    title: '连接器名',
                },
                {
                    dataIndex: 'databaseName',
                    title: '数据库名称',
                },
                {
                    dataIndex: 'databaseType',
                    title: '数据库类型',
                },
                {
                    dataIndex: 'host',
                    title: '主机',
                },
                {
                    dataIndex: 'port',
                    title: '端口',
                },
                {
                    dataIndex: 'user',
                    title: '用户名',
                },
                {
                    dataIndex: 'password',
                    title: '密码',
                },
            ],
            databaseRules: {
                connectorName: [
                    { required: true, message: '请输入连接器名', trigger: 'blur', transform: val => val && val.trim() },
                ],
                databaseName: [
                    {
                        required: true,
                        message: '请输入数据库名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                databaseType: [
                    {
                        required: true,
                        message: '请输入数据库类型',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            sourceSelectVlaue: undefined,
            sourceSelectEndVlaue: undefined,
            sourceSelect: [
                {
                    name: '数据库1',
                    value: '数据库1',
                },
                {
                    name: '数据库2',
                    value: '数据库2',
                },
            ],
            sourceendSelect: [
                {
                    name: '数据库1-1',
                    value: '数据库1-1',
                },
                {
                    name: '数据库2-2',
                    value: '数据库2-2',
                },
            ],
            tableField: [
                {
                    startSurface: {
                        selectData: [
                            {
                                name: 'bigdata',
                                value: 'bigdata',
                            },
                        ],
                    },
                    endSurface: [
                        {
                            selectData: [
                                {
                                    name: 'childbigdata1',
                                    value: 'childbigdata1',
                                },
                            ],
                        },
                    ],
                },
            ],
            tableFieldEnd: [
                {
                    startSurface: {
                        selectData: [
                            {
                                name: 'bigdata',
                                value: 'bigdata',
                            },
                        ],
                    },
                    endSurface: [
                        {
                            selectData: [
                                {
                                    name: 'childbigdata1',
                                    value: 'childbigdata1',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        fullTitle() {
            return (
                EditFormTypeDic.getName(this.editFormType) +
                this.title +
                (this.editFormType === EditFormTypeDic.Modify ? '信息' : '')
            );
        },
        form() {
            return this.$refs.form;
        },
        dataform() {
            return this.$refs.dataform;
        },
    },
    watch: {
        visible(newval, oldval) {
            if (newval) {
                this.tableField = [
                    {
                        startSurface: {
                            selectData: [
                                {
                                    name: 'bigdata',
                                    value: 'bigdata',
                                },
                            ],
                        },
                        endSurface: [
                            {
                                selectData: [
                                    {
                                        name: 'childbigdata1',
                                        value: 'childbigdata1',
                                    },
                                ],
                            },
                        ],
                    },
                ];
                this.tableFieldEnd = [
                    {
                        startSurface: {
                            selectData: [
                                {
                                    name: 'bigdata',
                                    value: 'bigdata',
                                },
                            ],
                        },
                        endSurface: [
                            {
                                selectData: [
                                    {
                                        name: 'childbigdata1',
                                        value: 'childbigdata1',
                                    },
                                ],
                            },
                        ],
                    },
                ];
            }
        },
    },
    methods: {
        addUserClick() {
            this.dataModel = {};
            this.databaseVisible = true;
        },
        editUserClick(editState) {
            if (editState == undefined) {
                return;
            }
            this.dataModel = this.model;
            this.dataModel.connectorName = `${editState}`;
            this.databaseVisible = true;
        },
        handleCancel(e) {
            this.databaseVisible = false;
        },
        show(editFormType, model) {
            this.$emit('update:editFormType', editFormType);
            // 添加时给model初始化属性，否则输入后移开焦点，输入的内容会被清空
            if (editFormType === EditFormTypeDic.Add) {
                for (const formItem of this.formItems) {
                    if (!(formItem.dataIndex in model)) model[formItem.dataIndex] = undefined;
                }
            }
            this.$emit('update:model', model);
            this.visible = true;
        },
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();
                if (this.editFormType === EditFormTypeDic.Modify) {
                    this.api
                        .getById(this.model.id)
                        .then(ro => {
                            this.$emit('update:model', ro.extra.one);
                        })
                        .catch(() => (this.visible = false))
                        .finally(() => {
                            this.loading = false;
                        });
                } else {
                    this.loading = false;
                }
            });
        },
        handleClickRadio(newValue, formItem) {
            if (this.oldValue === newValue) {
                this.$emit('update:model', { ...this.model, [formItem.dataIndex]: '' });
            }
            this.oldValue = newValue;
        },
        handleRadioGroupChanged(e, formItem) {
            this.$emit('update:model', { ...this.model, [formItem.dataIndex]: e.target.value });
            this.oldValue = e.target.value;
        },
        handleOk() {
            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    if (this.editFormType === EditFormTypeDic.Add) {
                        this.api
                            .add(this.model)
                            .then(() => (this.visible = false))
                            .finally(() => (this.loading = false));
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        this.api
                            .modify(this.model)
                            .then(() => (this.visible = false))
                            .finally(() => (this.loading = false));
                    }
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        datahandleOk(e) {
            this.$refs.dataform.validate(valid => {
                if (valid) {
                    this.databaseVisible = false;
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        //添加来源表
        addbiaoSelect() {
            this.tableField.push({
                startSurface: {
                    selectData: [
                        {
                            name: 'bigdata',
                            value: 'bigdata',
                        },
                    ],
                },
                endSurface: [
                    {
                        selectData: [
                            {
                                name: 'childbigdata1',
                                value: 'childbigdata1',
                            },
                        ],
                    },
                ],
            });
            this.tableFieldEnd.push({
                startSurface: {
                    selectData: [
                        {
                            name: 'bigdata',
                            value: 'bigdata',
                        },
                    ],
                },
                endSurface: [
                    {
                        selectData: [
                            {
                                name: 'childbigdata1',
                                value: 'childbigdata1',
                            },
                        ],
                    },
                ],
            });
        },
        //添加来源表的字段
        addendSelect(index) {
            this.tableField[index].endSurface.push({
                selectData: [
                    {
                        name: 'childbigdata2',
                        value: 'childbigdata2',
                    },
                ],
            });
            this.tableFieldEnd[index].endSurface.push({
                selectData: [
                    {
                        name: 'childbigdata2',
                        value: 'childbigdata2',
                    },
                ],
            });
        },
        //添加来源表
        addEndbiaoSelect() {
            this.tableFieldEnd.push({
                startSurface: {
                    selectData: [
                        {
                            name: 'bigdata',
                            value: 'bigdata',
                        },
                    ],
                },
                endSurface: [
                    {
                        selectData: [
                            {
                                name: 'childbigdata1',
                                value: 'childbigdata1',
                            },
                        ],
                    },
                ],
            });
        },
        //添加目的表的字段
        addendSelectB(index) {
            this.tableFieldEnd[index].endSurface.push({
                selectData: [
                    {
                        name: 'childbigdata2',
                        value: 'childbigdata2',
                    },
                ],
            });
        },
    },
};
</script>
<style lang="less" scoped>
.selectStyle {
    position: relative;
    .ant-select {
        width: 45%;
    }
    .clickIcon {
        margin: 0 10px;
        cursor: pointer;
    }
    .huiclickIcon {
        color: #ccc;
    }
}
.startSelect {
    width: 50%;
    float: left;
}
.endSelect {
    width: 48%;
    margin-left: 2%;
    float: right;
    position: relative;
    .clickIcon {
        position: absolute;
        right: -20%;
        cursor: pointer;
    }
    .clickIconminus {
        position: absolute;
        right: -40%;
        cursor: pointer;
    }
}
.clickStart {
    position: relative;
    bottom: 0;
    left: 17%;
}
</style>
