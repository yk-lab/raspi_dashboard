<template lang="pug">
  v-card#LocalNewsWidget.pa-2(outlined tile)
    vueSeamless.seamless-warp(:data="items" :class-option="classOption")
      v-list.pa-0.item(dense)
        v-list-item.pa-0(three-line v-for="item in items" :key="item.guid")
          v-list-item-content
            v-list-item-title {{ item.title }}
            v-list-item-subtitle {{ item.description }}
</template>

<style lang="scss" scoped>
#LocalNewsWidget {
  overflow: hidden;

  .seamless-warp {
    max-height: 152px;
    overflow: hidden;
    height: available;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
// TODO 後々対応する
// @ts-ignore
import vueSeamless from 'vue-seamless-scroll'

class News {
  guid: string
  title: string
  description: string

  constructor(guid = '', title = '', description = '') {
    this.guid = guid
    this.title = title
    this.description = description
  }
}

export default Vue.extend({
  components: {
    vueSeamless
  },
  data(): {
    items: News[]
    intervalId: undefined | number
  } {
    return {
      items: [],
      intervalId: undefined
    }
  },
  computed: {
    classOption() {
      return {
        direction: 1,
        singleHeight: 76,
        waitTime: 3000
      }
    }
  },
  mounted() {
    this.fetch()
    this.do()
  },
  beforeDestroy() {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId)
    }
  },
  methods: {
    do() {
      this.intervalId = window.setInterval(() => {
        this.fetch()
      }, parseInt(process.env.VUE_APP_LOCAL_NEWS_INTERVAL || '30000'))
    },
    fetch() {
      if (process.env.VUE_APP_LOCAL_NEWS_XML) {
        axios
          .get(process.env.VUE_APP_LOCAL_NEWS_XML, {
            responseType: 'document'
          })
          .then((res) => {
            const xml = res.data
            const items = Array.prototype.slice.call(
              xml.getElementsByTagName('item') as HTMLCollection
            )
            this.items = items.map(
              (item) =>
                new News(
                  item.getElementsByTagName('link')[0].textContent || undefined,
                  item.getElementsByTagName('title')[0].textContent ||
                    undefined,
                  item.getElementsByTagName('description')[0].textContent ||
                    undefined
                )
            )
          })
      }
    }
  }
})
</script>
