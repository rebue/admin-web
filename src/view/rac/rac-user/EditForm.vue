<template>
    <base-edit-form
        ref="baseEditForm"
        title="用户"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
    >
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racUserApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';
import { isIdCard, isPhone, isEmail } from '@/util/validator';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racUserApi;
        this.addRules = {
            realName: [
                { required: true, message: '请输入用户名称', trigger: 'blur', transform: val => val && val.trim() },
            ],
            idCard: [
                {
                    required: true,
                    message: '请输入身份证号',
                    trigger: 'blur',
                    transform: val => val && val.trim(),
                },
                {
                    validator: (rule, value, callback) => {
                        if (!isIdCard(value)) {
                            callback(new Error('身份证号不合法'));
                            return false;
                        }
                        callback();
                    },
                },
            ],
            mobile: [
                {
                    validator: (rule, value, callback) => {
                        if (value) {
                            if (!isPhone(value)) {
                                callback(new Error('手机号不合法'));
                                return false;
                            }
                        }
                        callback();
                    },
                },
            ],
            email: [
                {
                    validator: (rule, value, callback) => {
                        if (value) {
                            if (!isEmail(value)) {
                                callback(new Error('电子邮箱不合法'));
                                return false;
                            }
                        }
                        callback();
                    },
                },
            ],
        };
        this.modifyRules = {
            realName: [
                {
                    required: true,
                    message: '请输入',
                    trigger: 'blur',
                    transform: val => val && val.trim(),
                },
            ],
        };
        return {
            editFormType: EditFormTypeDic.None,
            model: {},
            rules: this.addRules,
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'code', title: '用户编码' },
                { dataIndex: 'realName', title: '用户名称' },
                { dataIndex: 'idCard', title: '身份证号' },
                { dataIndex: 'mobile', title: '手机号码' },
                { dataIndex: 'email', title: '电子邮箱' },
            ];
        },
    },
    methods: {
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
        handleShow() {
            console.log('editFormType', this.editFormType);
            // if (this.editFormType === EditFormTypeDic.Modify) {
            //     this.rules = this.modifyRules;
            // } else {
            //     this.rules = this.addRules;
            // }
        },
    },
};
</script>
