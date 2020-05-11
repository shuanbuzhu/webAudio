<template>
  <div class="tabbar clearfix">
    <TabbarItem @listen="getval()" mark="tab1">
      <router-link to="./" slot="normal"><img src="../assets/images/1.png" alt=""></router-link>
      <router-link to="./" slot="active"><img src="../assets/images/1-1.png" alt=""></router-link>
      音频
    </TabbarItem>
    <TabbarItem @listen="getval()" mark="tab2" >
      <router-link to="./tab2" slot="normal"><img src="../assets/images/2.png" alt=""></router-link>
      <router-link to="./tab2" slot="active"><img src="../assets/images/2-2.png" alt=""></router-link>
      视频
    </TabbarItem>
    <TabbarItem @listen="getval()" mark="tab3" >
      <router-link to="./tab3" slot="normal"><img src="../assets/images/3.png" alt=""></router-link>
      <router-link to="./tab3" slot="active"><img src="../assets/images/3-3.png" alt=""></router-link>
      图片
    </TabbarItem>
    <TabbarItem @listen="getval()" mark="tab4" >
      <router-link to="./tab4" slot="normal"><img src="../assets/images/6.png" alt=""></router-link>
      <router-link to="./tab4" slot="active"><img src="../assets/images/6-6.png" alt=""></router-link>
      我的
    </TabbarItem>
  </div>
</template>

<script>
  import TabbarItem from "./tabbaritem.vue"
  export default{
    props:["value"],
    components:{
      TabbarItem
    },
    data(){
      return { }
    },
    methods:{
      getval:function(){

      }
    },
  }
</script>

<style type="text/css">
  .tabbar{
    position:fixed;
    left:0;
    bottom:0;
    border-top:1px solid #ccc;
    height:53px;
    width:100%;
    z-index:200;
    background-color:#fff;
    font-size:12px;
  }
</style>