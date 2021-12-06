<template>
    <div class="w100 pt20 pb20 pl20 pr20 bg-w radius-4 card-shadow">
        <a-form-model :model="form" :rules="rules" :label-col="{ span: 3 }" :wrapper-col="{ span: 9 }">
            <a-form-model-item label="编号">
                <a-input v-model="form.id" disabled />
            </a-form-model-item>
            <a-form-model-item label="建议办结时间">
                <a-input v-model="form.endDate" />
            </a-form-model-item>
            <a-form-model-item label="来文时间">
                <a-input v-model="form.fromDate" disabled />
            </a-form-model-item>
            <a-form-model-item label="来文处室（单位）">
                <a-input v-model="form.fromDept" disabled />
            </a-form-model-item>
            <a-form-model-item label="稿件作者" prop="fromName">
                <a-input v-model="form.fromName" />
            </a-form-model-item>
            <a-form-model-item label="标题" prop="title" :wrapper-col="{ span: 20 }">
                <a-input v-model="form.title" />
            </a-form-model-item>
            <a-form-model-item label="正文" required :wrapper-col="{ span: 20 }">
                <span class="ml10 font-16 blue cu-p">新建</span>
                <span class="ml10 font-16 blue cu-p">上传</span>
                <span class="ml10 font-16 blue cu-p">引用</span>
                <span class="ml10 font-16 blue cu-p">阅读</span>
                <span class="ml10 font-16 blue cu-p">编辑</span>
                <span class="ml10 font-16 blue cu-p">下载</span>
                <span class="ml10 font-16 blue cu-p">删除</span>
            </a-form-model-item>
            <a-form-model-item label="相关附件" :wrapper-col="{ span: 20 }">
                <span class="ml10 font-16 blue cu-p">上传</span>
                <span class="ml10 font-16 blue cu-p">引用</span>
                <span class="ml10 font-16 blue cu-p">下载所有</span>
            </a-form-model-item>
            <a-form-model-item :wrapper-col="{ offset: 3 }">
                <a-button class="mr10" type="primary">保 存</a-button>
                <a-button class="mr10" type="primary">发 送</a-button>
                <a-button class="mr10" type="primary">返 回</a-button>
                <a-button class="mr10" type="primary">知 会</a-button>
                <a-button class="mr10" type="primary">退 回</a-button>
                <a-button class="mr10" type="primary">终 止</a-button>
                <a-button class="mr10" type="primary">删 除</a-button>
                <!-- <a-button class="ml10">重 置</a-button> -->
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
export default {
    name: 'detail-process',
    components: {},
    props: [],
    data() {
        return {
            baseUrl: process.env.BASE_URL,
            form: {
                id: '',
                endDate: '',
                fromDate: '',
                fromDept: '系统研发维护组',
                fromName: '',
                title: '',
                detail: '',
                file: '',
            },
            rules: {
                fromName: { required: true, message: '请填写稿件作者姓名', trigger: 'blur' },
                title: { required: true, message: '请填稿件标题', trigger: 'blur' },
            },
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

<style scoped></style>
