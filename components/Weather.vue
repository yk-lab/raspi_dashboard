<template lang="pug">
  v-card#WeatherWidget.pa-2(outlined tile)
    VueWeatherWidget(:api-key="darksky_api" title="Weather" :latitude="latitude" :longitude="longitude" language="ja" units="si" bar-color="#FFF" text-color="#FFF")
    div.text-right.font-weight-light.powered-by Powered by Dark Sky
</template>

<style>
#WeatherWidget {
  overflow: hidden;
}
#WeatherWidget .fe_container {
  min-width: 320px;
}
#WeatherWidget .fe_container #fe_current_icon {
  width: 40px !important;
  height: 40px !important;
}
#WeatherWidget .fe_container .fe_currently {
  font-size: 12px;
}
#WeatherWidget .fe_container .fe_currently .fe_temp {
  font-size: 25px;
}
#WeatherWidget .fe_container .fe_currently .fe_temp .fe_dir {
  font-size: 12px;
}
#WeatherWidget .fe_container .fe_currently .fe_wind {
  font-size: 10px;
}
#WeatherWidget .fe_dir svg {
  height: 15px;
}
#WeatherWidget .powered-by {
  font-size: 10px;
}
</style>

<script lang="ts">
import Vue from 'vue'
// TODO 後々対応する
// @ts-ignore
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
