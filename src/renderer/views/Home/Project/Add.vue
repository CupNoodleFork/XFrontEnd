<template>
    <div class="full-parent add-project-wrap">
        <md-layout md-column>
            <md-layout md-theme="app" md-vertical-align="center">
                <md-layout md-flex="5" class="mr-10">
                    <md-icon class="md-primary">move_to_inbox</md-icon>
                </md-layout>
                <md-layout>
                    <span class="md-title md-primary">添加项目</span>
                </md-layout>
            </md-layout>
            <md-layout md-vertical-align="center">
                <md-layout md-flex="20">
                    <span class="md-subheading">项目名称:</span>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <md-input placeholder="请输入项目名称" v-model="projectName"></md-input>
                    </md-input-container>
                </md-layout>
            </md-layout>
            <md-layout md-vertical-align="center">
                <md-layout md-flex="20">
                    <span class="md-subheading">项目描述:</span>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <md-input placeholder="请输入项目描述" v-model="projectDescription"></md-input>
                    </md-input-container>
                </md-layout>
            </md-layout>
            <md-layout md-vertical-align="center">
                <md-layout md-flex="20">
                    <span class="md-subheading">项目路径:</span>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <md-input placeholder="请输入项目路径" v-model="projectPath" disabled></md-input>
                    </md-input-container>
                </md-layout>
            </md-layout>
            <md-layout md-align="end" md-gutter="16">
                <md-button class="md-primary" @click.native="addCancel">取消</md-button>
                <md-button class="md-raised md-primary" @click.native="addSuccess({path: projectPath, description: projectDescription, name: projectName})">确定</md-button>
            </md-layout>
        </md-layout>
    </div>
</template>

<script>
    import path from 'path';

    export default {
        props: {
            projectPath: {
                type: String,
                required: true
            },
            addSuccess: {
                type: Function
            },
            addCancel: {
                type: Function
            }
        },
        created() {
            this.projectName = path.basename(this.projectPath);
        },
        computed: {

        },
        data() {
            return {
                projectName: '',
                projectDescription: ''
            };
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped="true">
    .full-parent {
        width: 100%;
        height: 100%;
    }
    .mr-10 {
        margin-right: 10px;
    }
    .mr-15 {
        margin-right: 15px;
    }
    .md-title.md-primary {
        color: #2196f3;
    }
    .add-project-wrap {
        padding: 30px;
    }
</style>