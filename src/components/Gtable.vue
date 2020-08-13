<template>
    <div>
        <el-container style="min-height:650px">
            <el-main>
                <el-row class="inhead">
                    <el-col>
                        <div>团队空间</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="cardbox" v-for="o in teamList" :key="o">
                        <Gcard></Gcard>
                        <div class="cardname">{{ o.name }}</div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    // import { ParticlesBg } from "particles-bg-vue";
    import Gcard from "@/components/Gcard.vue";
    export default {
        name: 'Gtable',
        data() {
            return {
                teamList:[
                    {name:'team1'},
                    {name:'team2'},
                    {name:'team3'},
                    {name:'team4'},
                    {name:'team5'},
                    {name:'team6'},
                    {name:'team7'},
                    {name:'team8'},
                    {name:'team9'},
                    {name:'team10'},
                    {name:'team11'},
                    {name:'team12'},
                ]
            };
        },
        components:{
            Gcard
        }
    };
</script>

<style scoped>
    .inhead{
        margin: 0px 10px 20px -20px;
        text-align: left;
        color: #555555;
        font: bold 24px arial,sans-serif ;
    }
    .cardbox{
        display: inline-block;
        width: 250px;
        height: 200px 
    }
    .cardname{
        color: #555555;
        font: bold 18px arial,sans-serif ;
        margin: 10px 120px 20px 0px;
    }
</style>