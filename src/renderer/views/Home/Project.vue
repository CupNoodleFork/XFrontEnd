<template>
    <md-layout md-column class="sub-page">
        <md-toolbar class="sub-toolbar sub-toolbar-shadow none-select">
            <div class="md-toolbar-container">
                <div class="md-title">项目管理</div>
                <md-button class="md-fab md-mini md-primary" md-theme="darkBlue" @click.native="selectDirectory">
                    <md-icon>add</md-icon>
                </md-button>
            </div>
        </md-toolbar>
        <md-layout>
            <md-layout class="side-left" md-flex="30" style="z-index: 1;">
                <md-layout md-column md-vertical-align="center" md-align="center" v-if="projectList.length == 0">
                    <md-layout md-flex="40" class="side-color-gray">
                        <md-icon class="md-size-4x">sentiment_neutral</md-icon>
                    </md-layout>
                    <md-layout class="side-color-gray">
                        <span class="md-title">暂无项目</span>
                    </md-layout>
                </md-layout>
                <md-list class="md-double-line md-transparent" v-if="projectList.length > 0">
                    <md-list-item v-for="(project, index) in projectList" :key="project.id" @click.native="toDetail(project)">
                        <md-icon class="md-primary">folder</md-icon>
                        <div class="md-list-text-container">
                            <span v-text="project.name"></span>
                            <span v-text="project.description"></span>
                        </div>
                        <md-divider class="md-inset"></md-divider>
                        <!--<md-ink-ripple />-->
                    </md-list-item>
                </md-list>
            </md-layout>
            <md-layout>
                <add-project v-if="rightView === 'add'" :project-path="addProjectPath" :add-cancel="addProjectCancel" :add-success="addProjectSuccess"></add-project>
                <detail-project v-if="rightView === 'detail'" :project-info="currentProject"></detail-project>
            </md-layout>
        </md-layout>
    </md-layout>
</template>

<script>
    import {mapMutations, mapState, mapActions} from 'vuex';
    import AddProject from './Project/Add.vue';
    import DetailProject from './Project/Detail.vue';

    import { remote } from 'electron';
    const { dialog } = remote;

    const {addUserProject} = remote.getGlobal('cacheModule');

    export default {
        components: {
            AddProject,
            DetailProject
        },
        created() {
            this.setProjectListFromCache().then(() => {
                if (this.projectList.length > 0) {
                    this.currentProject = this.projectList[0];
                }
            });
        },
        data() {
            return {
                rightView: 'detail',
                addProjectPath: '',
                currentProject: {}
            };
        },
        computed: {
            ...mapState('project', [
                'projectList'
            ])
        },
        methods: {
            toDetail(projectInfo) {
                this.currentProject = projectInfo;
            },
            addProjectCancel() {
                this.rightView = 'detail';
            },
            addProjectSuccess(projectInfo) {
                const projectObject = addUserProject(projectInfo);

                this.rightView = 'detail';
                this.setProjectList(projectObject.projectList);
                this.currentProject = projectObject.project;
            },
            selectDirectory() {
                dialog.showOpenDialog({properties: ['openDirectory']}, (filePaths) => {
                    if (filePaths) {
                        this.addProjectPath = filePaths[0];
                        this.rightView = 'add';
                    }
                });
            },
            ...mapActions('project', [
                'setProjectListFromCache'
            ]),
            ...mapMutations('project', [
                'setProjectList'
            ])
        }
    }
</script>

<style lang="scss">
    .side-left {
        overflow: auto;
        box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.21);
        background: #f7f7f7;
        .side-color-gray {
            color: rgba(0, 0, 0, 0.26);
        }
        .md-list {
            width: 100%;
            .md-list-item {
                .md-list-item-container {
                    padding-left: 23px;
                }
            }
        }
    }
</style>
