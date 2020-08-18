<template>
  <div>
    
        <el-container class="container">
            
            <el-header class="head">

                <el-row>
                    <el-col :span="4">
                        <div style="margin-right:25px">
                            <img src="../assets/logo.png" @click="goBack2()">
                        </div>

                    </el-col>
                    <el-col :span="1">
                        <div class="grid-content"></div>
                    </el-col>
                    <el-col :span="6">
                        <div style="margin-top:3px">
                            <el-input clearable placeholder="随便找点什么吧" prefix-icon="el-icon-search" v-model="inputbox">
                            </el-input>
                        </div>

                    </el-col>

                    <el-col :span="13" style="text-align:right">
                        <el-col :span="6" class="welcome">
                            <!-- <div class="wel_text">{{myname}},您好！</div> -->
                            <el-link href="https://element.eleme.io" :underline="false" target="_blank" class="wel_text">{{myname}},您好！
                            </el-link>
                        </el-col>
                        <el-col :span="6" class="avator">
                            <el-popover placement="top-start" width="240" trigger="hover">
                                <div v-if="myid!=-1">
                                    <div class="item cardtxt">{{myname}}</div>
                                    <div class="item cardtxt">631803439@qq.com</div>
                                    <el-button class="item more_info" @click="longjmp('Profile')">修改个人资料</el-button>
                                    <el-button class="item logout" @click="logout()">退出登录</el-button>
                                </div>
                                <div v-if="myid==-1">
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


            <el-main>
                    
                        <div id="div1" class="toolbar" >
                            <el-tooltip effect="dark" content="提交" placement="top">
                                 <div style="font-size:25px;cursor:pointer" class="el-icon-upload" @click="punch"></div>  
                            </el-tooltip>
                                                      
                        </div>
                         
                     
                        <div id="div2" class="text">
                            <p>你见到我的时候，说明你要看的文本:id={{this.$route.query.docid}}没有加载出来。</p>
                        </div>
                        <div class="introduce">
                            <b class="intro1">编写于</b>
                            <b class="intro2">金石文档</b>
                        </div>
                   
            </el-main>

        </el-container>
  </div>
</template>

<script>

