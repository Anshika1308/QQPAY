<template>
  <div
    class="circle-process"
    :style="'width: ' + svgWidth + 'px; height: ' + svgHeight + 'px;'"
  >
    <svg class="svg-wrap" width="100%" height="100%">
      <circle
        id="bgCircle"
        :r="radius"
        :cx="circleCx"
        :cy="circleCy"
        :stroke-width="strokeWidth"
        :stroke="bgStroke"
      ></circle>
      <circle
        id="svgCircle"
        :r="radius"
        :cx="circleCx"
        :cy="circleCy"
        :stroke="stroke"
        :stroke-width="strokeWidth"
        :stroke-dasharray="computeDashArray"
        :stroke-dashoffset="dashoffset"
        :transform="computeTransform"
      ></circle>
    </svg>
    <span class="center" name="center">{{value}}%</span>
  </div>
</template>
<script>
export default {
  name: "CircularProgress",
  props: {
    svgWidth: {
      type: Number,
      default: 120,
    },
    svgHeight: {
      type: Number,
      default: 120,
    },
    radius: {
      type: Number,
      default: 55,
    },
    circleCx: {
      type: Number,
      default: 60,
    },
    circleCy: {
      type: Number,
      default: 60,
    },
    strokeWidth: {
      type: Number,
      default: 10,
    },
    bgStroke: {
      type: String,
      default: "#D8D8D8",
    },
    stroke: {
      type: String,
      default: "#2FD32C",
    },
    angle: {
      type: Number,
      default: -90,
    },
    direction: {
      type: Boolean,
      default: true,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dashoffset: 2 * Math.PI * this.radius,
    };
  },
  created: function () {
    var dashArray = 2 * Math.PI * this.radius;
    var dashoffsetEnd = (1 - this.value / this.max) * dashArray;
    var dashoffset = dashArray;
    var that = this;
    if (this.direction) {
      var loop = setInterval(function () {
        dashoffset = dashoffset - Math.ceil(Math.random() * 40);
        that.dashoffset = dashoffset;
        if (dashoffset < dashoffsetEnd) {
          dashoffset = dashoffsetEnd;
          that.dashoffset = dashoffset;
          clearInterval(loop);
        }
      }, 100);
    } else {
      return -(1 - this.value / this.max) * dashArray;
    }
  },
  computed: {
    computeDashArray: function () {
      return 2 * Math.PI * this.radius;
    },
    computeTransform: function () {
      return (
        "rotate(" +
        this.angle +
        ", " +
        this.circleCx +
        ", " +
        this.circleCy +
        ")"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";

.circle-process {
  position: relative;
}
#bgCircle {
  fill: transparent;
}
#svgCircle {
  fill: transparent;
  transition: stroke-dashoffset 150ms;
  stroke-linecap: round;
}
.svg-wrap {
  position: absolute;
  top: 0;
  left: 0;
}
.center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $primary;
  font-weight: bold;
  font-size: 20px;
}
</style>