<template>
    <div class="outer"  @mouseover="overShow" @mouseout="shut">
        <el-card :body-style="{ padding: '0px', height:'180px'}" shadow="hover" style="border-radius:10px;border:1px rgb(199, 199, 204) solid">

            <i class="el-icon-document" style="font-size:90px;margin-top:20px" v-if="ishover"></i>
            <i class="el-icon-document-checked" style="font-size:90px;margin-top:20px" v-if="!ishover"></i>

            <div style="padding: 14px;">

                <div class="bottom clearfix">
                    <el-button type="text" class="button"  @click="jmp(url)">{{docname}}</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "card",
        props:{
            docname:String,
            url:String
        },
        data() {
            return {
                ishover:true,
            };
        },
        methods:{
            overShow(){
                this.ishover=false;
            },
            shut(){
                this.ishover=true;
            },
            jmp(addr){
                let x=this.$router.resolve({path:addr});
                window.open(x.href);
            },
        }
    };
</script>

<style scoped>
    .outer :hover{
        background: rgb(228, 228, 233);
    }
    .el-button--text{
        font-size: 15px ;
    }
</style>