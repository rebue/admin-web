<template>
    <a-form-model-item :label="label" :rules="rules" :help="showHelp ? help : ''" :prop="prop">
        <a-input-password
            :size="size"
            :value="value"
            @change="onChange"
            placeholder="请输入"
            @focus="showHelp = true"
            @blur="showHelp = false"
        />
    </a-form-model-item>
</template>

<script>
import { racDicApi } from '@/api/Api';
export default {
    props: {
        label: {
            type: String,
            default: '密码',
        },
        prop: {
            type: String,
        },
        value: {
            type: String,
        },
        size: {
            type: String,
        },
    },
    data() {
        const that = this;
        this.rules = {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (value === undefined) value = '';
                value = value.trim();
                let isValid = true;
                if (value === '') {
                    // callback(new Error('请输入'));
                    // return;
                    isValid = false;
                } else if (value.length < this.passwordMinLength) {
                    // callback(new Error(`请最少输入${this.passwordMinLength}位数密码`));
                    // return;
                    isValid = false;
                }
                //字典项里设置的包括多少种字符
                else if (this.passwordCharacter == 2) {
                    const pattern = /((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]/i;
                    if (!pattern.test(value)) {
                        // callback(new Error(`请最少输入2种字符密码格式`));
                        // return;
                        isValid = false;
                    }
                } else if (this.passwordCharacter == 3) {
                    const pattern = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]/;
                    console.log(pattern.test(value));
                    if (!pattern.test(value)) {
                        // callback(new Error(`请最少输入3种字符密码格式`));
                        // return;
                        isValid = false;
                    }
                } else if (this.passwordCharacter == 4) {
                    const pattern = /(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]/i;
                    if (!pattern.test(value)) {
                        // callback(new Error(`请最少输入4种字符密码格式`));
                        // return;
                        isValid = false;
                    }
                }

                if (isValid) {
                    callback();
                } else {
                    callback(new Error(that.help));
                }
            },
        };
        return {
            passwordMinLength: 6,
            passwordCharacter: 1,
            help: '',
            showHelp: false,
        };
    },
    mounted() {
        this.getbyIdFun();
    },
    methods: {
        onChange(e) {
            this.$emit('update:value', e.target.value);
        },
        getbyIdFun() {
            const params = 'levelProtect';
            racDicApi.getByDicKey(params).then(ro => {
                ro.extra.dicItems?.map(item => {
                    if (item.dicItemKey == 'passwordMinLength') {
                        this.passwordMinLength = item.dicItemValue;
                    } else if (item.dicItemKey == 'passwordCharacter') {
                        this.passwordCharacter = item.dicItemValue;
                    }
                    this.help = `登录密码由${this.passwordMinLength}~20位字符组成，包含由字母，数字和符号${this.passwordCharacter}种以上组合，区分大小写`;
                });
            });
        },
    },
};
</script>
