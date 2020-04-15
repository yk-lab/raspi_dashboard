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
  }
})
</script>
