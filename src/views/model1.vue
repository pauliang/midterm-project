<template>
  <div>
    <edt :msg="fmsg" :choice="choice"></edt>
  </div>
</template>

<script>
  import edt from '@/components/edt.vue'
  export default {
    name: 'model1',
    data(){
      return{
        fmsg:'',
        choice:this.$route.params.id
      }
    },
    components:{
      edt
    }
  }
</script>
<style scoped>
</style>