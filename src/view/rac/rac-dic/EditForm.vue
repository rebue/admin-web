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
        @show="handleShow"
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
                dicKey: [
                    {
                        required: true,
                        message: '字典Key',
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
        //
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'dicKey', title: '字典Key' },
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
        handleShow() {
            this.domains = [];
            this.syss = [];
            this.$nextTick(() => {
                racDomainApi.listAll().then(ro => {
                    this.domains = Object.values(ro.extra.list).map(item => {
                        return {
                            value: item.id,
                            title: item.name,
                        };
                    });
                });
            });
        },
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
        changeModel(domainId) {
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
