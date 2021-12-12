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
import { racDicApi, racAppApi, racRealmApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm.vue';

export default {
    components: {
        BaseEditForm,
    },
    data() {
        this.api = racDicApi;
        return {
            apps: [],
            editFormType: EditFormTypeDic.None,
            model: {},
            realms: [],
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
    created() {
        this.$nextTick(() => {
            racRealmApi.listAll().then(ro => {
                this.realms = Object.values(ro.extra.list).map(item => {
                    return {
                        value: item.id,
                        title: item.name,
                    };
                });
            });
        });
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
                    dataIndex: 'realmId',
                    title: '领域ID',
                    type: 'radioGroup',
                    radios: this.realms,
                },
                {
                    dataIndex: 'appId',
                    title: '应用ID',
                    type: 'radioGroup',
                    radios: this.apps,
                },
                { dataIndex: 'remark', title: '备注' },
            ];
        },
    },
    watch: {
        model: {
            handler: function(newModel) {
                console.log('--newModel', newModel);
                if (newModel.realmId) {
                    if (newModel.realmId !== this.oldModel.realmId) {
                        this.changeModel(newModel.realmId);
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
            //
        },
        show: function(...params) {
            this.$refs.baseEditForm.show(...params);
        },
        changeModel(realmId) {
            racAppApi.list({ realmId: realmId }).then(ro => {
                this.apps = Object.values(ro.extra.list).map(item => {
                    return {
                        value: item.id,
                        title: item.name,
                    };
                });
            });
            if (!realmId) {
                this.apps = [];
            }
        },
    },
};
</script>
