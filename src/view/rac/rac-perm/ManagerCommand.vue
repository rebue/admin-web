<template>
    <fragment>
        <can-edit-table
            v-bind="$attrs"
            v-on="$listeners"
            :record="record"
            :title="title"
            :visible.sync="visible"
            :width="width"
            :dataSource.sync="dataSource"
            :columns="columns"
            :cols="cols"
            @show="handleShow"
            @cancel="handleCancel"
            @save="save"
            @del="del"
        />
    </fragment>
</template>

<script>
import { racPermCommandApi } from '@/api/Api';
import CanEditTable from './CanEditTable.vue';

export default {
    components: {
        CanEditTable,
    },
    props: {
        record: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        /**
         * 需要填写修改的字段
         */
        width: {
            type: Number,
            default: 640,
        },
        visible: {
            type: Boolean,
            required: false,
        },
        hiddenOkButton: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: '15%',
                scopedSlots: { customRender: 'id' },
            },
            {
                title: 'PERM_ID',
                dataIndex: 'permId',
                width: '15%',
                scopedSlots: { customRender: 'permId' },
            },
            {
                title: 'COMMAND_Key',
                dataIndex: 'commandKey',
                width: '30%',
                scopedSlots: { customRender: 'commandKey' },
            },
            {
                title: 'REMARK',
                dataIndex: 'remark',
                scopedSlots: { customRender: 'remark' },
            },
            {
                title: '操作',
                dataIndex: 'operation',
                width: '20%',
                scopedSlots: { customRender: 'operation' },
            },
        ];
        return {
            loading: false,
            data: [],
            dataSource: [],
            columns: columns,
            cols: ['id', 'permId', 'commandKey', 'remark'],
            editingkey: '',
        };
    },
    watch: {
        visible(val) {
            if (val) {
                this.$emit('show');
                this.$nextTick(() => {
                    //如果不延时，搜索框可能还未渲染完成，会找不到input报错
                    this.data = [];
                    this.refreshData();
                    setTimeout(() => {
                        // this.$focus(this.$refs.modal);
                    }, 100);
                });
            } else {
                this.$emit('close');
            }
        },
    },
    mounted() {
        //this.refreshData();
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                // this.refreshData();
            });
        },
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            this.dataSource = [];
            racPermCommandApi
                .list({ id: this.record.id })
                .then(ro => {
                    for (const item of ro.extra.list) {
                        item.key = item.id.toString();
                        this.dataSource.push(item);
                    }
                    this.data = this.dataSource;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        save(saveData) {
            if (saveData.key.indexOf('.') != -1) {
                //判断是添加还是修改
                saveData.permId = this.record.id;
                racPermCommandApi
                    .add(saveData)
                    .then(() => {
                        //
                    })
                    .finally(() => {
                        this.refreshData();
                        this.loading = false;
                    });
            } else {
                racPermCommandApi
                    .modify(saveData)
                    .then(() => {
                        //
                    })
                    .finally(() => {
                        this.refreshData();
                        this.loading = false;
                    });
            }
        },
        del(record) {
            racPermCommandApi
                .delById(record.id)
                .then(() => {
                    //
                })
                .finally(() => {
                    this.refreshData();
                    this.loading = false;
                });
        },
        handleCancel() {
            this.$emit('update:visible', false);
        },
    },
};
</script>
<style scoped>
.hiddenOkButton >>> .ant-modal-footer .ant-btn-primary {
    display: none;
}
.editable-row-operations a {
    margin-right: 8px;
}
</style>
