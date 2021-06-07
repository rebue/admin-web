<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="请选择菜单"
            :loading="loading"
            :visible="visible"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
        >
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
        </base-modal>
    </fragment>
</template>

<script>
import { racSysApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
import { findFromTree, forEachTree } from '@/util/tree';

export default {
    name: 'Manager',
    components: {
        BaseModal,
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
            this.curDomainId = this.perm.domainId;
            this.expandedKeys = [];
            this.checkedKeys = [];
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
                const data = { permId: this.perm.id, permIds: this.checkedKeys };
                this.api
                    .addRolePerm(data)
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
         * 刷新表格数据
         */
        refreshTableData() {
            this.loading = true;
            const data = { domainId: this.curDomainId };
            this.api
                .list(data)
                .then(ro => {
                    // forEachTree(ro.extra.list, (node) => {
                    //     node.key = node.id;
                    //     node.title = node.name;
                    // });

                    this.dataSource = JSON.parse(ro.extra.list[0].menu);
                    this.ids = [];
                    for (const list of this.dataSource) {
                        //记录菜单的ID key
                        this.ids.push(list.key);
                    }
                })
                .finally(() => {
                    this.loading = false;
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
