<template lang="pug">
  v-card#TopNewsWidget.pa-2(outlined tile)
    vueSeamless.seamless-warp(:data="items" :class-option="classOption")
      v-list.pa-0.item(dense)
        v-list-item.py-0.px-10(v-for="item in items" :key="item.guid")
          v-list-item-content
            v-list-item-title {{ item.title }}
</template>

<style lang="scss" scoped>
#TopNewsWidget {
  overflow: hidden;

  .item {
    display: flex;
    flex-direction: row;
  }

  .seamless-warp {
    max-height: 160px;
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
        direction: 2,
        // singleHeight: 80,
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
      }, parseInt(process.env.VUE_APP_TOPNEWS_INTERVAL || '30000'))
    },
    fetch() {
      if (process.env.VUE_APP_TOPNEWS_XML) {
        axios
          .get(process.env.VUE_APP_TOPNEWS_XML, {
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
                  item.getElementsByTagName('guid')[0].textContent || undefined,
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
