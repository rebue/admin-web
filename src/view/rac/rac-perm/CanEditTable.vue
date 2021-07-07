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
            @cancel="handleCancel"
        >
            <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
                <template v-for="col in cols" :slot="col" slot-scope="text, record, index">
                    <!-- <a-form-model ref="ruleForm" :rules="rules"> -->
                    <div :key="col">
                        <!-- <a-form-model-item v-if="record.editable" :prop="col"> -->
                        <a-input
                            v-if="record.editable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                        />
                        <!-- </a-form-model-item> -->
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                    <!-- </a-form-model> -->
                </template>
                <template slot="operation" slot-scope="text, record, index">
                    <div class="editable-row-operations">
                        <span v-if="record.editable">
                            <a @click="() => save(record.key)">保存</a>
                            <a-divider type="vertical" />
                            <a-popconfirm title="确定要取消吗?" @confirm="() => cancel(record.key)">
                                <a>取消</a>
                            </a-popconfirm>
                        </span>
                        <span v-else>
                            <a :disabled="editingkey !== ''" @click="() => edit(record.key)">编辑</a>
                        </span>
                        <a-divider type="vertical" v-if="!record.editable" />
                        <span v-if="!record.editable">
                            <a-popconfirm title="确定要删除吗?" @confirm="() => del(record)">
                                <a :disabled="editingkey !== ''">删除</a>
                            </a-popconfirm>
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
        /**
         * 需要填写修改的字段
         */
        cols: {
            type: Array,
            required: true,
        },
        /**
         * 必须包含一列
         * {
                title: '操作',
                dataIndex: 'operation',
                width: '20%',
                scopedSlots: { customRender: 'operation' },
            },
         */
        columns: {
            type: Array,
            required: true,
        },
        dataSource: {
            type: Array,
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
        return {
            loading: false,
            data: [],
            editingkey: '',
        };
    },
    computed: {
        //
    },
    watch: {
        dataSource() {
            this.data = this.dataSource;
        },
        data() {
            this.cacheData = this.data.map(item => ({ ...item }));
        },
        visible(val) {
            if (val) {
                this.$emit('show');
                this.$nextTick(() => {
                    //如果不延时，搜索框可能还未渲染完成，会找不到input报错
                    this.refreshData();
                });
            } else {
                this.$emit('close');
            }
        },
    },
    mounted() {
        //
    },
    methods: {
        /**
         * 刷新数据
         */
        refreshData() {
            this.$nextTick(() => {
                this.editingkey = '';
                this.data = this.dataSource;
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
        add() {
            const random = Math.round(Math.random() * 1000) + '.'; //加入字符避免与已存在的Key重复
            const item = {
                key: random,
            };
            this.data.push(item);
            this.edit(item.key); //添加并编辑
        },
        edit(key) {
            this.$nextTick(() => {
                this.$emit('edit');
            });
            const newData = [...this.data];
            const target = newData.filter(item => key === item.key)[0];
            this.editingkey = key;
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
            this.$nextTick(() => {
                const saveData = targetCache;
                this.$emit('save', saveData);
            });
        },
        del(record) {
            this.$nextTick(() => {
                this.$emit('del', record);
            });
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
            // this.$nextTick(() => {
            //     this.$emit('cancel');
            // });
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
