<template>
    <div>
      <a-button @click="open">点击弹窗</a-button>
    </div>
</template>
<style lang="less" rel="stylesheet/less">
</style>
<script>
export default {
  
  methods: {
    open() {
      const that = this
      this.$showDailog(require('./demo.vue').default, {
        methods:{
          callback(res) {
            console.log('----callback', res);
            that.refresh()
          }
        }
      }, {footer:null})
    },
    refresh(){
      console.log('---refresh');
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