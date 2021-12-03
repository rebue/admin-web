<template>
    <fragment>
        <base-manager ref="baseManager">
            <template #managerCard>
                <a-tabs>
                    <a-tab-pane :key="1" tab="信息提示"></a-tab-pane>
                </a-tabs>
                <a-form-model>
                    <a-form-model-item label="客房版EUT客户端提示">
                        <a-input
                            style="width: 400px"
                            type="textarea"
                            :auto-size="{ minRows: 2, maxRows: 6 }"
                            value="学员登录账户可使用学号，身份证号或者中文姓名，初次密码为23456，登录后自行设置。如有疑问请联系：信息处0771-5577653"
                        ></a-input>
                        <div><a-icon type="question-circle" />客房版EUT客户端打开后，使用该配置替换默认提示</div>
                    </a-form-model-item>
                    <a-divider />

                    <a-form-model-item label="客房版EUT客户端弹窗提示信息">
                        <a-input
                            style="width: 400px"
                            type="textarea"
                            :auto-size="{ minRows: 2, maxRows: 6 }"
                            value="本电脑仅供学员学习，查询资料使用，不提供数据保存。如需保存数据，请将文件保存到自携U盘，移动硬盘上。无限热点需电脑开机才能使用，SSID为房间号，密码：7200gxdx。在使用电脑过程中，如有电脑故障，及相关技术咨询，请在行政工作时间内拨打内线电话，7631网络中心咨询帮助"
                        ></a-input>
                        <div>
                            <a-icon
                                type="question-circle"
                            />客房版EUT客户端打开后弹出的提示窗口，使用该配置替换默认提示，具体效果以在客户端显示为准
                        </div>
                    </a-form-model-item>
                    <a-divider />
                    <a-form-model-item label="客房版EUT客户端弹窗背景图片">
                        <a-upload
                            name="avatar"
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        >
                            <div>
                                <a-icon type="plus" />
                                <div class="ant-upload-text">
                                    Upload
                                </div>
                            </div>
                        </a-upload>
                        <div><a-icon type="question-circle" />图片大小默认470*623像素</div>
                    </a-form-model-item>
                </a-form-model>
            </template>
        </base-manager>
    </fragment>
</template>

<script>
import BaseManager from '@/component/rebue/BaseManager';

export default {
    name: 'Manager',
    components: {
        BaseManager,
    },
    data() {
        return {};
    },
};
</script>
