<template>
    <div class="h-dialog">
        <a-modal 
              ref="dialog"
              v-model="dialogVisible"
              :title="dialogTitle" 
              :width="width"
              :wrapClassName="wrapClassName"
              :dialogClass="dialogClass"
              :closable="closable"
              :maskClosable="maskClosable"
              :destroyOnClose="destroyOnClose"
              :footer="footer"
              okText="提交"
              :ok-button-props="{ props: { icon: 'check' } }"
              cancelText="返回"
              :cancel-button-props="{ props: { icon: 'rollback' } }"
              @cancel="closeDialog"
              @ok="handleOk">
              <ui-dialog-content ref="dialogContent"></ui-dialog-content>
        </a-modal>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
</style>
<script>
export default {
  provide () {
    return {
      closeDialog: this.closeDialog
    }
  },
  props: {
    title: String, // Dialog 的标题
    width: String, // Dialog 的宽度
    wrapClassName: String,
    dialogClass: String,
    closable: { // 是否显示右上角的关闭按钮	
      type: Boolean,
      default: true
    },
    maskClosable: { // 是否可通过点击遮罩关闭 Dialog
      type: Boolean,
      default: true
    },
    destroyOnClose: { // 是否可通过点击遮罩关闭 Dialog
      type: Boolean,
      default: false
    },
    footer:String
  },
  data() {
    return {
      dialogVisible: true, // 是否显示 Dialog
      dialogTitle: '' // Dialog 的标题
    };
  },
  components: {
    UiDialogContent: {
      template: '<div></div>'
    }
  },
  methods: {
    closeDialog() {
      this.$emit('beforeDestroy');
      this.dialogVisible = false;
      this.$destroy();
    },
    handleOk() {
        if(this.$refs.dialogContent.ok) {
          this.$refs.dialogContent.ok()
        }
        else {
          this.closeDialog()
        }
        
    }
  },
  watch: {
    'title': {
      handler(val) {
        // 设置弹窗标题
        this.dialogTitle = val;
      },
      immediate: true
    }
  }
};
</script>

<style>
.h-dialog-form-footer {
  text-align: center;
}
</style>