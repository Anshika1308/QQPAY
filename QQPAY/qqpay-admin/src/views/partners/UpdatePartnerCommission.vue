<template>
  <div class="add-partner-commission">
    <b-container>
      <form @submit.prevent="handleSubmit">
        <b-card class="mt-3" header="Add Partner Commission">
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Partner" />
              <b-form-group id="input-group-partner-type" label="Partner" required label-for="input-partner-type">
                <b-form-select v-model="partnerSelected" :options="partnerType" class="mb-3 form-control" />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Payment Method" />
              <b-form-group id="input-group-payment-method" label="Payment Method" required
                label-for="input-payment-method">
                <b-form-select v-model="paymentMethodSelected" :options="paymentMethodOptions"
                  class="mb-3 form-control" />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Service Charge Type" />
              <b-form-group id="input-group-service-charge-typ" label="Service Charge Type"
                label-for="input-service-charge-type">
                <b-form-select v-model="selectedServiceCharge" :options="selectedServiceChargeType"
                  class="mb-3 form-control" @change="toggleUpperLimit" />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Service Charge" />
              <b-form-group id="input-group-service-charge" label="Service Charge" label-for="input-service-charge">
                <b-form-input id="input-contact-service-charge" v-model="serviceCharge" type="number" />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Country" />
              <b-form-group id="input-group-currency" label="Country" label-for="input-currency">
                <b-form-select v-model="selectedCountry" :options="countryOptions" class="mb-3 form-control" />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Currency" />
              <b-form-group id="input-group-currency" label="Currency" label-for="input-currency">
                <b-form-select v-model="selectedCurrency" :options="selectedCurrencyType" class="mb-3 form-control" />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Upper Limit" />
              <b-form-group id="input-group-upper-limit" label="Upper Limit" label-for="input-group-upper-limit">
                <b-form-input id="input-group-upper-limit" v-model="upperLimit" type="number"
                  :disabled="isDisableUpperLimit" />
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
                <b-form-textarea id="input-remarks" v-model="remarks" rows="6" />
                <b-form-invalid-feedback>{{ errors }}</b-form-invalid-feedback>
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
import { getApiData, putApiData } from "@/helpers/AxiosInstance";
import APIS from "@/constants/EndPoint";
import { responseHandler } from "@/helpers/globalFunctions";
import UpdateLabel from "@/components/reusable/UpdateLabel";

export default {
  name: 'UpdatePartnerCommission',
  props: ["partner_commission_id"],
  components: {
    UpdateLabel
  },
  data() {
    return {
      isDisableUpperLimit: false,
      partnerSelected: null,
      errors: {},
      partnerType: [
        { value: null, text: 'Please select an option', disabled: true }
      ],
      paymentMethodSelected: null,
      paymentMethodOptions: [
        { value: "cash_payment", text: 'Cash Payment' },
        { value: 'account_deposit', text: 'Account Payment' },
      ],
      selectedCountry: null,
      countryOptions: [
        { value: "nepal", text: 'Nepal' },
        { value: 'country', text: 'Country' },
      ],
      selectedServiceCharge: null,
      selectedServiceChargeType: [
        { value: 'percentage', text: 'Percentage' },
        { value: 'flat', text: 'Flat' },
      ],
      serviceCharge: "",
      selectedCurrency: null,
      selectedCurrencyType: [
        { value: 'local_currency', text: 'Local Currency' },
        { value: 'usd', text: 'USD Dollar' },
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
      console.log(formData, "form")
      const response = await putApiData(`${APIS.UPDATE_PARTNER_COMMISSION}/${this.partner_commission_id}`, formData)
      await responseHandler(response.data.status_code, this, response.data.message)
      if (response.data.status_code === 200) {
        await this.$emit("getPartnerCommissions")
        this.$bvModal.hide("update-partner-commission-modal")
      } else {
        response.data.detail?.map((value) => {
          this.errors[`${value.loc[1]}`] = `${value.msg}`
        })
        console.log(this.errors);
      }
    },

    async getPartnerCommission() {
      const res = await getApiData(`${APIS.GET_PARTNER_COMMISSION}/${this.partner_commission_id}`);
      if (res.data.status_code === 200) {
        this.partnerSelected = res.data.data[0].partner_id
        this.paymentMethodSelected = res.data.data[0].payment_method
        this.selectedCountry = res.data.data[0].country
        this.selectedServiceCharge = res.data.data[0].service_charge_by
        this.serviceCharge = res.data.data[0].service_charge
        this.selectedCurrency = res.data.data[0].currency
        this.active = res.data.data[0].is_active
        this.remarks = res.data.data[0].remarks
        this.isDisableUpperLimit = res.data.data[0].service_charge_by === "percentage";
      }
    },


    toggleUpperLimit() {
      this.isDisableUpperLimit = this.selectedServiceCharge === "percentage";
    },

    async getPartners() {
      const response = await getApiData(APIS.GET_PARTNER_LIST);
      if (response.data.status_code === 200) {
        this.partnerType = response?.data?.data?.map(item => ({
          value: item.agent_id,
          text: item.contact_name1
        }))
      }
    },
  },
  async created() {
    await this.getPartners();
    await this.getPartnerCommission()
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