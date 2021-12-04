<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div>
                    <a-button class="btn">新增</a-button>
                    <a-button class="btn">复制</a-button>
                    <a-button class="btn">粘贴</a-button>
                    <a-button class="btn">查看大图</a-button>
                    <a-select default-value="lucy" style="width: 220px">
                        <a-select-option value="lucy">
                            显示研究生模版
                        </a-select-option>
                    </a-select>
                </div>
                <a-divider></a-divider>
                <div>
                    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="dataSource">
                        <a-list-item slot="renderItem" slot-scope="item">
                            <a-card>
                                <img :src="require('./img/graduation.jpeg')" alt="" width="100%" />
                                <div style="padding:5px 0;text-align:center">{{ item.title }}</div>
                            </a-card>
                        </a-list-item>
                    </a-list>
                </div>
            </template>
        </base-manager>
    </fragment>
</template>
<script>
import BaseManager from '@/component/rebue/BaseManager';
export default {
    name: 'Manager',
    components: {
        BaseManager,
    },
    data() {
        return {
            dataSource: [
                {
                    title: '研究生毕业证模版',
                },
                {
                    title: '研究生毕业证模版(小)',
                },
            ],
        };
    },
};
</script>
<style type="text/css">
.btn {
    margin-right: 10px;
}
</style>
