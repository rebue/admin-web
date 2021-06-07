<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="请选择系统并勾选菜单"
            :loading="loading"
            :visible="visible"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
        >
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-tabs :activeKey="curSysId" @change="handleSysChanged">
                        <a-tab-pane v-for="sys in syss" :key="sys.id" :tab="sys.name">
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
                                    :ref="`treeData.${sys.id}`"
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
import { racSysApi, racPermMenuApi } from '@/api/Api';
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
        this.api = racSysApi;

        return {
            loading: false,
            keywords: '',
            curDomainId: '',
            dataSource: [],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            ids: [],
            syss: [],
            curSysId: '',
        };
    },
    computed: {
        treeData() {
            return this.$refs['treeData.' + this.curSysId][0];
        },
    },
    mounted() {
        //
    },
    methods: {
        handleShow() {
            this.curDomainId = this.perm.domainId;
            this.expandedKeys = [];
            this.checkedKeys = [];
            this.$nextTick(() => {
                this.refreshTableData();
            });
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.loading = true;
            this.dataSource = [];
            this.checkedKeys = [];
            const data = { domainId: this.curDomainId };
            this.api
                .list(data)
                .then(ro => {
                    this.syss = ro.extra.list;
                    if (!this.curSysId) this.curSysId = this.syss[0].id;
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
         * 刷新系统菜单
         */
        refreshTreeData() {
            this.loading = true;
            this.dataSource = [];
            this.checkedKeys = [];
            this.api
                .getById(this.curSysId)
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
         * 处理改变系统的事件
         */
        handleSysChanged(sysId) {
            this.curSysId = sysId;
            this.refreshTreeData();
        },
        /**
         * 获取权限已存在的菜单
         */
        getPermMenu() {
            const checkedKeys = [];
            const data = { sysId: this.curSysId, permId: this.perm.id };
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
                const data = { sysId: this.curSysId, permId: this.perm.id, menuUrns: this.checkedKeys };
                racPermMenuApi
                    .addPermMenuUrn(data)
                    .then(ro => {
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
            console.log('checke', this.checkedKeys);
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
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
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
