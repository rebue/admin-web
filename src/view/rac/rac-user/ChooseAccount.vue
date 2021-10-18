<template>
    <fragment>
        <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
            <a-form-model-item label="领域" prop="realmId" key="realmId">
                <a-select v-model="model.realmId" @change="handleRealmChange">
                    <a-select-option v-for="item in realmList" :key="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="账户" prop="id" key="id">
                <a-select
                    show-search
                    allowClear
                    v-model="model.id"
                    placeholder="请输入关键字查询"
                    style="width: 100%"
                    :filter-option="false"
                    :not-found-content="loading ? undefined : '暂无数据'"
                    @search="fetchAccountList"
                    @change="handleAccountChange"
                >
                    <a-spin v-if="loading" slot="notFoundContent" size="small" />
                    <a-select-option v-for="d in dataSource" :value="d.id" :key="d.id">
                        {{ d.signInName }}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
        </a-form-model>
    </fragment>
</template>
<script>
import { racAccountApi, racRealmApi } from '@/api/Api';
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
        this.api = racAccountApi;
        this.fetchAccountList = debounce(this.fetchAccountList, 800);
        return {
            userId: undefined,
            model: {
                realmId: undefined,
                id: undefined,
            },
            rules: {
                realmId: [{ required: true, message: '请选择领域', trigger: 'change' }],
                id: [{ required: true, message: '请输入关键字查询', trigger: 'change' }],
            },
            loading: false,
            realmList: [],
            dataSource: [],
        };
    },
    mounted() {
        this.fetchRealmList();
        //默认选中
        this.$nextTick(() => {
            if (this.model.id) {
                this.api.getById(this.model.id).then(ro => {
                    this.dataSource = [ro.extra.one];
                });
            } else {
                this.fetchAccountList();
            }
        });
    },
    methods: {
        fetchRealmList() {
            racRealmApi.listAll().then(ro => {
                this.realmList = ro.extra.list;
                // 默认选中第一项
                this.model.realmId = ro.extra.list[0].id;
            });
        },
        handleRealmChange() {
            // 处理领域联动账号
            this.model.id = undefined;
            this.fetchAccountList();
        },
        fetchAccountList(value) {
            this.dataSource = [];
            this.loading = true;
            this.api
                .page({
                    // pageNum: 1
                    pageSize: 100,
                    realmId: this.model.realmId,
                    keywords: value,
                })
                .then(ro => {
                    this.dataSource = ro.extra.page.list;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleAccountChange() {
            this.loading = false;
        },
        validate() {
            let valid = false;
            this.$refs.form.validate(val => {
                valid = val;
            });
            return valid;
        },
        // 用于账号下关联用户的提交
        ok() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.api
                        .modify({
                            id: this.model.id,
                            userId: this.userId,
                        })
                        .then(ro => {
                            this.callback && this.callback(ro);
                            this.closeDialog();
                        });
                }
            });
        },
    },
};
</script>
