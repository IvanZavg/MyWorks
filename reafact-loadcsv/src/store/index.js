import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileData: [],
    headers: [],
    rows: [],
  },
  getters: {
    fileData(state) {
      return state.fileData
    },
    headers(state) {
      return state.headers
    },
    rows(state) {
      return state.rows
    },
    cntDataRows(state) {
      return state.fileData.length
    },
  },
  mutations: {
    setHeaders(state, fileData) {
      state.headers = fileData[0].split(';')
    },
    setRows(state, fileData) {
      state.rows = fileData.filter((el, idx) => idx !== 0).map((el) => el.split(';'))
    },
    setSendData(state) {
      let data = []
      state.rows.forEach((el) => {
        let row = el
        let sendRowObj = {}

        state.headers.forEach((el, idx) => {
          sendRowObj[el] = row[idx]
        })
        data.push(sendRowObj)
      })
      state.fileData = data
    },
  },
  actions: {
    async loadFileData({ dispatch }, file) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = function(e) {
        dispatch('setData', e.target.result)
      }
    },
    setData({ commit }, data) {
      let fileData = data.split('\r\n').filter((el) => Boolean(el))
      commit('setHeaders', fileData)
      commit('setRows', fileData)
      commit('setSendData')
    },
  },
  modules: {},
})

//   this.setHeaders()
//   this.setRows()
//   this.setSendData()
// }
// function setSendData() {
//   if (!this.dataForSend[0]) this.dataForSend = []

//   this.rows.forEach((el) => {
//     let row = el
//     let rowObj = {}
//     this.headers.forEach((el, idx) => {
//       rowObj[el] = row[idx]
//     })
//     this.dataForSend.push(rowObj)
//   })
// }
// function setHeaders(loadedData) {
//   this.headers = this.loadedData[0].split(this.delimiter)
// }
// function setRows(loadedData) {
//   this.rows = this.loadedData.filter((el, idx) => idx !== 0).map((el) => el.split(this.delimiter))
//   this.loadedData = ''
// }
