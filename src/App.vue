<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  errorCaptured (err, vm, info) {
    console.log('出错了', err, vm, info)
  }
}
</script>

<style scoped lang="less">
  #app {
    height: 100%;
  }
</style>
