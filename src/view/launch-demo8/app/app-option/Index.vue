<template>
    <div>
        <fragment>
            <a-card>
                <a-row>
                    <a-col :span="4">
                        <a-tree
                            class="ant-card-body"
                            v-model="checkedKeys"
                            show-icon
                            :auto-expand-parent="autoExpandParent"
                            :default-selected-keys="selectedKeys"
                            :default-checked-keys="checkedKeys"
                            :default-expanded-keys="expandedKeys"
                            :tree-data="treeData"
                            @check="onCheck"
                        >
                            <a-icon slot="file" type="file-o" />
                            <a-icon slot="setting" type="setting-o" />
                            <a-icon slot="cloud-sync" type="cloud-sync-o" />
                        </a-tree>
                    </a-col>
                    <a-col :span="20">
                        <div class="btn-group">
                            <a-button-group>
                                <a-button icon="search"></a-button>
                                <a-dropdown>
                                    <a-menu slot="overlay">
                                        <a-menu-item key="1">
                                            1st item
                                        </a-menu-item>
                                    </a-menu>
                                    <a-button>
                                        新增
                                        <a-icon type="down" />
                                    </a-button>
                                </a-dropdown>
                                <a-button class="btn">编辑</a-button>
                                <a-button class="btn">删除</a-button>
                                <a-dropdown>
                                    <a-menu slot="overlay">
                                        <a-menu-item key="1">
                                            1st item
                                        </a-menu-item>
                                    </a-menu>
                                    <a-button>
                                        下载
                                        <a-icon type="down" />
                                    </a-button>
                                </a-dropdown>
                            </a-button-group>
                        </div>
                        <div>
                            <a-table
                                :columns="columns"
                                :data-source="tableData"
                                :row-selection="rowSelection"
                                :expanded-row-keys.sync="expandedRowKeys"
                            />
                        </div>
                    </a-col>
                </a-row>
            </a-card>
        </fragment>
    </div>
</template>

<script>
export default {
    name: 'app-list',
    components: {},
    props: [],
    data() {
        const treeData = [
            {
                title: '普通模板挂接',
                key: '1',
                slots: {
                    icon: 'file',
                },
            },
            {
                title: 'XRPC协议连接',
                key: '2',
                slots: {
                    icon: 'setting',
                },
            },
            {
                title: '自定义数同步',
                key: '3',
                slots: {
                    icon: 'cloud-sync',
                },
            },
        ];
        const columns = [
            {
                title: '模板名称',
                dataIndex: 'name',
                key: 'name',
            },
        ];
        const tableData = [
            {
                key: 1,
                name: '图书馆',
            },
            {
                key: 2,
                name: '登录网后台',
            },
            {
                key: 3,
                name: '新浪',
            },
            {
                key: 4,
                name: '123',
            },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        };
        return {
            baseUrl: process.env.BASE_URL,
            tableData,
            treeData,
            columns,
            rowSelection,
            expandedRowKeys: [],
            autoExpandParent: true,
            selectedKeys: [],
            checkedKeys: [],
            expandedKeys: ['2018', '20181'],
        };
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {
        onCheck(checkedKeys, info) {
            console.log('onCheck', checkedKeys, info);
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
            this.selectedKeys = selectedKeys;
        },
    },
    watch: {},
    filters: {},
};
</script>

<style scoped>
.btn-group {
    margin-bottom: 10px;
}
</style>
