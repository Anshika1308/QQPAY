<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <!-- <b-row>
      <b-col cols="12">
        <div class="float-right mt-3">
          <b-button size="md" variant="outline-light" v-b-modal.sr-country-wise
            >Add Special Rates</b-button
          >
        </div>
      </b-col>
    </b-row> -->
    <b-row>
      <b-col cols="6">
        <div>
          <b-input-group size="md" class="mt-3">
            <b-form-input
              placeholder="Search for user"
              v-model="form.search_user"
              class="converted"
            ></b-form-input>
            <template #append>
              <b-dropdown :text="form.filter_option" right variant="light">
                <b-dropdown-item
                  v-for="option in filter_options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.text }}
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-input-group>
        </div>
      </b-col>
      <b-col cols="1">
        <div class="mt-3">
          <b-button class="float-right" variant="primary" @click="onSearch"
            >Search</b-button
          >
        </div>
      </b-col>
      <b-col cols="3">
        <div class="float-right mt-3">
          <b-button size="md" variant="outline-light" v-b-modal.sr-country-wise
            >Add Special Rates</b-button
          >
        </div>
      </b-col>
      <b-col cols="2">
        <div class="float-right mt-3">
          <b-button-group size="md">
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
    <b-table
      :items="items"
      :fields="fields"
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
        <div class="action-div">
          <b-button
            variant="light"
            size="sm"
            @click="edit(row.item)"
            class="mr-2 expand-btn"
          >
            <b-icon icon="pencil-square"></b-icon>
          </b-button>
        </div>
      </template>
    </b-table>
    <b-modal
      id="sr-country-wise"
      ref="modal"
      title="Special Rates"
      size="md"
      variant="primary"
      hide-footer
      @hide="resetForm()"
    >
      <b-card no-body class="my-custom-class">
        <b-row>
          <b-form>
            <div class="row">
              <b-col cols="12">
                <b-form-group label="Company">
                  <v-select
                    :options="companyList"
                    label="registered_business_name"
                    v-model="form.company"
                    :reduce="(item) => item.business_user_kyc_id"
                    required
                    :clearable="false"
                    :class="{
                      'is-invalid': $v.form.company.$error,
                    }"
                    aria-describedby="company-live-feedback"
                  >
                  </v-select>
                  <b-form-invalid-feedback id="company-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Currency Type"
                  ><v-select
                    :options="currencyList"
                    label="currency_code"
                    v-model="form.currency_type"
                    :reduce="(item) => item.id"
                    required
                    @input="onChangeCurrency()"
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
              </b-col>
              <b-col cols="6">
                <b-form-group label="Special Rate">
                  <b-form-input
                    type="number"
                    id="special_rate"
                    name="special_rate"
                    v-model="form.special_rate"
                    size="md"
                    @keypress="onlyForDecimal($event, form.special_rate)"
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
              </b-col>
              <b-col cols="6">
                <b-form-group label="Publish Rate">
                  <label>
                    {{
                      this.publishRate == null
                        ? "N/A"
                        : this.publishRate.publish_rate
                    }}
                  </label>
                  <!-- <b-form-input
                    type="number"
                    id="publish_Rate"
                    name="publish_Rate"
                    v-model="form.publish_Rate"
                    size="md"
                    @keypress="onlyForDecimal($event, form.publish_Rate)"
                    required
                    :class="{
                      'is-invalid': $v.form.publish_Rate.$error,
                    }"
                    aria-describedby="publish_Rate-live-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="publish_Rate-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback> -->
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Reuters Rate">
                  <label>
                    {{
                      this.publishRate == null
                        ? "N/A"
                        : this.publishRate.reuters_rate
                    }}
                  </label>
                  <!-- <b-form-input
                    type="number"
                    id="reuters_rate"
                    name="reuters_rate"
                    v-model="form.reuters_rate"
                    size="md"
                    @keypress="onlyForDecimal($event, form.reuters_rate)"
                    required
                    :class="{
                      'is-invalid': $v.form.reuters_rate.$error,
                    }"
                    aria-describedby="reuters_rate-live-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="reuters_rate-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback>-->
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Paying Amount(min)">
                  <b-form-input
                    type="number"
                    id="paying_amount_min"
                    name="paying_amount_min"
                    v-model="form.paying_amount_min"
                    size="md"
                    @keypress="onlyForDecimal($event, form.paying_amount_min)"
                    required
                    :class="{
                      'is-invalid': $v.form.paying_amount_min.$error,
                    }"
                    aria-describedby="paying_amount_min-live-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="paying_amount_min-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback></b-form-group
                >
              </b-col>
              <b-col cols="6">
                <b-form-group label="Paying Amount(max)"
                  ><b-form-input
                    type="number"
                    id="paying_amount_max"
                    name="paying_amount_max"
                    v-model="form.paying_amount_max"
                    size="md"
                    @keypress="onlyForDecimal($event, form.paying_amount_max)"
                    required
                    :class="{
                      'is-invalid': $v.form.paying_amount_max.$error,
                    }"
                    aria-describedby="paying_amount_max-live-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="paying_amount_max-live-feedback">
                    This is a required field.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col cols="6">
                <b-form-group label="Rates Date">
                  <b-form-group id="fieldset-1" label-for="example-datepicker">
                    <b-form-datepicker
                      id="example-datepicker"
                      v-model="form.processing_date"
                      size="sm"
                    ></b-form-datepicker> </b-form-group
                ></b-form-group>
              </b-col>
            </div>
            <b-row class="float-right">
              <b-button size="lg" variant="primary" @click="manage()">
                Add Special Rates
              </b-button>
            </b-row>
          </b-form>
        </b-row>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import { getAll as getCompanyList } from "@/api/businessUserKYC";
