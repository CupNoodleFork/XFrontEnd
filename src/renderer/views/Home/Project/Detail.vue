<template>
    <div class="full-parent detail-project-wrap">
        <md-layout md-column class="full-parent">
            <md-tabs md-centered class="md-warn full-parent" :md-dynamic-height="false" md-theme="light-blue" v-if="projectInfo.id">
                <md-tab md-label="ReadMe" md-icon="description" style="overflow: auto;">
                    <div v-if="markdown !== undefined && markdown.length > 0 && !loadingMarkDown" v-html="md.render(markdown)"></div>
                    <div v-if="markdown !== undefined && markdown.length == 0 && !loadingMarkDown"></div>
                    <div v-if="markdown === undefined && !loadingMarkDown">
                        文件不存在
                    </div>
                    <md-layout v-if="loadingMarkDown" md-column md-align="center" md-vertical-align="center">
                        <md-layout class="mt-50">
                            <md-spinner :md-size="100" :md-stroke="1" md-indeterminate></md-spinner>
                        </md-layout>
                        <md-layout class="mt-20">
                            <span>加载中...</span>
                        </md-layout>
                    </md-layout>
                </md-tab>

                <md-tab md-label="打开" md-icon="apps">
                    <md-layout>
                        <md-layout class="app-wrap" md-flex="25" md-align="center">
                            <md-button class="md-fab" @click.native="openInFolder">
                                <md-icon>folder_open</md-icon>
                            </md-button>
                        </md-layout>
                        <md-layout class="app-wrap" md-flex="25" md-align="center">
                            <md-button class="md-fab md-clean" @click.native="openInApplication('vscode')">
                                <div class="vscode-icon"></div>
                            </md-button>
                        </md-layout>
                        <md-layout class="app-wrap" md-flex="25" md-align="center">
                            <md-button class="md-fab md-clean" @click.native="openInApplication('webstorm')">
                                <div class="webstorm-icon"></div>
                            </md-button>
                        </md-layout>
                        <md-layout class="app-wrap" md-flex="25" md-align="center">
                            <md-button class="md-fab md-clean" @click.native="openInApplication('sublime')">
                                <div class="sublime-icon"></div>
                            </md-button>
                        </md-layout>
                        <md-layout class="app-wrap" md-flex="25" md-align="center">
                            <md-button class="md-fab md-clean" @click.native="openInApplication('xcode')">
                                <div class="xcode-icon"></div>
                            </md-button>
                        </md-layout>
                    </md-layout>
                </md-tab>

                <md-tab md-label="设置" md-icon="settings">

                </md-tab>
            </md-tabs>
        </md-layout>
    </div>
</template>

<script>
    import {remote, shell} from 'electron';
    import path from 'path';
    import markdownIt from 'markdown-it';

    const {openApplication} = remote.getGlobal('applicationModule');
    const {getProjectReadMeMarkDownFile} = remote.getGlobal('cacheModule');

    export default {
        props: {
            projectInfo: {
                type: Object,
                required: true
            }
        },
        watch: {
            projectInfo(value, oldValue) {
                if (value !== oldValue) {
                    this.getReadMeMarkDown();
                }
            }
        },
        created() {
            if (this.projectInfo.id) {
                this.getReadMeMarkDown();
            }
        },
        data() {
            return {
                loadingMarkDown: true,
                markdown: undefined,
                md: new markdownIt()
            }
        },
        methods: {
            openInFolder() {
                shell.showItemInFolder(this.projectInfo.path);
            },
            openInApplication(appName) {
                openApplication(appName, this.projectInfo.path);
            },
            getReadMeMarkDown() {
                this.loadingMarkDown = true;


                getProjectReadMeMarkDownFile(this.projectInfo.path).then((result) => {
                    this.markdown = result;
                    this.loadingMarkDown = false;
                }).catch((error) => {
                    this.loadingMarkDown = false;
                    this.markdown = undefined;
                });
            }
        }
    }
</script>

<style lang="scss" scoped="true">
    .full-parent {
        width: 100%;
        height: 100%;
    }
    .detail-project-wrap {
        .bar-wrap {
            flex: 0 0 56px;
        }

        .app-wrap {
            height: 100px;
        }
    }
    .mt-20 {
        margin-top: 20px;
    }
    .mt-50 {
        margin-top: 50px;
    }
</style>

<style lang="scss">
    .detail-project-wrap {
        .md-tabs-content {
            height: calc(100% - 72px) !important;
            .md-tabs-wrap {
                height: 100%;
            }
        }
        .md-tab {
            height: 100%;
        }
    }
</style>