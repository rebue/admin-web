<template>
    <a-config-provider :getPopupContainer="getPopupContainer">
        <div id="app">
            <router-view />
        </div>
    </a-config-provider>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
    name: 'App',
    methods: {
        getPopupContainer(el, dialogContext) {
            if (dialogContext) {
                return dialogContext.getDialogWrap();
            } else {
                return document.body;
            }
        },
    },
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
}

html,
body {
    height: 100%;
}

#app {
    height: 100%;
}
</style>
