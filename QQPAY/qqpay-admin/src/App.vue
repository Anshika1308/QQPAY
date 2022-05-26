<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  --font-family-monospace: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, Courier, monospace;
  user-select: none;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern";
  color: #696969;
}

.add-partner .custom-control-input:checked ~ .custom-control-label::before,
.add-partner-commission .custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #ff6b00 !important;
  background-color: #ff6b00 !important;

}

</style>