// 比赛配置
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="基本配置"></a-tab-pane>
                </a-tabs>
                <a-form-model :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                    <a-form-model-item label="提醒铃声(wav):">
                        <a-button>试听</a-button>
                        <a-button style="margin-left: 15px; margin-right: 10px">重新上传</a-button>
                        <a-icon type="question-circle" />设置铃声
                    </a-form-model-item>
                    <a-form-model-item label="终止铃声(wav):">
                        <a-button>试听</a-button>
                        <a-button style="margin-left: 15px; margin-right: 10px">重新上传</a-button>
                        <a-icon type="question-circle" />设置铃声
                    </a-form-model-item>
                    <a-form-model-item label="自我介绍时长:">
                        提醒时间点:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 20px" />
                        总时长:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 10px" />
                        <a-icon type="question-circle" />时长配置(以打铃为单位)
                    </a-form-model-item>
                    <a-form-model-item label="开篇立论时长:">
                        提醒时间点:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 20px" />
                        总时长:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 10px" />
                        <a-icon type="question-circle" />时长配置(以打铃为单位)
                    </a-form-model-item>
                    <a-form-model-item label="攻辩阶段时长:">
                        提醒时间点:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 20px" />
                        总时长:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 10px" />
                        <a-icon type="question-circle" />时长配置(以打铃为单位)
                    </a-form-model-item>
                    <a-form-model-item label="攻辩小结时长:">
                        提醒时间点:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 20px" />
                        总时长:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 10px" />
                        <a-icon type="question-circle" />时长配置(以打铃为单位)
                    </a-form-model-item>
                    <a-form-model-item label="自由辩论时长:">
                        提醒时间点:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 20px" />
                        总时长:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 10px" />
                        <a-icon type="question-circle" />时长配置(以打铃为单位)
                    </a-form-model-item>
                    <a-form-model-item label="总结陈词时长:">
                        提醒时间点:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 20px" />
                        总时长:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 10px" />
                        <a-icon type="question-circle" />时长配置(以打铃为单位)
                    </a-form-model-item>
                    <a-form-model-item label="观众互动时长:">
                        提醒时间点:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 20px" />
                        总时长:
                        <a-input placeholder="请输入时间" style="width: 100px; margin-right: 10px" />
                        <a-icon type="question-circle" />时长配置(以打铃为单位)
                    </a-form-model-item>
                    <a-form-model-item label="是否显示姓名:">
                        <a-radio-group name="radioGroup" :default-value="1" style="margin-right:10px">
                            <a-radio :value="1"> 是 </a-radio>
                            <a-radio :value="2"> 否 </a-radio>
                        </a-radio-group>
                        <a-icon type="question-circle" />配置是否要在比赛过程屏幕显示学员资料(如果有的话)
                    </a-form-model-item>
                    <a-form-model-item label="默认评委人数:">
                        <a-input placeholder="请输入人数" style="width: 100px;" />
                        个
                        <a-icon
                            type="question-circle"
                            style="margin-left:10px"
                        />在进行评分环节时方便系统自动进行判断手机评分数(如果你不知道收集多少个评委就不知何时停止收集
                    </a-form-model-item>
                    <a-form-model-item label="去掉最高最低分机制:">
                        <a-radio-group name="radioGroup" :default-value="1" style="margin-right:10px">
                            <a-radio :value="1"> 是 </a-radio>
                            <a-radio :value="2"> 否 </a-radio>
                        </a-radio-group>
                        <a-icon type="question-circle" />在计算平均分时是否去掉最高最低分
                    </a-form-model-item>
                </a-form-model>
                <a-button type="primary" size="large" style="float: right"> 确定 </a-button>
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
