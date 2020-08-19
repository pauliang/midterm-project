<template>
    <div class="outer" @mouseover="overShow" @mouseout="shut">
        <el-card :body-style="{ padding: '0px', height:'180px'}" shadow="hover"
            style="position: relative;border-radius:10px;border:1px rgb(199, 199, 204) solid;height: 210px">

            <i class="el-icon-document" style="font-size:90px;margin-top:20px" v-if="ishover"></i>
            <i class="el-icon-document-checked" style="font-size:90px;margin-top:20px" v-if="!ishover"></i>
            <el-button v-popover:popover class="posi" type="primary" icon="el-icon-more" size="small"></el-button>

            <div style="padding: 14px;">
                <div class="bottom clearfix">
                    <el-button v-if="power[0]==1" type="text" class="button" @click="jmp(fakeurl)">
                        {{doc.docname}}</el-button>
                    <el-button v-else disabled type="text" class="button">{{doc.docname}}</el-button><br>
                    <!-- <span style="font-size: 10px; color: gray">修改时间<br></span> -->
                    <span style="font-size: 14px; color: gray">{{dateFormat(doc.lasttime)}}</span>
                </div>
            </div>

        </el-card>
        <el-popover ref="popover" placement="bottom" trigger="click">
            <div>
                <el-button v-if="power[0]==1" class="option el-icon-share"
                    type="text" size="small" @click="generateQR()">&nbsp;分享</el-button>
                <el-button v-else disabled class="option el-icon-share" type="text" size="small">&nbsp;分享</el-button>
            </div>
            <div>
                <el-button v-if="!doc.isCollected" class="option el-icon-star-off" type="text" size="small"
                    @click="collectItem(doc.docnum)">收藏</el-button>
                <el-button v-else class="option el-icon-star-on" type="text" size="small"
                    @click="cancelCollectItem(doc.docnum)">已收藏
                </el-button>
            </div>
          
            <div>
                <!-- <el-button v-if="this.user==doc.author" class="option el-icon-setting" type="text" size="small"
                    @click="showpop">权限</el-button>
                <el-button v-else disabled class="option el-icon-setting" type="text" size="small">权限</el-button> -->
              
                    <el-button v-if="this.user==doc.author" class="option el-icon-setting" type="text" size="small" @click="showpop">
                        权限
                    </el-button>
                   <el-button v-else disabled class="option el-icon-setting" type="text" size="small">权限</el-button>
            </div>

            <div>
                <el-button v-if="this.user==doc.author" class="option el-icon-delete" type="text" size="small"
                    @click="removeItem(doc.docnum)">删除</el-button>
                <el-button v-else disabled class="option el-icon-delete" type="text" size="small">删除</el-button>
            </div>
        </el-popover>

        <el-dialog center title="二维码" :visible.sync="isShow" width="300px" append-to-body=true>
            <img style="display: block; margin: 0 auto 20px;" :src="def" alt="二维码">
        </el-dialog>

<!-- //私人文件的选项 -->
        <el-dialog center :title="name" :visible.sync="isShow2" width="300px" append-to-body=true>
                <div>
                      <el-button class="el-icon-lock" style="font-size:17px" @click="personDoc(1)" type="text">&nbsp;仅自己可见(完全私有)</el-button>
                </div> 
                <div>
                    <el-button class="el-icon-link" type="text" @click="personDoc(2)" style="font-size:17px">&nbsp;他人可见(可评论)</el-button>
                </div> 
                <div>
                      <el-button class="el-icon-view" type="text" @click="personDoc(3)" style="font-size:17px">&nbsp;他人仅可见(不可评论)</el-button>
                </div> 
                <div>
                      <el-button class="el-icon-printer" type="text" @click="shareG()" style="font-size:17px">&nbsp;分享到我的团队</el-button>
                </div> 

                <el-dialog :visible.sync="isShow4" width="300px"  :title="'想要分享到哪个群组？'" append-to-body>
                    <div v-for="(ob,ord) in yourG" :key="ord">
                      <el-button type="text" @click="shareAct(ob[1])" style="font-size:17px">&nbsp;{{ob[0]}}</el-button>
                    </div>
                </el-dialog>
        </el-dialog>
