<template>
    <base-edit-form
        ref="baseEditForm"
        title="字典"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems.sync="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racDicApi, racSysApi, racDomainApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racDicApi;
        return {
            syss: [],
            editFormType: EditFormTypeDic.None,
            model: {},
            domains: [],
            rules: {
                id: [
                    {
                        required: true,
                        message: '请输入字典ID',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
                name: [
                    {
                        required: true,
                        message: '请输入字典名称',
                        trigger: 'blur',
                        transform: val => val && val.trim(),
                    },
                ],
            },
        };
    },
    mounted() {
        racDomainApi.listAll().then(ro => {
            this.domains = Object.values(ro.extra.list).map(item => {
                return {
                    value: item.id,
                    title: item.name,
                };
            });
            this.$forceUpdate();
        });
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'id', title: '字典ID' },
                { dataIndex: 'name', title: '字典名称' },
                {
                    dataIndex: 'domainId',
                    title: '领域ID',
                    type: 'radioGroup',
                    radios: this.domains,
                },
                {
                    dataIndex: 'sysId',
                    title: '系统ID',
                    type: 'radioGroup',
                    radios: this.syss,
                },
                { dataIndex: 'remark', title: '备注' },
            ];
        },
    },
    watch: {
        model: {
            handler: function(newModel) {
                if (newModel.domainId) {
                    if (newModel.domainId !== this.oldModel.domainId) {
                        this.changeModel(newModel.domainId);
                    }
                }
                this.oldModel = { ...newModel };
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
        changeModel(domainId) {
            console.log('ddd', domainId);
            racSysApi.list({ domainId: domainId }).then(ro => {
                this.syss = Object.values(ro.extra.list).map(item => {
                    return {
                        value: item.id,
                        title: item.name,
                    };
                });
            });
            if (!domainId) {
                this.syss = [];
            }
        },
    },
};
</script>
