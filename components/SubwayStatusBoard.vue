<template>
  <div class="Widget SubwayStatus">
    <!-- <SubwayStatus name='南北線' data=''/>
    <SubwayStatus name='東西線' data=''/>
    <SubwayStatus name='東豊線' data=''/> -->
    {{ $store.state.TraficStatus.data }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import SubwayStatus from '~/components/SubwayStatus.vue'

export default Vue.extend({
  components: {
    // SubwayStatus,
  },
  data() {
    return {
      // intervalId: undefined,    // 1. clearIntervalのためのIDを保持します
      // time: undefined,
      intervalId: 0, // 1. clearIntervalのためのIDを保持します
      time: new Date()
    }
  },
  mounted() {
    // 3. 上記で用意したメソッドをマウントのタイミングで呼び出します。
    //    これによりこのコンポーネントは一定間隔で処理を実行することになります。
    this.do()
  },
  beforeDestroy() {
    // 4. 使用後はしっかりとクリアする必要があります
    clearInterval(this.intervalId)
  },
  methods: {
    do() {
      // 2. 一定間隔で処理を実行するためメソッドを用意します
      this.intervalId = window.setInterval(() => {
        this.time = new Date() // 処理内容
      }, 1000) // 1秒間隔で処理
    }
  }
})
</script>
