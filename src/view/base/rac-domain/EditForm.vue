<template>
    <base-edit-form :form.sync="form" :rules="rules" :api="api" v-bind="$attrs" v-on="$listeners">
        <a-form-model-item label="编码" prop="id">
            <a-input v-model.trim="form.id" placeholder="请输入领域编码" :disabled="modifyDisabled" />
        </a-form-model-item>
        <a-form-model-item label="名称" prop="name">
            <a-input v-model.trim="form.name" placeholder="请输入领域名称" />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
            <a-input v-model.trim="form.remark" placeholder="请输入领域备注" />
        </a-form-model-item>
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDomainApi } from '@/api/Api';
import RacDomainMo from '@/mo/rac/RacDomainMo';
import BaseEditForm from '@/component/rebue/BaseEditForm';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        return {
            api: racDomainApi,
            form: new RacDomainMo(),
            rules: {
                id: [
                    { required: true, message: '请输入领域编码', trigger: 'blur', transform: val => val && val.trim() },
                ],
                name: [
                    { required: true, message: '请输入领域名称', trigger: 'blur', transform: val => val && val.trim() },
                ],
            },
        };
    },
    computed: {
        modifyDisabled() {
            return this.$attrs.editFormType === EditFormTypeDic.Modify;
        },
    },
};
</script>
