<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="菜单设置"
            :loading="loading"
            :visible="visible"
            v-bind="$attrs"
            v-on="$listeners"
            :width="800"
            @show="handleShow"
            @ok="handleOk"
        >
            <a-form-model ref="form" :model="model">
                <a-form-model-item label="输入菜单">
                    <a-input v-model="model.menu" placeholder="输入菜单" type="textarea" :rows="15" />
                </a-form-model-item>
            </a-form-model>
        </base-modal>
    </fragment>
</template>

<script>
import { racAppApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
import { forEachTree } from '@/util/tree';

export default {
    name: 'Manager',
    components: {
        BaseModal,
    },
    props: {
        curApp: {
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
            model: {},
            dataSource: [],
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
            this.model = {};
            this.$nextTick(() => {
                // this.refreshTableData();
            });
        },
        /**
         * 添加修改菜单
         */
        handleAddModify() {
            this.loading = true;
            const menu = JSON.stringify(this.dataSource);
            this.$nextTick(() => {
                const data = { id: this.curApp.id, menu };
                this.api
                    .modify(data)
                    .then(ro => {
                        this.$emit('success', ro);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.$emit('update:visible', false);
                    });
            });
        },
        /**点击提交*/
        handleOk() {
            const regex = new RegExp('component: RouteView,', 'g'); //g代表全部
            const menu = this.model.menu.replace(regex, '');
            this.refreshTreeData(menu);
            this.handleAddModify(this.checkedKeys);
        },
        /**
         * 刷新菜单数据
         */
        refreshTreeData(menu) {
            this.dataSource = [];
            const menuTemp = eval(`(function (){return [${menu}];})`)();
            const menus = [];
            forEachTree(menuTemp, node => {
                const item = {};
                if (node.children) {
                    item.key = node.path;
                    item.title = node.meta.title;
                    const ite = [];
                    forEachTree(node.children, ch => {
                        const it = {};
                        it.key = ch.path;
                        it.title = ch.meta.title;
                        ite.push(it);
                    });
                    item.children = ite;
                    menus.push(item);
                }
            });
            this.dataSource = menus;
            console.log('dateSource', menus);
            this.loading = false;
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
