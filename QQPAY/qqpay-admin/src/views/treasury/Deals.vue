<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light" v-b-modal.add-deal @click="newDealClicked()">
              <b-icon
                icon="file-earmark-plus-fill"
                
              ></b-icon>
              New Deal
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
      <template #cell(item)="row">
        {{ row.item.deal_type }}
      </template>
      <template #cell(deal_date)="row"
        >{{ format(row.item.deal_date) }}
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
          <b-row align-h="between">
            <b-col sm="12" md="6" lg="9">
              <b-row align-h="between">
              <label class="title-lbl">Additional Info</label>
              <b-col sm="12" md="6" lg="6">
                <div class="menu-sec">
                  <b-list-group flush>
                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label>Contract Number</label>
                      <label>{{ row.item.deal_no }}</label>
                    </b-list-group-item>
                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label>Purchase Date</label>
                      <label>{{ format(row.item.purchase_date) }}</label>
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
                      <label>Settlements</label>
                      <label>{{ row.item.no_of_settlements }}</label>
                    </b-list-group-item>

                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label>Bank POC</label>
                      <label>{{ row.item.bank_poc }}</label>
                    </b-list-group-item>

                  </b-list-group>
                </div>
              </b-col>

              <b-col sm="12" md="6" lg="6">
                <div class="menu-sec">
                  <b-list-group flush>
                    

                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label>Target of funds</label>
                      <label>{{ row.item.tof }}</label>
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
                      <label>{{ row.item.bank_charge }}</label>
                    </b-list-group-item>

                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label>Service Tax</label>
                      <label>{{ row.item.tax }}</label>
                    </b-list-group-item>
                  </b-list-group>
                </div>
              </b-col>

              <!-- <b-col sm="12" md="6" lg="6" align-h="center">
                <TreasuryFlow />
              </b-col> -->

              </b-row>
            </b-col>
            <b-col sm="12" md="6" lg="3">
                          <!-- <b-col > -->
              <div class="menu-sec">
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2 btn-light"
                  @click="onclickUpdate(row.item)"
                  v-b-modal.add-deal
                >
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  Update
                </b-button>
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2 btn-light"
                  @click="newSettlementClicked(row.item)"
                >
                  <b-icon icon="plus-circle" aria-hidden="true"></b-icon> New
                  Settlement
                </b-button>
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2 btn-light"
                >
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
                </b-button>
              </div>
            <!-- </b-col> -->
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
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Deal Type">
              <!-- <b-form-input
                v-model="temp_deal.deal_type"
                size="sm"
              ></b-form-input> -->
              <b-form-select v-model="temp_deal.deal_type" :options="dealOption"></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
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
              >
              </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Deal No">
              <b-form-input
                v-model="temp_deal.deal_no"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="USD Amount">
              <b-form-input
                v-model="temp_deal.fcy_amount"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Exchange Rate">
              <b-form-input
                v-model="temp_deal.fcy_deal_rate"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="4" lg="4">
            <b-form-group label="MYR Amount">
              <b-form-input
                v-model="temp_deal.lcy_amount"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>
        
        </b-row>
        <b-row align-h="start">
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Source of funds">
              <b-form-select v-model="temp_deal.source_of_funds" :options="fundSourceOption"></b-form-select>
            </b-form-group>
          </b-col>            
        </b-row>
      </b-card>

      <b-card header="Purchase Details" header-tag="header">
        <b-row>
          <b-col sm="12" md="4" lg="4">
            <b-form-group id="purchase-date" label="Purchase Date" label-for="purchase-datepicker">
              <b-form-datepicker
                id="purchase-datepicker"
                v-model="temp_deal.purchase_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Bank Charge" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="temp_deal.bank_charge"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <!-- <b-form-group label="Target of Fund">
              <b-form-input v-model="temp_deal.tof" size="sm"></b-form-input>
            </b-form-group> -->
            <b-form-group label="Target of Fund">
              <b-form-select v-model="temp_deal.tof" :options="targetOfFundOption"></b-form-select>
            </b-form-group>
          </b-col>          

        </b-row>

        <b-row align-h="start">  
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Bank POC">
              <b-form-input
                v-model="temp_deal.bank_poc"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col  sm="12" md="4" lg="4">
            <b-form-group label="Service Tax">
              <b-form-input
                v-model="temp_deal.tax"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>

        </b-row>
      </b-card>
      <b-form-textarea
        id="textarea"
        v-model="temp_deal.remarks"
        placeholder="Remarks"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok();postDealData()"> SUBMIT </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import {responseHandler} from "@/helpers/globalFunctions";
