/**
 * Created by 123 on 2018/5/25.
 */
export default {
  data () {
    return {
      E_IM_CustomCmd: {
        AVIMCMD_None: '0', // 无事件：0
        AVIMCMD_EnterLive: '1', // 用户加入直播, Group消息 ： 1
        AVIMCMD_ExitLive: '2', // 用户退出直播, Group消息 ： 2
        AVIMCMD_Multi: '2048', // 多人互动消息类型 ： 2048
        AVIMCMD_Multi_Host_Invite: '2049', // 多人主播发送邀请消息, C2C消息 ： 2049
        AVIMCMD_Multi_CancelInteract: '2050', // 已进入互动时，断开互动，Group消息，带断开者的imUsreid参数 ： 2050
        AVIMCMD_Multi_Interact_Join: '2051', // 多人互动方收到AVIMCMD_Multi_Host_Invite多人邀请后，同意，C2C消息 ： 2051
        AVIMCMD_Multi_Interact_Refuse: '2052', // 多人互动方收到AVIMCMD_Multi_Invite多人邀请后，拒绝，C2C消息 ： 2052，
        AVIMCMD_Multi_Interact_Apply:'2053',//观众申请上麦,C2C消息
        AVIMCMD_Multi_Interact_Agree:'2054'//主播同意上麦,C2C消息
        //2055  观众打开麦克风
        //2056  观众关闭麦克风
      }
    }
  },
  methods: {
    // 全屏切换
    toggleVideoWidth () {
      let ele = this.showShareVideo ? this.$refs.shareVideoContainer : this.$refs.videoContainer
      this.isShowFull = !this.isShowFull
      this.isShowFull ? this.requestFullScreen(ele) : this.exitFullscreen(ele)
      if (this.isShowFull) {
        window.onkeydown = e => {
          if (e.keyCode == 27) {
            this.isShowFull = false
            this.exitFullscreen(ele)
          }
        }
      }
      // let offsetWidth = ele.offsetWidth
      // if (offsetWidth <= this.$refs.videoMain.$el.offsetWidth) {
      //   this.isShowFull = true
      //   this.requestFullScreen(ele)
      // }else if (offsetWidth > this.$refs.videoMain.$el.offsetWidth) {
      //   this.isShowFull = false
      //   this.exitFullscreen(ele)
      // }
    },
    // 进入全屏
    requestFullScreen(ele) {
      // if (ele.requestFullscreen) {
      //   ele.requestFullscreen()
      // }
      //FireFox
      // else if (ele.mozRequestFullScreen) {
      //   ele.mozRequestFullScreen()
      // }
      //Chrome等
      // else if (ele.webkitRequestFullScreen) {
      //   ele.webkitRequestFullScreen()
      // }
      //IE11
      // else if (ele.msRequestFullscreen) {
      //   ele.msRequestFullscreen()
      // }
      // else {
      //   bindClass(ele, 'showFull')
      //   var WshShell = new ActiveXObject('WScript.Shell')
      //   WshShell.SendKeys('{F11}')
      // }
      ele.style.position = 'fixed'
      ele.style.left = '0'
      ele.style.top = '0'
      ele.style.width = '100%'
      ele.style.zIndex = '20'
},
    //退出全屏
    exitFullscreen(ele) {
      window.onkeydown = null
      ele.style.position = 'relative'
      ele.style.left = '0'
      ele.style.top = '0'
      ele.style.height = 'calc(100% - 10px);'
      ele.style.width = '100%'
      ele.style.zIndex = '0'
  // var de = document
  // if (document.exitFullscreen) {
  //   document.exitFullscreen()
  // }
  // else if (document.mozCancelFullScreen) {
  //   document.mozCancelFullScreen()
  // }
  // else if (document.webkitCancelFullScreen) {
  //   document.webkitCancelFullScreen()
  // }
  // else if (document.msExitFullscreen) {
  //   document.msExitFullscreen()
  // }
  // else {
  //   unBindClass(ele, 'showFull')
  //   var WshShell = new ActiveXObject('WScript.Shell')
  //   WshShell.SendKeys('{F11}');
  // }
},
    // 创建直播用户
    CreateLiveUser () {
      this.$ajax.post('/live/CreateLiveUser').then(res => {
        if (!res.data.errorCode) {
          // 初始化sdk
          this.sdkInit(res.data.data)
        }
      })
    },
    GetUserInfo (code, fn) {
      this.$ajax.post('/live/GetUserInfo', {code: code}).then(res => {
        this.roomMembers[code] = res.data.data
        fn(res.data.data)
      })
    },
    // 获取房间号
    getRoomCode () {
      this.$ajax.post('/live/GetRoomList').then(res => {
        if (res.data.errorCode == 0) {
          var roomCode = res.data.data.rooms[0] ? res.data.data.rooms[0].info.roomnum : ''

          this.roomCode = roomCode

          this.ReportMemId(roomCode)

          // sdk登陆
          console.log('登陆请求成功开始sdk登陆')
          this.sdk.login(this.loginCode, this.userSig, this.loginSuccess, this.loginError)
        }
      })
    },
    // 加入房间
    ReportMemId (roomCode) {
      let obj = {
        roomnum: roomCode,
        role: 0,
        operate: 0
      }
      this.$ajax.post('/live/ReportMemId',obj).then(res =>{
        if (res.data.errorCode == 0) {
          this.GetRoomMember(roomCode)
          setInterval(() => {
            this.GetRoomMember(roomCode)
            this.heartbeat(roomCode)
          }, 1000*60)
        }
      })
    },
    GetRoomMember (roomNumber) {
      this.$ajax.post('/live/GetRoomMember', {roomnum: roomNumber}).then(res => {
        if (res.data.errorCode == 0) {
          // res.data.data.idlist
          this.master.length || this.master.push(res.data.data.idlist[0])
          this.members = res.data.data.idlist.splice(1)
        }
      })
    },
    // 心跳接口 /live/heartbeat
    heartbeat (roomnum) {
      this.$ajax.post('/live/heartbeat', {roomnum: roomnum, role: this.myRole})
    },
    getNotice() {
      this.$ajax('/live/GetNotice').then(res => {
        this.notice = res.data
      })
    }
}
}
