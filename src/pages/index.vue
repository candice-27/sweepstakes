<template>
  <div class="home">
    <div class="title">
      <img src="../assets/image/topBar.png" alt="">
    </div>
    <bg-start/>
    <div class="viaContainer" v-show="beginLock">
      <ViaAnimation/>
    </div>
      <transition
      v-bind:css="false"
      v-on:before-enter="contBeforeEnter"
      v-on:enter="contEnter"
      v-on:leave="contLeave">
      <div class="content" v-show="awardContent">
        <begin-page/>
      </div>
    </transition>
     <transition 
      enter-active-class="animated fadeInUpBig"
      leave-active-class="animated fadeOut"
      v-show="awardPerson"
      >
    <!-- <transition 
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      > -->
      <div class="award_person" v-show="awardPerson">
        <award-person />
      </div>
    </transition>
    <div class="clean_components" v-show="emptyShow">
      <clean-data/>
    </div>
    <div class="footer" v-show="beginLock">
      <span>按空格键停止</span>
    </div>  
  </div>
</template>

<script>
import BgStart from '../components/bgStart'
import ViaAnimation from '../components/viaAnimation'
import BeginPage from '../components/beginPage'
import CleanData from '../components/cleanData'
import AwardPerson from '../components/awardPerson'
import Vuex,{ mapMutations, mapState } from 'vuex'
import SockJS from  'sockjs-client';
import  Stomp from 'stompjs';
import {IndexModel} from '../utils/index'
const indexModel = new IndexModel()
import animation from 'animate.css'
import  Velocity from 'velocity-animate'
import {awardBeforeEnter, awardEnter, awardLeave} from '../utils/my-animation'
import {contentBeforeEnter, contentEnter, contentLeave} from '../utils/my-animation'
export default {
  components: { BgStart, ViaAnimation, BeginPage, CleanData, AwardPerson },
  data () {
    return {
      Lottery: false,
      content: true,
      award_person: true,
      stompClient: '',
      award: ''
    }
  },
  computed: {
    ...mapState({
      awardName: state => state.awardName.awardName,
      beginLock: state => state.lock.beginLock,
      awardContent: state => state.lock.awardContent,
      awardPerson: state => state.lock.awardPerson,
      emptyShow: state => state.lock.emptyShow
    })
  },
  watch: {
    awardContent() {
      if(!this.awardContent) {
        this.stopLottery()
      }
    }
  },
  mounted() {
    this.initWebSocket()
    // this._getData()
  },
  methods: {
    ...mapMutations([
      'setAwardName',
      'setBeginLock',
      'setAwardContent',
      'setAwardPerson'
    ]),
    // initwebsocket
    initWebSocket() {
      if(this.stompClient.connected !== true) {
        this.connection()
      }
    },
    connection() {
      let sock = new SockJS("http://10.11.8.207/endpointChat");
      this.stompClient = Stomp.over(sock);
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe('/topic/lottery/prize', (res) => {
          if(res.body) {
            this.award = JSON.parse(res.body)
            console.log(this.award)
             this.setAwardName(this.award)
          }
        });
      });
    },
      //获取奖品信息
    _getData() {
      indexModel.getAwardList().then(res => {
        this.setAwardName(res.data)
      })
    },
    //停止抽奖
    stopLottery() {
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        if(_key === 32){
          // this.Lottery = false
          this.setBeginLock(false)
          this.setAwardPerson(true)
          setTimeout(() => {
            this.setAwardPerson(false)
          }, 3000);
           setTimeout(() => {
            this.setAwardContent(true)
          }, 3200);
        }
      }
    },
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.scale = 0
      awardBeforeEnter(el)
    },
    enter(el, done) {
      awardEnter(el, done)
    },
    leave(el, done) {
      awardLeave(el, done)
    },
    contBeforeEnter(el) {
      el.style.opacity = 0
      el.style.scale = 0
      contentBeforeEnter(el)
    },
    contEnter(el, done) {
      contentEnter(el, done)
    },
    contLeave(el, done) {
      contentLeave(el, done)
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('../assets/image/bgTop.png') no-repeat center;
  background-size: 100% 100%;
  .title {
    width: 558px;
    margin: 0 auto;
    margin-top: 27px;
    img {
      height: 129px;
    }
  }
  .viaContainer {
    margin: auto;
    width: 500px;
    height: 500px;
    z-index: 99;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -250px;
    margin-left: -350px;
  }
  .content {
    width: 68%;
    height: 67.2%;
    margin: auto;
    margin-top: 9px;
  }
  .award_person{
    position: absolute;
    left: 16%;
    top: 30%;
    width: 68%;
  }
  .clean_components {
    position: absolute;
    top: 75%;
    right: 4%;
  }
  .footer {
    position: fixed;
    bottom: 20px;
    left: 50%;
    color: #6f6f6f;
    opacity: .5;
    font-size: 24px;
    text-align: center;
    margin-left: -75px; 
  }
}

</style>

