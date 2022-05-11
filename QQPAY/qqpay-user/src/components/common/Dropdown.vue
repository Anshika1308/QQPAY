<template>
  <div class="dropdown-custom">
    <b-dropdown
      class="custom-dropdown"
      variant="light"
      :text="defaultName"
    >
      <b-dropdown-item
        v-for="option in arrayOptions"
        :key="option.value"
        :value="option.value"
        @click="
          defaultName = option.text;
          open = false;
          $emit('input', option);
        "
      >
        {{ option.text }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: 'CustomDropdown',
  props: {
    defaultName: {
      type: String,
      default() {
        return '';
      }
    },
    labelDropdown: {
      type: String,
      default: '',
    },
    arrayOptions: {
      type: Array,
      default() {
        return [];
      },
    }
  },
  methods: {
    onChangeDropdown(elementInput) {
      this.defaultSelected = elementInput.text;
      this.$emit('selectedObj', elementInput);
    }
  },
  // computed: {
  //   getDefaultValue() {
  //     if (this.defaultName) {
  //       console.log('in', this.defaultName);
  //       const nameLabel = this.defaultName;
  //       this.defaultSelected = nameLabel;
  //       return this.defaultSelected;
  //     } else {
  //       console.log('2');
  //       return '';
  //     }
  //   }
  // }
};
</script>
<style scoped>
.dropdown-custom {
  line-height: 3rem;
}
</style>
