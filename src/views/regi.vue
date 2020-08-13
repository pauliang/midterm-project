<template>
<div class="bg2">
    <el-container>
      
     
        <el-container class="mid">

            <el-main class="zhihu" v-loading="loading">
                <el-form  ref="form" :model="form"   >
                     <el-form-item label-width="0px">
                       <div class="mainhead">
                           <span style="font-weight:bold;margin-right:30px;padding-bottom:10px;border-bottom:#409EFF;
    border-width: 2px;
    border-bottom-style:solid;">账户注册</span>
                        </div>
                    </el-form-item>
                    <el-form-item label-width="0px">
                        <el-input v-model="form.name" placeholder="手机号或邮箱"></el-input>
                    </el-form-item>

                    <el-form-item label-width="0px" >
                        <el-input v-model="form.code"  placeholder="密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item label-width="0px" >
                        <el-input v-model="form.code2"  placeholder="再次确认密码" show-password></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(form.name,form.code,form.code2)"  style="width:380px;">注册</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info"   style="width:380px;">游客访问</el-button>
                    </el-form-item>

                </el-form>
                       <el-divider></el-divider>
                    <div style="font-size:14px;">

                       <div> <span>注册即代表同意《金石协议》《隐私保护指引》</span> </div>
                       <span>已有金石账户？点击此处进行<el-button type="text" @click="bump_login">账户登录</el-button></span>
                    </div>
            </el-main>

        </el-container>
            <el-footer></el-footer>
</el-container>
</div>
</template>


<script>
export default {
    name:'regi',
    data()
    {
        return{
             form: {
          name: '',
          delivery: false,
          code:'',
          code2:'',
        },
         loading:false,
        }
    },
    methods:
    {
        onSubmit(username,pwda,pwdb) {
        console.log('submit!');
        // alert("OK!");
        // this.loading=true;
         let params={username:username,pwda:pwda,pwdb:pwdb};
            this.$http.post('/test.php', params).then(
                response => {
                    var fmsg='请重新注册！'
                    var rmsg=response.data
                    if(rmsg=='成功') alert('注册成功！');
                    else alert(rmsg+fmsg);
                    // alert(response.data)
                    // console.log(response)
                },
                err => {
                    console.log(err)
                }).catch((error) => {
                console.log(error)
            })
      },
      bump_login()
      {
          this.$router.push({ path: "/login"});
      }
    }
}
</script>



<style scoped>
.bg2
{
    /*width: 100%;*/
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position:fixed;
    background-image:url("../assets/regi.jpg");
    position: fixed;
    background-size: 100% 100%;
    overflow-y: auto;
}
body{
  margin:0;
  padding:0;
}

 .mid
    {
      margin-top:8%;
      height:100%;
      width: 450px;
   
      margin-left:auto;
       margin-right:auto;
      overflow-x: auto;

    }

    .zhihu
    {
        background-color: white;
    }

.swi
{
    float: left;
    top:9.5px;
    bottom: 0px;
     margin: auto;
}


.mainhead
{
    font-size: 16px;
    float: left;

}
</style>
