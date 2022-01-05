<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="可变更的组织"
            :loading="loading"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
        >
            <p style="font-weight: bolder; font-size: 16px">请选择组织提交</p>
            <div :style="{ width: currentWidth + 'px' }">
                <div class="menu-toolbar">
                    <a-input-search
                        v-model.trim="keywords"
                        :loading="loading"
                        placeholder="关键字"
                        @search="refreshData"
                    />
                </div>
                <a-tree
                    :tree-data="dataSource"
                    class="tree"
                    blockNode
                    :load-data="handleTreeNodeExpand"
                    :loadedKeys="loadedKeys"
                    @select="handleOrgTreeSelect"
                />
                <a-pagination
                    show-quick-jumper
                    v-model="pageNum"
                    :page-size:sync="pageSize"
                    :total="total"
                    simple
                    @change="handleTreeChange"
                />
            </div>
        </base-modal>
    </fragment>
</template>

<script>
import { findFromTree, forEachTree } from '@/util/tree';
import { racOrgApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';

export default {
    components: {
        BaseModal,
    },
    props: {
        account: {
            type: Object,
            required: false,
        },
        width: {
            type: Number,
            default: 200,
        },
        foldWidth: {
            type: Number,
            default: 80,
        },
        modifyOrgId: {
            type: String,
            default: '',
        },
        realmId: {
            type: String,
            required: true,
        },
        existOrgIds: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        this.api = racOrgApi;

        return {
            //
            loading: false,
            dataSource: [],
            keywords: '',
            curOrg: '',
            orgFold: false,
            pageNum: 1,
            pageSize: 5,
            total: 0,
            loadedKeys: [],
        };
    },
    computed: {
        currentWidth() {
            return this.orgFold ? this.foldWidth : this.width;
        },
    },
    mounted() {
        //
    },
    methods: {
        handleShow() {
            this.keywords = '';
            this.$nextTick(() => {
                this.refreshData();
            });
        },
        /**
         * 刷新数据
         */
        refreshData() {
            const { pageNum, pageSize, realmId, keywords } = this;
            this.loading = true;
            const qo = { pageNum, pageSize, realmId, deep: false };
            if (keywords && keywords.trim() !== '') qo.keywords = keywords.trim();
            racOrgApi
                .page(qo)
                .then(ro => {
                    this.total = ro.extra.page.total - 0;
                    forEachTree(ro.extra.page.list, node => {
                        let flat = false;
                        for (const id of this.existOrgIds) {
                            if (node.id === id) {
                                flat = true;
                                break;
                            }
                        }
                        node.key = node.id;
                        node.title = node.name;
                        node.icon = 'apartment';
                        node.disabled = flat;
                    });
                    this.dataSource = ro.extra.page.list;
                })
                .finally(() => (this.loading = false));
        },
        /**展开节点*/
        handleTreeNodeExpand(treeNode) {
            const promise = new Promise(resolve => {
                if (treeNode.dataRef.children) {
                    resolve();
                    return;
                }
                racOrgApi.list({ parentId: treeNode.dataRef.id }).then(ro => {
                    for (const item of ro.extra.list) {
                        let flat = false;
                        for (const id of this.existOrgIds) {
                            if (item.id === id) {
                                flat = true;
                                break;
                            }
                        }
                        item.key = item.id;
                        item.title = item.name;
                        item.icon = 'apartment';
                        item.disabled = flat;
                    }
                    treeNode.dataRef.children = ro.extra.list;
                    this.dataSource = [...this.dataSource];
                    resolve();
                });
            });
            return promise;
        },
        /**
         * 添加
         */
        handleModify(curOrg) {
            this.$nextTick(() => {
                this.loading = true;
                const { id } = { ...this.account };
                const accountId = id;
                const modifyOrgId = this.modifyOrgId; //被修改的的组织id
                const orgId = curOrg.id; //修改成选择的组织Id
                const data = { accountId, orgId, modifyOrgId };
                this.api
                    .modifyOrgAccount(data)
                    .then(() => {
                        //
                    })
                    .finally(() => {
                        if (this.account.orgId === modifyOrgId) {
                            this.account.orgId = orgId;
                            this.$emit('update:account', this.account);
                        }
                        this.loading = false;
                        this.curOrg = undefined;
                        this.keywords = '';
                        this.$emit('update:visible', false);
                    });
            });
        },
        /** 处理组织菜单点击节点的事件 */
        handleOrgMenuClick(item) {
            this.curOrg = item;
        },
        /** 处理组织树选择节点的事件 : boolean, selectedNodes, node, event */
        handleOrgTreeSelect(selectedKeys, { selected }) {
            const item = selected ? findFromTree(this.dataSource, node => node.id === selectedKeys[0]) : {};
            this.curOrg = item;
        },
        /**点击提交*/
        handleOk() {
            if (this.curOrg) {
                this.handleModify(this.curOrg);
            }
        },
        /**处理分页 */
        handleTreeChange(page) {
            this.pageNum = page;
            this.$nextTick(() => {
                this.refreshData();
            });
        },
    },
};
</script>
<style lang="less" scoped>
.menu-toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .ant-btn {
        margin-right: 10px;
        flex-shrink: 0;
    }
}
.spin {
    height: 100%;
}
.ant-pagination {
    margin-top: 20px;
}
</style>
