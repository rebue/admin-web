<template>
    <base-edit-form
        ref="baseEditForm"
        title="组织"
        :width="650"
        :editFormType.sync="editFormType"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <!-- <template #formItems="{model}">
            <a-form-model-item v-show="false" prop="id">
                <a-input v-model.trim="model.id" type="hidden" />
            </a-form-model-item>
            <a-form-model-item v-show="false" prop="domainId">
                <a-input v-model.trim="model.domainId" type="hidden" />
            </a-form-model-item>
            <a-form-model-item label="名称" prop="name">
                <a-input v-model.trim="model.name" :placeholder="'请输入名称'" />
            </a-form-model-item>
            <a-form-model-item label="类型" prop="orgType">
                <a-radio-group :value="model.orgType" button-style="solid" @change="handleOrgTypeChange">
                    <a-radio-button :value="1">
                        集团
                    </a-radio-button>
                    <a-radio-button :value="20">
                        政府单位
                    </a-radio-button>
                    <a-radio-button :value="21">
                        公司
                    </a-radio-button>
                    <a-radio-button :value="80">
                        部门
                    </a-radio-button>
                    <a-radio-button :value="90">
                        小组
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="备注" prop="remark">
                <a-input v-model.trim="model.remark" :placeholder="'请输入备注'" />
            </a-form-model-item>
        </template> -->
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racOrgApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';
import { OrgTypeDic } from '@/dic/OrgTypeDic';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racOrgApi;
        const orgTypes = Object.values(OrgTypeDic)
            .filter(item => !isNaN(item))
            .map(item => {
                return {
                    value: item,
                    title: OrgTypeDic.getName(item),
                };
            });
        return {
            editFormType: EditFormTypeDic.None,
            formItems: [
                { dataIndex: 'id', title: '编码', type: 'hidden' },
                { dataIndex: 'domainId', title: '领域ID', type: 'hidden' },
                { dataIndex: 'name', title: '名称' },
                { dataIndex: 'orgType', title: '类型', type: 'radioGroup', radios: orgTypes },
                { dataIndex: 'remark', title: '备注' },
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入组织名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                orgType: [
                    {
                        required: true,
                        message: '请选择组织类型',
                        trigger: ['change', 'blur'],
                    },
                ],
            },
        };
    },
    mounted() {
        this.baseEditForm = this.$refs.baseEditForm;
    },
    methods: {
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
        handleOrgTypeChange(e) {
            const value = e.target.value;
            // 这里要重新赋值model，否则没有反应
            this.baseEditForm.model = { ...this.baseEditForm.model, orgType: value };
        },
    },
};
</script>
