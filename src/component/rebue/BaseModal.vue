<template>
    <!-- FIXME 如果不包裹上iframe，在同一页面如果有两个EditForm，显示前面的EditForm时，
        在form-model-item下的输入框打任意一个字就会马上失去焦点 -->
    <iframe v-show="false">
        <!-- FIXME 如果没有设置属性 destroyOnClose=true，新建分组和添加新权限都点击后，再点击设置焦点会失效 -->
        <a-modal
            ref="modal"
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
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <template #footer>
                <slot name="footer" :handleCancel="handleCancel"></slot>
            </template>
            <a-spin :spinning="loading">
                <slot></slot>
            </a-spin>
        </a-modal>
    </iframe>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        width: {
            type: Number,
            default: 640,
        },
        loading: {
            type: Boolean,
            required: true,
        },
        visible: {
            type: Boolean,
            required: true,
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.$emit('show');
                this.$nextTick(() => {
                    this.$focus(this.$refs.modal);
                });
            } else {
                this.$emit('close');
            }
        },
    },
    methods: {
        handleOk() {
            this.$emit('ok');
        },
        handleCancel() {
            this.$emit('update:visible', false);
        },
    },
};
</script>
