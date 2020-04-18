<template lang="pug">
  v-snackbar(v-model="snackbar" color="cyan darken-2" :timeout="timeout") {{ text }}
    v-btn(text @click="snackbar = false") Close
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'

class JMAQuake {
  issue: {
    source: string
    time: string
    type: string
    correct: string
  }

  earthquake: {
    time: string
    hypocenter: {
      name: string
      latitude: number
      longitude: number
      depth: number
      magnitude: number
    }
    maxScale: number
    domesticTsunami: string
    foreignTsunami: string
  }

  points:
    | undefined
    | [
        {
          pref: string
          addr: string
          isArea: boolean
          scale: number
        }
      ]

  constructor() {
    this.issue = {
      source: '',
      time: '',
      type: 'Other',
      correct: 'Unknown'
    }
    this.earthquake = {
      time: '',
      hypocenter: {
        name: '',
        latitude: -200,
        longitude: -200,
        depth: -1,
        magnitude: -1
      },
      maxScale: -1,
      domesticTsunami: 'Unknown',
      foreignTsunami: 'Unknown'
    }
  }
}

export default Vue.extend({
  data() {
    return {
      data: new JMAQuake(),
      intervalId: 0,
      snackbar: false,
      latest_time: '',
      text: '',
      timeout: parseInt(process.env.VUE_APP_P2PQUAKE_TIMEOUT || '10000')
    }
  },
  mounted() {
    this.fetch()
    this.do()
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    do() {
      this.intervalId = window.setInterval(() => {
        this.fetch()
      }, parseInt(process.env.VUE_APP_P2PQUAKE_INTERVAL || '5000'))
    },
    fetch() {
      if (process.env.VUE_APP_P2PQUAKE_API) {
        axios.get(process.env.VUE_APP_P2PQUAKE_API).then((res) => {
          this.data = res.data[0] as JMAQuake
          if (this.latest_time !== this.data.earthquake.time) {
            this.latest_time = this.data.earthquake.time
            this.text = `${this.data.earthquake.time} ${
              this.data.earthquake.hypocenter.name
            } ${this.convert_scale(this.data.earthquake.maxScale)}`
            this.snackbar = true
          }
        })
      }
    },
    convert_scale(scale: number): string {
      switch (scale) {
        case 10:
          return '震度1'
        case 20:
          return '震度2'
        case 30:
          return '震度3'
        case 40:
          return '震度4'
        case 45:
          return '震度5弱'
        case 50:
          return '震度5強'
        case 55:
          return '震度6弱'
        case 60:
          return '震度6強'
        case 70:
          return '震度7'
        default:
          return '震度情報なし'
      }
    }
  }
})
</script>
