<template>
  <div class="question_container">
    <span style="font-size:14px;">
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
    </span>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'question-index'
  // computed: {
  //   ...mapState(['user'])
  // },
  // created () {
  //   console.log(this.user)
  // }
}
</script>

<style lang="less" scoped>
.question_container {
  .van-skeleton {
    margin-top: 10px;
  }
}
</style>
