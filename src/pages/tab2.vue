<template>
<div class="videoWrap">
  <Tabbar :value='a'></Tabbar>
<!--   <div class='SearchWrap'>
    <p @click='newSearchFun'>我喜欢</p>
    <input v-model='searchValue' type="text"/>
  </div> -->
  <div class='SearchWrap'>
    <span @click='newSearchFun'>我喜欢</span>
    <input v-model='searchValue' type="text">
  </div>  


  <div class="choseWrap">
      <ul style='width:500%'>
        <li v-for='(item,index) of searchChoseArr' @click='chooseSearchFun(item.name)'>{{item.name}}</li>
      </ul>
  </div>


<ul class="audioData">
  <li v-for='(item,index) of mvArr'>
    <video style='width:98%;' loop autoplay controls :src="videoUrl" v-if='audioOnOff==index'></video>
    <img :src="item.cover" v-show='audioOnOff!=index' @click='videoPlayFun(index,item.id)' alt="">
    <p>{{item.name}}</p>
  </li>
</ul>



  <div class='jumpPage'>
    <span @click="upPageFun(page,searchValue)" >上一页</span>
    <span>第{{page*10+10}}条 共{{mvCount}}页</span>
    <span @click="downPageFun(page,searchValue,mvCount)" >下一页</span>
  </div>



</div>
</template>

<script>
import { Toast } from 'mint-ui';
import Tabbar from "../components/tabbar.vue";
export default {
  name: 'index',
  components:{
    Tabbar
  },
  created(){
    this.searchDataFun('少女时代',0)
  },
  data () {
    return {
      a:'tab2',
      searchValue:'少女时代',
      mvArr:[],
      mvCount:0,
      page:0,
      audioOnOff:1000,
      videoUrl:'',
      searchChoseArr:[
        
        {"name":"4MINUTE"},
        {"name":"EXID"},

        {"name":"f(x)"},
        {"name":"AOA"},
        {"name":"A Pink"},
        {"name":"Sistar"},
        {"name":"2NE1"},
        {"name":"LOVELYZ"},
        {"name":"Apink"},
        {"name":"Girl's Day"},
        {"name":"Red Velvet"},
        {"name":"miss A"},
        {"name":"Nine Muses"},
        {"name":"GFRIEND"},
        {"name":"MAMAMOO"},
        {"name":"KARA"},
        {"name":"TWICE"},
        {"name":"OH MY GIRL"},
        {"name":"SONAMOO"},
        {"name":"CLC"},
        {"name":"APRIL"},
        {"name":"FIESTAR"},
        {"name":"SPICA"},
        {"name":"Crayon Pop"},
        {"name":"Dal shabet"},
        {"name":"Rainbow"},
        {"name":"T-ara"},
        {"name":"After School"},
        {"name":"少女时代"},
      ]
    }
  },
  methods:{
    newSearchFun:function(){
      this.page=0
      var name=this.searchValue;
      this.searchDataFun(name,0)
    },


    searchDataFun:function(name,page){
      var pages=page*10+10
      this.audioOnOff=1000
      let instance = Toast({
        message: '加载中',
        iconClass: 'icon icon-success',
        duration:-1,
      });
      //var url='https://api.imjad.cn/cloudmusic/?type=search&search_type=1004&s=%E8%AE%B8%E5%B5%A9'
      var url='https://api.imjad.cn/cloudmusic/?type=search&search_type=1004&limit='+pages+'&s='+name;
      this.$ajax.get(url).then(
        (res)=>{
          //console.log(res);
          instance.close();
          if(res.status==200&&res.data.code==200){
           this.mvArr=res.data.result.mvs;
           this.mvCount=res.data.result.mvCount
          }
        }

        ).catch()
    },
    videoPlayFun:function(index,id){
      //console.log(index,id)
      this.audioOnOff=index;
      var url='https://api.imjad.cn/cloudmusic/?type=mv&id='+id+'&br=128000'
      this.$ajax.get(url).then(
        (res)=>{
          //console.log(res)
          if(res.status==200&&res.data.code==200){
            //console.log(res.data.data.brs['480'])
            this.videoUrl=res.data.data.brs['480']
          }
        }

        ).catch()
    },
    upPageFun:function(page,name){
      if(page>0){
        page--;
        this.page=page;
        this.searchDataFun(name,page)
      }else{
          Toast({
              message: '已经是第一页',
              iconClass: 'icon icon-success',
          });
      }
    },

  downPageFun:function(page,name,mvcount){
    var pages=page*10+10
    if(pages>mvcount){
        Toast({
            message: '已经是最后一页',
            iconClass: 'icon icon-success',
        });
    }else{
        page++;
        this.page=page;
        this.searchDataFun(name,page)
    }
  },
  chooseSearchFun:function(name){
    this.page=0
    this.searchValue=name;
    this.searchDataFun(name,0)
  },








  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videoWrap{
  font-size:0.12rem;
  padding-top:0.65rem;
  padding-bottom:0.5rem;
}
.SearchWrap{
  position:fixed;
  z-index:10;
  left:0rem;top:0rem;
  height:0.6rem;
  background-color:#F5FFFA;
  width:100%;
  padding-top:0.1rem;
  padding-left:0.05rem;
  /*text-align: center;*/
}
.SearchWrap span{
  width:20%;
  background-color:#6699FF;
  border-radius: 0.05rem;
  padding:0.1rem;
}
.SearchWrap input{
  padding:0;margin:0;
  width:75%;
  border:1px solid red;
  height:0.34rem;
  border:1px solid #6699FF;
  border-radius: 0.05rem;
  font-size:0.13rem;
  /*text-align:center;*/

}

.jumpPage{
  display:flex;
  justify-content: space-around;
  height:0.5rem;
  line-height:0.5rem;
  font-size:0.14rem;
}

.audioData li{
  width:100%;
  text-align:center;
}
.audioData img{
  width:98%;
}
.audioData p{
  height:0.2rem;
  overflow: hidden;
  line-height:0.2rem;
}


.choseWrap{
  width:100%;
  height:0.3rem;
  line-height:0.3rem;
  overflow: hidden;
  font-weight: bold;

}
.choseWrap ul{
  display:flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.choseWrap li{
  padding:0 0.04rem;
}




























</style>