import { getAllCountry } from "@/api/exchangeRates";
import { getAll as list, getByCompany, save, update } from "@/api/specialRates";
import { getPublishRateByCurrency } from "@/api/dailyForex";
export default {
  mixins: [validationMixin],
  data() {
    return {
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
      isError: false,
      error: null,
      companyList: [],
      currencyList: [],
      payoutPartnerList: [],
      paymentModeList: [],
      publishRate: null,
      items: [],
      defaultForm: {
        id: 0,
        company: null,
        currency_type: null,
        special_rate: null,
        publish_Rate: null,
        reuters_rate: null,
        paying_amount_min: null,
        paying_amount_max: null,
        processing_date: null,
      },
      form: null,
      fields: [
        { key: "id", label: "SNO" },
        { key: "company_name", label: "Company Name" },
        { key: "currency_type", label: "Currency Type" },
        { key: "special_rate", label: "Special Rate" },
        { key: "publish_rate", label: "Publish Rate" },
        { key: "reuters_rate", label: "Reuters Rate" },
        { key: "min_paying_amount", label: "Paying Amount(min)" },
        { key: "max_paying_amount", label: "Paying Amount(max)" },
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
      publish_Rate: {
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
    onlyForDecimal($event, val) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || val.toString().indexOf(".") != -1)
      ) {
        $event.preventDefault();
      }

      if (
        val != null &&
        val.toString().indexOf(".") != -1 &&
        val.toString().split(".")[1].length > 3
      ) {
        $event.preventDefault();
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
        debugger; // eslint-disable-line no-debugger
      });
    },
    onChangeCurrency() {
      debugger; // eslint-disable-line no-debugger

      let result = this.currencyList.find(
        (el) => el.id === this.form.currency_type
      );
      getPublishRateByCurrency(result.currency_code)
        .then((res) => {
          debugger; // eslint-disable-line no-debugger
          this.publishRate = res.data.data[0];
        })
        .catch((error) => {
          this.isError = true;
          this.error = error.message;
        });
    },
    edit(item) {
      if (item.id > 0) {
        getByCompany(item.id)
          .then((res) => {
            this.form = Object.assign({}, res.data);
            console.log(res);
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          });
      }
    },
    manage() {
      debugger; // eslint-disable-line no-debugger
      console.log(this.form);
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      debugger; // eslint-disable-line no-debugger
      if (this.form.id > 0) {
        debugger; // eslint-disable-line no-debugger
        update(this.form)
          .then((res) => {
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
        debugger; // eslint-disable-line no-debugger
        save(this.form)
          .then((res) => {
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
#sr-country-wise___BV_modal_footer_ {
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