<template>
    <div class="aside-wrap">
        <div class="user-wrap">
            <div class="avatar-wrap">
                <a-avatar
                    :size="75"
                    class="avatar"
                    :icon="accountStore.avatar ? accountStore.avatar : 'user'"
                    :src="accountStore.avatar ? accountStore.avatar : undefined"
                />
                <a-icon
                    type="form"
                    class="update-avatar"
                    @click="
                        () => {
                            showImageUploader = true;
                        }
                    "
                />
            </div>

            <span class="font-18 user-name">
                {{ accountStore.nickname }}
                <a-icon type="man" v-if="false" style="color: #00d3ff" />
                <a-icon type="woman" v-else style="color: #fb85bc" />
            </span>
            <span class="font-14" style="margin-right:25px;" v-if="accountStore.orgFullName">{{
                accountStore.orgFullName
            }}</span>
            <span class="font-14" v-if="accountStore.code">{{ accountStore.code }}</span>
        </div>
        <div class="personal-wrap">
            <div class="item">
                <a-icon class="icon" type="mobile" /><span>手机</span><span>{{ accountStore.user.mobile }}</span>
            </div>
            <div class="item">
                <a-icon class="icon" type="mail" /><span>邮箱</span><span>{{ accountStore.user.email }}</span>
            </div>
            <div class="item">
                <a-icon class="icon" type="idcard" /><span>身份</span><span>{{ accountStore.user.idCard }}</span>
            </div>
            <div class="item">
                <a-icon class="icon" type="team" /><span>组织</span><span>{{ accountStore.orgFullName }}</span>
            </div>
        </div>
        <div class="calendar-wrap">
            <a-calendar :fullscreen="false">
                <template slot="headerRender">
                    <div></div>
                </template>
            </a-calendar>
        </div>
        <image-uploader
            v-model="showImageUploader"
            :width="180"
            :height="180"
            :noRotate="false"
            url="/rac-svr/rac/account/upload-avatar"
            @crop-upload-success="handleCropUploadSuccess"
        />
    </div>
</template>

<script>
import { accountStore } from '@/store/Store';
import ImageUploader from 'vue-image-crop-upload/upload-2.vue';
import { racMenuAction } from '@/action/Action';
export default {
    name: 'app-aside',
    components: {
        ImageUploader,
    },
    props: {},
    data() {
        return {
            accountStore,
            loading: true,
            showImageUploader: false,
        };
    },
    methods: {
        handleCropUploadSuccess() {
            racMenuAction.refreshAccountInfo();
        },
    },
};
</script>

<style scoped lang="less">
.aside-wrap {
    flex: 0 0 300px;
    border-radius: 10px;
    overflow: hidden;
}
.user-wrap {
    height: 240px;
    text-align: center;
    color: #fff;
    background: url(../assets/img/userbg.png) no-repeat;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.avatar-wrap {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.avatar {
    margin-top: 40px;
    border: 2px solid #b5cbee;
    border-radius: 50%;
}
.update-avatar {
    font-size: 16px;
    margin-left: -15px;
    position: relative;
    cursor: pointer;
}
.user-name {
    display: block;
    margin-top: 15px;
    margin-bottom: 20px;
}

.personal-wrap {
    background-color: #597ede;
    color: #fff;
    padding: 30px 40px;
    .item {
        padding: 12px 0;
        display: flex;
        align-items: center;
    }
    .icon {
        font-size: 20px;
        margin: 5px;
        + span {
            margin-right: 15px;
            min-width: 2em;
        }
    }
}
.calendar-wrap {
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0px 8px 10px 0px #a3bce2;
}
</style>
