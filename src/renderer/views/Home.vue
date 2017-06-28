<template>
    <div class="page">
        <md-toolbar class="draggable main-toolbar">
            <span style="flex: 1"></span>
            <md-button class="md-icon-button">
                <md-icon>inbox</md-icon>
            </md-button>
            <span style="flex: 0 1 50px"></span>
            <md-speed-dial md-theme="darkBlue" md-direction="bottom">
                <md-button class="md-fab md-primary" md-fab-trigger md-theme="darkBlue">
                    <md-icon md-icon-morph>close</md-icon>
                    <md-icon class="avatar-icon" v-if="profile.id !== 'customer'">
                        <img :src="profile.avatar" alt="Avatar">
                    </md-icon>
                    <md-icon v-if="profile.id === 'customer'">person</md-icon>
                </md-button>

                <md-button class="md-fab md-mini md-clean md-primary" md-theme="darkBlue" @click.native="logout">
                    <md-icon>exit_to_app</md-icon>
                </md-button>
            </md-speed-dial>
        </md-toolbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import {remote} from 'electron';

    const {cleanLoginUserInfo} = remote.getGlobal('cacheModule');

    export default {
        created() {
            if (!this.profile.id) {
                this.setProfile({
                    id: 'customer'
                });

                /*if (!localStorage.getItem('username')) {
                    this.logout();
                } else {

                }*/
            }
            this.$router.replace('/home/project');
        },
        data() {
            return {

            };
        },
        methods: {
            logout() {
//                localStorage.clear();
                cleanLoginUserInfo();
                this.$router.replace('/login');
            },
            ...mapMutations('account', [
                'setProfile'
            ]),
        },
        computed: {
            ...mapState('account', [
                'profile'
            ]),
            ...mapState('home', {})
        }
    }
</script>

<style lang="scss" scoped="true">
    .main-toolbar {
        height: 75px;
        z-index: 5;
        .md-speed-dial {
            align-self: baseline;
            margin-top: 10px;
            .avatar-icon {
                top: 0px;
                margin: 0px;
                height: 56px;
                width: 56px;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
            &.md-active [md-fab-trigger] [md-icon-morph] + .md-icon.avatar-icon {
                transform: rotate(90deg);
            }
        }
    }
</style>
