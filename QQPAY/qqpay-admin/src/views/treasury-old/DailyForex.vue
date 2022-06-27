<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col>
        <div>
          <span class="mr-2">Daily Forex of</span>
          <v-select
            :options="countryList"
            label="country_name"
            v-model="type.country"
            :reduce="(item) => item.country_name"
            placeholder="Available options here"
            required
            :clearable="false"
            :class="{
              'is-invalid': $v.type.country.$error,
            }"
            aria-describedby="country-live-feedback"
          >
          </v-select>
          <b-form-invalid-feedback id="country-live-feedback">
            This is a required field.
          </b-form-invalid-feedback>
          <!-- <b-dropdown
            id="input-type"
            :text="defaultForm.country_name"
            variant="light"
          >
            <b-dropdown-item
              v-for="option in country_options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </b-dropdown-item>
          </b-dropdown> -->
        </div>
      </b-col>
      <b-col>
        <div>
          <span>Date</span>
          <b-form-group id="fieldset-1" label-for="example-datepicker">
            <b-form-datepicker
              id="example-datepicker"
              v-model="temp_deal.deal_date"
              size="sm"
            ></b-form-datepicker>
          </b-form-group>
        </div>
      </b-col>
      <b-col>
        <div class="float-right">
          <b-button-group size="sm">
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
    <b-row>
      <b-col cols="10">
        <div>
          <b-form-input
            id="search_user"
            name="search_user"
            class="mt-3"
            placeholder="Service Charge"
            v-model="form.search_user"
            size="md"
            required
            :class="{
              'is-invalid': $v.form.search_user.$error,
            }"
            aria-describedby="search_user-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="search_user-live-feedback">
            This is a required field.
          </b-form-invalid-feedback>
          <!-- <b-input-group size="md" class="mt-3">
            <b-form-input
              placeholder="Search for user"
              v-model="daily_forex.search_user"
              class="converted"
            ></b-form-input>
            <template #append>
              <b-dropdown
                :text="daily_forex.filter_option"
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
          </b-input-group> -->
        </div>
      </b-col>
      <b-col cols="1">
        <div class="mt-3">
          <b-button class="float-right" variant="primary" @click="onSearch"
            >Search</b-button
          >
        </div>
      </b-col>
    </b-row>
    <div>
      <b-tabs
        content-class="mt-3"
        active-nav-item-class="text-warning"
        active-tab-class="text-warning"
      >
        <b-tab title="Selected Countries">
          <b-table
            :items="items"
            :fields="fields"
            responsive
            class="align-middle"
          >
            <template #cell(consumer_margin)="row" size="sm">
              <b-form-input
                id="input-name"
                @blur="onMarginChange(row.item)"
                v-model="row.item.consumer_margin"
              ></b-form-input>
            </template>
            <template #cell(consumer_gain_or_loss)="row" size="sm">
              <b-icon
                v-if="row.item.consumer_gain_or_loss < 1"
                class="text-danger"
                icon="arrow-down-circle-fill"
              ></b-icon>
              {{ row.item.consumer_gain_or_loss }}
            </template>
            <template #cell(business_margin)="row" size="sm">
              <b-form-input
                @blur="onMarginChange(row.item)"
                id="input-name"
                v-model="row.item.business_margin"
              ></b-form-input>
            </template>
            <template #cell(business_gain_or_loss)="row" size="sm">
              <b-icon
                v-if="row.item.business_gain_or_loss < 1"
                class="text-danger"
                icon="arrow-down-circle-fill"
              ></b-icon>
              {{ row.item.business_gain_or_loss }}
            </template>
            <template #cell(actions)="row" size="sm">
              <div class="action-div">
                <!-- <b-button
                  variant="light"
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2 expand-btn"
                >
                  <b-icon icon="clock-history"></b-icon>
                </b-button> -->
                <b-button
                  variant="light"
                  size="sm"
                  title="Tooltip directive content"
                  @click="edit(row.item)"
                  class="mr-2 expand-btn"
                >
                  <b-icon icon="three-dots-vertical"></b-icon>
                </b-button>
              </div>
            </template>
          </b-table>
        </b-tab>
        <b-tab title="Other Countries">
          <b-table
            :items="otherCountriesItems"
            :fields="fields"
            responsive
            class="align-middle"
          >
            <template #cell(consumer_margin)="row" size="sm">
              <b-form-input
                id="input-name"
                @blur="onMarginChange(row.item)"
                v-model="row.item.consumer_margin"
              ></b-form-input>
            </template>
            <template #cell(consumer_gain_or_loss)="row" size="sm">
              <b-icon
                v-if="row.item.consumer_gain_or_loss < 1"
                class="text-danger"
                icon="arrow-down-circle-fill"
              ></b-icon>
              {{ row.item.consumer_gain_or_loss }}
            </template>
            <template #cell(business_margin)="row" size="sm">
              <b-form-input
                @blur="onMarginChange(row.item)"
                id="input-name"
                v-model="row.item.business_margin"
              ></b-form-input>
            </template>
            <template #cell(business_gain_or_loss)="row" size="sm">
              <b-icon
                v-if="row.item.business_gain_or_loss < 1"
                class="text-danger"
                icon="arrow-down-circle-fill"
              ></b-icon>
              {{ row.item.business_gain_or_loss }}
            </template>
            <template #cell(actions)="row" size="sm">
              <div class="action-div">
                <!-- <b-button
                  variant="light"
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2 expand-btn"
                >
                  <b-icon icon="clock-history"></b-icon>
                </b-button> -->
                <b-button
                  variant="light"
                  size="sm"
                  title="Tooltip directive content"
                  @click="edit(row.item)"
                  class="mr-2 expand-btn"
                >
                  <b-icon icon="three-dots-vertical"></b-icon>
                </b-button>
              </div>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import { getAll } from "@/api/country";
