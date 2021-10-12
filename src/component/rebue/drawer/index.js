import Vue from 'vue'
import Drawer from './Index.vue'

/* $showDrawer 弹窗方法

* @params Child 弹窗内容自组件
* @params extOptions 组件混合配置
* @params drawerOptions 弹窗配置
*
* @return 弹窗实例
* */
Vue.prototype.$showDrawer = function(
  Child,
  extOptions = {},
  drawerOptions = {}
) {
  let NewDrawer = Object.create(Drawer)

  NewDrawer.components = {
    UiDrawerContent: {
      extends: Child, // 子组件
      mixins: [extOptions] // 优先级高于extends(Vue.js#1199) 组件混合配置
    }
  }
  let vm = new Vue(NewDrawer).$mount()
  // 混合Drawer 配置
  for (let key in drawerOptions) {
    if (drawerOptions.hasOwnProperty(key)) {
      vm[key] = drawerOptions[key]
    }
  }
  vm.$on('beforeDestroy', () => {
    vm.$el.parentNode.removeChild(vm.$el)
  })
  document.body.appendChild(vm.$el)
  return vm
}
