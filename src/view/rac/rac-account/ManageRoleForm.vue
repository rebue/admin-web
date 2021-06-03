<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="请选择角色"
            :loading="loading"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
        >
            <p style="font-weight: bolder; font-size: 16px">请选择组织提交</p>
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
        //
    },
    mounted() {
        //
    },
    methods: {
        handleShow() {
            this.keywords = '';
            this.$nextTick(() => {
                //this.refreshData();
            });
        },
        /**
         * 刷新数据
         */
        refreshData() {
            // const { pageNum, pageSize, domainId, keywords } = this;
            // this.loading = true;
            // const qo = { pageNum, pageSize, domainId, deep: false };
            // if (keywords && keywords.trim() !== '') qo.keywords = keywords.trim();
            // racOrgApi
            //     .page(qo)
            //     .then(ro => {
            //         this.total = ro.extra.page.total - 0;
            //         forEachTree(ro.extra.page.list, node => {
            //             let flat = false;
            //             for (const id of this.existOrgIds) {
            //                 if (node.id === id) {
            //                     flat = true;
            //                     break;
            //                 }
            //             }
            //             node.key = node.id;
            //             node.title = node.name;
            //             node.icon = 'apartment';
            //             node.disabled = flat;
            //         });
            //         this.dataSource = ro.extra.page.list;
            //     })
            //     .finally(() => (this.loading = false));
        },
        /**点击提交*/
        handleOk() {
            if (this.curOrg) {
                this.handleAdd(this.curOrg);
            }
        },
        /**处理分页 */
        handleTreeChange(page, pageSize) {
            this.pageNum = page;
            // this.pageSize = pageSize;
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
