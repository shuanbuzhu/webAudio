<template>
    <div class='wrap'>
      <Tabbar :value='a'></Tabbar>
       
        <ul class="imgWrap">
          <li v-for="(item,index) of imgDataArr">
            <img :src="item.image_urls.square_medium" alt="">
            <p>{{item.id}}</p>
          </li>
        </ul>
     

    </div>
</template>

<script>

import Tabbar from "../components/tabbar.vue";
export default {
  name: 'index',
  components:{
    Tabbar
  },
  created(){
    this.imgDataFun()
    //this.imgDataDescFun()
  },
  data () {
    return {
      a:'tab3',
      imgDataArr:[],
    }
  },
  methods:{
    imgDataFun:function(){
      var url='https://api.imjad.cn/pixiv/v2/?type=search&word=香風智乃 1000users入り&page=1'
      this.$ajax.get(url).then(
        (res)=>{
          console.log(res,'https://api.imjad.cn/interface/img/PixivProxy.php?url='+res.data.illusts[0].image_urls.medium)
          if(res.status==200){

            this.imgDataArr=res.data.illusts;
          }
        }

        ).catch()
    },

    imgDataDescFun:function(){
      var url='https://api.imjad.cn/pixiv/v2/?type=illust&id=80354428'
      this.$ajax.get(url).then(
        (res)=>{
          console.log(res,'https://api.imjad.cn/interface/img/PixivProxy.php?url='+res.data.illust.image_urls.medium)
        }

        ).catch()
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
