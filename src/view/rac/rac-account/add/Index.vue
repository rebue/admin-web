<template>
    <div class="account-add-user-index-wrap">
        <a-steps :current="current" class="steps">
            <a-step v-for="item in steps" :key="item" :title="item" />
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
                <div class="ant-form form">
                    <a-row type="flex" align="middle" class="ant-form-item">
                        <a-col :span="7" class="ant-form-item-label"
                            ><label class="ant-form-item-required">关联方式</label></a-col
                        >
                        <a-col :span="17">
                            <a-radio-group
                                button-style="solid"
                                v-model="radioVal"
                                @change="changeActiveTab($event.target.value)"
                            >
                                <a-radio-button value="no-tab">
                                    不关联用户
                                </a-radio-button>
                                <a-radio-button value="choose-tab">
                                    关联已存在用户
                                </a-radio-button>
                                <a-radio-button value="add-tab">
                                    关联新建用户
                                </a-radio-button>
                            </a-radio-group>
                        </a-col>
                    </a-row>
                    <user-get ref="selectedUserForm" :key="activeTab" v-if="activeTab.includes('choose-tab')" />
                    <user-form ref="userForm" :key="activeTab" :inline="true" v-if="activeTab.includes('add-tab')" />
                </div>
                <div class="steps-action ant-modal-footer">
                    <a-button @click="prev">
                        上一步
                    </a-button>
                    <a-button type="primary" @click="submit">
                        提交
                    </a-button>
                </div>
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
            steps: ['账户', '用户', '完成'],
            userId: '',
            radioVal: 'no-tab',
            // activeTab用与重置表单
            activeTab: 'no-tab',
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
        changeActiveTab(value) {
            this.userId = '';
            this.radioVal = value;
            this.activeTab = value + new Date(); //用做tab key
        },
        //新建用户提交
        submitAddUser() {
            this.$refs.userForm.ok(null, ro => {
                this.userId = ro.extra ? ro.extra.id : '';
                if (this.userId) {
                    //创建好用户, 再去提交账号表单
                    this.submitAccount();
                }
            });
        },
        //选择用户提交
        submitSelectedUser() {
            const valid = this.$refs.selectedUserForm.validate();
            if (valid) {
                this.userId = this.$refs.selectedUserForm.model.userId;
                this.submitAccount();
            }
        },
        // 校验账号表单
        validateAccount() {
            const valid = this.$refs.accountForm.validate();
            if (valid) {
                this.changeActiveTab('no-tab');
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
        submit() {
            switch (this.radioVal) {
                case 'no-tab':
                    this.submitAccount();
                    break;
                case 'choose-tab':
                    this.submitSelectedUser();
                    break;
                case 'add-tab':
                    this.submitAddUser();
                    break;
            }
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
    min-height: 300px;
}
.add-account .form {
    margin: 50px 0;
}
.finish-wrap .result {
    margin: 50px 10px;
    min-height: 300px;
}
</style>
