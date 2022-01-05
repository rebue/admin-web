<template>
    <div>
        <a-table
            :columns="columns"
            :dataSource="dataSource"
            :rowKey="(account, index) => (account.id ? account.id : index)"
            :pagination="false"
        >
            <span slot="action" slot-scope="text, record">
                <a @click="handleAdd(record)" v-if="!record.unionId">添加映射</a>
                <template v-if="record.unionId">
                    <!-- <a @click="handleModify(record)" >变更映射</a> -->
                    <!-- <a-divider type="vertical" /> -->
                    <a-popconfirm
                        title="你确定要将账户移除出该映射吗?"
                        @confirm="handleDel(record)"
                        okText="确定"
                        cancelText="取消"
                    >
                        <a>移除映射</a>
                    </a-popconfirm>
                </template>
            </span>
        </a-table>
    </div>
</template>

<script>
import { racAccountApi, racRealmApi } from '@/api/Api';

export default {
    data() {
        this.api = racAccountApi;
        const columns = [
            {
                dataIndex: 'realmName',
                title: '领域名称',

                customRender: (text, record) => {
                    return record?.realm?.name;
                },
            },
            {
                dataIndex: 'signInName',
                title: '账号',
                customRender: text => {
                    return text || '--';
                },
            },
            {
                dataIndex: 'action',
                title: '操作',
                //width: 250,

                scopedSlots: { customRender: 'action' },
            },
        ];
        return {
            loading: false,
            realmList: [],
            dataSource: [],
            columns,
            // 通过弹出传入account
            account: {},
        };
    },
    computed: {},
    mounted() {
        this.refreshData();
    },
    methods: {
        /** 刷新数据 */
        async refreshData() {
            this.loading = true;
            // 获取账号详情
            try {
                await racAccountApi.getById(this.account.id).then(res => {
                    this.account = res.extra.one;
                    this.unionId = this.account.unionId;
                });
            } catch {
                this.loading = false;
            }

            // 获取领域列表
            try {
                await racRealmApi.listAll().then(res => {
                    //过滤掉操作账号对应领域
                    const realmList = res.extra.list.filter(v => {
                        return v.id != this.account.realmId;
                    });
                    this.realmList = realmList;
                    this.dataSource = realmList.map(v => {
                        return {
                            realmId: v.id,
                            realm: v,
                        };
                    });
                });
            } catch {
                this.loading = false;
            }

            //有映射关系就有unionId,拿unionId查询映射列表
            if (this.unionId) {
                const data = { unionId: this.unionId };
                try {
                    await this.api.getMapAccountList(data).then(ro => {
                        this.loading = false;
                        const mapAccountList = ro.extra.list;
                        const result = JSON.parse(JSON.stringify(this.dataSource));
                        this.realmList.forEach((v, index) => {
                            const item = mapAccountList.find(account => {
                                return v.id == account.realmId;
                            });
                            if (item) {
                                result[index] = {
                                    ...result[index],
                                    ...item,
                                };
                            }
                        });
                        this.dataSource = result;
                    });
                } catch {
                    this.loading = false;
                }
            }
        },
        /**
         * 处理添加映射关系的事件
         */
        handleAdd(record) {
            const that = this;
            this.$showDialog(
                require('./ChooseUnionAccount.vue').default,
                {
                    data() {
                        return {
                            accountId: that.account.id,
                            realmId: record.realmId,
                        };
                    },
                    methods: {
                        callback() {
                            // 添加映射账号之后，回填unionId
                            that.refreshData();
                        },
                    },
                },
                {
                    title: '添加映射',
                }
            );
        },
        /** 处理修改映射关系 */
        handleModify(record) {
            const that = this;
            this.$showDialog(
                require('./ChooseUnionAccount.vue').default,
                {
                    data() {
                        return {
                            accountId: that.account.id,
                            realmId: record.realmId,
                            mapAccountId: record.id,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshData();
                        },
                    },
                },
                {
                    title: '变更映射',
                }
            );
        },
        /**
         * 处理删除映射关系的事件
         */
        handleDel(record) {
            this.$nextTick(() => {
                this.loading = true;
                const data = {
                    srcId: this.account.id,
                    dstId: record.id,
                };
                this.api
                    .delUnionMapper(data)
                    .then(() => {
                        this.refreshData();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            });
        },
    },
};
</script>
