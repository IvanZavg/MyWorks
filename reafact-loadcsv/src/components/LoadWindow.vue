<template>
  <div class="row card">
    <h5 class="col s12 center">Загрузить csv file</h5>
    <form class="row" action="#">
      <div id="loder-file-section" class="row s12">
        <div class="file-field input-field col">
          <div class="btn">
            <span>выбрать csv</span>
            <input type="file" ref="fileInput" @change="getDataLoadFiles" />
          </div>
          <div class="file-path-wrapper col">
            <input class="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div id="loder-file-section" class="row s12">
        <div class="input-field col s6">
          <i class="material-icons prefix">unfold_less</i>
          <input id="delimiter" type="text" class="validate" v-model="delimiter" />
          <label for="delimiter">Разделитель</label>
        </div>
        <div class="file-field input-field col">
          <a class="waves-effect waves-light btn" @click.prevent="preloadFileData"
            ><i class="material-icons left">file_download</i>Preload file</a
          >
        </div>
      </div>
      <div id="send-data-section" class="row">
        <div class="input-field col s6">
          <i class="material-icons prefix">http</i>
          <input id="nr-url" type="text" v-model.lazy="url" class="validate" />
          <label for="nr-url">URL</label>
        </div>
        <div class="file-field input-field col">
          <a class="waves-effect waves-light btn" @click.prevent="emulateSendData"
            ><i class="material-icons left">send</i>Send data</a
          >
        </div>
        <div class="row s12">
          <p class="col">
            <label>
              <input
                class="with-gap"
                name="sendMethod"
                type="radio"
                v-model="sendMethod"
                value="GET"
              />
              <span>GET</span>
            </label>
          </p>
          <p class="col">
            <label>
              <input
                class="with-gap"
                name="sendMethod"
                type="radio"
                v-model="sendMethod"
                value="POST"
              />
              <span>POST</span>
            </label>
          </p>
        </div>
      </div>
    </form>
    <InformMsg
      :msg="inforMsg"
      :status="informMsgStatus"
      :show="showInformMsg"
      :key="showInformMsg"
    />
    <div class="row">
      <div class="col">
        <p>Отправлено:</p>
        <p>{{ countSended }}/{{ cntDataRows }}</p>
      </div>
      <div class="col">
        <p>Ошибок при отправке:</p>
        <p>{{ countErrSend }}</p>
      </div>
      <div class="col" v-show="showResendButton">
        <br />
        <a class="waves-effect waves-light btn amber accent-4" @click.prevent="resendErrData"
          ><i class="material-icons left">replay</i> Отправить повторно</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InformMsg from '@/components/InformMsg.vue'

import { chURLFormat, chArrContainsData } from '@/plagins/checksBeaforeSend.js'

export default {
  components: { InformMsg },
  data: () => ({
    delimiter: ';',
    url: '',
    sendMethod: 'POST',
    files: null,

    //InformMsg data
    inforMsg: '',
    informMsgStatus: '',
    showInformMsg: false,
    //------------------

    showPreloadTable: false,
    showResendButton: false,
    countSended: 0,
    countErrSend: 0,
  }),
  computed: {
    ...mapGetters(['fileData', 'headers', 'rows', 'cntDataRows']),
  },

  methods: {
    getDataLoadFiles() {
      this.closeMsg()
      this.files = { ...this.$refs.fileInput.files }
    },
    async preloadFileData() {
      this.closeMsg()
      if (!this.$refs.fileInput.files[0]) {
        this.showMsg('denger', 'Вы не выбрали файл для загрузки')
        return
      }
      if (!this.files) this.getDataLoadFiles()
      //this.clearErrData()
      //this.clearData()
      await this.$store.dispatch('loadFileData', this.files[0])
      this.showPreloadTable = true
    },
    sendData() {
      this.closeMsg()
      if (!this.checkBeforeSend()) return
    },
    resendErrData() {
      this.closeMsg()
      if (!this.checkBeforeSend()) return
    },
    emulateSendData() {
      this.closeMsg()
      if (!this.checkBeforeSend()) return
    },

    showMsg(status, msg) {
      this.informMsgStatus = status
      this.inforMsg = msg
      this.showInformMsg = true
    },
    closeMsg() {
      this.showInformMsg = false
    },
    checkBeforeSend() {
      let chFileData = chArrContainsData(this.fileData)
      if (!chFileData.state) {
        this.showMsg(
          'denger',
          'Нет данных для отправки. Загрузите данные через кнопку "PRELOAD FILE'
        )
        return false
      }

      let chUrl = chURLFormat(this.url)
      if (!chUrl.state) {
        this.showMsg('denger', `При проверке введенного URL обнаружена ошибка: "${chUrl.msg}"`)
        return false
      }

      return true
    },
  },
}
</script>
