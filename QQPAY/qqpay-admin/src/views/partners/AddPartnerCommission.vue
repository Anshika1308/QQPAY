<template>
  <div class="add-partner-commission">
    <b-container>
      <form @submit.prevent="handleSubmit">
        <b-card class="mt-3" header="Add Partner Commission">
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-group id="input-group-partner-type" label="Partner Type" label-for="input-partner-type">
                <b-form-select
                    v-model="partnerSelected"
                    :options="partnerType"
                    class="mb-3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-group id="input-group-payment-method" label="Payment Method" label-for="input-payment-method">
                <b-form-select
                    v-model="paymentMethodSelected"
                    :options="paymentMethodOptions"
                    class="mb-3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-group id="input-group-service-charge-typ" label="Service Charge Type"
                            label-for="input-service-charge-type">
                <b-form-select
                    v-model="selectedServiceCharge"
                    :options="selectedServiceChargeType"
                    class="mb-3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-group id="input-group-service-charge" label="Service Charge" label-for="input-service-charge"
                            description="This field is required">
                <b-form-input id="input-contact-service-charge" v-model="serviceCharge" type="text" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-group id="input-group-currency" label="Currency" label-for="input-currency">
                <b-form-select
                    v-model="selectedCurrency"
                    :options="selectedCurrencyType"
                    class="mb-3"
                />
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-group id="input-group-upper-limit" label="Upper Limit"
                            label-for="input-group-upper-limit" description="This field is required">
                <b-form-input id="input-group-upper-limit" v-model="upperLimit" type="text" required/>
              </b-form-group>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12">
              <b-form-checkbox
                  class="mb-2"
                  id="checkbox-active-status"
                  v-model="active"
                  name="checkbox-active-status"
                  value="true"
                  unchecked-value="false"
              >
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
        <b-row>
          <b-button class="submit-btn" type="submit">Submit</b-button>
        </b-row>
      </form>
    </b-container>
  </div>
</template>


<script>
import {mapActions} from "vuex";

export default {
  name: 'AddPartnerCommission',
  data() {
    return {
      partnerSelected: null,
      partnerType: [
        {value: null, text: 'Please select an option'},
        {value: 'a', text: 'This is First option'},
        {value: 'b', text: 'Selected Option'},
        {value: 'c', text: 'This is an option with object value'},
        {value: 'd', text: 'This one is disabled', disabled: true}
      ],
      paymentMethodSelected: null,
      paymentMethodOptions: [
        {value: "cash_payment", text: 'Cash Payment'},
        {value: 'account_deposit', text: 'Account Payment'},
      ],
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
      upperLimit: "",
      payCommission: "",
      remarks: "",
      active: false
    }
  },
  methods: {
    ...mapActions(["addPartner"]),
    handleSubmit() {
      this.addPartner({
            vm: this, data: {
              agent_code: this.companyDetail.partnerId,
              contact_name1: this.contactInformation.contactPerson1,
              designation1: this.contactInformation.post1,
              email1: this.contactInformation.contactPersonEmail1,
              contact_name2: this.contactInformation.contactPerson2,
              designation2: this.contactInformation.post2,
              email2: this.contactInformation.contactPersonEmail2,
              company_name: this.companyDetail.nameOfEmployer,
              agent_lic_no: this.companyDetail.businessLicense,
              agent_type: this.companyDetail.partnerType,
              agent_sub_type: "string",
              address: this.companyDetail.address,
              zip_code: this.companyDetail.zipCode,
              city: this.companyDetail.city,
              country: this.companyDetail.country,
              phone1: this.companyDetail.phone1,
              alt_phone_number: this.companyDetail.phone2,
              email: this.companyDetail.email,
              current_balance: 0,
              currency_type: this.bankAndBranchAccountDetail.localCurrency,
              date_of_join: "2022-05-22T16:15:32.452Z",
              status: "string",
              remarks: this.bankAndBranchAccountDetail.remarks,
              commission: 0,
              cType: "string",
              limit: 0,
              limit_per_person: 0,
              zone_id: 0,
              gmt_value: 0,
              mobile_no_format: this.additionalDetails.mobileFormat,
              mobile_digit_min: this.additionalDetails.mobileDigitMin,
              mobile_digit_max: this.additionalDetails.mobileDigitMax,
              credit_bank_limit: 0,
              increased_credit_limit: 0,
              limit_for_customer: 0,
              agent_short_code: "string",
              current_commission: 0,
              door_to_door_charge: 0,
              trn_limit_per_day: 0,
              trn_limit_date: "2022-05-22T16:15:32.452Z",
              payout_agent_balance: 0,
              alert_balance_amount: 0,
              alert_balance_enable: false,
              receiver_mobile_format: "string",
              date_format: "string",
              cal_commission_daily: "string",
              max_payout_amt_per_trans: 0,
              ext_agent_code: "string",
              settlement_type: "string",
              approve_by: "string",
              approve_date: "2022-05-22T16:15:32.452Z",
              non_IRH_agent: "string",
              external_ledger_id: "string",
              super_agent_id: "string",
              agent_settlement_date: "2022-05-22T16:15:32.452Z",
              helpdesk_detail: "string",
              settlement_calc_by: "string",
              is_uniteller_agent: false,
              max_payout_amt_per_trans_deposit: 0,
              ext_settlement_clm: "string",
              consolidate_balance: "string",
              enable_txn_password: false,
              fund_collect_nos_day: 0,
              generate_partner_pinno: false,
              img_name: "string",
              lic_exp_date: "2022-05-22T16:15:32.452Z",
              limit_per_tran_b2b: 0,
              mileage_points_per_txn: 0,
              payout_fund_limit: false,
              third_party_agent: false,
              disable_txn_approve: false,
              agent_risk_score: 0,
              tax_type: this.bankAndBranchAccountDetail.taxType,
              softex_id: "string",
              disable_api_send: false,
              company_licence_number: "string",
              limit_approved: false,
              is_ir_hub_partner: false
            }
          }
      )
    }
  },
  computed: {},
  async created() {

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

.bv-no-focus-ring {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>