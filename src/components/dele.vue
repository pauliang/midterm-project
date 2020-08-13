<template>
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
                        <div class="grid-content bg-purple content">我是林肯，</div>
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
                        <div class="grid-content bg-purple content">我是柯立芝，</div>
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
                    <div class="grid-content bg-purple content">我是罗斯福，</div>
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
                    <div class="grid-content bg-purple content">我是胡佛，</div>
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
        </el-main>
    </el-container>
</template>

<script>
    // import { ParticlesBg } from "particles-bg-vue";
    export default {
        // components: {
        //         ParticlesBg
        //     },
        name:'dele',
    }
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