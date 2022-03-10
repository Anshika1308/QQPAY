<template>
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button" id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false">
      Dropdown button: {{value}}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" role="menu">
      <li v-for="option in options" :key="option">
        <a class="dropdown-item" @click="value = option" href="javascript:void(0)">{{option}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    // options: {
    //   type: Array,
    //   required: true,
    // },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      options: ['A', 'B', 'C'],
      value: 'B'
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>
<style scoped>
.custom-select {
  position: relative;
  margin: 8px;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 36px;
}

.custom-select .items {
  color: #fff;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: #0a0a0a;
  left: 0;
  right: 0;
  z-index: 1;
}
.custom-select .items div {
  color: #fff;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}
.custom-select .items div:hover {
  background-color: #ad8225;
}
.selectHide {
  display: none;
}
</style>
