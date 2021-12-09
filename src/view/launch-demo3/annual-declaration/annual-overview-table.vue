<template>
    <base-manager>
        <template #managerCard>
            <crud-table
                ref="crudTable"
                :actions="tableActions"
                :columns="columns"
                :api="api"
                :scrollX="300"
                :defaultPagination="true"
            >
                <template #commands>
                    <a-row type="flex">
                        <a-col :span="20">
                            <a-form-model layout="inline" :model="formInline">
                                <a-form-model-item label="作者姓名">
                                    <a-input style="width: 195px" v-model="formInline.name"> </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="部门名称">
                                    <a-select style="width: 195px" v-model="formInline.user" placeholder="请选择部门">
                                        <a-select-option value="全部">
                                            全部
                                        </a-select-option>
                                        <a-select-option value="学校">
                                            学校
                                        </a-select-option>
                                        <a-select-option value="个人">
                                            个人
                                        </a-select-option>
                                    </a-select>
                                </a-form-model-item>
                                <a-form-model-item label="成果名称">
                                    <a-input v-model="formInline.achievementName"> </a-input>
                                </a-form-model-item>
                                <a-form-model-item label="起始时间">
                                    <a-date-picker
                                        style="min-width: 195px;"
                                        placeholder="开始时间"
                                        v-model="formInline.startTime"
                                        show-time
                                        type="date"
                                        class="dateType"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="结束时间">
                                    <a-date-picker
                                        style="min-width: 195px;"
                                        placeholder="结束时间"
                                        v-model="formInline.endTime"
                                        show-time
                                        type="date"
                                        class="dateType"
                                    />
                                </a-form-model-item>
                                <a-form-model-item label="审核状态">
                                    <a-input v-model="formInline.status" type="text" placeholder=""> </a-input>
                                </a-form-model-item>
                            </a-form-model>
                        </a-col>
                        <a-col :span="4">
                            <a-button>查找</a-button>
                            <a-button style="margin-left: 10px">导出</a-button>
                        </a-col>
                    </a-row>
                </template>
            </crud-table>
        </template>
    </base-manager>
</template>

<script>
import CrudTable from '../../../component/rebue/CrudTable';
import { racRealmApi } from '@/api/Api';
import BaseManager from '@/component/rebue/BaseManager';
import baseSearch from '../search/baseSearch';

