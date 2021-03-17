<template>
    <div v-show="show" :style="{ width: currentWidth + 'px' }">
        <div class="menu-toolbar">
            <a-button :icon="orgFold ? 'menu-unfold' : 'menu-fold'" @click="handleOrgFoldChanged" />
            <a-input-search
                v-show="!orgFold"
                v-model.trim="keywords"
                :loading="loading"
                placeholder="关键字"
                @search="refreshData"
            />
        </div>
        <a-spin :spinning="loading" class="spin">
            <rebue-tree
                v-show="orgFold"
                :fold="true"
                :dataSource="dataSource"
                v-bind="$attrs"
                v-on="$listeners"
            ></rebue-tree>
            <a-tree v-show="!orgFold" :tree-data="dataSource" class="tree" blockNode @select="handleTreeNodeClick" />
            <a-pagination v-show="!orgFold" v-model="pageNum" :page-size:sync="pageSize" :total="500" simple />
        </a-spin>
    </div>
</template>
<script>
import { findFromTree, forEachTree } from '@/util/tree';
import RebueTree from '@/component/rebue/Tree';
import { racOrgApi } from '@/api/Api';

export default {
    name: 'Menu',
    components: {
        RebueTree,
    },
    props: {
        width: {
            type: Number,
            default: 200,
        },
        foldWidth: {
            type: Number,
            default: 80,
        },
        domainId: {
            type: String,
            required: true,
        },
        show: {
            type: Boolean,
        },
    },
    data() {
        return {
            loading: false,
            orgFold: false,
            showOrg: false,
            pageNum: 1,
            pageSize: 20,
            keywords: '',
            dataSource: [],
        };
    },
    computed: {
        currentWidth() {
            return this.orgFold ? this.foldWidth : this.width;
        },
    },
    watch: {
        domainId() {
            this.refreshData();
        },
    },
    mounted() {
        this.refreshData();
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            const { pageNum, pageSize, domainId, keywords } = this;
            this.loading = true;
            const qo = { pageNum, pageSize, domainId };
            if (keywords && keywords.trim() !== '') qo.keywords = keywords.trim();
            racOrgApi
                .page(qo)
                .then(ro => {
                    forEachTree(ro.extra.page.list, node => {
                        node.key = node.id;
                        node.title = node.name;
                        node.icon = 'apartment';
                    });
                    this.dataSource = ro.extra.page.list;

                    if (!keywords || keywords.trim() === '') {
                        if (ro.extra.page.total > 0) {
                            this.$emit('update:show', true);
                        } else {
                            this.$emit('update:show', false);
                        }
                    }
                })
                .finally(() => (this.loading = false));
        },
        /** 处理组织收缩改变 */
        handleOrgFoldChanged() {
            this.orgFold = !this.orgFold;
        },
        /** 处理关键字搜索 */
        handleSearch(value) {
            this.keywords = value;
            this.$nextTick(() => this.refreshData());
        },
        /** 处理树节点点击事件 */
        handleTreeNodeClick(selectedKeys, { selected }) {
            this.$emit('select', {
                isSelected: selected,
                ...(selected ? { item: findFromTree(this.dataSource, node => node.id === selectedKeys[0]) } : {}),
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