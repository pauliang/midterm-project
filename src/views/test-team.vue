<template>
  <div style="width:150px">
      <Gcard :name="x" :url="y">
      </Gcard>
  </div>
</template>

<script>
 import Gcard from '@/components/Gcard.vue'

export default {
    name:'test-team',
    data(){
        return{
            x:'hhhhhhhhh',
            y:'/login',
        }
    },
     components:{
            Gcard
        }

}
</script>

<style>

</style>