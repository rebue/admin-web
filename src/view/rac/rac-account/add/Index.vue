<template>
    <div class="account-add-user-index-wrap">
        <a-steps :current="current" class="steps">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="panel">
            <!-- 第一步 账户 -->
            <div class="steps-content add-account" v-show="current == 0">
                <div class="form">
                    <account-form ref="accountForm" key="accountForm" :extraModel="extraModel" />
                </div>
                <div class="steps-action ant-modal-footer">
                    <a-button type="primary" @click="validateAccount">
                        下一步
                    </a-button>
                </div>
            </div>
            <!-- 第二步 用户 -->
            <div class="steps-content bind-user" v-show="current == 1">
                <template v-if="activeTab.includes('add-tab')">
                    <div class="form">
                        <user-form ref="userForm" :key="activeTab" :inline="true" />
                        <a-col :span="13" :offset="7">
                            <a-button
                                size="small"
                                type="link"
                                icon="retweet"
                                @click="changeActiveTab('choose-tab')"
                                style="float:right;"
                                >去选择用户</a-button
                            >
                        </a-col>
                    </div>
                    <div class="steps-action ant-modal-footer">
                        <a-button @click="prev">
                            上一步
                        </a-button>
                        <a-button type="primary" @click="submitAddUser">
                            提交
                        </a-button>
                    </div>
                </template>
                <template v-else>
                    <div class="form">
                        <user-get ref="selectedUserForm" :key="activeTab" />
                        <a-col :span="13" :offset="7">
                            <a-button
                                size="small"
                                type="link"
                                icon="retweet"
                                @click="changeActiveTab('add-tab')"
                                style="float:right"
                                >去新建用户</a-button
                            >
                        </a-col>
                    </div>
                    <div class="steps-action ant-modal-footer">
                        <a-button @click="prev">
                            上一步
                        </a-button>
                        <a-button type="primary" @click="submitSelectedUser">
                            提交
                        </a-button>
                    </div>
                </template>
            </div>

            <!-- 第三步 完成 -->
            <div class="steps-content finish-wrap" v-show="current == 2">
                <a-result class="result" status="success" sub-title="新建账号成功">
                    <template #icon>
                        <a-icon type="smile" theme="twoTone" />
                    </template>
                </a-result>
                <div class="steps-action ant-modal-footer">
                    <a-button type="primary" @click="closeDialog">
                        完成
                    </a-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserForm from './UserForm.vue';
import UserGet from './UserGet.vue';
import AccountForm from './AccountForm.vue';

export default {
    components: { UserForm, UserGet, AccountForm },
    data() {
        return {
            current: 0,
            steps: [
                {
                    title: '账户',
                },
                {
                    title: '用户',
                },
                {
                    title: '完成',
                },
            ],
            userId: '',
            activeTab: 'choose-tab',
            loading: true,
        };
    },
    computed: {
        extraModel() {
            const { userId, realmId, orgId } = this;
            return {
                userId,
                realmId,
                orgId,
            };
        },
    },
    methods: {
        next() {
            this.current++;
        },
        prev() {
            this.current--;
        },
        changeActiveTab(val) {
            this.userId = '';
            this.activeTab = val + new Date(); //用做tab key
        },
        submitAddUser() {
            this.$refs.userForm.ok(null, ro => {
                this.userId = ro.extra ? ro.extra.id : '';
                if (this.userId) {
                    //创建好用户, 再去提交账号表单
                    this.submitAccount();
                }
            });
        },
        submitSelectedUser() {
            this.userId = this.$refs.selectedUserForm.model.userId;
            this.submitAccount();
        },
        // 校验账号表单
        validateAccount() {
            const valid = this.$refs.accountForm.validate();
            if (valid) {
                this.changeActiveTab('choose-tab');
                this.next();
            }
        },
        // 提交账号表单
        submitAccount() {
            this.$refs.accountForm.ok(null, ro => {
                setTimeout(() => {
                    this.callback && this.callback();
                }, 1000);
                this.next();
            });
        },
    },
};
</script>

<style scoped>
.account-add-user-index-wrap {
    margin: -24px;
}
.steps {
    padding: 24px 44px;
    background: #f5f5f5;
}
.panel {
    padding: 20px 44px 20px;
}
.nav {
    height: 88px;
    margin-bottom: 20px;
    padding: 0 40px;
    border: 1px solid #ededed;
    border-radius: 2px;
    background-color: #fafafa;
}
.nav:hover {
    border-color: #f4f4f4;
    background-color: #fdfdfd;
}

.bind-user .form {
    margin: 50px 50px 70px;
}
.add-account .form {
    margin: 50px 0;
}
.finish-wrap .result {
    margin: 50px 10px;
}
</style>
