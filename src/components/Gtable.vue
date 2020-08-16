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
                    <el-col class="cardbox" v-for="team in teamList" :key="team.name">
                        <Gcard :name="team.name" :url="team.url" @event2="goIntro()"></Gcard>
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
                    teamList: [{
                        name: 'Team 1',
                        url: '/team_inside'
                    }, {
                        name: 'Team 2',
                        url: '/team_inside'
                    }, {
                        name: 'Team 3',
                        url: '/team_inside'
                    }, {
                        name: 'Team 4',
                        url: '/team_inside'
                    }, {
                        name: 'Team 5',
                        url: '/team_inside'
                    }, {
                        name: 'Team 6',
                        url: '/team_inside'
                    }, {
                        name: 'Team 7',
                        url: '/team_inside'
                    }, {
                        name: 'Team 8',
                        url: '/team_inside'
                    },  ]
            };
        },
        methods: {
            goIntro(){
              this.$emit('event1','2+')
            }
        },
        components: {
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