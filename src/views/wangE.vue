<template>
  <div>
      <div id="div1" class="text">
        <p>欢迎使用 wangEditor 编辑器</p>
    </div>

<button id="btn1" @click="a" >获取html并发送</button>
<button id="btn2" @click="b">获取后端文档</button>
  </div>
</template>

<script>
import E from "wangeditor";
export default {
    data(){
        return{
            id:1,
            x:[],
            editorContent:'',
        }
    },
    methods:{
      a(){
          alert(this.editorContent)
         this.$axios(
                {
                    method:'post',
                    url:'http://39.97.122.202/User/register/',
                    data:{
                        num:this.id,
                        msg:this.editorContent
                    }
                }).then(
                response => {
                   console.log(response.data)
                },
                err => {
                    console.log(err)
                }).catch((error) => {
                console.log(error)
            })
      },
      b(){
            alert(this.x.txt.html()) 
                        this.$axios(
                    {
                        method:'post',
                        url:'http://39.97.122.202/User/register/',
                        data:{
                            num:this.id,
                        }
                    }).then(
                    response => {
                        this.editorContent=response.data;
                        this.x.txt.html(this.editorContent);
                    },
                    err => {
                        console.log(err)
                    }).catch((error) => {
                    console.log(error)
                })
           
      }
    },
    mounted(){
        var editor = new E('#div1')

       editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
        this.x=editor
    }
}
</script>

<style>

</style>