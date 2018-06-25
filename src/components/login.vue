<template>
  <div>
    <label>姓名</label><el-input v-model="name"></el-input>
    <el-button @click="loginClick">登陆</el-button>
  </div>
</template>
<style scoped>
</style>
<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        name: ''
      }
    },
    methods: {
      loginClick () {
        this.$store.state.loginName = this.name
        this.$router.push('/live-video')
          window.sessionStorage.setItem('loginName', this.name)
      }
    },
    computed: {
      ...mapState(['loginName'])
    }
  }
</script>
