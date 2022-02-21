<template>
  <div class="title-bar">
      <p class="title">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: "TitleBar",
  props: [
    'title',
  ],
};
</script>

<style lang="scss" scoped>
@import "@/global.scss";

.title-bar {
    background: $gainsboro;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
}
.back-arrow {
    width :40px;
    height: 40px;
}
.title {
    text-align: left;
    width: 100%;
    color: $dimgrey;
    font-weight: bold;
    font-size: 24px;
    margin: 0 15px;
}
</style>
