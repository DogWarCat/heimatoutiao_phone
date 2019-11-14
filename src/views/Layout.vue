<template>
  <div class="layout_container">
    <van-nav-bar title="黑马头条" right-text="搜索" @click-right="$router.push('/search')" />
    <router-view />
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    search () {},
    ...mapMutations(['setUser'])
  },
  created () {
    this.setUser({ token: 'hahahaha' })
  }
}
</script>

<style lang="less" scoped>
.layout_container {
}
</style>