import {
  getAll as list,
  getById,
  getPayoutDetailList,
  save,
  update,
} from "@/api/dailyForex";
export default {
  mixins: [validationMixin],
  data() {
    return {
      menu_hierarchy: [
        {
          text: "Treasury",
          active: true,
        },
        {
          text: "Daily Forex",
          active: true,
        },
      ],
      isError: false,
      error: null,
      defaultType: {
        country: null,
      },
      type: null,
      defaultForm: {
        payout_country: null,
        ccy: null,
        qqcost_avg_rate: null,
        lowest_payout_ccy_rate: null,
        payout_partner_cost_rate: null,
        qq_offer_rate: null,
        consumer_margin: null,
        con_is_pluse: null,
        consumers_rate: null,
        consumer_gain_or_loss: null,
        business_margin: null,
        bus_is_pluse: null,
        business_rate: null,
        business_gain_or_loss: null,
      },
      form: null,
      countryList: [],
      items: [],
      otherCountriesItems: [],
      temp_deal: {
        i_o_IRH: "O",
        deal_date: "",
        source_of_funds: "Maybank",
        amount_in_USD: "66,509 USD",
        exchange_rate: "",
        amount_in_MYR: "2,80,003.89 MYR",
        contract_no: "S1341125",
        purchase_date: "02 Nov 21",
        status: "Open",
        created_by: "Deepu",
        break_down: "0",
        edited_by: "",
        comment: "",
      },
      fields: [
        { key: "id", label: "S/N" },
        { key: "payout_country", label: "Payout Countries" },
        { key: "ccy", label: "CCV" },
        { key: "qqcost_avg_rate", label: "QQ Cost Rate (Avg)" },
        { key: "lowest_payout_ccy_rate", label: "Payout CVV (Lowest)" },
        {
          key: "payout_partner_cost_rate",
          label: "Payout Partner Cost Rate",
        },
        { key: "qq_offer_rate", label: "Reuters Rate" },
        { key: "consumer_margin", label: "Margin" },
        { key: "consumers_rate", label: "Consumers Rate" },
        { key: "consumer_gain_or_loss", label: "Gain/Loss" },
        { key: "business_margin", label: "Margin" },
        { key: "business_rate", label: "Business Rate" },
        { key: "business_gain_or_loss", label: "Gain/Loss" },
        { key: "actions", label: "" },
      ],
    };
  },
  validations: {
    type: {
      country: {
        required,
      },
    },
    form: {
      search_user: {
        required,
      },
    },
  },
  methods: {
    resetForm() {
      this.type = Object.assign({}, this.defaultType);
      this.form = Object.assign({}, this.defaultForm);
      this.$v.$reset();
      this.isError = false;
      this.error = null;
      this.onSearch();
    },
    onSearch() {
      list().then((res) => {
        this.items = res.data.data[0];
        this.otherCountriesItems = res.data.data[0];
      });
    },
    onMarginChange(item) {
      //convert to 4 decimal point
      item.consumer_margin = parseFloat(item.consumer_margin).toFixed(4)
      item.business_margin = parseFloat(item.business_margin).toFixed(4)

      //convert to float
      item.consumer_margin = parseFloat(item.consumer_margin)
      item.business_margin = parseFloat(item.business_margin)
      
      if (
        item.consumer_margin < 1.0001 ||
        item.consumer_margin > 1.9999 ||
        item.business_margin < 1.0001 ||
        item.business_margin > 1.9999
      ) {
        this.error = "Please select margin in between 1.0001 and 1.9999";
        this.isError = true;
      } else {

        this.form = Object.assign({}, item);
        this.form.consumers_rate = this.form.qq_offer_rate +  this.form.consumer_margin
        this.form.business_rate = this.form.qq_offer_rate +  this.form.business_margin
        this.form.consumer_gain_or_loss = this.form.consumers_rate +  this.form.payout_partner_cost_rate

        update(this.form, this.form.id)
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
    edit(item) {
      if (item.id > 0) {
        getById(item.id)
          .then((res) => {
            this.form = Object.assign({}, res.data);
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
      if (this.form.id > 0) {
        update(this.form, this.form.id)
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
        save(this.form)
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
      getPayoutDetailList().then((res) => {
        this.serviceChargeTypeList = res.data;
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
.my-tab {
  color: #ff6b00 !important;
}

.nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.tabs a:hover,
.tabs a.active {
  background-color: rgb(231, 8, 8);
}

.nav .nav-tabs .nav-item .nav-link {
  color: #ff6b00 !important;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.tab-title-class {
  color: #ff6b00 !important;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #ff6b00 !important;
}

.a {
  color: #ff6b00 !important;
}
.nav-pills .mytab .nav-link:not(.active) {
  background-color: red !important;
}

.nav-pills .mytab .nav-link {
  background-color: rgb(34, 189, 52) !important;
}

.nav-link {
  color: #ff6b00 !important;
}

.tab-content > .tab-pane {
  border: 1px solid;
  border-left: 0px none;
}

.ul .li .a {
  color: #ff6b00 !important;
}

text-warning {
  color: #ff6b00 !important;
}
</style>