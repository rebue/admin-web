<template>
<div class="ifLoginPass">
        <change-pswd-form
        :record="accountStore.accountId"
        :visible.sync="changePswdFormVisible"
        :isCancelClick="isCancelClick"
        @close="refreshAccountInfo"
    />
</div>

</template>

<script>
import ChangePswdForm from '@/view/app/security-center/ChangePswdForm.vue';
import { accountStore } from '@/store/Store';
import { racMenuAction } from '@/action/Action';
import { racDicApi, racAccountApi } from '@/api/Api';
export default {
    name: 'Index',
    components: {
        ChangePswdForm,
    },
    data() {
        return {
            accountStore,
            changePswdFormVisible: false,
            isCancelClick: false,
        };
    },
    mounted() {
        this.getPasswordApiFun();
    },
    methods: {
        /**获取密码过期时长接口和是否是第一次登录接口 */
        getPasswordApiFun() {
            racAccountApi.getCurAccountInfo().then(res => {
                const params = 'levelProtect';
                racDicApi.getByDicKey(params).then(ro => {
                    let passworDoverdue = ro.extra.dicItems.find(item => item.dicItemKey === 'passworDoverdue');
                    const dateEnd = new Date(); //获取当前时间
                    const dateDiff = dateEnd.getTime() - Number(res.extra.updateTimestamp); //时间差的毫秒数
                    const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
                    if(passworDoverdue == undefined){
                        passworDoverdue = {
                            dicItemValue: 100,
                        }
                    }
                    if (dayDiff > Number(passworDoverdue.dicItemValue)) {
                    // if (1 > 0) {
                        this.$warning({
                            title: '提示',
                            content: `该账号的密码已经使用超过了${passworDoverdue.dicItemValue}天，根据等保配置，需要强制修改密码。`,
                            onOk: () => {
                                this.changePswdFormVisible = true;
                            },
                        });
                    }
                    let passwordTips = ro.extra.dicItems.find(item => item.dicItemKey === 'passwordTips');
                     if(passwordTips == undefined){
                        passwordTips = {
                            dicItemValue: false,
                        }
                    }
                    if (passwordTips.dicItemValue == 'true' || passwordTips.dicItemValue == true) {
                        if (!res.extra.expirationDatetime) {
                            this.$warning({
                                title: '提示',
                                content: `您是第一次登录，根据等保配置，需要强制修改密码。`,
                                onOk: () => {
                                    this.changePswdFormVisible = true;
                                },
                            });
                        }
                    }
                });
            });
        },
        refreshAccountInfo() {
            racMenuAction.refreshAccountInfo();
        },
    },
};
</script>