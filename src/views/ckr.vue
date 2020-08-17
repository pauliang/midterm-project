<template>
  <div style="width:150px">
      <el-button @click="a">
          登录
      </el-button>
      <el-button @click="b">
          我是？
      </el-button>
      <el-button @click="c">
          退出
      </el-button >
  </div>
</template>

<script>
export default {
    name:'test',
    data(){
        return{
            yna:'zzyyyds',
           yid:1
        }
    },
    methods:{
        a(){
            localStorage.setItem('username',this.yna);
           localStorage.setItem('userID',this.yid);
        },
        b(){
            if(localStorage.getItem('username')==null)
                alert('你没登录');
            else{
                alert(localStorage.getItem('username'));
                alert(localStorage.getItem('userID'));
            }
        },
        c(){
            localStorage.removeItem('username');
            localStorage.removeItem('userID');
        }
    }
}
</script>

<style>

</style>