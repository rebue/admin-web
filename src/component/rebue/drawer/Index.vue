<template>
        <a-drawer 
              ref="drawer"
              :title="title" 
              :width="width"
              :visible="drawerVisible"
              @close="onClose"
             >
              <ui-drawer-content ref="drawerContent"></ui-drawer-content>
        </a-drawer>
</template>
<script>
export default {
  props: {
    title: String, 
    width: {
      type:[String,Number],
      default: 256
    }
  },
  data() {
    return {
      drawerVisible: true, // 是否显示 Drawer
    };
  },
  components: {
    UiDrawerContent: {
      template: '<div></div>'
    }
  },
  methods: {
    onClose() {
      this.drawerVisible = false;
    }
  }
};
</script>
