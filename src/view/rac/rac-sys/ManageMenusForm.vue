<template>
    <fragment>
        <base-modal
            ref="baseModal"
            title="菜单设置"
            :loading="loading"
            :visible="visible"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @ok="handleOk"
        >
            <a-form-model ref="form" :model="menus">
                <a-form-model-item label="输入菜单">
                    <a-input v-model="menus.text" placeholder="输入菜单" type="textarea" :rows="15" />
                </a-form-model-item>
            </a-form-model>
        </base-modal>
    </fragment>
</template>

<script>
import { racDomainApi, racRoleApi, racPermApi } from '@/api/Api';
import BaseModal from '@/component/rebue/BaseModal.vue';
import { findFromTree, forEachTree } from '@/util/tree';

export default {
    name: 'Manager',
    components: {
        BaseModal,
    },
    props: {
        curSys: {
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
            menus: {},
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
            this.expandedKeys = [];
            this.checkedKeys = [];
            this.$nextTick(() => {
                // this.refreshTableData();
            });
        },
        /**
         * 添加
         */
        handleAdd() {
            this.$nextTick(() => {
                this.loading = true;
                const data = { roleId: this.role.id, permIds: this.checkedKeys };
                racRoleApi
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
        /**点击提交*/
        handleOk() {
            console.log('menus', this.menus);
            const regex = new RegExp('component: RouteView,', 'g'); //g代表全部
            const text = this.menus.text.replace(regex, '');
            console.log('text', text);
            const menu = eval(`(function (){return ${text};})`)();
            console.log('text', menu);
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
