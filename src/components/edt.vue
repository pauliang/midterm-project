<template>
  <div>
    <el-container>      
        <el-main>
            <div id="div2" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
                <p>{{msg}}</p>
            </div>
            <div style="padding: 5px 0; color: #ccc"><b>分离输入框和菜单栏,添点啥都行</b></div>
            <div id="div1" class="toolbar">
            </div>
        </el-main>
    </el-container>
  </div>
</template>

<script>
    import E from "wangeditor";
    export default {
        name: 'edt',
        props:{
            msg:String
        },
        mounted(){
            var editor2 = new E('#div1','#div2')
            editor2.customConfig.onchange = (html) => {
                this.formArticle.content = html
            }
            editor2.create()
        }
    }
</script>
<style scoped>
    .toolbar {
        border: 3px solid rgb(93, 141, 196);
    }
    .text {
        text-align: left;
        border: 3px solid rgb(93, 141, 196);
        height: 400px;
    }
</style>