<template>
  <div class="transaction">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar :title="$t('fundTransfers.fundTransfer')" />
      <b-container>
        <b-row align-v="center" align-h="center" class="mt-5">
          <b-col col sm="12" md="12" lg="12">
            <step-progress
              :current="currentStep"
              :steps="steps"
            ></step-progress>
          </b-col>
        </b-row>
        <b-row align-h="center my-5">
          <b-col col sm="12" md="12" lg="8">
            <div v-if="currentStep == 1">
              <StepOne
                :txnDetails="transaction_details"
                :country_options="country_options"
                :delivery_options="delivery_options"
                @my-event="onClickNext"
                v-model="transaction_details"
              />
            </div>
            <div v-if="currentStep == 2">
              <StepTwo
                :txnDetails="transaction_details"
                @my-event="onClickNext"
                @my-event-click-back="onClickBack"
                v-model="transaction_details"
              />
            </div>
            <div v-if="currentStep == 3">
              <StepThree
                :txnDetails="transaction_details"
                @my-event="onClickNext"
                @my-event-click-back="onClickBack"
                v-model="transaction_details"
              />
            </div>
            <div v-if="currentStep == 4">
              <StepFour
                :txnDetails="transaction_details"
                @my-event="onClickNext"
                @my-event-click-back="onClickBack"
              />
            </div>
            <div v-if="currentStep == 5" class="text-center">
              <div style="justify-content: center; display: grid">
                <img
                  center
                  alt="QQ Pay"
                  class="logo_img"
                  src="../../assets/transaction.gif"
                />
              </div>
              <div class="text-left">
                <div>
                  <b-card>
                    <div
                      class="bg-dark"
                      style="border-radius: 5px; padding: 30px"
                    >
                      <b-card>
                        <div class="row box-right">
                          <div class="col-md-8 ps-0">
                            <p class="ps-3 textmuted fw-bold h4 mb-0">
                              {{
                                transaction_details.details.source_country_name
                              }}
                            </p>
                            <p class="fw-bold d-flex">
                              <span class="h1">{{
                                transaction_details.details.source_amount
                              }}</span>
                              <span class="h6" style="display: contents">{{
                                transaction_details.details.source_country
                              }}</span>
                            </p>
                            <!-- <p class="ms-3 px-2 bg-green">
                              +10% since last month
                            </p> -->
                            <p class="ps-3 textmuted fw-bold h4 mb-0">
                              {{
                                transaction_details.details.target_country_name
                              }}
                            </p>
                            <p class="p-org">
                              <strong>Convertable Amount</strong>
                            </p>
                            <p class="fw-bold">
                              {{
                                transaction_details.details.target_amount
                              }}&nbsp;<span class="textmuted">{{
                                transaction_details.details.target_country
                              }}</span>
                            </p>
                          </div>
                          <div class="col-md-4">
                            <p class="p-blue">
                              <strong>Service Charge</strong>
                            </p>
                            <p class="fw-bold mb-3">
                              <span class="fas fa-dollar-sign pe-1"></span
                              >{{ transaction_details.details.service_charge }}
                              <span class="textmuted">{{
                                transaction_details.details.service_charge_CC
                              }}</span>
                            </p>
                          </div>
                        </div>
                      </b-card>
                    </div>
                  </b-card>
                </div>

                <!-- <ul>
                  <li
                    v-for="(value, key) in transaction_details.beneficiary"
                    :key="key"
                  >
                    {{ key.toUpperCase() }} : <b>{{ value }}</b>
                  </li>
                  <li
                    v-for="(value, key) in transaction_details.details"
                    :key="key"
                  >
                    {{ key.toUpperCase() }} : <b>{{ value }}</b>
                  </li>
                </ul> -->
              </div>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >Back</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="ConfirmAndPay"
                >Confirm and PAY</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";
