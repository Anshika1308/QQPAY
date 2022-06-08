<template>
  <div>
    <h4>{{ $t("fundTransfers.letusKnowWhySend") }}</h4>
    <b-row class="mt-5">
      <b-col
        ><b-form-group
          :label="$t('fundTransfers.paymentMethod')"
          label-for="input-name"
        >
          <b-form-select
            v-model="transaction_details.details.method"
            :options="method_options"
            class="mb-3"
            value-field="value_code"
            text-field="value"
            disabled-field="notEnabled"
            ><b-form-select-option :value="null"
              >select payment method</b-form-select-option
            ></b-form-select
          >
          <formError
            v-show="p_m_error"
            error_msg="Please Select Payment Method"
          /> </b-form-group
      ></b-col>
      <b-col
        ><b-form-group
          :label="$t('fundTransfers.transactionReason')"
          label-for="input-type"
        >
          <b-form-select
            v-model="transaction_details.details.reason_of_remittance_cd"
            :options="remittenceReasons"
            class="mb-3"
            value-field="value_code"
            text-field="value"
            disabled-field="notEnabled"
          >
            <b-form-select-option :value="null"
              >select transaction reason</b-form-select-option
            >
          </b-form-select>
          <formError
            v-show="t_r_error"
            error_msg="Please Select Transaction Reason"
          /> </b-form-group
      ></b-col>
      <b-col
        ><b-form-group label="Payment type" label-for="input-type">
          <b-form-select
            v-model="transaction_details.details.payment_type"
            :options="paymentTypeOptions"
            class="mb-3"
            value-field="value_code"
            text-field="value"
            disabled-field="notEnabled"
          >
            <b-form-select-option value=""
              >select payment option</b-form-select-option
            >
          </b-form-select>
          <formError
            v-show="p_t_error"
            error_msg="Please Select Payment Type"
          /> </b-form-group
      ></b-col>
    </b-row>

    <b-form-group
      :label="$t('fundTransfers.sourceFund')"
      label-for="input-type"
      class="mt-2"
    >
      <b-form-select
        v-model="transaction_details.details.source_of_fund_cd"
        :options="sourceOfFunds"
        class="mb-3"
        value-field="value_code"
        text-field="value"
        disabled-field="notEnabled"
        ><b-form-select-option :value="null"
          >select source of fund</b-form-select-option
        ></b-form-select
      >
      <formError
        v-show="s_f_error"
        error_msg="Please Select Transaction Reason"
      />
    </b-form-group>
    <b-form-group
      :label="$t('fundTransfers.remarks')"
      label-for="input-type"
      class="mt-2"
    >
      <b-form-input
        id="input-name"
        v-model="transaction_details.details.remarks"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      label-cols-sm="12"
      label-cols-lg="6"
      label-align-lg="right"
      content-cols-sm="12"
      content-cols-lg="6"
      v-if="transaction_details.details.method === 'Bank Deposit'"
      :label="$t('fundTransfers.uploadBankReceipt')"
      label-for="input-type"
      class="mt-2"
    >
      <b-button-group class="mx-1">
        <b-button variant="success" v-if="false" class="mr-1"
          ><b-icon icon="cloud-check-fill"></b-icon
        ></b-button>
        <b-button variant="warning" v-else class="mr-1"
          ><b-icon icon="cloud-upload-fill"></b-icon
        ></b-button>
        <b-button variant="light"><b-icon icon="eye-fill"></b-icon></b-button>
      </b-button-group>
    </b-form-group>
    <b-button
      class="float-left mt-5 px-5"
      variant="outline-secondary"
      @click="buttonBackClickHandler"
      >{{ $t("backLabel") }}</b-button
    >

    <b-button
      class="float-right mt-5 px-5"
      variant="primary"
      @click="buttonClickHandler"
      >{{ $t("next") }}</b-button
    >
  </div>
</template>

