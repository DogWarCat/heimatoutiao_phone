<template>
  <div class="video_container">
    <span style="font-size:14px;">
      <van-skeleton title avatar :row="3" />
      <van-skeleton title avatar :row="3" />
      <van-skeleton title avatar :row="3" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'video-index'
}
</script>

<style lang="less" scoped>
.video_container {
  .van-skeleton {
    margin-top: 10px;
  }
}
</style>
