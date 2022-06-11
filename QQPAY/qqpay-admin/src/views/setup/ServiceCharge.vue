<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <!-- <b-row>
      <b-col cols="12">
        <div class="float-right mt-3">
          <b-button-group size="md">
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row> -->
    <b-row>
      <b-col cols="6">
        <div>
          <b-input-group size="md" class="mt-3">
            <b-form-input
              placeholder="Search for user"
              v-model="defaultForm.search_user"
              class="converted"
            ></b-form-input>
            <template #append>
              <b-dropdown
                :text="defaultForm.filter_option"
                right
                variant="light"
              >
                <b-dropdown-item
                  v-for="option in filter_options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-input-group>
        </div>
      </b-col>
      <b-col cols="1">
        <div class="mt-3">
          <b-button class="float-right" variant="primary" @click="onSearch"
            >Search</b-button
          >
        </div>
      </b-col>
      <b-col cols="3">
        <div class="float-right mt-3">
          <b-button size="md" variant="outline-light" v-b-modal.scs-country-wise
            >Add Service Charge</b-button
          >
        </div>
      </b-col>
      <b-col cols="2">
        <div class="float-right mt-3">
          <b-button-group size="md">
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert v-model="isError" variant="danger" dismissible>
          {{ this.error }}
        </b-alert>
      </b-col>
    </b-row>
    <b-table
      :items="items"
      :fields="fields"
      responsive
      class="align-middle mt-4"
    >
      <template #cell(id)="row">
        {{ row.index + 1 }}
      </template>
      <template #cell(remarks)="row" size="sm">
        <div class="action-div">
          <b-icon
            v-if="row.item.remarks != null && row.item.remarks != ''"
            style="color: green"
            icon="square-fill"
          ></b-icon>
          <b-icon
            v-if="row.item.remarks == null || row.item.remarks == ''"
            icon="square"
          ></b-icon>
        </div>
      </template>
    </b-table>
    <b-modal
      id="scs-country-wise"
      ref="modal"
      title="Service Charge Setup"
      size="md"
      variant="primary"
      hide-footer
    >
      <b-card no-body class="my-custom-class">
        <b-tabs pills card variant="primary">
          <b-tab title="Country Wise" active style="background-color: #ff6b00"
            ><b-card-text>
              <b-card>
                <b-form>
                  <div class="row">
                    <div class="col">
                      <v-select
                        :options="paymentModeList"
                        label="value"
                        v-model="countryWiseForm.payment_mode"
                        :reduce="(item) => item.id"
                        placeholder="Available options here"
                        required
                        :clearable="false"
                        :class="{
                          'is-invalid': $v.countryWiseForm.payment_mode.$error,
                        }"
                        aria-describedby="payment_mode-live-feedback"
                      >
                      </v-select>
                      <b-form-invalid-feedback id="payment_mode-live-feedback">
                        This is a required field.
                      </b-form-invalid-feedback>
                    </div>
                    <b-col cols="12" class="mt-3">
                      <v-select
                        :options="countryList"
                        label="country_name"
                        v-model="countryWiseForm.country"
                        :reduce="(item) => item.country_name"
                        placeholder="Available options here"
                        required
                        :clearable="false"
                        :class="{
                          'is-invalid': $v.countryWiseForm.country.$error,
                        }"
                        aria-describedby="country-live-feedback"
                      >
                      </v-select>
                      <b-form-invalid-feedback id="country-live-feedback">
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="6" class="mt-3">
                      <v-select
                        :options="serviceChargeTypeList"
                        label="value"
                        v-model="countryWiseForm.service_charge_type"
                        :reduce="(item) => item.id"
                        placeholder="Available options here"
                        required
                        :clearable="false"
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.service_charge_type.$error,
                        }"
                        aria-describedby="service_charge_type-live-feedback"
                      >
                      </v-select>
                      <b-form-invalid-feedback
                        id="service_charge_type-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="6">
                      <b-form-input
                        type="number"
                        id="service_charge"
                        name="service_charge"
                        class="mt-3"
                        placeholder="Service Charge"
                        v-model="countryWiseForm.service_charge"
                        size="md"
                        @keypress="
                          onlyForDecimal($event, countryWiseForm.service_charge)
                        "
                        required
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.service_charge.$error,
                        }"
                        aria-describedby="service_charge-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="service_charge-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <small class="ml-3 mt-3"
                      >if <strong>percentage</strong> selected then Upper Limit
                      will be disabled.</small
                    >
                    <b-col cols="12">
                      <b-form-input
                        type="number"
                        id="upper_limit"
                        name="upper_limit"
                        class="mt-3"
                        placeholder="Upper Limit"
                        v-model="countryWiseForm.upper_limit"
                        size="md"
                        @keypress="
                          onlyForDecimal($event, countryWiseForm.upper_limit)
                        "
                        required
                        :class="{
                          'is-invalid': $v.countryWiseForm.upper_limit.$error,
                        }"
                        aria-describedby="upper_limit-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback id="upper_limit-live-feedback">
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="6">
                      <b-form-input
                        type="number"
                        id="qqpay_commission"
                        name="qqpay_commission"
                        class="mt-3"
                        placeholder="Total Commission"
                        v-model="countryWiseForm.qqpay_commission"
                        size="md"
                        @keypress="
                          onlyForDecimal(
                            $event,
                            countryWiseForm.qqpay_commission
                          )
                        "
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.qqpay_commission.$error,
                        }"
                        aria-describedby="qqpay_commission-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="qqpay_commission-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="6">
                      <b-form-input
                        type="number"
                        id="payout_partner_commission"
                        name="payout_partner_commission"
                        class="mt-3"
                        placeholder="Pay Commission"
                        v-model="countryWiseForm.payout_partner_commission"
                        size="md"
                        @keypress="
                          onlyForDecimal(
                            $event,
                            countryWiseForm.payout_partner_commission
                          )
                        "
                        required
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.payout_partner_commission.$error,
                        }"
                        aria-describedby="payout_partner_commission-live-feedback"
                      ></b-form-input>
                      <b-form-invalid-feedback
                        id="payout_partner_commission-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="12">
                      <b-form-textarea
                        id="remarks"
                        class="mt-3"
                        placeholder="Remarks"
                        v-model="countryWiseForm.remarks"
                        size="sm"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </b-col>
                  </div>
                  <b-row class="float-right">
                    <b-button size="lg" variant="primary" @click="manage()">
                      Add Service Charge Setup
                    </b-button>
                  </b-row>
                </b-form>
              </b-card>
            </b-card-text></b-tab
          >
          <b-tab title="Payout Partner Wise"
            ><b-card-text>
              <b-card>
                <b-form>
                  <div class="row">
                    <b-col cols="12">
                      <v-select
                        :options="paymentModeList"
                        label="value"
                        v-model="countryWiseForm.payment_mode"
                        :reduce="(item) => item.id"
                        placeholder="Available options here"
                        required
                        :clearable="false"
                        :class="{
                          'is-invalid': $v.countryWiseForm.payment_mode.$error,
                        }"
                        aria-describedby="payment_mode-live-feedback"
                      >
                      </v-select>
                      <b-form-invalid-feedback id="payment_mode-live-feedback">
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="6"  class="mt-3">
                      <v-select
                        :options="payoutPartnerList"
                        label="contact_name1"
                        v-model="countryWiseForm.payment_partner"
                        :reduce="(item) => item.agent_id"
                        placeholder="Available options here"
                        required
                        :clearable="false"
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.payment_partner.$error,
                        }"
                        aria-describedby="payment_partner-live-feedback"
                      >
                      </v-select>
                      <b-form-invalid-feedback
                        id="payment_partner-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                      <!-- <b-dropdown
                        block
                        id="input-relation"
                        :text="countryWiseDefaultForm.payout_partner"
                        variant="light"
                        label-size="sm"
                      >
                        <b-dropdown-item
                          v-for="option in payoutPartnerList"
                          :key="option.value"
                          :value="option.value"
                          size="sm"
                        >
                          {{ option.text }}
                        </b-dropdown-item>
                      </b-dropdown> -->
                    </b-col>
                    <b-col cols="6">
                      <b-form-input
                        class="mt-3"
                        placeholder="Receive Country"
                        v-model="countryWiseDefaultForm.receive_country"
                        size="sm"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="6"  class="mt-3">
                      <v-select
                        :options="serviceChargeTypeList"
                        label="value"
                        v-model="countryWiseForm.service_charge_type"
                        :reduce="(item) => item.id"
                        placeholder="Available options here"
                        required
                        :clearable="false"
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.service_charge_type.$error,
                        }"
                        aria-describedby="service_charge_type-live-feedback"
                      >
                      </v-select>
                      <b-form-invalid-feedback
                        id="service_charge_type-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="6">
                      <b-form-input
                        type="number"
                        id="service_charge"
                        name="service_charge"
                        class="mt-3"
                        placeholder="Service Charge"
                        v-model="countryWiseForm.service_charge"
                        size="md"
                        @keypress="
                          onlyForDecimal($event, countryWiseForm.service_charge)
                        "
                        required
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.service_charge.$error,
                        }"
                        aria-describedby="service_charge-live-feedback"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        id="service_charge-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <small class="ml-3 mt-3"
                      >if <strong>percentage</strong> selected then Upper Limit
                      will be disabled.</small
                    >
                    <b-col cols="12">
                      <b-form-input
                        type="number"
                        id="upper_limit"
                        name="upper_limit"
                        class="mt-3"
                        placeholder="Upper Limit"
                        v-model="countryWiseForm.upper_limit"
                        size="md"
                        @keypress="
                          onlyForDecimal($event, countryWiseForm.upper_limit)
                        "
                        required
                        :class="{
                          'is-invalid': $v.countryWiseForm.upper_limit.$error,
                        }"
                        aria-describedby="upper_limit-live-feedback"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback id="upper_limit-live-feedback">
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="6">
                      <b-form-input
                        type="number"
                        id="qqpay_commission"
                        name="qqpay_commission"
                        class="mt-3"
                        placeholder="Total Commission"
                        v-model="countryWiseForm.qqpay_commission"
                        size="md"
                        @keypress="
                          onlyForDecimal(
                            $event,
                            countryWiseForm.qqpay_commission
                          )
                        "
                        required
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.qqpay_commission.$error,
                        }"
                        aria-describedby="qqpay_commission-live-feedback"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        id="qqpay_commission-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="6">
                      <b-form-input
                        type="number"
                        id="payout_partner_commission"
                        name="payout_partner_commission"
                        class="mt-3"
                        placeholder="Pay Commission"
                        v-model="countryWiseForm.payout_partner_commission"
                        size="md"
                        @keypress="
                          onlyForDecimal(
                            $event,
                            countryWiseForm.payout_partner_commission
                          )
                        "
                        required
                        :class="{
                          'is-invalid':
                            $v.countryWiseForm.payout_partner_commission.$error,
                        }"
                        aria-describedby="payout_partner_commission-live-feedback"
                      >
                      </b-form-input>
                      <b-form-invalid-feedback
                        id="payout_partner_commission-live-feedback"
                      >
                        This is a required field.
                      </b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="12">
                      <b-form-textarea
                        id="remarks"
                        class="mt-3"
                        placeholder="Remarks"
                        v-model="countryWiseForm.remarks"
                        size="sm"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </b-col>
                  </div>
                  <b-row class="float-right">
                    <b-button size="lg" variant="primary" @click="manage()">
                      Add Service Charge Setup
                    </b-button>
                  </b-row>
                </b-form>
              </b-card>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
      <template #modal-footer="{ manage }">
        <b-button size="lg" variant="primary" @click="manage()">
          Add Service Charge Setup
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
//import TreasuryFlow from "@/components/flow/TreasuryFlow.vue";
import { required, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import { getAll } from "@/api/country";
import { getList } from "@/api/partnerDetails";
import {
  getServiceChargeType,
  getPaymentMode,
  getAll as list,
  getById,
  save,
  update,
} from "@/api/serviceCharge";
export default {
  components: {},
  mixins: [validationMixin],
  data() {
    return {
      menu_hierarchy: [
        {
          text: "Setup",
          active: true,
        },
        {
          text: "Service Charge",
          active: true,
        },
      ],
      isError: false,
      error: null,
      defaultForm: {
        country_name: null,
        search_user: null,
        filter_option: null,
      },
      form: null,
      countryList: [],
      serviceChargeTypeList: [],
      payoutPartnerList: [],
      paymentModeList: [],
      items: [],
      filter: null,
      countryWiseDefaultForm: {
        id: 0,
        payment_mode: null,
        payment_partner: null,
        country: null,
        service_charge_type: null,
        service_charge: null,
        upper_limit: null,
        qqpay_commission: null,
        payout_partner_commission: null,
        remarks: null,
      },
      countryWiseForm: null,
      // scs_payout_partner_wise: {
      //   id: null,
      //   charge_type: "Cash Payment",
      //   payout_partner: "ICICI",
      //   receive_country: "",
      //   service_charge_by: ,
      //   service_charge: "",
      //   upper_limit: "",
      //   total_commission: "",
      //   pay_commission: "",
      //   remarks: "",
      // },
      fields: [
        { key: "id", label: "S/N" },
        { key: "country", label: "Country" },
        { key: "payout_partner", label: "Payout Partner" },
        { key: "service_charge_type", label: "Charge Type" },
        { key: "upper_limit", label: "Upper Limit MYR" },
        { key: "created_by", label: "Service Charge By" },
        { key: "service_charge", label: "Service Charge MYR" },
        { key: "payout_partner_commission", label: "Pay Commission" },
        { key: "qqpay_commission", label: "Receive Commission" },
        { key: "remarks", label: "Remarks" },
      ],
      filter_options: [
        {
          text: "Filter",
          value: "Filter",
        },
      ],
      chargeList: [
        {
          text: "Final",
          value: "Final",
        },
        {
          text: "Half",
          value: "Half",
        },
      ],
    };
  },
  validations: {
    countryWiseForm: {
      payment_mode: {
        required,
      },
      payment_partner: {
        required,
      },
      country: {
        required,
      },
      service_charge_type: {
        required,
      },
      service_charge: {
        required,
        minLength: minLength(1),
      },
      upper_limit: {
        required,
        minLength: minLength(1),
      },
      qqpay_commission: {
        required,
        minLength: minLength(1),
      },
      payout_partner_commission: {
        required,
        minLength: minLength(1),
      },
    },
  },
  methods: {
    onlyForDecimal($event, val) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || val.toString().indexOf(".") != -1)
      ) {
        $event.preventDefault();
      }

      if (
        val != null &&
        val.toString().indexOf(".") != -1 &&
        val.toString().split(".")[1].length > 1
      ) {
        $event.preventDefault();
      }
    },
    resetForm() {
      this.countryWiseForm = Object.assign({}, this.countryWiseDefaultForm);
      this.$v.$reset();
      this.isError = false;
      this.error = null;
      this.onSearch();
    },
    onSearch() {
      list().then((res) => {
        this.items = res.data.data;
      });
    },
    edit(item) {
      if (item.id > 0) {
        getById(item.id)
          .then((res) => {
            this.countryWiseForm = Object.assign({}, res.data);
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          });
      }
    },
    manage() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (this.countryWiseForm.id > 0) {
        update(this.countryWiseForm)
          .then((res) => {
            console.log(res);
            this.resetForm();
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      } else {
        save(this.countryWiseForm)
          .then((res) => {
            console.log(res);
            this.resetForm();
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      }
    },
  },
  async created() {
    this.resetForm();
    this.onSearch();
    await Promise.all([
      getAll().then((res) => {
        this.countryList = res.data;
      }),

      getServiceChargeType().then((res) => {
        this.serviceChargeTypeList = res.data;
      }),

      getPaymentMode().then((res) => {
        this.paymentModeList = res.data;
      }),

      getList().then((res) => {
        this.payoutPartnerList = res.data.data;
      }),
    ]);
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.menu-sec {
  margin-top: 0.5rem;
}
.card-body {
  padding: 0 !important;
}
.card {
  margin-bottom: 1rem !important;
}
.btn-outline-light {
  color: $txt !important;
  border-color: $primary !important;
}
.btn-secondary {
  background: $txt !important;
}
.row {
  margin: 5px;
}
.expand-btn {
  color: $primary !important;
  border: none !important;
  background: $white !important;
}
.action-btn {
  background: $primary;
  border-radius: 4px;
  color: $white;
  border: none !important;
}
.action-div {
  text-align: end;
}
::v-deep .table {
  td {
    vertical-align: middle !important;
  }
}
.title-lbl {
  width: 100%;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  color: $txt;
  border-bottom: 1px solid $txt;
}
.form-group {
  margin-bottom: 0;
}
.list-group-item {
  padding: 0;
}

::v-deep th {
  color: $txt !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep td {
  font-size: 12px !important;
}
::v-deep .col-form-label {
  color: $dimgrey;
}
.modal-footer {
  justify-content: center !important;
}
#scs-country-wise___BV_modal_footer_ {
  justify-content: center !important;
}
.my-custom-class .card-title {
  background-color: #ff6b00;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #ff6b00 !important;
}
.nav-pills .nav-link.active {
  background-color: #ff6b00 !important;
}
</style>
