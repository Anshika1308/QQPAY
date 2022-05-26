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
    <b-table
      :items="items"
      :fields="fields"
      :filter="filter"
      responsive
      class="align-middle mt-4"
    >
      <template #cell(remarks)="row" size="sm">
        <div class="action-div">
          <b-icon
            v-if="row.item.remarks == '1'"
            style="color: green"
            icon="square-fill"
          ></b-icon>
          <b-icon v-if="row.item.remarks == '0'" icon="square"></b-icon>
        </div>
      </template>
    </b-table>
    <b-modal
      id="scs-country-wise"
      ref="modal"
      title="Service Charge Setup"
      size="md"
      variant="primary"
    >
      <b-card no-body class="my-custom-class">
        <b-tabs pills card variant="primary">
          <b-tab title="Country Wise" active style="background-color: #ff6b00"
            ><b-card-text>
              <b-card>
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
                        :text="scs_country_wise.charge_type"
                        variant="light"
                        label-size="sm"
                      >
                        <b-dropdown-item
                          v-for="option in charge_type_options"
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
                        :text="scs_country_wise.country"
                        variant="light"
                        label-size="sm"
                      >
                        <b-dropdown-item
                          v-for="option in country_options"
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
                    <b-form-group
                      label-cols-sm="12"
                      label-cols-lg="12"
                      content-cols-sm="12"
                      content-cols-lg="12"
                    >
                      <b-dropdown
                        block
                        id="input-relation"
                        :text="scs_country_wise.service_charge_by"
                        variant="light"
                        label-size="sm"
                      >
                        <b-dropdown-item
                          v-for="option in service_charge_by_options"
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
                        placeholder="Service Charge"
                        v-model="scs_country_wise.service_charge"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <small class="ml-3 mt-3"
                    >if <strong>percentage</strong> selected then Upper Limit
                    will be disabled.</small
                  >
                  <b-col cols="12">
                    <b-form-group>
                      <b-form-input
                        placeholder="Upper Limit"
                        v-model="scs_country_wise.upper_limit"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <b-form-input
                        class="mt-3"
                        placeholder="Total Commission"
                        v-model="scs_country_wise.total_commission"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <b-form-input
                        class="mt-3"
                        placeholder="Pay Commission"
                        v-model="scs_country_wise.pay_commission"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group>
                      <b-form-textarea
                        class="mt-3"
                        placeholder="Remarks"
                        v-model="scs_country_wise.remarks"
                        size="sm"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card> </b-card-text
          ></b-tab>
          <b-tab title="Payout Partner Wise"
            ><b-card-text>
              <b-card>
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
                        :text="scs_payout_partner_wise.charge_type"
                        variant="light"
                        label-size="sm"
                      >
                        <b-dropdown-item
                          v-for="option in charge_type_options"
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
                    <b-form-group
                      label-cols-sm="12"
                      label-cols-lg="12"
                      content-cols-sm="12"
                      content-cols-lg="12"
                    >
                      <b-dropdown
                        block
                        id="input-relation"
                        :text="scs_payout_partner_wise.payout_partner"
                        variant="light"
                        label-size="sm"
                      >
                        <b-dropdown-item
                          v-for="option in payout_partner_options"
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
                        placeholder="Receive Country"
                        v-model="scs_payout_partner_wise.receive_country"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group
                      label-cols-sm="12"
                      label-cols-lg="12"
                      content-cols-sm="12"
                      content-cols-lg="12"
                    >
                      <b-dropdown
                        block
                        id="input-relation"
                        :text="scs_payout_partner_wise.service_charge_by"
                        variant="light"
                        label-size="sm"
                      >
                        <b-dropdown-item
                          v-for="option in service_charge_by_options"
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
                        placeholder="Service Charge"
                        v-model="scs_payout_partner_wise.service_charge"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <small class="ml-3 mt-3"
                    >if <strong>percentage</strong> selected then Upper Limit
                    will be disabled.</small
                  >
                  <b-col cols="12">
                    <b-form-group>
                      <b-form-input
                        placeholder="Upper Limit"
                        v-model="scs_payout_partner_wise.upper_limit"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <b-form-input
                        class="mt-3"
                        placeholder="Total Commission"
                        v-model="scs_payout_partner_wise.total_commission"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <b-form-input
                        class="mt-3"
                        placeholder="Pay Commission"
                        v-model="scs_payout_partner_wise.pay_commission"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="12">
                    <b-form-group>
                      <b-form-textarea
                        class="mt-3"
                        placeholder="Remarks"
                        v-model="scs_payout_partner_wise.remarks"
                        size="sm"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
      <template #modal-footer="{ submitPopup }">
        <b-button size="lg" variant="primary" @click="submitPopup()">
          Add Service Charge Setup
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
//import TreasuryFlow from "@/components/flow/TreasuryFlow.vue";
export default {
  name: "Service Charge",
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
      scs_country_wise: {
        charge_type: "Cash Payment",
        country: "India",
        service_charge_by: "F",
        service_charge: "",
        upper_limit: "",
        total_commission: "",
        pay_commission: "",
        remarks: "",
      },
      scs_payout_partner_wise: {
        charge_type: "Cash Payment",
        payout_partner: "ICICI",
        receive_country: "",
        service_charge_by: "F",
        service_charge: "",
        upper_limit: "",
        total_commission: "",
        pay_commission: "",
        remarks: "",
      },
      fields: [
        { key: "country", label: "Country" },
        { key: "payout_partner", label: "Payout Partner" },
        { key: "charge_type", label: "Charge Type" },
        { key: "upper_limit_myr", label: "Upper Limit MYR" },
        { key: "service_charge_by", label: "Service Charge By" },
        { key: "service_charge_myr", label: "Service Charge MYR" },
        { key: "pay_commission", label: "Pay Commission" },
        { key: "receive_commission", label: "Receive Commission" },
        { key: "remarks", label: "Remarks" },
      ],
      items: [
        {
          country: "India",
          payout_partner: "ICICI",
          charge_type: "Cash Payment",
          upper_limit_myr: "No Limit",
          service_charge_by: "F",
          service_charge_myr: "15",
          pay_commission: "7.5",
          receive_commission: "7.5",
          remarks: "1",
        },
        {
          country: "India",
          payout_partner: "ICICI",
          charge_type: "Account Deposit",
          upper_limit_myr: "5,000",
          service_charge_by: "F",
          service_charge_myr: "12",
          pay_commission: "7.5",
          receive_commission: "4.5",
          remarks: "1",
        },
        {
          country: "India",
          payout_partner: "ICICI",
          charge_type: "Account Deposit",
          upper_limit_myr: "50,000",
          service_charge_by: "F",
          service_charge_myr: "20",
          pay_commission: "10",
          receive_commission: "10",
          remarks: "0",
        },
        {
          country: "India",
          payout_partner: "ICICI",
          charge_type: "Account Deposit",
          upper_limit_myr: "2,00,000",
          service_charge_by: "F",
          service_charge_myr: "30",
          pay_commission: "15",
          receive_commission: "15",
          remarks: "1",
        },
        {
          country: "Nepal",
          payout_partner: "",
          charge_type: "Cash Payment",
          upper_limit_myr: "50,000",
          service_charge_by: "F",
          service_charge_myr: "15",
          pay_commission: "7.5",
          receive_commission: "7.5",
          remarks: "1",
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
      charge_options: [
        {
          text: "Final",
          value: "Final",
        },
        {
          text: "Half",
          value: "Half",
        },
      ],
      payout_partner_options: [
        {
          text: "ICICI",
          value: "ICICI",
        },
        {
          text: "SBI",
          value: "SBI",
        },
      ],
      service_charge_by_options: [
        {
          text: "F",
          value: "F",
        },
        {
          text: "J",
          value: "J",
        },
      ],
      charge_type_options: [
        {
          text: "Cash Payment",
          value: "Cash Payment",
        },
        {
          text: "Account Deposit",
          value: "Account Deposit",
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