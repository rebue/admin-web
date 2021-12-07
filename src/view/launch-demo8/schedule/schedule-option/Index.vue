<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-form-model layout="inline">
                        <a-tabs default-active-key="1" type="card">
                            <a-tab-pane key="1" tab="工作时间">
                                <a-divider orientation="left">工作时间配置</a-divider>
                                <a-form-model-item label="工作日">
                                    <a-checkbox>
                                        星期日
                                    </a-checkbox>
                                    <a-checkbox>
                                        星期一
                                    </a-checkbox>
                                    <a-checkbox>
                                        星期二
                                    </a-checkbox>
                                    <a-checkbox>
                                        星期三
                                    </a-checkbox>
                                    <a-checkbox>
                                        星期四
                                    </a-checkbox>
                                    <a-checkbox>
                                        星期五
                                    </a-checkbox>
                                    <a-checkbox>
                                        星期六
                                    </a-checkbox>
                                </a-form-model-item>
                                <a-row>
                                    <a-form-model-item label="开始时间">
                                        <a-time-picker :default-value="moment('08:30', 'HH:mm')" format="HH:mm" />
                                    </a-form-model-item>
                                    <a-form-model-item label="结束时间">
                                        <a-time-picker :default-value="moment('18:30', 'HH:mm')" format="HH:mm" />
                                    </a-form-model-item>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab="时间段设置" force-render>
                                <a-divider orientation="left">时间段设置</a-divider>
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="节假日管理" force-render>
                                <a-divider orientation="left">节假日管理</a-divider>
                            </a-tab-pane>
                            <a-tab-pane key="4" tab="共享管理" force-render>
                                <a-divider orientation="left">共享管理</a-divider>
                            </a-tab-pane>
                            <a-tab-pane key="5" tab="日程共享分组" force-render>
                                <a-divider orientation="left">日程共享分组</a-divider>
                            </a-tab-pane>
                            <a-tab-pane key="6" tab="日程提示" force-render>
                                <a-divider orientation="left">日程提示</a-divider>
                            </a-tab-pane>
                        </a-tabs>
                    </a-form-model>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import moment from 'moment';
export default {
    name: 'schedule-option',
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
    methods: {
        moment,
    },
    watch: {},
    filters: {},
};
</script>

<style scoped>
.inp {
    width: 80px;
}
</style>
