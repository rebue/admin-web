<template>
    <div class="account-add-user-index-wrap">
        <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div>
            <!-- 第一步 选择用户 -->
            <div class="steps-content" v-show="current == 0">
                <a-tabs
                    v-model="activeTab"
                    @change="
                        () => {
                            userId = '';
                        }
                    "
                >
                    <a-tab-pane key="add-tab" tab="新建用户">
                        <div>
                            <user-form ref="userForm" key="userForm" v-if="activeTab === 'add-tab'" />
                        </div>
                    </a-tab-pane>
                    <a-tab-pane key="choose-tab" tab="选择已有用户" force-render>
                        <div>
                            <user-get
                                ref="queryForm"
                                key="queryForm"
                                v-if="activeTab === 'choose-tab'"
                                :callback="
                                    ro => {
                                        userId = ro.extra.id;
                                    }
                                "
                            />
                        </div>
                    </a-tab-pane>
                </a-tabs>
                <div class="steps-action ant-modal-footer">
                    <a-button type="primary" @click="submitUser">
                        下一步
                    </a-button>
                </div>
            </div>
            <!-- 第二步 创建账号 -->
            <div class="steps-content" v-show="current == 1">
                <account-form ref="accountForm" key="accountForm" :extraModel="extraModel" />

                <div class="steps-action ant-modal-footer">
                    <a-button @click="prev">
                        上一步
                    </a-button>
                    <a-button type="primary" @click="submitAccount">
                        提交
                    </a-button>
                </div>
            </div>
        </div>

        <!-- <div class="steps-action ant-modal-footer">
           
            <a-button v-if="current > 0" @click="prev">
                上一步
            </a-button>
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">
                下一步
            </a-button>
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="submit"
            >
                提交
            </a-button>
        </div> -->
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
                    title: '选择用户',
                },
                {
                    title: '新建账号',
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
        submit() {
            console.log('--提交');
        },
        submitUser() {
            if (this.userId) {
                this.next();
                return;
            }
            if (this.activeTab == 'add-tab') {
                this.$refs.userForm.ok(null, ro => {
                    this.userId = ro.extra.id;
                    this.next();
                });
            } else {
                this.$refs.queryForm.validate();
            }
        },
        submitAccount() {
            this.$refs.accountForm.ok(null, ro => {
                setTimeout(() => {
                    this.closeDialog();
                    this.callback && this.callback();
                }, 1000);
            });
        },
    },
};
</script>

<style scoped>
.account-add-user-index-wrap {
    padding: 10px 10px 0;
}
.steps-content {
    margin-top: 20px;
}
</style>
