/**
 * Created by 123 on 2018/5/23.
 */
export default {
  changeUserSig (state, data) {
    state.userSig = data
  },
  changeToken (state, data) {
    state.token = data
  },
  changeSdk (state, data) {
    state.sdk = data
  },
  changeVideoRender (state, data) {
    state.videoRender = data
  },
  changeMsg (state, data) {
    state.msg = data
  },
  changeMemberVideo (state, data) {
    state.memberVideo = data
  },
  changeVideoRenderShare (state, data) {
    state.renderShare = data
  }
}