import E from "wangeditor";
export default {
    name:'doc',
    data(){
        return{
            x:[],
            editorContent:'',
            myid:-1,
            list:[],
            myname:'',
        }
    },
    methods:{
         goBack2() {
                this.$router.push({
                    name: 'Page',
                })
            },
        longjmp(name) {
                if (name === "Profile") {
                    this.$router.push({
                        path: '/profile',
                        query: {
                            id: localStorage.getItem('userID'),
                        }
                    });
                } else {
                    this.$router.push({
                        name: name,
                    });
                }
            },
       logout() {
                this.is_login = false;
                localStorage.removeItem('userID');
                localStorage.removeItem('username');
                this.longjmp("Login");
            },
      punch(){
          if(this.list[2]!=1)
            {
                alert('你无权修改此文档');
            }
            else{
                var vailable=0;
                 if(this.editorContent){
                        this.$axios(
                            {
                                    method:'post',
                                    url:'http://39.97.122.202/doc/match_edit/',
                                    data:{
                                        id:this.$route.query.docid,
                                    }
                            }
                        ).then( res =>{
                            if(res.data==1){
                                vailable=1;
                            }
                        }).catch(()=>{
                            alert('网络状态不佳，修改状态验证失败');
                        })

                        if(vailable==1)
                        {
                                
                                this.$axios(
                                {
                                    method:'post',
                                    url:'http://39.97.122.202/doc/save_doc/',
                                    data:{
                                        id:this.$route.query.docid,
                                        msg:this.editorContent,
                                        userid:this.myid
                                    }
                                }).then( res => {
                                    if(res.data==1)
                                        alert('上传成功,正在结束修改..');
                                }).catch(() =>{
                                    alert('网络状态不佳，文本上传失败');
                                })

                                this.$axios({
                                    method:'post',
                                    url:'http://39.97.122.202/doc/end_edit/',
                                    data:{
                                        id:this.$route.query.docid,
                                    }
                                }).then(res =>{
                                    if(res.data==1){
                                        alert('修改成功！');
                                    }
                                }).catch(()=>{
                                    alert('未知力量使你修改失败，希望你永远不要看到这一行字');
                                })

                        }
                        

                    }
                    else
                        alert('？？？ 你什么都没改上传什么？');
            }
                   
      }
     
    },
    mounted(){
        //首先，看这个的必须是登录的人
            if(localStorage.getItem('userID')){
                this.myid=localStorage.getItem('userID');
                this.myname=localStorage.getItem('username');
            }
                
            else
                {
                    alert('请先登录');
                     this.$router.push({
                            name: 'Login',
                         })
                }
             //提取本地用户并验证权限
               this.$axios(
                {
                    method:'post',
                    url:'http://39.97.122.202/autho/match_auth/',
                    data:{
                        id:this.myid,
                        docnum:this.$route.query.docid
                    }
                }).then( res => {
                    this.list=res.data;
                    if(this.list[0]!=1){
                        alert('你无权访问此文档');
                        this.$router.push({
                            name: 'Page',
                         })
                    }
                }).catch(() =>{
                    alert('网络状态不佳，文档权限状况未知');
                })




           var editor2 = new E('#div1', '#div2')
            editor2.customConfig.onchange = (html) => {
                 this.editorContent = html
            }
            editor2.create()
             this.x=editor2; 

        //首先读取文本id
        var docid = this.$route.query.docid;
        //云端抓取文本

        this.$axios(
            {
                method:'post',
                url:'http://39.97.122.202/doc/get_doc/',
                data:{
                    id:docid,   
                    op:3
                }
            }).then( res => {
                this.x.txt.html(res.data);
            }).catch(() =>{
                alert('网络状态不佳，文本抓取失败');
            })


           
        
    },
    components:{
       
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

    .el-container {
        position: relative;
    }

    .el-divider--horizontal {
        margin-bottom: 1px !important;
        margin-top: 0 !important;
    }

    .el-link--default {
        color: #303133;
        font-size: 17px;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        margin-top: 5px;
        border-radius: 4px;
    }

    .el-header .header-logo {
        top: 5px;
        left: 20px;
    }

    .shit {
        font-size: 13px !important;
    }

    .head {
        position: relative;
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
        color: #fbfcfe;
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
        margin-left: auto;
        margin-right: auto;
        text-align: left;
        border: 1px solid #f6f6f6;
        width: 816px;
        height: 1172px;
        background-color: #fff;
    }

    .container .text p {
        text-align: left;
    }

    .container .text .title {
        display: inline-block;
        margin: 20px 350px;
        text-align: center;
        font-size: 36px;
        font-weight: 700;
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

    .item {
        padding: 18px 0;
        font-size: 14px;
        color: #24292e;
    }

    .box-card {
        /* width: 240px;
        height: 280px; */
        margin: 0, 0;
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

    .login {
        display: block;
        color: #409eff;
        margin: 0 auto;
        width: 180px;
        margin-bottom: 20px;
    }

    .regi {
        display: block;
        color: #409eff;
        margin: 0 auto;
        width: 180px;
        margin-bottom: 20px;
    }

    .cardtxt {
        text-align: center;
    }

    .el-popover {
        position: absolute;
    }

    
    .aside {
        position: relative;
        float: right;
        display: list-item;
        margin-top: 50px;
        margin-left: 1400px;
    }
    .submit {
        margin: 30px 20px 10px -50px;
        height: 40px;
        line-height: 10px;
        font-size: 18px;
    }
    .delete {
        margin: 30px 20px 10px 50px;
        height: 40px;
        line-height: 10px;
        font-size: 18px;
    }

    .view_remark {
        background-color: #fff;
    }

    .remark_num {
        font-weight: 700;
        color: #333333;
    }
    .content {
        font-size: 20px;
        font-weight: 400;
        color: #333333;
    }
    .addition_w {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .addition {
        height: 40px;
        line-height: 10px;
        margin-left: 10px;
    }
</style>
