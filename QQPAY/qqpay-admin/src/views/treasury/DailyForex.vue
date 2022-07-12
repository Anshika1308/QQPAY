<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
        <b-row>
      <b-col>
        <div class="float-right">
          <b-button-group size="sm">
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert v-model="isError" variant="danger" dismissible>
          {{ this.error }}
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="5">
        <b-table
              :items="itemsForsmallTable"
              :fields="fieldsSmallTable"
              responsive
              class="align-middle"
        >
        <template #cell(bid) size="sm">
             <b-form-input
                id="input-name"
                v-model="itemsForsmallTable[0].bid"
              ></b-form-input>
        </template>
        <template #cell(ask) size="sm">
             <b-form-input
                id="input-name"
                v-model="itemsForsmallTable[0].ask"
              ></b-form-input>
        </template>
        <template #cell(update) size="sm">
                          <div class="action-div">
                <b-button
                  variant="light"
                  size="sm"
                  title="Tooltip directive content"
                  @click="editMain()"
                  class="btn btn-outline-light"
                >
                  <!-- <b-icon icon="three-dots-vertical"></b-icon> -->
                  update
                </b-button>
              </div>
        </template>
        </b-table>
      </b-col>
      <b-col md="3"></b-col>
       <b-col md="4">
        <span>Date</span>
          <b-form-group id="fieldset-1" label-for="example-datepicker">
            <b-form-datepicker
              id="example-datepicker"
              v-model="temp_deal.deal_date"
              size="sm"
            ></b-form-datepicker>
          </b-form-group>
       </b-col>
    
    </b-row>
  <b-tabs
        content-class="mt-3"
        active-nav-item-class="text-warning"
        active-tab-class="text-warning"
      >
      <b-tab title="Country Wise">
          <div>
            <b-table
              :items="items"
              :fields="fields"
              responsive
              class="align-middle"
            > 
              <template #cell(usd_cost_rate)="row" size="sm">
                <b-form-input
                  id="input-name"
                  v-model="row.item.usd_cost_rate"
                  @input="ChangeLcyFcyRate(row.item.usd_cost_rate,row.item.payout_country);ChangeOfferRate(row.item.lcy_fcy_rate,row.item.margin,row.item.payout_country)"
                ></b-form-input>
              </template>
              <template #cell(margin)="row" size="sm">
                <b-form-input
                  id="input-name"
                  @input="ChangeOfferRate(row.item.lcy_fcy_rate,row.item.margin,row.item.payout_country)"
                  v-model="row.item.margin"
                ></b-form-input>
              </template>
              <template #cell(actions)="row" size="sm">
                <div class="action-div">
                  <b-button
                    variant="light"
                    size="sm"
                    title="Tooltip directive content"
                    @click="edit(row.item)"
                    class="btn btn-outline-light"
                  >
                    update
                  </b-button>
                </div>
              </template>
            </b-table>
          </div>
      </b-tab>
       <b-tab title="Partner Wise">
        <div>
          <b-table
            :items="items_by_partner"
            :fields="fields_by_partner"
            responsive
            class="align-middle"
          >
            <template #cell(usd_cost_rate)="row" size="sm">
              <b-form-input
                id="input-name"
                v-model="row.item.usd_cost_rate"
                 @input="ChangeLcyFcyRatePartner(row.item.usd_cost_rate,row.item.payout_country,row.item.partner_name);ChangeOfferRatePartner(row.item.lcy_fcy_rate,row.item.margin,row.item.payout_country,row.item.partner_name)"
              ></b-form-input>
            </template>

            <template #cell(margin)="row" size="sm">
              <b-form-input
                id="input-name"
                @input="ChangeOfferRatePartner(row.item.lcy_fcy_rate,row.item.margin,row.item.payout_country,row.item.partner_name)"
                v-model="row.item.margin"
              ></b-form-input>
            </template>

            <template #cell(actions)="row" size="sm">
              <div class="action-div">
                <b-button
                  variant="light"
                  size="sm"
                  title="Tooltip directive content"
                  @click="editPartner(row.item)"
                  class="btn btn-outline-light"
                >
                  <!-- <b-icon icon="three-dots-vertical"></b-icon> -->
                  update
                </b-button>
              </div>
            </template>
          </b-table>
        </div>

       </b-tab>
        <b-tab title="Payment Mode wise">
        <div>
          <b-table
            :items="items_by_payment_mode"
            :fields="fields_by_payment_mode"
            responsive
            class="align-middle"
          >
            <template #cell(usd_cost_rate)="row" size="sm">
              <b-form-input
                id="input-name"
                v-model="row.item.usd_cost_rate"
                 @input="ChangeLcyFcyRatePayment(row.item.usd_cost_rate,row.item.payout_country,row.item.partner_name,row.item.payment_mode);ChangeOfferRatePayment(row.item.lcy_fcy_rate,row.item.margin,row.item.payout_country,row.item.partner_name,row.item.payment_mode)"
              ></b-form-input>
            </template>

            <template #cell(margin)="row" size="sm">
              <b-form-input
                id="input-name"
                @input="ChangeOfferRatePayment(row.item.lcy_fcy_rate,row.item.margin,row.item.payout_country,row.item.partner_name,row.item.payment_mode)"
                v-model="row.item.margin"
              ></b-form-input>
            </template>

            <template #cell(actions)="row" size="sm">
              <div class="action-div">
                <b-button
                  variant="light"
                  size="sm"
                  title="Tooltip directive content"
                  @click="editPayment(row.item)"
                  class="btn btn-outline-light"
                >
                  <!-- <b-icon icon="three-dots-vertical"></b-icon> -->
                  update
                </b-button>
              </div>
            </template>
          </b-table>
    </div>
          
        </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import { getAll } from "@/api/country";
