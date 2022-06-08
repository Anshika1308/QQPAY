<template>
  <div>
    <h4>{{ $t("fundTransfers.howMuchTransfer") }}</h4>
    <b-alert variant="danger" dismissible fade :show="sourceAmountInputAlert">
      Amount should be above Service charge (Our Fee)
    </b-alert>
    <!-- source input -->
    <b-input-group size="lg" class="mt-3">
      <b-form-input
        placeholder="You Send"
        type="number"
        v-model="transaction_details.details.source_amount"
        class="converted"
      ></b-form-input>

      <!-- source input button -->
      <template #append>
        <b-button
          @click="sourceCountryButton"
          style="background: rgb(75, 53, 137); min-width: 150px"
        >
          <span class="mr-auto"
            ><b-avatar
              style="width: 1.5rem; height: 1rem"
              rounded="sm"
              variant="info"
              :src="`data:image/png;base64,` + selectedSourceCode.flag"
              class="mr-3"
            ></b-avatar
            ><span></span>{{ selectedSourceCode.currency_code }}</span
          ></b-button
        >
      </template>
      <!-- source input button -->
    </b-input-group>
    <!-- source input -->

    <!-- custom source dropdown popup box -->
    <div
      id="sourceToHide"
      v-show="customSourceDropdownBox"
      class="customSelect"
      style="
        height: 400px;
        width: 400px;
        background: #fff;
        border: 2px solid rgb(75, 53, 137);
      "
    >
      <input
        v-model="sourceSearchTerm"
        style="
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 10px;
          width: 100%;
          border: 2px solid rgb(75, 53, 137);
        "
        type="text"
        class="searchInput"
      />
      <div class="listbox" style="height: 321px; overflow-y: scroll">
        <div
          @click="selectSourceOption(countryitem)"
          v-for="countryitem in sourceFilterByTerm"
          :key="countryitem.id"
        >
          <b-list-group class="">
            <b-list-group-item
              class="list d-flex align-items-center"
              style="margin-bottom: 5px"
            >
              <b-avatar
                style="width: 2rem; height: 1.5rem"
                rounded="sm"
                variant="info"
                :src="`data:image/png;base64,` + countryitem.flag"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto"
                >{{ countryitem.country_name }}
                <small
                  ><strong>{{ countryitem.currency_code }}</strong></small
                >&nbsp;
                <small
                  ><strong>{{ countryitem.currency_name }}</strong></small
                ></span
              >
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
    <!-- custom dropdown popup box -->

    <!-- between inputs summary -->
    <div class="container">
      <div class="row">
        <div
          class="col-sm-4"
          style="border-right: 2px solid rgb(75, 53, 137); height: 50px"
        ></div>
        <div class="col-sm-4" style="text-align: right"></div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <div class="col-sm-4" style="border-right: 2px solid rgb(75, 53, 137)">
          <span
            ><strong><small>Delivery Method</small></strong></span
          >
        </div>
        <div class="col-sm-4" style="text-align: right">
          <b-form-select
            v-model="transaction_details.details.delivery_method"
            :options="delivery_options"
            class="mb-3"
            value-field="text"
            text-field="value"
          >
            <template #first>
              <b-form-select-option value="" disabled
                >Select an option</b-form-select-option
              >
            </template>
          </b-form-select>
          <span v-if="delivery_method_error == true" style="color: red"
            ><small>*Required</small>
          </span>
        </div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <div
          class="col-sm-4"
          style="border-right: 2px solid rgb(75, 53, 137); height: 50px"
        ></div>
        <div class="col-sm-4" style="text-align: right"></div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <div class="col-sm-4" style="border-right: 2px solid rgb(75, 53, 137)">
          <span
            ><strong><small>Our Fee</small></strong></span
          >
          <span
            style="
              position: absolute;
              right: -14px;
              width: 25px;
              background: #ccc;
              height: 25px;
              border-radius: 19%;
              text-align: center;
              font-weight: 700;
            "
            >-</span
          >
        </div>
        <div class="col-sm-4" style="text-align: right">
          <span
            ><small
              >{{ transaction_details.details.service_charge }} &nbsp;&nbsp;{{
                transaction_details.details.service_charge_CC
              }}</small
            ></span
          >
        </div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <div
          class="col-sm-4"
          style="border-right: 2px solid rgb(75, 53, 137); height: 30px"
        ></div>
        <div class="col-sm-4" style="text-align: right"></div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <div class="col-sm-4" style="border-right: 2px solid rgb(75, 53, 137)">
          <span
            ><strong><small>Amount we"ll convert</small></strong></span
          ><span
            style="
              position: absolute;
              right: -14px;
              width: 25px;
              background: #ccc;
              height: 25px;
              border-radius: 19%;
              text-align: center;
              font-weight: 700;
            "
            >=</span
          >
        </div>
        <div class="col-sm-4" style="text-align: right">
          <span
            ><strong
              ><small v-if="transaction_details.details.source_amount !== 0"
                >{{ convertableAmount }}&nbsp;&nbsp;{{
                  transaction_details.details.service_charge_CC
                }}</small
              ><small v-else>0</small></strong
            ></span
          >
        </div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <div
          class="col-sm-4"
          style="border-right: 2px solid rgb(75, 53, 137); height: 30px"
        ></div>
        <div class="col-sm-4" style="text-align: right"></div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <div class="col-sm-4" style="border-right: 2px solid rgb(75, 53, 137)">
          <span
            ><strong><small>Guaranteed rate (24 hrs)</small></strong></span
          ><span
            style="
              position: absolute;
              right: -14px;
              width: 25px;
              background: #ccc;
              height: 25px;
              border-radius: 19%;
              text-align: center;
              font-weight: 700;
            "
            >&#215;</span
          >
        </div>
        <div class="col-sm-4" style="text-align: right">
          <span
            ><small class="converted">{{
              transaction_details.details.exchangerate
            }}</small
            >&nbsp;&nbsp;<b
              ><b-icon
                icon="graph-up"
                animation="fade"
                style="color: green"
              ></b-icon></b
          ></span>
        </div>
        <div class="col-sm-4"></div>
      </div>
      <div class="row">
        <div
          class="col-sm-4"
          style="border-right: 2px solid rgb(75, 53, 137); height: 50px"
        ></div>
        <div class="col-sm-4" style="text-align: right"></div>
        <div class="col-sm-4"></div>
      </div>
    </div>
    <!-- between inputs summary -->

    <b-input-group size="lg">
      <!-- target input -->
      <b-form-input
        type="number"
        placeholder="They Receive"
        v-model="transaction_details.details.target_amount"
        class="converted"
      ></b-form-input>
      <!-- target input -->

      <!-- custom dropdown popup box -->
      <div
        id="targetToHide"
        v-show="customTargetDropdownBox"
        class="customSelect"
        style="
          height: 400px;
          width: 400px;
          background: #fff;
          border: 2px solid rgb(75, 53, 137);
          bottom: 60px;
        "
      >
        <div class="listbox" style="height: 321px; overflow-y: scroll">
          <div
            @click="selectTargetOption(countryitem)"
            v-for="countryitem in targetFilterByTerm"
            :key="countryitem.id"
          >
            <b-list-group class="">
              <b-list-group-item
                class="list d-flex align-items-center"
                style="margin-bottom: 5px"
              >
                <b-avatar
                  style="width: 2rem; height: 1.5rem"
                  rounded="sm"
                  variant="info"
                  :src="`data:image/png;base64,` + countryitem.flag"
                  class="mr-3"
                ></b-avatar>
                <span class="mr-auto"
                  >{{ countryitem.country_name }}
                  <small
                    ><strong>{{ countryitem.currency_code }}</strong></small
                  >&nbsp;
                  <small
                    ><strong>{{ countryitem.currency_name }}</strong></small
                  ></span
                >
              </b-list-group-item>
            </b-list-group>
          </div>
        </div>
        <input
          v-model="sourceTargetTerm"
          style="
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 10px;
            width: 100%;
            border: 2px solid rgb(75, 53, 137);
          "
          type="text"
          class="searchInput"
        />
      </div>
      <!-- custom dropdown popup box -->
      <!-- target input button -->
      <template #append>
        <b-button
          @click="targetCountryButton"
          style="background: rgb(75, 53, 137); min-width: 150px"
        >
          <span class="mr-auto"
            ><b-avatar
              style="width: 1.5rem; height: 1rem"
              rounded="sm"
              variant="info"
              :src="`data:image/png;base64,` + selectedTargetCode.flag"
              class="mr-3"
            ></b-avatar
            ><span></span>{{ selectedTargetCode.currency_code }}</span
          ></b-button
        >
      </template>
      <!-- target input button -->
    </b-input-group>
    <b-alert variant="danger" dismissible fade :show="targetAmountInputAlert">
      Dismissible Alert!
    </b-alert>
    <b-button
      :disabled="disableNextBtn"
      class="float-right mt-5 px-5"
      variant="primary"
      @click="buttonClickHandler"
      >Next</b-button
    >
  </div>
