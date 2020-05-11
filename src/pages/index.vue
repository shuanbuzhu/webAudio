<template>
    <div class='wrap'>
      <Tabbar :value='a'></Tabbar>
      <div class='swipe'>
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item  v-for="(item,index) of imgArr" v-bind:key="index" >
            <img  :src="item.url" alt="" @click='searchPage(item.link)'/>
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <ul class="classtype flexSpaceAround">
        <li @click='classtypeFun(item.id)' v-for='item of classListArr'>
          {{item.name}}
        </li>
      </ul>

      <div class="choseWrap">
          <ul class='classChildList'>
            <li @click='classChildFun(item.id)' v-for='item of childClassList[classId]'>
              {{item.name}}
            </li>
          </ul>
      </div>

      <ul class='flexStart dataListWrap'>
        <li v-for='item of audioListArr' @click='jumpPageFun(item.album.albumID)'>
          <img :src="item.album.cover.urls[2].url" alt=""/>
          <p>{{item.album.name}}</p>
        </li>
      </ul>


      <div class='jumpPage'>
        <span @click='upPageFun(pageNum,)' >上一页</span>
        <span>第{{pageNum}}页 共{{total}}页</span>
        <span @click='downPageFun()' >下一页{{onLine}}</span>
      </div>



    </div>
</template>

<script>
  window.addEventListener('offline', ()=>{
     // 网络由正常常到异常时触发
     console.log('网络断开了',this.onLine)

    });
  window.addEventListener('online',  ()=>{
     // 网络由异常到正常时触发
     console.log('网络已连接',this.onLine)
    });

  import {Swipe, SwipeItem} from 'mint-ui'
  import 'mint-ui/lib/style.css'
  import { Toast } from 'mint-ui';

