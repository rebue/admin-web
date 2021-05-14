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
        <a-form-model ref="form" :model="model">
            <a-form-model-item style="width: 800px">
                <a-transfer
                    style="width: 750px"
                    :titles="['待添加的账户', '当前组织下的账户']"
                    :data-source="mockData"
                    show-search
                    :list-style="{
                        width: '350px',
                        height: '350px',
                    }"
                    :locale="{
                        itemUnit: '项',
                        itemsUnit: '项',
                        notFoundContent: '列表为空',
                        searchPlaceholder: '请输入搜索内容',
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
import { racAccountApi, racOrgApi } from '@/api/Api';

export default {
    components: {
        BaseModal,
    },
    props: {
        // id: {
        //     type: String,
        //     required: true,
        // },
        record: {
            type: Object,
            required: true,
        },
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
            mockData: [],
            targetKeys: [],
            model: {
                lockReason: '',
            },
        };
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                this.model = {};
                this.loading = true;
                this.$refs.form.resetFields();
                console.log('rrrrrrrrrr', this.record);
                racAccountApi
                    .list({ domainId: this.record.domainId, orgId: this.record.id })
                    .then(ro => {
                        const list = ro.extra.list;
                        const ids = ro.extra.ids;
                        const orgIds = ro.extra.orgIds;
                        const targetKeys = [];
                        const mockData = [];
                        for (let i = 0; i < list.length; i++) {
                            const data = {
                                key: list[i].id,
                                title: `${list[i].signInName}`,
                                description: `${list[i].signInName}`,
                                chosen: this.record.id === list[i].orgId || this.record.id === list[i].orgAccountOrgId,
                            };
                            if (data.chosen) {
                                targetKeys.push(data.key);
                            }
                            // for (const id of ids) {
                            //     targetKeys.push(id.accountId);
                            // }
                            for (const orgId of orgIds) {
                                targetKeys.push(orgId);
                            }
                            mockData.push(data);
                        }
                        this.mockData = mockData;
                        this.targetKeys = targetKeys;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
        filterOption(inputValue, option) {
            return option.description.indexOf(inputValue) > -1;
        },
        handleChange(targetKeys, direction, moveKeys) {
            console.log(targetKeys);
            console.log(direction);
            console.log(moveKeys);
            this.targetKeys = targetKeys;
            if (direction === 'right') {
                racOrgApi
                    .addOrgAccount({ orgId: this.record.id, accountId: moveKeys })
                    .then(ro => {
                        console.log('添加完成');
                    })
                    .finally(() => {
                        this.loading = false;
                        this.handleShow();
                    });
            } else {
                racOrgApi
                    .delOrgAccount({ orgId: this.record.id, accountId: moveKeys })
                    .then(ro => {
                        console.log('移除完成');
                    })
                    .finally(() => {
                        this.loading = false;
                        this.handleShow();
                    });
            }
        },
        handleSearch(dir, value) {
            console.log('search:', dir, value);
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
