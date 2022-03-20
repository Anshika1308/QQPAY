<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-card>
      <b-row>
        <b-col
          sm="12"
          md="6"
          lg="4"
          v-for="deal in deal_details"
          :key="deal.id"
        >
          <div class="menu-sec">
            <b-list-group flush>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
                v-for="details in deal.details"
                :key="details.value"
              >
                <small>{{ details.text }}</small>
                <small>{{ details.value }}</small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <div
            class="menu-sec d-flex justify-content-between align-items-center"
          >
            Balance:
            <h3>30,000 USD</h3>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <div>
      <b-row v-for="partner in partner_balance" :key="partner.id">
        <b-col sm="12"
          md="4"
          lg="2"
          v-for="section in partner.section" :key="section.partner"
          class="col-p5">
          <b-card class="p-2">
            <country-flag :country="section.country_flag" size="normal" />
            <small>&nbsp;&nbsp;{{section.country}}</small><br/>
            <small>{{section.partner}}</small><br/>
            <small><b>{{section.balance}}</b></small>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-row class="mt-4">
      <b-col class="col-p5">
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light" v-b-modal.add-settlement>
              <b-icon icon="file-earmark-plus-fill"></b-icon> New Settlement
            </b-button>
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
      <b-col class="col-p5">
        <b-form-group
          label-for="filter-input"
          label-cols-sm="0"
          label-cols-lg="0"
          label-align-lg="right"
          content-cols-sm="12"
          content-cols-lg="8"
          label-align-sm="right"
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
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      :items="items"
      :fields="fields"
      :filter="filter"
      responsive
      class="align-middle"
    >
      <template #cell(i_o_IRH)="row">
        <b>{{ row.item.i_o_IRH }} </b>
      </template>
      <template #cell(settlement_date)="row"
        ><b>{{ row.item.settlement_date }}</b>
      </template>
      <template #cell(actions)="row" size="sm">
        <div class="action-div">
          <b-button
            variant="light"
            size="sm"
            @click="row.toggleDetails"
            class="mr-2 expand-btn"
          >
            <b-icon v-if="row.detailsShowing" icon="chevron-up"></b-icon>
            <b-icon v-else icon="chevron-down"></b-icon>
          </b-button>
        </div>
      </template>
      <template #row-details="row">
        <b-card>
          <b-row>
            <b-col sm="12" md="6" lg="4">
              <div class="menu-sec">
                <label class="title-lbl">Additional Info</label>
                <b-list-group flush>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>Contract Number</label>
                    <label>{{ row.item.contract_no }}</label>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>Purchase Date</label>
                    <label>{{ row.item.purchase_date }}</label>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>Created by</label>
                    <label>{{ row.item.created_by }}</label>
                  </b-list-group-item>
                </b-list-group>
              </div>
            </b-col>
            <b-col sm="12" md="6" lg="6" align-h="center">
              <TreasuryFlow />
            </b-col>
            <b-col sm="12" md="6" lg="2">
              <div class="menu-sec">
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2"
                >
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  Update
                </b-button>
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2"
                >
                  <b-icon icon="plus-circle" aria-hidden="true"></b-icon> New
                  Funding
                </b-button>
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2"
                >
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
    <b-modal
      id="add-settlement"
      ref="modal"
      title="Settlement Details"
      @ok="nav_update"
      size="xl"
      variant="primary"
    >
      <b-card header="Settlement Details" header-tag="header">
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-1"
              label="Settlement Date"
              label-for="example-datepicker"
            >
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_settlement.settlement_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Exchange Rate">
              <b-form-input
                v-model="temp_settlement.exchange_rate"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="USD Amount">
              <b-form-input
                v-model="temp_settlement.amount_in_USD"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="MYR Amount">
              <b-form-input
                v-model="temp_settlement.amount_in_MYR"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <b-card header="Purchase Details" header-tag="header">
        <b-row>
          <b-col>
            <b-form-group label="Purchase Date">
              <b-form-datepicker
                v-model="temp_settlement.purchase_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Transaction No." label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="temp_settlement.contract_no"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Exchange Partner">
              <b-form-input
                v-model="temp_settlement.source_of_funds"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Partner Type">
              <b-form-input
                v-model="temp_settlement.exchange_rate"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-form-textarea
        id="textarea"
        v-model="temp_settlement.comment"
        placeholder="Remarks"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok()"> SUBMIT </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import TreasuryFlow from "@/components/flow/TreasuryFlow.vue";
import CountryFlag from "vue-country-flag";

export default {
  name: "Settlements",
  components: {
    TreasuryFlow,
    CountryFlag,
  },
  data() {
    return {
      filter: null,
      deal_details: [
        {
          id: 1,
          details: [
            {
              text: "I/O/IRH",
              value: "Outbound",
            },
            {
              text: "Contract No",
              value: "S1341125",
            },
          ],
        },
        {
          id: 2,
          details: [
            {
              text: "Fund in MYR",
              value: "2,80,003.89 MYR",
            },
            {
              text: "Fund in USD",
              value: "66,509 USD",
            },
          ],
        },
      ],
      partner_balance: [
        {
          id: 1,
          section: [
            {
              country_flag: "fr",
              country: "France",
              partner: "Citi Bank",
              balance: "1500 USD"
            },
            {
              country_flag: "in",
              country: "India",
              partner: "ICICI",
              balance: "27000 USD"
            },
            {
              country_flag: "bh",
              country: "Bahrain",
              partner: "ICICI",
              balance: "2400 USD"
            },
            {
              country_flag: "ca",
              country: "Canada",
              partner: "ICICI",
              balance: "1257 USD"
            },
            {
              country_flag: "eg",
              country: "Egypt",
              partner: "ICICI",
              balance: "4750 USD"
            },
            {
              country_flag: "ie",
              country: "Ireland",
              partner: "ICICI",
              balance: "8540 USD"
            }
          ],
        },
        {
          id: 2,
          section: [
            {
              country_flag: "ie",
              country: "Ireland",
              partner: "ICICI",
              balance: "8540 USD"
            },
            {
              country_flag: "mv",
              country: "Maldives",
              partner: "ICICI",
              balance: "8540 USD"
            }
          ],
        },
      ],
      temp_settlement: {
        i_o_IRH: "O",
        settlement_date: "",
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
          text: "Settlements",
          active: true,
        },
      ],
      fields: [
        "i_o_IRH",
        "settlement_date",
        "source_of_funds",
        "amount_in_USD",
        "exchange_rate",
        "amount_in_MYR",
        "status",
        { key: "actions", label: "" },
      ],
      items: [
        {
          i_o_IRH: "O",
          settlement_date: "01 Nov 21",
          source_of_funds: "Maybank",
          amount_in_USD: "66,509 USD",
          exchange_rate: "4.2100",
          amount_in_MYR: "2,80,003.89 MYR",
          contract_no: "S1341125",
          purchase_date: "02 Nov 21",
          status: "Open",
          created_by: "Siva",
          break_down: "2",
          edited_by: "",
          comment: "This is a sample Settlement",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.col-p5 {
  padding-right: 5px !important;
  padding-left: 5px !important;
}
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
</style>