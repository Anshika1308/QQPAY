<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light" v-b-modal.add-deal>
              <b-icon icon="file-earmark-plus-fill"></b-icon> New Deal
            </b-button>
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
      <b-col>
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
      <template #cell(deal_date)="row"
        ><b>{{ row.item.deal_date }}</b>
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

                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>NoOfSetle</label>
                    <label>{{ row.item.NoOf_Setle }}</label>
                  </b-list-group-item>

                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>Bank POC</label>
                    <label>{{ row.item.Bank_POC }}</label>
                  </b-list-group-item>

                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>TOF</label>
                    <label>{{ row.item.TOF }}</label>
                  </b-list-group-item>

                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>Edited by</label>
                    <label>{{ row.item.edited_by }}</label>
                  </b-list-group-item>

                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>Service Charge</label>
                    <label>{{ row.item.Service_Charge }}</label>
                  </b-list-group-item>

                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    <label>Service Tax</label>
                    <label>{{ row.item.Service_Tax }}</label>
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
                  Settlement
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
      id="add-deal"
      ref="modal"
      title="Deal Details"
      @ok="nav_update"
      size="xl"
      variant="primary"
    >
      <b-card header="Deal Details" header-tag="header">
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-1"
              label="Deal Date"
              label-for="example-datepicker"
            >
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_deal.deal_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Exchange Rate">
              <b-form-input
                v-model="temp_deal.exchange_rate"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="i_o_IRH">
              <b-form-input
                v-model="temp_deal.i_o_IRH"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
      
          <b-col>
            <b-form-group label="Source of funds">
              <b-form-input
                v-model="temp_deal.source_of_funds"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

            </b-row>
        <b-row>
          <b-col>
            <b-form-group label="USD Amount">
              <b-form-input
                v-model="temp_deal.amount_in_USD"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="MYR Amount">
              <b-form-input
                v-model="temp_deal.amount_in_MYR"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Deal No">
              <b-form-input
                v-model="temp_deal.deal_no"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="NoOf Setle">
              <b-form-input
                v-model="temp_deal.NoOf_Setle"
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
                v-model="temp_deal.purchase_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Service Charge" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="temp_deal.Service_Charge"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Service Tax">
              <b-form-input
                v-model="temp_deal.Service_Tax"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Created By">
              <b-form-input
                v-model="temp_deal.created_by"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group label="Edited By">
              <b-form-input
                v-model="temp_deal.edited_by"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="TOF">
              <b-form-input v-model="temp_deal.TOF" size="sm"></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Bank POC">
              <b-form-input
                v-model="temp_deal.Bank_POC"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

           <b-col>
            <b-form-group label="Status">
              <b-form-input
                v-model="temp_deal.Status"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-form-textarea
        id="textarea"
        v-model="temp_deal.comment"
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
export default {
  name: "Deals",
  components: {
    TreasuryFlow,
  },
  data() {
    return {
      filter: null,
      temp_deal: {
        i_o_IRH: "O",
        deal_date: "",
        source_of_funds: "Maybank",
        amount_in_USD: "66,509 USD",
        exchange_rate: "",
        amount_in_MYR: "2,80,003.89 MYR",
        deal_no: "",
        NoOf_Setle: "",
        Bank_POC: "",
        TOF: "",
        Service_Charge: "",
        Service_Tax: "",
     
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
          text: "Deals",
          active: true,
        },
      ],
      fields: [
        "i_o_IRH",
        "deal_date",
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
          deal_date: "01 Nov 21",
          source_of_funds: "Maybank",
          amount_in_USD: "66,509 USD",
          exchange_rate: "4.2100",
          amount_in_MYR: "2,80,003.89 MYR",
          contract_no: "S1341125",
          purchase_date: "02 Nov 21",
          status: "Open",
          created_by: "Siva",
          NoOf_Setle: "1",
          Bank_POC: "",
          TOF: "",
          Service_Charge: "",
          Service_Tax: "",
          break_down: "2",
          edited_by: "",
          comment: "This is a sample Deal",
        },
      ],
    };
  },
  methods: {},
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
</style>