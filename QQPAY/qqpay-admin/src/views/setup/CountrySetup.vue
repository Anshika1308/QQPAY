<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row style="margin-bottom: -16px;">
      <b-col>
        <div>
          <b-button-group size="sm" @click="newDealClicked()">
            <b-button  variant="outline-light"   v-b-modal.sr-country-wise-country >
              <b-icon
                icon="file-earmark-plus-fill"
                
              ></b-icon>
              New Country
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
      id="sr-country-wise-country"
      title="Country"
      size="lg"
      ref="country-modal"
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
                <b-form-group label="country name">
                  <b-form-input
                    type="text"
                    id="country_name"
                    name="country_name"
                    v-model="form.country_name"
                    size="md"
                    required
                    aria-describedby="special_rate-live-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="special_rate-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback>
                </b-form-group>
                 <div class="errorstyles">
                    <div class="z-index">{{ formErrors.country_name_error }}</div>
                  </div>
              </b-col> 
              <b-col md="6">
                <b-form-group label="country numeric code">
                    <b-form-input
                    type="number"
                    id="country_numeric_code"
                    name="country_numeric_code"
                    v-model="form.country_numeric_code"
                    size="md"
                    required
                    aria-describedby="special_rate-live-feedback"
                  ></b-form-input>
                   </b-form-group>
                   <div class="errorstyles">
                        <div class="z-index">{{ formErrors.country_numeric_code_error }}</div>
                    </div>
              </b-col>
               <b-col md="6">
                <b-form-group label="country iso2 code">
                    <b-form-input
                    type="text"
                    id="country_iso2_code"
                    name="country_iso2_code"
                    v-model="form.country_iso2_code"
                    size="md"
                    required
                    aria-describedby="special_rate-live-feedback"
                  ></b-form-input>
                   </b-form-group>
                   <div class="errorstyles">
                        <div class="z-index">{{ formErrors.country_iso2_code_error }}</div>
                    </div>
              </b-col>
              <b-col md="6">
                <b-form-group label="country iso3 code">
                    <b-form-input
                    type="text"
                    id="country_iso3_code"
                    name="country_iso3_code"
                    v-model="form.country_iso3_code"
                    size="md"
                    required
                    aria-describedby="special_rate-live-feedback"
                  ></b-form-input>
                   </b-form-group>
                   <div class="errorstyles">
                        <div class="z-index">{{ formErrors.country_iso3_code_error }}</div>
                    </div>
              </b-col>
              <b-col md="6">
                <b-form-group label="currency code">
                    <b-form-input
                    type="text"
                    id="currency_code"
                    name="currency_code"
                    v-model="form.currency_code"
                    size="md"
                    required
                    aria-describedby="special_rate-live-feedback"
                  ></b-form-input>
                   </b-form-group>
                   <div class="errorstyles">
                        <div class="z-index">{{ formErrors.currency_code_error }}</div>
                    </div>
              </b-col>
              <b-col md="6">
                <b-form-group label="Dail code">
                    <b-form-input
                    type="text"
                    id="mobile_code"
                    name="mobile_code"
                    v-model="form.mobile_code"
                    size="md"
                    required
                    aria-describedby="special_rate-live-feedback"
                  ></b-form-input>
                   </b-form-group>
                   <div class="errorstyles">
                        <div class="z-index">{{ formErrors.mobile_code_error }}</div>
                    </div>
              </b-col>
              <b-col md="6">
                <b-form-group label="Select Score"
                    ><v-select
                      :options="scoreList"
                      label="value"
                      v-model="form.score"
                      :reduce="(item) => item.id"
                      placeholder="Available options here"
                      required
                      :clearable="false"
                      aria-describedby="score-live-feedback"
                    >
                    </v-select>
                    <b-form-invalid-feedback id="score-live-feedback">
                      This is a required field.
                    </b-form-invalid-feedback>
                  </b-form-group>
                  
                   <div class="errorstyles">
                        <div class="z-index">{{ formErrors.score_error }}</div>
                    </div>
              </b-col>
              <b-col md="6">
                <b-form-group label="Select Units"
                    ><v-select
                      :options="unitList"
                      label="value"
                      v-model="form.units"
                      :reduce="(item) => item.id"
                      placeholder="Available options here"
                      required
                      :clearable="false"
                      aria-describedby="score-live-feedback"
                    >
                    </v-select>
                    <b-form-invalid-feedback id="score-live-feedback">
                      This is a required field.
                    </b-form-invalid-feedback>
                  </b-form-group>
                  
                   <div class="errorstyles">
                        <div class="z-index">{{ formErrors.score_error }}</div>
                    </div>
              </b-col>
              <b-col md="6" class="mt-4">
                    <b-checkbox
                     v-model="form.high_risk_flag"
                    >
                      high risk flag
                    </b-checkbox>
                   
              </b-col>
             
           </b-row>
            <b-row class="float-right">
              <b-button size="lg" variant="primary" @click="manage()">
                Add Country
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
import { validationMixin } from "@/mixins";
import { getAll as getCompanyList } from "@/api/businessUserKYC";
import { getAllCountry } from "@/api/exchangeRates";
import { getAllCountriesData as list, saveCountry , updateCountry } from "@/api/specialRates";
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
          text: "Country SetUp",
          active: true,
        },
      ],
      special_rate_url:'http://3.111.47.115:8004/api/v1/',
      country_url:'http://3.111.47.115:8001/api/v1/',
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
        country_name: null,
        country_numeric_code: null,
        country_iso2_code: null,
        country_iso3_code: null,
        currency_code: null,
        mobile_code: null,
        score: null,
        high_risk_flag: null,
        units:null
      },
      formErrors:{
        country_name_error: null,
        country_numeric_code_error: null,
        country_iso2_code_error: null,
        country_iso3_code_error: null,
        currency_code_error: null,
        mobile_code_error: null,
        score_error: null,
        high_risk_flag_error: null,
        units_error:null,
      },
      form: null,
      fields: [
        { key: "id", label: "id" },
        { key: "country_name", label: "Country Name" },
        { key: "country_numeric_code", label: "Numeric Code" },
        { key: "currency_code", label: "Currency Code" },
        { key: "mobile_code", label: "Mobile Code" },
        { key: "score", label: "Score" },
        { key: "high_risk_flag", label: "High Risk" },
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
      scoreList: [
        {
          id: "1",
          value: "1",
        },
        {
          id: "2",
          value: "2",
        },
        {
          id: "3",
          value: "3",
        },
        {
          id: "4",
          value: "4",
        },
        {
          id: "5",
          value: "5",
        },
      ],
      unitList: [
        {
          id: "100",
          value: "100",
        },
        {
          id: "200",
          value: "200",
        },
        {
          id: "300",
          value: "300",
        },
        {
          id: "400",
          value: "400",
        },
        {
          id: "500",
          value: "500",
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
  
  methods: {
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
      this.isError = false;
      this.error = null;
      this.onSearch();
    },
    onSearch() {
      list().then((res) => {
        this.items = res.data.data;
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
      axios.delete(this.country_url + `country_setup/delete-country/${item.id}` , {
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
    newDealClicked(){
      this.updateTriger=false;
    },
    edit(item) {
      this.form = item;
       this.updateTriger = true;
        this.$refs["country-modal"].show();
      // if (item.special_rates_id > 0) {
      //   getByCompany(item.company_name)
      //     .then((res) => {
      //       this.updateTriger = true;
      //       this.form = {};
      //       this.form = res.data.data[0];
      //       this.$refs["country-modal"].show();
      //       console.log(res);
      //       console.log('item',this.form);
      //     })
      //     .catch((error) => {
      //       this.isError = true;
      //       this.error = error.message;
      //     });
      // }
    },
    restrictDecimal () {
            this.form.special_rate = (this.form.special_rate).toFixed(4);
    },

    manage() {
      // debugger; // eslint-disable-line no-debugger
      console.log(this.form);
      if(!this.form.country_name){
        this.formErrors.country_name_error = "Country Name is Required"
      }else{
         this.formErrors.country_name_error = ""
      }

      if(!this.form.country_numeric_code){
        this.formErrors.country_numeric_code_error = "country numeric code is Required"
      }else{
         this.formErrors.country_numeric_code_error = ""
      }

      if(!this.form.country_iso2_code){
        this.formErrors.country_iso2_code_error = "country iso2 code is Required"
      }else{
         this.formErrors.country_iso2_code_error = ""
      }

      if(!this.form.country_iso3_code){
        this.formErrors.country_iso3_code_error = "country iso3 code is Required"
      }else{
         this.formErrors.country_iso3_code_error = ""
      }

      if(!this.form.currency_code){
        this.formErrors.currency_code_error = "currency code is Required"
      }else{
         this.formErrors.currency_code_error = ""
      }

      if(!this.form.mobile_code){
        this.formErrors.mobile_code_error = "mobile code is Required"
      }else{
         this.formErrors.mobile_code_error = ""
      }

      if(!this.form.score){
        this.formErrors.score_error = "score is Required"
      }else{
         this.formErrors.score_error = ""
      }


      if(!this.form.units){
        this.formErrors.units_error = "units is Required"
      }else{
         this.formErrors.units_error = ""
      }

     
      


      if(this.form.country_name && this.form.country_numeric_code && this.form.country_iso2_code && this.form.country_iso3_code && this.form.currency_code && this.form.mobile_code && this.form.score){
          if (this.updateTriger) {
            console.log("inside update ",this.form);
            
        updateCountry(this.form,this.form.id)
          .then((res) => {
            this.$refs["country-modal"].hide();
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
        this.form.country_numeric_code = 91;
        this.form.score = 1;
        this.form.units = 1;
        saveCountry(this.form)
          .then((res) => {
            this.$refs["country-modal"].hide();
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
#sr-country-wise-country___BV_modal_footer_ {
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