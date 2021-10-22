<template>
    <a-form-model ref="form" :model="model" :rules="rules" v-bind="formLayout">
        <!-- 手机号在更换和解绑操作中回显 disable -->
        <a-form-model-item key="mobile" label="手机号" prop="mobile">
            <a-input v-model.trim="model.mobile" placeholder="" :disabled="editFormType !== EditFormTypeDic.Add" />
        </a-form-model-item>
        <!-- 更换操作，需要新手机号 -->
        <a-form-model-item
            key="newMobile"
            label="新手机号"
            prop="mobile"
            v-if="editFormType === EditFormTypeDic.Modify"
        >
            <a-input v-model.trim="model.newMobile" placeholder="" />
        </a-form-model-item>
        <a-form-model-item key="verifyCode" label="验证码" prop="verifyCode">
            <div class="code">
                <a-input class="code-input" v-model.trim="model.verifyCode" placeholder="" />
                <a-button key="btn" @click="getCode" :loading="isCodeLoading" v-if="!isCounting">获取验证码</a-button>
                <a-button style="width: 12em;" key="s" v-else>{{ second }}s</a-button>
            </div>
        </a-form-model-item>
        <!-- <a-form-model-item :wrapper-col="{ span: 13, offset: 7 }">
            <a-button type="primary" native-type="submit" @click="ok">提交</a-button>
        </a-form-model-item> -->
    </a-form-model>
</template>
<script>
import { isPhone } from '@/util/validator';
import { EditFormTypeDic } from '@/dic/EditFormTypeDic';
import request from '@/util/request';
const SECOND = 5;
export default {
    name: 'app-security-center-mobile',
    components: {},
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
            EditFormTypeDic,
            //form表单
            model: {
                mobile: '',
                newMobile: '',
                verifyCode: '',
            },
            rules: {
                mobile: [
                    { required: true, message: '请输入手机号', trigger: 'blur', transform: val => val.trim() },
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (!isPhone(value)) {
                                    callback(new Error('手机号不合法'));
                                    return false;
                                }
                            }
                            callback();
                        },
                    },
                ],
                newMobile: [
                    {
                        required: this.editFormType === EditFormTypeDic.Modify,
                        message: '请输入新手机号',
                        trigger: 'blur',
                        transform: val => val.trim(),
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value) {
                                if (!isPhone(value)) {
                                    callback(new Error('新手机号不合法'));
                                    return false;
                                }
                            }
                            callback();
                        },
                    },
                ],
                verifyCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur', transform: val => val.trim() },
                ],
            },
            second: SECOND,
            isCodeLoading: false,
            isCounting: false,
        };
    },
    methods: {
        ok() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    //发请求
                    // 绑定，更换绑定，解除绑定
                    //EditFormTypeDic.Add, EditFormTypeDic.Modify, EditFormTypeDic.Delete
                    if (this.editFormType === EditFormTypeDic.Add) {
                        request
                            .post({
                                url: '/orp-svr/orp/bind/mobile',
                                data: {
                                    mobile: this.model.mobile,
                                    verifyCode: this.model.verifyCode,
                                },
                            })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                this.closeDialog && this.closeDialog();
                            });
                    } else if (this.editFormType === EditFormTypeDic.Modify) {
                        request
                            .post({
                                url: '/cap-svr/cap/modify/mobile',
                                data: {
                                    newMobile: this.model.newMobile,
                                    verifyCode: this.model.verifyCode,
                                },
                            })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                this.closeDialog && this.closeDialog();
                            });
                    } else if (this.editFormType === EditFormTypeDic.Delete) {
                        request
                            .post({
                                url: '/cap-svr/cap/unbind/mobile',
                                data: {
                                    mobile: this.model.mobile,
                                    verifyCode: this.model.verifyCode,
                                },
                            })
                            .then(ro => {
                                this.callback && this.callback(ro);
                                this.closeDialog && this.closeDialog();
                            });
                    }
                } else {
                    this.$nextTick(() => {
                        this.$focusError(); // 设置焦点到第一个提示错误的输入框
                        this.loading = false;
                    });
                }
            });
        },
        async getCode() {
            if (this.isCodeLoading) {
                return;
            }
            // 验证手机号是否输入
            let valid = true;
            let mobile = this.model.mobile;
            if (this.editFormType === EditFormTypeDic.Modify) {
                mobile = this.model.newMobile;
                this.$refs.form.validateField('newMobile', (errors, values) => {
                    valid = !errors;
                });
            } else {
                this.$refs.form.validateField('mobile', (errors, values) => {
                    valid = !errors;
                });
            }
            if (!valid) {
                return;
            }

            //获取验证码 请求
            try {
                this.isCodeLoading = true;
                await request.get({
                    url: '/cap-svr/cap/sms/get',
                    params: {
                        mobile,
                    },
                });
                this.isCodeLoading = false;
                this.isCounting = true;
                // then 验证码倒计时
                this.countDown(this.second, val => {
                    this.second = val;
                    if (val === 0) {
                        this.second = SECOND;
                        this.isCounting = false;
                    }
                });
            } catch {
                this.isCodeLoading = false;
            }
        },
        countDown(second, cb, immediate = false) {
            if (immediate) {
                if (second == 0) {
                    return;
                }
                second = second - 1;
                cb && cb(second);
            }
            setTimeout(() => {
                this.countDown(second, cb, true);
            }, 1000);
        },
    },
};
</script>
<style scoped>
.code {
    display: flex;
}
.code-input {
    margin-right: 10px;
}
</style>
