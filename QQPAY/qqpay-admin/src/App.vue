<template>
  <div id="app">
    <div v-if="$store.getters.isAppLoaded">
      <router-view />
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    async getConfig() {
      const runtimeConfig = await fetch('../../static/config.json')
      return await runtimeConfig.json()
    }
  },
  async created() {
    const config = await this.getConfig()
    this.$store.dispatch('app/setConfig', config)
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  --font-family-monospace: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, Courier, monospace;
  user-select: none;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern";
  color: #696969;
}

.add-partner .custom-control-input:checked~.custom-control-label::before,
.add-partner-commission .custom-control-input:checked~.custom-control-label::before {
  color: #fff;
  border-color: #ff6b00 !important;
  background-color: #ff6b00 !important;

}
 @import './assets/styles/custom.scss';
.table td, .table th {
    min-width: 100px !important;
}
</style>