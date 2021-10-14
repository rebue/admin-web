<template>
    <fragment>
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item label="选择用户" prop="userId" key="userId">
                <a-select
                    show-search
                    v-model="model.userId"
                    placeholder="请输入 姓名 或 身份证号 查询"
                    style="width: 100%"
                    :filter-option="false"
                    :not-found-content="loading ? undefined : '暂无数据'"
                    @search="fetchUser"
                    @change="handleChange"
                >
                    <a-spin v-if="loading" slot="notFoundContent" size="small" />
                    <a-select-option v-for="d in dataSource" :value="d.id" :key="d.id">
                        {{ d.realName }} {{ d.idCard ? `(${d.idCard})` : '' }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
        </a-form-model>
    </fragment>
</template>
<script>
import { racUserApi } from '@/api/Api';
import debounce from 'lodash/debounce';

export default {
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
        this.api = racUserApi;
        this.fetchUser = debounce(this.fetchUser, 800);
        return {
            model: {
                userId: undefined,
            },
            rules: {
                userId: [{ required: true, message: '请输入 姓名 或者 身份证号 查询', trigger: 'change' }],
            },
            loading: false,
            dataSource: [],
        };
    },
    methods: {
        fetchUser(value) {
            this.dataSource = [];
            this.loading = true;
            this.api
                .page({
                    // pageNum: 1
                    pageSize: 100,
                    keywords: value,
                })
                .then(ro => {
                    this.dataSource = ro.extra.page.list;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleChange(value) {
            this.dataSource = this.dataSource.filter(v => {
                return v.id == value;
            });
            this.loading = false;
        },
        validate() {
            let valid = false;
            this.$refs.form.validate(val => {
                valid = val;
            });
            return valid;
        },
    },
};
</script>
<style scoped>
.detail-wrap {
    margin: 50px 0;
}
.item {
    margin-bottom: 15px;
}
.label {
    text-align: right;
}
.value {
    padding: 0 12px;
}
</style>
