<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-card v-if="selected_deal">
      <b-row>
        <b-col
          sm="12"
          md="6"
          lg="4"
        >
          <div class="menu-sec">
            <b-list-group flush>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Deal Type</small>
                <small>{{ selected_deal.deal_type }}</small>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Deal Number</small>
                <small>{{ selected_deal.deal_no }}</small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col
          sm="12"
          md="6"
          lg="4"
        >
          <div class="menu-sec">
            <b-list-group flush>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Fund in  MYR</small>
                <small>{{ selected_deal.lcy_amount }} MYR</small>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Fund in USD</small>
                <small>{{ selected_deal.fcy_amount }} USD</small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <div
            class="menu-sec d-flex justify-content-between align-items-center"
          >
            Balance:
            <h3>{{ selected_deal.fcy_amount }} USD</h3>
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
            <b-button v-if="selected_deal"  variant="outline-light" v-b-modal.add-settlement @click="newSettlementlick()">
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
      <!-- <template #cell(i_o_IRH)="row">
        <b>{{ row.item.i_o_IRH }} </b>
      </template> -->
      <template #cell(settl_date)="row"
        ><b>{{ format(row.item.settl_date) }}</b>
      </template>
      <template #cell(authorized_date)="row"
        ><b>{{ format(row.item.authorized_date) }}</b>
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
                          <!-- <label>Contract Number</label>
                          <label>{{ row.item.contract_no }}</label> -->
                          <label>PP CCY</label>
                          <label>{{ row.item.ccy_cd }}</label>
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
                          <label>Swift Charges</label>
                          <label>{{ row.item.swift_charge }}</label>
                        </b-list-group-item>
                        <b-list-group-item
                          class="d-flex justify-content-between align-items-center"
                        >
                          <label>PP Sharing charge</label>
                          <label>{{ row.item.coll_ccy_pay_ccy_wrong }}</label>
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
                          <label>PP Bank POC</label>
                          <label>{{ row.item.pp_bank_poc }}</label>
                        </b-list-group-item>
                        <b-list-group-item
                          class="d-flex justify-content-between align-items-center"
                        >
                          <label>Tax</label>
                          <label>{{ row.item.tax }}</label>
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

                </b-row>
                
              </b-col>
              <b-col sm="12" md="6" lg="3">
                <div class="menu-sec">
                  <b-button
                    variant="outline-light"
                    size="sm"
                    class="wd-100p mb-2 btn-light"
                    @click="onclickUpdate(row.item)"
                    v-b-modal.add-settlement
                  >
                    <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                    Update
                  </b-button>
                  <b-button
                    variant="outline-light"
                    size="sm"
                    class="wd-100p mb-2 btn-light"
                    @click="newFundClicked(row.item)"
                  >
                    <b-icon icon="plus-circle" aria-hidden="true"></b-icon> New
                    Funding
                  </b-button>
                  <b-button
                    variant="outline-light"
                    size="sm"
                    class="wd-100p mb-2 btn-light"
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
            <b-form-group label="Payout Partner">
              <b-form-input
                v-model="temp_settlement.payout_partner"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="PP CCY">
              <b-form-input
                v-model="temp_settlement.ccy_cd"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>          
          
          <b-col>
            <b-form-group label="USD Amt">
              <b-form-input
                v-model="temp_settlement.credit_amount"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>

        </b-row>

        <b-row>
          <b-col>
            <b-form-group label="Swift Charges">
              <b-form-input
                v-model="temp_settlement.swift_charge"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="PP Sharing Charges">
              <b-form-input
                v-model="temp_settlement.coll_ccy_pay_ccy_wrong"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="Tax">
              <b-form-input
                v-model="temp_settlement.tax"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <b-card header="Purchase Details" header-tag="header">
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-1"
              label="Transaction Date"
              label-for="settl-date-id"
            >
              <b-form-datepicker
                id="settl-date-id"
                v-model="temp_settlement.settl_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="Transaction Number">
              <b-form-input
                v-model="temp_settlement.settle_srl_num"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group label="US in PP" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="temp_settlement.coll_ccy_pay_ccy"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="MYR in PP" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="temp_settlement.lcy_amount"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="fieldset-1"
              label="PP CCY Dates"
              label-for="example-datepicker"
            >
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_settlement.authorized_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="PP Bank POC">
              <b-form-input
                v-model="temp_settlement.pp_bank_poc"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok();postSettlmentData()"> SUBMIT </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import CountryFlag from "vue-country-flag";
