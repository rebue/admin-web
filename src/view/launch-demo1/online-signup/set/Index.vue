<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs v-model="activeKey">
                    <a-tab-pane :key="1" tab="报名配置"></a-tab-pane>
                    <a-tab-pane :key="2" tab="选项管理"></a-tab-pane>
                    <a-tab-pane :key="3" tab="字段管理"></a-tab-pane>
                    <a-tab-pane :key="4" tab="报名风格"></a-tab-pane>
                    <a-tab-pane :key="5" tab="其他配置"></a-tab-pane>
                </a-tabs>
                <Tab1 v-if="activeKey == 1" />
                <Tab2 v-if="activeKey == 2" />
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import Tab1 from './Tab1.vue';
import Tab2 from './Tab2.vue';

export default {
    name: 'Manager',
    components: {
        BaseManager,
        Tab1,
        Tab2,
    },
    data() {
        this.api = {};
        const treeData = [
            {
                title: '主体班教学工作量统计流程',
                key: '20181',
            },
            {
                title: '公培处工作量统计流程',
                key: '20182',
            },
            {
                title: '应急部工作量统计流程',
                key: '20183',
            },
            {
                title: '网络部工作量统计流程',
                key: '20184',
            },
            {
                title: '领导力工作量统计流程',
                key: '20185',
            },
            {
                title: '党性教育工作量统计流程',
                key: '20186',
            },
        ];

        this.formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13 },
            },
        };
        return {
            expandedKeys: ['2018', '20181'],
            autoExpandParent: true,
            selectedKeys: [],
            checkedKeys: [],
            treeData,
            formData: {
                photo: {
                    label: '照片',
                    require: false,
                    show: true,
                },
                name: {
                    label: '姓名',
                    require: true,
                    show: true,
                },
                idCard: {
                    label: '身份证号',
                    require: true,
                    show: true,
                },
                level: {
                    label: '级别',
                    require: true,
                    show: true,
                },
                nation: {
                    label: '民族',
                    require: true,
                    show: true,
                },
                place: {
                    label: '籍贯',
                    require: true,
                    show: true,
                },
                graduation: {
                    label: '文化程度',
                    require: true,
                    show: true,
                },
            },
            activeKey: 1,
        };
    },
    mounted() {
        //
    },
    methods: {
        onCheck(checkedKeys, info) {
            console.log('onCheck', checkedKeys, info);
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
            this.selectedKeys = selectedKeys;
        },
        //
        allRequire(checked) {
            for (const key in this.formData) {
                this.formData[key].require = checked;
            }
        },
        allShow(checked) {
            for (const key in this.formData) {
                this.formData[key].show = checked;
            }
        },
    },
};
</script>
<style scoped>
.gap {
    padding: 10px 0;
}
</style>
