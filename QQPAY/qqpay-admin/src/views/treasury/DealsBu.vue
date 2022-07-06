<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light"  @click="newDeal();">
              <b-icon icon="file-earmark-plus-fill"></b-icon>
              New Deal
            </b-button>
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
      <b-col>
        <b-form-group label-for="filter-input" label-cols-sm="0" label-cols-lg="0" label-align-lg="right"
          content-cols-sm="12" content-cols-lg="8" label-align-sm="right" label-size="sm" class="mb-2">
          <b-input-group size="sm">
            <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table :items="items" :fields="fields" :filter="filter" responsive class="align-middle">
      <template #cell(item)="row">
        {{ row.item.remitter }}
      </template>
      <template #cell(deal_date)="row">{{ format(row.item.deal_date) }}
      </template>
      <template #cell(actions)="row" size="sm">
        <div class="action-div">
          <b-button variant="light" size="sm" @click="row.toggleDetails" class="mr-2 expand-btn">
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
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Contract Number</label>
                        <label>{{ row.item.deal_no }}</label>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Source of Fund</label>
                        <label>{{ row.item.source_of_funds }}</label>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>PP CCY</label>
                        <label>{{ row.item.pp_ccy }}</label>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Purchase Date</label>
                        <label>{{ format(row.item.purchase_date) }}</label>
                      </b-list-group-item>

                    </b-list-group>
                  </div>
                </b-col>

                <b-col sm="12" md="6" lg="6">
                  <div class="menu-sec">
                    <b-list-group flush>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Dealer</label>
                        <label>{{ row.item.bank_poc }}</label>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Created by</label>
                        <label>{{ row.item.created_by }}</label>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Edited by</label>
                        <label>{{ row.item.edited_by }}</label>
                      </b-list-group-item>                                           
                    </b-list-group>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col sm="12" md="6" lg="3">
              <!-- <b-col > -->
              <div class="menu-sec">
                <b-button variant="outline-light" size="sm" class="wd-100p mb-2 btn-light"
                  @click="onclickUpdate(row.item)">
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  Update
                </b-button>

                <b-button variant="outline-light" size="sm" class="wd-100p mb-2 btn-light" @click="deleteClick(row.item)">
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
                </b-button>
              </div>
              <!-- </b-col> -->
            </b-col>
          </b-row>

        </b-card>
      </template>
    </b-table>
    <b-modal id="add-dealBu" ref="add-dealBu" title="Deal Details"  size="xl" variant="primary" @hidden="onHidden()">
      <b-card header="Basic Details" header-tag="header">
        <b-row>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Business User">
               <b-form-select v-model="temp_dealBu.remitter" :options="remmeiterOptions"></b-form-select>
              <!-- <b-form-input v-model="temp_dealBu.remitter" ></b-form-input> -->
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_dealBu_error.remitter_error }}</div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group  label="Booking date">
              <b-form-datepicker id="example-datepicker" v-model="temp_dealBu.deal_date" :date-disabled-fn="dateDisabled"  class="mb-2" size="sm">
              </b-form-datepicker>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_dealBu_error.deal_date_error }}</div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Deal No">
              <b-form-input v-model="temp_dealBu.deal_no" @input = "CheckDealNo" size="sm"></b-form-input>
            </b-form-group>
             <div class="errorstyles" v-if="deal_no_exsites_error_status === 'invalid'">
              <div class="z-index">{{ deal_no_exsites_error }}</div>
            </div>
             <div class="errorstyles">
              <div class="z-index">{{ temp_dealBu_error.deal_no_error }}</div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="LCY Amount">
              <b-form-input type = "number" v-model="temp_dealBu.rate_usd_myr" size="sm"></b-form-input>
            </b-form-group>
             <div class="errorstyles">
              <div class="z-index">{{ temp_dealBu_error.rate_usd_myr_error }}</div>
            </div>
          </b-col>

          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Value Date" >
              <b-form-datepicker id="purchase-datepicker" v-model="temp_dealBu.purchase_date" :date-disabled-fn="dateDisabled"  class="mb-2" size="sm">
              </b-form-datepicker>
            </b-form-group>
             <div class="errorstyles">
              <div class="z-index">{{ temp_dealBu_error.purchase_date_error }}</div>
            </div>
          </b-col>
           <b-col sm="12" md="4" lg="4">
            <b-form-group label="FCY Amount">
              <b-form-input v-model="temp_dealBu.pp_amount" size="sm"></b-form-input>
            </b-form-group>
             <div class="errorstyles">
              <div class="z-index">{{ temp_dealBu_error.pp_amount_error }}</div>
            </div>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="FCY Rate">
              <b-form-input v-model="temp_dealBu.usd_amount" size="sm"></b-form-input>
            </b-form-group>
             <div class="errorstyles">
              <div class="z-index">{{ temp_dealBu_error.usd_amount_error }}</div>
            </div>
          </b-col>

          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Source of funds">
              <b-form-select v-model="temp_dealBu.source_of_funds" :options="fundSourceOption"></b-form-select>
            </b-form-group>
            <div class="errorstyles">
              <div class="z-index">{{ temp_dealBu_error.source_of_funds_error }}</div>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <b-card v-if="updateTrigger" header="Audit Details" header-tag="header">
        <b-row> 
         <b-col  md="6">
            <b-form-group label="Created By">
              <b-form-input
                v-model="temp_dealBu.created_by"
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
                v-model="temp_dealBu.created_date"
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
                v-model="temp_dealBu.updated_by"
                size="sm"
                disabled
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Update Date">
              <b-form-datepicker
                id="example-datepicker"
                v-model="temp_dealBu.updated_date"
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
        v-model="temp_dealBu.remarks"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <template #modal-footer="{}">
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
  name: "DealsBu",
  components: {

  },
  created() {
    this.getContract();
    this.getBusinusUsers();
  },
  computed: {
    ...mapGetters([
      "token",
    ]),
    getAmtAndRate() {
      return {
        amt: this.temp_dealBu.usd_amount,
        rate: this.temp_dealBu.coll_amount
      };
    }
  },
  watch: {
    getAmtAndRate: function (newValue) {
      console.log(newValue, 'new value')
      if (newValue.amt >= 0 && newValue.rate >= 0) {
        this.temp_dealBu.coll_amount = (
          newValue.amt *
          newValue.rate
        ).toFixed(2);
      }
    },
  },

  data() {
    return {
      treasury_ser_base_url: process.env.VUE_APP_TREASURY_SERVICE,
      base_url: process.env.VUE_APP_TREASURY_SERVICE,
       base_url_get: 'http://3.111.47.115:5001/api/v1/',
      filter: null,
      dealsTableData: null,
      updateTrigger: false,
      remmeiterOptions:[],
      // dealOption: [
      //   { value: 'i', text: 'Inward' },
      //   { value: 'o', text: 'Outward' },
      //   { value: 'irh', text: 'IRH' },
      // ],
      fundSourceOption: [
        { value: 'type1', text: 'Fund 1' },
        { value: 'type2', text: 'Fund 2' },
      ],
      deal_no_exsites_error : "",
      deal_no_exsites_error_status : "pending",
      temp_dealBu_error: {
        remitter_error: "",
        deal_date_error: "",
        source_of_funds_error: "",
        coll_amount_error: null,
        rate_usd_myr_error: null,
        usd_amount_error: null,
        rate_coll_error: null,
        pp_ccy_error: "",
        pp_amount_error: null,
        deal_no_error: null,
        purchase_date_error: "",
        status_error: "open",
        bank_poc_error: "",
        remarks_error:"",
      },

      temp_dealBu: {
        remitter: "",
        deal_date: "",
        source_of_funds: "",
        coll_amount: null,
        rate_usd_myr: null,
        usd_amount: null,
        rate_coll: null,
        pp_ccy: "inr",
        pp_amount: null,
        deal_no: null,
        purchase_date: "",
        status: "open",
        bank_poc: "",
        remarks:"",
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
          key: 'remitter',
          label: 'Business User',
        },
        {
          key: 'deal_date',
          label: 'Booking Date',
        },
        // {
        //   key: 'source_of_funds',
        //   label: 'Source of Funds',
        // },

      

     

        {
          key: 'usd_amount',
          label: 'FCY Rate',
        },

        // {
        //   key: 'pp_ccy',
        //   label: 'PP CCY',
        // },

        {
          key: 'pp_amount',
          label: 'FCY Amount',
        },
        {
          key: 'status',
          label: 'Status',
        },
        { key: "actions", label: "" },
      ],
      items: [],
    };
  },
  methods: {
    ok() {
      console.log("ok");
    },
    nav_update() {
      console.log("nav update");
    },
    dateDisabled(ymd, date) {
        // Disable weekends (Sunday = `0`, Saturday = `6`) and
        // disable days that fall on the 13th of the month
        const weekday = date.getDay()
        const day = date.getDate()
        // Return `true` if the date should be disabled
        return weekday === 0 || weekday === 6 || day ===  1 || day ===  2 || day ===  3 || day ===  7 || day ===  8 || day ===  9 || day ===  10 || day ===  11 || day ===  12 || day ===  13 || day ===  14 || day ===  15 || day ===  16 || day ===  17
               || day ===  18 || day ===  19 || day ===  20 || day ===  21 || day ===  22 || day ===  23 || day ===  24 || day ===  25 || day ===   26 || day ===   27|| day ===  28 || day ===  29 || day ===  30
    },
    postDealData() {
       if(!this.temp_dealBu.pp_ccy){
          this.temp_dealBu_error.pp_ccy_error = "FCY Rate Is Required"
      }else{
          this.temp_dealBu_error.pp_ccy_error = ""
      }
      if(!this.temp_dealBu.remitter){
          this.temp_dealBu_error.remitter_error = "Businuss User Is Required"
      }else{
          this.temp_dealBu_error.remitter_error = ""
      }
      if(!this.temp_dealBu.deal_date){
          this.temp_dealBu_error.deal_date_error = "Deal Date Is Required"
      }else{
          this.temp_dealBu_error.deal_date_error = ""
      }
      if(!this.temp_dealBu.source_of_funds){
          this.temp_dealBu_error.source_of_funds_error = "source of funds Is Required"
      }else{
          this.temp_dealBu_error.source_of_funds_error = ""
      }
     
      if(!this.temp_dealBu.purchase_date){
          this.temp_dealBu_error.purchase_date_error = "Value Date Is Required"
      }else{
          this.temp_dealBu_error.purchase_date_error = ""
      }
      if(!this.temp_dealBu.deal_no){
          this.temp_dealBu_error.deal_no_error = "Deal No Is Required"
      }else{
          this.temp_dealBu_error.deal_no_error = ""  
      }
      if(!this.temp_dealBu.rate_usd_myr){
          this.temp_dealBu_error.rate_usd_myr_error = "LCY Amount Is Required"
      }else{
          this.temp_dealBu_error.rate_usd_myr_error = ""   
      }
      if(!this.temp_dealBu.pp_amount){
          this.temp_dealBu_error.pp_amount_error = "FCY Amount Is Required"
      }else{
          this.temp_dealBu_error.pp_amount_error = ""   
      }

     

      
      const request = this.getRequest();

      if (this.updateTrigger) {
        
        const date = new Date(request.deal_date);
        const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        request.deal_date = [date.getFullYear(), mnth, day].join("-");

        const date1 = new Date(request.deal_date);
        const mnth1 = ("0" + (date1.getMonth() + 1)).slice(-2);
        const day1 = ("0" + date1.getDate()).slice(-2);
        request.deal_date = [date1.getFullYear(), mnth1, day1].join("-");
   
       
        if(this.temp_dealBu.pp_amount && this.temp_dealBu.rate_usd_myr && this.temp_dealBu.deal_no && this.temp_dealBu.purchase_date && this.temp_dealBu.source_of_funds && this.temp_dealBu.deal_date && this.temp_dealBu.remitter){
       
          const temp_bus_deal = 
          {
          "remitter": request.remitter,
          "deal_date": request.deal_date,
          "source_of_funds": request.source_of_funds,
          "coll_amount": request.coll_amount,
          "rate_usd_myr": request.rate_usd_myr,
          "usd_amount": request.usd_amount,
          "rate_coll": request.rate_coll,
          "pp_ccy": request.pp_ccy,
          "pp_amount": request.pp_amount,
          "deal_no": request.deal_no,
          "purchase_date": request.purchase_date,
          "status": request.status,
          "bank_poc": request.bank_poc
        }
        axios.put(this.base_url + "business/update-business-deal/" + request.deal_id, temp_bus_deal, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((response) => {
            if(response.data.status_code === 200){
                this.$refs['add-dealBu'].hide();
                this.$swal({
                        title: "Deal Updated Succesfully",
                        icon: "success",
                        button: "Done",
                });
              }
            responseHandler(response.data.status_code, this, response.data.message)
            console.log(response.data.data);
            const index = this.items.findIndex(ele => ele.deal_id === this.temp_dealBu.deal_id);
            this.items[index] = response.data.data[0];
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Deal not posted', err);
          });
        }
      } else {
        let body = JSON.parse(JSON.stringify(request))
         body.deal_date = body.deal_date.slice(0,10);
          console.log("request", request)
           if(this.temp_dealBu.pp_amount && this.temp_dealBu.rate_usd_myr && this.temp_dealBu.deal_no && this.temp_dealBu.purchase_date && this.temp_dealBu.source_of_funds && this.temp_dealBu.deal_date && this.temp_dealBu.remitter){
        axios.post(this.base_url + "business/new-business-deal", body, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((response) => {
            if(response.data.status_code === 200){
                this.$refs['add-dealBu'].hide();
                this.$swal({
                        title: "Deal Added Succesfully",
                        icon: "success",
                        button: "Done",
                });
              }
            responseHandler(response.data.status_code, this, response.data.message)
            console.log(response.data.data)
            this.items.push(response.data.data[0]);
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Deal not posted', err);
          });
           }
      }
    },
     onHidden(){
      if(this.updateTrigger){
            console.log("model closing bro when updating");
            this.getContract();
      }else{
            console.log("model closing bro when adding");
      }
    },
    getRequest() {
      console.log("temp", this.temp_dealBu)
      const req = this.temp_dealBu;
      for (const key of Object.keys(req)) {
        console.log(key, req[key]);
        if (key === 'deal_date' || key === 'purchase_date' || key === 'updated_date' ) {
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
        .get(this.base_url + "business/get-all-business-deals", {
          headers: {
            Authorization: `Bearer ${this.token}`,
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
    onclickUpdate(selectedRow) {
       this.$refs['add-dealBu'].show();
      this.updateTrigger = true;
      console.log('slected', selectedRow)
      this.temp_dealBu = selectedRow;
    },
    newDeal() {
      this.$refs['add-dealBu'].show();
      this.updateTrigger = false;
      this.temp_dealBu = {
        remitter: "",
        deal_date: "",
        source_of_funds: "",
        coll_amount: null,
        rate_usd_myr: null,
        usd_amount: null,
        rate_coll: null,
        pp_ccy: "inr",
        pp_amount: null,
        deal_no: null,
        purchase_date: "",
        status: "open",
        bank_poc: "",
        remarks:"",
      }
    },
    deleteClick(selectedRow) {
      axios.delete(this.base_url + "business/delete-business-deal/" + selectedRow.deal_id, {
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
    getBusinusUsers(){
       axios.get(this.base_url_get + "business_user_kyc/get_all_companies",{
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((response) => {
            // this.remmeiterOptions = response.data.data;
            this.formatPPoptions(response.data.data);
            responseHandler(response.data.status_code, this, response.data.message)
            console.log(response.data.data);
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Data Not Getting', err);
          });
    },
    formatPPoptions(data) {
      if (data && data.length > 0) {
        this.remmeiterOptions = [];
        data.forEach((ele) => {
          this.remmeiterOptions.push({
            text: ele.registered_business_name,
            value: ele.registered_business_name,
           
          });
        });
      }
    },
    async CheckDealNo(){
      axios
        .get(this.treasury_ser_base_url + `new-contract/validate-deal-no?deal_no=${this.temp_dealBu.deal_no}`, {
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
  color: $txt  !important;
  border-color: $primary  !important;
}

.btn-secondary {
  background: $txt  !important;
}

.row {
  margin: 5px;
}

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

.expand-btn {
  color: $primary  !important;
  border: none !important;
  background: $white  !important;
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
  color: $txt  !important;
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
  color: $primary  !important;
}
</style>