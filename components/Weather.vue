<template lang="pug">
  v-card#WeatherWidget.pa-2(outlined tile)
    VueWeatherWidget(:api-key="darksky_api" title="Weather" :latitude="latitude" :longitude="longitude" language="ja" units="si" bar-color="#FFF" text-color="#FFF")
    div.text-right.font-weight-light Powered by Dark Sky
</template>

<style scoped>
#WeatherWidget {
  overflow: hidden;
}
.fe_label {
  width: 31px;
}
.fe_temp_bar {
  margin: 18px 5.5px 0;
}
</style>

<script lang="ts">
import Vue from 'vue'
import VueWeatherWidget from 'vue-weather-widget'
import 'vue-weather-widget/dist/css/vue-weather-widget.css'

export default Vue.extend({
  components: {
    VueWeatherWidget
  },
  data() {
    return {
      darksky_api: process.env.VUE_APP_DARKSKY_API,
      latitude: process.env.VUE_APP_LATITUDE,
      longitude: process.env.VUE_APP_LONGITUDE
    }
  }
})
</script>
