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
                    <p v-if="accountStore.orgFullName !== ''">{{ accountStore.orgFullName }}</p>
                </div>
            </a-card>
        </a-col>
        <a-col :span="18">
            <a-card>
                <a-tabs>
                    <a-tab-pane tab="委托"></a-tab-pane>
                    <a-tab-pane tab="被委托"></a-tab-pane>
                    <a-tab-pane tab="操作日志"></a-tab-pane>
                </a-tabs>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { observer } from 'mobx-vue';
import { accountStore } from '@/store/Store';
export default observer({
    name: 'PersonCenter',
    data() {
        return {
            accountStore,
        };
    },
});
</script>
<style lang="less" scoped>
.avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
