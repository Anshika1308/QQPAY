<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-card v-if="selected_Settlement">
      <b-row>
        <b-col sm="12" md="6" lg="4">
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
        <b-col sm="12" md="6" lg="4">
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
          <div class="menu-sec d-flex justify-content-between">
            Outstanding Balance:
            <h3>{{ selected_Settlement.settle_balance }} USD</h3>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <div>
      <b-row v-for="partner in partner_balance" :key="partner.id">
        <b-col
          sm="12"
          md="4"
          lg="2"
          v-for="section in partner.section"
          :key="section.partner"
          class="col-p5"
        >
          <b-card class="p-2">
            <country-flag :country="section.country_flag" size="normal" />
            <small>&nbsp;&nbsp;{{ section.country }}</small
            ><br />
            <small>{{ section.partner }}</small
            ><br />
            <small
              ><b>{{ section.balance }}</b></small
            >
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-row class="mt-4">
      <b-col class="col-p5">
        <div>
          <b-button-group size="sm">
            <b-button
              v-if="selected_Settlement && selected_Settlement.settle_balance > 0"
              @click="newFundingClick()"
              variant="outline-light"
            >
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
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <label>Contract Number</label>
                        <label>{{ row.item.deal_no }}</label>
                      </b-list-group-item>
                      <b-list-group-item
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <label>USD Rate</label>
                        <label>{{ row.item.dollar_lcy_rate }}</label>
                      </b-list-group-item>

                      <b-list-group-item
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <label>Cost Rate</label>
                        <label>{{ row.item.parent_lcy_rate }}</label>
                      </b-list-group-item>
                      <b-list-group-item
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
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
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <label>Bank Charges</label>
                        <label>{{ row.item.bank_charges }}</label>
                      </b-list-group-item>
                      <b-list-group-item
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <label>Bank Name</label>
                        <label>{{ row.item.bank_name }}</label>
                      </b-list-group-item>
                      <b-list-group-item
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <label>created_by</label>
                        <label>{{ row.item.created_by }}</label>
                      </b-list-group-item>

                      <b-list-group-item
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
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
      ref="add-funding"
      title="Funding Details"
      size="xl"
      @hidden="onHidden()"
      variant="primary"
    >
      <b-card :header="this.updateTrigger ? 'Basic Details' : '' " header-tag="header">
         <div class="errorstyles">
              <div class="z-index">{{ apiSideMessage }}</div>
          </div>
        <b-row>
          <b-col md="4">
            <b-form-group label="Payout Partner">
              <b-form-select
                v-model="temp_funding.payout_partner"
                :options="ppOptions"
                @change="onChangePPoptions($event)"
              ></b-form-select>
            </b-form-group>
             <div class="errorstyles">
              <div class="z-index">{{ temp_funding_error.payout_partner_error }}</div>
          </div>
          </b-col>
          <b-col md="4">
            <b-form-group label="FCY">
              <b-form-input
                v-model="temp_funding.coll_ccy_pay_ccy"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group label="USD Amount">
              <b-form-input
                v-model="temp_funding.lcy_amount"
                @input="changingValue($event)"
                size="sm"
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_funding_error.lcy_amount_error }}</div>
            </div>
          </b-col>
        </b-row>

        <b-row class="mt-2">
          <b-col md="4">
            <b-form-group label="FCY Rate">
              <b-form-input
                v-model="temp_funding.dollar_lcy_rate"
                @input="changingValue($event)"
                size="sm"
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_funding_error.dollar_lcy_rate_error }}</div>
            </div>
          </b-col>

          <b-col md="4">
            <b-form-group label="FCY Converted Amount">
              <b-form-input
                v-model="temp_funding.pp_amount"
                size="sm"
                v-on:keypress="isNumber($event)"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              label="Reference Number"
              label-for="funding-number-id"
            >
              <b-form-input
                id="funding-number-id"
                v-model="temp_funding.funding_number"
                @input="CheckValidity"
                size="sm"
              ></b-form-input>
              <div class="errorstyles" v-if="deal_no_exsites_error_status === 'invalid'">
                <div class="z-index">{{ deal_no_exsites_error }}</div>
              </div>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4">
            <b-form-group label="Purchase Date">
              <b-form-datepicker
                v-model="temp_funding.fund_date"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_funding_error.fund_date_error }}</div>
            </div>
          </b-col>
          <b-col md="4">
            <b-form-group label="Cost Rate" v-if="this.updateTrigger">
              <b-form-input
                v-model="temp_funding.parent_lcy_rate"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <b-form-group label="Partner POC">
              <b-form-input
                v-model="temp_funding.bank_poc"
                size="sm"
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_funding_error.bank_poc_error }}</div>
            </div>
          </b-col>
        </b-row>
      </b-card>

      <b-card v-if="updateTrigger" header="Audit Details" header-tag="header">
        <b-row>
          <b-col md="6">
            <b-form-group label="Created By">
              <b-form-input
                v-model="temp_funding.created_by"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Created Date">
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_funding.created_date"
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
                v-model="temp_funding.updated_by"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Update Date">
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_funding.updated_date"
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
        v-model="temp_funding.remarks"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
      <template #modal-footer="{ }">
        <b-button
          variant="primary"
          @click="
            submit();
          "
        >
          SUBMIT
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag";
import { mapGetters } from "vuex";
import axios from "axios";
import { responseHandler } from "@/helpers/globalFunctions";

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
    if (this.selected_deal_id) {
      this.getSelectedDealDtl();
    }
    this.getPPdetails();
  },
  watch: {
    selected_settlement_id: function (newValue) {
      if (newValue) {
        this.getSelectedSettDtl();
        this.getSelectedSettlemntFunds();
      } else {
        this.selected_Settlement = null;
        this.getAllFunds();
      }
    },
  },
  computed: {
    ...mapGetters(["token", "selected_settlement_id", "selected_deal_id"]),
  },
  data() {
    return {
      base_url: process.env.VUE_APP_TREASURY_SERVICE,
      base_url_p8002: process.env.VUE_APP_SERVER_ENDPOINT,
      updateTrigger: false,
      selected_deal: null,
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
              balance: "27000 USD",
            },
          ],
        },
      ],
      deal_no_exsites_error:"",
      deal_no_exsites_error_status:"pending",
      apiSideMessage:"",
      temp_funding_error: {
        payout_partner_error: "",
        payout_partner_id_error: 1000,
        fund_date_error: "",
        lcy_amount_error: "",
        pp_amount_error: "",
        funding_number_error: "",
        bank_poc_error: "",
        coll_ccy_pay_ccy_error: "",
        lcy_ccy_error:"",
        deal_no_error: "",
        dollar_lcy_rate_error: "",
        parent_lcy_rate_error: "",
        remarks_error:"",
        bank_charges_error: 0.00,
        bank_name_error: "",
      },
      temp_funding: {
        payout_partner: "",
        payout_partner_id: 1000,
        fund_date: "",
        lcy_amount: "",
        pp_amount: "",
        funding_number: "",
        bank_poc: "",
        coll_ccy_pay_ccy: "",
        lcy_ccy:"",
        deal_no: "",
        dollar_lcy_rate: "",
        parent_lcy_rate: "",
        remarks:"",
        bank_charges: 0.00,
        bank_name: "",
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
        {
          key: "payout_partner",
          label: "Payout Partner",
        },
        {
          key: "fund_date",
          label: "Purchase Date",
        },
        {
          key: "lcy_amount",
          label: "USD Amount",
        },
        {
          key: "pp_amount",
          label: "FCY Converted Amount",
        },
        {
          key: "funding_number", //  Need to check that
          label: "Reference Number",
        },
        {
          key: "bank_poc",
          label: "Partner POC",
        },
        {
          key: "coll_ccy_pay_ccy",
          label: "FCY Type",
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
            this.getAllFunds();
      }else{
            console.log("model closing bro when adding");
      }
    },
    async CheckValidity(){
      axios
        .get(this.base_url + `prefund/validate-deal-no?funding_number=${this.temp_funding.funding_number}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          if(response.data.status_code === 200){
              this.deal_no_exsites_error = "";
              this.deal_no_exsites_error_status = "valid";
          }
        })
        .catch((e) => {
            this.deal_no_exsites_error = "This Reference No Alredy Exsists";
            this.deal_no_exsites_error_status = "invalid";
          // responseHandler(e.data.status_code, this, e.data.message)
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
          this.triggerUpdateDeal();
        })
        .catch((e) => {
          responseHandler(e.status_code, this, e.message)
          console.log(e);
        });
    },
    ok() {

      console.log("ok closing ");
    },
    nav_update() {
      console.log("nav update");
    },
    async getSelectedSettlemntFunds() {
      axios
        .get(
          this.base_url +
            "prefund/get-prefund_belong/" +
            this.selected_settlement_id,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          responseHandler(
            response.data.status_code,
            this,
            response.data.message
          );
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
        })
        .catch((e) => {
          responseHandler(e.data.status_code, this, e.data.message);
          console.log(e);
        });
    },
    async getSelectedSettDtl() {
      axios
        .get(
          this.base_url +
            "deal-settlement/get-settlement/" +
            this.selected_settlement_id,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // responseHandler(response.data.status_code, this, response.data.message)
          // this.items = JSON.parse(JSON.stringify(response.data.data[0]));
          this.selected_Settlement = response.data.data[0];
        })
        .catch((e) => {
          responseHandler(e.data.status_code, this, e.data.message);
          console.log(e);
        });
    },
    async getAllFunds() {
      axios
        .get(this.base_url + "prefund/get-all-prefunds", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          responseHandler(
            response.data.status_code,
            this,
            response.data.message
          );
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
        })
        .catch((e) => {
          responseHandler(e.data.status_code, this, e.data.message);
          console.log(e);
        });
    },
    format(date) {
      if (date) {
        date = new Date(date);
        let month = date.toLocaleString("en-US", { month: "short" });
        return date.getDate() + " " + month + " " + date.getFullYear();
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
    submit() {
      
      const request = this.getRequest();
      request.deal_no = this.selected_Settlement.settle_srl_num;
      request.funding_number = Number(request.funding_number);
      if(!this.temp_funding.payout_partner){
        this.temp_funding_error.payout_partner_error = "Please Select the Payout Partner";
      }else{
        this.temp_funding_error.payout_partner_error = "";
      }
      if(!this.temp_funding.lcy_amount){
        this.temp_funding_error.lcy_amount_error = "Please Enter USD Amount";
      }else{
        this.temp_funding_error.lcy_amount_error = "";
      }
      if(!this.temp_funding.dollar_lcy_rate){
        this.temp_funding_error.dollar_lcy_rate_error = "Please Enter FCY Rate";
      }else{
        this.temp_funding_error.dollar_lcy_rate_error = "";
      }
      if(!this.temp_funding.fund_date){
        this.temp_funding_error.fund_date_error = "Please Select Purchase Date";
      }else{
        this.temp_funding_error.fund_date_error = "";
      }
      if(!this.temp_funding.bank_poc){
        this.temp_funding_error.bank_poc_error = "Please Enter Partner POC";
      }else{
        this.temp_funding_error.bank_poc_error = "";
      }
      if (this.updateTrigger) {
        if(this.temp_funding.payout_partner && this.temp_funding.lcy_amount && this.temp_funding.dollar_lcy_rate && this.temp_funding.fund_date && this.temp_funding.bank_poc){
          request.lcy_amount = this.parseUSD(request.lcy_amount);
          request.pp_amount = this.parseUSD(request.pp_amount);
          axios
          .put(
            this.base_url + "prefund/update-prefund/" + request.fund_id,
            request,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          )
          .then((response) => {
            responseHandler(
              response.data.status_code,
              this,
              response.data.message
            );
            if(response.data.status_code === 200){
                  this.$refs['add-funding'].hide();
                  this.$swal({
                        title: "Funding Updated Succesfully",
                        icon: "success",
                        button: "Done",
                 });
                  this.apiSideMessage = "";
            }
            if(response.data.status_code !== 200){
                this.apiSideMessage = response.data.message;
            }
            const index = this.items.findIndex(
              (ele) => ele.fund_id === this.temp_funding.fund_id
            );
            this.items[index] = response.data.data[0];
            this.getSelectedSettDtl();
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message);
            console.log("Deal not posted", err);
          });
        }
      } else {
        request.settl_id = this.selected_settlement_id;
        if(this.temp_funding.payout_partner && this.temp_funding.lcy_amount && this.temp_funding.dollar_lcy_rate && this.temp_funding.fund_date && this.temp_funding.bank_poc){
        request.lcy_amount = this.parseUSD(request.lcy_amount);
        request.pp_amount = this.parseUSD(request.pp_amount);
        axios
          .post(this.base_url + "prefund/prefund-partner", request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            responseHandler(
              response.data.status_code,
              this,
              response.data.message
            );
            if(response.data.status_code === 200){
                  this.$refs['add-funding'].hide();
                  this.$swal({
                        title: "Funding Added Succesfully",
                        icon: "success",
                        button: "Done",
                 });
                  this.apiSideMessage = "";
            }
            if(response.data.status_code !== 200){
                this.apiSideMessage = response.data.message;
            }
           
            this.items.unshift(response.data.data[0]);
            this.getSelectedSettDtl();
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message);
            console.log("Deal not posted", err);
          });
        }
      }
    },
    getRequest() {
      const req = this.temp_funding;
      for (const key of Object.keys(req)) {
        if (
          key === "deal_date" ||
          key === "purchase_date" ||
          key === "updated_date" ||
          key === "approved_aate" ||
          key === "authorized_date"
        ) {
          if (req[key]) {
            req[key] = new Date(req[key]);
          }
        }
      }
      return req;
    },
    onclickUpdate(selectedRow) {
      this.updateTrigger = true;
      selectedRow.parent_lcy_rate = selectedRow.parent_lcy_rate.toFixed(4);
      selectedRow.lcy_amount = this.formatUSD(selectedRow.lcy_amount);
      selectedRow.pp_amount = this.formatUSD(selectedRow.pp_amount);
      this.temp_funding = selectedRow;
      this.temp_funding_error = {
        payout_partner_error: "",
        payout_partner_id_error: 1000,
        fund_date_error: "",
        lcy_amount_error: "",
        pp_amount_error: "",
        funding_number_error: "",
        bank_poc_error: "",
        coll_ccy_pay_ccy_error: "",
        lcy_ccy_error:"",
        deal_no_error: "",
        dollar_lcy_rate_error: "",
        parent_lcy_rate_error: "",
        remarks_error:"",
        bank_charges_error: 0.00,
        bank_name_error: "",
      }
    },
    changingValue(){
      this.temp_funding.lcy_amount = this.formatUSD(this.parseUSD(this.temp_funding.lcy_amount));
      if(this.temp_funding.lcy_amount){
        this.temp_funding.remarks = "Funding to " + this.temp_funding.payout_partner + " " + this.temp_funding.lcy_amount;
      }
      var temp_pp_amount = (this.parseUSD(this.temp_funding.lcy_amount) * this.temp_funding.dollar_lcy_rate).toFixed(4);
      this.temp_funding.pp_amount = this.formatUSD(this.parseUSD(temp_pp_amount));
      // this.temp_funding.parent_lcy_rate = this.temp_funding.dollar_lcy_rate / this.selected_deal.fcy_deal_rate;
    },
    newFundingClick() {
      this.$refs['add-funding'].show();
       this.deal_no_exsites_error = "";
       this.deal_no_exsites_error_status = "valid";
      this.updateTrigger = false; 
      // Reset temp 
      this.temp_funding_error = {
        payout_partner_error: "",
        payout_partner_id_error: 1000,
        fund_date_error: "",
        lcy_amount_error: "",
        pp_amount_error: "",
        funding_number_error: "",
        bank_poc_error: "",
        coll_ccy_pay_ccy_error: "",
        lcy_ccy_error:"",
        deal_no_error: "",
        dollar_lcy_rate_error: "",
        parent_lcy_rate_error: "",
        remarks_error:"",
        bank_charges_error: 0.00,
        bank_name_error: "",
      }
      this.temp_funding = {
        payout_partner: "",
        payout_partner_id: 1000,
        fund_date: "",
        lcy_amount: "",
        pp_amount: "",
        funding_number: "",
        bank_poc: "",
        coll_ccy_pay_ccy: "",
        lcy_ccy:"",
        deal_no: "",
        remarks:"",
        dollar_lcy_rate: 0.00,
        parent_lcy_rate: this.temp_funding.lcy_amount * this.selected_deal.fcy_deal_rate,
        bank_charges: 0.00,
      };
    },
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      let val = e.target.value; // Get the value
      if (/^\d*\.?\d{0,4}$/.test(char) && /^\d*\.?\d{0,3}$/.test(val))
        return true;
      // Match with regex
      // if(/^[0-9]+$/.test(char)) return true; // Match with regex
      else e.preventDefault(); // If not match, don't add to input text
    },
    async getPPdetails() {
      axios
        .get(
          this.base_url_p8002 + "/partner_details/get-partners-limited-field",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // responseHandler(response.data.status_code, this, response.data.message)
          // this.selected_deal = response.data.data;
          this.formatPPoptions(response.data.data);
        })
        .catch((e) => {
          responseHandler(e.status_code, this, e.message);
          console.log(e);
        });
    },
    formatPPoptions(data) {
      if (data && data.length > 0) {
        this.ppOptions = [];
        data.forEach((ele) => {
          this.ppOptions.push({
            text: ele.name_of_employer,
            value: ele.name_of_employer,
            pp_ccy: ele.local_currency, // Remove after api chnage and uncomment below
            // pp_ccy: ele.pp_ccy
          });
        });
      }
    },
    onChangePPoptions(eve) {
      console.log(eve);
      this.temp_funding.coll_ccy_pay_ccy = this.ppOptions.find(
        (ele) => ele.value === eve
      )?.pp_ccy;
    },
    deleteFund(selectedRow) {
      axios
        .delete(
          this.base_url + "prefund/delete-prefund/" + selectedRow.fund_id,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          responseHandler(
            response.data.status_code,
            this,
            response.data.message
          );
          if (response.data.success) {
            const index = this.items.findIndex(
              (ele) => ele.fund_id === selectedRow.fund_id
            );
            this.items.splice(index, 1);
            this.getSelectedSettDtl();
          }
        })
        .catch((err) => {
          responseHandler(err.data.status_code, this, err.data.message);
          console.log("Deal not posted", err);
        });
    },
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