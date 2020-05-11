<template>
    <div class='wrap'>
      sdfsf
      <Tabbar :value='a'></Tabbar>
    </div>
</template>

<script>

import Tabbar from "../components/tabbar.vue";
export default {
  name: 'index',
  components:{
    Tabbar
  },
  data () {
    return {
      a:'tab4'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  font-size:0.16rem;
}
</style>