import {
  getAll as list,
  getPayoutDetailList,
  save,
  update,
} from "@/api/dailyForex";
export default {
  mixins: [validationMixin],
  data() {
    return {
      menu_hierarchy: [
        {
          text: "Treasury",
          active: true,
        },
        {
          text: "Daily Forex",
          active: true,
        },
      ],
      isError: false,
      error: null,
      defaultType: {
        country: null,
      },
      type: null,
      defaultForm: {
        payout_country: null,
        country_code:null,
        ccy: null,
        buying_rate:null,
        selling_rate:null,
        usd_cost_rate:null,
        lcy_fcy_rate:null,
        margin:null,
        offer_rate:null,
        exchange_gain_in_fcy:null,
        exchange_gain_in_lcy:null,
      },
      form: null,
      countryList: [],
      items: [ 
        
      ],
      items_by_partner: [ 
        
      ],
      items_by_payment_mode: [ 
        
      ],
      otherCountriesItems: [],
      temp_deal: {
        i_o_IRH: "O",
        deal_date: "",
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
      fields: [
        { key: "id_for_table", label: "S/N" },
        { key: "id", thClass: 'd-none', tdClass: 'd-none' },
        { key: "payout_country", label: "FCY Country" },
        { key: "ccy", label: "CCY" },
        { key: "buying_rate", label: "BID" },
        { key: "selling_rate", label: "ASK" },
        { key: "usd_cost_rate", label: "USD Cost" },
        { key: "lcy_fcy_rate", label: "BID Rate"},
        { key: "margin", label: "Margin" },
        { key: "offer_rate", label: "Offer" },
        { key: "actions", label: "" },
      ],
      fields_by_partner: [
         { key: "id_for_table", label: "S/N" },
        { key: "id", thClass: 'd-none', tdClass: 'd-none' },
        { key: "payout_country", label: "FCY Country" },
        { key: "partner_name", label: "Partner Name" },
        { key: "ccy", label: "CCY" },
        { key: "buying_rate", label: "BID" },
        { key: "selling_rate", label: "ASK" },
        { key: "usd_cost_rate", label: "USD Cost" },
        { key: "lcy_fcy_rate", label: "BID Rate"},
        { key: "margin", label: "Margin" },
        { key: "offer_rate", label: "Offer" },
        { key: "actions", label: "" },
      ],
      fields_by_payment_mode: [
         { key: "id_for_table", label: "S/N" },
        { key: "id", thClass: 'd-none', tdClass: 'd-none' },
        { key: "payout_country", label: "FCY Country" },
        { key: "partner_name", label: "Partner Name" },
        { key: "payment_mode", label: "Payment Mode" },
        { key: "ccy", label: "CCY" },
        { key: "buying_rate", label: "BID" },
        { key: "selling_rate", label: "ASK" },
        { key: "usd_cost_rate", label: "USD Cost" },
        { key: "lcy_fcy_rate", label: "BID Rate"},
        { key: "margin", label: "Margin" },
        { key: "offer_rate", label: "Offer" },
        { key: "actions", label: "" },
      ],
      fieldsSmallTable: [
        { key: "id", label: "" },
        { key: "bid", label: "BID" },
        { key: "ask", label: "ASK" },
        { key: "update", label: "" },
      ],
      itemsForsmallTable : [
        {
          "id":"MYR",
          "bid":0,
          "ask":0
        }
      ],
      fieldsSmallTable_by_partner: [
        { key: "id", label: "" },
        { key: "bid", label: "BID" },
        { key: "ask", label: "ASK" },
      ],
      itemsForsmallTable_by_partner : [
        {
          "id":"MYR",
          "bid":0,
          "ask":0
        }
      ],
       fieldsSmallTable_by_payment_mode: [
        { key: "id", label: "" },
        { key: "bid", label: "BID" },
        { key: "ask", label: "ASK" },
        
      ],
      itemsForsmallTable_by_payment_mode : [
        {
          "id":"MYR",
          "bid":0,
          "ask":0
        }
      ],
    };
  },
  validations: {
    type: {
      country: {
        required,
      },
    },
    form: {
      search_user: {
        required,
      },
    },
  },
  methods: {
    ChangeLcyFcyRatePayment(usd_cost_rate,payout_country,partner_name,payment_mode){
      console.log("payment_mode",payment_mode);
      var lcy_fcy_rate = (usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
      this.items_by_payment_mode.forEach(element => {
          console.log("lement.payment_mode",element.payment_mode)
          if(element.payout_country == payout_country && element.partner_name == partner_name && element.payment_mode == payment_mode){
            element.lcy_fcy_rate = lcy_fcy_rate;
          }
        });
    },
    ChangeOfferRatePayment(lcy_fcy_rate,margin,payout_country,partner_name,payment_mode){
       var offer_rate = (lcy_fcy_rate - margin).toFixed(4);
      this.items_by_payment_mode.forEach(element => {
          if(element.payout_country == payout_country && element.partner_name == partner_name && element.payment_mode == payment_mode){
            element.offer_rate = offer_rate;
          }
        });
    },
    ChangeLcyFcyRatePartner(usd_cost_rate,payout_country,partner_name){
      var lcy_fcy_rate = (usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
      this.items_by_partner.forEach(element => {
          if(element.payout_country == payout_country && element.partner_name == partner_name){
            element.lcy_fcy_rate = lcy_fcy_rate;
          }
        });
    },
    ChangeOfferRatePartner(lcy_fcy_rate,margin,payout_country,partner_name){
      var offer_rate = (lcy_fcy_rate - margin).toFixed(4);
      this.items_by_partner.forEach(element => {
          if(element.payout_country == payout_country && element.partner_name == partner_name){
            element.offer_rate = offer_rate;
          }
        });  
    },
    ChangeLcyFcyRate(usd_cost_rate,payout_country){
       var lcy_fcy_rate = (usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
       this.items.forEach(element => {
          if(element.payout_country == payout_country){
            element.lcy_fcy_rate = lcy_fcy_rate;
          }
        });
    },
    ChangeOfferRate(lcy_fcy_rate,margin,payout_country){
      var offer_rate = (lcy_fcy_rate - margin).toFixed(4);
      this.items.forEach(element => {
        if(element.payout_country == payout_country){
          element.offer_rate = offer_rate;
        }
      });
    },
    resetForm() {
      this.type = Object.assign({}, this.defaultType);
      this.form = Object.assign({}, this.defaultForm);
      this.$v.$reset();
      this.isError = false;
      this.error = null;
      this.onSearch();
    },
    onSearch() {
      list(1).then((res) => {
        console.log("onsearch resonse",res.data.data)
        this.items = res.data.data;
        res.data.data.forEach(element => {
          if(element.buying_rate != 0 && element.selling_rate != 0){
            this.itemsForsmallTable[0].bid = element.buying_rate;
            this.itemsForsmallTable[0].ask = element.selling_rate;
          }
          this.items.forEach(function callback(value, index) {
            value.id_for_table = index + 1;
            value.lcy_fcy_rate = (value.usd_cost_rate / value.buying_rate).toFixed(4)
            value.offer_rate =  (value.lcy_fcy_rate - value.margin).toFixed(4)
          });

        });
      });
      list(2).then((res) => {
        this.items_by_partner = res.data.data;
        res.data.data.forEach(element => {
          if(element.buying_rate != 0 && element.selling_rate != 0){
            this.itemsForsmallTable_by_partner[0].bid = element.buying_rate;
            this.itemsForsmallTable_by_partner[0].ask = element.selling_rate;
          }
          this.items_by_partner.forEach(function callback(value, index) {
            value.id_for_table = index + 1;
            value.lcy_fcy_rate = (value.usd_cost_rate / value.buying_rate).toFixed(4)
            value.offer_rate =  (value.lcy_fcy_rate - value.margin).toFixed(4)
          });
        });
        // this.otherCountriesItems = res.data.data[0];
      });
      list(3).then((res) => {
        this.items_by_payment_mode = res.data.data;
        console.log(this.items_by_payment_mode , "test");
        res.data.data.forEach(element => {
          if(element.buying_rate != 0 && element.selling_rate != 0){
            this.itemsForsmallTable_by_payment_mode[0].bid = element.buying_rate;
            this.itemsForsmallTable_by_payment_mode[0].ask = element.selling_rate;
          }
          this.items_by_payment_mode.forEach(function callback(value, index) {
            value.id_for_table = index + 1;
            value.lcy_fcy_rate = (value.usd_cost_rate / value.buying_rate).toFixed(4)
            value.offer_rate =  (value.lcy_fcy_rate - value.margin).toFixed(4)
          });
        });
        // this.otherCountriesItems = res.data.data[0];
      });

     
    },
    onMarginChange(item) {
      //convert to 4 decimal point
      item.consumer_margin = parseFloat(item.consumer_margin).toFixed(4)
      item.business_margin = parseFloat(item.business_margin).toFixed(4)

      //convert to float
      item.consumer_margin = parseFloat(item.consumer_margin)
      item.business_margin = parseFloat(item.business_margin)
      
      if (
        item.consumer_margin < 1.0001 ||
        item.consumer_margin > 1.9999 ||
        item.business_margin < 1.0001 ||
        item.business_margin > 1.9999
      ) {
        this.error = "Please select margin in between 1.0001 and 1.9999";
        this.isError = true;
      } else {

        this.form = Object.assign({}, item);
        this.form.consumers_rate = this.form.qq_offer_rate +  this.form.consumer_margin
        this.form.business_rate = this.form.qq_offer_rate +  this.form.business_margin
        this.form.consumer_gain_or_loss = this.form.consumers_rate +  this.form.payout_partner_cost_rate

        update(this.form, this.form.id)
          .then((res) => {
            console.log(res);
            this.resetForm();
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      }
    },
    editMain(){
      console.log("comming")
      this.items.forEach(element => {
        element.buying_rate = this.itemsForsmallTable[0].bid;
        element.selling_rate = this.itemsForsmallTable[0].ask;
      });
       this.items_by_payment_mode.forEach(element => {
        element.buying_rate = this.itemsForsmallTable[0].bid;
        element.selling_rate = this.itemsForsmallTable[0].ask;
      });
      this.items_by_partner.forEach(element => {
        element.buying_rate = this.itemsForsmallTable[0].bid;
        element.selling_rate = this.itemsForsmallTable[0].ask;
      });
    },
    edit(item) {
      item.selling_rate = this.itemsForsmallTable[0].ask;
       item.buying_rate = this.itemsForsmallTable[0].bid;
      console.log("item",item);
      save(item).then((res) => {
        console.log("res",res)
        this.onSearch();
        this.editMain();
      })
    },
     editPartner(item) {
      item.selling_rate = this.itemsForsmallTable[0].ask;
       item.buying_rate = this.itemsForsmallTable[0].bid;
      console.log("item",item);
      save(item).then((res) => {
        console.log("res",res)
        this.onSearch();
      })
    },
    editPayment(item) {
      item.selling_rate = this.itemsForsmallTable[0].ask;
      item.buying_rate = this.itemsForsmallTable[0].bid;
      console.log("item",item);
      save(item).then((res) => {
        console.log("res",res)
        this.onSearch();
      })
    },
    manage() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (this.form.id > 0) {
        update(this.form, this.form.id)
          .then((res) => {
            console.log(res);
            this.resetForm();
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      } else {
        save(this.form)
          .then((res) => {
            console.log(res);
            this.resetForm();
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      }
    },
  },
  async created() {
    this.resetForm();
    this.onSearch();

    
    // this.items[0].lcy_fcy_rate = ( this.items[0].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
    // this.items[1].lcy_fcy_rate = ( this.items[1].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
    // this.items[2].lcy_fcy_rate = ( this.items[2].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
    // this.items[3].lcy_fcy_rate = ( this.items[3].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
    // this.items[4].lcy_fcy_rate = ( this.items[4].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);


    // this.items[0].offer_rate = (this.items[0].lcy_fcy_rate -  this.items[0].margin).toFixed(4);
    // this.items[1].offer_rate = (this.items[1].lcy_fcy_rate -  this.items[1].margin).toFixed(4);
    // this.items[2].offer_rate = (this.items[2].lcy_fcy_rate -  this.items[2].margin).toFixed(4);
    // this.items[3].offer_rate = (this.items[3].lcy_fcy_rate -  this.items[3].margin).toFixed(4);
    // this.items[4].offer_rate = (this.items[4].lcy_fcy_rate -  this.items[4].margin).toFixed(4);

    this.items_by_partner[0].offer_rate = (this.items_by_partner[0].lcy_fcy_rate -  this.items_by_partner[0].margin).toFixed(4);
    this.items_by_partner[1].offer_rate = (this.items_by_partner[1].lcy_fcy_rate -  this.items_by_partner[1].margin).toFixed(4);

    this.items_by_partner[0].lcy_fcy_rate = ( this.items_by_partner[0].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
    this.items_by_partner[1].lcy_fcy_rate = ( this.items_by_partner[1].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);

     this.items_by_payment_mode[0].lcy_fcy_rate = ( this.items_by_payment_mode[0].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
     this.items_by_payment_mode[1].lcy_fcy_rate = ( this.items_by_payment_mode[1].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
     this.items_by_payment_mode[2].lcy_fcy_rate = ( this.items_by_payment_mode[0].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
     this.items_by_payment_mode[3].lcy_fcy_rate = ( this.items_by_payment_mode[1].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
    //  this.items_by_payment_mode[4].lcy_fcy_rate = ( this.items_by_payment_mode[0].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
    //  this.items_by_payment_mode[5].lcy_fcy_rate = ( this.items_by_payment_mode[1].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);
    //  this.items_by_payment_mode[6].lcy_fcy_rate = ( this.items_by_payment_mode[1].usd_cost_rate / this.itemsForsmallTable[0].ask).toFixed(4);

      this.items_by_payment_mode[0].offer_rate = (this.items_by_payment_mode[0].lcy_fcy_rate -  this.items_by_payment_mode[0].margin).toFixed(4);
      this.items_by_payment_mode[1].offer_rate = (this.items_by_payment_mode[1].lcy_fcy_rate -  this.items_by_payment_mode[1].margin).toFixed(4);
      this.items_by_payment_mode[2].offer_rate = (this.items_by_payment_mode[2].lcy_fcy_rate -  this.items_by_payment_mode[2].margin).toFixed(4);
      this.items_by_payment_mode[3].offer_rate = (this.items_by_payment_mode[3].lcy_fcy_rate -  this.items_by_payment_mode[3].margin).toFixed(4);
      // this.items_by_payment_mode[4].offer_rate = (this.items_by_payment_mode[4].lcy_fcy_rate -  this.items_by_payment_mode[4].margin).toFixed(4);
      // this.items_by_payment_mode[5].offer_rate = (this.items_by_payment_mode[5].lcy_fcy_rate -  this.items_by_payment_mode[5].margin).toFixed(4);
      // this.items_by_payment_mode[6].offer_rate = (this.items_by_payment_mode[6].lcy_fcy_rate -  this.items_by_payment_mode[6].margin).toFixed(4);

    await Promise.all([
      getAll().then((res) => {
        this.countryList = res.data;
      }),
      getPayoutDetailList().then((res) => {
        this.serviceChargeTypeList = res.data;
      }),
    ]);
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
.my-tab {
  color: #ff6b00 !important;
}

.nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.tabs a:hover,
.tabs a.active {
  background-color: rgb(231, 8, 8);
}

.nav .nav-tabs .nav-item .nav-link {
  color: #ff6b00 !important;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.tab-title-class {
  color: #ff6b00 !important;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #ff6b00 !important;
}

.a {
  color: #ff6b00 !important;
}
.nav-pills .mytab .nav-link:not(.active) {
  background-color: red !important;
}

.nav-pills .mytab .nav-link {
  background-color: rgb(34, 189, 52) !important;
}

.nav-link {
  color: #ff6b00 !important;
}

.tab-content > .tab-pane {
  border: 1px solid;
  border-left: 0px none;
}

.ul .li .a {
  color: #ff6b00 !important;
}

text-warning {
  color: #ff6b00 !important;
}
</style>