<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row style="margin-bottom: -16px;">
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light"  v-b-modal.sr-country-wise-special>
              <b-icon
                icon="file-earmark-plus-fill"
              ></b-icon>
              New Special Rate
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
      class="align-middle mt-4"
    >
      <template #cell(id)="row">
        {{ row.index + 1 }}
      </template>
      <template #cell(special_rate)="row">
        <strong>{{ row.item.special_rate }}</strong>
      </template>
      <template #cell(is_active)="row">
        <b-form-checkbox
          v-model="row.item.is_active"
          switch
          class="checkbox"
          variant="success"
          @change="onChangeActive(row.item)"
        >
        </b-form-checkbox>
      </template>
      <template #cell(actions)="row">
        
          <b-icon
                class="btn"
                icon="pencil-square"
                variant="success"
                @click="edit(row.item)"
              />
           <b-icon
                class=" btn"
                icon="trash-fill"
                variant="danger"
                @click="onDlete(row.item)"
            />
          
      </template>
    </b-table>
    <b-modal
      id="sr-country-wise-special"
      title="Special Rates"
      size="lg"
      ref="rates-modal"
      variant="primary"
      hide-footer
      @hide="resetForm()"
    >
      <b-card no-body class="my-custom-class">
         <b-form>
            <b-row>
              <b-col>
                <b-alert v-model="isError" variant="danger" dismissible>
                  {{ this.error }}
                </b-alert>
              </b-col>
            </b-row>
          <b-row>
              <b-col md="6">
                <b-form-group label="Company">
                  <v-select
                    :options="companyList"
                    label="registered_business_name"
                    v-model="form.company_name"
                    :reduce="(item) => item.registered_business_name"
                    required
                    :clearable="false"
                   
                    aria-describedby="company-live-feedback"
                  >
                  </v-select>
                  <b-form-invalid-feedback id="company-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback>
                </b-form-group>
                <div class="errorstyles">
                    <div class="z-index">{{ form.company_name_error }}</div>
                  </div>
              </b-col>
              <b-col md="6">
                <b-form-group label="Currency Type"
                  ><v-select
                    :options="currencyList"
                    label="currency_code"
                    v-model="form.currency_type"
                    :reduce="(item) => item.currency_code"
                    required
                    :clearable="false"
                    :class="{
                      'is-invalid': $v.form.currency_type.$error,
                    }"
                    aria-describedby="currency_type-live-feedback"
                  >
                  </v-select>
                  <b-form-invalid-feedback id="currency_type-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback>
                </b-form-group>
                <div class="errorstyles">
                    <div class="z-index">{{ form.currency_type_error }}</div>
                  </div>
              </b-col>
              <b-col md="6">
                <b-form-group label="Special Rate">
                  <b-form-input
                    type="number"
                    id="special_rate"
                    name="special_rate"
                    v-model="form.special_rate"
                    @input="restrictDecimal"
                    size="md"
                    required
                    :class="{
                      'is-invalid': $v.form.special_rate.$error,
                    }"
                    aria-describedby="special_rate-live-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="special_rate-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback>
                </b-form-group>
                 <div class="errorstyles">
                    <div class="z-index">{{ form.special_rate_error }}</div>
                  </div>
              </b-col> 
              <b-col md="6">
                <b-form-group label="Transfer Amount">
                    <b-form-input
                    type="text"
                    id="paying_amount_max"
                    name="paying_amount_max"
                    @input="ChangeUsdAmountFormat"
                    v-model="form.max_paying_amount"
                    size="md"
                    required
                    :class="{
                      'is-invalid': $v.form.special_rate.$error,
                    }"
                    aria-describedby="special_rate-live-feedback"
                  ></b-form-input>
                   </b-form-group>
                   <div class="errorstyles">
              <div class="z-index">{{ form.max_paying_amount_error }}</div>
            </div>
              </b-col>
              <b-col md="6">
                <b-form-group label="Rates Date">
                  <b-form-group id="fieldset-1" label-for="example-datepicker">
                    <b-form-datepicker
                      id="example-datepicker"
                      v-model="form.processing_date"
                      size="sm"
                    ></b-form-datepicker> </b-form-group
                ></b-form-group>
                <div class="errorstyles">
              <div class="z-index">{{ form.processing_date_error }}</div>
            </div>
              </b-col>
           </b-row>
            <b-row class="float-right">
              <b-button size="lg" variant="primary" @click="manage()">
                Add Special Rates
              </b-button>
            </b-row>
          
        
        </b-form>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import { getAll as getCompanyList } from "@/api/businessUserKYC";
