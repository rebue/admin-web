<template>
    <base-manager>
        <template #managerCard>
            <center>
                <a-form-model>
                    <table class="table1">
                        <tr>
                            <td class="td1">月十佳文章学习委员组</td>
                            <td class="td2">
                                <a-select default-value="lucy">
                                    <a-select-option value="lucy">
                                        学习委员组
                                    </a-select-option>
                                </a-select>
                            </td>
                            <td class="td3">评比期确认班级后，把班级中的学习委员自动加入该组</td>
                        </tr>
                        <tr>
                            <td class="td1">月十佳文章评委组</td>
                            <td class="td2">
                                <a-select default-value="lucy">
                                    <a-select-option value="lucy">
                                        评委组
                                    </a-select-option>
                                </a-select>
                            </td>
                            <td class="td3">评比期确认班级后，把班级中的评委自动加入该组</td>
                        </tr>
                        <tr>
                            <td class="td1">查看学员</td>
                            <td class="td2">
                                <a-select default-value="lucy">
                                    <a-select-option value="lucy">
                                        学员组
                                    </a-select-option>
                                </a-select>
                            </td>
                            <td class="td3">进入学习委员或评委功能时，将以该学员身份显示数量</td>
                        </tr>
                        <tr>
                            <td class="td1">系统查看模式</td>
                            <td class="td2">
                                <a-input type="radio" name="type" title=""></a-input>普通模式
                                <a-input type="radio" name="type" title=""></a-input>管理模式
                            </td>
                            <td class="td3">管理员查看时，管理模式无限制，普通模式受系统规则限制</td>
                        </tr>
                    </table>

                    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">
                            提交
                        </a-button>
                    </a-form-model-item>
                </a-form-model>
            </center>
        </template>
    </base-manager>
</template>

<script>
import BaseManager from '../../../component/rebue/BaseManager';
export default {
    name: 'EvaluationConfig',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
    },
};
</script>

<style scoped>
.table1 {
    width: 1000px;
    margin-top: 50px;
}
.table1 td {
    height: 30px;
    border: 1px solid rgba(200, 200, 200, 0.25);
    padding: 4px;
}
.td1 {
    width: 200px;
}
.td2 {
    width: 300px;
}
.td3 {
}
</style>
