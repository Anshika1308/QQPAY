<template>
  <div>
    <b-form-group
      :label="textFieldLabel"
      label-for="input-name"
    >
      <b-form-input
        id="input-name"
        v-model="textFieldValue"
      ></b-form-input>
    </b-form-group>
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
