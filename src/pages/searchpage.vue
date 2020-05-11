<template>
<div class="degistWrap">
  <div class='SearchWrap'>
    <span @click='newSearchFun'>我喜欢</span>
    <input v-model='searchValue' type="text">
  </div>  

  <div class="header">
    <img :src='headerImg'  alt="">
    <p style='top:0.1rem'>{{headerName}}</p>
    <p>{{headerDesc}}</p>
    <div class='control'  v-show='playPause'>
       <img src="../assets/images/play.png" alt="" v-show='!playOnOff' @click="pauseFun">
       <img src="../assets/images/pause.png" alt="" v-show='playOnOff' @click='playFun'>
    </div>
  </div>

<!--    <div class='control'>
    <span>{{headerName}}:{{headerDesc}}</span>
    <div v-show='playPause'>
       <img src="../assets/images/play.png" alt="" v-show='!playOnOff' @click="pauseFun">
       <img src="../assets/images/pause.png" alt="" v-show='playOnOff' @click='playFun'>
    </div>
   </div> -->


  <ul class='audioList'>
    <li v-for='(item,index) of audioArr' @click="palyAudioFun(item.id,index)" >
      <span>{{index+1}}:</span><span>{{item.name}}</span>
    </li>
  </ul>

      <div class='jumpPage'>
        <span @click='upPageFun(searchValue,page)' >上一页</span>
        <span>第{{page+1}}条 共{{audioLength}}页</span>
        <span @click='downPageFun(searchValue,page,audioLength)' >下一页</span>
      </div>


<audio src="" id='myAudio' loop></audio>
</div>
</template>

<script>
  import { Toast } from 'mint-ui';
export default {
  name: 'audiodegist',
  created(){
    var id=this.$route.query.id;
    //console.log(id);
    this.searchValue=id;
    this.searchDataFun(id,0)
    
    
  },
  data () {
    return {
      searchValue:'',
      audioArr:[],
      audioLength:0,
      page:0,
      headerName:'',
      headerDesc:'',
      headerImg:'',
      playPause:false,
      playOnOff:false,

    }
  },
  methods:{
    searchDataFun:function(name,page){
      var pages=page*20+20
      let instance = Toast({
        message: '加载中',
        iconClass: 'icon icon-success',
        duration:-1,
      });
      var url='https://api.imjad.cn/cloudmusic/?type=search&limit='+pages+'&s='+name;
      this.$ajax.get(url).then(
        (res)=>{
          //console.log(res);
          instance.close();
          if(res.status==200&&res.data.code==200){
            this.audioArr=res.data.result.songs;
            this.audioLength=res.data.result.songCount;
            this.headerName=res.data.result.songs[0].ar[0].name
            this.headerDesc=res.data.result.songs[0].name
            this.headerImg=res.data.result.songs[0].al.picUrl
          }
        }

        ).catch()
    },
    newSearchFun:function(){
      var name=this.searchValue;
      this.page=0;
      this.searchDataFun(name,0)
    },
    pauseFun:function(){
      var audioPlayer=document.getElementById('myAudio');
      this.playOnOff=true;
      audioPlayer.pause();
    },
    playFun:function(){
      var audioPlayer=document.getElementById('myAudio');
      this.playOnOff=false;
      audioPlayer.play();
    },

    palyAudioFun:function(id,index){
      let instance = Toast({
        message: '加载中',
        iconClass: 'icon icon-success',
        duration:-1,
      });
      
      var url='https://api.imjad.cn/cloudmusic/?type=song&id='+id+'&br=128000';
      var audioPlayer=document.getElementById('myAudio');

      this.$ajax.get(url).then(
        (res)=>{
          instance.close();
          //console.log(res)
          if(res.status==200&&res.data.code==200){
            //console.log(res.data.data);
            if(res.data.data[0].url){
              this.playOnOff=false;
              this.headerName=this.audioArr[index].ar[0].name
              this.headerDesc=this.audioArr[index].name
              this.headerImg=this.audioArr[index].al.picUrl
              this.playPause=true;
              audioPlayer.src=res.data.data[0].url;
              audioPlayer.play();
            }else{
              Toast({
                message: '资源不可用',
                iconClass: 'icon icon-success',
                
              });
            }
            

          }
        }

        ).catch();
    },

    upPageFun:function(name,page){
      console.log(name,page)
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
    downPageFun:function(name,page,audioLength){
      var pages=page*20+20
      if(pages>=audioLength){
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











  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.degistWrap{
  font-size:0.12rem;
  padding-top:1.8rem;
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

.header{
  height:0.84rem;
  background-color:#F5FFFA;
  position:fixed;
  z-index:10;
  left:0rem;top:0.6rem;
  overflow: hidden;
  width:100%;
  padding-bottom:0.3rem;

}
.header img{
  width:1rem;
  height:1rem;
  position:absolute;
  left:0.04rem;
  top:0.1rem;
}
.header p{
  line-height:0.2rem;
  position: absolute;;
  left:1.2rem;
  top:0.4rem;

}

.control{
  position:absolute;
  z-index:10;
  right:0rem;bottom:0rem;
  overflow: hidden;
  border:1px solid #6495ED;
  width:0.4rem;
  height:0.4rem;
  background-color:#6495ED;
  border-radius: 50%;

}
.control img{
  width:100%;
  height:100%;
  position:absolute;
  left:0rem;top:0rem;

}
.audioList li{
  height:0.35rem;
  line-height:0.35rem;
  border-bottom:1px solid #ccc;
  padding-left:0.1rem;
}

.jumpPage{
  display:flex;
  justify-content: space-around;
  height:0.5rem;
  line-height:0.5rem;
  font-size:0.14rem;
}

























</style>
