<template>
    <!-- <a-table :columns="columns" :api="api" :data-source="data" bordered>
  </a-table> -->
    <crud-table ref="crudTable" :columns="columns" :api="api" :scrollX="600" :defaultPagination="false"> </crud-table>
</template>
<script>
import CrudTable from '@/component/rebue/CrudTable.vue';

export default {
    components: {
        // BaseManager,
        // EditForm,
        CrudTable,
    },
    data() {
        // 初始化数据start
        const page = function() {
            const p = new Promise(resolve => {
                const mockList = require('mockjs').mock({
                    // 属性 list 的值是一个数组，其中含有 1 到  个元素
                    'list|8': [
                        {
                            'demo|+1': ['党性教育"制高点”(30分)', '学习成果“亮点”(30分)'],
                            'specific|+1': [
                                '作为班级选手(代表)参加跨班主题党日等活动一-次',
                                '作为选手(代表)参加党性讲堂、党性分析等班级集体活动',
                                '未参加党组织生活或党性分析活动- -次',
                                '热心为班集体或他人服务，表现突出，得到公认',
                                '“我为国家(广西)发展献-策"，咨政报告获得《党校要报》等采用上报',
                                '“我为国家(广西)发展献一策",咨政报告获得自治区领导批示',
                                '“我为国家(广西)发展献一策"，咨政报告获得党和国家领导人批示',
                                '咨政报告被评为优秀、良好、中等、合格',
                            ],
                            number: '+@integer(1,9)',
                            score: '@integer(60,100)',
                        },
                    ],
                });
                // 数据列表在这里设置
                const dataSource = mockList.list;
                const ro = {
                    extra: {
                        page: {
                            list: dataSource,
                            total: 8,
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
                title: '项目',
                dataIndex: 'demo',
                width: 250,
                customRender: (value, row, index) => {
                    const obj = {
                        children: value,
                        attrs: {},
                    };
                    //第一大行
                    if (index === 0) {
                        obj.attrs.rowSpan = 4;
                    }
                    if (index === 1) {
                        obj.attrs.rowSpan = 0;
                    }
                    if (index === 2) {
                        obj.attrs.rowSpan = 0;
                    }
                    if (index === 3) {
                        obj.attrs.rowSpan = 0;
                    }
                    //第二大行
                    if (index === 4) {
                        obj.attrs.rowSpan = 4;
                    }
                    if (index === 5) {
                        obj.attrs.rowSpan = 0;
                    }
                    if (index === 6) {
                        obj.attrs.rowSpan = 0;
                    }
                    if (index === 7) {
                        obj.attrs.rowSpan = 0;
                    }
                    return obj;
                },
            },
            {
                title: '具体分项及内容',
                dataIndex: 'specific',
            },
            {
                title: '加减分值',
                dataIndex: 'number',
            },
            {
                title: '得分',
                dataIndex: 'score',
            },
        ];
        return {
            columns,
        };
    },
};
</script>
