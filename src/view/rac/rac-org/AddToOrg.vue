<template>
    <base-modal
        ref="baseModal"
        title="将账户添加到分组"
        :loading="loading"
        v-bind="$attrs"
        v-on="$listeners"
        @show="handleShow"
        @ok="handleOk"
        :width="850"
    >
        <a-form-model ref="form" :model="model" v-bind="formLayout">
            <a-form-model-item style="width: 800px">
                <a-transfer
                    style="width: 750px"
                    :data-source="mockData"
                    show-search
                    :list-style="{
                        width: '350px',
                        height: '350px',
                    }"
                    :filter-option="filterOption"
                    :target-keys="targetKeys"
                    :render="item => item.title"
                    @change="handleChange"
                    @search="handleSearch"
                />
            </a-form-model-item>
        </a-form-model>
    </base-modal>
</template>

<script>
import BaseModal from '@/component/rebue/BaseModal.vue';
import { racAccountApi } from '@/api/Api';

export default {
    components: {
        BaseModal,
    },
    props: {
        // id: {
        //     type: String,
        //     required: true,
        // },
        // record: {
        //     type: Object,
        //     required: true,
        // },
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
        return {
            loading: false,
            model: {
                unlockReason: '',
            },
            mockData: [],
            targetKeys: [],
        };
    },
    mounted() {
        this.getMock();
    },
    methods: {
        getMock() {
            const targetKeys = [];
            const mockData = [];
            for (let i = 0; i < 20; i++) {
                const data = {
                    key: i.toString(),
                    title: `content${i + 1}`,
                    description: `description of content${i + 1}`,
                    chosen: Math.random() * 2 > 1,
                };
                if (data.chosen) {
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.mockData = mockData;
            this.targetKeys = targetKeys;
        },
        filterOption(inputValue, option) {
            return option.description.indexOf(inputValue) > -1;
        },
        handleChange(targetKeys, direction, moveKeys) {
            console.log(targetKeys, direction, moveKeys);
            this.targetKeys = targetKeys;
        },
        handleSearch(dir, value) {
            console.log('search:', dir, value);
        },
        handleShow() {
            this.$nextTick(() => {
                this.model = {};
                this.$refs.form.resetFields();
            });
        },
        handleOk() {
            this.record.unlockReason = this.model.unlockReason;

            this.loading = true;
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.record.lockAccountId = this.record.id;
                    racAccountApi
                        .enable(this.record)
                        .then(() => this.$emit('update:visible', false))
                        .finally(() => (this.loading = false));
                    this.loading = false;
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
    },
};
</script>
