<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-form-model layout="inline">
                        <a-tabs default-active-key="1">
                            <a-tab-pane key="1" tab="计划总结">
                                <a-divider orientation="left">计划总结时间配置</a-divider>
                                <p>
                                    【功能说明】设置填写，修改工作计划、总结、或评估等相关内容的“超时”限制用户:系统管理员
                                </p>
                                <a-divider />
                                <a-form-model-item label="是否启用时间限制">
                                    <a-radio-group :value="1">
                                        <a-radio :value="1">是</a-radio>
                                        <a-radio :value="2">否</a-radio>
                                    </a-radio-group>
                                </a-form-model-item>
                                <a-divider />
                                <P>一、日报</P>
                                <a-form-model-item label="1、工作总结：本日后的">
                                    <a-input class="inp"></a-input>
                                    天之内依然可以填写或修改（0表示当天必须完成当天的工作总结)
                                </a-form-model-item>
                                <a-divider />
                                <P>一、周报</P>
                                <a-form-model-item label="1、工作总结：本周后的">
                                    <a-input class="inp"></a-input>
                                    天之内依然可以填写或修改（0表示当周必须完成当周的工作总结)
                                </a-form-model-item>
                                <a-divider />
                                <P>一、月报</P>
                                <a-form-model-item label="1、工作总结：本月后的">
                                    <a-input class="inp"></a-input>
                                    天之内依然可以填写或修改（0表示本月内必须写好工作总结)
                                </a-form-model-item>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="共享管理" force-render> </a-tab-pane>
                        </a-tabs>
                    </a-form-model>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
export default {
    name: 'plan-option',
    components: {
        BaseManager,
        // EditForm,
    },
    props: [],
    data() {
        return {
            baseUrl: process.env.BASE_URL,
        };
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {},
    watch: {},
    filters: {},
};
</script>

<style scoped>
.inp {
    width: 80px;
}
</style>
