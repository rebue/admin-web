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
                            demo: '党性教育"制高点”(30分)',
                            specific: '@cword(10,15)',
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