import { getAllCountry } from "@/api/exchangeRates";
import { getAll as list, getByCompany, save, update } from "@/api/specialRates";
import { getPublishRateByCurrency } from "@/api/dailyForex";
export default {
  mixins: [validationMixin],
  computed: {
    ...mapGetters([
      "token"
    ]),

  },
  data() {
    return {
      filter: null,
      menu_hierarchy: [
        {
          text: "Setup",
          active: true,
        },
        {
          text: "Special Rates",
          active: true,
        },
      ],
      special_rate_url:'http://3.111.47.115:8004/api/v1/',
      isError: false,
      error: null,
      companyList: [],
      currencyList: [],
      payoutPartnerList: [],
      paymentModeList: [],
      publishRate: null,
      items: [],
      updateTriger:false,
      defaultForm: {
        id: 0,
        company_name: null,
        currency_type: null,
        special_rate: null,
        publish_rate: null,
        reuters_rate: null,
        paying_amount_min: null,
        max_paying_amount: null,
        processing_date: null,
        company_name_error: null,
        currency_type_error: null,
        special_rate_error: null,
        publish_rate_error: null,
        reuters_rate_error: null,
        paying_amount_min_error: null,
        max_paying_amount_error: null,
        processing_date_error: null,
      },
      form: null,
      fields: [
        { key: "id", label: "SNO" },
        { key: "company_name", label: "Company Name" },
        { key: "currency_type", label: "Currency Type" },
        { key: "special_rate", label: "Special Rate" },
        { key: "max_paying_amount", label: "Transaction Amount" },
        { key: "processing_date", label: "Processing Date" },
        { key: "created_by", label: "Created By" },
        { key: "is_active", label: "Active" },
        { key: "actions", label: "Action" },
      ],
      company_options: [
        {
          text: "ABC Company",
          value: "ABC Company",
        },
        {
          text: "XYZ Company",
          value: "XYZ Company",
        },
      ],
      currency_type_options: [
        {
          text: "INR",
          value: "INR",
        },
        {
          text: "NPR",
          value: "NPR ",
        },
      ],
      filter_options: [
        {
          text: "Filter",
          value: "Filter",
        },
      ],
    };
  },
  validations: {
    form: {
      company: {
        required,
      },
      currency_type: {
        required,
      },
      special_rate: {
        required,
      },
      publish_rate: {
        required,
      },
      reuters_rate: {
        required,
      },
      paying_amount_min: {
        required,
      },
      paying_amount_max: {
        required,
      },
      processing_date: {
        required,
      },
    },
  },
  methods: {
    ChangeUsdAmountFormat(){
      this.form.max_paying_amount = this.formatUSD(this.parseUSD(this.form.max_paying_amount));
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
    onlyForDecimal($event, val) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || val.toString().indexOf(".") != -1)
      ) {
        console.log("test");
      }

      if (
        val != null &&
        val.toString().indexOf(".") != -1 &&
        val.toString().split(".")[1].length > 3
      ) {
       console.log("test");
      }
    },

    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$v.$reset();
      this.isError = false;
      this.error = null;
      this.onSearch();
    },
    onSearch() {
      list().then((res) => {
        this.items = res.data.data;
         this.items.forEach(element => {
              element.max_paying_amount = this.formatUSD(this.parseUSD(element.max_paying_amount));
            });
        // debugger; // eslint-disable-line no-debugger
      });
    },
    onChangeCurrency() {
      // debugger; // eslint-disable-line no-debugger

      let result = this.currencyList.find(
        (el) => el.id === this.form.currency_type
      );
      getPublishRateByCurrency(result.currency_code)
        .then((res) => {
          // debugger; // eslint-disable-line no-debugger
          this.publishRate = res.data.data[0];
        })
        .catch((error) => {
          this.isError = true;
          this.error = error.message;
        });
    },
    onDlete(item){
      axios.delete(this.special_rate_url + `special_rates_router/delete_special_rates_by_company/${item.company_name}` , {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          // responseHandler(response.data.status_code, this, response.data.message)
          if (response.data.success) {
            this.onSearch();
        
          }
        })
        .catch((err) => {
          // responseHandler(err.data.status_code, this, err.data.message)
          console.log('Deal not posted', err);
      });
      console.log("test",item);
    },
    edit(item) {
      if (item.special_rates_id > 0) {
        getByCompany(item.company_name)
          .then((res) => {
            this.updateTriger = true;
            this.form = {};
            this.form = res.data.data[0];
            this.form.max_paying_amount = this.formatUSD(this.parseUSD(this.form.max_paying_amount));
            this.$refs["rates-modal"].show();
            console.log(res);
            console.log('item',this.form);
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          });
      }
    },
    restrictDecimal () {
            this.form.special_rate = (this.form.special_rate).toFixed(4);
    },

    manage() {
      // debugger; // eslint-disable-line no-debugger
      console.log(this.form);
      if(!this.form.company_name){
        this.form.company_name_error = "Company Name is Required"
      }else{
         this.form.company_name_error = ""
      }

      if(!this.form.currency_type){
        this.form.currency_type_error = "Currency Type is Required"
      }else{
         this.form.currency_type_error = ""
      }

      if(!this.form.special_rate){
        this.form.special_rate_error = "Special Rate is Required"
      }else{
         this.form.special_rate_error = ""
      }

      if(!this.form.max_paying_amount){
        this.form.max_paying_amount_error = "Transfer Amount is Required"
      }else{
         this.form.max_paying_amount_error = ""
      }

      if(!this.form.processing_date){
        this.form.processing_date_error = "Rates Date is Required"
      }else{
         this.form.processing_date_error = ""
      }
      console.log(this.form.processing_date_error)

      if(this.form.processing_date && this.form.max_paying_amount && this.form.special_rate && this.form.currency_type && this.form.company_name){
          if (this.form.special_rates_id > 0) {
        this.form.paying_amount_min = 0.00;
        this.form.publish_rate = 0.00;
        this.form.reuters_rate = 0.00;
        this.form.max_paying_amount = this.parseUSD(this.form.max_paying_amount);
        update(this.form)
          .then((res) => {
            this.$refs["rates-modal"].hide();
            console.log(res);
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      } else {
        this.form.paying_amount_min = 0.00;
        this.form.publish_rate = 0.00;
        this.form.reuters_rate = 0.00;
        save(this.form)
          .then((res) => {
            this.$refs["rates-modal"].hide();
            console.log(res);
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      }
     }

      
    },
  },
  async created() {
    this.resetForm();
    this.onSearch();
    await Promise.all([
      getCompanyList().then((res) => {
        this.companyList = res.data.data;
      }),
      getAllCountry().then((res) => {
        this.currencyList = res.data;
      }),
    ]);
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
.modal-footer {
  justify-content: center !important;
}
#sr-country-wise-special___BV_modal_footer_ {
  justify-content: center !important;
}
.my-custom-class .card-title {
  background-color: #ff6b00;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #ff6b00 !important;
}
.nav-pills .nav-link.active {
  background-color: #ff6b00 !important;
}
</style>