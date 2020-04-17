<template lang="pug">
  v-row
    v-col.pa-0(cols="6")
      Clock.ma-2
      Weather.ma-2
    v-col(cols="6")
      SubwayStatusBoard
      EarthquakeSnackbar
      div ニュース
      div 渋滞
</template>

<script lang="ts">
import Vue from 'vue'
import Clock from '~/components/Clock.vue'
import EarthquakeSnackbar from '~/components/EarthquakeSnackbar.vue'
import SubwayStatusBoard from '~/components/SubwayStatusBoard.vue'
import Weather from '~/components/Weather.vue'

export default Vue.extend({
  components: {
    Clock,
    EarthquakeSnackbar,
    SubwayStatusBoard,
    Weather
  },
  data() {
    return {
      // intervalId: undefined,
      trafic_status_intervalId: 0
    }
  },
  mounted() {
    this.do()
  },
  beforeDestroy() {
    clearInterval(this.trafic_status_intervalId)
  },
  methods: {
    do() {
      this.trafic_status_intervalId = window.setInterval(() => {
        this.$store.dispatch('TraficStatus/getNowStatus')
      }, 5000) // 5s間隔で処理
    }
  }
})
</script>
