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
            Outstanding Amount:
            <h3>{{ selected_deal.fcy_balance }} USD</h3>
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
            <b-button v-if="selected_deal && selected_deal.fcy_balance > 0"  variant="outline-light" @click="newSettlementlick()">
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
        >{{ format(row.item.settl_date) }}
      </template>
      <template #cell(authorized_date)="row"
        >{{ format(row.item.authorized_date) }}
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
                          <label>Settler</label>
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
                    @click="deleteSettlement(row.item)"
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
      ref="add-settlement"
      title="Settlement Details"
      @hidden="onHidden()"
      size="xl"
      variant="primary"
    >
      <b-card  :header="this.updateTrigger ? 'Basic Details' : '' " header-tag="header">
        <b-row>
          <div class="errorstyles">
              <div class="z-index">{{ apiSideMessage }}</div>
          </div>
          <b-col md="4">
            <b-form-group label="Payout Partner">
              <b-form-select
                v-model="temp_settlement.payout_partner"
                :options="ppOptions"
                @change="onChangePPoptions($event)"
                :disabled ="updateTrigger ? true : false"           
              ></b-form-select>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_settlement_error.payout_partner_error }}</div>
          </div>
          </b-col>
          <b-col md="4">
            <b-form-group label="USD Amount">
              <b-form-input
                v-model="temp_settlement.credit_amount"
                size="sm"
                @input="isValidAmount()"
                :disabled ="updateTrigger ? true : false"
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles" v-if="amountValidity === 'invalid'">
              <div class="z-index">{{ amountExceedError }}</div>
            </div>
            <div class="errorstyles">
              <div class="z-index">{{ temp_settlement_error.credit_amount_error }}</div>
          </div>
          </b-col>

        <!-- </b-row>

        <b-row> -->
          <b-col md="4">
            <b-form-group label="LCY Amount">
              <b-form-input
                v-model="temp_settlement.lcy_amount"
                size="sm"
                v-on:keypress="isNumber($event)"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Bank Charge">
              <b-form-input
                id="input-1"
                v-model="temp_settlement.bank_charge"
                size="sm"
                v-on:keypress="isNumber($event)"
                :disabled ="updateTrigger ? true : false"
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_settlement_error.bank_charge_error }}</div>
          </div>
          </b-col>
          <b-col md="4">
            <b-form-group label="Service Tax">
              <b-form-input
                v-model="temp_settlement.service_tax"
                size="sm"
                v-on:keypress="isNumber($event)"
                :disabled ="updateTrigger ? true : false"
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_settlement_error.service_tax_error }}</div>
          </div>
          </b-col>
          <b-col md="4">
            <b-form-group
              label="Value Date"
            >
              <b-form-datepicker
                id="settl-date-id"
                v-model="temp_settlement.settl_date"
                class="mb-2"
                size="sm"
                disabled
              ></b-form-datepicker>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Deal Number">
              <b-form-input
                v-model="temp_settlement.deal_no"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group label="Deal Rate">
              <b-form-input
                v-model="temp_settlement.fcy_deal_rate"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card v-if="updateTrigger" header="Fund Receiving Confirmation" header-tag="header">
        <b-row>
          <b-col md="4">
            <b-form-group label="Receving Date">
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_settlement.receving_date"
                class="mb-2"
                size="sm"
              >
              </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Receving Amount">
              <b-form-input
                v-model="temp_settlement.receving_amount"
                @input="CalculateSwiftCharge"
                size="md"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="Swift Charge">
              <b-form-input
                v-model="temp_settlement.swift_charge"
                size="md"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card v-if="updateTrigger" header="Audit Details" header-tag="header">
        <b-row> 
         <b-col  md="6">
            <b-form-group label="Created By">
              <b-form-input
                v-model="temp_settlement.created_by"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Created Date">
               <b-form-datepicker
                id="example-datepicker"
                v-model="temp_settlement.created_date"
                class="mb-2"
                size="sm"
                disabled
              >
              </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Update By">
              <b-form-input
                v-model="temp_settlement.updated_by"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Update Date">
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_settlement.updated_date"
                class="mb-2"
                size="sm"
                disabled
              >
              </b-form-datepicker>
            </b-form-group>
          </b-col>

        </b-row>
      </b-card>
      <b-form-textarea
        id="textarea"
        v-model="temp_settlement.remarks"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
      <template #modal-footer="{}">
        <b-button variant="primary" @click="postSettlmentData()"> SUBMIT </b-button>
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
    this.$root.$refs.Settlements = this;
    if (this.selected_deal_id) {
      this.getSelectedDealDtl();
      this.getSelecedDealSetlement();
    } else {
      this.getAllSettlements();
    }
    this.getPPdetails()
  },
  watch: {
    selected_deal_id: function(newValue) {
      if (newValue) {
        this.getSelectedDealDtl();
        this.getSelecedDealSetlement();
      } else {
        this.selected_deal = null;
        this.getAllSettlements();
      }
    },
  },
  computed: {
    ...mapGetters([
      "token",
      "selected_deal_id"
    ]),
  },
  data() {
    return {
      filter: null,
      base_url: process.env.VUE_APP_TREASURY_SERVICE,
      base_url_p8002: process.env.VUE_APP_SERVER_ENDPOINT,
      updateTrigger: false,
      selected_deal: null,
      ppOptions: null,
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
      amountExceedError:"",
      amountValidity:"pending",
      apiSideMessage:"",
      temp_settlement_error: {
        fcy_deal_rate_error:"",
        service_tax_error:"",
        bank_charge_error:"",
        payout_partner_error: "",
        settl_date_error: "",
        deal_no_error: "",
        credit_amount_error: "",
        authorized_date_error: "",
        coll_ccy_pay_ccy_error: null,
        lcy_amount_error: null,
        purchase_date_error:"2022-06-28",
        ccy_cd_error: "",
        swift_charge_error: 0.00,
        receving_amount_error:0.00,
        receving_date_error:"",
        coll_ccy_pay_ccy_wrong_error: 0.0,  // Need to capture
        created_by_error: "",
        updated_by_error: "",
        pp_bank_poc_error: "",  // Not captured
        tax_error: null,             // Not captured
        deal_id_error: "",         // Need to add settlement in a particular deal
        remarks_error:"",
      },
      temp_settlement: {
        fcy_deal_rate:"",
        service_tax:"",
        bank_charge:"",
        payout_partner: "",
        settl_date: "",
        deal_no: "",
        credit_amount: "",
        authorized_date: "",
        coll_ccy_pay_ccy: null,
        lcy_amount: null,
        purchase_date:"2022-06-28",
        ccy_cd: "",
        swift_charge: null,
        receving_amount:0.00,
        receving_date:"",
        coll_ccy_pay_ccy_wrong: 0.0,  // Need to capture
        created_by: "",
        updated_by: "",
        pp_bank_poc: "",  // Not captured
        tax: null,             // Not captured
        deal_id: "",         // Need to add settlement in a particular deal
        remarks:"",
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
          key: 'deal_no',
          label: 'Deal Number'
        },
        {
          key: 'credit_amount',
          label: 'USD Amount'
        },
        {
          key: 'fcy_deal_rate',
          label: 'Deal Rate'
        },
        { key: "actions", label: "" },
      ],
      items: [
      ],
    };
  },
  methods: {
    onHidden(){
      if(this.updateTrigger){
            console.log("model closing bro when updating");
           this.getAllSettlements();
      }else{
            console.log("model closing bro when adding");
      }
    },
    CalculateSwiftCharge(){
      this.temp_settlement.swift_charge = this.parseUSD(this.temp_settlement.credit_amount) - this.temp_settlement.receving_amount
    },
    isValidAmount(){
      this.temp_settlement.credit_amount = this.formatUSD(this.parseUSD(this.temp_settlement.credit_amount));
      if(this.temp_settlement.credit_amount){
        this.temp_settlement.remarks = "Settlement to " +  this.temp_settlement.payout_partner + " " + this.temp_settlement.credit_amount + " USD " +  "@" + this.temp_settlement.fcy_deal_rate;
      }
      if(this.temp_settlement.credit_amount){
          var temp_lcy_amount = (this.parseUSD(this.temp_settlement.credit_amount) * this.temp_settlement.fcy_deal_rate).toFixed(4);
          this.temp_settlement.lcy_amount = this.formatUSD(temp_lcy_amount);
      }
      if(this.selected_deal.fcy_balance < this.temp_settlement.credit_amount){
        this.amountValidity = "invalid",
        this.amountExceedError = "Amount shoud be less than outstanding amount"
      }else{
        this.amountValidity = "valid",
        this.amountExceedError = ""
      }
    },
    formatUSD(num) {
      return (
              Number(num)
                  .toString()
                  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
              );
    },
    parseUSD(text) {
      return Number(text.replace("$", "").replace(/,/g, ""));
    },
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
      if (!this.selected_deal_id) {
        return;
      }
      axios
        .get(this.base_url + "deal-settlement/get-settlement_belong/" + this.selected_deal_id, {
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
           this.items.forEach(element => {
              element.credit_amount = this.formatUSD(element.credit_amount);
            });
          console.log("this.items",this.items)
        })
        .catch((e) => {
          responseHandler(e.status_code, this, e.message)
          console.log(e);
        });
    },
    async getSelectedDealDtl() {
      axios
        .get(this.base_url + "new-contract/get-contract/" + this.selected_deal_id, {
          headers: {
            Authorization:  `Bearer ${this.token}`,
          },
        })
        .then(response => {
          responseHandler(response.data.status_code, this, response.data.message)
          console.log("response.data.data[0].deal_no", response.data.data[0].deal_no)
          this.selected_deal = response.data.data[0];
          this.temp_settlement.deal_no = response.data.data[0].deal_no;
          console.log(" this.temp_settlement.deal_no",  this.temp_settlement.deal_no)
          this.triggerUpdateDeal();
        })
        .catch((e) => {
          responseHandler(e.status_code, this, e.message)
          console.log(e);
        });
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
            pp_ccy: ele.local_currency        // Remove after api chnage and uncomment below
            // pp_ccy: ele.pp_ccy
          })
        });
      }
    },
    onChangePPoptions(eve) {
      console.log(eve)
      this.temp_settlement.ccy_cd = this.ppOptions.find(ele => ele.value === eve)?.pp_ccy;
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
      if(!this.temp_settlement.payout_partner){
        this.temp_settlement_error.payout_partner_error = "Please Select Payout Partner"
      }else{
        this.temp_settlement_error.payout_partner_error = ""
      }
      if(!this.temp_settlement.credit_amount){
        this.temp_settlement_error.credit_amount_error = "Please Enter the USD Amount"
      }else{
        this.temp_settlement_error.credit_amount_error = ""
      }
      if(!this.temp_settlement.bank_charge){
        this.temp_settlement_error.bank_charge_error = "Please Enter a Bank Charge"
      }else{
        this.temp_settlement_error.bank_charge_error = ""
      }    
    if (this.updateTrigger) {
      request.credit_amount = this.parseUSD(request.credit_amount);
      request.lcy_amount = this.parseUSD(request.lcy_amount);
      console.log("request",request.purchase_date)
      const date = new Date(request.purchase_date);
      const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      request.purchase_date = [date.getFullYear(), mnth, day].join("-");

        axios.put(this.base_url + "deal-settlement/update-settlement/" + request.settl_id, request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            if(response.data.status_code === 200){
              
                this.$refs['add-settlement'].hide();
                this.$swal({
                        title: "Settlment Updated Succesfully",
                        icon: "success",
                        button: "Done",
                });
                this.apiSideMessage = "";
            }
            responseHandler(response.data.status_code, this, response.data.message)
            const index = this.items.findIndex(ele => ele.settl_id === this.temp_settlement.settl_id);
            this.items[index] = response.data.data[0];
            this.getSelectedDealDtl();
            
          })
          .catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
              responseHandler(err.status_code, this, err.response.data.message)
            } else {
              responseHandler(err.status_code, this, err.message)
            }
            console.log('Deal not posted', err);
        });

      } else {
        request.purchase_date = this.selected_deal.deal_date
        request.deal_id = this.selected_deal_id; // Need to check when we dont have deal ie when we click settlement from the sub menu.
        if(request.payout_partner && request.credit_amount && request.bank_charge){
          request.service_tax = 0.00;
          request.credit_amount = this.parseUSD(request.credit_amount);
          request.lcy_amount = this.parseUSD(request.lcy_amount);
          axios.post(this.base_url + "deal-settlement/new-deal-settlement", request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            if(response.data.status_code === 200){
                this.$refs['add-settlement'].hide();
                this.$swal({
                        title: "Settlment Added Succesfully",
                        icon: "success",
                        button: "Done",
                });
                this.apiSideMessage = "";
            }
            if(response.data.status_code !== 200){
                this.apiSideMessage = response.data.message;
            }
            
            this.items.unshift(response.data.data[0]);
            this.getSelectedDealDtl();
          })
          .catch((err) => {
            if (err.response && err.response.data && err.response.data.message) {
              responseHandler(err.status_code, this, err.response.data.message)
            } else {
              responseHandler(err.status_code, this, err.message)
            }
            console.log('Deal not posted', err);
          });  
        }
              
      }
    },
    /**
     * Used to get updated deal in deal page - Settlement number and staus
     */
    triggerUpdateDeal() {
      if (this.$root.$refs.Deals) {
        console.log("comming hear", this.selected_deal.deal_no);
        this.temp_settlement.deal_no = this.selected_deal.deal_no;
          this.$root.$emit('selectedDealEventing', this.selected_deal);
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
      selectedRow.credit_amount = this.formatUSD(selectedRow.credit_amount);
      selectedRow.lcy_amount = this.formatUSD(selectedRow.lcy_amount);
      this.temp_settlement_error = {
        fcy_deal_rate_error:"",
        service_tax_error:"",
        bank_charge_error:"",
        payout_partner_error: "",
        settl_date_error: "",
        deal_no_error: "",
        credit_amount_error: "",
        authorized_date_error: "",
        coll_ccy_pay_ccy_error: null,
        lcy_amount_error: null,
        purchase_date_error:"2022-06-28",
        ccy_cd_error: "",
        swift_charge_error: 0.00,
        receving_amount_error:0.00,
        receving_date_error:"",
        coll_ccy_pay_ccy_wrong_error: 0.0,  // Need to capture
        created_by_error: "",
        updated_by_error: "",
        pp_bank_poc_error: "",  // Not captured
        tax_error: null,             // Not captured
        deal_id_error: "",         // Need to add settlement in a particular deal
        remarks_error:"",
      };
      console.log("selectedRow",selectedRow)
       console.log("selectedRow",selectedRow.purchase_date)
      this.temp_settlement = selectedRow;
   
    },
    deleteSettlement(selectedRow) {
      axios.delete(this.base_url + "deal-settlement/delete-settlement/" + selectedRow.settl_id, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          responseHandler(response.data.status_code, this, response.data.message)
          if (response.data.success) {
            const index = this.items.findIndex(ele => ele.settl_id === selectedRow.settl_id);
            this.items.splice(index, 1);
            this.getSelectedDealDtl();
          }
        })
        .catch((err) => {
          responseHandler(err.data.status_code, this, err.data.message)
          console.log('Deal not posted', err);
      });
    },
    newFundClicked(selectedRow) {
      this.$emit('openTab', 'funding')
      this.$store.commit("app/set_selected_settlement_id", selectedRow.settl_id);
    },
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      let val = e.target.value; // Get the value
      if(/^\d*\.?\d{0,4}$/.test(char) && /^\d*\.?\d{0,3}$/.test(val)) return true; // Match with regex 
      // if(/^[0-9]+$/.test(char)) return true; // Match with regex 
      else e.preventDefault(); // If not match, don't add to input text
    },
    newSettlementlick() {
      this.$refs['add-settlement'].show();
      this.updateTrigger = false;
        const date = new Date(this.selected_deal.purchase_date);
        const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        this.selected_deal.purchase_date = [date.getFullYear(), mnth, day].join("-");
      this.temp_settlement_error = {
        fcy_deal_rate_error:"",
        service_tax_error:"",
        bank_charge_error:"",
        payout_partner_error: "",
        settl_date_error: "",
        deal_no_error: "",
        credit_amount_error: "",
        authorized_date_error: "",
        coll_ccy_pay_ccy_error: null,
        lcy_amount_error: null,
        purchase_date_error:"2022-06-28",
        ccy_cd_error: "",
        swift_charge_error: 0.00,
        receving_amount_error:0.00,
        receving_date_error:"",
        coll_ccy_pay_ccy_wrong_error: 0.0,  // Need to capture
        created_by_error: "",
        updated_by_error: "",
        pp_bank_poc_error: "",  // Not captured
        tax_error: null,             // Not captured
        deal_id_error: "",         // Need to add settlement in a particular deal
        remarks_error:"",
      };
      this.temp_settlement = {
        payout_partner: "",
        settl_date: this.selected_deal.purchase_date,
        deal_no: this.selected_deal.deal_no,
        fcy_deal_rate:this.selected_deal.fcy_deal_rate,
        credit_amount: "",
        authorized_date: "",
        coll_ccy_pay_ccy: null,
        lcy_amount: null,
        bank_charge:0.00,
        service_tax:0.00,
        ccy_cd: "",
        swift_charge: 0.00,
        purchase_date: "2022-06-28",
        coll_ccy_pay_ccy_wrong: 0.00,  // Need to capture
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

.invalid input {
  border-color: rgb(248, 146, 146);
}
.errorstyles {
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: red;

}

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