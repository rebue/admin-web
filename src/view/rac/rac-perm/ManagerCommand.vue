<template>
    <fragment>
        <can-edit-table
            v-bind="$attrs"
            v-on="$listeners"
            :title="title"
            :visible.sync="visible"
            :width="width"
            :dataSource.sync="dataSource"
            :columns="columns"
            :cols="cols"
            :rules="rules"
            :message="message"
            @show="handleShow"
            @cancel="handleCancel"
            @save="save"
            @del="del"
        />
    </fragment>
</template>

<script>
import { racPermCommandApi } from '@/api/Api';
import CanEditTable from '@/component/rebue/CanEditTable.vue';

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
                title: '命令Key',
                dataIndex: 'commandKey',
                width: '30%',
                scopedSlots: { customRender: 'commandKey' },
            },
            {
                title: '备注',
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
        const rules = {
            commandKey: {
                // 一条校验规则
                required: true,
                message: 'commandKey为必填项',
                trigger: 'blur',
            },
        };
        return {
            loading: false,
            data: [],
            dataSource: [],
            columns: columns,
            cols: ['commandKey', 'remark'],
            rules: rules,
            // 错误提示,根rules中的校验字段相关
            message: {
                commandKey: '',
                remark: '',
            },
        };
    },
    watch: {
        visible(val) {
            if (val) {
                this.$emit('show');
                this.$nextTick(() => {
                    //如果不延时，搜索框可能还未渲染完成，会找不到input报错
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
                this.refreshData();
            });
        },
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            this.dataSource = [];
            racPermCommandApi
                .list({ permId: this.record.id })
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
            //判断是添加还是修改
            if (saveData.key.indexOf('.') != -1) {
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
