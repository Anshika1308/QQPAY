<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-card v-if="selected_Settlement">
      <b-row>
        <b-col
          sm="12"
          md="6"
          lg="4"
        >
          <div class="menu-sec">
            <b-list-group flush>
              <!-- <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Deal Type</small>
                <small>{{ selected_Settlement.deal_type }}</small>
              </b-list-group-item> -->
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Settlement Number</small>
                <small>{{ selected_Settlement.settle_srl_num }}</small>
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
              <!-- <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Fund in  MYR</small>
                <small>{{ selected_Settlement.lcy_amount }} MYR</small>
              </b-list-group-item> -->
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Fund in USD</small>
                <small>{{ selected_Settlement.credit_amount }} USD</small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <div
            class="menu-sec d-flex justify-content-between "
          >
            Balance:
            <h3>{{ selected_Settlement.settle_balance }} USD</h3>
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
            <b-button v-if="selected_Settlement" @click="newFundingClick()" variant="outline-light" v-b-modal.add-funding>
              <b-icon icon="file-earmark-plus-fill"></b-icon> New Funding
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
      <template #cell(payout_partner)="row">
        {{ row.item.payout_partner }}
      </template>
      <template #cell(funding_date)="row"
        >{{ row.item.funding_date }}
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
              <label class="title-lbl">Additional Info</label>
              <b-row align-h="between">
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
                        <label>USD Rate</label>
                        <label>{{ row.item.dollar_lcy_rate }}</label>
                      </b-list-group-item>

                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >

                      <label>MYR Rate</label>
                        <label>{{ row.item.parent_lcy_rate }}</label>
                      </b-list-group-item>                      
                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >
                        <label>CCY Type</label>
                        <label>{{ row.item.lcy_ccy }}</label>
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

                      <label>Bank Charges</label>
                        <label>{{ row.item.bank_charges }}</label>
                      </b-list-group-item>
                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >

                      <label>Bank Name</label>
                        <label>{{ row.item.bank_name }}</label>
                      </b-list-group-item>
                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >

                      <label>created_by</label>
                        <label>{{ row.item.created_by }}</label>
                      </b-list-group-item>



                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >

                      <label>edited_by</label>
                        <label>{{ row.item.edited_by }}</label>
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
                  v-b-modal.add-funding
                >
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  Update
                </b-button>
                <!-- <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2 btn-light"
                >
                  <b-icon icon="plus-circle" aria-hidden="true"></b-icon> New
                  Funding
                </b-button> -->
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2 btn-light"
                  @click="deleteFund(row.item)"
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
      id="add-funding"
      ref="modal"
      title="Funding Details"
      @ok="nav_update"
      size="xl"
      variant="primary"
    >
      <b-card header="Funding Details" header-tag="header">
        <b-row>
          <b-col>
            <b-form-group label="Payout Partner">
              <!-- <b-form-input
                v-model="temp_funding.payout_partner"
                size="sm"
              ></b-form-input> -->
              <b-form-select
                v-model="temp_funding.payout_partner"
                :options="ppOptions"
                @change="onChangePPoptions($event)"
              ></b-form-select>
            </b-form-group>
            
          </b-col>
          <b-col>
            <b-form-group label="PPCCY Type">
              <b-form-input
                v-model="temp_funding.coll_ccy_pay_ccy"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="USD Amt">
              <b-form-input
                v-model="temp_funding.lcy_amount"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

          <b-row>
          <b-col>

         <b-form-group label="USD PPCCY">
              <b-form-input
                v-model="temp_funding.dollar_lcy_rate"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

             <b-col>
            <b-form-group label="PP Amt">
              <b-form-input
                v-model="temp_funding.pp_amount"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            
            </b-form-group>
          </b-col>

           <b-col>
            <b-form-group label="Funding No" label-for="funding-number-id">
              <b-form-input
                id="funding-number-id"
                v-model="temp_funding.funding_number"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

      </b-card>
    
        
        <b-card header="Purchase Details" header-tag="header">
      
        <b-row>
           <b-col>
            
              <b-form-group label="Purchase DT">
              <b-form-datepicker
                v-model="temp_funding.fund_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>

            </b-form-group>
          </b-col>
         
         
          
          <b-col>
            <b-form-group label="CCY Type">
              <b-form-input
                v-model="temp_funding.lcy_ccy"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
                <b-form-group label="Bank Charges">
              <b-form-input
                v-model="temp_funding.bank_charges"
                size="sm"
                v-on:keypress="isNumber($event)"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

            <b-row>
           
           <b-col>
            <b-form-group label="MYR Rate">
              <b-form-input
                v-model="temp_funding.parent_lcy_rate"
                size="sm"
              ></b-form-input>
            </b-form-group>
           </b-col> 

           <b-col>
            <b-form-group label="Bank POC">
              <b-form-input
                v-model="temp_funding.bank_poc"
                size="sm"
              ></b-form-input>
            </b-form-group>
           </b-col> 

           <b-col>
            <b-form-group label="Bank Name">
              <b-form-input
                v-model="temp_funding.bank_name"
                size="sm"
              ></b-form-input>
            </b-form-group>
           </b-col> 

         
             
        </b-row>
      </b-card>
      
        
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok(); submit()"> SUBMIT </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag";
import { mapGetters } from "vuex";
import axios from "axios";
import {responseHandler} from "@/helpers/globalFunctions";


