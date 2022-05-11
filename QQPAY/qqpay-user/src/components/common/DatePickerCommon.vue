<template>
  <div class="date-picker">
    <date-picker
      :confirm="true"
      :clearable="false"
      :editable="false"
      :confirm-text="confirmText"
      :placeholder="placeholder"
      :value="value"
      @change="handleChange"
    />
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
export default {
  name: '',
  components: { DatePicker },
  props: {
    confirmText: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value);
    },
  },
};
</script>
