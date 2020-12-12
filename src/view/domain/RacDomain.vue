<template>
    <div class="content-wrapper">
        <div class="rac-domain-header-wrapper">
            <div class="rac-domain-breadcrumb">
                <a>首页</a> / <span>领域列表</span> /
                <span>查询</span>
            </div>
            <div class="rac-domain-header-title">
                <span>查询表格</span>
            </div>
        </div>
        <div class="rac-domain-content-wrapper">
            <div class="rac-domain-content-query">
                <div class="rac-domain-id">
                    <label for="">领域ID:</label>
                    <input type="text" />
                </div>
                <div class="rac-domain-name">
                    <label for="">领域名称:</label>
                    <input type="text" />
                </div>
            </div>
            <div class="rac-domain-content-list">
                <a-table :columns="racDomainColumns" :data-source="racDomainList">
                    <a slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="customTitle"><input type="checkbox"/></span>
                    <span slot="action">
                        <a>查看</a>
                        <a-divider type="vertical" />
                        <a>编辑</a>
                        <a-divider type="vertical" />
                        <a>删除</a>
                    </span>
                </a-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RacDomain',
    data() {
        return {
            racDomainColumns: [
                {
                    title: '领域ID',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '领域名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 'remark',
                },
                {
                    title: '操作栏',
                    key: 'action',
                },
            ],
            racDomainList: [
                {
                    key: '1',
                    name: '领域1',
                    remark: '备注1',
                },
                {
                    key: '2',
                    name: '领域2',
                    remark: '备注2',
                },
                {
                    key: '3',
                    name: '领域3',
                    remark: '备注3',
                },
            ],
        };
    },
};
</script>
<style scoped lang="scss">
.content-wrapper {
    flex: 1;
    z-index: 100;
    display: flex;
    flex-direction: column;
}
</style>
