<template>
    <div>
        <el-button type="text" @click="dialogVisible = true" class="details">团队概况</el-button>
        <el-dialog
                :title="groupName"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <!-- :before-close="handleClose" -->

            <el-input
                    placeholder="输入邮箱/用户名发送邀请"
                    v-model="input"
                    clearable>
                <i slot="suffix" class="el-input__icon el-icon-s-promotion" @click="punch()"></i>
            </el-input>

            <div class="title">
                <span>管理者</span>
            </div>
            <el-divider></el-divider>

            <div>
                <div v-for="(ob,id) in group" :key="id+1">
                    <div v-if="ob.power==2" style="height:100%;text-align:left;" >
                        <div style="margin-bottom:10px">
                            <el-row>
                                <el-col :span="3" style="text-align:center"><el-avatar icon="el-icon-user-solid"></el-avatar> </el-col>
                                <el-col :span="7" style="min-height:40px;padding-top:12px;font-weight:bold"> {{ob.name}}</el-col>
                                <el-col :span="8" style="min-height:40px;padding-top:12px"> 631803439@qq.com</el-col>
                                <el-col :span="6" style="text-align:right">
                                    <el-button type="primary" plain>董事长</el-button>
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
                    <div v-if="ob.power!=2" style="height:100%;text-align:left;" >
                        <div style="margin-bottom:10px">
                            <el-row>
                                <el-col :span="3" style="text-align:center"><el-avatar icon="el-icon-user-solid"></el-avatar> </el-col>
                                <el-col :span="7" style="min-height:40px;padding-top:12px;font-weight:bold"> {{ob.name}}</el-col>
                                <el-col :span="8" style="min-height:40px;padding-top:12px"> 631803439@qq.com</el-col>
                                <el-col :span="6" style="text-align:right">
                                    <el-button type="primary" plain v-if="ob.power==1" >管理员</el-button>
                                    <!-- <el-button type="primary" plain v-if="ob.power==4" >只读权限</el-button>
                                    <el-button type="primary" plain v-if="ob.power==2" >只写权限</el-button> -->
                                    <el-button type="primary" plain v-if="ob.power==0" >某组员</el-button>
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
        name:'GrIntro',
        data(){
            return{
                dialogVisible: false,
                input:'',
                myid:1,
                //myid,当前用户id，应该从本地存储里拿
            }
        },
        props:{
            group: {
                type: Array,
                default: () => [{name:'张三',power:0,id:1},{name:'李四',power:1,id:999}]
                //数组，power012分别表示一般路人、狗管理以及群主，id就是成员各自对应的id
            },
            groupName: {
                type: String,
                default: () => 'We are the Champion Team'
                //群名字
            },
            groupID: {
                type: Number,
                default: () => 0
                //这个群组的id；
            },
        },
        methods: {
            punch(){

                this.$axios({
                    method:'post',
                    url:'http://39.97.122.202/group/send_invitation/',
                    data:{
                        id:this.myid,
                        groupnum:this.groupID,
                        receivename:this.input
                    }
                }).then( res => {
                    if(res.data==1)
                        alert('已向'+this.input+'发送邀请.');
                    else
                        alert('咦，似乎发生了一点小错误..');
                }).catch(err => {
                    console.log(err);
                    alert('咦，似乎发生了一点小错误,好像没发出去..');
                })
            }
        }
    }
</script>

<style scoped>
    .details {
        font-size: 18px;
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .title{
        text-align: left;
        font-weight: bold;
        margin-top: 30px;
        padding-left: 8px;
    }
</style>