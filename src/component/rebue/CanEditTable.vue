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
                    <div :key="col">
                        <a-input
                            v-if="record.editable"
                            style="margin: -5px 0"
                            :value="text"
                            v-model.trim="model[col]"
                            @change="(e) => handleChange(e.target.value, record.key, col)"
                        />
                        <template v-else>
                            {{ text }}
                        </template>
                        <span style="color: red" v-show="record.editable && message[col]">{{ message[col] }}</span>
                    </div>
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
            <a-button icon="plus" :disabled="editingkey !== ''" style="width: 100%" @click="(event) => add(event)"
                >添加</a-button
            >
        </a-modal>
    </iframe>
</template>

<script>
import schema from 'async-validator';

export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        //校验规则
        rules: {
            type: Object,
            //default: () => {},
        },
        // 校验规则中的错误提示
        message: {
            type: Object,
        },
        /**
         * 需要填写修改的字段
         */
        cols: {
            type: Array,
            required: true,
        },
        /**
         * 必须包含下面这个一列
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
            model: {},
            errors: {},
            validator: null,
        };
    },
    computed: {
        // 实例化构造函数表示创建一个校验器，参数为校验规则对象
        // validator = new schema(this.rules)
    },
    watch: {
        model() {
            console.log('model', this.model);
        },
        dataSource() {
            this.data = [...this.dataSource];
        },
        data() {
            this.cacheData = this.data.map((item) => ({ ...item }));
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
                this.data = [...this.dataSource];
                // 实例化构造函数表示创建一个校验器，参数为校验规则对象
                this.validator = new schema(this.rules);
                this.clearMessage();
            });
        },
        handleChange(value, key, column) {
            const newData = [...this.data];
            const target = newData.filter((item) => key === item.key)[0];
            if (target) {
                //target[column] = value;
                this.data = newData;
            }
        },
        add() {
            this.model = {};
            const random = Math.round(Math.random() * 1000) + '.'; //加入字符避免与已存在的Key重复
            const item = {
                key: random,
            };
            this.data.push(item);
            this.edit(item.key); //添加并编辑
        },
        edit(key) {
            const newData = [...this.data];
            const target = newData.filter((item) => key === item.key)[0];
            this.editingkey = key;
            if (target) {
                target.editable = true;
                this.data = newData;
            }
            Object.assign(this.model, target);
            for (const col of this.cols) {
                target[col] = '';
            }
            setTimeout(() => {
                this.$focus(this.$refs.modal);
            }, 100);
        },
        save(key) {
            this.$nextTick(() => {
                this.clearMessage();
                this.validator
                    .validate(this.model, {
                        firstFields: true,
                    })
                    .then(() => {
                        // 校验通过
                        const newData = [...this.data];
                        const newCacheData = [...this.cacheData];
                        const target = newData.filter((item) => key === item.key)[0];
                        const targetCache = newCacheData.filter((item) => key === item.key)[0];
                        if (target && targetCache) {
                            delete target.editable;
                            this.data = newData;
                            Object.assign(targetCache, target);
                            Object.assign(targetCache, this.model); //复制后参数到先参数，字段一样则覆盖
                            this.cacheData = newCacheData;
                        }
                        this.editingkey = '';
                        console.log('targetCache', targetCache);
                        console.log('校验通过');
                        const saveData = targetCache;
                        this.$emit('save', saveData);
                    })
                    .catch(({ errors }) => {
                        // 校验未通过
                        // 显示错误信息
                        for (const { field, message } of errors) {
                            this.message[field] = message;
                        }
                        // this.$focus(this.$refs.modal);
                        console.log('errors', errors);
                        console.log(' this.message', this.message);
                    });
            });
        },
        // 清空校验错误提示
        clearMessage() {
            for (const key in this.message) this.message[key] = '';
        },
        del(record) {
            this.$nextTick(() => {
                this.$emit('del', record);
            });
        },
        cancel(key) {
            this.clearMessage(); //取消清楚提示
            if (key.indexOf('.') != -1) {
                this.data.splice(
                    this.data.findIndex((item) => item.key === key),
                    1
                );
            }
            this.cacheData = this.data.map((item) => ({ ...item }));
            const newData = [...this.data];
            const target = newData.filter((item) => key === item.key)[0];
            this.editingkey = '';
            if (target) {
                Object.assign(target, this.cacheData.filter((item) => key === item.key)[0]);
                delete target.editable;
                this.data = newData;
            }
            this.$emit('show');
        },
        handleCancel() {
            this.$nextTick(() => {
                this.$emit('cancel');
            });
            //this.$emit('update:visible', false);
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
