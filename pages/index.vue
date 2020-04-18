<template lang="pug">
  v-row
    v-col.pa-0(cols="6")
      Clock.ma-2
      Weather.ma-2
    v-col.pa-0(cols="6")
      TopNews.ma-2
      LocalNews.ma-2
      SubwayStatusBoard.ma-2
      div.ma-2 道路情報
      div.ma-2 ニュース速報
      div.ma-2 気象庁 警報・注意報
    EarthquakeSnackbar
</template>

<script lang="ts">
import Vue from 'vue'
import Clock from '~/components/Clock.vue'
import EarthquakeSnackbar from '~/components/EarthquakeSnackbar.vue'
import LocalNews from '~/components/LocalNews.vue'
import SubwayStatusBoard from '~/components/SubwayStatusBoard.vue'
import TopNews from '~/components/TopNews.vue'
import Weather from '~/components/Weather.vue'

export default Vue.extend({
  components: {
    Clock,
    EarthquakeSnackbar,
    LocalNews,
    SubwayStatusBoard,
    TopNews,
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
