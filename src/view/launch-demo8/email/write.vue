// 写信页面
<template>
    <div>
        <fragment>
            <base-manager ref="baseManager">
                <template #managerCard>
                    <a-form-model :label-col="{ span: 3 }" :wrapper-col="{ span: 12 }">
                        <a-form-model-item label="发送人:">
                            <a-input placeholder="系统管理员" disabled="true" />
                        </a-form-model-item>
                        <a-form-model-item label="接收人:">
                            <a-input />
                        </a-form-model-item>
                        <a-form-model-item label="标题:">
                            <a-input />
                        </a-form-model-item>
                        <a-form-model-item label="描述:">
                            <a-textarea :rows="4" />
                        </a-form-model-item>
                        <a-form-model-item label="附件:">
                            <a-button>上传</a-button>
                        </a-form-model-item>
                    </a-form-model>
                </template>
            </base-manager>
        </fragment>
    </div>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';
import { racRealmApi } from '@/api/Api';

export default {
    name: 'signupConf',
    components: {
        BaseManager,
    },
    data() {
        this.api = racRealmApi;
        return {};
    },
    mounted() {
        //
    },
    methods: {
        //
    },
};
</script>
