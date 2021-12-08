<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row type="flex">
                    <a-col :span="5">
                        <ul class="left-btn">
                            <li><a>新学员调查问卷</a></li>
                            <li><a>险地求生</a></li>
                            <li><a>事业单位党建工作调查问卷</a></li>
                            <li><a>后勤服务中心意见征询表</a></li>
                            <li><a>广西党校工作者”职业幸福感“</a></li>
                            <li><a>”感“调查问卷</a></li>
                        </ul>
                    </a-col>
                    <a-col :span="1">
                        <a-divider type="vertical" style="height:100%"></a-divider>
                    </a-col>
                    <a-col :span="18">
                        <a-tabs default-active-key="1" @change="callback">
                            <a-tab-pane key="1" tab="问卷调查">
                                <div style="margin-bottom:10px">
                                    <a-button class="btn">新增</a-button>
                                    <a-button class="btn">删除</a-button>
                                    <a-button class="btn">导出</a-button>
                                </div>
                                <a-divider />
                                <a-row type="flex">
                                    <a-col :span="6">
                                        <div v-show="showOrg" class="table-left">
                                            <org-tree
                                                :ref="`orgTree.platform`"
                                                :show.sync="showOrg"
                                                realmId="platform"
                                                @click="handleOrgMenuClick"
                                                @select="handleOrgTreeSelect"
                                            />
                                        </div>
                                    </a-col>
                                    <a-col :span="1">
                                        <a-divider type="vertical" style="height:100%"></a-divider>
                                    </a-col>
                                    <a-col :span="17">
                                        <div>
                                            <div style="overflow: hidden">
                                                <center>
                                                    <h1>新学员调查问卷</h1>
                                                </center>
                                                <p style="color: red;text-align:center">
                                                    测评开放时间:2021-12-06 00:00:00 至 2021-12-31 23:59:59
                                                </p>
                                                <div style="margin-top: 50px">
                                                    <p style="font-size: 17px">
                                                        您来党校的最关注的问题是什么？ （一百字以内）
                                                    </p>
                                                    说明:广西区党校开展的晚簸习活动，是由学员利用部分晚自习时间，目行组织开展的形式多样、自由灵活的团队学习模式，旨在为学员推供充分学习、交流和实训的平台，推指字项的球导力。其中的“求是社区”旨在围绕学员共同关心关注的问题分社区和小组进行团体性研讨交流、分摩经验，寻找破解难题之策，为党委、政府或个人工作提供决策参考。请你就诸如“你最关往的基层实际问题是什么“、”你在实际工作中遇到的最需要研讨的问题是什么“、”你到党校学习期间最希望研讨交流并得到解执或启示的问题是什么”"和“学习1.大后你最关注的间题又是什么”等问题法行思考，并把你思考的结果填人此表。并请你在人学报到时上交。
                                                    <br />
                                                    <a-textarea
                                                        style="height: 100px;max-height: 100px;background-color: rgb(235,235,228)"
                                                    ></a-textarea>
                                                </div>
                                            </div>
                                            <center>
                                                <a-button type="primary" style="margin-top: 20px">提交</a-button>
                                            </center>
                                        </div>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                        </a-tabs>
                    </a-col>
                </a-row>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import CrudTable from '@/component/rebue/CrudTable.vue';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import { racAccountApi } from '@/api/Api';
import OrgTree from '@/view/rac/rac-org/Tree';

export default {
    name: 'evaluation-template',
    components: {
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        OrgTree,
    },
    props: [],
    data() {
        this.api = racAccountApi;

        const columns = [
            {
                dataIndex: 'photo',
                title: '头像',

                width: 100,
            },
            {
                dataIndex: 'name2',
                title: '姓名',

                width: 100,
            },
            {
                dataIndex: 'sex',
                title: '性别',
                width: 100,
            },
            {
                dataIndex: 'mobile',
                title: '移动电话',
                ellipsis: true,
            },
            {
                dataIndex: 'GdMobile',
                title: '固定电话',
                ellipsis: true,
            },
            {
                dataIndex: 'department',
                title: '部门',
                ellipsis: true,
            },
            {
                dataIndex: 'work',
                title: '职务',
            },
            // {
            //     dataIndex: 'action',
            //     title: '操作',
            //     width: 150,
            //
            //     scopedSlots: { customRender: 'action' },
            // },
        ];

        this.tableCommands = [
            // {
            //     buttonType: 'primary',
            //     icon: 'plus',
            //     title: '新建',
            //     onClick: this.handleAdd,
            // },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '编辑',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            columns,
            form: '',
            showOrg: false,
        };
    },

    mounted() {
        this.editForm = this.$refs.editForm;
        this.crudTable = this.$refs.crudTable;
    },
    computed: {},
    // created() {},
    // mounted() {},
    // destroyed() {},
    methods: {},
    watch: {},
    filters: {},
};
</script>

<style scoped>
.btn {
    margin-right: 10px;
}
.left-btn {
    list-style-type: none;
}
.left-btn li {
    height: 30px;
    line-height: 30px;
    color: #000;
}
.left-btn li a {
    padding-left: 10px;
    color: #000;
}
.left-btn li:hover {
    background-color: rgb(183, 227, 254);
}
</style>
