<template>
    <!-- FIXME 如果不包裹上iframe，在同一页面如果有两个EditForm，显示前面的EditForm时，
        在form-model-item下的输入框打任意一个字就会马上失去焦点 -->
    <iframe v-show="false">
        <!-- FIXME 如果没有设置属性 destroyOnClose=true，新建分组和添加新权限都点击后，再点击设置焦点会失效 -->
        <a-modal
            ref="modal"
            :class="{ hiddenOkButton: hiddenOkButton }"
            :title="title"
            okText="提交"
            :ok-button-props="{ props: { icon: 'check' } }"
            cancelText="关闭"
            :cancel-button-props="{ props: { icon: 'rollback' } }"
            :width="width"
            :centered="true"
            :visible="visible"
            :destroyOnClose="true"
            v-bind="$attrs"
            v-on="$listeners"
            @cancel="handleCancel"
        >
            <!-- <template #footer>
                <slot name="footer" :handleCancel="handleCancel"></slot>
            </template> -->
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
        hiddenOkButton: {
            type: Boolean,
            default: false,
        },
        isCancelClick: {
            type: Boolean,
            default: true,
        },
    },
    watch: {
        visible(val) {
            if (val) {
                this.$emit('show');
                this.$nextTick(() => {
                    //如果不延时，搜索框可能还未渲染完成，会找不到input报错
                    setTimeout(() => {
                        this.$focus(this.$refs.modal);
                    }, 100);
                });
            } else {
                this.$emit('close');
            }
        },
    },
    methods: {
        handleCancel() {
            if(!this.isCancelClick){
                return
            }
            this.$emit('update:visible', false);
        },
        handleRadio(){
            console.log('sssssssssssss');
        }
    },
};
</script>
<style scoped>
.hiddenOkButton >>> .ant-modal-footer .ant-btn-primary {
    display: none;
}
</style>