<script>
import constants from "../../../constants.json"
import axios from "axios";
import formError from "../formError.vue"
export default {
  components: {
    formError
  },
  props: ["txnDetails"],
  data () {
    return {
      paymentTypeOptions: [{ value: 'Credit Card', value_code: 'CC' }, { value: 'Direct Debit', value_code: 'DD' }],
      method_options: null,
      remittenceReasons: null,
      sourceOfFunds: null,
      p_m_error: true,
      t_r_error: true,
      s_f_error: true,
      p_t_error: true
    }
  },
  mounted () {
    console.log("ref_rec_type_desc", this.method_options)
  },
  watch: {
    "transaction_details.details.method" (val) {
      console.log(val)
      if (val !== "") {
        this.transaction_details.details.methodText = this.method_options.filter(x => x.value_code === val)[0].value
        console.log(this.transaction_details.details.methodText)
        this.p_m_error = false
      } else {
        this.p_m_error = true
      }
    },
    "transaction_details.details.source_of_fund_cd" (val) {
      console.log(val)
      console.log(this.sourceOfFunds)
      if (val !== "") {
        this.transaction_details.details.sourceOfFundsText = this.sourceOfFunds.filter(x => x.value_code === val)[0].value
        console.log("sf", this.transaction_details.details.sourceOfFundsText)
        this.s_f_error = false
      } else {
        this.s_f_error = true
      }
    },
    "transaction_details.details.reason_of_remittance_cd" (val) {
      console.log(this.remittenceReasons);
      console.log(val)

      if (val !== "") {
        this.transaction_details.details.remittenceReasonsText = this.remittenceReasons.filter(x => x.value_code === val)[0].value
        this.t_r_error = false
      } else {
        this.t_r_error = true
      }
    },
    "transaction_details.details.payment_type" (val) {

      if (val !== "" || val !== null) {
        this.p_t_error = false
      } else {
        this.p_t_error = true
      }
    },

  },
  computed: {
    transaction_details: {
      get () {
        return this.txnDetails;
      },
      set (transaction_details) {
        this.$emit("input", transaction_details)
      }
    },
  },
  methods: {
    buttonBackClickHandler () {
      this.$emit('my-event-click-back')
    },
    buttonClickHandler () {
      console.log(this.transaction_details.details);
      if (this.transaction_details.details.method !== null || this.transaction_details.details.method !== "null" && this.transaction_details.details.reason_of_remittance_cd !== null || this.transaction_details.details.reason_of_remittance_cd !== "" && this.transaction_details.details.source_of_fund_cd !== null || this.transaction_details.details.source_of_fund_cd !== "") {
        console.log(this.transaction_details)
        let beneficiary = JSON.parse(localStorage.getItem('selectedBeneficiary'))
        let transactionData = {
          "total_coll_amount": this.transaction_details.details.target_amount,
          "coll_crncy_cd": this.transaction_details.details.source_country,
          "coll_ex_rate": this.transaction_details.details.exchangerate,
          "pay_amount": this.transaction_details.details.target_amount,
          "pay_crncy_cd": this.transaction_details.details.target_country,
          "payment_mode_cd": this.transaction_details.details.payment_type,
          "trans_comments": this.transaction_details.details.remarks,
          "source_of_fund_cd": this.transaction_details.details.sourceOfFundsText,
          "reason_of_remittance_cd": this.transaction_details.details.remittenceReasonsText,
          "Remittee_id": beneficiary[0].Remitter_id,
          "is_self": JSON.parse(localStorage.getItem('on_behalf_details')).on_behalf,
          "on_behalf_id": JSON.parse(localStorage.getItem('on_behalf_id'))
        }
        axios
          .post(`${constants.SERVER_API}/transaction/save`, transactionData, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
            },
          })
          .then((response) => {
            console.log('payment methods', response)
            this.$emit('my-event')
          })
          .catch((error) => {
            console.log(error);
          });

      }
    },
    getPaymentMethods () {
      axios
        .get(`${constants.SERVER_API}/sub_category/payment-mode`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          console.log('payment methods', response)
          this.method_options = response.data.data[0]
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRemittenceReasons () {
      axios
        .get(`${constants.SERVER_API}/sub_category/remittence-reason`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          console.log('remittenceReasons methods', response)
          this.remittenceReasons = response.data.data[0]
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSourceFunds () {
      axios
        .get(`${constants.SERVER_API}/sub_category/source-of-funds`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          console.log('source-of-funds ', response)
          this.sourceOfFunds = response.data.data[0]
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created () {


    if (this.transaction_details.details.method !== null || this.transaction_details.details.method !== "" && this.transaction_details.details.reason_of_remittance_cd !== null || this.transaction_details.details.reason_of_remittance_cd !== "" && this.transaction_details.details.source_of_fund_cd !== null || this.transaction_details.details.source_of_fund_cd !== "") {
      let stored_transaction_details = JSON.parse(localStorage.getItem('transactionDetails'))
      this.transaction_details.details.method = stored_transaction_details.details.method
      this.transaction_details.details.reason_of_remittance_cd = stored_transaction_details.details.reason_of_remittance_cd
      this.transaction_details.details.source_of_fund_cd = stored_transaction_details.details.source_of_fund_cd
      this.p_m_error = false
      this.t_r_error = false
      this.s_f_error = false
    } else {
      this.transaction_details.details.method = ""
      this.transaction_details.details.reason_of_remittance_cd = ""
      this.transaction_details.details.source_of_fund_cd = ""
    }
    this.getPaymentMethods()
    this.getRemittenceReasons()
    this.getSourceFunds()
  }
}
</script>

<style>
</style>