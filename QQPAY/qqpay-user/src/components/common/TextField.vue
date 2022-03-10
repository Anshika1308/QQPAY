<template>
  <div>
    <div class="tex--fieldcontainer">
      <label class="text-field-label">{{textFieldLabel}}</label>
      <input class="text-field-value" type="text" name="" v-model="textFieldValue">
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: "TextField",
  data() {
    return {}
  },
  props: {
    textFieldLabel: {
      type: String,
      default: '',
    },
    textFieldValue: {
      type: String,
      default: '',
    },
  },
}
</script>
<style scoped>
.tex--fieldcontainer {
	position: relative;
} 
.text-field-label {
  font-size: 10px;
  position: absolute;
  top: -3px;
  left: 31px;
  background: white;
  padding: 5px;
}
.text-field-value {
	margin: 10px;
  border: 1px solid gray;
  width: 100%;
  padding: 8px;
  border-radius: 10px;
}

</style>