export default {
    name: 'annual-overview-table',
    components: {
        // eslint-disable-next-line vue/no-unused-components
        CrudTable,
        // eslint-disable-next-line vue/no-unused-components
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        baseSearch,
    },
    data() {
        const page = function() {
            const p = new Promise(resolve => {
                // const Mock = require('mockjs');
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
                    'list|1-20': [
                        {
                            'id|+1': 10000000,

                            'achievementNo|10001-99999': 99999,
                            memberName: '@cname',
                            sex: '@pick(["男", "女"])',
                            author: '@cname',
                            // 'idCard|1-100000000000000000': 12345679012345678,
                            // 'cardId|1-1000000': 193201,
                            // 'qrcode|1-1000000': 193201,
                            status: '@pick(["审核中", "审核通过","审核未通过"])',
                            department:
                                '@pick(["党委办公室、校长办公室",' +
                                '"党委组织部",' +
                                '"党委宣传部",' +
                                '"党委统战部",' +
                                '"学生工作部（处）",' +
                                '"党委教师工作部、人事处",' +
                                '"教务处",' +
                                '"科研处",' +
                                '"财务处",' +
                                '"审计处",' +
                                '"国有资产管理处",' +
                                '"武装部、后勤保卫处",' +
                                '"基建处",' +
                                '"离退休工作处",' +
                                '"纪委办公室、监察室",' +
                                '"工会",' +
                                '"团委",' +
                                '"图书馆",' +
                                '"现代教育技术中心",' +
                                '"学报编辑部",' +
                                '"会计与审计学院",' +
                                '"工商管理学院",' +
                                '"计算机与信息工程学院",' +
                                '"土木建筑工程学院",' +
                                '"经济与贸易学院",' +
                                '"旅游与公共管理学院",' +
                                '"传媒学院",' +
                                '"外国语与国际教育学院",' +
                                '"教育学院",' +
                                '"马克思主义学院",' +
                                '"继续教育学院"])',
                            achievementName:
                                '@pick(["磁性纳米材料的化学设计、控制合成及其应用基础研究",' +
                                '"大气复合污染条件下新粒子生成与增长及其致霾机制",' +
                                '"动态系统运行安全性评估理论与方法",' +
                                '"纳米材料热物性测量原理、导热规律与性能调控",' +
                                '"Pinkall-Sterling猜想和超曲面几何的研究",' +
                                '"污水化学能定向转化机制与原位利用新方法",' +
                                '"混凝土性能的水作用机理与控制方法",' +
                                '"基于位错机制的微纳尺度晶体塑性理论、数值方法和应用",' +
                                '"东北特定环境下典型水系污染过程及环境效应",' +
                                '"大城市复杂交通流特性分析及管控策略研究",' +
                                '"青藏高原南部拉萨地体的起源和演化",' +
                                '"太赫兹亚波长光子学调控研究",' +
                                '"金属-有机限域空间的可控构筑和催化基础研究",' +
                                '"结构运营模态测-辨相和理论",' +
                                '"复杂约束下结构优化设计理论与方法",' +
                                '"生产全流程多目标动态优化决策与控制一体化理论及应用",' +
                                '"CALYPSO凝聚态物质结构预测方法与应用",' +
                                '"高压实膨润土的热-水-力-化耦合特性及缓冲机理",' +
                                '"精神疾病关键基因的精细定位研究",' +
                                '"三维基因组调控与功能研究",' +
                                '"云安全的关键理论与方法研究",' +
                                '"炎症及相关疾病治疗的新靶点和新策略研究",' +
                                '"遗传变异产生的分子基础",' +
                                '"青藏高原东缘深部构造和陆-陆碰撞深部响应",' +
                                '"活性自由基高效产生方法及去除水中有害有机污染物机理的研究",' +
                                '"多尺度多相过程中的相间作用机理研究",' +
                                '"果实采后木质化和软化及其调控的生物学机制",' +
                                '"胶辽吉带古元古代构造-热演化与早前寒武纪构造体制巨变",' +
                                '"认知和情感障碍性疾病发病机制和药物靶点",' +
                                '"云计算环境下虚拟机资源管理基础理论与核心方法",' +
                                '"微能源/传感器件微纳功能结构的形成机制与性能调控",' +
                                '"分级纳米线复合材料的制备科学与储能性能优化",' +
                                '"夸克胶子新物质形态的喷注层析研究",' +
                                '"前寒武纪/寒武纪和新生代古海洋环境的地球化学和同位素示踪研究",' +
                                '"甜橙基因组及果实色泽品质形成机制",' +
                                '"脱氧核酶分子识别体系构建及生物分析应用",' +
                                '"肝癌生长和转移的多维调控网络及意义",' +
                                '"与微分算子相联系的调和分析理论及其应用",' +
                                '"复杂动力系统的分解与规范化",' +
                                '"不易成炭高分子材料的高效凝聚相阻燃体系构建及其作用机制",' +
                                '"轮轨滚动疲劳磨损机理研究",' +
                                '"岩石材料裂纹演化机理及非连续数值方法研究",' +
                                '"多场耦合能质传递强化及调控理论与方法",' +
                                '"电动汽车动力电池及系统状态量高精度估计理论与方法",' +
                                '"金属表面特殊浸润性的仿生构筑与性能研究",' +
                                '"电液伺服系统自适应抗扰非线性控制",' +
                                '"应用生物材料激活成年内源性神经发生修复中枢神经损伤",' +
                                '"有机-无机复合膜的亚纳米通道构筑及其分离性能研究",' +
                                '"高稳定性有机半导体的四元设计原理、绿色加工及光电器件"])',
                            // company: '@pick(["南宁市迈越研发中心", "成都迈越研发中心"])',
                            // flag: '@pick(["是", "否"])',
                            applyTime: '@now("yyyy-MM-dd")',
                            // lastChecker: '@cname()',
                            // by: '@pick(["自驾","公交","火车", "飞机"])',
                            // arriveTime: '@now("yyyy-MM-dd")',
                            // meet: '@pick(["是", "否"])',
                            // 'realmId|+1': ['default', 'platform', 'ops'],
                            //'opType': '@pick(["锁定", "启用"])',
                            //'opTitle': '@title()',
                            //'opDetail': '@cparagraph',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 20,
                        },
                        list: dataSource,
                    },
                };
                resolve(ro);
            });

            return p;
        };

        this.api = {
            page,
            listAll: page,
            list: page,
        };

        const columns = [
            {
                dataIndex: 'no',
                title: '序号',
                width: 80,

                scopedSlots: { customRender: 'serial' },
            },
            {
                dataIndex: 'achievementNo',
                title: '成果编号',
                width: 150,
            },
            {
                dataIndex: 'memberName',
                title: '填报人',
                width: 140,
            },
            {
                dataIndex: 'author',
                title: '作者',

                width: 150,
            },
            {
                dataIndex: 'department',
                title: '部门',
                width: 180,
            },
            {
                dataIndex: 'achievementName',
                title: '成果名称',
                width: 300,
            },
            {
                dataIndex: 'applyTime',
                title: '申请日期',
                width: 180,
            },
            {
                dataIndex: 'status',
                title: '状态',
                width: 150,
            },
            {
                dataIndex: 'action',
                title: '操作',
                width: 150,

                scopedSlots: { customRender: 'action' },
            },
        ];

        this.tableActions = [
            {
                type: 'a',
                title: '修改',
                onClick: record => this.handleEdit(record),
            },
            {
                type: 'confirm',
                title: '删除',
                confirmTitle: '你确定要删除本条记录吗?',
                onClick: record => this.handleDel(record),
            },
            {
                type: 'a',
                title: '查看',

                onClick: record => this.handleEdit(record),
            },
        ];

        return {
            columns,

            formInline: {
                user: '',
                password: '',
                name: '',
                achievementName: '',
                startTime: '',
                endTime: '',
                status: '',
            },
        };
    },
    mounted() {
        this.crudTable = this.$refs.crudTable;
    },
    methods: {
        search() {
            console.log(this.api);
        },
    },
};
</script>

<style scoped></style>
