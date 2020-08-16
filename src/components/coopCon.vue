<template>
  <div>
      <el-button type="text" @click="dialogVisible = true" :disabled="aro">成员管理</el-button>
      <el-dialog
        :title="'成员管理'"
        :visible.sync="dialogVisible"
        width="30%"
        >
       
        <div class="title1" >
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
                        <el-col :span="8" style="text-align:right;" > 
                            
                            <el-popover
                                placement="bottom-start"
                                trigger="click"
                            >
                               <div>
                                   <div>
                                     <el-button type="text" @click="beAdmin(ob.id,ob.power)">设为管理员</el-button>
                                   </div>
                                    <div>
                                        <el-button type="text" @click="beNo(ob.id,ob.power)">设为组员</el-button>
                                    </div>
                                    <div>
                                        <el-button type="text" @click="getOut(ob.id,ob.power)">移出团队</el-button>
                                    </div>                
                               </div>
                                <el-button  type="text" slot="reference" class="el-icon-more" style="font-size:27px;color:grey"></el-button>
                            </el-popover>
                        </el-col>
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
                        <!-- <el-col :span="8" style="min-height:40px;padding-top:12px"> 631803439@qq.com</el-col> -->
                        <el-col :span="8" style="text-align:right;"> 
                            <el-popover
                                placement="bottom-start"
                                trigger="click"
                            >
                               <div>
                                   <div>
                                     <el-button type="text" @click="beAdmin(ob.id,ob.power)">设为管理员</el-button>
                                   </div>
                                    <div>
                                        <el-button type="text" @click="beNo(ob.id,ob.power)">设为组员</el-button>
                                    </div>
                                    <div>
                                        <el-button type="text" @click="getOut(ob.id,ob.power)">移出团队</el-button>
                                    </div>                
                               </div>
                                <el-button  type="text" slot="reference" class="el-icon-more" style="font-size:27px;color:grey"></el-button>
                            </el-popover>
                        </el-col>
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
    name:'coopCon',
    data(){
        return{
              dialogVisible: false,
              input:'',
              myid:521,//myid,当前用户id，应该从本地存储里拿
              mg:[['张三',1314,1,1],['李四',521,0,1],['李四',521,0,1],['李四',521,0,1],['李四',521,0,1]],
              group:[],
              aro:false,
              
        }
    },
    props:{
      groupID: {
      type: Number,
      default: () => 0
      //这个群组的id
      },
    },
    methods: {
        beAdmin(aid,apower){
            if(apower==2)
                alert('组长不能降级');
            if(apower==1)
                alert('ta已经是管理员了');
            if(apower==0){
                var x=aid.toString();
                this.$axios({
                            method:'post',
                            url:'http://39.97.122.202/group/set_admin/',
                            data:{
                                    users:x,
                                    groupnum:this.groupID
                            }
                        }).then( res => {
                            if(res.data==1){
                                alert('操作成功');
                            }
                            else{
                                alert('操作失败');
                            }
                        }).catch(()=>{
                            alert('网络似乎有些问题..');
                        })
            }
        },
        beNo(aid,apower){
            if(apower==2)
                alert('组长不能降级');
             if(apower==0)
                alert('ta已经是组员了');
            if(apower==1){
                var x=aid.toString();
                this.$axios({
                            method:'post',
                            url:'http://39.97.122.202/group/cancel_admin/',
                            data:{
                                    users:x,
                                    groupnum:this.groupID
                            }
                        }).then( res => {
                            if(res.data==1){
                                alert('操作成功');
                            }
                            else{
                                alert('操作失败');
                            }
                        }).catch(()=>{
                            alert('网络似乎有些问题..');
                        })
            }
        },
        getOut(aid,apower){
            if(apower==2)
                alert('你想对组长干什么？！');
            else{
                this.$axios({
                            method:'post',
                            url:'http://39.97.122.202/group/kick_out_user/',
                            data:{
                                    id:aid,
                                    groupnum:this.groupID
                            }
                        }).then( res => {
                            if(res.data==1){
                                alert('操作成功');
                            }
                            else{
                                alert('操作失败');
                            }
                        }).catch(()=>{
                            alert('网络似乎有些问题..');
                        })
            }
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

            if(y.id==this.myid){
                console.log('逮到！');
               
                if(y.power==0)
                    this.aro=true;
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
.title1{
     text-align: left;
  font-weight: bold;

  padding-left: 8px;
}



</style>

