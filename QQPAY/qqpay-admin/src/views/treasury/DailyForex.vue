<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col>
        <div>
          <span class="mr-2">Daily Forex of</span>
          <b-dropdown
            id="input-type"
            :text="daily_forex.country_name"
            variant="light"
          >
            <b-dropdown-item
              v-for="option in country_options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.text }}
            </b-dropdown-item>
          </b-dropdown>
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
      <b-col cols="10">
        <div>
          <b-input-group size="md" class="mt-3">
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
          </b-input-group>
        </div>
        <!-- <b-form-group
          label-for="filter-input"
          label-cols-sm="0"
          label-cols-lg="0"
          label-align-lg="center"
          content-cols-sm="6"
          content-cols-lg="6"
          label-align-sm="center"
          label-size="sm"
          class="mb-2"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>
          
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
            <b-button
              class="float-right mt-5 px-5"
              variant="primary"
              @click="onSearch"
              >Next</b-button
            >
        </b-form-group> -->
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
            :filter="filter"
            responsive
            class="align-middle"
          >
            <!-- <template #cell(q_q_offer_rate)="row" size="sm">
        <b-form-input
          id="input-name"
          v-model="row.item.q_q_offer_rate"
        ></b-form-input>
      </template> -->
            <template #cell(margin)="row" size="sm">
              <b-form-input
                id="input-name"
                v-model="row.item.margin"
              ></b-form-input>
            </template>
            <template #cell(gain_loss)="row" size="sm">
              <b-icon
                v-if="row.item.gain_loss == '-1.0122'"
                class="text-danger"
                icon="arrow-down-circle-fill"
              ></b-icon>
              {{ row.item.gain_loss }}
            </template>
            <template #cell(br_margin)="row" size="sm">
              <b-form-input
                id="input-name"
                v-model="row.item.br_margin"
              ></b-form-input>
            </template>
            <template #cell(br_gain_loss)="row" size="sm">
              <b-icon
                v-if="row.item.br_gain_loss == '-1.0122'"
                class="text-danger"
                icon="arrow-down-circle-fill"
              ></b-icon>
              {{ row.item.br_gain_loss }}
            </template>
            <template #cell(actions)="row" size="sm">
              <div class="action-div">
                <b-button
                  variant="light"
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2 expand-btn"
                >
                  <b-icon icon="clock-history"></b-icon>
                </b-button>
                <b-button
                  variant="light"
                  size="sm"
                  @click="row.toggleDetails"
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
            :filter="filter"
            responsive
            class="align-middle"
          >
            <!-- <template #cell(q_q_offer_rate)="row" size="sm">
        <b-form-input
          id="input-name"
          v-model="row.item.q_q_offer_rate"
        ></b-form-input>
      </template> -->
            <template #cell(margin)="row" size="sm">
              <b-form-input
                id="input-name"
                v-model="row.item.margin"
              ></b-form-input>
            </template>
            <template #cell(gain_loss)="row" size="sm">
              <b-icon
                v-if="row.item.gain_loss == '-1.0122'"
                class="text-danger"
                icon="arrow-down-circle-fill"
              ></b-icon>
              {{ row.item.gain_loss }}
            </template>
            <template #cell(br_margin)="row" size="sm">
              <b-form-input
                id="input-name"
                v-model="row.item.br_margin"
              ></b-form-input>
            </template>
            <template #cell(br_gain_loss)="row" size="sm">
              <b-icon
                v-if="row.item.br_gain_loss == '-1.0122'"
                class="text-danger"
                icon="arrow-down-circle-fill"
              ></b-icon>
              {{ row.item.br_gain_loss }}
            </template>
            <template #cell(actions)="row" size="sm">
              <div class="action-div">
                <b-button
                  variant="light"
                  size="sm"
                  @click="row.toggleDetails"
                  class="mr-2 expand-btn"
                >
                  <b-icon icon="clock-history"></b-icon>
                </b-button>
                <b-button
                  variant="light"
                  size="sm"
                  @click="row.toggleDetails"
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
//import TreasuryFlow from "@/components/flow/TreasuryFlow.vue";
export default {
  name: "Daily Forex",
  components: {
    //TreasuryFlow,
  },
  data() {
    return {
      daily_forex: {
        country_name: "Malaysia",
        search_user: "",
        filter_option: "Filter",
      },
      filter: null,
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
      fields: [
        { key: "payout_countries", label: "Payout Countries" },
        { key: "ccv", label: "CCV" },
        { key: "q_q_cost_rate", label: "QQ Cost Rate (Avg)" },
        { key: "payout_ccv", label: "Payout CVV (Lowest)" },
        {
          key: "pr_payout_partner_cost_rate",
          label: "Payout Partner Cost Rate",
        },
        { key: "q_q_offer_rate", label: "Reuters Rate" },
        { key: "margin", label: "Margin" },
        { key: "consumers_rate", label: "Consumers Rate" },
        { key: "gain_loss", label: "Gain/Loss" },
        { key: "br_margin", label: "Margin" },
        { key: "br_business_rate", label: "Business Rate" },
        { key: "br_gain_loss", label: "Gain/Loss" },
        { key: "actions", label: "" },
      ],
      items: [
        {
          payout_countries: "India",
          ccv: "INR",
          q_q_cost_rate: "4.1200",
          payout_ccv: "74.2210",
          pr_payout_partner_cost_rate: "18.0148",
          q_q_offer_rate: "17.8440",
          margin: "0.0110",
          consumers_rate: "17.8550",
          gain_loss: "-1.0122",
          br_margin: "0.0110",
          br_business_rate: "17.8550",
          br_gain_loss: "-1.0122",
        },
        {
          payout_countries: "India",
          ccv: "INR",
          q_q_cost_rate: "4.1200",
          payout_ccv: "74.2210",
          pr_payout_partner_cost_rate: "18.0148",
          q_q_offer_rate: "17.8440",
          margin: "0.0110",
          consumers_rate: "17.8550",
          gain_loss: "-1.0122",
          br_margin: "0.0110",
          br_business_rate: "17.8550",
          br_gain_loss: "-1.0122",
        },
        {
          payout_countries: "India",
          ccv: "INR",
          q_q_cost_rate: "4.1200",
          payout_ccv: "74.2210",
          pr_payout_partner_cost_rate: "18.0148",
          q_q_offer_rate: "17.8440",
          margin: "0.0110",
          consumers_rate: "17.8550",
          gain_loss: "-1.0122",
          br_margin: "0.0110",
          br_business_rate: "17.8550",
          br_gain_loss: "-1.0122",
        },
      ],
      otherCountriesItems: [
        {
          payout_countries: "USA",
          ccv: "USD",
          q_q_cost_rate: "4.1200",
          payout_ccv: "1",
          pr_payout_partner_cost_rate: "0.24",
          q_q_offer_rate: "0.2353",
          margin: "0.0110",
          consumers_rate: "17.8550",
          gain_loss: "-1.0122",
          br_margin: "0.0110",
          br_business_rate: "17.8550",
          br_gain_loss: "-1.0122",
        },
        {
          payout_countries: "UK",
          ccv: "GBP",
          q_q_cost_rate: "4.1200",
          payout_ccv: "0.75",
          pr_payout_partner_cost_rate: "0.24",
          q_q_offer_rate: "0.2353",
          margin: "0.0110",
          consumers_rate: "17.8550",
          gain_loss: "-1.0122",
          br_margin: "0.0110",
          br_business_rate: "17.8550",
          br_gain_loss: "-1.0122",
        },
      ],
      country_options: [
        {
          text: "Malaysia",
          value: "Malaysia",
        },
        {
          text: "India",
          value: "India ",
        },
      ],
      filter_options: [
        {
          text: "Filter",
          value: "Filter",
        },
      ],
    };
  },
  methods: {
    onSearch: function () {},
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