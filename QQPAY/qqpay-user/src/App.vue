<template>
  <div id="app">
    <router-view />
    <script type="module" src="https://unpkg.com/vue@3/dist/vue.esm-browser.js"/>
    <script type="module" src="https://unpkg.com/vue-i18n@9/dist/vue-i18n.esm-browser.js"/>
  </div>
</template>
<style>
#app {
  font-family: "Avenir",Helvetica,Arial,sans-serif;
	--font-family-monospace: Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,Courier,monospace;
	user-select: none;
  text-rendering: optimizeLegibility;
  font-feature-settings: "kern";
  color: #696969;
}
</style>