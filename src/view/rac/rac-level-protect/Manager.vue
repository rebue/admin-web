<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <crud-table
                    ref="crudTable"
                    :columns="columns"
                    :api="api"
                    :scrollX="600"
                    :defaultPagination="false"
                ></crud-table>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import CrudTable from '@/component/rebue/CrudTable.vue';
import BaseManager from '@/component/rebue/BaseManager';
import editableCell from './EditableCell.vue';
import { accountStore } from '@/store/Store';
import { raclevelProtectApi, racDicItemApi } from '@/api/Api';

// passwordErrors     输入密码错误次数/次
// lockDuration       账号锁定时长/分钟
// passwordMinLength  密码最小长度/位数
// passwordCharacter  密码最少包含字符/种
// passwordTips       输强制修改密码
// passwordDoverdue    密码过期时长/天
const configData = [
    {
        name: '输入密码错误次数/次',
        key: 'passwordErrors',
        remark: '输入指定次数错误密码将锁定账号',
    },
    {
        name: '账号锁定时长/分钟',
        key: 'lockDuration',
        remark: '当密码输入次数超过指定次数，则锁定账号无法登录',
    },
    {
        name: '密码最小长度/位数',
        key: 'passwordMinLength',
        remark: '用户的密码最小长度',
    },
    {
        name: '密码最少包含字符/种',
        key: 'passwordCharacter',
        remark: '字符包括大写字母、小写字母、数字和特殊符号',
    },
    {
        name: '输强制修改密码',
        key: 'passwordTips',
        remark: '第一次登录是否强制修改密码',
    },
    {
        name: '密码过期时长/天',
        key: 'passwordDoverdue',
        remark: '超过指定天数，需要用户强制修改新密码',
    },
];
export default {
    name: 'Manager',
    components: {
        CrudTable,
        // EditableCell,
        BaseManager,
    },
    data() {
        this.api = {
            listAll() {
                return raclevelProtectApi.getConfig().then(ro => {
                    const data = [];
                    for (const i in configData) {
                        for (const j in ro.extra) {
                            if (configData[i].key == j) {
                                data.push({
                                    name: configData[i].name,
                                    dicItemKey: configData[i].key,
                                    dicItemValue: ro.extra[j],
                                    remark: configData[i].remark,
                                });
                            }
                        }
                    }
                    ro.extra.list = data;
                    return ro;
                });
            },
        };
        this.racDicItemApi = racDicItemApi;
        const columns = [
            {
                title: '配置内容',
                dataIndex: 'name',
            },
            {
                title: '配置项',
                dataIndex: 'dicItemValue',
                customRender: (text, record) =>
                    record.dicItemKey != 'passwordTips' ? (
                        <editableCell text={text} record={record} cellClick={this.onCellChange}></editableCell>
                    ) : (
                        <a-switch
                            checked={record.dicItemValue == 'true' || record.dicItemValue == true ? true : false}
                            checkedChildren="启"
                            unCheckedChildren="禁"
                            onClick={() => this.wsitchChange(record)}
                        />
                    ),
                // scopedSlots: { customRender: 'dicItemValue' },
            },
            {
                title: '备注',
                dataIndex: 'remark',
            },
        ];
        return {
            columns,
            accountStore,
        };
    },
    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        onCellChange(record, value) {
            if (record.dicItemValue == value) {
                return;
            }
            console.log(record);
            const data = {
                name: record.dicItemKey,
                value: value,
            };
            raclevelProtectApi
                .publishConfig(data)
                .then(() => {
                    this.visible = false;
                })
                .finally(() => (this.loading = false));
        },
        wsitchChange(record) {
            const oldData = record;
            if (oldData.dicItemValue == 'false' || oldData.dicItemValue == false) {
                oldData.dicItemValue = true;
            } else {
                oldData.dicItemValue = false;
            }
            const data = {
                name: oldData.dicItemKey,
                value: oldData.dicItemValue,
            };
            raclevelProtectApi
                .publishConfig(data)
                .then(() => {
                    this.visible = false;
                })
                .finally(() => (this.loading = false));
        },
        /**
         * 刷新表格数据
         */
        refreshTableData() {
            this.crudTable.refreshData();
        },
        handleEditFormClose() {
            this.refreshTableData();
        },
    },
};
</script>
