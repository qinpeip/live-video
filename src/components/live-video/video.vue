<template>
<div class="main-body">
  <el-container style="min-width:1300px; max-width: 1600px;padding-bottom: 20px;margin: 0 auto">
    <el-header>
      <div class="walk-word">
        直播公告: {{notice}}
      </div>
    </el-header>
    <el-container style="height: 100%;">
      <el-aside width="200px" style="overflow: hidden ">
        <el-table :data="master" border style="width: 96%;margin: 5px 0 0 2px" class="member-table">
          <el-table-column prop="id" label="当前主播" align="center" style="background-color:red"></el-table-column>
        </el-table>
        <div class="member">
          <div class="member-header">当前听众</div>
          <ul>
            <li v-for="(item, index) in members" :key="index">
              <el-tooltip class="item" effect="dark" :content="item.id" :disabled="item.id.length < 10" placement="top">
                <div class="fl">{{item.id}}</div>
              </el-tooltip>
              <label class="fr">
                <i class="iconfont icon-xinhao" style="font-size: 20px; color: green" v-if="item.role==2"></i>
                <i class="iconfont icon-xinhao" style="font-size: 20px;" v-if="item.role==0"></i>
              </label>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-container style="width: 100px;">
        <el-main style="height: calc(100% - 200px); width: 100%" ref="videoMain">
          <div class="master-video" ref="videoContainer" v-show="!showShareVideo">
            <div class="mask-master" @dblclick="showFull"></div>
            <object id="render0" classid="CLSID:1EA15A99-7F53-4B6F-8947-B57A0729918E" width="100%"
                    height="100%">
            </object>
            <div class="show-full" v-if="!isShowFull" @click="showFull" title="进入全屏">
              <i class="iconfont icon-webicon311" style="font-size: 20px"></i>
            </div>
              <div class="exit-full" v-if="isShowFull" @click="showFull" title="退出全屏">
                <i class="iconfont icon-tuichuquanping" style="font-size: 20px"></i>
              </div>
          </div>
          <div class="master-video" ref="shareVideoContainer" v-show="showShareVideo">
            <div class="mask-master" @dblclick="showFull"></div>
            <object id="renderShare" classid="CLSID:1EA15A99-7F53-4B6F-8947-B57A0729918E" width="100%"
                    height="100%">
            </object>
            <div class="show-full" v-if="!isShowFull" @click="showFull" title="进入全屏">
              <i class="iconfont icon-webicon311" style="font-size: 20px"></i>
            </div>
            <div class="exit-full" v-if="isShowFull" @click="showFull" title="退出全屏">
              <i class="iconfont icon-tuichuquanping" style="font-size: 20px"></i>
            </div>
          </div>
        </el-main>
        <el-footer style="height: 200px">
          <div class="video-footer">
            <el-row class="clearfix">
              <el-col :span="22">
                <div class="chat-content" ref="chatContent">
                  <p v-for="(item, key) in messages" :key="index" v-if="messages.length">
                  <!--<p v-if="item.type == 1">-->
                    <!--&lt;!&ndash;<span>欢迎 </span>&ndash;&gt;-->
                    <!--<label>{{item.name}}</label>-->
                    <!--<span> {{item.content}}</span>-->
                  <!--</p>-->
                    <!--<p v-else>-->
                      <label>{{item.type === 0? `${item.name}: &nbsp;`:item.name}}</label>
                      <label></label>
                      <span>{{item.content}}</span>
                    <!--</p>-->
                  </p>
                </div>
                <div class="chat-edit">
                  <div class="chat-edit-container">
                    <textarea v-model="selfMessage" @keydown.enter.prevent="enterMsg" ref="textarea" id="male">
                    </textarea>
                  </div>
                  <div class="chat-edit-enter" @click="enterMsg">
                    发送
                  </div>
                </div>
              </el-col>
              <el-col :span="2" class="cz">
                <h1>操作</h1>
                <!--<el-button type="primary" size="small" @click="applyMicrophone">-->
                  <!--申 请 上 麦-->
                  <!--<i class="iconfont icon-maikefeng"></i>-->
                <!--</el-button>-->
                <!--<el-button type="primary" size="small" @click="logonOut" circle>-->
                   <!--退出-->
                  <!--<i class="iconfont icon-52jingyin"></i>-->
                <!--</el-button>-->
                <el-button type="primary" size="small" @click="downMicrophone" circle>
                  下 麦
                  <i class="iconfont icon-maikefeng-jingyin-tianchongsvg"></i>
                </el-button>
                <el-button type="primary" size="small" @click="toggleSound" circle>
                  {{soundModel}}
                  <i class="iconfont icon-52jingyin"></i>
                </el-button>

                <!--<el-button type="primary" size="small" @click="openSpeaker">-->
                  <!--打开扬声器-->
                  <!--<i class="iconfont icon-52jingyin"></i>-->
                <!--</el-button>-->
              </el-col>
            </el-row>
          </div>
        </el-footer>
      </el-container>
      <!--<el-aside width="300px" class="members-video">-->
        <!--<div :class="['member-video', showFont[0].isShow?'member-video-line-height':'']">-->
          <!--<i class="iconfont icon-jinyong" style="font-size:100px" v-if="showFont[0].isShow"></i>-->
          <!--<object id="render1" classid="CLSID:1EA15A99-7F53-4B6F-8947-B57A0729918E" width="100%"-->
                  <!--height="100%">-->
          <!--</object>-->
        <!--</div>-->
        <!--<div :class="['member-video', showFont[1].isShow?'member-video-line-height':'']">-->
          <!--<i class="iconfont icon-jinyong" style="font-size:100px" v-if="showFont[1].isShow"></i>-->
          <!--<object id="render2" classid="CLSID:1EA15A99-7F53-4B6F-8947-B57A0729918E" width="100%"-->
                  <!--height="100%">-->
          <!--</object>-->
        <!--</div>-->
        <!--<div :class="['member-video', showFont[2].isShow?'member-video-line-height':'']">-->
          <!--<i class="iconfont icon-jinyong" style="font-size:100px" v-if="showFont[2].isShow"></i>-->
          <!--<object id="render3" classid="CLSID:1EA15A99-7F53-4B6F-8947-B57A0729918E" width="100%"-->
                  <!--height="100%">-->
          <!--</object>-->
        <!--</div>-->
      <!--</el-aside>-->
    </el-container>
    <object id="cabid" classid="CLSID:54E71417-216D-47A2-9224-C991A099C531" codebase="../../../static/js/iLiveSDK.cab#version=1,7,1,0">
    </object>
  </el-container>
   <div id="promDiv" style="background:rgba(0,0,0,.8);width:100%;height:100%;position:absolute;top:0;right:0;left:0;bottom:0;margin:auto;z-index:9999;display:none">

          <p style="width:40%;height:90%;margin:auto;margin-top:2%">
          <img src="../../assets/prompt.png" style="height:100%;width:100%;margin-top:20px;margin-bottom:20px;margin:0 auto">
          </p>

    </div>

  </div>
