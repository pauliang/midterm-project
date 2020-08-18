<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">团队概况</el-button>
        <el-dialog :title="groupName" :visible.sync="dialogVisible" width="30%">

            <el-input placeholder="输入邮箱/用户名发送邀请" v-model="input" clearable class="search">
                <i slot="suffix" class="el-input__icon el-icon-s-promotion" @click="punch()"></i>
            </el-input>

            <div class="title1">
                <span>管理者</span>
            </div>

            <el-divider></el-divider>

            <div>
                <div v-for="(ob,id) in group" :key="id+1">
                    <div v-if="ob.power === 2" style="height:100%;text-align:left;">
                        <div style="margin-bottom:10px">
                            <el-row>
                                <el-col :span="3" style="text-align:center">
                                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                                </el-col>
                                <el-col :span="7" style="min-height:40px;padding-top:12px;font-weight:bold">
                                    {{ob.name}}
                                </el-col>
                                <el-col :span="8" class="email">
                                    <el-button type="text" @click="checkPerson(ob.id)">点此查看他的信息</el-button>
                                </el-col>
                                <el-col :span="4" style="text-align:right;">
                                    <el-popover placement="bottom-start" trigger="click">
                                        <div>
                                            <div>
                                                <el-button type="text" @click="beAdmin(ob.id,ob.power)">设为管理员
                                                </el-button>
                                            </div>
                                            <div>
                                                <el-button type="text" @click="beNo(ob.id,ob.power)">设为组员</el-button>
                                            </div>
                                            <div>
                                                <el-button type="text" @click="getOut(ob.id,ob.power)">移出团队</el-button>
                                            </div>
                                        </div>
                                        <el-button type="text" slot="reference" class="el-icon-more more"></el-button>
                                    </el-popover>
                                </el-col>
                                <el-col :span="4" style="text-align:right">
                                    <el-button type="primary" plain class="plain">董事长</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>

            <div class="title">
                <span>协作者</span>
            </div>
            <el-divider></el-divider>

            <div>
                <div v-for="(ob,id) in group" :key="id+1">
                    <div v-if="ob.power!==2" style="height:100%;text-align:left;">
                        <div style="margin-bottom:10px">
                            <el-row>
                                <el-col :span="3" style="text-align:center">
                                    <el-avatar icon="el-icon-user-solid"></el-avatar>
                                </el-col>
                                <el-col :span="7" style="min-height:40px;padding-top:12px;font-weight:bold">
                                    {{ob.name}}
                                </el-col>
                                <el-col :span="8" class="email">
                                    <el-button type="text" @click="checkPerson(ob.id)">点此查看他的信息</el-button>
                                </el-col>
                                <el-col :span="4" style="text-align:right;">
                                    <el-popover placement="bottom-start" trigger="click">
                                        <div>
                                            <div>
                                                <el-button type="text" @click="beAdmin(ob.id,ob.power)">设为管理员
                                                </el-button>
                                            </div>
                                            <div>
                                                <el-button type="text" @click="beNo(ob.id,ob.power)">设为组员</el-button>
                                            </div>
                                            <div>
                                                <el-button type="text" @click="getOut(ob.id,ob.power)">移出团队</el-button>
                                            </div>
                                        </div>
                                        <el-button type="text" slot="reference" class="el-icon-more more"></el-button>
                                    </el-popover>
                                </el-col>
                                <el-col :span="4" style="text-align:right">
                                    <el-button class="plain" type="primary" plain v-if="ob.power==1">管理员</el-button>
                                    <el-button class="plain" type="primary" plain v-if="ob.power==0">某组员</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'GrIntro',
        data() {
            return {
                dialogVisible: false,
                input: '',
                myid: 1,
                //myid,当前用户id，应该从本地存储里拿
                mg: [
                    ['张三', 1314, 1, 1],
                    ['李四', 521, 0, 1],
                    ['王五', 521, 0, 1],
                    ['小二', 521, 0, 0],
                    ['板凳', 521, 0, 0]
                ],
                group: [],
            }
        },
        props: {
            groupName: {
                type: String,
                default: () => '月下男团'
                //群名字
            },
            groupID: {
                type: Number,
                default: () => 0
                //这个群组的id；
            },
        },
        methods: {
            checkPerson(uid) {
                this.$router.push({
                    name: 'Profile',
                    query: {
                        id: uid,
                    }
                })
            },
            beAdmin(aid, apower) {
                if (apower == 2)
                    alert('组长不能降级');
                if (apower == 1)
                    alert('ta已经是管理员了');
                if (apower == 0) {
                    var x = aid.toString();
                    this.$axios({
                        method: 'post',
                        url: 'http://39.97.122.202/group/set_admin/',
                        data: {
                            users: x,
                            groupnum: this.groupID
                        }
                    }).then(res => {
                        if (res.data == 1) {
                            alert('操作成功');
                        } else {
                            alert('操作失败');
                        }
                    }).catch(() => {
                        alert('网络似乎有些问题..');
                    })
                }
            },
            beNo(aid, apower) {
                if (apower == 2)
                    alert('组长不能降级');
                if (apower == 0)
                    alert('ta已经是组员了');
                if (apower == 1) {
                    var x = aid.toString();
                    this.$axios({
                        method: 'post',
                        url: 'http://39.97.122.202/group/cancel_admin/',
                        data: {
                            users: x,
                            groupnum: this.groupID
                        }
                    }).then(res => {
                        if (res.data == 1) {
                            alert('操作成功');
                        } else {
                            alert('操作失败');
                        }
                    }).catch(() => {
                        alert('网络似乎有些问题..');
                    })
                }
            },
            getOut(aid, apower) {
                if (apower == 2)
                    alert('你想对组长干什么？！');
                else {
                    this.$axios({
                        method: 'post',
                        url: 'http://39.97.122.202/group/kick_out_user/',
                        data: {
                            id: aid,
                            groupnum: this.groupID
                        }
                    }).then(res => {
                        if (res.data == 1) {
                            alert('操作成功');
                        } else {
                            alert('操作失败');
                        }
                    }).catch(() => {
                        alert('网络似乎有些问题..');
                    })
                }
            },
            punch() {
                this.$axios({
                    method: 'post',
                    url: 'http://39.97.122.202/group/send_invitation/',
                    data: {
                        id: this.myid,
                        groupnum: this.groupID,
                        receivename: this.input
                    }
                }).then(res => {
                    if (res.data === 1)
                        alert('已向' + this.input + '发送邀请.');
                    else
                        alert('咦，似乎发生了一点小错误..');
                }).catch(err => {
                    console.log(err);
                    alert('咦，似乎发生了一点小错误,好像没发出去..');
                })
            }
        },
        mounted() {
            if (localStorage.getItem('userID') != null) {
                this.myid = localStorage.getItem('userID');
            }

            this.$axios({
                method: 'post',
                url: 'http://39.97.122.202/group/get_users/',
                data: {
                    groupnum: this.groupID
                }
            }).then(res => {
                this.mg = res.data;
            }).catch(() => {
                alert('抓取组员信息失败');
            })

            var x = 0;
            for (; x < this.mg.length; x++) {
                var y = {
                    name: this.mg[x][0],
                    power: 0,
                    id: this.mg[x][1]
                }

                if (this.mg[x][2] == 1) {
                    y.power = 2;
                } else if (this.mg[x][3] == 1) {
                    y.power = 1;
                } else {
                    y.power = 0;
                }

                if (y.id == this.myid) {
                    console.log('逮到！');

                    if (y.power == 0)
                        this.aro = true;
                }

                this.group.push(y);
            }
        }
    }
</script>

<style scoped>
    .search {
        margin-top: -40px;
        margin-bottom: 20px;
    }

    .email {
        min-height: 40px;
        padding-top: 12px;
        margin-left: -50px;
        margin-top: -10px;
    }

    .title {
        text-align: left;
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: -10px;
        padding-left: 8px;
    }

    .title1 {
        text-align: left;
        font-weight: bold;
        margin-bottom: -15px;
        padding-left: 8px;
    }

    .more {
        margin-top: -3px;
        margin-left: -30px;
        margin-right: 25px;
        font-size: 20px;
        color: grey;
    }

    .plain {
        margin-left: -80px;
        margin-right: -15px;
    }
</style>