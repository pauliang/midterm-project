<template>
    <div>
        <el-container class="container">
            <el-header height='60px'>
                <img class="header-logo left" src="../assets/logo.png" alt="logo">
                <div class="header-info right">
                    <span>金石文档欢迎您！&nbsp;</span>
                    <el-link type="info" :underline="false">登录</el-link>&nbsp;
                    <el-link type="danger" :underline="false">注册</el-link>&nbsp;
                </div>
            </el-header>
            <el-main>
                <div id="div1" class="toolbar"></div>
                <div id="div2" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
                    <board :choice=choice></board>
                    <p>{{msg}}</p>
                </div>
                <div class="introduce">
                    <b class="intro1">编写于</b>
                    <b class="intro2">金石文档</b>
                </div>
                <!--            <div id="div1" class="toolbar"></div>-->
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import E from "wangeditor";
    import board from '@/components/board.vue'
    export default {
        name: 'edt',
        props:{
            choice:Number,
            msg:String
        },
        mounted(){
            var editor2 = new E('#div1','#div2')
            editor2.customConfig.onchange = (html) => {
                this.formArticle.content = html
            }
            editor2.create()
        },
        components:{
            board
        }
    }
</script>
<style scoped>
    .container {
        background-color: #f2f2f2;
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
    .el-header {
        position: relative;
        width: 100%;
        background-color: #fff;
    }
    .el-header .header-logo {
        top: 5px;
        left: 20px;
    }
    .el-header .header-info {
        height: 60px;
        line-height: 60px;
        font-size: 12px;
        color: gray;
        vertical-align: top;
    }

    .el-header .header-info .el-link {
        margin:5px 0;
        font-size: 12px;
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
        text-align: left;
        border: 1px solid #f6f6f6;
        width: 816px;
        height: 1172px;
        background-color: #fff;
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

</style>