</template>

<script>

import constants from "../../../constants.json"
// import allCountries from "../../../allCountries.json"
// console.log("allCountries", allCountries)
import axios from "axios";
export default {
  props: ["txnDetails", "delivery_options"],
  mounted () {
    // console.log("mounted", allCountries)
  },
  data () {
    return {
      service_charge: 0,
      service_charge_CC: 0,//country code
      targetAmountInputAlert: false,
      sourceAmountInputAlert: false,
      customTargetDropdownBox: false,
      sourceTargetTerm: "",
      selectedTargetCode: {
        "id": 31,
        "iso_alpha2": "IN",
        "iso_numeric": 356,
        "currency_code": "INR",
        "nationality": "Indian",
        "flag": "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMEUwNDkwQzE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMEUwNDkwRDE3N0QxMUUyODY3Q0FBOTFCQzlGNjlDRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwRTA0OTBBMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAwRTA0OTBCMTc3RDExRTI4NjdDQUE5MUJDOUY2OUNGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+OIHw6AAAAPlJREFUeNpi/D/T+D/DAAAmhgECoxYPf4sZ/wPBQFn8CUjzEqvh7cffDAtX32Xg4WZhYGJkZHj/8SdDTLAKg6QIGyn2fiY5qGdN38/A8OU5g5k2F4OxBicD59+3DHNm7CXZxyykKL548TGDmCgHg6mpMoObWz/Dr19/GHbvLmS4desZWE5fX5Y2Fv/794+BhYWR4e/ff0BLfwPxX4Y/f0BiTAz///+jbRy3te5gEBTgYrCyVgY65D/DuXOPGJ49/cBQW+9FUhyTbPGnt78Z9qx7wiAozMnAyMTI8OblVwYnfxkGIQk2ki0emOwk3MExWjuNWjy8LAYIMADBumJ9k9IhVwAAAABJRU5ErkJggg==",
        "iso_alpha3": "IND",
        "country_name": "India",
        "currency_name": "Rupee",
        "currency_symbol": "₹",
        "dial_code": "+91",
        "is_active": true
      },
      customSourceDropdownBox: false,
      sourceSearchTerm: "",
      countriesList: [],
      selectedSourceCode: {
        "id": 44,
        "iso_alpha2": "MY",
        "iso_numeric": 458,
        "currency_code": "MYR",
        "nationality": "Malaysian",
        "flag": "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OTdFNEQ1NzE3ODIxMUUyQTcxNDlDNEFCRkNENzc2NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OTdFNEQ1ODE3ODIxMUUyQTcxNDlDNEFCRkNENzc2NiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5N0U0RDU1MTc4MjExRTJBNzE0OUM0QUJGQ0Q3NzY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5N0U0RDU2MTc4MjExRTJBNzE0OUM0QUJGQ0Q3NzY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+WpzGZAAAA1RJREFUeNrElF1oW2UYx38n5zTn5Lvt+pE13XLhoNPNaZirUqc4BTdBBcdAwSlMFId3YxdjoHgnCIpXohcieDFwYAteCFZFhcKYFVfHKhq3Nfsg6dIk2CZtkybnY8/JWTtEbaMIeeDl5YX3ff7P//9/3kdhz2gWiLAaiuPthT5YNiC0DB0mBGX3r4Dt429DixJayfP9ucMk5Vhk/dBkDaydfBZUgzC7mYf3j/PC41+RySa4cCnJmfQOSgtdUkRdwFXvriYFOYr3tlxG6QyQOD1GTDcxmqnXB66sMW7owrSfd06+xfEXR3n/1DNMnr+HuapOh18AFRvqOnpkgYalYdcCYIgSjqhQX0HRQkQOPo1fsvpbYHxb4twgrz3/IcePjXLgyBuMnzoCW6+CXqezN8/Ijinu7JtlXlS5kE1yrRinVvd7zHt6sCtzpEM6SbNOUVkfWBGPy03GKwY+8c/6/Am++3Enj748BtunhaRKv17l/rt/5s0nT5O6N0P64gDvffkU354b5nKpF9sFXrIIb1KZeXuQLt3GRG2R8XKIgaFfoBc+ndwLAZHQ50rrJxRuMLItTWp3BsTaoVSOAzemODu1Rwq71WyOg6IoqLEYPkPBh69FYK3B4lK4mTgZK4jfHZ6nmsV8OcaVolS0JPc20dwz+T6KlRiolve+qwt7Kc/MzqFmVxdoVWq38hsJfvjgWYZFTmVkQpKKUX15DEslLt6+8tDXPLj9N9K5BB9PPMavV7ZRNqVAVaReaBCJG1z/7BGiQdUVoEVgt7lKPXR3Fyl9cYjpmTj7jn5EMS9M++cIR+expQAVm55IhcJilFrNEC8VrzHFmXAnXDwRoNtv0djAYwEe84BxvMqlWwe3/M4nr79Lh1Zl/OxeJi9tYfraHczO9XtDxFGb1jStaA4cAVfDBBsFJtKvstVapLQh8ANnymv/2E3ieuYCLMs3ue8nEvEC2esyY/Kbb/u5etddqwPkD/nngwEq3wwTZuNQTvTuL/9pZN5KaonnC9LplqkSDlYxhKniMvsn72om/qjO0Zd2o8kE8bG+yYqzb+ivwP8l3EY0bWYyFWzb2Zix4zj/D/C/DC13+DnaEZqZy7UFuH1SZ3bd1R6p9VQq0i6ps+2Q+qYAAwAlKDesr1W8UQAAAABJRU5ErkJggg==",
        "iso_alpha3": "MYS",
        "country_name": "Malaysia",
        "currency_name": "Ringgit",
        "currency_symbol": "RM",
        "dial_code": "+60",
        "is_active": true
      }

    }
  },
  computed: {
    delivery_method_error () {
      if (this.transaction_details.details.delivery_method !== "") {
        return false
      }
      return true
    },
    disableNextBtn () {

      if (this.transaction_details.details.source_amount > this.transaction_details.details.service_charge && this.transaction_details.details.delivery_method !== "") {
        // this.delivery_method_error = false
        return false
      }
      return true
    },
    convertableAmount () {

      if (this.transaction_details.details.source_amount > this.transaction_details.details.service_charge) {
        let convertable_amount = (parseInt(this.transaction_details.details.source_amount) - parseInt(this.transaction_details.details.service_charge))
        this.getConvertedAmount(convertable_amount)
        return convertable_amount;
      } else {
        return 0
      }
    },
    transaction_details: {
      get () {
        return this.txnDetails;
      },
      set (transaction_details) {
        this.$emit("input", transaction_details)
      }
    },
    sourceFilterByTerm () {
      return this.countriesList.filter(countryitem => {
        return countryitem.country_name.toLowerCase().includes(this.sourceSearchTerm);
      });
    },
    targetFilterByTerm () {
      return this.countriesList.filter(countryitem => {
        return countryitem.country_name.toLowerCase().includes(this.sourceTargetTerm);
      });
    }
  },
  watch: {
    "transaction_details.details.delivery_method" (val) {
      console.log(val)
      this.transaction_details.details.delivery_method = val
    },
    "transaction_details.details.source_amount" (val) {

      let sourceamountInt = parseInt(val)
      console.log(sourceamountInt)
      if (sourceamountInt > this.transaction_details.details.service_charge) {
        this.transaction_details.details.source_amount = sourceamountInt
        this.sourceAmountInputAlert = false
      } else {
        this.transaction_details.details.source_amount = sourceamountInt
        this.transaction_details.details.target_amount = 0
        this.sourceAmountInputAlert = true
      }
    },
    "transaction_details.details.target_amount" (val) {
      let targetamountInt = parseInt(val)
      console.log("targetamountInt")
      console.log("transaction_details", this.transaction_details)
      if (targetamountInt !== null || targetamountInt !== "" || targetamountInt !== 0 || targetamountInt !== "0" || targetamountInt !== undefined) {
        this.targetAmountInputAlert = false
      } else {
        console.log("val", targetamountInt)
        this.targetAmountInputAlert = true
      }
    },
    async "transaction_details.details.source_country" () {
      await this.getServiceCharge()
      await this.getExchangeRate()
      await this.getConvertedAmount(this.convertableAmount)
    },
    async "transaction_details.details.target_country" () {
      await this.getServiceCharge()
      await this.getExchangeRate()
      await this.getConvertedAmount(this.convertableAmount)
    }
  },
  methods: {
    targetCountryButton () {
      this.customTargetDropdownBox = !this.customTargetDropdownBox
      this.sourceTargetTerm = ""
    },
    sourceCountryButton () {
      this.customSourceDropdownBox = !this.customSourceDropdownBox
      this.sourceSearchTerm = ""
    },
    selectTargetOption (val) {
      this.selectedTargetCode = val
      this.customTargetDropdownBox = false
      console.log(val)
      this.transaction_details.details.target_country = val.currency_code
      this.getExchangeRate()
    },
    selectSourceOption (val) {
      this.selectedSourceCode = val
      this.customSourceDropdownBox = false
      console.log(val)
      this.transaction_details.details.source_country = val.currency_code
      this.getExchangeRate()
    },
    clearInput () {
      this.sourceSearchTerm = ""
    },
    buttonClickHandler () {
      if (this.transaction_details.details.source_country !== "" && this.transaction_details.details.target_country !== "" && this.transaction_details.details.source_amount !== "" && this.transaction_details.details.target_amount !== "") {
        this.$emit('my-event')
      } else {
        this.$bvToast.toast('Required All fields', {
          variant: 'danger',
          solid: true
        })
      }
    },
    getExchangeRate () {
      axios
        .get(`${constants.SERVER_API}/exchangerates/rates/${this.transaction_details.details.source_country}/${this.transaction_details.details.target_country}`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          console.log('exchange rate', response)
          this.transaction_details.details.exchangerate = response.data.data[0].exchange_rate
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getConvertedAmount (convertableAmount) {
      // exchangerates/convert/MYR/INR?convert_quantity=100'
      console.log("convertableAmount", convertableAmount)
      console.log("ourFee", this.transaction_details.details.service_charge)
      if (convertableAmount > parseInt(this.transaction_details.details.service_charge)) {
        axios
          .get(`${constants.SERVER_API}/exchangerates/convert/${this.transaction_details.details.source_country}/${this.transaction_details.details.target_country}?convert_quantity=${convertableAmount}`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
            },
          })
          .then((response) => {
            console.log('conver amount', response)
            this.transaction_details.details.target_amount = response.data.data[0].total_convert_amount

          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.convertableAmount = 0
      }
    },
    getServiceCharge () { //http://3.111.140.40:8000/api/v1/service_charge/get-service-charge/country/INR
      console.log('called')
      axios
        .get(`${constants.SERVER_API}/service_charge/get-service-charge/country/${this.transaction_details.details.source_country}`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          console.log('service charge by country', response)
          this.transaction_details.details.service_charge = response.data.data[0].service_charge
          this.transaction_details.details.service_charge_CC = response.data.data[0].country
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_all_country_data () {
      axios
        .get(`${constants.SERVER_API}/exchangerates/get-all_country_data`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          this.countriesList = response.data
          console.log('countries', this.countriesList)

        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  async created () {
    await this.get_all_country_data()
    await this.getExchangeRate()
    await this.getServiceCharge()
    if (this.transaction_details.details.source_amount !== null || this.transaction_details.details.source_amount !== "" && this.transaction_details.details.target_amount !== null || this.transaction_details.details.target_amount !== "") {
      let stored_transaction_details = JSON.parse(localStorage.getItem('transactionDetails'))
      this.transaction_details.details.source_amount = stored_transaction_details.details.source_amount
      this.transaction_details.details.source_country = stored_transaction_details.details.source_country
      this.transaction_details.details.target_country = stored_transaction_details.details.target_country
    } else {
      this.transaction_details.details.source_amount = 0
      this.transaction_details.details.target_amount = 0
    }


    // this.getExchangeRate()


    // document.onclick = function (e) {
    //   console.log(e)
    //   if (e.target.nodeName !== "BUTTON") {
    //     document.getElementById('sourceToHide').style.display = 'none';
    //     document.getElementById('targetToHide').style.display = 'none';
    //   }

    // };
  }
}
</script>

<style lang="scss" scoped>
.list:hover {
  background: rgb(75, 53, 137);
  cursor: pointer;
  color: #fff;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.listbox::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.listbox {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.customSelect {
  padding: 10px;
  border-radius: 5px;
  /* margin-bottom: 6px; */
  height: 400px;
  width: 400px;
  /* z-index: 90000000000000; */
  background: rgb(204, 204, 204);
  z-index: 9;
  position: absolute;
  right: 0;
  top: 1p;
  margin-top: 10px;
}
@import "@/global.scss";
.operation-padding {
  padding-top: 4px;
}
.converted {
  color: $txt;
  font-weight: 600;
}
.logo_img {
  height: 120px;
}
h4 {
  color: $txt;
  text-align: center;
}
::v-deep .btn-primary {
  background-color: $txt !important;
  border-color: $txt !important;
}
.btn-light {
  font-weight: bold;
  color: $dimgrey;
  background: $white;
  margin: 0 5px;
  &:not(:disabled) {
    &:not(.disabled).active {
      color: $secondary;
    }
    &:not(.disabled) {
      &:active {
        color: $secondary;
      }
    }
  }
  &:hover {
    border: 2px solid rgb(75, 53, 137) $txt !important;
    color: $dimgrey;
    background: $white;
  }
}
.form-group {
  margin-bottom: 0 !important;
}
::v-deep th {
  color: $txt !important;
  font-size: 14px;
  font-weight: 600;
}
.operations {
  height: 20px;
  width: 20px;
  position: absolute;
  border-radius: 10px;
  background: #d3d3d3;
  text-align: center;
  font-size: 20px;
  margin-left: -15px;
  line-height: 15px;
  bottom: 15px;
}
.list-group-flush {
  border-left: 2px solid rgb(75, 53, 137) $txt;
  margin-left: 25px;
}
::v-deep .btn-light {
  border: 2px solid rgb(75, 53, 137) #d3d3d3 !important;
}
::v-deep ul {
  list-style-type: none !important;
}
::v-deep label {
  color: $lightslategrey !important;
  margin-bottom: 0 !important;
}
li {
  padding: 7px;
}
.select-height {
  height: 100%;
}
</style>
