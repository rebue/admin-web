<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div>
                    <a-button class="btn">新增</a-button>
                    <a-button class="btn">删除</a-button>
                    <a-button class="btn">最大化</a-button>
                    <a-button class="btn">移动</a-button>
                </div>
                <a-divider></a-divider>
                <div>
                    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="dataSource">
                        <a-list-item slot="renderItem" slot-scope="item">
                            <a-card>
                                <div class="spin">
                                    <a-checkbox></a-checkbox>
                                </div>
                                <img :src="require(`./img/${item.index}.png`)" alt="" width="200" height="130" />
                                <!-- <a-icon :type="item.icon" theme="twoTone" :style="{ fontSize: '48px' }" /> -->
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
                    title: '课程报名',
                    index: 1,
                },
                {
                    title: '科研项目申报',
                    index: 2,
                },
                {
                    title: '工作审批OA',
                    index: 3,
                },
                {
                    title: '校内宣传阵地管理',
                    index: 4,
                },
                {
                    title: '成绩管理',
                    index: 5,
                },
                {
                    title: '学籍异动',
                    index: 6,
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
.spin {
    position: absolute;
    left: 5px;
    top: 5px;
}
</style>
