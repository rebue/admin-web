<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-row>
                    <a-col span="4">
                        <div style="width: 200px;min-height: 700px;float: left;margin-left: -24px;margin-top:-24px;">
                            <ul class="left-btn">
                                <li><a>后勤服务中心意见征询表</a></li>
                                <li><a>新学员调查问卷</a></li>
                                <li><a>事业单位党建工作调查问卷</a></li>
                                <li><a>险地求生</a></li>
                                <li><a>广西区党校工作者”职业幸福“</a></li>
                                <li><a>”感“调查问卷</a></li>
                            </ul>
                        </div>
                    </a-col>
                    <a-col span="20">
                        <div
                            style="float: left;margin-top: -20px;margin-left: 10px;width: 1000px;border-left:2px solid rgb(213,213,213);overflow: hidden"
                        >
                            <p>问卷<span style="color:#2d59b3;">[后勤服务中信意见征询表]</span>权限分组</p>
                            <div
                                style="height: 300px;width: 1000px;background-color: rgb(239,239,239);overflow: hidden;overflow: auto"
                            >
                                <a-tree
                                    style="margin-left: -30px;margin-top: -20px"
                                    class="ant-card-body"
                                    v-model="checkedKeys"
                                    :default-selected-keys="selectedKeys"
                                    :default-checked-keys="checkedKeys"
                                    @Click="onCheck"
                                    :tree-data="treeData"
                                />
                            </div>
                            <p>
                                <span style="color:#2d59b3;">[平时考勤管理员]</span><span>分组权限</span
                                ><span>&nbsp;查看分组成员</span>
                            </p>

                            <table style="line-height: 25px">
                                <tr>
                                    <td style="width: 500px">结果查看</td>
                                    <td style="width: 200px"><input type="radio" name="name1" />允许</td>
                                    <td style="width: 200px"><input type="radio" name="name1" />拒绝</td>
                                </tr>
                                <tr>
                                    <td style="width: 500px">结果修改</td>
                                    <td style="width: 200px"><input type="radio" name="name2" />允许</td>
                                    <td style="width: 200px"><input type="radio" name="name2" />拒绝</td>
                                </tr>
                                <tr>
                                    <td style="width: 500px">问卷设置</td>
                                    <td style="width: 200px"><input type="radio" name="name3" />允许</td>
                                    <td style="width: 200px"><input type="radio" name="name3" />拒绝</td>
                                </tr>
                                <tr>
                                    <td style="width: 500px">新增问卷</td>
                                    <td style="width: 200px"><input type="radio" name="name4" />允许</td>
                                    <td style="width: 200px"><input type="radio" name="name4" />拒绝</td>
                                </tr>
                                <tr>
                                    <td style="width: 500px">内容查看</td>
                                    <td style="width: 200px"><input type="radio" name="name5" />允许</td>
                                    <td style="width: 200px"><input type="radio" name="name5" />拒绝</td>
                                </tr>
                                <tr>
                                    <td style="width: 500px">新增内容</td>
                                    <td style="width: 200px"><input type="radio" name="name6" />允许</td>
                                    <td style="width: 200px"><input type="radio" name="name6" />拒绝</td>
                                </tr>
                                <tr>
                                    <td style="width: 500px">设置权限</td>
                                    <td style="width: 200px"><input type="radio" name="name7" />允许</td>
                                    <td style="width: 200px"><input type="radio" name="name7" />拒绝</td>
                                </tr>
                                <tr>
                                    <td style="width: 500px"><input type="checkbox" />关联设置</td>
                                </tr>
                            </table>
                        </div>
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
        const treeData = [
            { title: '一卡通管理员', key: '1' },
            { title: '一联通管理员组', key: '2' },
            { title: '默认分组', key: '3' },
            { title: '院20180917', key: '4' },
            { title: '选号提示组', key: '5' },
            { title: '选修课管理', key: '6' },
            { title: '选号提示组', key: '7' },
            {
                title: '教学系统',
                key: '8',
                children: [
                    {
                        title: '教学管理系统',
                        key: '20181',
                        children: [
                            {
                                title: '课程提纲',
                                key: '9',
                            },
                        ],
                    },
                    {
                        title: '教学评估查询',
                        key: '10',
                        children: [
                            {
                                title: '评估查询',
                                key: '11',
                            },
                            {
                                title: '教学评估数据查看',
                                key: '12',
                            },
                        ],
                    },
                ],
            },
            {
                title: '教学工作量',
                key: '13',
                children: [
                    {
                        title: '主体班工作量角色',
                        key: '14',
                        children: [
                            {
                                title: '主体班任课教师',
                                key: '15',
                            },
                            {
                                title: '教学工作量部门领导',
                                key: '16',
                            },
                            {
                                title: '教务处管理员',
                                key: '17',
                            },
                        ],
                    },
                    {
                        title: '研究生班工作量角色',
                        key: '18',
                        children: [
                            {
                                title: '教师',
                                key: '19',
                            },
                            {
                                title: '公培处工作量部门领导组',
                                key: '20',
                            },
                            {
                                title: '研究生管理员',
                                key: '21',
                            },
                        ],
                    },
                    {
                        title: '其他工作量角色',
                        key: '22',
                        children: [
                            {
                                title: '非主体班管理员',
                                key: '23',
                            },
                            {
                                title: '申报老师',
                                key: '24',
                            },
                            {
                                title: '其他工作量部门领导',
                                key: '25',
                            },
                            {
                                title: '应急部门申报',
                                key: '26',
                            },
                        ],
                    },
                ],
            },
        ];

        return {
            loading: false,
            curRealmId: '',
            manageMenusFormVisible: false,
            curApp: {},
            realms: [],
            checkedKeys: '',
            treeData,
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
    methods: {
        onCheck(v) {
            //
        },
        onLoadData(treeNode) {
            return new Promise(resolve => {
                if (treeNode.dataRef.children) {
                    resolve();
                    return;
                }
                this.treeData = [this.treeData];
                resolve();
            });
        },
    },
    watch: {},
    filters: {},
};
</script>

<style scoped>
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
