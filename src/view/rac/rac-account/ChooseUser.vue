<template>
    <fragment>
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item label="选择用户" prop="userId" key="userId">
                <a-select
                    show-search
                    allowClear
                    v-model="model.userId"
                    placeholder="请输入 姓名 或 身份证号 查询"
                    style="width: 100%"
                    :filter-option="false"
                    :not-found-content="loading ? undefined : '暂无数据'"
                    @search="fetchUserList"
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
import { racUserApi, racAccountApi } from '@/api/Api';
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
        this.fetchUserList = debounce(this.fetchUserList, 800);
        this.rules = this.required
            ? {
                  userId: [{ required: true, message: '请输入 姓名 或者 身份证号 查询', trigger: 'change' }],
              }
            : {};
        return {
            model: {
                id: undefined,
                userId: undefined,
            },
            loading: false,
            dataSource: [],
        };
    },
    mounted() {
        this.$nextTick(() => {
            if (this.model.userId) {
                racUserApi.getById(this.model.userId).then(ro => {
                    this.dataSource = [ro.extra.one];
                });
            } else {
                this.fetchUserList();
            }
        });
    },
    methods: {
        fetchUserList(value) {
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
        handleChange() {
            this.loading = false;
        },
        ok() {
            this.$refs.form.validate(val => {
                if (val) {
                    if (this.model.userId) {
                        racAccountApi
                            .modify({
                                id: this.model.id,
                                userId: this.model.userId,
                            })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                this.closeDialog();
                            });
                    } else {
                        //移除账户的用户
                        racAccountApi
                            .removeUserByAccount({
                                id: this.model.id,
                            })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                this.closeDialog();
                            });
                    }
                }
            });
        },
    },
};
</script>
