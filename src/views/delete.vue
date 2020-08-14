<template>
    <div>

        <el-container class="whole">
            <particles-bg type="cobweb" :bg="true" />
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
                        <el-col :span="6" class="welcome">
                            <el-link href="https://element.eleme.io" target="_blank" class="wel_text">既然选择了远方，您好！</el-link>
                        </el-col>
                        <el-col :span="6" class="avator">
                            <el-popover
                                    placement="top-start"
                                    width="240"
                                    trigger="hover">
                                <div v-if="islogin==true">
                                    <div class="item cardtxt">既然选择了远方</div>
                                    <div class="item cardtxt">1002609249@qq.com</div>
                                    <el-button class="item more_info" @click="longjmp('Profile')">修改个人资料</el-button>
                                    <el-button class="item logout" @click="logout()">退出登录</el-button>
                                </div>
                                <div v-if="islogin==false">
                                    <div class="item cardtxt">游客</div>
                                    <div class="item cardtxt">您尚未登陆</div>
                                    <el-button class="item login" @click="longjmp('Login')">登录</el-button>
                                    <el-button class="item regi" @click="longjmp('Regi')">注册</el-button>
                                </div>

                                <el-avatar icon="el-icon-user-solid" slot="reference"></el-avatar>
                            </el-popover>
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
                        <el-row :gutter="20">
                            <el-col :span="2">
                                <div class="grid-content bg-purple delete">回收站</div>
                            </el-col>
                        </el-row>
                        <div class="box">
                            <el-row type="flex" class="row-bg pic" justify="left" >
                                <el-col :span="4" >
                                    <div style="margin-right:25px; padding-top: 25px">
                                        <img src="../assets/word.png" >
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg paragraph" justify="left">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple content">我是华盛顿，</div>
                                    <div class="grid-content bg-purple content">我来到B站了！</div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="box">
                            <el-row type="flex" class="row-bg pic" justify="left" >
                                <el-col :span="4" >
                                    <div style="margin-right:25px; padding-top: 25px">
                                        <img src="../assets/word.png">
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg paragraph" justify="left">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple content">我是特朗普，</div>
                                    <div class="grid-content bg-purple content">我就是神啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊！</div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="box">
                            <el-row type="flex" class="row-bg pic" justify="left" >
                                <el-col :span="4" >
                                    <div style="margin-right:25px; padding-top: 25px">
                                        <img src="../assets/word.png">
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg paragraph" justify="left">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple content">我是奥巴马，</div>
                                    <div class="grid-content bg-purple content">我也来到B站了！</div>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="box">
                            <el-row type="flex" class="row-bg pic" justify="left" >
                                <el-col :span="4" >
                                    <div style="margin-right:25px; padding-top: 25px">
                                        <img src="../assets/word.png">
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row type="flex" class="row-bg paragraph" justify="left">
                                <el-col :span="4">
                                    <div class="grid-content bg-purple content">我是奥巴马，</div>
                                    <div class="grid-content bg-purple content">我也来到B站了！</div>
                                </el-col>
                            </el-row>
                        </div><div class="box">
                        <el-row type="flex" class="row-bg pic" justify="left" >
                            <el-col :span="4" >
                                <div style="margin-right:25px; padding-top: 25px">
                                    <img src="../assets/word.png">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg paragraph" justify="left">
                            <el-col :span="4">
                                <div class="grid-content bg-purple content">我是奥巴马，</div>
                                <div class="grid-content bg-purple content">我也来到B站了！</div>
                            </el-col>
                        </el-row>
                    </div><div class="box">
                        <el-row type="flex" class="row-bg pic" justify="left" >
                            <el-col :span="4" >
                                <div style="margin-right:25px; padding-top: 25px">
                                    <img src="../assets/word.png">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg paragraph" justify="left">
                            <el-col :span="4">
                                <div class="grid-content bg-purple content">我是奥巴马，</div>
                                <div class="grid-content bg-purple content">我也来到B站了！</div>
                            </el-col>
                        </el-row>
                    </div><div class="box">
                        <el-row type="flex" class="row-bg pic" justify="left" >
                            <el-col :span="4" >
                                <div style="margin-right:25px; padding-top: 25px">
                                    <img src="../assets/word.png">
                                </div>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg paragraph" justify="left">
                            <el-col :span="4">
                                <div class="grid-content bg-purple content">我是奥巴马，</div>
                                <div class="grid-content bg-purple content">我也来到B站了！</div>
                            </el-col>
                        </el-row>
                    </div>


                    </el-main>
                </el-container>
            </el-container>
            <el-footer>
                <img src="../assets/footer.png" >
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import { ParticlesBg } from "particles-bg-vue";
    export default {
        components: {
            ParticlesBg,
        },
        name: "delete",
        data() {
            return {
                isCollapse: false,
                emm:'1-1',
                inputbox:'',
                which:'worktable',
                islogin:true,
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
            },
            shortjmp(which){
                this.which = which
            },
            longjmp(name){
                this.$router.push({
                    name:name,
                })
            },
            logout(){
                this.islogin=false
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
    .el-container {
        position: relative;
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
    .delete {
        position: relative;
        text-align: center;
        color: #555555;
        font: bold 24px arial,sans-serif ;
        line-height: 36px;
        margin: 0 auto;
        border-radius: 4px;
        min-height: 36px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .box {
        float: left;
        margin: -10px 100px 10px 0;
    }
    .box img {
        display: block;
    }
    .pic {
        padding: 0;
        position: relative;
        margin: 0 12px 20px;
    }
    .content {
        margin: 5px 50px 10px -45px;
        width: 200px;
        height: 20px;
        background-color: #ffffff;
    }
    .bg-purple {
        background: #ffffff;
        text-align: center;
        line-height: 18px;
        font-weight: 600;
    }
    .el-footer {
        padding: 0 0;
    }
    .el-footer img {
        display: block;
        width: 100%;
    }
    .whole {
        height: 1500px;
    }
</style>