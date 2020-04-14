import axios from 'axios'

export const state = () => ({
  data: {}
})

export const mutations = {
  setData(state, data) {
    state.data = data
  }
}
export const actions = {
  async getNowStatus(context) {
    await axios
      .get(
        `https://ckan.pf-sapporo.jp/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%22${process.env.subwayStatusResourceId}%22%20ORDER%20BY%20date%20desc,%20time%20desc%20LIMIT%201`
      )
      .then((res) => {
        if (res.data.success) {
          context.commit('setData', res.data.result.records[0])
        }
      })
  }
}
