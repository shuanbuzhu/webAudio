<template>
<div class="degistWrap">
  <div class="header">
    <img :src="headInfoImgSrc" alt="">
    <p style='top:0.1rem'>{{headInfoName}}</p>
    <p>{{headInfoDesc}}</p>
  </div>

   <div class='control'>
    <span>{{chosedAudioIndex+1}}:{{chosedAudioName}}</span>
    <div v-show='playPause'>
       <img src="../assets/images/play.png" alt="" v-show='!playOnOff' @click="pauseFun">
       <img src="../assets/images/pause.png" alt="" v-show='playOnOff' @click='playFun'>
    </div>
   </div>


  <ul class='audioList'>
    <li v-for='(item,index) of audioListArr' @click='playAudioFun(index)'>
      <span>{{index+1}}:</span><span>{{item.show.name}}</span>
    </li>
  </ul>

      <div class='jumpPage'>
        <span @click='upPageFun(page)' >上一页</span>
        <span>第{{page*20+20}}条 共{{length}}条</span>
        <span @click='downPageFun(length,page)' >下一页</span>
      </div>


<audio src="" id='myAudio' loop></audio>
</div>
</template>

<script>
  import { Toast } from 'mint-ui';
export default {
  name: 'audiodegist',
  created(){
    var id=this.$route.query.id
    this.id=id;
    this.audioListFun(id,0);
  },
  data () {
    return {
      chosedAudioName:'',
      chosedAudioIndex:'',
      playPause:false,
      playOnOff:false,
      length:'',
      headInfo:{},
      headInfoName:"",
      headInfoImgSrc:"",
      headInfoDesc:"",
      audioListArr:[],
      page:0,
      id:'',
      
    }
  },
  methods:{

    audioListFun:function(id,page){
      var url='https://api.imjad.cn/qqfm/v1/?type=show&id='+id
      let instance = Toast({
        message: '加载中',
        iconClass: 'icon icon-success',
        duration:-1,
      });

      this.$ajax.get(url).then(
        (res)=>{
        
          if(res.status==200){
                instance.close();
                if(res.data.msg){
                  Toast({
                    message: res.data.msg,
                    iconClass: 'icon icon-success',
                  });
                }else{
                  instance.close();
                  this.length=res.data.length;
                  var arr=res.data.slice(20*page,20+20*page).toString();
                  this.audioDegistFun(id,arr)
                }
            
          }
        }
        ).catch();
    },
    audioDegistFun:function(id,arr){
      var url='https://api.imjad.cn/qqfm/v1/?type=skip_show&id='+id+'&shows='+arr
      this.$ajax.get(url).then(
        (res)=>{
          
          var newArr=arr.split(",")
          this.audioListArr=[];
          this.headInfo=res.data.data.showList[newArr[0]].album
                this.headInfoName=res.data.data.showList[newArr[0]].album.name
                this.headInfoImgSrc=res.data.data.showList[newArr[0]].album.cover.urls[2].url
                this.headInfoDesc=res.data.data.showList[newArr[0]].album.desc
          for(let i=0;i<newArr.length;i++){
            this.audioListArr.push(res.data.data.showList[newArr[i]])
          }
        }

        ).catch()
    },
    playAudioFun:function(index){
      this.chosedAudioName=this.audioListArr[index].show.name;
      this.chosedAudioIndex=index;
      var audioPlay=document.getElementById("myAudio");
      audioPlay.src=this.audioListArr[index].show.audioURL.urls[1].url;
      audioPlay.play();
      this.playPause=true;

    },
    pauseFun:function(){
      var audioPlay=document.getElementById("myAudio");
      audioPlay.pause();
      this.playOnOff=true;
    },
    playFun:function(){
      var audioPlay=document.getElementById("myAudio");
      audioPlay.play();
      this.playOnOff=false;
    },

    upPageFun:function(page){
      if(page>0){
        page--;
        this.page=page
        var id=this.id
        this.audioListFun(id,page);
      }else{
            Toast({
              message: '已经是第一页',
              iconClass: 'icon icon-success',
            });
      }

    },
    downPageFun:function(length,page){

      if(page*20+20>=length){
            Toast({
              message: '已经是最后一页',
              iconClass: 'icon icon-success',
            });
      }else{
        page++;
        this.page=page;
        var id=this.id;
        this.audioListFun(id,page);
      }
    },











  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.degistWrap{
  font-size:0.12rem;
  padding-top:1.7rem;
}
.header{
  height:0.84rem;
  background-color:#F5FFFA;
  position:fixed;
  z-index:10;
  left:0;top:0;
  
  padding-top:0.15rem;
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
  height:0.4rem;
  width:100%;
  line-height:0.3rem;
  color:#fff;
  background-color: #6495ED;
  position:fixed;
  z-index:10;
  left:0;top:1.2rem;
  
  overflow: hidden;

}
.control img{
  width:0.35rem;
  height:0.35rem;
  position:absolute;
  right:0.08rem;
  top:0.03rem;

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
