<template>
    <a-row :gutter="20">
        <a-col :span="6">
            <a-card title="关于">
                <div class="avatar">
                    <a-avatar
                        :size="100"
                        :icon="accountStore.avatar ? accountStore.avatar : 'user'"
                        :src="accountStore.avatar ? accountStore.avatar : undefined"
                    />
                    <p>{{ accountStore.nickname }}</p>
                    <div class="personal-wrap">
                        <div class="item">
                            <a-icon class="icon" type="mobile" /><span>手机</span
                            ><span>{{ accountStore.user.mobile }}</span>
                        </div>
                        <div class="item">
                            <a-icon class="icon" type="mail" /><span>邮箱</span
                            ><span>{{ accountStore.user.email }}</span>
                        </div>
                        <div class="item">
                            <a-icon class="icon" type="idcard" /><span>身份</span
                            ><span>{{ accountStore.user.idCard }}</span>
                        </div>
                        <div class="item">
                            <a-icon class="icon" type="team" /><span>组织</span
                            ><span>{{ accountStore.orgFullName }}</span>
                        </div>
                    </div>
                </div>
            </a-card>
        </a-col>
        <a-col :span="18" class="height-structh">
            <a-card class="height-structh">
                <a-tabs v-model="activeKey">
                    <a-tab-pane tab="安全中心" :key="1"></a-tab-pane>
                    <a-tab-pane tab="操作日志" :key="2"></a-tab-pane>
                    <a-tab-pane tab="委托" :key="3"></a-tab-pane>
                    <a-tab-pane tab="被委托" :key="4"></a-tab-pane>
                </a-tabs>
                <div>
                    <security-center v-if="activeKey === 1" />
                    <op-log v-if="activeKey === 2" />
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { observer } from 'mobx-vue';
import { accountStore } from '@/store/Store';
import SecurityCenter from '@/view/app/security-center/Main.vue';
import OpLog from '@/view/app/log/Index.vue';
export default observer({
    name: 'PersonCenter',
    components: {
        SecurityCenter,
        OpLog,
    },
    data() {
        return {
            accountStore,
            activeKey: 1,
        };
    },
});
</script>
<style lang="less" scoped>
.height-structh {
    height: 100%;
}
.avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.personal-wrap {
    color: #666;
    .item {
        padding: 12px 0;
        display: flex;
        align-items: center;
    }
    .icon {
        font-size: 20px;
        margin: 5px;
        + span {
            margin-right: 15px;
            min-width: 2em;
        }
    }
}
</style>
