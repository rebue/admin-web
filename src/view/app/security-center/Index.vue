<template>
    <div class="flex-box page index-wrap">
        <Aside />
        <div class="ml20 mc flex-1">
            <change-pswd-form
                :record="changePswdId"
                :passworDoverdue="passworDoverdue"
                :visible.sync="changePswdFormVisible"
                @close="handleEditFormClose"
            />
            <div class="w100 pt20 pb20 bg-w card card-shadow security-center-card">
                <div class="title">
                    <img :src="require('../assets/img/safety.png')" width="20" height="24" />
                    <span class="font-20">安全中心</span>
                </div>
                <Main />
            </div>
        </div>
    </div>
</template>

<script>
import { observer } from 'mobx-vue';
import { accountStore } from '@/store/Store';
import { racMenuAction } from '@/action/Action';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import ChangePswdForm from './ChangePswdForm.vue';
import Aside from './Aside.vue';
import Main from './Main.vue';

export default observer({
    name: 'app-security-center-index',
    components: {
        Aside,
        ChangePswdForm,
        Main,
    },
    data() {
        return {
            accountStore,
            EditFormTypeDic,
            isVerifiedEmail: false,
            changePswdFormVisible: false,
            changePswdId: '',
            passworDoverdue: '',
        };
    },
    mounted() {
        if (this.$route.query?.passworDoverdue == 'isShow') {
            this.passworDoverdue = 'isShow';
            this.changePswd();
        }
    },
    methods: {
        refreshAccountInfo() {
            racMenuAction.refreshAccountInfo();
        },
        // 手机号
        bindPhone() {
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            accountId: that.accountStore.accountId,
                            editFormType: EditFormTypeDic.Add,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '绑定手机号',
                    width: '500px',
                }
            );
        },
        unbindPhone() {
            const that = this;
            this.$showDialog(
                require('./Phone.vue').default,
                {
                    data() {
                        return {
                            accountId: that.accountStore.accountId,
                            editFormType: EditFormTypeDic.Delete,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '解除绑定手机号',
                    width: '500px',
                }
            );
        },
        //微信
        bindWechat() {
            const that = this;
            this.$showDialog(
                require('./Wechat.vue').default,
                {
                    data() {
                        return {
                            eventType: 'account-bind',
                            accountId: that.accountStore.accountId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '微信绑定',
                    footer: null,
                    width: '500px',
                }
            );
        },
        unbindWechat() {
            const that = this;
            this.$showDialog(
                require('./Wechat.vue').default,
                {
                    data() {
                        return {
                            eventType: 'account-unbind',
                            accountId: that.accountStore.accountId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '微信解除绑定',
                    footer: null,
                    width: '500px',
                }
            );
        },

        //钉钉绑定
        bindDing() {
            const that = this;
            this.$showDialog(
                require('./Dingding.vue').default,
                {
                    data() {
                        return {
                            eventType: 'account-bind',
                            accountId: that.accountStore.accountId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '钉钉绑定',
                    footer: null,
                    width: '500px',
                }
            );
        },
        unbindDing() {
            const that = this;
            this.$showDialog(
                require('./Dingding.vue').default,
                {
                    data() {
                        return {
                            eventType: 'account-unbind',
                            accountId: that.accountStore.accountId,
                        };
                    },
                    methods: {
                        callback() {
                            that.refreshAccountInfo();
                        },
                    },
                },
                {
                    title: '钉钉解除绑定',
                    footer: null,
                    width: '500px',
                }
            );
        },

        //修改密码
        changePswd() {
            // const that = this;
            this.changePswdFormVisible = true;
            this.changePswdId = this.accountStore.accountId;
            // this.$showDialog(
            //     require('./ChangePswdForm.vue').default,
            //     {
            //         data() {
            //             return {
            //                 record: {
            //                     id: that.accountStore.accountId,
            //                 },
            //                 maskClosable: false,
            //                 closable: false,
            //             };
            //         },
            //         methods: {
            //             callback() {
            //                 // that.refreshAccountInfo();
            //                 console.log(1);
            //             },
            //         },
            //     },
            //     { title: '修改密码' }
            // );
        },

        //修改邮箱
        changeEmail() {
            const that = this;
            this.$showDialog(
                require('./Email.vue').default,
                {
                    data() {
                        return {};
                    },
                    methods: {
                        callback() {
                            // reload
                            that.isVerifiedEmail = true;
                        },
                    },
                },
                { title: '修改邮箱' }
            );
        },
    },
});
</script>

<style scoped lang="less">
.card {
    padding-left: 24px;
    padding-right: 12px;
    border-top: 4px solid #3a69c9;
    box-shadow: 0px 8px 10px 0px #a3bce2;
    border-radius: 0px 0px 10px 10px;
    .title {
        border-bottom: 1px solid #e4e5ea;
        padding-bottom: 14px;
        margin-bottom: 20px;
        > img {
            margin-right: 10px;
            vertical-align: middle;
        }
        > span {
            vertical-align: middle;
        }
    }
}
</style>
