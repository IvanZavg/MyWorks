<template>
  <div class="msg-container row s12" v-show="show">
    <div class="col s12 card-panel" :class="msgClass">
      <p class="white-text col">
        <i class="small material-icons">{{ msgIcon }}</i>
      </p>
      <p class="white-text col">
        {{ msg }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['msg', 'status', 'show'],
  data: () => ({
    statusClsess: {
      success: 'teal',
      warning: 'yellow accent-1',
      denger: 'red darken-3',
    },
    statusIcons: {
      success: 'done',
      warning: 'info_outline',
      denger: 'cancel',
    },
  }),
  computed: {
    msgClass() {
      return this.statusClsess[this.status]
    },
    msgIcon() {
      return this.statusIcons[this.status]
    },
  },
  mounted() {},
}
</script>

<style scoped>
.msg-container {
  margin: 10px;
}
</style>
