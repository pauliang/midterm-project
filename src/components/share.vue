<template>
  <div>
       <el-popover
            placement="bottom"
            width="200"
            trigger="hover"
            >

            <el-image :src="def" style="width: 200px; height: 200px ;" ></el-image>
          
            <el-button slot="reference">文档分享</el-button>
        </el-popover>
  </div>
</template>

<script>
export default {
    name:'share',
    data(){
        return{
            def:'',
        }
    },
    methods:{
       
    },
    mounted(){
        var loc='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+this.url;
        this.$axios.get(loc,{responseType: 'arraybuffer'})
                  .then(response => {
                            return 'data:image/png;base64,' + btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));})
                            .then(data => 
                            {
                                this.def=data;
                                console.log(data);
                            })

    },
    props:{
        url:{
            type:String,
            default: () => 'http://www.baidu.com'
        }
    }
}
</script>

<style>

</style>
