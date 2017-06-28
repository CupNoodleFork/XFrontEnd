<template>
    <div class="page none-select">
        <md-theme md-name="app">
            <md-layout class="login-page" md-gutter="24" md-column>
                <md-whiteframe class="login-header draggable">
                    <md-toolbar class="md-large">
                        <span class="md-title">登录</span>
                    </md-toolbar>
                </md-whiteframe>
                <md-layout class="login-body">
                    <md-input-container>
                        <label>用户名</label>
                        <md-input placeholder="请输入用户名" v-model="form.username" :debounce="0" @keyup.enter.native="submitForm"></md-input>
                    </md-input-container>
                    <md-input-container>
                        <label>密码</label>
                        <md-input type="password" placeholder="请输入密码" :debounce="0" v-model="form.password" @keyup.enter.native="submitForm"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout class="login-footer" md-flex="30" md-align="end">
                    <div>
                        <md-button class="md-primary" @click.native="customerLogin">
                            <span>游客登录</span>
                        </md-button>
                        <md-button class="md-raised md-primary" @click.native="submitForm" :disabled="state.loading" >
                            <md-layout md-gutter="8" md-align="center">
                                <md-layout md-vertical-align="center" v-if="state.loading">
                                    <md-spinner :md-size="15" md-indeterminate class="md-accent"></md-spinner>
                                </md-layout>
                                <md-layout md-align="center">
                                    <span>登录</span>
                                </md-layout>
                            </md-layout>
                        </md-button>
                    </div>
                </md-layout>
            </md-layout>
        </md-theme>
        <md-snackbar ref="snackbar" md-duration="3000">
            <span v-text="state.snackBarMessage"></span>
        </md-snackbar>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {login} from '../API/Account';
    import {remote} from 'electron';

    const {setUserName, getUserConfig, makeUserDataDirectory}  = remote.getGlobal('cacheModule');

    export default {
        beforeCreate() {
            remote.getCurrentWindow().setSize(300, 400, true);
        },
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                state: {
                    snackBarMessage: '',
                    loading: false
                }
            }
        },
        methods: {
            customerLogin() {
                setUserName('customer');
                localStorage.setItem('username', 'customer');

                getUserConfig();
                remote.getCurrentWindow().setSize(800, 600, true);
                this.setProfile({
                    id: 'customer'
                });
                this.$router.replace('/home');
            },
            submitForm() {
                this.state.loading = true;
                login(this.form).then((result) => {
                    setUserName(result.data.id);
                    localStorage.setItem('username', result.data.id);

                    makeUserDataDirectory().then(() => {
                        getUserConfig();
                        this.setProfile(result.data);
                        this.state.loading = false;
                        remote.getCurrentWindow().setSize(800, 600, true);
                        this.$router.replace('/home');
                    });
                }).catch((error) => {
                    this.state.snackBarMessage = (error.response && error.response.data && error.response.data.message) || '请求失败';
                    this.$refs.snackbar.open();
                    this.state.loading = false;
                });
            },
            ...mapMutations('account', [
                'setProfile'
            ]),
            ...mapMutations('base', [
                'openSnackBar'
            ])
        }
    }
</script>

<style lang="scss" scoped="true">
    .login-page {
        height: 100%;
        .login-header {

        }
        .login-body {
            padding: 20px;
        }
        .login-footer {
            padding: 20px;
        }
    }
</style>
