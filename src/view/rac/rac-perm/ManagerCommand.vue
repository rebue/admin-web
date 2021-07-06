<template>
    <!-- FIXME 如果不包裹上iframe，在同一页面如果有两个EditForm，显示前面的EditForm时，
        在form-model-item下的输入框打任意一个字就会马上失去焦点 -->
    <iframe v-show="visible">
        <!-- FIXME 如果没有设置属性 destroyOnClose=true，新建分组和添加新权限都点击后，再点击设置焦点会失效 -->
        <a-modal
            ref="modal"
            :class="{ hiddenOkButton: hiddenOkButton }"
            :title="title"
            okText="提交"
            :ok-button-props="{ props: { icon: 'check' } }"
            cancelText="返回"
            :cancel-button-props="{ props: { icon: 'rollback' } }"
            :width="width"
            :centered="true"
            :visible="visible"
            :destroyOnClose="true"
            v-bind="$attrs"
            v-on="$listeners"
            @show="handleShow"
            @cancel="handleCancel"
        >
            <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
                <template
                    v-for="col in ['id', 'permId', 'commandKey', 'remark']"
                    :slot="col"
                    slot-scope="text, record, index"
                >
                    <div :key="col">
                        <a-input
                            v-if="record.editable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                        />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                    <div class="editable-row-operations">
                        <span v-if="record.editable">
                            <a @click="() => save(record.key)">保存</a>
                            <a-popconfirm title="确定要取消吗?" @confirm="() => cancel(record.key)">
                                <a>取消</a>
                            </a-popconfirm>
                        </span>
                        <span v-else>
                            <a :disabled="editingkey !== ''" @click="() => edit(record.key)">编辑</a>
                        </span>
                    </div>
                </template>
            </a-table>
            <br />
            <a-button icon="plus" :disabled="editingkey !== ''" style="width: 100%" @click="event => add(event)"
                >添加</a-button
            >
        </a-modal>
    </iframe>
</template>

<script>
import { racPermCommandApi } from '@/api/Api';

export default {
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
            default: false,
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
                title: 'operation',
                dataIndex: 'operation',
                width: '20%',
                scopedSlots: { customRender: 'operation' },
            },
        ];
        return {
            loading: false,
            dataSource: [],
            data: [],
            columns,
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
        // const data = [];
        // for (let i = 0; i < 100; i++) {
        //     data.push({
        //         id: i.toString(),
        //         name: `Edrward ${i}`,
        //         age: 32,
        //         address: `London Park no. ${i}`,
        //     });
        // }
    },
    methods: {
        handleShow() {
            this.$nextTick(() => {
                this.data = [];
                // this.refreshData();
            });
        },
        /**
         * 刷新数据
         */
        refreshData() {
            this.loading = true;
            console.log('record', this.record);
            const permId = { permId: this.record.Id };
            this.editingkey = '';
            this.dataSource = [];
            racPermCommandApi
                .list(permId)
                .then(ro => {
                    for (const item of ro.extra.list) {
                        item.key = item.id.toString();
                        this.dataSource.push(item);
                        console.log('data', this.dataSource);
                    }
                    this.data = this.dataSource;
                })
                .finally(() => {
                    this.cacheData = this.data.map(item => ({ ...item }));
                    this.loading = false;
                });
        },
        handleChange(value, key, column) {
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            if (target) {
                target[column] = value;
                this.data = newData;
            }
        },
        add(event) {
            const random = Math.round(Math.random() * 1000) + '.'; //加入字符避免与已存在的Key重复
            const item = {
                key: random,
            };
            this.data.push(item);
            this.cacheData = this.data.map(item => ({ ...item }));
            this.edit(item.key); //添加并编辑
        },
        edit(key) {
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            this.editingkey = key;
            console.log('newData', newData);
            console.log('target', target);
            if (target) {
                target.editable = true;
                this.data = newData;
            }
        },
        save(key) {
            const newData = [...this.data];
            const newCacheData = [...this.cacheData];
            const target = newData.filter(item => key === item.key)[0];
            const targetCache = newCacheData.filter(item => key === item.key)[0];
            if (target && targetCache) {
                delete target.editable;
                this.data = newData;
                Object.assign(targetCache, target);
                this.cacheData = newCacheData;
            }
            console.log('targetCache', targetCache);
            this.editingkey = '';
        },
        cancel(key) {
            if (key.indexOf('.') != -1) {
                this.data.splice(
                    this.data.findIndex(item => item.key === key),
                    1
                );
            }
            this.cacheData = this.data.map(item => ({ ...item }));
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            this.editingkey = '';
            if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
                delete target.editable;
                this.data = newData;
            }
        },
        handleCancel() {
            this.$emit('update:visible', false);
        },
        handleRadio() {
            console.log('sssssssssssss');
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
