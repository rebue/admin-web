<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row>
                    <a-col span="5"> </a-col>
                    <a-col span="19">
                        <div>
                            <center>
                                <h1>餐厅顾客意见调查问卷</h1>
                            </center>
                            <p>尊敬的顾客朋友：</p>
                            您好!本餐厅热烈欢迎您的光临，为了向您提供更优质的餐厅服务，不断提高我们餐厅的服务质量和水平，我们特请您填写如下的意见表，
                            请将您的想法、意见告诉我们，让我们做得更好，谢谢您的支持
                            <br />
                            <ol>
                                <li>
                                    <h4>您的职业</h4>
                                    <a-checkbox>
                                        公务员
                                    </a-checkbox>
                                    <a-checkbox>
                                        商务人士
                                    </a-checkbox>
                                    <a-checkbox>
                                        自由人士
                                    </a-checkbox>
                                    <a-checkbox>
                                        公司职员
                                    </a-checkbox>
                                    <br />
                                    <a-checkbox>
                                        私营业主
                                    </a-checkbox>
                                    <a-checkbox>
                                        学生
                                    </a-checkbox>
                                    <a-checkbox>
                                        其他
                                    </a-checkbox>
                                </li>
                                <li>
                                    <h4>您的年龄</h4>
                                    <a-checkbox>
                                        15-25
                                    </a-checkbox>
                                    <a-checkbox>
                                        25-35
                                    </a-checkbox>
                                    <a-checkbox>
                                        35-50
                                    </a-checkbox>
                                    <a-checkbox>
                                        50以上
                                    </a-checkbox>
                                </li>

                                <li>
                                    <h4>您的月收入</h4>
                                    <a-checkbox>
                                        5000以上
                                    </a-checkbox>
                                    <a-checkbox>
                                        3000~5000
                                    </a-checkbox>
                                    <a-checkbox>
                                        2000~3000
                                    </a-checkbox>

                                    <br />
                                    <a-checkbox>
                                        1000~2000
                                    </a-checkbox>
                                </li>
                                <li>
                                    <h4>您是第几次到本餐厅用餐</h4>
                                    <a-checkbox>
                                        第一次
                                    </a-checkbox>
                                    <a-checkbox>
                                        2-5次
                                    </a-checkbox>
                                    <a-checkbox>
                                        6次以上
                                    </a-checkbox>
                                </li>
                                <li>
                                    <h4>您今天到本餐厅用餐的主要讯息来源是</h4>
                                    <a-checkbox>
                                        朋友介绍
                                    </a-checkbox>
                                    <a-checkbox>
                                        报纸广告
                                    </a-checkbox>
                                    <a-checkbox>
                                        杂志广告
                                    </a-checkbox>
                                    <br />
                                    <a-checkbox>
                                        户外广告
                                    </a-checkbox>
                                    <a-checkbox>
                                        网站信息
                                    </a-checkbox>
                                    <a-checkbox>
                                        其他
                                    </a-checkbox>
                                </li>
                                <li>
                                    <h4>您对我们餐厅对服务</h4>
                                    <a-checkbox>
                                        非常满意
                                    </a-checkbox>
                                    <a-checkbox>
                                        满意
                                    </a-checkbox>
                                    <a-checkbox>
                                        一般
                                    </a-checkbox>
                                    <a-checkbox>
                                        不满意
                                    </a-checkbox>
                                </li>
                            </ol>
                        </div>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '../../../../component/rebue/BaseManager';

export default {
    name: 'evaluation-online',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
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
ol {
    margin: 10px 0;
}
ol > li {
    margin-bottom: 20px;
}
</style>
