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
        <a-form-model ref="form" :model="model" v-bind="formLayout">
            <slot name="formItems">
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item key="name" label="策略名称" prop="name">
                            <a-input v-model.trim="model.name" :placeholder="'请输入策略名称'" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item key="isEnabled" label="启用" prop="isEnabled">
                            <a-switch
                                :checked="model.isEnabled"
                                checkedChildren="启"
                                unCheckedChildren="禁"
                                @click="switchClick()"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item key="srcName" label="来源" prop="srcName">
                            <a-input v-model.trim="model.srcName" :placeholder="'请输入来源名称'" />
                        </a-form-model-item>
                        <a-form-model-item key="srcConnId" label="连接器" prop="srcConnId">
                            <div class="selectStyle">
                                <a-select v-model="sourceSelectVlaue" placeholder="请选择" @change="sourceSelectstart">
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
                                <span
                                    class="clickIcon"
                                    :class="sourceSelectVlaue == undefined ? 'huiclickIcon' : ''"
                                    @click="minusUserClick(sourceSelectVlaue, 'start')"
                                    ><a-icon type="minus"
                                /></span>
                                <span
                                    class="clickIcon"
                                    @click="editUserClick(sourceSelectVlaue)"
                                    :class="sourceSelectVlaue == undefined ? 'huiclickIcon' : ''"
                                    ><a-icon type="edit"
                                /></span>
                                <a-button
                                    type="primary"
                                    size="small"
                                    @click="linkTextClick(sourceSelectVlaue, 'start')"
                                    :disabled="startBtnDisabled"
                                    >链接测试</a-button
                                >
                            </div>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item key="dstName" label="目的" prop="dstName">
                            <a-input v-model.trim="model.dstName" :placeholder="'请输入目的名称'" />
                        </a-form-model-item>
                        <a-form-model-item key="dstConnId" label="连接器" prop="dstConnId">
                            <div class="selectStyle">
                                <a-select v-model="sourceSelectEndVlaue" placeholder="请选择" @change="sourceSelectEnd">
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
                                <span
                                    class="clickIcon"
                                    :class="sourceSelectEndVlaue == undefined ? 'huiclickIcon' : ''"
                                    @click="minusUserClick(sourceSelectEndVlaue, 'end')"
                                    ><a-icon type="minus"
                                /></span>
                                <span
                                    class="clickIcon"
                                    @click="editUserClick(sourceSelectEndVlaue)"
                                    :class="sourceSelectEndVlaue == undefined ? 'huiclickIcon' : ''"
                                    ><a-icon type="edit"
                                /></span>
                                <a-button
                                    type="primary"
                                    size="small"
                                    @click="linkTextClick(sourceSelectEndVlaue, 'end')"
                                    :disabled="endBtnDisabled"
                                    >链接测试</a-button
                                >
                            </div>
                        </a-form-model-item>
                    </a-col>
                </a-row>

                <a-row>
                    <a-col :span="12">
                        <a-form-model-item label="选择表" v-for="(item, index) in tableField" :key="index">
                            <div class="startSelect">
                                <a-select
                                    v-model="item.startSurface.model"
                                    placeholder="请选择表"
                                    :disabled="startDisabled"
                                    @change="startChange"
                                >
                                    <a-select-option
                                        :value="childItem.value"
                                        v-for="(childItem, childIndex) in item.startSurface.selectData"
                                        :key="childIndex"
                                        style="width:100px"
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
                                        style="width:100px"
                                    >
                                        {{ childTtem.name }}
                                    </a-select-option>
                                </a-select>
                                <span class="clickIcon" @click="addendSelect(index, 'start')"
                                    ><a-icon type="plus-circle"
                                /></span>
                                <span class="clickIconminus" @click="minusendSelect(index, 'start')"
                                    ><a-icon type="minus-circle"
                                /></span>
                            </div>
                            <span
                                class="clickStart"
                                v-show="index == tableField.length - 1"
                                @click="addbiaoSelect('start')"
                                ><a-icon type="plus-circle"
                            /></span>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="选择表" v-for="(item, index) in tableFieldEnd" :key="index">
                            <div class="startSelect">
                                <a-select
                                    v-model="item.startSurface.model"
                                    placeholder="请选择表"
                                    :disabled="endDisabled"
                                    @change="endChange"
                                >
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
                                <span class="clickIcon" @click="addendSelect(index, 'end')"
                                    ><a-icon type="plus-circle"
                                /></span>
                                <span class="clickIconminus" @click="minusendSelect(index, 'end')"
                                    ><a-icon type="minus-circle"
                                /></span>
                            </div>
                            <span
                                class="clickStart"
                                v-show="index == tableFieldEnd.length - 1"
                                @click="addbiaoSelect('end')"
                                ><a-icon type="plus-circle"
                            /></span>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </slot>
        </a-form-model>
        <a-modal
            :title="dataBaseTitle + '数据库'"
            :visible="databaseVisible"
            :confirm-loading="confirmLoading"
            @ok="datahandleOk"
            @cancel="handleCancel"
        >
            <a-form-model ref="dataform" :model="dataModel" :rules="databaseRules" v-bind="dataFormLayout">
                <slot name="formItems">
                    <a-form-model-item
                        v-for="formItem in formDatabase"
                        :key="formItem.dataIndex"
                        :label="formItem.title"
                        :prop="formItem.dataIndex"
                    >
                        <a-select
                            v-if="formItem.type == 'select'"
                            placeholder="请选择关联表字段"
                            v-model="dataModel[formItem.dataIndex]"
                        >
                            <a-select-option
                                :value="childTtem.value"
                                v-for="(childTtem, childIndex) in formItem.selectData"
                                :key="childIndex"
                                style="width:80px"
                            >
                                {{ childTtem.name }}
                            </a-select-option>
                        </a-select>
                        <a-input
                            v-else
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
import { etlConnApi, etlStrategyApi } from '@/api/Api';
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
        formItems: {
            type: Array,
            default: () => [],
        },
        defaultPagination: {
            type: [Boolean, Object],
            default: function() {
                return {
                    pageSize: 10,
                    pageSizeOptions: ['5', '10', '20', '30'],
                    showSizeChanger: true,
                };
            },
        },
    },
    data() {
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 17 },
            },
        };
        this.dataFormLayout = {
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
            dataBaseTitle: '添加',
            model: {
                isEnabled: false,
            },
            dataModel: {},
            formDatabase: [
                {
                    dataIndex: 'name',
                    title: '数据库连接器名称',
                },
                {
                    dataIndex: 'dbType',
                    title: '数据库类型',
                    type: 'select',
                    selectData: [
                        {
                            name: 'mysql',
                            value: 0,
                        },
                        {
                            name: 'oracle',
                            value: 1,
                        },
                    ],
                },
                {
                    dataIndex: 'dbName',
                    title: '数据库名称',
                },
                {
                    dataIndex: 'host',
                    title: '主机名称',
                },
                {
                    dataIndex: 'port',
                    title: '端口号',
                },
                {
                    dataIndex: 'userName',
                    title: '用户名称',
                },
                {
                    dataIndex: 'userPswd',
                    title: '用户密码',
                },
                {
                    dataIndex: 'remark',
                    title: '源备注',
                },
            ],
            databaseRules: {
                name: [
                    {
                        required: true,
                        message: '请输入数据库连接器名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                dbName: [
                    {
                        required: true,
                        message: '请输入数据库名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                dbType: [
                    {
                        required: true,
                        message: '请输入数据库类型',
                        trigger: ['change', 'blur'],
                    },
                ],
                host: [
                    {
                        required: true,
                        message: '请输入主机名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                port: [
                    {
                        required: true,
                        message: '请输入端口号',
                        trigger: 'blur',
                    },
                ],
                userName: [
                    {
                        required: true,
                        message: '请输入用户名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                userPswd: [
                    {
                        required: true,
                        message: '请输入用户密码',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            sourceSelectVlaue: undefined,
            sourceSelectEndVlaue: undefined,
            startDisabled: true,
            endDisabled: true,
            startBtnDisabled: true,
            endBtnDisabled: true,
            startSql: '',
            sourceSelect: [],
            tableField: [],
            tableFieldEnd: [],
            startTableNmae: [],
            endTableNmae: [],
            startColumusName: [],
            endColumusName: [],
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
    methods: {
        //是否启用
        switchClick() {
            if (this.model.isEnabled == true) {
                this.model.isEnabled = false;
            } else {
                this.model.isEnabled = true;
            }
        },
        //点击添加数据库弹窗
        addUserClick() {
            this.dataBaseTitle = '添加';
            this.dataModel = {};
            this.databaseVisible = true;
        },
        //删除指定数据库
        minusUserClick(id) {
            etlConnApi.getdeleteConn(id).then(() => {
                this.getSeePageFun();
                if (this.sourceSelectVlaue == id) {
                    this.sourceSelectVlaue = undefined;
                }
                if (this.sourceSelectEndVlaue == id) {
                    this.sourceSelectEndVlaue = undefined;
                }
            });
        },
        //来源表数据下拉框
        sourceSelectstart(e) {
            this.startBtnDisabled = false;
            this.sourceSelectVlaue = e;
            this.model.srcConnId = e;
        },
        //目的表数据下拉框
        sourceSelectEnd(e) {
            this.endBtnDisabled = false;
            this.sourceSelectEndVlaue = e;
            this.model.dstConnId = e;
        },
        //编辑数据库信息
        editUserClick(editState) {
            if (editState == undefined) {
                return;
            }
            this.dataBaseTitle = '编辑';
            this.sourceSelect.map(item => {
                if (item.id == editState) {
                    this.dataModel = item;
                }
            });
            this.databaseVisible = true;
        },
        //关闭数据库弹窗
        handleCancel() {
            this.databaseVisible = false;
        },
        show(editFormType, model) {
            this.$emit('update:editFormType', editFormType);
            this.model.id = model.id;
            // 添加时给model初始化属性，否则输入后移开焦点，输入的内容会被清空
            if (editFormType === EditFormTypeDic.Add) {
                this.model = {
                    isEnabled: false,
                };
                this.sourceSelectVlaue = undefined;
                this.sourceSelectEndVlaue = undefined;
                this.tableField = [
                    {
                        startSurface: {
                            selectData: [
                                {
                                    name: '',
                                    value: '',
                                },
                            ],
                        },
                        endSurface: [
                            {
                                selectData: [
                                    {
                                        name: '',
                                        value: '',
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
                                    name: '',
                                    value: '',
                                },
                            ],
                        },
                        endSurface: [
                            {
                                selectData: [
                                    {
                                        name: '',
                                        value: '',
                                    },
                                ],
                            },
                        ],
                    },
                ];
            }
            this.visible = true;
        },
        handleShow() {
            this.$nextTick(() => {
                this.loading = true;
                this.$refs.form.resetFields();
                this.getSeePageFun();
                if (this.editFormType === EditFormTypeDic.Modify) {
                    etlStrategyApi
                        .getById(this.model.id)
                        .then(ro => {
                            this.model = ro.extra.one;
                            this.sourceSelectVlaue = ro.extra.one.srcConnId;
                            this.sourceSelectEndVlaue = ro.extra.one.dstConnId;
                            this.tableField = ro.extra.one.srcTableArray;
                            this.tableFieldEnd = ro.extra.one.dstTableArray;
                            this.startDisabled = false;
                            this.endDisabled = false;
                            this.startBtnDisabled = false;
                            this.endBtnDisabled = false;
                            this.getSrcTableName(ro.extra.one.srcConnId, 'start');
                            this.getSrcTableName(ro.extra.one.dstConnId, 'end');
                            this.getColumuscName(ro.extra.one.srcConnId);
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
        //回显获取表下拉框数据接口
        getSrcTableName(id, type) {
            etlConnApi.getTableNameById(id).then(ro => {
                const selectDatas = [];
                ro.extra.list.map(item => {
                    selectDatas.push({
                        name: item,
                        value: item,
                    });
                });
                const newArrayName = type == 'start' ? this.tableField : this.tableFieldEnd;
                newArrayName.map(item => {
                    item.startSurface.selectData = selectDatas;
                });
            });
        },
        //回显获取表的字段下拉框数据接口
        getColumuscName(id) {
            this.tableField.map((item, index) => {
                etlConnApi.getColumusNameById(id, item.startSurface.model).then(ro => {
                    const selectDatas = [];
                    ro.extra.list.map(item => {
                        selectDatas.push({
                            name: item,
                            value: item,
                        });
                    });
                });
            });
        },
        //点击提交
        handleOk() {
            this.loading = true;
            this.model.srcTableNames = {};
            this.model.dstTableNames = {};
            this.model.srcDstMap = {};
            this.tableField.map(item => {
                this.model.srcTableNames[item.startSurface.model] = [];
                this.model.srcDstMap[item.startSurface.model] = '';
                item.endSurface.map(childItem => {
                    this.model.srcTableNames[item.startSurface.model].push(childItem.model);
                });
            });
            this.tableFieldEnd.map((item, index) => {
                this.model.dstTableNames[item.startSurface.model] = [];
                this.model.srcDstMap[this.tableField[index].startSurface.model] = item.startSurface.model;
                item.endSurface.map(childItem => {
                    this.model.dstTableNames[item.startSurface.model].push(childItem.model);
                });
            });
            if (this.editFormType === EditFormTypeDic.Add) {
                this.model.srcTableNames = JSON.stringify(this.model.srcTableNames);
                this.model.dstTableNames = JSON.stringify(this.model.dstTableNames);
                this.model.srcDstMap = JSON.stringify(this.model.srcDstMap);
                etlStrategyApi
                    .add(this.model)
                    .then(() => (this.visible = false))
                    .finally(() => (this.loading = false));
            } else if (this.editFormType === EditFormTypeDic.Modify) {
                etlStrategyApi
                    .modify(this.model)
                    .then(() => (this.visible = false))
                    .finally(() => (this.loading = false));
            }
        },
        //点击添加数据库
        datahandleOk(e) {
            this.$refs.dataform.validate(valid => {
                if (valid) {
                    if (this.dataBaseTitle == '添加') {
                        etlConnApi
                            .getAddConn(this.dataModel)
                            .then(() => {
                                this.getSeePageFun();
                                this.databaseVisible = false;
                            })
                            .finally(() => (this.loading = false));
                    } else {
                        etlConnApi
                            .modify(this.dataModel)
                            .then(() => {
                                this.getSeePageFun();
                                this.databaseVisible = false;
                            })
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
        //数据库连接器信息
        getSeePageFun() {
            etlConnApi.list().then(ro => {
                const pageData = ro.extra.list;
                pageData.map(item => {
                    (item.name = item.dbName), (item.value = item.id);
                });
                this.sourceSelect = pageData;
            });
        },
        //点击链接测试按钮
        linkTextClick(id, type) {
            etlConnApi.getTestConnectionById(id).then(ro => {
                if (ro.extra.value) {
                    this.startSql = id;
                    etlConnApi.getTableNameById(id).then(res => {
                        const data = res.extra.list,
                            newData = [];
                        data.map(item => {
                            newData.push({
                                name: item,
                                value: item,
                            });
                        });
                        if (type == 'start') {
                            this.startTableNmae = newData;
                            this.tableField = [
                                {
                                    startSurface: {
                                        model: undefined,
                                        selectData: newData,
                                    },
                                    endSurface: [
                                        {
                                            model: undefined,
                                            selectData: [
                                                {
                                                    name: '',
                                                    value: '',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ];
                            this.startDisabled = false;
                            this.$message.success('链接成功');
                        } else if (type == 'end') {
                            this.endTableNmae = newData;
                            this.tableFieldEnd = [
                                {
                                    startSurface: {
                                        model: undefined,
                                        selectData: newData,
                                    },
                                    endSurface: [
                                        {
                                            model: undefined,
                                            selectData: [
                                                {
                                                    name: '',
                                                    value: '',
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ];
                            this.endDisabled = false;
                            this.$message.success('链接成功');
                        }
                    });
                }
            });
        },
        //来源表获取字段接口
        startChange(e) {
            etlConnApi.getColumusNameById(this.startSql, e).then(ro => {
                const data = ro.extra.list,
                    newData = [];
                data.map(item => {
                    newData.push({
                        name: item,
                        value: item,
                    });
                });
                this.startColumusName = newData;
                if (this.tableField.length == 1) {
                    this.tableField[0].endSurface[0].selectData = newData;
                    this.tableField[0].endSurface[0].model = undefined;
                }
            });
        },
        //目的表获取字段接口
        endChange(e) {
            etlConnApi.getColumusNameById(this.startSql, e).then(ro => {
                const data = ro.extra.list,
                    newData = [];
                data.map(item => {
                    newData.push({
                        name: item,
                        value: item,
                    });
                });
                this.endColumusName = newData;
                if (this.tableFieldEnd.length == 1) {
                    this.tableFieldEnd[0].endSurface[0].selectData = newData;
                    this.tableFieldEnd[0].endSurface[0].model = undefined;
                }
            });
        },
        //添加来源表
        addbiaoSelect(type) {
            if (type == 'start') {
                this.tableField.push({
                    startSurface: {
                        model: undefined,
                        selectData: this.startTableNmae,
                    },
                    endSurface: [
                        {
                            model: undefined,
                            selectData: this.startColumusName,
                        },
                    ],
                });
            } else {
                this.tableFieldEnd.push({
                    startSurface: {
                        model: undefined,
                        selectData: this.endTableNmae,
                    },
                    endSurface: [
                        {
                            model: undefined,
                            selectData: this.endColumusName,
                        },
                    ],
                });
            }
        },
        //添加来源表的字段
        addendSelect(index, type) {
            if (type == 'start') {
                this.tableField[index].endSurface.push({
                    selectData: this.startColumusName,
                });
            } else {
                this.tableFieldEnd[index].endSurface.push({
                    selectData: this.endColumusName,
                });
            }
        },
        //删除字段
        minusendSelect(index, type) {
            if (type == 'start') {
                if (index != 0 && this.tableField[index].endSurface.length == 1) {
                    this.tableField.splice(index, 1);
                    return;
                }
                this.tableField[index].endSurface.pop();
            } else {
                if (index != 0 && this.tableFieldEnd[index].endSurface.length == 1) {
                    this.tableFieldEnd.splice(index, 1);
                    return;
                }
                this.tableFieldEnd[index].endSurface.pop();
            }
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
        margin: 0 4px;
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
        right: 45%;
        bottom: -30px;
        cursor: pointer;
    }
    .clickIconminus {
        position: absolute;
        right: -20%;
        cursor: pointer;
    }
}
.clickStart {
    position: relative;
    bottom: 9px;
    left: 17%;
}
</style>
