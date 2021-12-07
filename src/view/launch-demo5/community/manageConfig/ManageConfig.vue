// 管理配置
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="基本配置"></a-tab-pane>
                </a-tabs>
                <a-form-model :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                    <a-form-model-item label="专题组人数上限:">
                        <a-input placeholder="请输入" />
                        <a-icon type="question-circle" />大组最大人数
                    </a-form-model-item>
                    <a-form-model-item label="内分组和限:">
                        <a-input placeholder="请输入" />
                        <div><a-icon type="question-circle" />小组最大人数</div>
                    </a-form-model-item>
                    <a-form-model-item label="内分组规则:">
                        <a-radio-group name="radioGroup" :default-value="1">
                            <a-radio :value="1"> 报名时间 </a-radio>
                            <a-radio :value="2"> 姓名 </a-radio>
                            <a-radio :value="3"> 手动 </a-radio>
                        </a-radio-group>
                        <div><a-icon type="question-circle" />内分组排序规则</div>
                    </a-form-model-item>
                    <a-form-model-item label="报名时间:">
                        <a-range-picker @change="onChange" />
                        <div><a-icon type="question-circle" />设置报名时间范围</div>
                    </a-form-model-item>
                    <a-form-model-item label="审核机制:">
                        <a-radio-group name="radioGroup" :default-value="1">
                            <a-radio :value="1"> 手动 </a-radio>
                            <a-radio :value="2"> 自动 </a-radio>
                        </a-radio-group>
                        <div><a-icon type="question-circle" />报名结束后是否进行审核</div>
                    </a-form-model-item>
                    <a-form-model-item label="取消机制:">
                        <a-radio-group name="radioGroup" :default-value="1">
                            <a-radio :value="1"> 是 </a-radio>
                            <a-radio :value="2"> 否 </a-radio>
                        </a-radio-group>
                        <div><a-icon type="question-circle" />报名成功后是否还可以自行取消报名</div>
                    </a-form-model-item>
                </a-form-model>
                <a-button type="primary" size="large" style="float:right"> 确定 </a-button>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
    },
    data() {
        this.api = racRealmApi;
        return {};
    },
    mounted() {
        //
    },
    methods: {
        //
    },
};
</script>
