<template>
  <div class="add-partner-commission">
    <b-container>
      <form @submit.prevent="handleSubmit">
        <b-card class="mt-3" header="Add Partner Commission">
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Partner" :error="errors.partner_id"/>
              <b-form-group id="input-group-partner-type" label="Partner" required label-for="input-partner-type">
                <b-form-select v-model="partnerSelected" :options="partnerType" class="mb-3 form-control" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Payment Method"/>
              <b-form-group id="input-group-payment-method" label="Payment Method"
                            label-for="input-payment-method">
                <b-form-select v-model="paymentMethodSelected" :options="paymentMethodOptions"
                               class="mb-3 form-control" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Service Charge Type"/>
              <b-form-group id="input-group-service-charge-typ" label="Service Charge Type"
                            label-for="input-service-charge-type">
                <b-form-select v-model="selectedServiceCharge" :options="selectedServiceChargeType"
                               class="mb-3 form-control" @change="toggleUpperLimit" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Service Charge"/>
              <b-form-group id="input-group-service-charge" label="Service Charge" label-for="input-service-charge">
                <b-form-input id="input-contact-service-charge" v-model="serviceCharge" type="number" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Country"/>
              <b-form-group id="input-group-currency" label="Country" label-for="input-currency">
                <b-form-select v-model="selectedCountry" :options="countryOptions" class="mb-3 form-control" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Currency"/>
              <b-form-group id="input-group-currency" label="Currency" label-for="input-currency">
                <b-form-select v-model="selectedCurrency" :options="selectedCurrencyType" class="mb-3 form-control" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-group id="input-group-upper-limit" label="Upper Limit" label-for="input-group-upper-limit">
                <b-form-input id="input-group-upper-limit" v-model="upperLimit" type="number"
                              :disabled="isDisableUpperLimit"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-checkbox class="mt-5" id="checkbox-active-status" v-model="active" name="checkbox-active-status"
                               value="true" unchecked-value="false">
                Active Status
              </b-form-checkbox>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12">
              <b-form-group id="input-group-remarks" label="Remarks" label-for="input-remarks">
                <b-form-textarea id="input-remarks" v-model="remarks" rows="6"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="d-flex justify-content-end">
          <b-button class="submit-btn " type="submit">Submit</b-button>
        </b-row>
      </form>
    </b-container>
  </div>
</template>


<script>
import {getApiData, postApiData, transactionGetApiData} from "@/helpers/AxiosInstance";
import APIS from "@/constants/EndPoint";
import {responseHandler} from "@/helpers/globalFunctions";
import UpdateLabel from "@/components/reusable/UpdateLabel";

export default {
  name: 'AddPartnerCommission',
  components: {
    UpdateLabel,
  },
  data() {
    return {
      errors: {},
      isDisableUpperLimit: false,
      partnerSelected: null,
      partnerType: [
        {value: null, text: 'Please select an option', disabled: true}
      ],
      paymentMethodSelected: null,
      paymentMethodOptions: [
        {value: "cash_payment", text: 'Cash Payment'},
        {value: 'account_deposit', text: 'Account Payment'},
      ],
      selectedCountry: null,
      countryOptions: [],
      selectedServiceCharge: null,
      selectedServiceChargeType: [
        {value: 'percentage', text: 'Percentage'},
        {value: 'flat', text: 'Flat'},
      ],
      serviceCharge: "",
      selectedCurrency: null,
      selectedCurrencyType: [
        {value: 'local_currency', text: 'Local Currency'},
        {value: 'usd', text: 'USD Dollar'},
      ],
      upperLimit: null,
      payCommission: "",
      remarks: "",
      active: false
    }
  },
  methods: {
    async handleSubmit() {
      const formData = JSON.stringify({
        partner_id: this.partnerSelected,
        country: this.selectedCountry,
        payment_method: this.paymentMethodSelected,
        service_charge_by: this.selectedServiceCharge,
        service_charge: this.serviceCharge,
        currency: this.selectedCurrency,
        upper_limit: this.upperLimit,
        is_active: this.active,
        remarks: this.remarks,
        pay_commission: 0,
      })
      const res = await postApiData(APIS.CREATE_PARTNER_COMMISSION, formData);
      await responseHandler(res.data.status_code, this, res.data.message)
      if (res.data.status_code === 200) {
        await this.$emit("getPartnerCommissions")
        this.$bvModal.hide("partner-commission-modal")
      } else {
        res.data.detail?.map((value) => {
          this.errors[`${value.loc[1]}`] = `${value.msg}`
        })
        console.log(this.errors);
      }
    },
    async formatPartnerOptions() {
      const res = await getApiData(APIS.GET_PARTNER_LIST);
      this.partnerType.push(...res.data.data.map(item => ({
        value: item.agent_id,
        text: item.name_of_employer
      })))
    },
    toggleUpperLimit() {
      this.isDisableUpperLimit = this.selectedServiceCharge === "percentage";
    },
    async getCountryList() {
      const res = await transactionGetApiData(`${APIS.GET_COUNTRY_NAME}`);
      this.countryOptions = res?.data?.map(item => ({
        value: item.id,
        text: item.nationality
      }))
      this.selectedCurrencyType = res?.data?.map(item => ({
        value: item.currency_code,
        text: `${item.currency_code}(${item.currency_name})`
      }))
    }
  },

  async created() {
    await this.formatPartnerOptions();
    await this.getCountryList()
  }
}
</script>
<style lang="scss" scoped>
@import "@/global.scss";

.submit-btn {
  margin: 20px;
  background-color: $primary;
  border: none;
  border-radius: 5px;
  height: 35px;
}

.cancel-button {
  height: 35px;
  margin: 20px;
}

.bv-no-focus-ring {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>