<template>
  <div>
    <h4>{{ $t("fundTransfers.isThisPersonalTransaction") }}</h4>
    <b-button-group size="lg">
      <b-button
        pressed.sync="false"
        variant="light"
        size="lg"
        class="px-5 py-3"
        @click="myAccount"
      >
        <b-icon
          icon="person"
          style="width: 80px; height: 80px; color: #b4b4b4"
        ></b-icon>
        <br />
        {{ $t("fundTransfers.myAccount") }}
        <br />
        <small>{{ $t("fundTransfers.payingFromOwnAccount") }}.</small>
      </b-button>
      <b-button
        pressed.sync="false"
        variant="light"
        size="lg"
        class="px-5 py-3"
        @click="onBehalf"
      >
        <b-icon
          icon="person-bounding-box"
          style="width: 80px; height: 80px; color: #b4b4b4"
        ></b-icon>
        <br />
        {{ $t("fundTransfers.onBehalf") }}
        <br />
        <small>{{ $t("fundTransfers.payingOnBehalfSomeone") }}</small>
      </b-button>
    </b-button-group>
    <b-collapse v-model="on_behalf">
      <b-card header="Personal Details" header-tag="header" class="mt-3">
        <b-row>
          <b-col>
            <b-form-group
              label="Full legal first and middle names"
              label-for="input-type"
              class="mt-2"
            >
              <b-form-input
                id="input-name"
                v-model="on_behalf_details.first_name"
              ></b-form-input>
              <formError
                v-show="f_m_name_error"
                error_msg="Please Enter FirstName And MiddleName"
              />
            </b-form-group>
            <b-form-group
              label="Date of birth"
              label-for="input-type"
              class="mt-2"
            >
              <b-form-datepicker
                id="example-datepicker"
                v-model="on_behalf_details.date_of_birth"
                class="mb-2"
              ></b-form-datepicker>
              <formError v-show="dob_error" error_msg="Please Select DOB" />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              label="Full legal last name(s)"
              label-for="input-type"
              class="mt-2"
            >
              <b-form-input
                id="input-name"
                v-model="on_behalf_details.last_name"
              ></b-form-input>
              <formError
                v-show="l_name_error"
                error_msg="Please Enter LastName"
              />
            </b-form-group>
            <b-form-group label="Phone" label-for="input-type" class="mt-2">
              <b-form-input
                id="input-name"
                type="number"
                v-model="on_behalf_details.phone"
              ></b-form-input>
              <formError
                v-show="phone_error"
                error_msg="Please Enter Phone Number"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card header="Address" header-tag="header" class="mt-3">
        <b-row>
          <b-col>
            <b-form-group label="Country" label-for="input-type" class="mt-2">
              <b-form-input
                id="input-name"
                v-model="on_behalf_details.country"
              ></b-form-input>
              <formError
                v-show="country_error"
                error_msg="Please Enter Country"
              />
            </b-form-group>
            <b-form-group label="Address" label-for="input-type" class="mt-2">
              <b-form-input
                id="input-name"
                v-model="on_behalf_details.address"
              ></b-form-input>
              <formError
                v-show="address_error"
                error_msg="Please Enter Address"
              />
            </b-form-group>
            <b-form-group
              label="Occupation"
              label-for="input-type"
              class="mt-2"
            >
              <b-form-select
                v-model="on_behalf_details.occupation"
                :options="occupationsList"
                class="mb-3"
                value-field="value"
                text-field="value"
                disabled-field="notEnabled"
                ><b-form-select-option :value="null"
                  >select occupation</b-form-select-option
                ></b-form-select
              >
              <formError
                v-show="occupation_error"
                error_msg="Please Select Occupation"
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="City" label-for="input-type" class="mt-2">
              <b-form-input
                id="input-name"
                v-model="on_behalf_details.city"
              ></b-form-input>
              <formError v-show="city_error" error_msg="Please Enter City" />
            </b-form-group>
            <b-form-group
              label="Postal code"
              label-for="input-type"
              class="mt-2"
            >
              <b-form-input
                id="input-name"
                v-model="on_behalf_details.postal_code"
              ></b-form-input>
              <formError
                v-show="postal_code_error"
                error_msg="Please Enter Postal Code"
              />
            </b-form-group>
            <b-form-group
              label="Nationality"
              label-for="input-type"
              class="mt-2"
            >
              <b-form-select
                v-model="on_behalf_details.nationality_cd"
                :options="nationalityOptions"
                class="mb-3"
                value-field="iso_alpha3"
                text-field="country_name"
                disabled-field="notEnabled"
                ><b-form-select-option :value="null"
                  >select nationality</b-form-select-option
                ></b-form-select
              >
              <formError
                v-show="nationality_error"
                error_msg="Please Select Nationality"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-button
        class="float-left mt-5 px-5"
        variant="outline-secondary"
        @click="buttonBackClickHandler"
        >Back</b-button
      >
    </b-collapse>
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
import formError from "../formError.vue"
import axios from "axios";
export default {
  components: {
    formError
  },
  data () {
    return {
      occupationsList: null,
      on_behalf: null,
      on_behalf_details: {
        on_behalf: null,
        first_name: null,
        last_name: null,
        date_of_birth: null,
        phone: null,
        country: null,
        city: null,
        address: null,
        postal_code: null,
        occupation: null,
        nationality_cd: null
      },
      nationalityOptions: null,
      f_m_name_error: true,
      l_name_error: true,
      dob_error: true,
      phone_error: true,
      country_error: true,
      address_error: true,
      occupation_error: true,
      city_error: true,
      postal_code_error: true,
      nationality_error: true,
    }
  },
  watch: {
    "on_behalf_details.first_name" (val) {
      console.log("on_behalf_details.first_name", this.on_behalf_details)
      if (val.length > 0) {
        this.f_m_name_error = false
      } else {
        this.f_m_name_error = true
      }
    },
    "on_behalf_details.last_name" (val) {
      console.log("on_behalf_details.first_name", val)
      if (val.length > 0) {
        this.l_name_error = false
      } else {
        this.l_name_error = true
      }
    },
    "on_behalf_details.date_of_birth" (val) {
      if (val.length > 0) {
        this.dob_error = false
      } else {
        this.dob_error = true
      }
    },
    "on_behalf_details.phone" (val) {
      if (val.length > 0) {
        this.phone_error = false
      } else {
        this.phone_error = true
      }
    },
    "on_behalf_details.country" (val) {
      if (val.length > 0) {
        this.country_error = false
      } else {
        this.country_error = true
      }
    },
    "on_behalf_details.address" (val) {
      if (val.length > 0) {
        this.address_error = false
      } else {
        this.address_error = true
      }

    },
    "on_behalf_details.occupation" (val) {

      if (val.length > 0) {
        this.occupation_error = false
      } else {
        this.occupation_error = true
      }

    },
    "on_behalf_details.city" (val) {

      if (val.length > 0) {
        this.city_error = false
      } else {
        this.city_error = true
      }

    },
    "on_behalf_details.postal_code" (val) {

      if (val.length > 0) {
        this.postal_code_error = false
      } else {
        this.postal_code_error = true
      }

    },
    "on_behalf_details.nationality_cd" (val) {
      console.log("nationality", val)
      if (val.length > 0) {
        this.nationality_error = false
      } else {
        this.nationality_error = true
      }
    }
  },
  computed: {

    disableNextBtn () {

      if (this.on_behalf === false) {
        return false
      } else if (this.on_behalf === true) {
        if (this.on_behalf_details.first_name !== null && this.on_behalf_details.last_name !== null && this.on_behalf_details.date_of_birth !== null && this.on_behalf_details.phone !== null && this.on_behalf_details.country !== null && this.on_behalf_details.city !== null && this.on_behalf_details.address !== null && this.on_behalf_details.postal_code !== null && this.on_behalf_details.occupation !== null && this.on_behalf_details.nationality_cd !== null) {
          return false
        }

      }
      return true

    },
  },
  methods: {
    getOccupationsList () {
      axios
        .get(`${constants.SERVER_API}/sub_category/occupations`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          console.log('occupations ', response)
          this.occupationsList = response.data.data[0]
        })
        .catch((error) => {
          console.log(error);
        });
    },
    buttonClickHandler () {

      if (this.on_behalf === true) {
        if (this.on_behalf_details.first_name !== null && this.on_behalf_details.last_name !== null && this.on_behalf_details.date_of_birth !== null && this.on_behalf_details.phone !== null && this.on_behalf_details.country !== null && this.on_behalf_details.city !== null && this.on_behalf_details.address !== null && this.on_behalf_details.postal_code !== null && this.on_behalf_details.occupation !== null && this.on_behalf_details.nationality_cd !== null) {
          this.submitOnBehalfDetails(this.on_behalf_details)

        } else {
          this.$bvToast.toast('Required All fields', {
            title: 'Alert',
            variant: 'danger',
            solid: true
          })
        }
      } else {
        this.$emit('my-event')
      }

    },
    submitOnBehalfDetails (data) {

      axios
        .post(`${constants.SERVER_API}/on_behalf/register/`, data, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          console.log('conver amount', response)

          console.log("on_behalf_details log", this.on_behalf_details)
          localStorage.setItem('on_behalf_id', JSON.stringify(response.data.data[0].id))
          localStorage.setItem('on_behalf_details', JSON.stringify(this.on_behalf_details))
          this.$emit('my-event')

        })
        .catch((error) => {
          console.log(error);
        });
    },
    nationalityList () {
      axios
        .get(`${constants.SERVER_API}/exchangerates/get-all_country_data`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          this.nationalityOptions = response.data

        })
        .catch((error) => {
          console.log(error);
        });

    },
    buttonBackClickHandler () {
      this.$emit('my-event-click-back')

    },
    onBehalf () {
      this.on_behalf = true;
      console.log("on_behalf_details", this.on_behalf_details)
      this.on_behalf_details.on_behalf = this.on_behalf
      localStorage.setItem('on_behalf_details', JSON.stringify(this.on_behalf_details))
      // this.$store.commit('Transaction/is_self', { is_self: this.on_behalf })
      // console.log(this.$store.getters['Transaction/transaction_details'])
    },
    myAccount () {
      this.on_behalf = false;
      localStorage.setItem('on_behalf_id', null)
      // this.$store.commit('Transaction/is_self', { is_self: this.on_behalf })
      this.on_behalf_details.on_behalf = this.on_behalf
      localStorage.setItem('on_behalf_details', JSON.stringify(this.on_behalf_details))
      // console.log(this.$store.getters['Transaction/transaction_details'])
    },
  },
  async created () {
    let stored_on_behalf_details = JSON.parse(localStorage.getItem('on_behalf_details'))
    console.log("stored_on_behalf_details", stored_on_behalf_details)

    if (stored_on_behalf_details !== null) {
      this.on_behalf_details = stored_on_behalf_details
    }

    this.getOccupationsList()
    this.nationalityList()
    console.log("constants.ACCESS_TOKEN", constants.ACCESS_TOKEN)
  }
}
</script>

<style>
</style>