<template>
  <div>
      <el-button type="text" @click="dialogVisible = true">团队概况</el-button>
      <el-dialog
        :title="groupName"
        :visible.sync="dialogVisible"
        width="30%"
        >
       

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
              mg:[['张三',1314,1,1],['李四',521,0,1],['李四',521,0,1],['李四',521,0,1],['李四',521,0,1]],
              group:[],
        }
    },
    props:{
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
    },
    mounted(){
      if(localStorage.getItem('userID')!=null){
             this.myid=localStorage.getItem('userID');
        }
       
        this.$axios({
            method:'post',
            url:'http://39.97.122.202/group/get_users/',
            data:{
             groupnum:this.groupID
            }
        }).then( res => {
            this.mg=res.data;
        }).catch(()=>{
            alert('抓取组员信息失败');
        })

        var x=0;
        for(;x<this.mg.length;x++){
            var y={
                name:this.mg[x][0],
                power:0,
                id:this.mg[x][1]
            }

            if(this.mg[x][2]==1){
                y.power=2;
            }
            else if(this.mg[x][3]==1){
                y.power=1;
            }
            else{
                y.power=0;
            }
            this.group.push(y);
        }
    }
}
</script>

<style scoped>
.title{
  text-align: left;
  font-weight: bold;
  margin-top: 30px;
  padding-left: 8px;

}
</style>