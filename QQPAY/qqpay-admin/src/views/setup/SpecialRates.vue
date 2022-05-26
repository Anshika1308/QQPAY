<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <!-- <b-row>
      <b-col cols="12">
        <div class="float-right mt-3">
          <b-button size="md" variant="outline-light" v-b-modal.sr-country-wise
            >Add Special Rates</b-button
          >
        </div>
      </b-col>
    </b-row> -->
    <b-row>
      <b-col cols="6">
        <div>
          <b-input-group size="md" class="mt-3">
            <b-form-input
              placeholder="Search for user"
              v-model="special_rates.search_user"
              class="converted"
            ></b-form-input>
            <template #append>
              <b-dropdown
                :text="special_rates.filter_option"
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
          <b-button size="md" variant="outline-light" v-b-modal.sr-country-wise
            >Add Special Rates</b-button
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
    <b-table
      :items="items"
      :fields="fields"
      :filter="filter"
      responsive
      class="align-middle mt-4"
    >
      <template #cell(id)="row">
        {{ row.index + 1 }}
      </template>
      <template #cell(special_rate)="row">
        <strong>{{ row.item.special_rate }}</strong>
      </template>
    </b-table>
    <b-modal
      id="sr-country-wise"
      ref="modal"
      title="Special Rates"
      size="md"
      variant="primary"
    >
      <b-card no-body class="my-custom-class">
        <b-row>
          <b-col cols="12">
            <b-form-group
              label-cols-sm="12"
              label-cols-lg="12"
              content-cols-sm="12"
              content-cols-lg="12"
            >
              <b-dropdown
                block
                id="input-relation"
                :text="scs_country_wise.company"
                variant="light"
                label-size="sm"
              >
                <b-dropdown-item
                  v-for="option in company_options"
                  :key="option.value"
                  :value="option.value"
                  size="sm"
                >
                  {{ option.text }}
                </b-dropdown-item>
              </b-dropdown>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label-cols-sm="12"
              label-cols-lg="12"
              content-cols-sm="12"
              content-cols-lg="12"
            >
              <b-dropdown
                block
                id="input-relation"
                :text="scs_country_wise.currency_type"
                variant="light"
                label-size="sm"
              >
                <b-dropdown-item
                  v-for="option in currency_type_options"
                  :key="option.value"
                  :value="option.value"
                  size="sm"
                >
                  {{ option.text }}
                </b-dropdown-item>
              </b-dropdown>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group>
              <b-form-input
                class="mt-3"
                placeholder="Special Rate"
                v-model="scs_country_wise.special_rate"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group>
              <b-form-input
                class="mt-3"
                placeholder="Publish Rate"
                v-model="scs_country_wise.publish_Rate"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group>
              <b-form-input
                class="mt-3"
                placeholder="Reuters Rate"
                v-model="scs_country_wise.reuters_rate"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group>
              <b-form-input
                class="mt-3"
                placeholder="Paying Amount(min)"
                v-model="scs_country_wise.paying_amount_min"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group>
              <b-form-input
                class="mt-3"
                placeholder="Paying Amount(max)"
                v-model="scs_country_wise.paying_amount_max"
                size="sm"
                rows="3"
                max-rows="6"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group id="fieldset-1" label-for="example-datepicker">
              <b-form-datepicker
                class="mt-3"
                id="example-datepicker"
                v-model="scs_country_wise.processing_date"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <template #modal-footer="{ submitPopup }">
        <b-button size="lg" variant="primary" @click="submitPopup()">
          Add Special Rates
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
//import TreasuryFlow from "@/components/flow/TreasuryFlow.vue";
export default {
  name: "Special Rates",
  components: {
    //TreasuryFlow,
  },
  data() {
    return {
      special_rates: {
        country_name: "Malaysia",
        search_user: "",
        filter_option: "Filter",
      },
      filter: null,
      menu_hierarchy: [
        {
          text: "Setup",
          active: true,
        },
        {
          text: "Special Rates",
          active: true,
        },
      ],
      scs_country_wise: {
        company: "Company",
        currency_type: "Currency",
        special_rate: "",
        publish_Rate: "",
        reuters_rate: "",
        paying_amount_min: "",
        paying_amount_max: "",
        processing_date: "",
      },
      fields: [
        { key: "id", label: "SNO" },
        { key: "company_name", label: "Company Name" },
        { key: "currency_type", label: "Currency Type" },
        { key: "special_rate", label: "Special Rate" },
        { key: "publish_rate", label: "Publish Rate" },
        { key: "reuters_rate", label: "Reuters Rate" },
        { key: "paying_amount_min", label: "Paying Amount(min)" },
        { key: "paying_amount_max", label: "Paying Amount(max)" },
        { key: "processing_date", label: "Processing Date" },
        { key: "created_by", label: "Created By" },
      ],
      items: [
        {
          id: "1",
          company_name: "ABC Company",
          currency_type: "INR",
          special_rate: "17.80",
          publish_rate: "17.60",
          reuters_rate: "18.05",
          paying_amount_min: "50,000 MYR",
          paying_amount_max: "50,500 MYR",
          processing_date: "5th Feb 2022",
          created_by: "Izhar",
        },
        {
          id: "2",
          company_name: "XYZ Company",
          currency_type: "NPR",
          special_rate: "27.90",
          publish_rate: "27.70",
          reuters_rate: "28.10",
          paying_amount_min: "6500 MYR",
          paying_amount_max: "6510 MYR",
          processing_date: "5th Feb 2022",
          created_by: "Siva",
        },
        {
          id: "3",
          company_name: "Al Zira Company",
          currency_type: "BDT",
          special_rate: "19.90",
          publish_rate: "19.70",
          reuters_rate: "20.27",
          paying_amount_min: "1,10,000 MYR",
          paying_amount_max: "1,11,000 MYR",
          processing_date: "5th Feb 2022",
          created_by: "Machel",
        },
      ],
      company_options: [
        {
          text: "ABC Company",
          value: "ABC Company",
        },
        {
          text: "XYZ Company",
          value: "XYZ Company",
        },
      ],
      currency_type_options: [
        {
          text: "INR",
          value: "INR",
        },
        {
          text: "NPR",
          value: "NPR ",
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
    submitPopup: function () {},
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
#sr-country-wise___BV_modal_footer_ {
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