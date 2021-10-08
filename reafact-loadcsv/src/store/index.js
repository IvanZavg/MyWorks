import Vue from 'vue'
import Vuex from 'vuex'

import delay from '@/plagins/delay'
import prepareDataByMethod from '@/plagins/prepareDataToSend'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileData: [],
    headers: [],
    rows: [],
    countSended: 0,
    hasErrSend: false,
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

    countSended(state) {
      return state.countSended
    },

    hasErrSend(state) {
      return state.hasErrSend
    },
  },
  mutations: {
    clearData(state) {
      state.fileData = []
      state.headers = []
      state.rows = []
      state.countSended = 0
      state.hasErrSend = false
    },

    setHeaders(state, { fileData, delimiter }) {
      state.headers = fileData[0].split(delimiter)
    },

    setRows(state, { fileData, delimiter }) {
      state.rows = fileData.filter((el, idx) => idx !== 0).map((el) => el.split(delimiter))
    },

    setSendData(state) {
      let data = []
      state.rows.forEach((row) => {
        let sendRowObj = {}

        state.headers.forEach((head, idx) => {
          sendRowObj[head] = row[idx]
        })
        data.push(sendRowObj)
      })
      state.fileData = data
    },

    resetAfterSendErrs(state, data) {
      state.rows = data
      state.hasErrSend = true
    },

    resetCountSend(state) {
      state.countSended = 0
    },
    resetHasErrSend(state) {
      state.hasErrSend = false
    },
    increaseCountSended(state) {
      state.countSended++
    },
  },
  actions: {
    loadFileData({ dispatch }, { file, delimiter }) {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = function(e) {
        dispatch('setData', { data: e.target.result, delimiter })
      }
    },

    setData({ commit }, { data, delimiter }) {
      let fileData = data.split('\r\n').filter((el) => Boolean(el))
      commit('setHeaders', { fileData, delimiter })
      commit('setRows', { fileData, delimiter })
      commit('setSendData')
    },

    sendData({ state, commit }, options) {
      return new Promise(async (resolve, reject) => {
        commit('resetCountSend')
        commit('resetHasErrSend')

        let { method, url, delayms } = options
        let errAray = []

        for (let i = 0; i < state.fileData.length; i++) {
          let sendOptions = prepareDataByMethod(method, url, state.fileData[i])
          let response = await fetch(sendOptions.url, sendOptions.options)
          console.log(response)
          commit('increaseCountSended')
          if (!response.ok) errAray.push(state.rows[i])
          await delay(delayms)
        }

        if (errAray.length !== 0) {
          commit('resetAfterSendErrs', errAray)
          commit('setSendData')
          commit('resetCountSend')
          resolve('isErrSend')
        } else {
          commit('clearData')
          resolve('isAllSendSuccess')
        }
      })
    },

    emulateSendData({ state, commit }, msdelay) {
      return new Promise(async (resolve, reject) => {
        commit('resetCountSend')
        commit('resetHasErrSend')

        let errAray = []
        for (let i = 0; i < state.fileData.length; i++) {
          await delay(msdelay)
          commit('increaseCountSended')
          if (!(i % 11) && i) errAray.push(state.rows[i])
        }

        if (errAray.length !== 0) {
          commit('resetAfterSendErrs', errAray)
          commit('setSendData')
          commit('resetCountSend')
          resolve('isErrSend')
        } else {
          commit('clearData')
          resolve('isAllSendSuccess')
        }
      })
    },
  },
  modules: {},
})
