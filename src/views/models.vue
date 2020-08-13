<template>
    <div>
        <el-container class="container w">
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
                            <el-avatar icon="el-icon-user-solid"></el-avatar>
                        </el-col>
                    </el-col>
                </el-row>

            </el-header>
            <el-divider/>
            <el-container>
                <el-aside class="aside">
                    <el-menu :default-active="emm" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

                        <el-menu-item index="1" class="nav title">
                            <span slot="title">金石模板</span>
                        </el-menu-item>

                        <el-menu-item index="2" class="nav all">
                            <span slot="title">全部模板</span>
                        </el-menu-item>

                        <el-menu-item index="3" class="nav third">
                            <span slot="title">工作效率</span>
                        </el-menu-item>

                        <el-menu-item index="4" class="nav">
                            <span slot="title">团队协作</span>
                        </el-menu-item>

                        <el-menu-item index="5" class="nav">
                            <span slot="title">生活出行</span>
                        </el-menu-item>

                        <el-menu-item index="6" class="nav">
                            <span slot="title">学生必备</span>
                        </el-menu-item>

                        <el-menu-item index="7" class="nav">
                            <span slot="title">行业模板</span>
                        </el-menu-item>
                    </el-menu>

                </el-aside>

                <el-main class="main">
                    <el-row>
                        <el-col :span="24" class="choice">
                            <h1>全部模板</h1>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-card shadow="hover" class="box" v-for="o in board_list" :key="o">
                            <div v-if="o.name=='空白模板'">
                                <i class="el-icon-circle-plus-outline plus" ></i>
                            </div>
                            <div v-else>
                                <el-image :src=o.url  style="height:220px;width:180px"></el-image>
                            </div>
                            <el-button class="b_name"  @click="goBoard(o.name)">{{ o.name }}</el-button>
                        </el-card>
                    </el-row>

                </el-main>
            </el-container>
            <el-footer>
                <img src="../assets/footer.png" >
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'pre',
        data(){
            return {
                board_list:[
                    {name:'空白模板'},
                    {name:'会议纪要模板',url:require('@/assets/model1.png')},
                    {name:'康奈尔笔记法',url:require('@/assets/model2.png')},
                    {name:'四象限法则',url:require('@/assets/model3.png')},
                    {name:'阅读笔记模板',url:require('@/assets/model4.png')},
                    {name:'项目策划模板',url:require('@/assets/model5.png')}
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
    }
    .box {
        float: left;
        margin: 15px 15px;
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
</style>