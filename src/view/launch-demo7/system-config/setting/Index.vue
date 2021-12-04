<template>
    <div>
        <a-card :bordered="true">
            <a-form-model :model="form" layout="inline">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" tab="人事工作量配置">
                        <a-row>
                            <a-col :span="4">
                                工作量
                            </a-col>
                            <a-col>
                                <a-form-model-item>
                                    <a-input class="inp" v-model="form.total" />
                                </a-form-model-item>
                                人事处设置，天数
                            </a-col>
                        </a-row>
                        <a-divider />
                        <a-row>
                            <a-col :span="4">
                                去年全年教学平均工作量
                            </a-col>
                            <a-col>
                                <a-form-model-item> <a-input class="inp" v-model="form.yearTotal" /> </a-form-model-item
                                >人事处设置
                            </a-col>
                        </a-row>
                    </a-tab-pane>
                </a-tabs>
            </a-form-model>
        </a-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                total: 0,
                yearTotal: 0,
            },
        };
    },
};
</script>

<style lang="less" scoped>
.inp {
    width: 250px;
}
</style>