import { mapGetters } from "vuex";
import {responseHandler} from "@/helpers/globalFunctions";

export default {
  name: "Settlements",
  components: {
    CountryFlag,
  },
  created() {
    if (this.selected_deal) {
      this.getSelecedDealSetlement();
    } else {
      this.getAllSettlements();
    }
  },
  computed: {
    ...mapGetters([
      "token",
      "base_url",
      "selected_deal"
    ]),
  },
  data() {
    return {
      filter: null,
      updateTrigger: false,
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
              partner: "SBI",
              balance: "2400 USD"
            },
            {
              country_flag: "ca",
              country: "Canada",
              partner: "IDB",
              balance: "1257 USD"
            },
            {
              country_flag: "eg",
              country: "Egypt",
              partner: "BOI",
              balance: "4750 USD"
            },
            {
              country_flag: "ie",
              country: "Ireland",
              partner: "BOB",
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
              partner: "Axis",
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
/*         i_o_IRH: "O",
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
        comment: "", */

        payout_partner: "",
        settl_date: "",
        settle_srl_num: "",
        credit_amount: "",
        authorized_date: "",
        coll_ccy_pay_ccy: null,
        lcy_amount: null,

        ccy_cd: "",
        purchase_date: "",
        swift_charge: "",
        coll_ccy_pay_ccy_wrong: "",  // Need to capture
        created_by: "",
        updated_by: "",
        pp_bank_poc: "",  // Not captured
        tax: null,             // Not captured
        deal_id: "",         // Need to add settlement in a particular deal

/*         PP_CCY: "",
        swift_charges: "",
        PP_sharing_charges: "",
        created_by: "",
        edited_by: "",
        // PP_CCY_DT: "2021-11-01",
        PP_Bank_POC: "",
        tax: "" */
    
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
        {
          key: 'payout_partner',
          label: 'Payout Partner'
        },
        {
          key: 'settl_date',
          label: 'Settlement Date'
        },
        {
          key: 'settle_srl_num',
          label: 'Transaction Number'
        },
        {
          key: 'credit_amount',
          label: 'USD Amount'
        },
        {
          key: 'authorized_date',  //  Need to check that
          label: 'PP CCY Date'
        },
        {
          key: 'coll_ccy_pay_ccy',
          label: 'USD in PP' 
        },
        {
          key: 'lcy_amount',
          label: 'MYR in PP'
        },



/*         "payout_partner",
        "settl_date",
        "settle_srl_num",
        "PP_CCY",
        "USD_Amt",
        "swift_charges",
        "PP_sharing_charges",
        "created_by",
        "edited_by",
        "USD_in_PP",
        "MYR_in_PP",
        "PP_CCY_DT",
        "PP_Bank_POC",
        "tax", */
        { key: "actions", label: "" },
      ],
      items: [
/*         {
          payout_partner: "Axis",
          PP_CCY: "USD",
          USD_Amt: "66,509 USD",
          swift_charges: "10$",
          PP_sharing_charges: "N/A",
          settle_srl_num: "D+PP",
          settl_date: "01 Nov 21",
          created_by: "",
          edited_by: "",
          USD_in_PP: 74.50,
          MYR_in_PP: 17.50,
          PP_CCY_DT: "01 Nov 21",
          PP_Bank_POC: "",
          tax: ""

        }, */
      ],
    };
  },
  methods: {
    submitSettlementModal() {
      // this.items.push(this.temp_settlement);
    },
    ok() {
      console.log('ok')
    },
    nav_update() {
      console.log('nav update')
    },
    async getSelecedDealSetlement() {
      axios
        .get(this.base_url + "deal-settlement/get-settlement_belong/" + this.selected_deal.deal_id, {
          headers: {
            Authorization:  `Bearer ${this.token}`,
          },
        })
        .then(response => {
          responseHandler(response.data.status_code, this, response.data.message)
          // this.dealsTableData = JSON.parse(response.data.data);
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
        })
        .catch((e) => {
          responseHandler(e.status_code, this, e.message)
          console.log(e);
        });
    },
    async getAllSettlements() {
      console.log('selected_deal', this.selected_deal);
      console.log("token", this.token);

      axios
        .get(this.base_url + "deal-settlement/get-all-deal_settlements", {
          headers: {
            Authorization:  `Bearer ${this.token}`,
          },
        })
        .then(response => {
          responseHandler(response.data.status_code, this, response.data.message)
          // this.dealsTableData = JSON.parse(response.data.data);
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
        })
        .catch((e) => {
          responseHandler(e.status_code, this, e.message)
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

    postSettlmentData() {
      const request = this.getRequest();
      // console.log('req', JSON.parse(JSON.stringify(request)))
      if (this.updateTrigger) {
        axios.put(this.base_url + "deal-settlement/update-settlement/" + request.settl_id, request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            const index = this.items.findIndex(ele => ele.settl_id === this.temp_settlement.settl_id);
            this.items[index] = response.data.data[0];
          })
          .catch((err) => {
            responseHandler(err.status_code, this, err.message)
            console.log('Deal not posted', err);
        });

      } else {
        request.purchase_date = this.selected_deal.deal_date
        request.deal_id = this.selected_deal.deal_id; // Need to check when we dont have deal ie when we click settlement from the sub menu.
        axios.post(this.base_url + "deal-settlement/new-deal-settlement", request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            this.items.push(response.data.data[0]);
          })
          .catch((err) => {
            responseHandler(err.status_code, this, err.message)
            console.log('Deal not posted', err);
        });
        
      }
    },
    getRequest() {
      const req = this.temp_settlement;
      for (const key of Object.keys(req)) {
        if (key === 'deal_date' || key === 'purchase_date' || key === 'updated_date' || key === 'approved_aate' || key === 'authorized_date') {
          if (req[key]) {
            req[key] = new Date(req[key]);
          }
        }
      }
      return req;
    },
    onclickUpdate(selectedRow) {
      this.updateTrigger = true;
      this.temp_settlement = selectedRow;
    },
    newFundClicked(selectedRow) {
      this.$emit('openTab', 'funding')
      this.$store.commit("app/set_selected_Settlement", selectedRow);
    },
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      let val = e.target.value; // Get the value
      if(/^\d*\.?\d{0,4}$/.test(char) && /^\d*\.?\d{0,3}$/.test(val)) return true; // Match with regex 
      // if(/^[0-9]+$/.test(char)) return true; // Match with regex 
      else e.preventDefault(); // If not match, don't add to input text
    },
    newSettlementlick() {
      this.updateTrigger = false;
      this.temp_settlement = {
        payout_partner: "",
        settl_date: "",
        settle_srl_num: "",
        credit_amount: "",
        authorized_date: "",
        coll_ccy_pay_ccy: null,
        lcy_amount: null,

        ccy_cd: "",
        purchase_date: "",
        swift_charge: "",
        coll_ccy_pay_ccy_wrong: "",  // Need to capture
        created_by: "",
        updated_by: "",
        pp_bank_poc: "",  // Not captured
        tax: null,             // Not captured
        deal_id: "",         // Need to add settlement in a particular deal

      };
    }
    
  },
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
.btn-light {
  border-color: $primary;
  width: 100%;
  background: transparent !important;
  color: $primary !important;
}
</style>