import Tabbar from "../components/tabbar.vue";
export default {
  name: 'index',
  components:{
    Tabbar,
    Swipe
  },
  created(){
    this.audioDataFun('39110',1);
  },

  mounted(){
    console.log(this.onLine)
      window.addEventListener('online',  this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
  },
  beforeDestroy(){
 window.removeEventListener('online',  this.updateOnlineStatus);
 window.removeEventListener('offline', this.updateOnlineStatus);
},
  data () {
    return {
        onLine: navigator.onLine,

        childClassId:'',
        classId:'39110',
        pageNum:1,
        audioListArr:[],
        total:0,
        a:'tab1',
      imgArr:[
        {
          link: '许嵩',
          url: 'https://p2.music.126.net/dwvPvZ3HL_nzRoZHJP_KJw==/109951163261278540.jpg'
        },{
          link: '周杰伦',
          url: 'https://p3.music.126.net/6FgH_XwxyCK1hcoAnIgOTw==/18565253836700763.jpg'
        },{
          link: '刘若英',
          url: 'https://p2.music.126.net/eBF7bHnJYBUfOFrJ_7SUfw==/109951163351825356.jpg'
        },{
          link: '李荣浩',
          url: 'https://p2.music.126.net/y9LLAuZ-CYMFPqDBq4SNYw==/7823025232375425.jpg'
        },{
          link: '邓紫棋',
          url: 'https://p1.music.126.net/u_1EudmF8Swgow6vfgYe1g==/8896148580676276.jpg'
        }, {
          link: '蔡琴',
          url: 'https://p1.music.126.net/7RNnbzIr7EdkeHRK34ZPIw==/109951163434372027.jpg'
        }, 
        {
          link: '王菲',
          url: 'https://p1.music.126.net/NGup83j86vv_IUsxJC7hDg==/5654788301727269.jpg'
        }
      ],
      classListArr:[
        {id:'39110',name:'音乐'},
        {id:'39104',name:'情感'},
        {id:'39092',name:'小说'},
        {id:'4',name:'相声'},
        {id:'1',name:'综艺'},
        {id:'39120',name:'儿童'},
        {id:'39126',name:'知识'},
        {id:'18',name:'历史'},
        {id:'5',name:'新闻'},
        {id:'39087',name:'段子'},
      ],
      
      childClassList:{
        '39104':[
                
            {id:"39105",name:"情感治愈"},
            {id:"109",name:"晚安心语"},
            {id:"39106",name:"美文故事"},
            {id:"38983",name:"恋爱宝典"},
            {id:"107",name:"两性夜话"},
            {id:"108",name:"旅行人文"},
        ],
        '39110':[
               
            {id:"102",name:"心情"},
            {id:"118",name:"乐评"},
            {id:"117",name:"歌手"},
            {id:"38936",name:"流行"},
            {id:"39116",name:"经典"},
            {id:"40083",name:"催眠"},
            {id:"38937",name:"欧美"},
            {id:"40078",name:"日韩"},
            {id:"101",name:"榜单"},
            {id:"40038",name:"粤语"},
            {id:"103",name:"纯音"},
            
            {id:"40030",name:"电子"},
            {id:"40029",name:"喊麦"},
            {id:"40082",name:"原创"},
            {id:"38938",name:"翻唱"},
            {id:"38943",name:"民谣"},
            {id:"40079",name:"摇滚"},
            {id:"40028",name:"动漫"},
            {id:"40080",name:"古风"},
            {id:"40081",name:"宗教"},
            {id:"40077",name:"跑步"},
            {id:"38942",name:"影视"},
            {id:"40039",name:"古典"},
            {id:"40036",name:"世界"},
            {id:"40037",name:"儿童"},
            {id:"100",name:"3D"},
        ],
        '39092':[
                
            {id:"41092",name:"悬疑推理"},
            {id:"39096",name:"恐怖灵异"},
            {id:"38954",name:"玄幻奇幻"},
            {id:"38949",name:"现代言情"},
            {id:"38951",name:"古代言情"},
            
            {id:"104",name:"影视原著"},
            {id:"40042",name:"网游竞技"},
            {id:"38953",name:"都市生活"},
            {id:"38958",name:"武侠传奇"},
            {id:"38957",name:"官场商战"},
            {id:"38960",name:"历史军事"},
            {id:"38959",name:"青春校园"},
            {id:"40041",name:"耽美同人"},
            {id:"39103",name:"广播剧"},
            {id:"40040",name:"社科管理"},
            {id:"38956",name:"文学名著"},
            {id:"41093",name:"杂志专栏"},
            {id:"105",name:"鬼故事"},
        ],
        '4':[
               
            {id:"39133",name:"戏曲名剧"},
            {id:"39109",name:"相声新星"},
            {id:"38971",name:"相声名家"},
            {id:"38969",name:"评书大全"},
            {id:"38970",name:"小品大全"},
            {id:"111",name:"粤语评书"},

            {id:"40048",name:"刘兰芳"},
            {id:"40049",name:"王玥波"},
            {id:"38965",name:"单田芳"},
            {id:"38966",name:"袁阔成"},
            {id:"38972",name:"田连元"},
            {id:"38963",name:"郭德纲"},
        ],
        '1':[
                
            {id:"38985",name:"影视精选"},
            {id:"38974",name:"热门综艺"},
            {id:"38982",name:"八卦娱乐"},
            {id:"113",name:"星座风水"},
            {id:"38980",name:"明星专区"},
            {id:"116",name:"游戏动漫"},
            {id:"40043",name:"文娱杂谈"},
            {id:"40045",name:"时尚生活"},
            {id:"40044",name:"影视原声"},
        ],
        '39120':[
                
            {id:"40005",name:"睡前故事"},
            {id:"40002",name:"童话寓言"},
            {id:"40001",name:"儿歌音乐"},
            {id:"40003",name:"孕妈育儿"},
            {id:"40009",name:"经典名著"},
            {id:"40070",name:"诗词国学"},
            {id:"40007",name:"儿童英语"},
            {id:"40008",name:"儿童科普"},
            {id:"40076",name:"儿童教材"},
            {id:"40004",name:"卡通动画"},
        ],
        '39126':[
               
            {id:"40014",name:"科普充电"},
            {id:"40072",name:"名人专栏"},
            {id:"40073",name:"情商心理"},
            {id:"39127",name:"语言学习"},
            {id:"11400",name:"考试教材"},
            {id:"40060",name:"职场提升"},
            {id:"40071",name:"互联网"},
            {id:"39012",name:"公开课演讲"},
            {id:"39131",name:"健康养生"},
            {id:"39129",name:"创业投资"},

        ],
        '18':[
                
            {id:"40055",name:"野史趣闻"},
            {id:"40075",name:"佛学修身"},
            {id:"39132",name:"传奇档案"},
            {id:"39134",name:"文化讲坛"},
            {id:"40054",name:"人物传纪"},
            {id:"40050",name:"中国历史"},
            {id:"40062",name:"世界历史"},
            {id:"40052",name:"军事战争"},
            {id:"40074",name:"人文艺术"},
        ],
        '5':[
                
            {id:"38924",name:"头条新闻"},
            {id:"38925",name:"深度观点"},
            {id:"39078",name:"社会百态"},
            {id:"39049",name:"商业财经"},
            {id:"38927",name:"IT科技  "},
            {id:"38931",name:"军事要闻"},
            {id:"110",name:"自媒体"},
            {id:"38929",name:"汽车"},
            {id:"38930",name:"体育"},
        ],
        '39087':[
               
            {id:"38976",name:"热点趣闻"},
            {id:"38979",name:"糗事百科"},
            {id:"106",name:"内涵段子"},
            {id:"40015",name:"聊江湖"},
            {id:"38978",name:"冷笑话"},
            {id:"38977",name:"方言秀"},
        ]},
    }
  },
  methods:{
    searchPage:function(arg){
      console.log(arg)
    },

    audioDataFun:function(id,page){
      let instance = Toast({
        message: '加载中',
        iconClass: 'icon icon-success',
        duration:-1,
      });

      var url='https://api.imjad.cn/qqfm/v1/?type=album&page_size=20&id='+id+'&page='+page;

      this.$ajax.get(url).then((res)=>{
          //console.log(res.status,res.data)
          if(res.status==200){
            instance.close();
            this.audioListArr=res.data.data.albumInfoList;
            if(res.data.data.total){
              this.total=res.data.data.total
            }else{
              this.total=0
            }
            
          }else{
            instance.close();
            Toast({
              message: '资源不可用',
              iconClass: 'icon icon-success',
              
            });
          }
          
        }).catch((res)=>{
          console.log(res)
        });
    },



updateOnlineStatus(e) {
      const { type } = e;
        this.onLine = type === 'online';
      },

      
classtypeFun:function(id){
  //console.log(id)
  this.classId=id;
  this.childClassId='',
  this.pageNum=1;
  this.audioDataFun(id,1)
},

classChildFun:function(id){
  this.pageNum=1;
  this.childClassId=id;

  this.audioDataFun(id,1)
},

upPageFun:function(){
  if(this.pageNum>1){
    this.pageNum--;
    let page=this.pageNum;
    var id='';
    if(this.childClassId){
      id=this.childClassId
    }else{
      id=this.classId
    }
    this.audioDataFun(id,page)
  }else{
      Toast({
        message: '已经是第一页',
        iconClass: 'icon icon-success',
        
      });
  }

},
downPageFun:function(){
  if(this.pageNum>=this.total){
      Toast({
        message: '已经是最后一页',
        iconClass: 'icon icon-success',
      });
  }else{
      this.pageNum++;
      let page=this.pageNum;
      var id='';
      if(this.childClassId){
        id=this.childClassId
      }else{
        id=this.classId
      }
      this.audioDataFun(id,page)
  }
},


jumpPageFun:function(id){
  this.$router.push({
    path:'./audiodegist',
    query:{id:id}
  })
},
searchPage:function(id){
    this.$router.push({
    path:'./searchpage',
    query:{id:id}
  })
},









  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap{
  font-size:0.16rem;
  padding:0.1rem;
  padding-bottom:0.6rem;

}
.swipe{
  border:1px solid #FFD700;
  height:1.5rem;
  overflow: hidden;
  border-radius:0.06rem;
}
.swipe img{
  width:100%;
}


.classtype{
  font-size:0.12rem;
  color:#fff;
  margin-top:0.1rem;
}
.classtype li{
  border-radius:50%;
  width:0.33rem;
  height:0.33rem;
  line-height:0.33rem;
  text-align:center;
  background-color:#FFD700;
  margin:0.1rem;

}
.choseWrap{
  width:100%;
  height:0.4rem;
  line-height:0.4rem;
  overflow: hidden;
  font-weight: bold;
  /*border:1px solid red;*/

}
.classChildList{
  display:flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  font-size:0.12rem;
  width:500%;
}
.classChildList li{
  margin:0 0.05rem;
}


.dataListWrap{
  font-size:0.1rem;
}
.dataListWrap li{
  width:32%;
  margin-left:0.03rem;

}
.dataListWrap img{
  width:100%;
}
.dataListWrap p{
  height:0.2rem;
  line-height: 0.2rem;
  overflow: hidden;
  text-align: center;
}

.jumpPage{
  display:flex;
  justify-content: space-around;
  height:0.5rem;
  line-height:0.5rem;
  
  font-size:0.14rem;
}
























</style>
