<template>
    <fragment>
        <div>
            选择学期：
            <a-select default-value="lucy" style="width: 220px">
                <a-select-option value="lucy">
                    2021年秋季学期
                </a-select-option>
            </a-select>
        </div>
        <a-row>
            <a-col :span="6">
                <a-tree
                    class="ant-card-body"
                    v-model="checkedKeys"
                    :auto-expand-parent="autoExpandParent"
                    :default-selected-keys="selectedKeys"
                    :default-checked-keys="checkedKeys"
                    :default-expanded-keys="expandedKeys"
                    :tree-data="treeData"
                    @check="onCheck"
                />
            </a-col>
            <a-col :span="18">
                <a-row class="gap">
                    <a-col :span="8">请选择实际用到的报名选项</a-col>
                    <a-col :span="8">是否必填</a-col>
                    <a-col :span="8">是否显示</a-col>
                </a-row>
                <a-row class="gap" style="background: #ededed;">
                    <a-col :span="8"><a-icon type="caret-down" />个人概况</a-col>
                    <a-col :span="8"><a-switch @change="allRequire" />全选</a-col>
                    <a-col :span="8"><a-switch @change="allShow" />全选</a-col>
                </a-row>
                <a-row v-for="item in formData" :key="item.label" class="gap">
                    <a-col :span="8">{{ item.label }}</a-col>
                    <a-col :span="8"><a-switch v-model="item.require"/></a-col>
                    <a-col :span="8"><a-switch v-model="item.show"/></a-col>
                </a-row>
            </a-col>
        </a-row>
    </fragment>
</template>

<script>
export default {
    name: 'Manager',
    components: {},
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
