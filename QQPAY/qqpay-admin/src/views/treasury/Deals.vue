<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light"  @click="newDealClicked()">
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
      <!-- <template #cell(fcy_amount)="row">
        {{ formatUsd(parseUSD(row.item.fcy_amount)) }}
      </template> -->
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
                      <label>Value Date</label>
                      <label>{{ format(row.item.purchase_date) }}</label>
                    </b-list-group-item>

                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label>Created by</label>
                      <label>{{ row.item.created_by_name }}</label>
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
                      <label>Dealer</label>
                      <label>{{ row.item.bank_poc }}</label>
                    </b-list-group-item>

                  </b-list-group>
                </div>
              </b-col>

              <b-col sm="12" md="6" lg="6">
                <div class="menu-sec">
                  <b-list-group flush>
                    

                    <!-- <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label>Target of funds</label>
                      <label>{{ row.item.tof }}</label>
                    </b-list-group-item> -->

                    <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                    >
                      <label>Edited by</label>
                      <label>{{ row.item.updated_by_name }}</label>
                    </b-list-group-item>

                    <!-- <b-list-group-item
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
                    </b-list-group-item> -->
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
                  @click="deleteDeal(row.item)"
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
      ref="add-deal"
      title="Deal Details"
      size="xl"
      @ok="ok"
      @hidden="onHidden()"
      variant="primary"
      no-close-on-backdrop
    >
      <b-card :header="this.updateTrigger ? 'Basic Details' : '' " header-tag="header">
        <b-row>
          
          <div class="errorstyles">
              <div class="z-index">{{ apiSideMessage }}</div>
            </div>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Deal Type">
              <!-- <b-form-input
                v-model="temp_deal.deal_type"
                size="sm"
              ></b-form-input> -->
              <b-form-select v-model="temp_deal.deal_type" :options="dealOption" required></b-form-select>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_deal_errors.deal_type_error }}</div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group
              label="Booking Date"
            >
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_deal.deal_date"
                :min="new Date().toISOString().substr(0, 10)"
                class="mb-2"
                :date-disabled-fn="dateDisabled" 
                size="sm"
                required
              >
              </b-form-datepicker>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_deal_errors.deal_date_error }}</div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Deal No">
              <b-form-input
                v-model="temp_deal.deal_no"
                @input = "CheckDealNo"
                size="sm"
                required
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles" v-if="deal_no_exsites_error_status === 'invalid'">
              <div class="z-index">{{ deal_no_exsites_error }}</div>
            </div>
             <div class="errorstyles">
              <div class="z-index">{{ temp_deal_errors.deal_no_error }}</div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="USD Amount">
              <b-form-input
                v-model="temp_deal.fcy_amount"
                @change="handleChange"
                @input="ChangeUsdAmountFormat();handleChange()"
                size="sm"
                required
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_deal_errors.fcy_amount_error }}</div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Exchange Rate">
              <b-form-input
                v-model="temp_deal.fcy_deal_rate"
                @input="handleChange"
                size="sm"
                v-on:keypress="isNumber($event)"
                required
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_deal_errors.fcy_deal_rate_error }}</div>
            </div>
          </b-col>

          <b-col sm="12" md="4" lg="4">
            <b-form-group label="LCY Amount">
              <b-form-input
                v-model="temp_deal.lcy_amount"
                @change="handleChange"
                size="sm"
                v-on:keypress="isNumber($event)"
                required
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
        
        </b-row>
        <b-row align-h="start">
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Source of funds">
              <b-form-input v-if="temp_deal.deal_type !== 'O'"
                v-model="temp_deal.source_of_funds"
                size="sm"
                required
              ></b-form-input>
              <b-form-select v-if="temp_deal.deal_type === 'O'" v-model="temp_deal.source_of_funds" :options="fundSourceOption"></b-form-select>
            </b-form-group>
            <!-- <div class="errorstyles">
              <div class="z-index">{{ temp_deal_errors.source_of_funds_error }}</div>
            </div> -->
          </b-col>  
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Value Date">
              <b-form-datepicker
                id="purchase-datepicker"
                v-model="temp_deal.purchase_date"
                :date-disabled-fn="dateDisabled" 
                class="mb-2"
                size="sm"
                required
              ></b-form-datepicker>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_deal_errors.purchase_date_error }}</div>
            </div>
          </b-col> 
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Dealer">
              <b-form-input
                v-model="temp_deal.bank_poc"
                size="sm"
              ></b-form-input>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_deal_errors.bank_poc_error }}</div>
            </div>
          </b-col>         
        </b-row>
      </b-card>

       <b-card v-if="updateTrigger" header="Audit Details" header-tag="header">
        <b-row> 
         <b-col  md="6">
            <b-form-group label="Created By">
              <b-form-input
                v-model="temp_deal.created_by"
                size="sm"
                disabled
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Created Date">
               <b-form-datepicker
                id="example-datepicker"
                v-model="temp_deal.created_date"
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
                v-model="temp_deal.updated_by"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Update Date">
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_deal.updated_date"
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
        v-model="temp_deal.remarks"
        rows="3"
        max-rows="6"
      >
      </b-form-textarea>
      <template #modal-footer="{ }">
        <b-button variant="primary" @click="postDealData()"> SUBMIT </b-button>
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

    // let x = 10000.59;
    // console.log(x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    this.$root.$refs.Deals = this;
    this.getContract();
  },
  mounted() {
    this.$root.$on('selectedDealEventing', data => {
      if (data) {
        const index = this.items.findIndex(ele => ele.deal_id === data.deal_id);
        this.items[index] = data;
        this.items = JSON.parse(JSON.stringify(this.items));  
      }
    });
  },
  computed: {
    ...mapGetters([
      "token",
      "base_url",
    ]),

  },
  watch: {
    
  },
  
  data() {
    return {
      treasury_ser_base_url: process.env.VUE_APP_TREASURY_SERVICE,
      filter: null,
      dealsTableData: null,
      updateTrigger: false,
      limit:{min: '30/6/2022', max: '4/7/2022'},
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
      deal_no_exsites_error:"",
      deal_no_exsites_error_status:"pending",
      apiSideMessage:"",
       temp_deal_errors: {
        deal_type_error: "",
        deal_date_error: "",
        deal_no_error: "",
        fcy_amount_error: "",  // USD Amt
        fcy_deal_rate_error: "",
        lcy_amount_error: "",    //MYR Amt
        source_of_funds_error: "Public Bank MYR",
        purchase_date_error: "",
        bank_charge_error: 0,
        tof_error: "Target Bank USD",          // Target of fund
        bank_poc_error: "",
        tax_error: "",
        remarks_error: "",
        no_of_settlements_error: "",
        status_error: ""
      },
      temp_deal: {
        deal_type: "",
        deal_date: "",
        deal_no: "",
        fcy_amount: "",  // USD Amt
        fcy_deal_rate: "",
        lcy_amount: "",    //MYR Amt
        source_of_funds: "Public Bank MYR",
        purchase_date: "",
        bank_charge: 0,
        tof: "Target Bank USD",          // Target of fund
        bank_poc: "",
        tax: "",
        remarks: "Buying USD 20,000 @ 4.11111 by selling MYR 82222.00",
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
          label: 'Booking Date',
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
      ],
    };
  },
  methods: {
    onHidden(){
      if(this.updateTrigger){
            console.log("model closing bro when updating");
            this.getContract();
      }else{
            console.log("model closing bro when adding");
      }
    },
    ChangeUsdAmountFormat(){
      this.temp_deal.fcy_amount = this.formatUSD(this.parseUSD(this.temp_deal.fcy_amount));
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
    async CheckDealNo(){
      axios
        .get(this.treasury_ser_base_url + `new-contract/validate-deal-no?deal_no=${this.temp_deal.deal_no}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          if(response.data.status_code === 200){
            console.log("inside true");
              this.deal_no_exsites_error = "";
              this.deal_no_exsites_error_status = "valid";
          }
        
          console.log("response", response.data.status_code);
        })
        .catch((e) => {
           this.deal_no_exsites_error = "This Deal No is Already Exists";
            this.deal_no_exsites_error_status = "invalid";
          responseHandler(e.data.status_code, this, e.data.message)
          console.log(e);
        });
    },
    dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6 || day ===  1 || day ===  2 || day ===  3 || day ===  4  || day ===  5  || day ===  9 || day ===  10 || day ===  11 || day ===  12 || day ===  13 || day ===  14 || day ===  15 || day ===  16 || day ===  17
               || day ===  18 || day ===  19 || day ===  20 || day ===  21 || day ===  22 || day ===  23 || day ===  24 || day ===  25 || day ===   26 || day ===   27|| day ===  28 || day ===  29 || day ===  30
    },
    handleChange() {
        // console.log(value);
        if(this.temp_deal.fcy_amount != "" && this.temp_deal.fcy_deal_rate != ""){
          var temp_lcy_amount = (this.parseUSD(this.temp_deal.fcy_amount) * this.temp_deal.fcy_deal_rate).toFixed(2);
          this.temp_deal.lcy_amount = this.formatUSD(temp_lcy_amount);
          this.temp_deal.remarks = "Buying USD " +  this.temp_deal.fcy_amount + "@" +  this.temp_deal.fcy_deal_rate + " by selling MYR " + this.temp_deal.lcy_amount;
        }   
    },
    ok() {
      console.log("ok closing ");
    },
    nav_update() {
      console.log("nav update");
    },
    onInputBlue(){

    },
    postDealData() {

    
      if(!this.temp_deal.deal_type){
          this.temp_deal_errors.deal_type_error = "Deal Type Is Required"
      }else{
          this.temp_deal_errors.deal_type_error = ""
      }
      if(!this.temp_deal.deal_date){
          this.temp_deal_errors.deal_date_error = "Deal Date Is Required"
      }else{
           this.temp_deal_errors.deal_date_error = ""
      }
      if(!this.temp_deal.deal_no){
          this.temp_deal_errors.deal_no_error = "Deal No Is Required"
      }else{
           this.temp_deal_errors.deal_no_error = ""
      }
      if(!this.temp_deal.fcy_amount){
          this.temp_deal_errors.fcy_amount_error = "USD Amount Is Required"
      }else{
           this.temp_deal_errors.fcy_amount_error = ""
      }
      if(!this.temp_deal.fcy_deal_rate){
          this.temp_deal_errors.fcy_deal_rate_error = "Exchange Rate Is Required"
      }else{
           this.temp_deal_errors.fcy_deal_rate_error = ""
      }
      if(!this.temp_deal.source_of_funds){
          this.temp_deal_errors.source_of_funds_error = "Source of Funds Is Required"
      }else{
           this.temp_deal_errors.source_of_funds_error = ""
      }
      if(!this.temp_deal.purchase_date){
          this.temp_deal_errors.purchase_date_error = "Value Date Is Required"
      }else{
           this.temp_deal_errors.purchase_date_error = ""
      }
      if(!this.temp_deal.bank_poc){
          this.temp_deal_errors.bank_poc_error = "Dealer Is Required"
      }else{
           this.temp_deal_errors.bank_poc_error = ""
      }
      const request = this.getRequest();
      // request.fcy_amount = this.parseUSD(this.temp_deal.fcy_amount);
      // console.log('req', JSON.parse(JSON.stringify(request)))
      if (this.updateTrigger) {
        
        if(this.temp_deal.deal_type && this.temp_deal.deal_date && this.temp_deal.deal_no && this.temp_deal.fcy_amount && this.temp_deal.fcy_deal_rate && this.temp_deal.lcy_amount && this.temp_deal.source_of_funds && this.temp_deal.bank_poc && this.temp_deal.purchase_date){
            request.fcy_amount = this.parseUSD(request.fcy_amount)
            request.lcy_amount = this.parseUSD(request.lcy_amount)
          axios.put(this.treasury_ser_base_url + "new-contract/update-contract/" + request.deal_id, request, {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
            .then((response) => {
              if(response.data.status_code === 200){
                this.$refs['add-deal'].hide();
                this.$swal({
                        title: "Deal Updated Succesfully",
                        icon: "success",
                        button: "Done",
                });
              }
              
              
              responseHandler(response.data.status_code, this, response.data.message)
              const index = this.items.findIndex(ele => ele.deal_id === this.temp_deal.deal_id);
              this.items[index] = response.data.data[0];
              if (this.$root.$refs.Settlements) {
                this.$root.$refs.Settlements.getSelectedDealDtl();
              }
            })
            .catch((err) => {
              responseHandler(err.data.status_code, this, err.data.message)
              console.log('Deal not posted', err);
          });
        }

      } else {
        //flag for add
        // request.fcy_amount = this.parseUSD(this.temp_deal.fcy_amount);
        if(this.temp_deal.deal_type && this.temp_deal.deal_date && this.temp_deal.deal_no && this.temp_deal.fcy_amount && this.temp_deal.fcy_deal_rate && this.temp_deal.lcy_amount && this.temp_deal.source_of_funds && this.temp_deal.bank_poc && this.temp_deal.purchase_date && this.deal_no_exsites_error_status === 'valid'){
          request.fcy_amount = this.parseUSD(request.fcy_amount)
          request.lcy_amount = this.parseUSD(request.lcy_amount)
          axios.post(this.treasury_ser_base_url + "new-contract/new-contract", request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
            .then((response) => {
              responseHandler(response.data.status_code, this, response.data.message)
              if(response.data.status_code === 200){
                this.apiSideMessage = "";
                this.$refs['add-deal'].hide();
                this.$swal({
                        title: "Deal Added Succesfully",
                        icon: "success",
                        button: "Done",
                });

              }
              if(response.data.status_code != 200){
                this.apiSideMessage = response.data.message;
              }
              this.items.unshift(response.data.data[0]);
            })
            .catch((err) => {
              this.apiSideMessage = err.data.message;
              responseHandler(err.data.status_code, this, err.data.message)
              console.log('Deal not posted', err);
          });
        }       
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
      axios
        .get(this.treasury_ser_base_url + "new-contract/get-all-contract", {
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
      this.$refs['add-deal'].show();
      this.resetTempDeals();
      this.updateTrigger = false;
      this.temp_deal.status = "open";
      this.temp_deal.no_of_settlements = 0;
    },
    resetTempDeals() {
      this.deal_no_exsites_error = "";
      this.deal_no_exsites_error_status = "valid";
      this.temp_deal_errors = {
        deal_type_error: "",
        deal_date_error: "",
        deal_no_error: "",
        fcy_amount_error: "",  // USD Amt
        fcy_deal_rate_error: "",
        lcy_amount_error: "",    //MYR Amt
        source_of_funds_error: "Public Bank MYR",
        purchase_date_error: "",
        bank_charge_error: 0,
        tof_error: "Target Bank USD",          // Target of fund
        bank_poc_error: "",
        tax_error: "",
        remarks_error: "",
        no_of_settlements_error: "",
        status_error: ""
      },
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
      this.$refs['add-deal'].show();
      this.updateTrigger = true;
      selectedRow.fcy_amount = this.formatUSD(selectedRow.fcy_amount);
      selectedRow.lcy_amount = this.formatUSD(selectedRow.lcy_amount);
      this.temp_deal = selectedRow;
      this.temp_deal_errors = {
        deal_type_error: "",
        deal_date_error: "",
        deal_no_error: "",
        fcy_amount_error: "",  // USD Amt
        fcy_deal_rate_error: "",
        lcy_amount_error: "",    //MYR Amt
        source_of_funds_error: "Public Bank MYR",
        purchase_date_error: "",
        bank_charge_error: 0,
        tof_error: "Target Bank USD",          // Target of fund
        bank_poc_error: "",
        tax_error: "",
        remarks_error: "",
        no_of_settlements_error: "",
        status_error: ""
      }
    },
    deleteDeal(selectedRow) {
      axios.delete(this.treasury_ser_base_url + "new-contract/delete-contract/" + selectedRow.deal_id, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          responseHandler(response.data.status_code, this, response.data.message)
          if (response.data.success) {
            const index = this.items.findIndex(ele => ele.deal_id === selectedRow.deal_id);
            this.items.splice(index, 1);
          }
        })
        .catch((err) => {
          responseHandler(err.data.status_code, this, err.data.message)
          console.log('Deal not posted', err);
      });
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