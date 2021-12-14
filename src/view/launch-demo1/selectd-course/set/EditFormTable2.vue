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
            <a-form-model-item label="排课编号">
                <a-input v-model="model.date" placeholder="请输入排课编号" />
            </a-form-model-item>
            <a-form-model-item label="学期编号">
                <a-input v-model="model.wubie" placeholder="请输入学期编号" />
            </a-form-model-item>
            <a-form-model-item label="日期">
                <a-date-picker v-model="model.date" style="width: 320px" />
            </a-form-model-item>
            <a-form-model-item label="时间">
                <a-date-picker v-model="model.time" style="width: 320px" />
            </a-form-model-item>
            <a-form-model-item label="课程编号">
                <a-input v-model="model.courseNo" placeholder="请输入课程编号" />
            </a-form-model-item>
            <a-form-model-item label="教师编号">
                <a-input v-model="model.teacherNo" placeholder="请输入教师编号" />
            </a-form-model-item>
            <a-form-model-item label="教师姓名">
                <a-input v-model="model.teacher" placeholder="请输入教师姓名" />
            </a-form-model-item>
            <a-form-model-item label="教室编号">
                <a-input v-model="model.classroomNo" placeholder="请输入教室编号" />
            </a-form-model-item>
            <a-form-model-item label="教室名称">
                <a-input v-model="model.classroom" placeholder="请输入教室名称" />
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
                { dataIndex: 'course', title: '排课编号' },
                { dataIndex: 'term', title: '学期编号' },
                { dataIndex: 'date', title: '日期' },
                { dataIndex: 'time', title: '时间' },
                { dataIndex: 'courseNo', title: '课程编号' },
                { dataIndex: 'teacherNo', title: '教师编号' },
                { dataIndex: 'teacher', title: '教师姓名' },
                { dataIndex: 'classroomNo', title: '教室编号' },
                { dataIndex: 'classroom', title: '教室名称' },
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
