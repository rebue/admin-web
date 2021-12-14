<template>
    <base-edit-form
        ref="baseEditForm"
        title="选修课"
        :editFormType.sync="editFormType"
        :model.sync="model"
        :formItems="formItems"
        :rules="rules"
        :api="api"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #formItems>
            <a-form-model-item label="课程名称">
                <a-select v-model="model.orign" style="width: 320px">
                    <a-select-option v-for="orign in orign" :key="orign">
                        {{ orign }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="教师名称">
                <a-input v-model="model.date" placeholder="请输入教师名称" />
            </a-form-model-item>
            <a-form-model-item label="选课人数">
                <a-input v-model="model.wubie" placeholder="请输入选课人数" />
            </a-form-model-item>
        </template>
    </base-edit-form>
</template>

<script>
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racRealmApi } from '@/api/Api';
import BaseEditForm from '@/component/rebue/BaseEditForm';

const orign = ['测试课程1', '测试课程2', '测试课程3'];
export default {
    components: {
        BaseEditForm,
    },
    data() {
        // this.api=racRealmApi
        return {
            record: {},
            editFormType: EditFormTypeDic.add,
            model: {},
            orign,
        };
    },
    computed: {
        formItems() {
            return [
                { dataIndex: 'orign', title: '课程名称' },
                { dataIndex: 'date', title: '教师名称' },
                { dataIndex: 'wubie', title: '选课人数' },
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
