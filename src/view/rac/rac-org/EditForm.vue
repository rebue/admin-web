<template>
    <base-edit-form ref="baseEditForm" title="组织" :rules="rules" :api="api" v-bind="$attrs" v-on="$listeners">
        <template #formItems="slotProps">
            <a-form-model-item v-show="false" prop="id">
                <a-input v-model.trim="slotProps.model.id" type="hidden" />
            </a-form-model-item>
            <a-form-model-item v-show="false" prop="domainId">
                <a-input v-model.trim="slotProps.model.domainId" type="hidden" />
            </a-form-model-item>
            <a-form-model-item label="名称" prop="name">
                <a-input v-model.trim="slotProps.model.name" :placeholder="'请输入名称'" />
            </a-form-model-item>
            <a-form-model-item label="备注" prop="remark">
                <a-input v-model.trim="slotProps.model.remark" :placeholder="'请输入备注'" />
            </a-form-model-item>
            <a-form-model-item label="类型" prop="orgType">
                <a-radio-group
                    :value="slotProps.model.orgType"
                    @change="e => (slotProps.model.orgType = e.target.value)"
                >
                    <a-radio-button value="1">
                        集团
                    </a-radio-button>
                    <a-radio-button value="20">
                        政府单位
                    </a-radio-button>
                    <a-radio-button value="21">
                        公司
                    </a-radio-button>
                    <a-radio-button value="80">
                        部门
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>
        </template>
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
        return {
            editFormType: EditFormTypeDic.None,
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
                        message: '请输入组织类型',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
        };
    },
    methods: {
        show(editFormType, ...params) {
            this.editFormType = editFormType;
            this.$refs.baseEditForm.show(editFormType, ...params);
        },
        handleOrgTypeChange(val, model) {
            console.log('val', val);
            model.orgType = val;
        },
    },
};
</script>
