import Vue from 'vue'
import Dialog from './Index.vue'

/* $showDialog 弹窗方法

* @params Child 弹窗内容自组件
* @params extOptions 组件混合配置
* @params dialogOptions 弹窗配置
*
* @return 弹窗实例
* */
Vue.prototype.$showDialog = function(
  Child,
  extOptions = {},
  dialogOptions = {}
) {
  let NewDialog = Object.create(Dialog)

  NewDialog.components = {
    UiDialogContent: {
      inject: ['closeDialog'],
      mounted() {
        // 弹窗内容有表单域，默认获取焦点
        if (this.$refs.input && this.$refs.input.$el.children[0]) {
          this.$refs.input.$el.children[0].focus()
        }
      },
      extends: Child, // 子组件
      mixins: [extOptions] // 优先级高于extends(Vue.js#1199) 组件混合配置
    }
  }
  let vm = new Vue(NewDialog).$mount()
  // 混合Dialog 配置
  for (let key in dialogOptions) {
    if (dialogOptions.hasOwnProperty(key)) {
      vm[key] = dialogOptions[key]
    }
  }
  vm.$on('beforeDestroy', () => {
    vm.$el.parentNode.removeChild(vm.$el)
  })
  document.body.appendChild(vm.$el)
  return vm
}
