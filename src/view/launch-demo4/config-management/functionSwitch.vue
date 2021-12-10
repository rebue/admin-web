<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-tabs v-model="activeKey">
                        <a-tab-pane :key="1" tab="招生管理"></a-tab-pane>
                        <a-tab-pane :key="2" tab="准考证"></a-tab-pane>
                        <a-tab-pane :key="3" tab="网上报名"></a-tab-pane>
                    </a-tabs>
                    <Tab1 v-if="activeKey == 1" />
                    <Tab2 v-if="activeKey == 2" />
                    <Tab3 v-if="activeKey == 3" />
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import Tab1 from './Tab1.vue';
import Tab2 from './Tab2.vue';
import Tab3 from './Tab3.vue';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        Tab1,
        Tab2,
        Tab3,
    },
    data() {
        return {
            activeKey: 1,
        };
    },
};
</script>
