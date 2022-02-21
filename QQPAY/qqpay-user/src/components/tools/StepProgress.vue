<template>
  <ul class="progressbar">
    <li
      v-for="(step, index) in steps"
      :key="step.text"
      :class="{ active: index + 1 <= current }"
      :style="progressWidth"
    >
      <small>{{ step.text }}</small>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["current", "steps"],
  data() {
    return {};
  },
  methods: {},
  computed: {
    progressWidth: function () {
      return {
        width: 100 / this.steps.length + "%",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/global.scss";
.progressbar {
  counter-reset: step;
  color: $dimgrey !important;
  margin-left: -5%;
  li {
    float: left;
    position: relative;
    text-align: center;
    &:before {
      content: counter(step);
      counter-increment: step;
      width: 20px;
      height: 20px;
      border: 2px solid $silver;
      display: block;
      margin: 6px auto 10px auto;
      border-radius: 50%;
      background: $white;
      color: $txt;
      text-align: center;
      font-size: 12px;
    }
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      background: $silver;
      top: 15px;
      left: -50%;
      z-index: -1;
    }
    &:first-child {
      &:after {
        content: none;
      }
    }
  }
  li.active {
    &:before {
      border-color: $txt;
      background: $txt;
      color: $white;
    }
    &:after {
      background: $txt;
    }
    li {
      &:after {
        background: $txt;
      }
      &:before {
        border-color: $txt;
        background: $txt;
        color: $white;
      }
    }
  }
}
</style>