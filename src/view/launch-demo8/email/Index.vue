// 电子邮件
<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs default-active-key="1" @change="callback">
                    <a-tab-pane key="1" tab="内部邮件">
                        <div>
                            <div>
                                <a-button type="primary" ghost style="float: left"> 收信 </a-button>
                                <a-button type="primary" ghost> 写信 </a-button>
                            </div>
                            <a-menu style="width: 150px" mode="inline" @click="handleClick">
                                <a-menu-item key="1"> 收件箱 </a-menu-item>
                                <a-menu-item key="2"> 草稿箱 </a-menu-item>
                                <a-menu-item key="3"> 废件箱 </a-menu-item>
                                <a-menu-item key="4"> 已发送 </a-menu-item>
                                <a-sub-menu title="最近联系人" inlineCollapsed="true">
                                    <a-menu-item>小明</a-menu-item>
                                    <a-menu-item>小红</a-menu-item>
                                    <a-menu-item>小何</a-menu-item>
                                    <a-menu-item>小梁</a-menu-item>
                                </a-sub-menu>
                            </a-menu>
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="外部邮件" force-render> 外部邮件</a-tab-pane>
                    <a-tab-pane key="3" tab="外部邮件配置"> 外部邮件配置 </a-tab-pane>
                    <a-tab-pane key="4" tab="邮件配置管理"> 邮件配置管理 </a-tab-pane>
                </a-tabs>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
    },
    data() {
        this.api = racRealmApi;
        return {};
    },
    mounted() {
        //
    },
    methods: {
        //
    },
};
</script>
