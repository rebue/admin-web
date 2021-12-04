<template>
    <fragment>
        <a-form-model v-bind="formLayout">
            <a-form-model-item label="缴费注意事项">
                <a-input style="width: 300px" type="textarea" :auto-size="{ minRows: 2, maxRows: 6 }"></a-input>
                <div><a-icon type="question-circle" />报名进度查询界面的缴费注意事项</div>
            </a-form-model-item>
            <a-form-model-item label="报名成功提示语">
                <a-input style="width: 300px" type="textarea" :auto-size="{ minRows: 2, maxRows: 6 }"></a-input>

                <div>
                    <a-icon type="question-circle" />学员网上报名成功提示，可使用动态的查询字段,如：{准考证查询时间}
                </div>
            </a-form-model-item>
            <a-form-model-item label="准考证查询开放时间">
                <a-date-picker
                    style="width: 120px"
                    :default-value="moment('2019-02-24', dateFormat)"
                    :format="dateFormat"
                />
                <div><a-icon type="question-circle" />准考证查询开放时间</div>
            </a-form-model-item>
            <a-form-model-item label="准考证查询关闭时间">
                <a-date-picker
                    style="width: 120px"
                    :default-value="moment('2019-02-24', dateFormat)"
                    :format="dateFormat"
                />
                <div><a-icon type="question-circle" />准考证查询关闭时间</div>
            </a-form-model-item>
        </a-form-model>
    </fragment>
</template>

<script>
import moment from 'moment';
export default {
    name: 'Manager',
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
            moment,
            dateFormat: 'YYYY/MM/DD',
        };
    },
};
</script>
