<template>
  <div class=" bor m-auto p-3">
    <!-- <div class="d-flex justify-content-between m-auto  mb-5"> -->
      <b-row>
      <b-col md="2">
        <b-form-group class="" label="Payout Partner">
              <b-form-select
                class=""
                v-model="search_data.partner"
                :options="ppOptions"
                @change="onChangePPoptions($event)"           
              ></b-form-select>
        </b-form-group>
      </b-col>
     
      <b-col md="3">
          <b-form-group label="Start Date">
              <b-form-datepicker
                id="start-date-datepicker"
                v-model="search_data.from_date"
                class=""
                size="sm"
              ></b-form-datepicker>
          </b-form-group>
        <!-- <input type="date" class="w-100 text-inp" /> -->
      </b-col>
      <b-col md="3">
         <b-form-group label="End Date">
              <b-form-datepicker
                id="end-date-datepicker"
                v-model="search_data.to_date"
                class=""
                size="sm"
              ></b-form-datepicker>
        </b-form-group>
        <!-- <input type="date" class="w-100 text-inp" /> -->
      </b-col>
      <b-col md="2">
        <b-form-group class="" label="Currency">
              <b-form-select
                class=""
                v-model="search_data.currency_code"
                :options="curruncyOptions"        
              ></b-form-select>
        </b-form-group>
      </b-col>
       <b-col md="2">
          <button 
          class="w-100 sub-btn mt-4"
          @click="GenarateReport"
          >
            Submit
          </button>
        </b-col>
      </b-row>
    <div class="head-bord d-flex justify-content-between" v-if="this.search_data.from_date && this.search_data.to_date && this.search_data.partner">
    
      <div class="col-3 d-flex align-div">
        <div class="circle-icon align-div me-1 mr-1">{{this.search_data.partner}}</div>
        <div class="text-remit align-div">{{this.search_data.partner}} | Summary Report</div>
      </div>
      <div class="col-6 main-head p-2" style="align-content: center;justify-content: center;"> {{ this.search_data.partner + ' -  Statement Of Account (SOA)'}}</div>
      <div class="col-3 date align-div ">
        <i class="fas fa-calendar-alt me-2 "></i>
        {{this.search_data.from_date}} to {{this.search_data.to_date}}
      </div>
    </div>
    <div>
      <b-table
      :items="items"
      :fields="fields"
      responsive
      class="align-middle"
    > 
     <!-- <template #cell(debit_amount)="row" size="sm">
              <span>{{row.item.debit_amount.toFixed(4)}}</span>
      </template>  
      <template #cell(credit_amount)="row" size="sm">
              <span>{{row.item.credit_amount.toFixed(4)}}</span>
      </template>
      <template #cell(balance)="row" size="sm">
              <span>{{row.item.balance.toFixed(4)}}</span>
      </template>   -->
    </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import {responseHandler} from "@/helpers/globalFunctions";

export default {
data() {
    return {
      base_url_p8002: process.env.VUE_APP_SERVER_ENDPOINT,
      account_url:'http://3.111.47.115:8001/api/v1/',
      ppOptions: null,
      report_data:null,
      search_data:{
        partner:"",
        from_date:"",
        to_date:"",
        currency_code:""

      },
      fields: [
        {
                key: 'date_of_happen',
                label: 'Date',
              },
              {
                key: 'txn_type',
                label: 'Txn Type',
              },
              {
                key: 'remarks',
                label: 'Description',
              },
              {
                key: 'debit_amount',
                label: 'DR',
              },
              {
                key: 'credit_amount',
                label: 'CR',
              },
              {
                key: 'balance',
                label: 'Balance',
              },
      ],
      items: [
      ],
      curruncyOptions: [
        {value: null, text: 'Please select an option'},
        {value: 'INR', text: 'INR'},
        {value: 'USD', text: 'USD'},
        {value: 'MYR', text: 'MYR'},
      ],
    }
  },
  computed: {
    ...mapGetters([
      "token"
    ]),
  },
  created(){
    this.getPPdetails();
  },
  methods:{
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
    GenarateReport(){
      console.log(this.search_data);
       axios.post(this.account_url + "account/get-usd-balance-sheet", this.search_data, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            this.fields = [
              {
                key: 'date_of_happen',
                label: 'Date',
              },
              {
                key: 'txn_type',
                label: 'Txn Type',
              },
              {
                key: 'remarks',
                label: 'Description',
              },
              {
                key: 'debit_amount',
                label: 'DR ('+ this.search_data.currency_code + ')',
              },
              {
                key: 'credit_amount',
                label: 'CR ('+ this.search_data.currency_code + ')',
              },
              {
                key: 'balance',
                label: 'Balance',
              },
            ]
            console.log("response data from Account Balance Sheet",response.data)
            responseHandler(response.data.status_code, this, response.data.message)
            this.report_data = response.data;
            this.items = response.data;
            this.items.forEach(element => {
              element.credit_amount = this.formatUSD(element.credit_amount);
              element.debit_amount = this.formatUSD(element.debit_amount);
              element.Balance = this.formatUSD(element.Balance);
            });


          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Not Getting Account Data', err);
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
      // this.search_data.curruncy = this.ppOptions.find(ele => ele.value === eve)?.pp_ccy;
       this.search_data.partner = this.ppOptions.find(ele => ele.value === eve)?.value;
      
    },

  }
};
</script>

<style lang="scss" scoped>
@import "@/global.scss";

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

.title-lbl {
  width: 100%;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  color: $txt;
  border-bottom: 1px solid $txt;
}
::v-deep th {
  color: $txt !important;
  font-size: 12px;
  font-weight: 600;
}
.btn-outline-light {
  color: $txt !important;
  border-color: $primary !important;
}
.btn-secondary {
  background: $txt !important;
}

.bor {
  // border: 1px solid green;
}
th {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;

  color: #000000;
}
.tr > td {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 15px;

  color: #000000;
}
.tr {
  background: #ffffff;
  box-shadow: 0px 4px 4px #878484;
 height: 40px;
}
.head-tr {
  background: #faf8f8;
  box-shadow: 0px 2px 2px #ff6b00;
  height: 40px;
}
table {
  border-collapse: separate;
  border-spacing: 0 0.6em;
}
.text-inp {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  outline: none;
  border: none;
  padding: 6px;
  padding-left: 15px;
}
::placeholder {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  color: #000000;
}
.sub-btn {
  background: #ff6b00;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px #878484;
  border-radius: 12px;
  padding: 6px;
}
.circle-icon {
  color: #ffffff;
  width: 25px;
  height: 25px;
  background: #ff9898;
  border-radius: 25px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  text-align: center;
}
.align-div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-remit {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #2a2323;
}
.main-head {
  font-family: "Pavanam";
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  line-height: 30px;
  display: flex;
  align-items: end;
  justify-content: end;
  color: #ff6b00;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.date {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #000000;
}
.head-bord {
  // background: #ffffff;
  // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
::v-deep .table {
  td {
    vertical-align: middle !important;
  }
}
</style>