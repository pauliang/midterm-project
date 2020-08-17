<template>
    <el-container>
        <el-main class="main">

            <el-row>
                <el-col :span="24" class="choice">
                    <h1>生活出行</h1>
                </el-col>
            </el-row>
            <el-row>
                <el-card shadow="hover" class="box" v-for="o in board_list" :key="o">
                    <div>
                        <el-image :src=o.url  style="height:220px;width:180px"></el-image>
                    </div>
                    <el-button class="b_name"  @click="goBoard(o.name)">{{ o.name }}</el-button>
                </el-card>
            </el-row>

        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: 'model_life',
        data(){
            return {
                which:'worktable',
                board_list:[
                    {name:'康奈尔笔记法',url:require('@/assets/model2.png')},
                    {name:'四象限法则',url:require('@/assets/model3.png')},
                    {name:'阅读笔记模板',url:require('@/assets/model4.png')},
                ]
            }
        },
        methods:{
            goBoard(name) {
                this.$router.push({
                    name:'Model1',
                    params:{
                        id:name
                    }
                })
            }
        },
        props:{
            choice:Number,
            msg:String
        },
    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
    }
    .profile {
        background-color: #f3f3f3;
    }

    .shit{
        font-size:13px !important;
    }
    .head{
        background: rgba(8, 1, 1, 0.342);
        padding: 0;
    }
    .head .welcome {
        position: absolute;
        float: right;
    }
    .head .wel_text {
        position: absolute;
        width: 400px;
        height: 30px;
        color:#fbfcfe;
        float: right;
        margin-right: 20px;
        margin-top: 5px;
        line-height: 30px;
    }
    .head .avator {
        position: relative;
        width: 150px;
        height: 40px;
        float: right;
        margin-right: 100px;
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

    .left {
        position: absolute;
        top: 0;
        left: 0;
    }

    .right {
        position: absolute;
        top: 0;
        right: 0;
    }
    .w {
        height: 1200px;
    }
    .container {
        background-color: #f2f2f2;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 220px;
        min-height: 600px;
    }
    .shit{
        font-size:13px !important;
    }
    .head{
        position: relative;
        background-color: #aba8a8;
        padding: 0;
    }
    .head .welcome {
        position: absolute;
        float: right;
    }
    .head .wel_text {
        position: absolute;
        width: 400px;
        height: 30px;
        color:#fbfcfe;
        float: right;
        margin-right: 20px;
        margin-top: 5px;
        line-height: 30px;
    }
    .head .avator {
        position: relative;
        width: 150px;
        height: 40px;
        float: right;
        margin-right: 100px;
    }
    .el-container {
        position: relative;
    }
    .el-divider--horizontal{
        margin-bottom: 1px !important;
        margin-top: 0 !important;
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
    li {
        list-style: none;
        display: inline-block;
    }
    .left {
        position: absolute;
        top: 0;
        left: 0;
    }
    .right {
        position: absolute;
        top: 0;
        right: 20px;
    }
    .container .el-main {
        position: relative;
    }
    .container .toolbar {
        margin: 10px auto;
        height: 40px;
        width: 750px;
        border: 1px solid #f6f6f6;
    }
    .container .text {
        margin-left:auto;
        margin-right:auto;
        text-align: center;
        border: 1px solid #f6f6f6;
        width: 816px;
        height: 1172px;
        background-color: #fff;
    }
    .el-menu {
        background-color: #f2f2f2;
    }
    .introduce {
        padding: 10px 0 0;
        color: #616161;
        text-align: center;
    }
    .introduce .intro1 {
        font-size: 12px;
        color: #a5a5a5;
        -webkit-font-smoothing: antialiased;
    }
    .introduce .intro2 {
        fill: #4a5056 !important;
    }
    .nav {
        display: block;
        margin: 0 auto 0 auto;
        line-height: 56px;
        height: 56px;
        text-align: center;
        color: #898c8f;
        font-size: 16px;
    }
    .title {
        margin-top: 15px;
        font-size: 18px;
        font-weight: 700;
        color: #53575c;
        width: 150px;
    }
    .all {
        width: 150px;
        border-bottom: 1px solid #d0d1d2;
        border-top: 1px solid #d0d1d2;
        padding-bottom: 15px;
    }
    .third {
        margin-top: 15px;
    }
    .main {
        position: relative;
        height: 800px;
    }
    .choice{
        text-align: left;
        font-size: 24px;
    }
    .box {
        float: left;
        margin: -20px 40px 60px 0;
        width: 220px;
        height: 300px;
    }
    .b_name {
        margin: 8px -10px;
        width: 180px;
    }
    .plus {
        font-size: 180px;
        height:220px;
        margin-top:4px;
        color: #959da5;
        font-weight: 400;
    }
    .pic {
        padding: 0;
        position: relative;
        margin: 0 12px 20px;
    }
    .content {
        margin: 0 60px 10px 9px;
        width: 200px;
        height: 20px;
        background-color: #ffffff;
    }
    .bg-purple {
        background: #f2f2f2;
        text-align: center;
        font-size: 18px;
        line-height: 10px;
        color: #4d4d4d;
        font-weight: 400;
    }
    .el-footer {
        padding: 0 0;
    }
    .el-footer img {
        display: block;
        width: 100%;
    }
    .item {
        padding: 18px 0;
        font-size: 14px;
        color: #24292e;
    }
    .box-card {
        /* width: 240px;
        height: 280px; */
        margin: 0,0;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
    }
    .more_info {
        display: block;
        color: #409eff;
        margin: 0 auto;
        width: 180px;
    }
    .logout {
        display: block;
        color: #c81623;
        margin: 10px auto 0;
        width: 180px;
        margin-bottom: 20px;
    }
    .login{
        display: block;
        color: #409eff;
        margin: 0 auto;
        width: 180px;
        margin-bottom: 20px;
    }
    .regi{
        display: block;
        color: #409eff;
        margin: 0 auto;
        width: 180px;
        margin-bottom: 20px;
    }
    .cardtxt {
        text-align: center;
    }
</style>