</template>

<script>
import 'babel-polyfill'
import { mapState, mapMutations } from 'vuex'
import videoMixins from '../mixins/video-mixins'
export default {
  data () {
    return {
      notice: '',
      master: [],
      members: [

      ],
      messages: [],
      selfMessage: '',
      isReload: false,
      isShowFull: false,
      showFont: [{code: '', isShow: true}, {code: '', isShow: true} ,{code: '', isShow: true}],
      mySelfRenderVideoIndex: '',
      openPrivateChat: false,
      soundModel: '静 音',
      showShareVideo: false,
      loginCode: '',
      roomCode: '',
      roomMembers: {}, // 缓存已经获取到的用户名
      myRole: 0 // 角色编码
    }
  },
  mixins: [videoMixins],
  created () {
    window.onbeforeunload = (e) => {
      // 退出房间
       this.sdk.quitRoom(function(){
        alert('退出房间成功')
        this.sdk.closeSpeaker()
        return this.sdk.logout(this.logoutSuccess, this.logoutError)
      }.bind(this), function (err) {console.log(err);alert('退出房间失败', err)})
    }
    window.onunload = () => {
      // 退出房间
//      return this.sdk.quitRoom(function(){
//        alert('退出房间成功')
//        this.sdk.closeSpeaker()
//        return this.sdk.logout(this.logoutSuccess, this.logoutError)
//      }.bind(this), function (err) {alert('退出房间失败', err)})
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.sdkInit()
    })
  },
  methods: {
    ...mapMutations(['changeUserSig', 'changeToken', 'changeSdk', 'changeVideoRender', 'changeMsg', 'changeMemberVideo', 'changeVideoRenderShare']),
    sdkInit () {
      var ILiveSDK = this.ILiveSDK
      var sdk = new ILiveSDK(1400108533, 30445, 'cabid')
      // 赋值sdk
      this.changeSdk(sdk)
      // sdk 初始化
      this.sdk.init(this.sdkInitSuccess, this.sdkInitError)
    },
    dxnLogin () {
      this.$ajax.post('/live/Login').then(res => {
        if (res.data.errorCode == 0) {
          // 获取房间号
          this.getRoomCode()

          this.changeUserSig(res.data.data.userSig) // 存储userSig
          this.changeToken(res.data.data.token) // 存储token
          window.sessionStorage.setItem('loginName', res.data.data.loginName)

          this.getNotice()
          // 接收code
          this.loginCode = res.data.data.Code
          // 初始化视频渲染器
          let ILiveRender = this.ILiveRender
          // 主视频渲染器
          this.changeVideoRender(new ILiveRender('render0'))
          // 连麦观众视频渲染
//      this.changeMemberVideo([new ILiveRender('render1'), new ILiveRender('render2'), new ILiveRender('render3')])
          this.sdk.setForceOfflineListener(function () {})

          this.sdk.setRoomDisconnectListener(function () {})

          this.sdk.setRoomEventListener(this.roomEvent)

          this.sdk.setDeviceOperationCallback(function () {})

          //监听消息事件

          this.sdk.setMessageListener(this.listenerMsg)

          // 直接加入不走登陆
//          this.sdk.joinRoom(this.roomCode, this.E_iLiveAuthBits.AuthBit_Guest, 'Guest', this.joinSuccess, this.joinError)
        }
      })
    },
    initMessage (type, text) {
      // 初始化消息
      let ILiveMessageElem = this.ILiveMessageElem
      this.changeMsg(new ILiveMessageElem(type, text))
      let elems = []
      elems.push(this.msg)
      let ILiveMessage = this.ILiveMessage
      let message = new ILiveMessage(elems)
      return message
    },
    sdkInitSuccess (data) { // sdk初始化成功后的回调
      console.log('初始化成功')

      this.dxnLogin()
    },
    sdkInitError (data) {
      console.log('初始化失败',data)
    },
    joinSuccess (data) {
      console.log('加入房间成功')
      // 打开扬声器
      this.openSpeaker()
      // 发送群消息
        let message = this.initMessage(this.E_iLiveMessageElemType.CUSTOM, this.E_IM_CustomCmd.AVIMCMD_EnterLive)
      this.sdk.sendGroupMessage(message,function () {},this.enterMsgError)
    },
    joinError (data) {
      console.log('加入失败', data)
    },
    // 监听房间事件
    roomEvent (data) {
      if (data.eventid == 5) {
        // 渲染主视频
        this.videoRender.isFreeRender() && (this.videoRender.setIdentifer(data.identifier),this.videoRender.setRenderMode(1)) //setRenderMode设置视频的黑边消失
      }else if (data.eventid === 7) {
        this.showShareVideo = true
        // 屏幕分享视频渲染器
        let ILiveRender = this.ILiveRender
        this.changeVideoRenderShare(new ILiveRender('renderShare'))
        this.renderShare.setAuxRoadVideo(true)
      }else if (data.eventid === 8) {
        this.showShareVideo = false
      }
      // 列表视频渲染
//      console.log(this.memberVideo)
    },
    openSpeaker () {
      // 初始化扬声器
      //获取扬声器列表
      let ILiveDeviceList=this.sdk.getSpeakerList()
      if (ILiveDeviceList.code === 0) {
        ILiveDeviceList.devices.forEach(item => {
          console.log('打开扬声器')
          this.sdk.openSpeaker(item.id)
        })
      }
    },
    // 登陆成功后
    loginSuccess (data) {
      console.log('登陆成功')
      // 加入房间
      this.sdk.joinRoom(this.roomCode, this.E_iLiveAuthBits.AuthBit_Guest, 'Guest', this.joinSuccess, this.joinError)
    },
    loginError (data) {
      console.log('登陆失败', data)
    },
    logoutSuccess (data) {
      console.log(this.sdk);
      this.sdk.unInit()
    },
    logoutError (data) {
    },
    // 监听消息
    listenerMsg (data) {
      if (this.roomMembers[data.sender]) {
        this.applyMsgContent(data, this.roomMembers[data.sender])
      } else {
        this.GetUserInfo(data.sender, name => {this.applyMsgContent(data, name)})
      }
    },
    // 渲染聊天内容
    applyMsgContent (data, name) {
      let content = ''
      data.elems.forEach(item => {
        if (item.type == 0) {
          this.messages.push({
            type: item.type,
            content: item.content,
            name: name
          })
        this.autoShowBottom()
        }
        if (item.type === 1) {
          switch (item.content) {
            case '1':
              content = '加入了直播间'
              this.messages.push({
                type: item.type,
                content: content,
                name: name
              })
              this.autoShowBottom()
              break;
            case '2':
              content = '退出了直播间'
              this.messages.push({
                type: item.type,
                content: content,
                name: name
              })
              this.autoShowBottom()
              break;
            case '2049':
              this.agreeOrOpposition()
              break;
            case '2055':
              this.GetRoomMember(this.roomCode)
              break;
              case '2056':
              this.GetRoomMember(this.roomCode)
              break;
          	case '413':
          	this.downMicrophone()
          	break;
          }
        }
      })
    },
    agreeOrOpposition () {
      this.$confirm('主播邀请您上麦, 是否同意?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.applyMicrophone()
        let message = this.initMessage(this.E_iLiveMessageElemType.CUSTOM, '2051')
        this.sdk.sendGroupMessage(message,this.msgSendSuccess,this.enterMsgError)
      }).catch(() => {
        let message = this.initMessage(this.E_iLiveMessageElemType.CUSTOM, '2052')
        this.sdk.sendGroupMessage(message,this.msgSendSuccess,this.enterMsgError)
      })
    },
    // 渲染连麦视频
    applyMembersVideo (code) {
      let index = this.memberVideo.findIndex(item => item.isFreeRender() == 1)
      if (index != -1 && !this.showFont.includes(item => item.code == code)) {
        this.showFont[index].code = code
        this.showFont[index].isShow = false
        this.memberVideo[index].setIdentifer(code)
      }
    },
    //关闭渲染
    clearMembersVideo (code) {
      let index = this.showFont.findIndex(item => item.code == code)
      if (index != -1) {
        this.showFont[index].code = ''
        this.showFont[index].isShow = true
      }
    },
    // 发送消息
    enterMsg (e) {
      if (!this.selfMessage.trim()) return false
      let message = this.initMessage(this.E_iLiveMessageElemType.TEXT, this.selfMessage)
      this.sdk.sendGroupMessage(message,this.enterMsgSuccess,this.enterMsgError)
    },
    // 通用消息发送成功以后
    msgSendSuccess (fn) {
      fn&&fn()
    },
    enterMsgSuccess (data) {
      this.messages.push({
        type: 0,
        content: this.selfMessage,
        name: this.loginName
      })
      this.autoShowBottom()
      this.selfMessage = ''
    },
    enterMsgError () {},
    // 上麦
    applyMicrophone () {
        this.sdk.changeRole('LiveGuest', this.applyMicrophoneSuccess, this.applyMicrophoneError)
    },
    // 改变角色成功
    applyMicrophoneSuccess () {
          //获取麦克风列表
          let ILiveDeviceList = this.sdk.getMicList()
          if (ILiveDeviceList.code === 0) {
            //打开麦克风
            this.sdk.openMic(ILiveDeviceList.devices[0].id)
            this.myRole = 2
            this.heartbeat(this.roomCode)
            // 发送群消息
            let message = this.initMessage(this.E_iLiveMessageElemType.CUSTOM, '2055')
            this.sdk.sendGroupMessage(message,this.msgSendSuccess,this.enterMsgError)
            let obj = this.members.forEach(item => item.code == this.loginCode)
            obj && (obj.role = 2)
             //关闭麦克风
//            this.sdk.closeMic()
          } else {
            this.$message({
              type: 'info',
              message: '获取麦克风失败'
            })
          }
    },
    applyMicrophoneError (err) {
      console.log('改变角色失败', err)
    },
    // 下麦事件
    downMicrophone () {
      this.sdk.changeRole('Guest', this.closeMicSuccess, this.applyMicrophoneError)
    },
    closeMicSuccess () {
      this.sdk.closeCamera()
//      this.memberVideo[this.mySelfRenderVideoIndex].freeRender()
      let message = this.initMessage(this.E_iLiveMessageElemType.CUSTOM, '2056')
      this.sdk.sendGroupMessage(message,this.msgSendSuccess,this.enterMsgError)
      let obj = this.members.forEach(item => item.code == this.loginCode)
      obj && (obj.role = 0)
      this.myRole = 0
      this.heartbeat(this.roomCode)
    },
    // 声音开启与关闭
    toggleSound () {
      if (this.soundModel === '静 音') {
        this.soundModel = '开 启 音 量'
        this.sdk.closeSpeaker()
      } else {
        this.soundModel = '静 音'
        this.openSpeaker()
      }
    },
    // 私聊
    tellToOne (row) {
      this.openPrivateChat = true
    },
    // 进入全屏
    showFull () {
      this.toggleVideoWidth()
    },
    // 消息发送成功后显示最新的一条数据
    autoShowBottom () {
      this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight
    },
    logonOut () {
      alert('退出开始')
      this.sdk.quitRoom(function(){
        alert('退出房间成功')
        this.sdk.closeSpeaker()
        return this.sdk.logout(this.logoutSuccess, this.logoutError)
      }.bind(this), function (err) {alert('退出房间失败', err)})
    }
  },
  computed: {
    ...mapState(['userSig', 'sdk', 'videoRender', 'msg', 'memberVideo', 'renderShare']),
    loginName () {
      return this.$store.state.loginName || window.sessionStorage.getItem('loginName')
    }
  }
}
</script>
<style>
  .el-table th, .el-table tr{
    background-color: rgba(35, 51, 66, 1) ;
    color: white;
    border:0
  }
  .el-table__empty-block{
    background-color: rgba(52, 73, 94, 1);
  }
  .el-table td, .el-table th.is-leaf{
    border:0
  }
  .el-table--border, .el-table--group{
    border:0
  }
  body{
    background:none !important;
  }
