<template>
    <div>
<!--        <particles-bg type="cobweb" :bg="true" />-->
        <el-container>

            <el-header class="head">

                <el-row>
                    <el-col :span="4" >
                        <div style="margin-right:25px">
                            <img src="../assets/logo.png" >
                        </div>

                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="6">
                        <div style="margin-top:3px">
                            <el-input
                                    clearable
                                    placeholder="随便找点什么吧"
                                    prefix-icon="el-icon-search"
                                    v-model="inputbox">
                            </el-input>
                        </div>

                    </el-col>

                    <el-col :span="13" style="text-align:right">

                        <el-col :span="20"><el-avatar icon="el-icon-user-solid"></el-avatar></el-col>
                        <el-col :span="2" style="margin-top:10px">
                            <el-link href="https://element.eleme.io" target="_blank" style="color:#fbfcfe">登 录</el-link>
                        </el-col>
                        <el-col :span="2" style="text-align:center;margin-top:10px">
                            <el-link href="https://element.eleme.io" target="_blank" style="color:#fbfcfe">注 册</el-link>
                        </el-col>

                    </el-col>
                </el-row>

            </el-header>

            <el-divider/>


            <el-container>
                <el-aside>
                    <el-menu
                            :default-active="emm"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            :collapse="isCollapse"
                    >
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span slot="title">工作台</span>
                            </template>

                            <el-menu-item-group>
                                <el-menu-item index="1-1" class="shit">最近浏览</el-menu-item>
                                <el-menu-item index="1-2" class="shit">我的文档</el-menu-item>
                                <el-menu-item index="1-3" class="shit">我的收藏</el-menu-item>
                            </el-menu-item-group>

                        </el-submenu>


                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">团队空间</span>
                        </el-menu-item>

                        <el-menu-item index="3">
                            <i class="el-icon-delete-solid"></i>
                            <span slot="title">回收站</span>
                        </el-menu-item>


                        <el-menu-item index="4">
                            <i class="el-icon-s-tools"></i>
                            <span slot="title">帮助中心</span>
                        </el-menu-item>

                        <el-menu-item index="5" @click="zipornot()">

                            <i class="el-icon-s-unfold" v-if="isCollapse" ></i>
                            <span slot="title" v-if="isCollapse">光翼展开!</span>
                            <i class="el-icon-s-fold" v-if="!isCollapse" ></i>
                            <span slot="title" v-if="!isCollapse">收起</span>
                            <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;margin-left:0">
                            <el-radio-button :label="false">展开</el-radio-button>
                            <el-radio-button :label="true">收起</el-radio-button>
                            </el-radio-group> -->
                        </el-menu-item>
                    </el-menu>


                </el-aside>

                <el-container style="min-height:650px">
                    <el-main>
                        Main
                    </el-main>
                    <el-footer>
                        Footer,我是页脚，咸的蛋疼的时候可以加一点
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    // import { ParticlesBg } from "particles-bg-vue";
    export default {
        components: {
            // ParticlesBg
        },
        name: "base",
        data() {
            return {
                isCollapse: false,
                emm:'1-1',
                inputbox:'',

            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            zipornot()
            {
                this.isCollapse=!this.isCollapse;
            }
        },
    };
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
    }
    .shit{
        font-size:13px !important;
    }
    .head{
        background: rgba(8, 1, 1, 0.342);
        padding: 0;
    }
    .el-divider--horizontal{
        margin-bottom: 1px !important;
        margin-top: 0px !important;
    }
    .el-link--default{
        color: #303133;
        font-size: 17px;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        margin-top:5px;

        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        line-height: 36px;
        padding: 10px;
    }
</style>