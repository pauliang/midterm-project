<template>
    <div>
        <el-container style="min-height:650px">
            <el-main style="position: relative;">
                <el-row class="inhead">
                    <el-col>
                        <div>团队空间</div>
                    </el-col>
                </el-row>
                <el-button class="posi" @click="isShow = true">创建我的团队</el-button>
                <el-row>
                    <el-col class="cardbox" v-for="team in teamList" :key="team.name">
                        <Gcard :name="team[0]" :groupid=team[1] @event2="goIntro(team[0],team[1])"></Gcard>
                    </el-col>
                </el-row>
            </el-main>
            <el-dialog title="创建团队" :visible.sync="isShow" width="50%">
                <el-form ref="group" :model="group" label-width="100px">
                    <el-form-item label="团队名" prop="groupname"
                        :rules="[{required: true, message: '请输入团队名', trigger: 'blur'}]">
                        <el-input v-model="group.groupname" autocomplete="off">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="团队简介：" prop="groupintro"
                        :rules="[{required: true, message: '请输入团队简介', trigger: 'blur'}]">
                        <el-input type="textarea" resize="none" :rows="4" v-model="group.groupintro"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isShow = false">取 消</el-button>
                    <el-button @click="isShow = false;submitForm('group')">确 定</el-button>
                </span>
            </el-dialog>
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
                isShow: false,
                localStorageID: '',
                group: {
                    groupname: '',
                    groupintro: '',
                },
                teamList: [
                    [
                        'Team 1', 1
                    ],
                    [
                        'Team 2', 2
                    ],
                    [
                        'Team 3', 3
                    ],
                    [
                        'Team 4', 4
                    ],
                    [
                        'Team 5', 5
                    ],
                    [
                        'Team 6', 6
                    ],
                    [
                        'Team 7', 7
                    ],
                    [
                        'Team 8', 8
                    ],
                ]
            };
        },
        methods: {
            goIntro(gname, gid) {
                this.$emit('event1', gname,gid)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("submitted");
                        this.createTeam();
                    } else {
                        this.isShow = true;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            createTeam() {
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/group/create_group/',
                    data: {
                        id: this.localStorageID,
                        groupintro: this.group.groupintro,
                        groupname: this.group.groupname,
                    }
                }).then(
                    res => { //如果传过来的数据是{info:"success", docid: 文档id},就这么写，如果失败的话,也应该按照{info: "failed"}，这样的格式写
                        if (res.data == "1") {
                            console.log("创建团队成功");
                            this.localStorageFileID = res.data.docid;
                            localStorage.setItem('docid', res.data.docid)
                        } else {
                            console.log("创建团队失败");
                        }
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            },
            created() {
                this.localStorageID = localStorage.getItem('userID');
                console.log("test");
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/group/get_groups/',
                    data: {
                        id: this.localStorageID
                    }
                }).then(
                    response => {
                        this.teamList = response.data;
                        if (this.teamList == [])
                            console.log("no team");
                    },
                    err => {
                        console.log(err);
                    }).catch((error) => {
                    console.log(error);
                });
            }
        },
        components: {
            Gcard
        }
    };
</script>

<style scoped>
    .inhead {
        margin: 0px 10px 20px -20px;
        text-align: left;
        color: #555555;
        font: bold 24px arial, sans-serif;
    }

    .cardbox {
        display: inline-block;
        width: 250px;
        height: 200px;
        margin: 0 10px 0 -20px;
    }

    .cardname {
        color: #555555;
        font: bold 18px arial, sans-serif;
        margin: 10px 120px 20px 0px;
    }

    .posi {
        position: absolute;
        right: 400px;
        top: 10px;
        font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-weight: 700;
        border: 1px solid #cccccc;
        margin-top: 10px;
        margin-right: -40px;
        background-color: #fefefe;
        color: #676b6f;
    }
</style>