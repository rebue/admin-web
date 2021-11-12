<template>
    <a-form-model-item :label="label" :rules="rules" :prop="prop">
        <a-input-password :size="size" :value="value" @change="onChange" placeholder="请输入" />
    </a-form-model-item>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: '确认密码',
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
        target: {
            require: true,
        },
    },
    data() {
        const that = this;
        this.rules = {
            required: true,
            trigger: ['change', 'blur'],
            validator: (rule, value, callback) => {
                if (value === undefined) value = '';
                value = value.trim();

                if (value === '') {
                    callback(new Error('请再次输入确认'));
                    return;
                }

                if (value !== this.target) {
                    callback(new Error('两次输入的密码不相同'));
                    return;
                }

                callback();
            },
        };
        return {};
    },
    methods: {
        onChange(e) {
            this.$emit('update:value', e.target.value);
        },
    },
};
</script>