import NavBarLeft from "@/components/navigations/NavBarLeft.vue";
import StepProgress from "@/components/tools/StepProgress.vue";
import StepOne from "@/components/transactions/stepOne.vue";
import StepTwo from "@/components/transactions/stepTwo.vue";
import StepThree from "@/components/transactions/stepThree.vue";
import StepFour from "@/components/transactions/stepFour.vue";
// import StepFive from "@/components/transactions/stepFive.vue";
import constants from "../../../constants.json"
import axios from "axios";
export default {
  name: "Transaction",
  components: {
    NavBar,
    TitleBar,
    NavBarLeft,
    "step-progress": StepProgress,
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
    // StepFive
  },
  data () {
    return {
      remittenceReasons: [],
      filter: null,
      on_behalf: false,
      tabIndex: 1,
      currentStep: 1,
      selected: [],
      steps: [
        { text: this.$t('fundTransfers.amount') },
        { text: this.$t('fundTransfers.you') },
        { text: this.$t('fundTransfers.receipient') },
        { text: this.$t('fundTransfers.transactionDetails') },
        { text: this.$t('fundTransfers.reviewPay') },
      ],
      transaction_details: {
        beneficiary: {},
        details: {
          source_amount: 0,
          exchangerate: 0,
          ourFee: 0,
          target_amount: 0,
          source_country: "MYR",
          source_country_name: "MALAYSIA",
          target_country: "INR",
          target_country_name: "INDIA",
          delivery_method: "",
          payment_type: "",
          method: "",
          reason_of_remittance_cd: "",
          source_of_fund_cd: "",
          remarks: "",
          methodText: "",
          sourceOfFundsText: "",
          remittenceReasonsText: "",
        },
      },
      method_options: [
        {
          text: "FPX",
          value: "FPX",
        },
        {
          text: "Bank Deposit",
          value: "Bank Deposit",
        },
      ],

      country_options: [
        {
          text: "INDIA",
          value: "INDIA",
        },
        {
          text: "NEPAL",
          value: "NEPAL",
        },
        {
          text: "MALAYSIA",
          value: "MALAYSIA",
        },
      ],
      delivery_options: [
        {
          text: this.$t('fundTransfers.bankAccount'),
          value: "Bank Account",
        },
        {
          text: this.$t('fundTransfers.wallet'),
          value: "Wallet",
        },
        {
          text: this.$t('fundTransfers.homeDelivery'),
          value: "Home Delivery",
        },
        {
          text: this.$t('fundTransfers.pickup'),
          value: "Pick up",
        },
      ],
      sourceOfFunds: [],

    };
  },
  mounted () {
    // this.transaction_details = JSON.parse(localStorage.getItem('transactionDetails'))
    // console.log('transactionDetails from local', JSON.parse(localStorage.getItem('transactionDetails')))
  },
  methods: {
    splitKeyValue (obj) {
      const keys = Object.keys(obj);
      const res = [];
      console.log("keys", obj)
      console.log("keys", keys)
      for (let i = 0; i < keys.length; i++) {
        res.push({
          'text': keys[i],
          'value': obj[keys[i]]
        });
      }
      console.log("res", res)
      return res;
    },
    select_beneficiary (data) {
      this.transaction_details.beneficiary = data;
      this.tabIndex++;
      console.log(this.transaction_details.beneficiary);
    },
    onClickNext: function () {
      // alert('hi')
      localStorage.setItem('transactionDetails', JSON.stringify(this.transaction_details))
      console.log('transactionDetails from local', JSON.parse(localStorage.getItem('transactionDetails')))
      this.currentStep++;
    },
    onClickBack: function () {
      this.currentStep--;
    },
    onRowSelected (items) {
      this.selected = items;
    },
    onBehalf () {
      this.on_behalf = true;
    },
    notOnBehalf () {
      this.on_behalf = false;
    },
    ConfirmAndPay () {
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

          this.$router.push({ name: 'PaymentGateway', params: { transaction_details: this.transaction_details } })
        })
        .catch((error) => {
          console.log(error);
        });

      // let data = {
      //   "total_coll_amount": 0,
      //   "coll_crncy_cd": "string",
      //   "coll_ex_rate": "string",
      //   "pay_amount": this.transaction_details.details.target_amount,
      //   "pay_crncy_cd": this.transaction_details.details.target_country,
      //   "payment_mode_cd": "string",
      //   "trans_comments": "string",
      //   "source_of_fund_cd": this.transaction_details.details.target_country,
      //   "reason_of_remittance_cd": "string",
      //   "Remittee_id": 0,
      //   "is_self": true,
      //   "on_behalf_id": 0
      // }
      // axios
      //   .get(`${constants.SERVER_API}/transaction/save`, {
      //     headers: {
      //       accept: 'application/json',
      //       Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
      //     },
      //   })
      //   .then((response) => {
      //     console.log('save transaction response', response)
      //     this.$router.push({ name: 'PaymentGateway', params: { transaction_details: this.transaction_details } })
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

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
          //315

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

  }
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.operation-padding {
  padding-top: 4px;
}
.converted {
  color: $txt;
  font-weight: 600;
}
.logo_img {
  height: 120px;
}
h4 {
  color: $txt;
  text-align: center;
}
::v-deep .btn-primary {
  background-color: $txt !important;
  border-color: $txt !important;
}
.btn-light {
  font-weight: bold;
  color: $dimgrey;
  background: $white;
  margin: 0 5px;
  &:not(:disabled) {
    &:not(.disabled).active {
      color: $secondary;
    }
    &:not(.disabled) {
      &:active {
        color: $secondary;
      }
    }
  }
  &:hover {
    border: 1px solid $txt !important;
    color: $dimgrey;
    background: $white;
  }
}
.form-group {
  margin-bottom: 0 !important;
}
::v-deep th {
  color: $txt !important;
  font-size: 14px;
  font-weight: 600;
}
.operations {
  height: 20px;
  width: 20px;
  position: absolute;
  border-radius: 10px;
  background: #d3d3d3;
  text-align: center;
  font-size: 20px;
  margin-left: -15px;
  line-height: 15px;
  bottom: 15px;
}
.list-group-flush {
  border-left: 1px solid $txt;
  margin-left: 25px;
}
::v-deep .btn-light {
  border: 1px solid #d3d3d3 !important;
}
::v-deep ul {
  list-style-type: none !important;
}
::v-deep label {
  color: $lightslategrey !important;
  margin-bottom: 0 !important;
}
li {
  padding: 7px;
}
</style>
