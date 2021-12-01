<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="300"
                :defaultPagination="false"
            >
                <template #commands>
                    <a-row type="flex">
                        <a-col>
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-item label="用户:">
                                    <a-input v-model="formInline.name"></a-input>
                                </a-form-item>
                                <a-form-model-item label="起始时间">
                                    <a-date-picker
                                        style="min-width: 195px;"
                                        placeholder="开始时间"
                                        v-model="formInline.startTime"
                                        show-time
                                        type="date"
                                        class="dateType"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="结束时间">
                                    <a-date-picker
                                        style="min-width: 180px;width: 180px"
                                        placeholder="结束时间"
                                        v-model="formInline.endTime"
                                        show-time
                                        type="date"
                                        class="dateType"
                                    />
                                </a-form-model-item>
                                <a-form-item label="日志类型:">
                                    <a-select style="width: 180px" v-model="formInline.user" placeholder="全部">
                                        <a-select-option value="">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="2020">
                                            2020
                                        </a-select-option>
                                        <a-select-option value="2019">
                                            2019
                                        </a-select-option>
                                        <a-select-option value="2018">
                                            2018
                                        </a-select-option>
                                    </a-select>
                                </a-form-item>
                            </a-form-model>
                        </a-col>

                        <a-col style="margin-top: 5px;margin-left: 30px">
                            <a-button>查找</a-button>
                        </a-col>
                    </a-row>
                </template>
            </crud-table>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
import baseSearch from '../search/baseSearch';

export default {
    name: 'log',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
    },
    data() {
        this.api = racRealmApi;

        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,
                fixed: 'left',
                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'achievementNo',
                title: '用户名称',
            },
            {
                dataIndex: 'memberName',
                title: '操作',
            },
        ];

        return {
            columns,

            formInline: {
                user: '',
                password: '',
                name: '',
                achievementName: '',
                startTime: '',
                endTime: '',
                status: '',
                year: '',
            },
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        search() {
            console.log(this.api);
        },
    },
};
</script>

<style scoped></style>
