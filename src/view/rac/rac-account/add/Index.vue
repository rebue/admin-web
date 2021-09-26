<template>
    <div class="account-add-user-index-wrap">
        <a-steps :current="current" class="steps">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="panel">
            <!-- 第一步 选择方式 -->
            <div class="steps-content choose-type" v-show="current == 0">
                <a-list-item class="nav" @click="changeActiveTab('add-tab')">
                    <a-list-item-meta>
                        <div slot="avatar">
                            <a-icon type="user-add" :style="{ fontSize: '30px', color: '#1890ff' }" />
                        </div>
                        <span slot="title">新建用户</span>
                        <div slot="description">填写表单提交创建用户</div>
                    </a-list-item-meta>
                    <div><a-icon type="right" :style="{ fontSize: '30px', color: '#ddd' }" /></div>
                </a-list-item>
                <a-list-item class="nav" @click="changeActiveTab('choose-tab')">
                    <a-list-item-meta>
                        <div slot="avatar">
                            <a-icon type="solution" :style="{ fontSize: '30px', color: '#1890ff' }" />
                        </div>
                        <span slot="title">选择已有用户</span>
                        <div slot="description">根据姓名，身份证号查询已有用户信息</div>
                    </a-list-item-meta>
                    <div><a-icon type="right" :style="{ fontSize: '30px', color: '#ddd' }" /></div>
                </a-list-item>
            </div>
            <!-- 第二步 选择用户 -->
            <div class="steps-content bind-user" v-show="current == 1">
                <div class="form">
                    <user-form ref="userForm" :key="activeTab" v-if="activeTab.includes('add-tab')" />
                    <user-get
                        ref="queryForm"
                        :key="activeTab"
                        v-if="activeTab.includes('choose-tab')"
                        :callback="
                            ro => {
                                userId = ro.extra.id;
                            }
                        "
                    />
                </div>
                <div class="steps-action ant-modal-footer">
                    <a-button @click="prev">
                        上一步
                    </a-button>
                    <a-button type="primary" @click="submitUser">
                        下一步
                    </a-button>
                </div>
            </div>
            <!-- 第三步 创建账号 -->
            <div class="steps-content add-account" v-show="current == 2">
                <div class="form">
                    <account-form ref="accountForm" key="accountForm" :extraModel="extraModel" />
                </div>
                <div class="steps-action ant-modal-footer">
                    <a-button @click="fromAccountToUser">
                        上一步
                    </a-button>
                    <a-button type="primary" @click="submitAccount">
                        提交
                    </a-button>
                </div>
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
                    title: '选择方式',
                },
                {
                    title: '选择用户',
                },
                {
                    title: '新建账号',
                },
                {
                    title: '完成',
                },
            ],

            userId: '',
            activeTab: 'add-tab',
            cacheUserFormModel: {},
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
            this.activeTab = val + new Date(); //用做tab key
            this.userId = '';
            this.next();
        },
        submit() {
            console.log('--提交');
        },
        fromAccountToUser() {
            this.prev();
            this.cacheUserFormModel = { ...this.$refs.userForm.model };
        },
        validateUserModel() {
            const model = { ...this.$refs.userForm.model };
            return Object.keys(this.cacheUserFormModel).every(key => {
                return this.cacheUserFormModel[key] === model[key];
            });
        },
        submitUser() {
            if (this.activeTab.includes('add-tab')) {
                if (this.userId && this.validateUserModel()) {
                    // 创建过，回到上一步，校验创建信息和该次信息是否一致
                    this.next();
                } else {
                    this.$refs.userForm.ok(null, ro => {
                        this.userId = ro.extra.id;
                        this.next();
                    });
                }
            } else {
                if (this.userId) {
                    this.next();
                } else {
                    this.$refs.queryForm.validate();
                }
            }
        },
        submitAccount() {
            this.$refs.accountForm.ok(null, ro => {
                setTimeout(() => {
                    this.callback && this.callback();
                }, 1000);
                this.next();
            });
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
.choose-type {
    padding: 100px 50px;
}
.bind-user .form {
    margin: 100px 50px;
}
.add-account .form {
    margin: 100px 0;
}
.finish-wrap .result {
    margin: 100px 10px;
}
</style>
