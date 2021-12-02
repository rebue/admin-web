<template>
    <fragment>
        <BaseManager ref="baseManager">
            <template #managerCard>
                <div>
                    <a-form-model>
                        <a-form-model-item label="个人总结" prop="desc">
                            <a-input style="width: 100%;height: 200px" v-model="form.count" type="textarea" />
                        </a-form-model-item>
                        <a-form-model-item label="读书笔记" prop="desc">
                            <a-input style="width: 100%;height: 100px" v-model="form.dus" type="textarea" />
                        </a-form-model-item>
                        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                            <a-button type="primary" @click="onSubmit">
                                提交
                            </a-button>
                            <a-button style="margin-left: 10px;" @click="resetForm">
                                重置
                            </a-button>
                        </a-form-model-item>
                    </a-form-model>
                </div>
            </template>
        </BaseManager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
export default {
    name: 'summary',
    data() {
        return {
            form: {
                count: '本人很懒，莫叫我写总结',
                dus: '本人不写笔记',
            },
        };
    },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
    },
    methods: {
        //提交
        onSubmit() {
            //
        },
        //重置
        resetForm() {
            this.form.count = '';
            this.form.dus = '';
            //
        },
    },
};
</script>

<style scoped></style>
