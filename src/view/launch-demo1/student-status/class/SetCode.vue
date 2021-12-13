<template>
    <base-edit-form
        ref="baseEditForm"
        title="网上报名注册码"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #formItems>
            <a-form-model-item label="班级名称">
                <a-input :disabled="true" v-model="model.className" placeholder="请输入班级名称" />
            </a-form-model-item>
            <a-form-model-item label="网上报名注册码">
                <a-input v-model="model.signupCode" placeholder="请输入班级编码" />
            </a-form-model-item>
        </template>
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

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
                signupCode: [
                    {
                        required: true,
                        message: '请输入网上报名注册码',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
            api: {},
        };
    },
    computed: {
        formItems() {
            return [
                {
                    dataIndex: 'className',
                    title: '班级名称',
                    disabled: this.editFormType === EditFormTypeDic.Modify,
                },
                { dataIndex: 'signupCode', title: '网上报名注册码' },
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
