<template>
    <a-row :gutter="20">
        <a-col :span="6">
            <a-card title="">
                <div class="avatar">
                    <a-avatar
                        :size="100"
                        :icon="accountStore.avatar ? accountStore.avatar : 'user'"
                        :src="accountStore.avatar ? accountStore.avatar : undefined"
                    />
                    <!-- <p>{{ accountStore.nickname }}</p> -->
                    <!-- <p v-if="accountStore.orgFullName !== ''">{{ accountStore.orgFullName }}</p> -->
                </div>
                <a-divider />
                <div>
                    <a-button
                        type="link"
                        block
                        @click="
                            () => {
                                showImageUploader = true;
                            }
                        "
                        >上传头像</a-button
                    >
                    <a-button
                        type="link"
                        block
                        @click="
                            () => {
                                changePswdFormVisible = true;
                            }
                        "
                        >修改密码</a-button
                    >
                </div>
                <image-uploader
                    v-model="showImageUploader"
                    :width="180"
                    :height="180"
                    :noRotate="false"
                    url="/rac-svr/rac/account/upload-avatar"
                    @crop-upload-success="handleCropUploadSuccess"
                    @crop-upload-fail="handleCropUploadFail"
                />
                <change-pswd-form
                    :record="{ id: accountStore.accountId }"
                    :visible.sync="changePswdFormVisible"
                    @close="refreshAccountInfo"
                />
            </a-card>
        </a-col>
        <a-col :span="18">
            <a-card title="个人信息" class="person-card">
                <a-form layout="horizontal" :labelCol="formLayout.labelCol" :wrapperCol="formLayout.wrapperCol">
                    <a-form-item label="账号">{{ account.signInName }}</a-form-item>
                    <a-form-item label="昵称">{{ account.signInNickname }}</a-form-item>
                    <a-form-item label="手机号码">{{ account.signInMobile }}</a-form-item>
                    <a-form-item label="电子邮箱">{{ account.signInEmail }}</a-form-item>
                    <a-form-item label="性别">{{ account.sex }}</a-form-item>
                    <a-form-item label="身份证信息">{{ account.idCard }}</a-form-item>
                    <a-form-item label="所属组织">{{ account.orgFullName }}</a-form-item>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
</template>

<script>
import { accountStore } from '@/store/Store';
import { racMenuAction } from '@/action/Action';
import ImageUploader from 'vue-image-crop-upload/upload-2.vue';
import ChangePswdForm from '@/view/rac/rac-account/ChangePswdForm.vue';
import { racAccountApi } from '@/api/Api';

export default {
    name: 'app-person-center-index',
    components: {
        ImageUploader,
        ChangePswdForm,
    },
    data() {
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
            accountStore,
            showImageUploader: false,
            changePswdFormVisible: false,
            account: {},
        };
    },
    methods: {
        refreshAccountInfo() {
            racMenuAction.refreshAccountInfo();
        },
        /**
         * upload success
         *
         * [param] jsonData  server api return data, already json encode
         * [param] field
         */
        handleCropUploadSuccess(jsonData, field) {
            console.log('-------- upload success --------');
            console.log(jsonData);
            console.log('field: ' + field);
            this.refreshAccountInfo();
        },
        /**
         * upload fail
         *
         * [param] status    server api return error status, like 500
         * [param] field
         */
        handleCropUploadFail(status, field) {
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        },
    },
    watch: {
        accountStore: {
            handler(val, old) {
                // 用observer包裹，为啥只执行一次。
                // accountStore是异步获取的，放在mounted会有执行顺序问题，所以放在watch
                if (val && val.accountId) {
                    racAccountApi.getById(val.accountId).then(ro => {
                        this.account = ro.extra.one;
                    });
                }
            },
            immediate: true,
            deep: true,
        },
    },
};
</script>
<style scoped>
.avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.person-card >>> .ant-card-head-title {
    color: #666;
}
.person-card >>> .ant-form-item-label > label {
    color: #666;
}
.person-card >>> .ant-form-item {
    margin-bottom: 10px;
}
</style>
