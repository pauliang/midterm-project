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
                    {name:'Team 1'},
                    {name:'Team 2'},
                    {name:'Team 3'},
                    {name:'Team 4'},
                    {name:'Team 5'},
                    {name:'Team 6'},
                    {name:'Team 7'},
                    {name:'Team 8'},
                    {name:'Team 9'},
                    {name:'Team 10'},
                    {name:'Team 11'},
                    {name:'Team 12'},
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
        height: 200px;
        margin: 0 10px 0 -20px;
    }
    .cardname{
        color: #555555;
        font: bold 18px arial,sans-serif ;
        margin: 10px 120px 20px 0px;
    }
</style>