<!-- 小组文件的选项 -->
         <el-dialog center :title="name" :visible.sync="isShow3" width="300px" append-to-body=true>
                <div>
                      <el-button class="el-icon-lock" @click="gpDoc(1)" style="font-size:17px" type="text">&nbsp;仅自己可见(移出团队空间)</el-button>
                </div> 
                <div>
                    <el-button class="el-icon-link" type="text" @click="gpDoc(2)" style="font-size:17px">&nbsp;全组成员可见(评论/修改)</el-button>
                </div> 
                <div>
                    <el-button class="el-icon-link" v-if="this.job==1" @click="gpDoc(3)" type="text" style="font-size:17px">&nbsp;仅管理员可见(评论/修改)</el-button>
                </div> 
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "card",
        props: {
            doc: Object,
            // docname: String,
            // url: String,
            // lasttime: Date,
            // docnum: Number,
            user: Number,
            // author: Number,
            // isCollected: Boolean,
        },
        data() {
            return {
                ishover: true,
                def: '',
                isShow: false,
                isShow2: false,
                isShow3: false,
                isShow4: false,
                power:[1,1,1],//默认的权限
                // x表示查看,分享权限(这俩权限绑定在一起,能查看就能分享)
                // y表示评论权限
                // z表示修改权限
                name:'default',
                job:0,//如果是小组的文档，这代表当前用户在小组里的职位：管理员&群主：1 / 一般人：2
                groupid:-1,//如果是小组的文档这里会变成小组的id
                realurl:'',
                fakeurl:'',
                yourG:[['test1',1],['test2',2]]
            };
        },
        methods: {
            shareG(){
                //先看看这个鬼加了组没有
                this.$axios({
                    method:'post',
                    url:'http://39.97.122.202/group/get_groups/',
                    data:{
                        id:this.user
                    }
                }).then( res =>{
                    if(res.data==null||res.data.length==0){
                        alert('你还没有加入任何群组哦~');
                    }
                    else{
                        this.yourG=res.data;
                        this.isShow2=false;
                        this.isShow4=true;
                    }
                }).catch(()=>{
                    alert('对不起，没法确认你加入的组');
                })

                
            },
            
            shareAct(codenumber){
                this.$axios({
                    method:'post',
                    url:'http://39.97.122.202/autho/change_owner_b/',
                    data:{
                        id:this.doc.docnum,
                        groupnum:codenumber
                    }
                }).then( res =>{
                    if(res.data==1){
                        alert('共享成功！');
                    }
                }).catch(()=>{
                    alert('网络错误，群共享失败');
                })
            }
            ,
            dateFormat: function (time) {
                var date = new Date(time);
                var year = date.getFullYear();
                var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
                var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                // 拼接
                return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
            },
            overShow() {
                this.ishover = false;
            },
            shut() {
                this.ishover = true;
            },

            showpop(){
                //看看这个文件是个人空间的还是小组的
                this.$axios({
                    method:'post',
                    url:'http://39.97.122.202/doc/get_groupnum/',
                    data:{
                        id:this.doc.docnum
                    }
                }).then( res =>{
                    if(res.data==-1){
                        this.isShow2=true;
                    }
                    else{
                        this.groupid=res.data;
                        this.getjob();
                        this.isShow3=true;
                    }
                }).catch(()=>{
                    console.log('获取文档组号失败');
                })
            },

            getjob(){
                var mg=[];
                this.$axios({
                    method:'post',
                    url:'http://39.97.122.202/group/get_users/',
                    data:{
                        groupnum:this.groupid
                    }
                }).then(res=>{
                    mg=res.data;
                    var i=0;
                    for(;i<mg.length;i++)
                    {
                        if(mg[i][1]==this.user){
                            if(mg[i][2]==1||mg[i][3]==1){
                                this.job=1;
                            }
                            else
                                this.job=2;
                            break;
                        }
                    }
                }).catch(()=>{
                    console.log('getjob(获取个人在团队中的职位)出错。');
                })
            },

            personDoc(num){
                var x=0;
                if(num==1){
                    x=-1;
                }
                else if(num==2){
                    x=1
                }
                else if(num==3){
                    x=0
                }
                else{
                    alert('个人文档权限未知错误');
                }
                this.$axios({
                        method:'post',
                        url:'http://39.97.122.202/autho/set_doc_auth/',
                        data:{
                            users:'',
                            docnum:this.doc.docnum,
                            stat:x
                        }
                    }).then(res=>{
                        if(res.data==1){
                            alert('权限修改成功');
                        }
                        else{
                            alert('权限修改失败');
                        }
                    }).catch(()=>{
                        alert('网络问题，权限修改失败');
                    })
            },

            gpDoc(num){
                if(num==1){
                    this.$axios({
                        method:'post',
                        url:'http://39.97.122.202/autho/change_owner/',
                        data:{
                            id:this.doc.docnum
                        }
                    }).then(res=>{
                        if(res.data==1){
                            alert('已归档为个人文档');
                        }
                        else{
                            alert('归档失败');
                        }
                    }).catch(()=>{
                        alert('网络问题，私有化失败');
                    })
                }
                else{
                    var zzz='';
                    if(num==2)
                        {zzz='set_group_auth/';}
                    if(num==3)
                        {zzz='set_admin_auth/';}
                    
                    this.$axios({
                        method:'post',
                        url:'http://39.97.122.202/autho/'+zzz,
                        data:{
                            docnum:this.doc.docnum,
                            groupnum:this.groupid
                        }
                    }).then(res=>{
                        if(res.data==1){
                            alert('组内权限修改成功');
                        }
                        else{
                            alert('组内权限修改失败');
                        }
                    }).catch(()=>{
                        alert('网络问题，组内权限修改失败');
                    })
                }

            },

            jmp(addr) {
                let x = this.$router.resolve({
                    path: addr
                });
                window.open(x.href);
            },
            generateQR() {
                var baseurl = this.realurl;
                var docurl = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + baseurl;
                this.$axios.get(docurl, {
                        responseType: 'arraybuffer'
                    })
                    .then(response => {
                        return 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) =>
                            data + String.fromCharCode(byte), ''));
                    })
                    .then(data => {
                        this.def = data;
                        console.log(data);
                    })
                this.isShow = true;
            },
            removeItem(docnum) {
                this.$emit('remove-event', docnum);
                this.doc.stat = -2;
            },
            collectItem(docnum) {
                this.$emit('collect-event', docnum);
                this.doc.isCollected = true;
            },
            cancelCollectItem(docnum) {
                this.$emit('cancel-event', docnum);
                this.doc.isCollected = false;
            },
        },
        mounted(){
              this.fakeurl='doc?docid='+this.doc.docnum
            this.realurl='http://118.31.175.39/doc?docid='+this.doc.docnum;
            if(this.doc.docname){
               this.name=this.doc.docname;  
            }
               
            this.$axios({
                method:'post',
                url:'http://39.97.122.202/autho/match_auth/',
                data:{
                    id:this.user,
                    docnum:this.doc.docnum
                }
            }).then( res =>{
                this.power=res.data;
            }).catch(()=>{
                // alert('权限信息验证失败,权限为默认开放状态');
                console.log('权限信息验证失败,权限为默认开放状态');
            })
        }
    };
</script>

<style scoped>
    .outer :hover {
        background: rgb(228, 228, 233);
    }

    .el-button--text {
        font-size: 15px;
    }

    .posi {
        position: absolute;
        right: 0;
        top: 0;
    }

    .el-button--primary {
        color: #000000;
        background-color: transparent;
        /* border-color: #8B83D2; */
        border: none;
    }

    .option {
        width: 150px;
        height: 25px;
        line-height: 25px;
    }
</style>
<style>
    .el-popover {
        position: absolute;
        background: #FFF;
        width: 40px;
        min-width: 100px;
        /* height: 100px; */
        border: 1px solid #EBEEF5;
        padding: 10px 0;
        z-index: 2000;
        color: #606266;
        line-height: 1.4;
        text-align: justify;
        font-size: 14px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        word-break: break-all;
    }

    /* .el-popover, .el-time-panel {
         -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
     } */
    .option {
        color: #409EFF;
        background: 0 0;
        padding-left: 0;
        padding-right: 50px;
    }
</style>
