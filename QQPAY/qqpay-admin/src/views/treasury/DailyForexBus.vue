<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col md="8">
        <b-table
              :items="itemsForsmallTable"
              :fields="fieldsSmallTable"
              responsive
              class="align-middle"
        >
        <template #cell(type) size="sm">
                             <b-form-select class="form-control" id="input-partner-settlement-in"
                               v-model="itemsForsmallTable[0].type"
                               :options="optionsForTpe"/>
        </template>
        <template #cell(value) size="sm">
              <b-form-input
                id="input-name"
                v-model="itemsForsmallTable[0].value"
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
      
      <b-col md="4">
        <div class="float-right">
          <b-button-group size="sm">
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row>
    
    <div>
     
          <b-table
            :items="items"
            :fields="fields"
            responsive
            class="align-middle"
          >
            <template #cell(margin)="row" size="sm">
              <b-form-input
                id="input-name"
                @input="calculateOfferRate()"
                v-model="row.item.margin"
              ></b-form-input>
            </template>
            <template #cell(offer_rate)="row" size="sm">
                    {{row.item.payout_country == 'India' ? items[0].offer_rate :
                      row.item.payout_country == 'Bangladesh' ? items[1].offer_rate :
                      row.item.payout_country == 'Philippines' ? items[2].offer_rate : 
                      row.item.payout_country == 'Singapore' ? items[3].offer_rate : '' }}
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
                  Update
                </b-button>
              </div>
            </template>
          </b-table>
      
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import { getAll } from "@/api/country";
import {
  getBusinusForex,
  getPayoutDetailList,
  update,
  save,
  saveBusinus
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
        country_code: null,
        ccy:null,
        reuters_rate: null,
        margin:null,
        offer_rate:null

      },
      form: null,
      countryList: [],
      items: [
    
      ],
      otherCountriesItems: [],
      fieldsSmallTable: [
        { key: "id", label: "" },
        { key: "type", label: "Type" },
        { key: "value", label: "value" },
        { key: "update", label: "" },
      ],
      itemsForsmallTable : [
        {
          "id":"",
          "type": "percen",
          "value":0
        }
      ],
      optionsForTpe:[
        {
            value: 'percen', text: 'Percentage '
        },
        {
           value: 'flat', text: 'Flat '
        }
      ],
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
        { key: "id", label: "S/N" },
        { key: "payout_country", label: "FCY Country" },
        { key: "ccy", label: "CCY" },
        { key: "reuters_rate", label: "Reuters Rate" },
        { key: "margin", label: "Margin" },
        { key: "offer_rate", label: "Offer Rate" },
        { key: "actions", label: "" },
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
    calculateOfferRate(){
      this.items[0].offer_rate = (this.items[0].reuters_rate + parseFloat(this.items[0].margin)).toFixed(4);
      this.items[1].offer_rate = (this.items[1].reuters_rate + parseFloat(this.items[1].margin)).toFixed(4);
      this.items[2].offer_rate = (this.items[2].reuters_rate + parseFloat(this.items[2].margin)).toFixed(4);
      this.items[3].offer_rate = (this.items[3].reuters_rate + parseFloat(this.items[3].margin)).toFixed(4);
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
      getBusinusForex().then((res) => {
        console.log(res.data.data)
        this.items = res.data.data;
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
    edit(item) {
      saveBusinus(item).then((res) => {
        console.log(res);
        this.onSearch();
      });
    
    },
    editMain(){
     
      getBusinusForex().then((res) => {
       
        this.items = res.data.data;
        this.items.forEach(element => {
        if(element.margin === 0){
              element.margin = this.itemsForsmallTable[0].value
        }   
      });
      this.calculateOfferRate(); 
        // this.otherCountriesItems = res.data.data[0];
      });
      
 
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
    this.items[0].offer_rate = (this.items[0].reuters_rate + this.items[0].margin).toFixed(4);
    this.items[1].offer_rate = (this.items[1].reuters_rate + this.items[1].margin).toFixed(4);
    this.items[2].offer_rate = (this.items[2].reuters_rate + this.items[2].margin).toFixed(4);
    this.items[3].offer_rate = (this.items[3].reuters_rate + this.items[3].margin).toFixed(4);
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