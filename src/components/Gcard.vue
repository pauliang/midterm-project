<template>
    <div class="outer" @mouseover="overShow" @mouseout="shut">
        <el-card :body-style="{ padding: '0px', height:'140px'}" shadow="hover" class="card">

            <el-image :src="require('../assets/group.png')" style="width: 100px; height: 60px ;margin-top:15px"
                v-if="ishover"></el-image>

            <i class="el-icon-more-outline graph" @click="goIntro(groupid)" v-if="!ishover"></i>

            <div style="padding:4px;">

                <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="goIntro(groupid)">{{name}}</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Gcard",
        props: {
            name: String,
            groupid: Number,
        },
        data() {
            return {
                ishover: true,
                surl: "../assets/login.jpg"
            };
        },
        methods: {
            overShow() {
                this.ishover = false;
            },
            shut() {
                this.ishover = true;
            },
            jmp(addr) {
                let x = this.$router.resolve({
                    path: addr
                });
                window.open(x.href);
            },
            goIntro() {
                this.$emit('event2', '')
            }
        }
    };
</script>

<style scoped>
    .outer :hover {
        background: rgb(228, 228, 233);

    }

    .el-button--text {
        font-size: 18px;
    }

    .card {
        border-radius: 10px;
        border: 1px rgb(199, 199, 204) solid;
        width: 140px;
        height: 150px;
        margin-top: 20px;
    }

    .graph {
        font-size: 60px;
        margin-top: 15px;
        width: 100px;
        height: 60px;
    }

    .button {
        margin: 10px 0 0 3px;
    }
</style>