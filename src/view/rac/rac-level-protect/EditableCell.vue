<template>
    <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
            <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
                type="check"
                class="editable-cell-icon-check"
                @click="check"
            />
        </div>
        <div v-else class="editable-cell-text-wrapper">
            {{ value || ' ' }}
            <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
    </div>
</template>

<script>
export default {
    components: {
        //
    },
    name: 'EditableCell',
    props: {
        text: String,
        cellClick: Function,
        record: Object,
    },
    data() {
        return {
            value: this.text,
            editable: false,
        };
    },
    mounted() {
        //
    },
    methods: {
        handleChange(e) {
            if (this.record.dicItemKey == 'passwordTips') {
                //
            } else {
                e.target.value = e.target.value.replace(/[^\d]/g, '');
                if (this.record.dicItemKey == 'passwordCharacter') {
                    e.target.value = e.target.value > 4 ? 4 : e.target.value;
                }
            }
            const value = e.target.value;
            this.value = value;
        },
        check() {
            this.editable = false;
            this.cellClick(this.record, this.value);
        },
        edit() {
            this.editable = true;
        },
    },
};
</script>

<style lang="less" scoped>
.editable-cell {
    position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
    padding-right: 24px;
}

.editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
}

.editable-cell-icon {
    line-height: 18px;
    display: none;
}

.editable-cell-icon-check {
    line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
    display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
    color: #108ee9;
}

.editable-add-btn {
    margin-bottom: 8px;
}
</style>
