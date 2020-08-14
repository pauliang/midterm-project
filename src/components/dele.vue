<template>
    <el-container style="min-height:650px">
        <el-main>
            <el-row :gutter="20">
                <el-col :span="2">
                    <div class="grid-content bg-purple delete">回收站</div>
                </el-col>
            </el-row>

            <el-row>
                <el-col class="debox" v-for="o in delist" :key="o">
                    <el-card shadow="hover" class="decard">
                        <i class="el-icon-delete deicon"></i>
                        <div class="defont">{{ o.name }}</div>
                        <div class="defont">{{ o.cut }}</div>
                    </el-card>
                    <el-button class="debutton">还原</el-button>
                </el-col>
            </el-row>
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
        data(){
            return {
                delist:[
                    {name:'File 1',cut:'Donald Trump Secret 1'},
                    {name:'File 2',cut:'Donald Trump Secret 2'},
                    {name:'File 3',cut:'Donald Trump Secret 3'},
                    {name:'File 4',cut:'Donald Trump Secret 4'},
                    {name:'File 5',cut:'Donald Trump Secret 5'},
                    {name:'File 6',cut:'Donald Trump Secret 6'},
                    {name:'File 7',cut:'Donald Trump Secret 7'},
                    {name:'File 8',cut:'Donald Trump Secret 8'},
                ]
            }
        }
    }
</script>

<style scoped>
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
    .debox {
        float: left;
        margin: 10px 60px 70px 12px;
        width: 200px;
        height: 200px;
    }
    .deicon {
        font-size: 60px;
    }
    .decard {
        width: 170px;
        height: 200px;
    }
    .debutton{
        margin: 10px 40px 10px 10px;
    }
    .defont {
         color: #555555;
        font: bold 18px arial,sans-serif ;
        height: 40px;
        line-height: 40px;
    }
</style>