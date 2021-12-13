<template>
    <base-edit-form
        ref="baseEditForm"
        title="数据字典"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #formItems>
            <a-row>
                <a-col :span="24">
                    <a-form-model-item label="数据字典名称">
                        <a-input v-model="model.value1" placeholder="请输入数据字典名称名称" />
                    </a-form-model-item>
                    <a-form-model-item label="数据字典名称编码">
                        <a-input v-model="model.value2" placeholder="请输入数据字典名称编码" />
                    </a-form-model-item>
                    <a-form-model-item label="备注">
                        <a-textarea
                            v-model="model.value4"
                            placeholder="请输入备注"
                            :auto-size="{ minRows: 2, maxRows: 6 }"
                        />
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
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'value1', title: '数据字典名称名称' },
                { dataIndex: 'value2', title: '数据字典名称编码' },
                { dataIndex: 'value4', title: '备注' },
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
