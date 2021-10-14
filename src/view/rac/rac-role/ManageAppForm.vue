<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="请选择需要的应用"
            :loading="loading"
            :visible="visible"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
        >
            <div style="height: 200px">
                <a-select
                    mode="multiple"
                    placeholder="请选择应用"
                    :default-value="appDefault"
                    style="width: 500px"
                    @change="handleChange"
                    showArrow
                >
                    <a-select-option v-for="(item, index) in appSelect" :key="index" :value="item.id">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </div>
        </base-modal>
    </fragment>
</template>

<script>
import { racRoleApi, racPermApi, racAppApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
import { forEachTree } from '@/util/tree';

export default {
    name: 'Manager',
    components: {
        BaseModal,
    },
    props: {
        role: {
            type: Object,
            required: false,
        },
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        this.api = racPermApi;

        return {
            loading: false,
            keywords: '',
            curRealmId: '',
            dataSource: [],
            expandedKeys: [],
            autoExpandParent: true,
            selectedKeys: [],
            ids: [],
            appSelect: [],
            appDefault: [],
        };
    },
    computed: {
        //
    },
    mounted() {
        //
    },
    methods: {
        handleShow() {
            this.curRealmId = this.role.realmId;
            this.appDefault = [];
            this.expandedKeys = [];
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /**
         * 添加
         */
        handleAdd() {
            this.$nextTick(() => {
                this.loading = true;
                const data = { roleId: this.role.id, appIds: this.appDefault };
                racRoleApi
                    .addRoleApp(data)
                    .then(() => {
                        //
                    })
                    .finally(() => {
                        this.loading = false;
                        this.$emit('update:visible', false);
                    });
            });
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.loading = true;
            const data = { realmId: this.curRealmId };
            racAppApi
                .list(data)
                .then(ro => {
                    this.appSelect = ro.extra.list;
                })
                .finally(() => {
                    racRoleApi
                        .listRoleApp(this.role.id)
                        .then(ro => {
                            ro.extra.list.map(item => {
                                this.appDefault.push(item.appId);
                            });
                        })
                        .finally(() => {
                            //默认选择存在的权限
                        });
                    this.loading = false;
                });
        },
        handleChange(e) {
            this.appDefault = e;
        },
        /**点击提交*/
        handleOk() {
            this.handleAdd();
        },
    },
};
</script>
<style lang="less" scoped>
.tree-scroll {
    overflow: auto;
    //border: 1px solid #e7e7e7;
    height: 100%;
}
</style>
