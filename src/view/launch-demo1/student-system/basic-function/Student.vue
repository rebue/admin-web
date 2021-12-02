<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <div style="margin: 0 auto">
                    <center>
                        <p>
                            基本信息（<a>预览打印</a> <a>直接打印</a>） 工作历程（<a>预览打印</a> <a>直接打印</a>）<a
                                >下载word文档</a
                            >
                            <br /><a>预览打印</a> <a>直接打印</a>
                        </p>
                        <p>
                            百色干部学院2021年秋季学期培训班次 自治区当党委管理干部”学习贯彻习近平新时代中国
                            特色社会主义思想，加强党性修养“专题<br />
                            培训班次（第十三期） 学员登记表
                        </p>
                    </center>
                </div>
                <students-file></students-file>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '../../../../component/rebue/BaseManager';
import StudentsFile from './StudentsFile';

export default {
    name: 'Student',
    components: {
        BaseManager,
        // eslint-disable-next-line vue/no-unused-components
        StudentsFile,
    },
};
</script>

<style scoped></style>
