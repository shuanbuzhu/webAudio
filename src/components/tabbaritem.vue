<template>
  <div class="tabbaritem" @click="change()">
    <span v-show="bol"><slot name="normal"></slot><br></span>
    <span v-show="!bol"><slot name="active"></slot><br></span>
    <span :class="{red:bol}" class="tabbaritemtext"><slot ></slot></span>
  </div>
</template>

<script>
  export default {
    props:["mark"],
    data(){
      return {}
    },
    methods:{
      change:function(){
        this.$emit("listen",this.mark)
      }
    },
    computed:{
      bol(){
        if(this.mark==this.$parent.value){
          return true
        }
      }
    }
  }
</script>

<style type="text/css">
  .tabbaritem{
    float:left;
    width:25%;
    height:80px;
    text-align:center;
    font-size:12px;
    color:#ccc;
  }
  .tabbaritem img{
    height:40%
  }
  .red{
    color:#FFD700;
  }
  .tabbaritemtext{
    position:relative;
    top:0rem;
  }
</style>