<template>
    <div>
        <fragment>
            <a-form-model v-bind="formLayout">
                <a-form-model-item label="招生录入功能">
                    <a-radio-group :value="1">
                        <a-radio :value="1">允许</a-radio>
                        <a-radio :value="2">禁止</a-radio>
                    </a-radio-group>
                    <div><a-icon type="question-circle" />设置是否允许教学点录入，修改研究生报名学员</div>
                </a-form-model-item>
                <a-form-model-item label="公布成绩">
                    <a-radio-group :value="1">
                        <a-radio :value="1">公布</a-radio>
                        <a-radio :value="2">不公布</a-radio>
                    </a-radio-group>
                    <div><a-icon type="question-circle" />设置为公布后，教学点在打印管理中可以看到考生成绩报表</div>
                </a-form-model-item>
                <a-form-model-item label="教学点班级管理">
                    <a-radio-group :value="1">
                        <a-radio :value="1">允许</a-radio>
                        <a-radio :value="2">禁止</a-radio>
                    </a-radio-group>
                    <div><a-icon type="question-circle" />允许，教学点可以创建，修改班级数据。否则不可以</div>
                </a-form-model-item>
                <a-form-model-item label="教学点管理考场">
                    <a-radio-group :value="1">
                        <a-radio :value="1">允许</a-radio>
                        <a-radio :value="2">禁止</a-radio>
                    </a-radio-group>
                    <div><a-icon type="question-circle" />允许，教学点可以修改考场数据。否则不可以</div>
                </a-form-model-item>
                <a-form-model-item label="新生注册">
                    <a-radio-group :value="2">
                        <a-radio :value="1">允许</a-radio>
                        <a-radio :value="2">禁止</a-radio>
                    </a-radio-group>
                    <div><a-icon type="question-circle" />允许，教学点可以让考生注册学籍。否则不可以</div>
                </a-form-model-item>
                <a-form-model-item label="新生注册">
                    <a-radio-group :value="1">
                        <a-radio :value="1">启用</a-radio>
                        <a-radio :value="2">不启用</a-radio>
                    </a-radio-group>
                    <div>
                        <a-icon
                            type="question-circle"
                        />编排考场添加学生时启用独占模式，统一时间中只有一个人可以添加考生
                    </div>
                </a-form-model-item>
                <a-form-model-item label="添加考生锁定用户">
                    <a-input style="width: 220px;margin-right:10px" /> <a-button>解锁</a-button>
                    <div><a-icon type="question-circle" />解锁即清除锁定用户，之前的锁定用户将不能再编排考生</div>
                </a-form-model-item>
            </a-form-model>
        </fragment>
    </div>
</template>

<script>
export default {
    name: 'Manager',
    components: {},
    data() {
        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {};
    },
};
</script>
