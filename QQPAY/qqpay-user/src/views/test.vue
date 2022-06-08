<template>
  <div>
    <b-button
      @click="clearInput"
      id="popover-reactive-1"
      variant="primary"
      ref="button"
      style="min-width: 240px"
    >
      <b-avatar
        style="width: 2rem; height: 1.5rem"
        rounded="sm"
        variant="info"
        :src="`data:image/png;base64,` + selectedflag.flag"
        class="mr-3"
      ></b-avatar>
      <span class="mr-auto">{{ selectedflag.currency.code }}</span>
    </b-button>
    <b-popover
      custom-class="my-popover-class"
      target="popover-reactive-1"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
    >
      <div>
        <input v-model="searchTerm" type="text" class="searchInput" />
        <div></div>
        <div
          @click="selectOption(countryitem)"
          class="list"
          v-for="countryitem in filterByTerm"
          :key="countryitem.id"
        >
          <b-list-group class="">
            <b-list-group-item class="list d-flex align-items-center">
              <b-avatar
                style="width: 2rem; height: 1.5rem"
                rounded="sm"
                variant="info"
                :src="`data:image/png;base64,` + countryitem.flag"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto"
                >{{ countryitem.name }}
                <small
                  ><strong>{{ countryitem.currency.code }}</strong></small
                >&nbsp;
                <small
                  ><strong>{{ countryitem.currency.name }}</strong></small
                ></span
              >
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </b-popover>
  </div>
</template>

<script>

import allCountries from "../../allCountries.json"
console.log("allCountries", allCountries)
export default {
  props: ["defaultflag"],
  data () {
    return {

      popoverShow: false,
      countriesList: allCountries,
      searchTerm: "",
      selectedflag: {
        "id": 127,
        "name": "Malaysia",
        "isoAlpha2": "MY",
        "isoAlpha3": "MYS",
        "isoNumeric": 458,
        "currency": {
          "code": "MYR",
          "name": "Ringgit",
          "symbol": "RM"
        },
        "flag": "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OTdFNEQ1NzE3ODIxMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OTdFNEQ1ODE3ODIxMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5N0U0RDU1MTc4MjExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5N0U0RDU2MTc4MjExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WpzGZAAAA1RJREFUeNrElF1oW2UYx38n5zTn5Lvt+pE13XLhoNPNaZirUqc4BTdBBcdAwSlMFId3YxdjoHgnCIpXohcieDFwYAteCFZFhcKYFVfHKhq3Nfsg6dIk2CZtkybnY8/JWTtEbaMIeeDl5YX3ff7P//9/3kdhz2gWiLAaiuPthT5YNiC0DB0mBGX3r4Dt429DixJayfP9ucMk5Vhk/dBkDaydfBZUgzC7mYf3j/PC41+RySa4cCnJmfQOSgtdUkRdwFXvriYFOYr3tlxG6QyQOD1GTDcxmqnXB66sMW7owrSfd06+xfEXR3n/1DNMnr+HuapOh18AFRvqOnpkgYalYdcCYIgSjqhQX0HRQkQOPo1fsvpbYHxb4twgrz3/IcePjXLgyBuMnzoCW6+CXqezN8/Ijinu7JtlXlS5kE1yrRinVvd7zHt6sCtzpEM6SbNOUVkfWBGPy03GKwY+8c/6/Am++3Enj748BtunhaRKv17l/rt/5s0nT5O6N0P64gDvffkU354b5nKpF9sFXrIIb1KZeXuQLt3GRG2R8XKIgaFfoBc+ndwLAZHQ50rrJxRuMLItTWp3BsTaoVSOAzemODu1Rwq71WyOg6IoqLEYPkPBh69FYK3B4lK4mTgZK4jfHZ6nmsV8OcaVolS0JPc20dwz+T6KlRiolve+qwt7Kc/MzqFmVxdoVWq38hsJfvjgWYZFTmVkQpKKUX15DEslLt6+8tDXPLj9N9K5BB9PPMavV7ZRNqVAVaReaBCJG1z/7BGiQdUVoEVgt7lKPXR3Fyl9cYjpmTj7jn5EMS9M++cIR+expQAVm55IhcJilFrNEC8VrzHFmXAnXDwRoNtv0djAYwEe84BxvMqlWwe3/M4nr79Lh1Zl/OxeJi9tYfraHczO9XtDxFGb1jStaA4cAVfDBBsFJtKvstVapLQh8ANnymv/2E3ieuYCLMs3ue8nEvEC2esyY/Kbb/u5etddqwPkD/nngwEq3wwTZuNQTvTuL/9pZN5KaonnC9LplqkSDlYxhKniMvsn72om/qjO0Zd2o8kE8bG+yYqzb+ivwP8l3EY0bWYyFWzb2Zix4zj/D/C/DC13+DnaEZqZy7UFuH1SZ3bd1R6p9VQq0i6ps+2Q+qYAAwAlKDesr1W8UQAAAABJRU5ErkJggg=="
      }
    }
  },
  computed: {
    filterByTerm () {
      return this.countriesList.filter(countryitem => {
        return countryitem.name.toLowerCase().includes(this.searchTerm);
      });
    }
  },
  watch: {

  },
  methods: {
    selectOption (val) {
      this.selectedflag = val
      this.popoverShow = false
      console.log(val)
    },
    clearInput () {
      this.searchTerm = ""
    }
  },
  created () {
    // this.selectedflag = this.defaultflag
  }

}
</script>

<style lang="scss" scoped>
.my-popover-class {
  position: absolute;
  will-change: transform;
  top: 0px;
  left: 0px;
  transform: translate3d(499px, 358px, 0px);
}
.list:hover {
  background: #337ab7;
  cursor: pointer;
  color: #fff;
}
.popover.b-popover {
  max-height: 400px;
  max-width: 400px;
  min-width: 400px;
  overflow-y: auto;
}
.searchInput {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
}
</style>