export default {
  name: "Deals",
  components: {
    
  },
  created() {
    this.getContract();
  },
  computed: {
    ...mapGetters([
      "token",
      "base_url",
    ]),
    getAmtAndRate() {
      return { 
        amt: this.temp_deal.fcy_amount,
        rate: this.temp_deal.fcy_deal_rate
      };
    }
  },
  watch: {
    getAmtAndRate: function (newValue) {
      console.log(newValue, 'new value')
      if (newValue.amt >= 0 && newValue.rate >= 0) {
        this.temp_deal.lcy_amount = (
          newValue.amt *
          newValue.rate
        ).toFixed(2);
      }
    },
  },
  
  data() {
    return {
      filter: null,
      dealsTableData: null,
      updateTrigger: false,
      dealOption: [
        { value: 'I', text: 'Inward' },
        { value: 'O', text: 'Outward' },
        { value: 'IRH', text: 'IRH' },        
      ],
      fundSourceOption: [
        { value: 'Public Bank MYR', text: 'Public Bank MYR' }        
      ],
      targetOfFundOption: [
        { value: 'Target Bank USD', text: 'Target Bank USD' }        
      ],
/*       temp_deal: {
        approved_aate: null,
        approved_by: "",
        authorization_flag: false,
        authorized_by: "",
        authorized_date: null,
        bank_charge: '',
        bank_poc: "",
        created_by: "",
        created_date: "",
        deal_date: "",
        deal_id: false,
        deal_no: "",
        deal_type: "",
        del_flag: false,
        fcy_amount: null,   // USD Amt
        fcy_balance: null,
        fcy_ccy: "",
        fcy_deal_rate: '',
        is_settled: false,
        lcy_amount: null,
        lcy_ccy: "",
        pp_amount: 0,
        purchase_date: "",
        rate_coll_ppccy: 0,
        remarks: "",
        source_bank_id: "",
        target_bank_id: "",
        tax: null,
        updated_by: "",
        updated_date: null,
        voucher_no: "",
      }, */
      temp_deal: {
        deal_type: "",
        deal_date: "",
        deal_no: "",
        fcy_amount: "",  // USD Amt
        fcy_deal_rate: "",
        lcy_amount: "",    //MYR Amt
        source_of_funds: "Public Bank MYR",

        purchase_date: "",
        bank_charge: "",
        tof: "Target Bank USD",          // Target of fund
        bank_poc: "",
        tax: "",
        remarks: "",
        no_of_settlements: "",
        status: ""

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
        {
          key: 'deal_type',
          label: 'Deal Type',
        },
        {
          key: 'deal_date',
          label: 'Deal Date',
        },
        {
          key: 'source_of_funds',
          label: 'Source of Funds',
        },
        {
          key: 'fcy_amount',
          label: 'Amount in USD',
        },
        {
          key: 'fcy_deal_rate',
          label: 'Exchange Rate',
        },
        {
          key: 'lcy_amount',
          label: 'Amount in MYR',
        },
        {
          key: 'status',
          label: 'Status',
        },
        { key: "actions", label: "" },
      ],
      items: [
        /* {
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
          bank_poc: "",
          TOF: "",
          bank_charge: "",
          tax: "",
          break_down: "2",
          edited_by: "",
          comment: "This is a sample Deal",
        }, */
      ],
    };
  },
  methods: {
    ok() {
      console.log("ok");
    },
    nav_update() {
      console.log("nav update");
    },
    postDealData() {
      const request = this.getRequest();
      // console.log('req', JSON.parse(JSON.stringify(request)))
      if (this.updateTrigger) {
        axios.put(this.base_url + "new-contract/update-contract/" + request.deal_id, request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            const index = this.items.findIndex(ele => ele.deal_id === this.temp_deal.deal_id);
            this.items[index] = response.data.data[0];
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Deal not posted', err);
        });

      } else {
        axios.post(this.base_url + "new-contract/new-contract", request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            // response.data.data[0]['status'] = "open";
            // response.data.data[0]['no_of_settlements'] = 1;
            this.items.unshift(response.data.data[0]);
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Deal not posted', err);
        });
        
      }
    },
    getRequest() {
      const req = this.temp_deal;
      for (const key of Object.keys(req)) {
        if (key === 'purchase_date' || key === 'updated_date' || key === 'approved_aate' || key === 'authorized_date') {
          if (req[key]) {
            req[key] = new Date(req[key]);
          }
        }
      }
      return req;
    },

    async getContract() {
      console.log("token", this.token);

      axios
        .get(this.base_url + "new-contract/get-all-contract", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          responseHandler(response.data.status_code, this, response.data.message)
          // this.dealsTableData = JSON.parse(response.data.data);
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
          console.log("this.items", this.items);
        })
        .catch((e) => {
          responseHandler(e.data.status_code, this, e.data.message)
          console.log(e);
        });
    },
    format(date) {
      if (date) {
        date = new Date(date);
        let month = date.toLocaleString("en-US", { month: 'short' })
        return date.getDate() + ' ' + month + ' ' + date.getFullYear();
      }
    },
    newDealClicked() {
      this.resetTempDeals();
      this.updateTrigger = false;
      this.temp_deal.status = "open";
      this.temp_deal.no_of_settlements = 1;
    },
    resetTempDeals() {
      this.temp_deal = {
        deal_type: "",
        deal_date: "",
        deal_no: "",
        fcy_amount: "",  // USD Amt
        fcy_deal_rate: "",
        lcy_amount: "",    //MYR Amt
        source_of_funds: "Public Bank MYR",

        purchase_date: "",
        bank_charge: "",
        tof: "Target Bank USD",          // Target of fund
        bank_poc: "",
        tax: null,
        remarks: "",
        no_of_settlements: "",
        status: ""
      }
    },
    onclickUpdate(selectedRow) {
      this.updateTrigger = true;
      this.temp_deal = selectedRow;
    },
    newSettlementClicked(selectedRow) {
      this.$emit('openTab', 'settlements')
      this.$store.commit("app/set_selected_deal_id", selectedRow.deal_id);
    },
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      let val = e.target.value; // Get the character
      if(/^\d*\.?\d{0,4}$/.test(char) && /^\d*\.?\d{0,3}$/.test(val)) return true; // Match with regex 
      // if(/^[0-9]+$/.test(char)) return true; // Match with regex 
      else e.preventDefault(); // If not match, don't add to input text
    }
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
.btn-light {
  border-color: $primary;
  width: 100%;
  background: transparent !important;
  color: $primary !important;
}
</style>