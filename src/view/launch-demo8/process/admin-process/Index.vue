<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div style="margin-bottom:10px">
                    <a-button class="btn">导入流程</a-button>
                    <a-button class="btn">删除</a-button>
                    <a-button class="btn">保存</a-button>
                    <a-button class="btn">排序</a-button>
                    <a-button class="btn">构建</a-button>
                    <a-button class="btn">复制权限</a-button>
                    <a-button class="btn">粘贴权限</a-button>
                </div>
                <a-divider />
                <a-row type="flex">
                    <a-col span="5">
                        <div style="overflow: scroll;margin-top: 5px">
                            <a-tree
                                style="margin-left: -30px;margin-top: -20px"
                                class="ant-card-body"
                                v-model="checkedKeys"
                                :default-selected-keys="selectedKeys"
                                :default-checked-keys="checkedKeys"
                                @Click="onCheck"
                                :tree-data="treeData"
                                :defaultExpandAll="true"
                            />
                        </div>
                    </a-col>
                    <a-col span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col span="18">
                        <a-tabs default-active-key="2">
                            <a-tab-pane key="1" tab="流程图"> </a-tab-pane>
                            <a-tab-pane key="2" tab="流程属性">
                                <div style="overflow: scroll;padding: 10px">
                                    <a-form-model :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }">
                                        <a-form-model-item label="业务主题">
                                            <a-select v-model="form.region" placeholder="">
                                                <a-select-option value="bangong">
                                                    办公管理
                                                </a-select-option>
                                                <a-select-option value="xingzheng">
                                                    行政管理
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="流程编码">
                                            <a-input></a-input>
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="流程名称">
                                            <a-input></a-input>
                                        </a-form-model-item>
                                        <a-form-model-item label="流程图片">
                                            <a-button style="height: 80px;width: 80px">图片</a-button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <a-button>选择</a-button>
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="流程备注">
                                            <a-textarea></a-textarea>
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="流程属性">
                                            <a-select v-model="form.region" placeholder="">
                                                <a-select-option value="bangong">
                                                    独立流程
                                                </a-select-option>
                                                <a-select-option value="xingzheng">
                                                    模型
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="流程状态">
                                            <a-select v-model="form.region" placeholder="">
                                                <a-select-option value="bangong">
                                                    使用
                                                </a-select-option>
                                                <a-select-option value="xingzheng">
                                                    未使用
                                                </a-select-option>
                                            </a-select>
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="监控人">
                                            <a-input></a-input>
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="启用时间">
                                            <a-date-picker
                                                show-time
                                                type="date"
                                                placeholder="Pick a date"
                                                style="width: 70%;"
                                            />
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="停用时间">
                                            <a-date-picker
                                                show-time
                                                type="date"
                                                placeholder="Pick a date"
                                                style="width: 70%;"
                                            />
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="创建时间">
                                            <a-date-picker
                                                v-model="form.date1"
                                                show-time
                                                type="date"
                                                placeholder="Pick a date"
                                                style="width: 70%;"
                                            />
                                        </a-form-model-item>
                                        <a-form-model-item style="margin-top: -15px" label="创建人">
                                            <a-input></a-input>
                                        </a-form-model-item>
                                    </a-form-model>
                                </div>
                            </a-tab-pane>
                            <a-tab-pane key="3" tab="权限管理"> </a-tab-pane>
                            <a-tab-pane key="4" tab="流程说明"> </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '../../../../component/rebue/BaseManager';

export default {
    name: 'admin-process',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
    },
    props: [],
    data() {
        const treeData = [
            {
                title: '办公管理',
                key: '8',
                children: [
                    {
                        title: '网上发布（部门新闻）',
                        key: '20181',
                    },
                    {
                        title: '邀请函',
                        key: '10',
                    },
                    {
                        title: '接待审批流程',
                        key: '101',
                    },
                    {
                        title: '收文办理（校内呈文）',
                        key: '102',
                    },
                    {
                        title: '新版出差',
                        key: '103',
                    },
                    {
                        title: '审批表',
                        key: '104',
                        children: [
                            {
                                title: '审批表',
                                key: '20181',
                            },
                            {
                                title: '发文办理（红头文件）',
                                key: '101',
                            },
                            {
                                title: '收文办理（红头文件）',
                                key: '1011',
                            },
                            {
                                title: '网上发布（通知公告）',
                                key: '1021',
                            },
                            {
                                title: '网上发布（校园新闻）',
                                key: '1032',
                            },
                            {
                                title: '出差（离出请示）审批',
                                key: '1031',
                            },
                        ],
                    },
                    {
                        title: '表',
                        key: '104',
                        children: [
                            {
                                title: '接待审批流程v1.1',
                                key: '201811',
                            },
                            {
                                title: '接待审批流程v1',
                                key: '10112',
                            },
                            {
                                title: '收文办理（校外来文）',
                                key: '10111',
                            },
                            {
                                title: '新版收文办理（校外来文）',
                                key: '10211',
                            },
                            {
                                title: '接待事项',
                                key: '1032',
                            },
                        ],
                    },
                    {
                        title: '行政管理',
                        key: '1041',
                        children: [
                            {
                                title: '文印登记',
                                key: '201811',
                            },
                            {
                                title: '加班登记',
                                key: '101121',
                            },
                            {
                                title: '请假申请',
                                key: '101111',
                            },
                            {
                                title: '任务流程',
                                key: '10211',
                            },
                            {
                                title: '任务流程',
                                key: '1032',
                            },
                            {
                                title: '事务通知',
                                key: '10321',
                            },
                        ],
                    },
                ],
            },
        ];
        return {
            treeData,
            tab: [],
            checkedKeys: '',
            form: '',
            baseUrl: process.env.BASE_URL,
        };
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {
        onCheck() {
            //
        },
    },
    watch: {},
    filters: {},
};
</script>

<style scoped>
.btn {
    margin-right: 10px;
}
</style>