</style>
<style scoped lang="less">
    .main-body {
    width: 100%;
    height: 100%;
    background:linear-gradient(#4f87c0, #b1c5d6);
    }
  .member-table tr {
        background-color: rgba(64,158,255,.2) !important;
      }

  #app .main-body>.el-container {
    overflow: hidden;
    height: 100%;
    .member {
      /*margin-top:30px;*/
      padding: 5px;
      /*height:calc(100% - 150px);*/
      /*max-height: 710px;*/
      height: 86%;
      overflow: hidden;
      font-size: 14px;
      color: white;
      .member-header {
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: rgba(35, 51, 66, 1);
      }
      ul {
        /*margin-top: 5px;*/
        /*border: 1px solid #ebeef5;*/
        background-color: #34495e;
        color:white;
        border-top: none;
        height: calc(100% - 0px);
        overflow: auto;

        li {
            margin: 5px 0;
            border: 1px solid rgba(255,255,255,.3);
            border-left: none;
            border-right: none;
            height: 30px;
            line-height: 30px;
          background-color: #233342;
        text-indent: 1rem;
        padding-right: 5px;
        label {
          cursor: pointer;
          /*background-color: #233342;*/
        }
          &:hover{
             background-color: rgba(64,158,255,.2);}
        div {
          float: left;
          width: 132px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        &:last-child {
      margin-bottom: 30px;
         }
        }
      }
    }
    .members-video {
      box-sizing: border-box;
      padding: 10px 5px;
      overflow: hidden;
    .member-video-line-height {
      display: flex;
      align-items:center;
      text-indent: 25%;
    }
  .member-video {
    color: #fff;
    height: 33.33333%;
    max-height: 270px;
    width: 100%;
    border: 1px solid #000;
    text-align: center;
    background-color: #f2f2f2;
  }
    }
      .el-main {
        height: calc(100% - 300px);
        padding:5px 0 0 0;
        .master-video {
          overflow: hidden;
          height:calc(100% - 10px);
          border: 1px solid #000;
          position: relative;
          .exit-full,.show-full {
            position: absolute;
            width: 20px;
            height: 20px;
            z-index: 100;
            background-color: #fff;
            right: 5px;
            bottom: 5px;
            cursor: pointer;
            transition: all .2s linear;
          }
    .show-full:hover {
             transform: scale(1.2,1.2);
           }
  .exit-full:hover {
             transform: scale(.8,.8);
           }
          .mask-master {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 99;
            background-color: black;
            opacity: 0;
          }
        }
      }
    .el-header {
      line-height: 60px;
      background-color: rgba(35, 51, 66, 1);
      position: relative;
      overflow: hidden;
      /*max-width: 1600px;*/
    }
    .walk-word {
      display: inline-block;
      transition: all;
      position: absolute;
      left: 100%;
      font-size: 18px;
      animation:mymove 10s linear infinite;
      color: white;
      overflow: hidden;
    }
    .el-footer {
      padding: 0px 0 15px 0;
  .video-footer {
    /*border: 2px solid rgba(229,228,228,.3);*/
    border-radius: 5px;
    height: 100%;
    overflow: auto;
    margin-bottom: 10px;
  }
  h1 {
    padding-top: 10px;
    /*padding-left: 20px;*/
    color: white;
    /*border-bottom: 1px dashed rgb(229,228,228);*/
    text-align: center;
    background: black;
  }
  .cz{
    background-color: rgba(0,0,0,.2);
  }
  .el-button {
    display: block;
    margin: 25px auto;
  }
  p {
    padding-top: 5px;
    padding-left: 5px;
    font-weight: 300;
    font-size: 13px;
    color: #626270;
    label {
      color: blue;
    }
    span {
      color: #555;
      font-size: 13px;
    }
    &:last-child {
    margin-bottom: 30px;
     }
  }
  .el-row {
    height: 100%;
    overflow: hidden;
  }
  .el-col-22 {
    border-right:1px solid rgb(229,228,228);
    height: 100%;
  }
  .chat-content {
    height: calc(100% - 50px);
    width: 100%;
    background-color: rgba(192, 196, 204, 1);
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    .clear-content {
      position: absolute;
      right: 5px;
      bottom:5px;
      cursor: pointer;
      color: red;
    }
  }
  .chat-edit {
    height: 50px;
    border-radius: 5px;
    .chat-edit-container {
      float: left;
      width: calc(100% - 100px);
      height: 70px;
  textarea {
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        font-size: 14px;
        resize: none;
        border-top: 1px solid rgb(229,228,228);
        border-bottom: 1px solid rgb(229,228,228);
        overflow: hidden;
      }
    }
    .chat-edit-enter {
      width: 100px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: rgba(64, 158, 255, 1);
      float: right;
      cursor: pointer;
    }
  }
    }
  }
  @keyframes mymove
  {
    0%   {left: 100%;overflow: hidden;display: none;}
    10%  {left: 90%;}
    20%  {left: 80%;}
    30%  {left: 70%;}
    40%  {left: 60%;}
    50%  {left: 50%;}
    60%  {left: 40%;}
    70%  {left: 30%;}
    80%  {left: 20%;}
    90%  {left: 10%;}
    100%  {left: 0%;}
  }
</style>