export default {
  name: "Funding",
  components: {
    CountryFlag,
  },
  created() {
    if (this.selected_settlement_id) {
      this.getSelectedSettDtl();
      this.getSelectedSettlemntFunds();
    } else {
      this.getAllFunds();
    }
    this.getPPdetails();
  },
  watch: {
    selected_settlement_id: function(newValue) {
      if (newValue) {
        this.getSelectedSettDtl();
        this.getSelectedSettlemntFunds();
      } else {
        this.selected_Settlement = null;
        this.getAllFunds();
      }
    }
  },
  computed: {
    ...mapGetters([
      "token",
      "selected_settlement_id"
    ]),
  },
  data() {
    return {
      base_url: process.env.VUE_APP_TREASURY_SERVICE,
      base_url_p8002: process.env.VUE_APP_SERVER_ENDPOINT,
      updateTrigger: false,
      selected_Settlement: null,
      ppOptions: null,
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
              country_flag: "in",
              country: "India",
              partner: "ICICI",
              balance: "27000 USD"
            }
          ],
        },
      ],
      temp_funding: {
/*           payout_partner: "axis",
          purchase_DT: " ",
          USD_Amt: "19,970",
          PP_Amt: "1,497,750",
          Funding_No: " ",
          Bank_POC: "",
          PPCCY_Type: "INR",
          // Additonal details: 
          FeesCCY_Type: "USD",
          USD_PPCCY: "75",
          MY_RPPCY: "17.4",
          Fees: "20",
          created_by : " ",
          Bank: "",
          edited_by: "",
          settl_id: "" */
          payout_partner: "",
          payout_partner_id: 1000,
          fund_date: "",
          lcy_amount: "",
          pp_amount: "",
          funding_number: "",
          bank_poc: "",
          coll_ccy_pay_ccy: "",

          deal_no: "",
          dollar_lcy_rate: "",
          parent_lcy_rate: "",

          bank_charges: "",
          bank_name: ""




      },
      menu_hierarchy: [
        {
          text: "Treasury",
          active: true,
        },
        {
          text: "Funding",
          active: true,
        },
      ],
      fields: [
/*         "payout_partner",
        "PPCCY_Type",
        "USD_Amt",
        "PP_Amt",
        "Funding No",
        "Purchase_DT",
        "Bank_POC", */

        {
          key: 'payout_partner',
          label: 'Payout Partner'
        },
        {
          key: 'fund_date',
          label: 'Purchase Date'
        },
        {
          key: 'lcy_amount',
          label: 'USD Amt'
        },
        {
          key: 'pp_amount',
          label: 'PP Amt'
        },
        {
          key: 'funding_number',  //  Need to check that
          label: 'Funding Number'
        },
        {
          key: 'bank_poc',
          label: 'Bank POC' 
        },
        {
          key: 'coll_ccy_pay_ccy',
          label: 'PP CCY Type'
        },


        
        { key: "actions", label: "" },
      ],
      items: [
/*         {
          payout_partner: "axis",
          PPCCY_Type: "INR",
          USD_Amt: "19,970",
          PP_Amt: "1,497,750",
          Funding_No: " ",
          purchase_DT: " ",
          Bank_POC: "",
          
          
      
        }, */
      ],
    };
  },
  methods: {
    ok() {
      console.log('ok')
    },
    nav_update() {
      console.log('nav update')
    },
    async getSelectedSettlemntFunds() {

      axios
        .get(this.base_url + "prefund/get-prefund_belong/" + this.selected_settlement_id, {
          headers: {
            Authorization:  `Bearer ${this.token}`,
          },
        })
        .then(response => {
          responseHandler(response.data.status_code, this, response.data.message)
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
        })
        .catch((e) => {
          responseHandler(e.data.status_code, this, e.data.message)
          console.log(e);
        });
    },
    async getSelectedSettDtl() {

      axios
        .get(this.base_url + "deal-settlement/get-settlement/" + this.selected_settlement_id, {
          headers: {
            Authorization:  `Bearer ${this.token}`,
          },
        })
        .then(response => {
          // responseHandler(response.data.status_code, this, response.data.message)
          // this.items = JSON.parse(JSON.stringify(response.data.data[0]));
          this.selected_Settlement = response.data.data[0];
        })
        .catch((e) => {
          responseHandler(e.data.status_code, this, e.data.message)
          console.log(e);
        });
    },
    async getAllFunds() {

      axios
        .get(this.base_url + "prefund/get-all-prefunds", {
          headers: {
            Authorization:  `Bearer ${this.token}`,
          },
        })
        .then(response => {
          responseHandler(response.data.status_code, this, response.data.message)
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
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

    submit() {
      const request = this.getRequest();
      request.deal_no = this.selected_Settlement.settle_srl_num;
      request.funding_number = Number(request.funding_number);
      // console.log('req', JSON.parse(JSON.stringify(request)))
      if (this.updateTrigger) {
        axios.put(this.base_url + "prefund/update-prefund/" + request.fund_id, request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            const index = this.items.findIndex(ele => ele.fund_id === this.temp_funding.fund_id);
            this.items[index] = response.data.data[0];
            this.getSelectedSettDtl();
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Deal not posted', err);
        });

      } else {
        request.settl_id = this.selected_settlement_id;
        axios.post(this.base_url + "prefund/prefund-partner", request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            this.items.unshift(response.data.data[0]);
            this.getSelectedSettDtl();
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Deal not posted', err);
        });
        
      }
    },
    getRequest() {
      const req = this.temp_funding;
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
      this.temp_funding = selectedRow;
    },
    newFundingClick() {
      this.updateTrigger = false;
      // Reset temp variable
      this.temp_funding = {
        payout_partner: "",
        payout_partner_id: 1000,
        fund_date: "",
        lcy_amount: "",
        pp_amount: "",
        funding_number: "",
        bank_poc: "",
        coll_ccy_pay_ccy: "",

        deal_no: "",
        dollar_lcy_rate: "",
        parent_lcy_rate: "",

        bank_charges: "",
      };
    },
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      let val = e.target.value; // Get the value
      if(/^\d*\.?\d{0,4}$/.test(char) && /^\d*\.?\d{0,3}$/.test(val)) return true; // Match with regex 
      // if(/^[0-9]+$/.test(char)) return true; // Match with regex 
      else e.preventDefault(); // If not match, don't add to input text
    },
    async getPPdetails() {

      axios
        .get(this.base_url_p8002 + "/partner_details/get-partners-limited-field", {
          headers: {
            Authorization:  `Bearer ${this.token}`,
          },
        })
        .then(response => {
          // responseHandler(response.data.status_code, this, response.data.message)
          // this.selected_deal = response.data.data;
          this.formatPPoptions(response.data.data)
        })
        .catch((e) => {
          responseHandler(e.status_code, this, e.message)
          console.log(e);
        });
    },
    formatPPoptions(data) {
      if (data && data.length > 0) {
        this.ppOptions = [];
        data.forEach(ele => {
          this.ppOptions.push({
            text: ele.name_of_employer,
            value: ele.name_of_employer,
            pp_ccy: 'Test'        // Remove after api chnage and uncomment below
            // pp_ccy: ele.pp_ccy
          })
        });
      }
    },
    onChangePPoptions(eve) {
      console.log(eve)
      this.temp_funding.coll_ccy_pay_ccy = this.ppOptions.find(ele => ele.value === eve)?.pp_ccy;
    },
    deleteFund(selectedRow) {
      axios.delete(this.base_url + "prefund/delete-prefund/" + selectedRow.fund_id, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          responseHandler(response.data.status_code, this, response.data.message)
          if (response.data.success) {
            const index = this.items.findIndex(ele => ele.fund_id === selectedRow.fund_id);
            this.items.splice(index, 1);
            this.getSelectedSettDtl();
          }
        })
        .catch((err) => {
          responseHandler(err.data.status_code, this, err.data.message)
          console.log('Deal not posted', err);
      });
    },
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