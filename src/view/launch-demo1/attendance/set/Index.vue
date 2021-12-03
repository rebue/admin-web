<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="考勤配置"></a-tab-pane>
                </a-tabs>
                <a-form-model v-bind="formLayout">
                    <a-form-model-item label="待考勤允许比例">
                        <a-input style="width: 200px" value="50%"></a-input>
                        <div>
                            <a-icon
                                type="question-circle"
                            />学员待考勤的课程占学期所有课程的百分比不能超过该值(缺省：50%)，超过后不能再待该学员考勤
                        </div>
                    </a-form-model-item>
                    <a-divider />

                    <a-form-model-item label="考勤方向">
                        <a-radio-group :value="1">
                            <a-radio :value="1">
                                单向
                            </a-radio>
                            <a-radio :value="2">
                                双向
                            </a-radio>
                        </a-radio-group>
                        <div><a-icon type="question-circle" />所谓单项与双向的区别就是用不用考虑早退的情况</div>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="课程默认上下课时间">
                        <a-row>
                            <a-col>
                                上午: 上课时间<a-input style="width: 100px" value="8:30"></a-input> 下课时间<a-input
                                    style="width: 100px"
                                    value="11:00"
                                ></a-input>
                            </a-col>
                            <a-col>
                                下午: 上课时间<a-input style="width: 100px" value="15:00"></a-input> 下课时间<a-input
                                    style="width: 100px"
                                    value="17:30"
                                ></a-input>
                            </a-col>
                            <a-col>
                                晚上: 上课时间<a-input style="width: 100px" value="19:00"></a-input> 下课时间<a-input
                                    style="width: 100px"
                                    value="21:00"
                                ></a-input>
                            </a-col>
                        </a-row>
                        <div>
                            <a-icon
                                type="question-circle"
                            />当课程的上下课时间没有设置时的默认时间（默认情况下课程只设有日期和上下午）
                        </div>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="有效刷卡时间边缘值">
                        上课前（分）<a-input style="width: 100px" value="180"></a-input> 下课后（分）<a-input
                            style="width: 100px"
                            value="30"
                        ></a-input>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="迟到推迟边缘值">
                        上课后（分）<a-input style="width: 100px" value="10"></a-input>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="异常明细判断比例">
                        <a-input style="width: 100px" value="1/2"></a-input>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="刷卡异常缺勤边缘次数">
                        <a-input style="width: 100px" value="10"></a-input>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="是否严格执行选修课考勤">
                        <a-radio-group :value="1">
                            <a-radio :value="1">
                                否
                            </a-radio>
                            <a-radio :value="2">
                                是
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="刷卡记录保留最近月份">
                        <a-input style="width: 100px" value="12"></a-input>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="是否自动删除离校学员考勤明细">
                        <a-radio-group :value="1">
                            <a-radio :value="1">
                                否
                            </a-radio>
                            <a-radio :value="2">
                                是
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="多少分钟后生成报表">
                        <a-input style="width: 100px" value="10"></a-input>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="ZKConsole服务入口">
                        <a-input style="width: 100px" value="10"></a-input>
                        <div><a-icon type="question-circle" />用于和中控考勤机交换的中间件</div>
                    </a-form-model-item>
                </a-form-model>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';

export default {
    name: 'Manager',
    components: {
        BaseManager,
    },
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
