<template>
  <div id="app">
    <div class="container">
      <load-window></load-window>
    </div>
  </div>
</template>

<script>
import LoadWindow from '@/components/LoadWindow.vue'

export default {
  name: 'App',
  components: { LoadWindow },
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
</style>
