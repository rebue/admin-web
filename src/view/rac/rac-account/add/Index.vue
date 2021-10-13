<template>
    <div class="account-add-user-index-wrap">
        <a-steps :current="current" class="steps">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="panel">
            <!-- 第一步 创建账号 -->
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
            <!-- 第二步 选择方式 -->
            <div class="steps-content choose-type" v-show="current == 1">
                <div style="padding: 50px 20px">
                    <a-list-item class="nav" @click="finish">
                        <a-list-item-meta>
                            <div slot="avatar">
                                <a-icon type="user-add" :style="{ fontSize: '30px', color: '#1890ff' }" />
                            </div>
                            <span slot="title">不关联用户</span>
                            <div slot="description">直接提交创建账号</div>
                        </a-list-item-meta>
                        <div><a-icon type="right" :style="{ fontSize: '30px', color: '#ddd' }" /></div>
                    </a-list-item>
                    <a-list-item class="nav" @click="changeActiveTab('add-tab')">
                        <a-list-item-meta>
                            <div slot="avatar">
                                <a-icon type="user-add" :style="{ fontSize: '30px', color: '#1890ff' }" />
                            </div>
                            <span slot="title">关联新建用户</span>
                            <div slot="description">填写表单提交创建用户并关联用户</div>
                        </a-list-item-meta>
                        <div><a-icon type="right" :style="{ fontSize: '30px', color: '#ddd' }" /></div>
                    </a-list-item>
                    <a-list-item class="nav" @click="changeActiveTab('choose-tab')">
                        <a-list-item-meta>
                            <div slot="avatar">
                                <a-icon type="solution" :style="{ fontSize: '30px', color: '#1890ff' }" />
                            </div>
                            <span slot="title">关联已有用户</span>
                            <div slot="description">根据姓名/身份证号查询并勾选用户</div>
                        </a-list-item-meta>
                        <div><a-icon type="right" :style="{ fontSize: '30px', color: '#ddd' }" /></div>
                    </a-list-item>
                </div>
                <div class="steps-action ant-modal-footer">
                    <a-button @click="prev">
                        上一步
                    </a-button>
                </div>
            </div>
            <!-- 第三步 选择用户 -->
            <div class="steps-content bind-user" v-show="current == 2">
                <template v-if="activeTab.includes('add-tab')">
                    <div class="form">
                        <user-form
                            ref="userForm"
                            :key="activeTab"
                            :inline="true"
                            v-if="activeTab.includes('add-tab')"
                        />
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
                <template v-if="activeTab.includes('choose-tab')">
                    <div class="form">
                        <user-get
                            ref="selectedUserForm"
                            :key="activeTab"
                            v-if="activeTab.includes('choose-tab')"
                            :callback="
                                ro => {
                                    userId = ro.extra ? ro.extra.id : '';
                                }
                            "
                        />
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

            <!-- 第四步 完成 -->
            <div class="steps-content finish-wrap" v-show="current == 3">
                <a-result class="result" status="success" sub-title="新建账号成功">
                    <template #icon>
                        <a-icon type="smile" theme="twoTone" />
                    </template>
                </a-result>
                <div class="steps-action ant-modal-footer">
                    <a-button type="primary" @click="done">
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
                    title: '新建账号',
                },
                {
                    title: '关联用户方式',
                },
                {
                    title: '关联用户',
                },

                {
                    title: '完成',
                },
            ],

            userId: '',
            activeTab: 'add-tab',
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
        finish() {
            this.userId = '';

            this.$refs.accountForm.ok(null, ro => {
                setTimeout(() => {
                    this.callback && this.callback();
                }, 1000);
                // 删除头部步骤step项
                this.steps.splice(2, 1);
                this.current = 3;
            });
        },
        changeActiveTab(val) {
            this.userId = '';
            this.activeTab = val + new Date(); //用做tab key
            this.next();
        },
        submitAddUser() {
            this.$refs.userForm.ok(null, ro => {
                this.userId = ro.extra ? ro.extra.id : '';
                if (this.userId) {
                    //创建好用户, 再去提交账号表单
                    this.$refs.accountForm.ok(null, ro => {
                        setTimeout(() => {
                            this.callback && this.callback();
                        }, 1000);
                        this.next();
                    });
                }
            });
        },
        submitSelectedUser() {
            //校验是否选中已有用户
            const valid = this.$refs.selectedUserForm.validate();
            //选中再去提交账号标签
            if (valid) {
                this.userId = this.$refs.selectedUserForm.model.userId;
                if (this.userId) {
                    //创建好用户, 再去提交账号表单
                    this.$refs.accountForm.ok(null, ro => {
                        setTimeout(() => {
                            this.callback && this.callback();
                        }, 1000);
                        this.next();
                    });
                }
            }
        },
        validateAccount() {
            const valid = this.$refs.accountForm.validate();
            if (valid) {
                this.next();
            }
        },
        done() {
            this.closeDialog();
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
