<template lang="pug">
  v-card.pa-2(outlined tile)
    div#time.pa-1
      span.display-4 {{ $moment(time).format('HH:mm') }}
      span.display-1 {{ $moment(time).format('ss') }}
    div#Date.pa-1
      span.display-3 {{ $moment(time).format('MM/DD（ddd）') }}
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
