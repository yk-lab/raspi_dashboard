<template>
  <v-layout>
    <v-flex class="text-center">
      <Clock />
      <SubwayStatusBoard />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Clock from '~/components/Clock.vue'
import SubwayStatusBoard from '~/components/SubwayStatusBoard.vue'

export default Vue.extend({
  components: {
    Clock,
    SubwayStatusBoard
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
