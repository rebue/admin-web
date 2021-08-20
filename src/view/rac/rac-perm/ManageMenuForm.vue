<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="请选择应用并勾选菜单"
            :loading="loading"
            :visible="visible"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
        >
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-tabs :activeKey="curAppId" @change="handleAppChanged">
                        <a-tab-pane v-for="app in apps" :key="app.id" :tab="app.name">
                            <a-tooltip title="全部展开">
                                <a-button type="link" size="large" @click="expandAll">
                                    <icon-font type="rebue-expand-all" />
                                </a-button>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip title="全部收缩">
                                <a-button type="link" size="large" @click="collapseAll">
                                    <icon-font type="rebue-collapse-all" />
                                </a-button>
                            </a-tooltip>
                            <p></p>
                            <div style="height: 500px">
                                <a-tree
                                    :ref="`treeData.${app.id}`"
                                    v-model="checkedKeys"
                                    checkable
                                    :expanded-keys="expandedKeys"
                                    :auto-expand-parent="autoExpandParent"
                                    :selected-keys="selectedKeys"
                                    :tree-data="dataSource"
                                    class="tree-scroll"
                                    :selectable="false"
                                    @expand="onExpand"
                                    @check="onCheck"
                                    @select="onSelect"
                                />
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </template>
            </base-manager>
        </base-modal>
    </fragment>
</template>

<script>
import { racAppApi, racPermMenuApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
import { forEachTree } from '@/util/tree';
import BaseManager from '@/component/rebue/BaseManager.vue';

export default {
    name: 'Manager',
    components: {
        BaseModal,
        BaseManager,
    },
    props: {
        perm: {
            type: Object,
            required: false,
        },
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        this.api = racAppApi;

        return {
            loading: false,
            keywords: '',
            curRealmId: '',
            dataSource: [],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            ids: [],
            apps: [],
            curAppId: '',
        };
    },
    computed: {
        treeData() {
            return this.$refs['treeData.' + this.curAppId][0];
        },
    },
    mounted() {
        //
    },
    methods: {
        handleShow() {
            this.curRealmId = this.perm.realmId;
            this.expandedKeys = [];
            this.checkedKeys = [];
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /**
         * 刷新领域下的应用
         */
        refreshTableData() {
            this.loading = true;
            this.dataSource = [];
            this.checkedKeys = [];
            this.curAppId = '';
            const data = { realmId: this.curRealmId };
            this.api
                .list(data)
                .then(ro => {
                    this.apps = ro.extra.list;
                    if (!this.curAppId) this.curAppId = this.apps[0].id;
                    this.dataSource = JSON.parse(ro.extra.list[0].menu);
                })
                .finally(() => {
                    this.ids = [];
                    for (const list of this.dataSource) {
                        //记录菜单的ID key
                        this.ids.push(list.key);
                    }
                    this.getPermMenu();
                    this.loading = false;
                });
        },
        /**
         * 刷新应用菜单
         */
        refreshTreeData() {
            this.loading = true;
            this.dataSource = [];
            this.checkedKeys = [];
            this.api
                .getById(this.curAppId)
                .then(ro => {
                    this.dataSource = JSON.parse(ro.extra.one.menu);
                })
                .finally(() => {
                    this.ids = [];
                    for (const list of this.dataSource) {
                        //记录菜单的ID key
                        this.ids.push(list.key);
                    }
                    this.getPermMenu();
                    this.loading = false;
                    console.log('this.dataSource', this.dataSource);
                });
        },
        /**
         * 处理改变应用的事件
         */
        handleAppChanged(appId) {
            this.curAppId = appId;
            this.refreshTreeData();
        },
        /**
         * 获取权限已存在的菜单
         */
        getPermMenu() {
            const checkedKeys = [];
            const data = { appId: this.curAppId, permId: this.perm.id };
            racPermMenuApi
                .listPermMenu(data)
                .then(ro => {
                    for (const list of ro.extra.list) {
                        checkedKeys.push(list.menuUrn);
                    }
                })
                .finally(() => {
                    //默认选择存在的菜单
                    this.onCheck(checkedKeys);
                });
        },
        /**
         * 添加/修改
         */
        handleAdd() {
            this.$nextTick(() => {
                this.loading = true;
                const data = { appId: this.curAppId, permId: this.perm.id, menuUrns: this.checkedKeys };
                racPermMenuApi
                    .addPermMenuUrn(data)
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
         * 展开节点
         */
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        /**
         * 选择复选框
         */
        onCheck(checkedKeys) {
            this.checkedKeys = checkedKeys;
            //除去菜单的ID key，只保留子菜单的ID key
            for (const id of this.ids) {
                const keyIndex = this.checkedKeys.findIndex(item => item === id);
                if (keyIndex >= 0) {
                    this.checkedKeys.splice(keyIndex, 1);
                    //选择权限分组时并展开该分组
                    this.expandedKeys.push(id);
                }
            }
        },
        /**
         * 选择节点
         */
        onSelect(selectedKeys) {
            this.selectedKeys = selectedKeys;
        },
        /**
         * 展开树所有节点
         */
        expandAll() {
            this.expandedKeys = [];
            forEachTree(this.dataSource, node => {
                node['children'] && this.expandedKeys.push(node.key);
            });
        },
        /**
         * 收缩树所有节点
         */
        collapseAll() {
            this.expandedKeys = [];
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
