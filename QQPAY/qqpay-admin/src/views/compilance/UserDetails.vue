<template>
  <div>
    <div class="back-btn">
      <b-button
        @click="$emit('backBtnClick')"
        variant="outline-warning"
        class="mt-5 block"
        >Back</b-button
      >
    </div>
    <div class="d-flex">
      <b-avatar square src="" size="10rem"></b-avatar>
      <b-container class="bv-example-row ml-5">
        <b-row>
          <b-col cols="4" style="font-size: 25px; color: black">{{
            userDtl.Remitter_name
          }}</b-col>
          <b-col></b-col>
        </b-row>

        <b-row>
          <!-- <b-col cols="4">23rd Feb 1992</b-col> -->
          <b-col cols="4">{{ userDtl.Remitter_DOB || "23rd Feb 1992" }}</b-col>
          <b-col>{{ userDtl.Phone_Number || 9912110114 }}</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">{{ userDtl.Gender || "Male" }}</b-col>
          <b-col>{{ userDtl.Email_ID || "no-mail@gmail.com" }}</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">{{ userDtl.Country_Code || "India" }}</b-col>
          <b-col>{{ userDtl.Address || "New Town" }}</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">{{
            userDtl.Occupation_Text || "Software Engineer"
          }}</b-col>

          <b-col
            >{{ userDtl.Remitter_State || "Karnataka" }},
            {{ userDtl.Remitter_City || "Bangalore" }} -
            {{ userDtl.Remitter_Zipcode || "560059" }}</b-col
          >
        </b-row>

        <b-row>
          <b-col cols="4"></b-col>
        </b-row>
      </b-container>
    </div>

    <div>
      <b-button variant="outline-warning" class="mt-5 btn"
        >View Compilance</b-button
      >
      <b-button variant="outline-warning" class="mt-5 block"
        >Block Account</b-button
      >
    </div>

    <b-container class="bv-example-row mt-5 justify-content-between">
      <b-row>
        <b-col cols="3" class="data">KYC Status</b-col>
        <b-col cols="4" class="data">{{
          userDtl.Is_Ekyc_User ? "Clear" : "Pending"
        }}</b-col>
        <b-col cols="3" class="data">Account Status</b-col>
        <b-col cols="2" class="data">{{
          userDtl.Is_Active ? "Active" : "Inactive"
        }}</b-col>
      </b-row>

      <b-row v-if="userDtl.Is_Ekyc_User">
        <b-col cols="3" class="data mt-2">Per Transaction Limit</b-col>
        <b-col cols="4" class="data mt-2"
          >{{ transLimitData.per_transaction_limit }} MYR</b-col
        >
        <b-col cols="3" class="data mt-2">Daily txn. limit</b-col>
        <b-col cols="2" class="data mt-2"
          >{{ transLimitData.per_day_limit }} MYR</b-col
        >
      </b-row>


      <b-row v-if="userDtl.Is_Ekyc_User">
        <b-col cols="3" class="data mt-2">Monthly txn. limit</b-col>
        <b-col cols="4" class="data mt-2"
          >{{ transLimitData.per_month_limit }} MYR</b-col
        >
     
      </b-row>

     
    </b-container>

    <b-tabs
      class="mt-5"
      content-class="mt-3"
      active-nav-item-class="text-warning"
      active-tab-class="text-warning"
    >
      <b-tab title="Transactions">
        <b-row>
          <b-col md="9">

          </b-col>
          <b-col md="3">
            <div >
          <b-button class="btn-graph" @click="getTransactionDataForGraph(1)">1M</b-button>
          <b-button class="btn-graph" @click="getTransactionDataForGraph(3)">3M</b-button>
          <b-button class="btn-graph" @click="getTransactionDataForGraph(6)">6M</b-button>
          <b-button class="btn-graph" @click="getTransactionDataForGraph(12)">1Y</b-button>
        </div>
          </b-col>
        </b-row>
        

        <LineChart :transactionData="chartDataForCurruntMonth" :key="chartKey" />
        <div class="mt-5 d-flex" style="margin-left: 51px">
          <b-card
            class="info"
            border-variant="secondary"
            header="Transaction by Country"
            gn="left"
          >
            <b-card-text>
              <div v-for="tramscationByCountry in transactionsByCountry" :key="tramscationByCountry">
              <span class="label">{{tramscationByCountry.country}}</span>
              <span class="lab2">{{tramscationByCountry.amount}}</span>
              <b-progress
                variant="warning"
                height="2px"
                :value="value"
                :max="max"
                class="mb-3"
              ></b-progress>
              </div>
              
              <div></div>
            </b-card-text>
          </b-card>

          <b-card
            class="info1"
            border-variant="secondary"
            header="Transaction by reception method"
            align="left"
          >
            <b-card-text>
              <div v-for="tramscationByPayment in transactionsByPaymentMode" :key="tramscationByPayment.length">
              <span class="label">{{tramscationByPayment.payment_mode}}</span>
              <span class="lab2">{{tramscationByPayment.amount}}</span>
              <b-progress
                variant="warning"
                height="2px"
                :value="value"
                :max="max"
                class="mb-3"
              ></b-progress>
              </div>

            </b-card-text>
          </b-card>

          <b-card
            class="info1"
            border-variant="secondary"
            header="Transaction by Currency"
            align="left"
            v-if="transactionsByCurruncy"
          >
            <b-card-text>
              <div v-for="tramscationByCurruncy in transactionsByCurruncy" :key="tramscationByCurruncy.length">
              <span class="label">{{tramscationByCurruncy.currency}}</span>
              <span class="lab2">{{tramscationByCurruncy.amount}}</span>
              <b-progress
                variant="warning"
                height="2px"
                :value="value"
                :max="max"
                class="mb-3"
              ></b-progress>
              </div>
            </b-card-text>
          </b-card>
        </div>
        <div>
          <b-container class="bv-example-row mt-5">
            <b-row class="transdata">
              <b-col> </b-col>
              <b-col cols="2" class="ml-5">Name</b-col>
              <b-col>Date</b-col>
              <b-col>Country</b-col>
              <b-col cols="2">Transaction ID</b-col>
              <!-- <b-col>Type</b-col> -->
              <b-col>Status</b-col>
              <b-col>Amount</b-col>
            </b-row>
          </b-container>

          <b-container
            class="bv-example-row mt-2 contain"
            v-for="transaction in transactionDtl"
            :key="transaction.id"
          >
            <b-row>
              <b-form-checkbox class="mt-3 ml-2" />
              <b-col class="mt-2">
                <b-avatar
                  variant="primary"
                  :text="getAvatar(transaction)"
                ></b-avatar>
              </b-col>
              <b-col class="mt-3 data" cols="2">{{
                transaction.Remitter_first_name +
                " " +
                transaction.Remitter_last_name
              }}</b-col>
              <b-col class="mt-3 data">{{
                format(transaction.created_on)
              }}</b-col>
              <b-col class="mt-3 ml-4 ml-4 data"
                >{{ transaction.paying_cntry_cd }}
              </b-col>
              <b-col class="mt-3 data">{{ transaction.Remittee_id }}</b-col>
              <!-- <b-col class="mt-3 ml-2 ml-2 data">{{ transaction.remit_type }}</b-col> -->
              <b-col class="mt-3 data">In-process</b-col>
              <b-col class="mt-3 data">{{ transaction.pay_amount }} MYR</b-col>
            </b-row>
          </b-container>
        </div>
      </b-tab>
      <b-tab title="Documents" v-if="busUserDetails">
        <div class="mt-5" v-if="busUserDetails">
          <h5 class="mt-5 trans">Documents Section</h5>
          <b-row>
            <b-col md="4">
              <iframe
                :src="
                  'http://3.111.47.115:5001/app/' +
                  busUserDetails.SSM_corporate_profile_report
                "
                width="100%"
                height="500px"
              ></iframe>
            </b-col>
            <b-col md="4">
              <iframe
                :src="
                  'http://3.111.47.115:5001/app/' +
                  busUserDetails.certified_copy_of_form_24
                "
                width="100%"
                height="500px"
              ></iframe>
            </b-col>
            <b-col md="4">
              <iframe
                :src="
                  'http://3.111.47.115:5001/app/' +
                  busUserDetails.certificate_of_incorporation
                "
                width="100%"
                height="500px"
              ></iframe>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="4">
              <iframe
                :src="
                  'http://3.111.47.115:5001/app/' +
                  busUserDetails.certified_copy_of_form_13
                "
                width="100%"
                height="500px"
              ></iframe>
            </b-col>
            <b-col md="4">
              <iframe
                :src="
                  'http://3.111.47.115:5001/app/' +
                  busUserDetails.certified_copy_of_form_49
                "
                width="100%"
                height="500px"
              ></iframe>
            </b-col>
            <b-col md="4">
              <iframe
                :src="
                  'http://3.111.47.115:5001/app/' +
                  busUserDetails.memorandum_of_association
                "
                width="100%"
                height="500px"
              ></iframe>
            </b-col>
          </b-row>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import LineChart from "../../components/charts/Line.vue";

export default {
  name: "UserDetails",
  components: {
    LineChart,
  },
  computed: {
    ...mapGetters([
      "token",
      // "base_url",
    ]),
  },
  props: ["selectedData"],
  created() {
    // this.userDtl = this.selectedData[0][0];
    console.log("selded row data", this.selectedData);
    this.getUserDtl();
    this.getTransactions().then(() => {});
    this.getTransactionsByCurruncy();
    this.getTransactionsByPaymentMode();
    this.getTransactionsByCountry();
  },

  data() {
    return {
      base_url: process.env.VUE_APP_USER_SERVICE,
      transaction_base_url: process.env.VUE_APP_TRANSACTION_SERVICE,
      value: 75,
      rows: 100,
      currentPage: 1,
      row: 3,
      max: 10,
      userDtl: [],
      busUserDetails: [],
      transactionDtl: [],
      transLimitData: [],
      chartKey:"defult",
      chartDataForCurruntMonth: [],
      transactionsByCurruncy: [],
      transactionsByPaymentMode: [],
      transactionsByCountry:[],
      transactionDtlforGraph:[]

    };
  },
  methods: {
    nFormatter(num, digits) {
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
      });
      return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }, 
    getTransactionsByCountry(){
      axios
        .get(
          this.transaction_base_url +
            `/transaction/total_amount/by_country?remitter_code=${this.selectedData[0].Remitter_code}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.transactionsByCountry = JSON.parse(JSON.stringify(response.data.data));
          this.transactionsByCountry.forEach((element) => {
            element.amount = this.nFormatter(element.amount, 1)
          });
          console.log("transactionsByCurruncy", this.transactionsByCurruncy);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getTransactionsByCurruncy(){
      axios
        .get(
          this.transaction_base_url +
            `/transaction/total_amount/by_currency?remitter_code=${this.selectedData[0].Remitter_code}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.transactionsByCurruncy = JSON.parse(JSON.stringify(response.data.data));
          this.transactionsByCurruncy.forEach((element) => {
            element.amount = this.nFormatter(element.amount, 1)
          });
          console.log("transactionsByCurruncy", this.transactionsByCurruncy);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getTransactionsByPaymentMode(){
      axios
        .get(
          this.transaction_base_url +
            `/transaction/total_amount/by_payment_mode?remitter_code=${this.selectedData[0].Remitter_code}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.transactionsByPaymentMode = JSON.parse(JSON.stringify(response.data.data));
          this.transactionsByPaymentMode.forEach((element) => {
            element.amount = this.nFormatter(element.amount, 1)
          });
          console.log("transactionsByPaymentMode", this.transactionsByPaymentMode);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getTransactionDataForGraph(no_of_months) {
      console.log("token", this.token, this.transaction_base_url);
      axios
        .get(
          this.transaction_base_url +
            `/transaction/transaction/monthly/data?remitter_code=${this.selectedData[0].Remitter_code}&no_of_months=${no_of_months}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.transactionDtlforGraph = JSON.parse(JSON.stringify(response.data.data));
          console.log("this.transactionDtl", this.transactionDtl);
          this.chartDataForCurruntMonth = [];
          this.transactionDtlforGraph.forEach((element) => {
              var json = {
                date: element.transaction_date,
                amount: element.pay_amount,
              };
              this.chartDataForCurruntMonth.push(json);
          });
          this.chartKey = no_of_months+'M'
          console.log("Transactions for month", this.chartDataForCurruntMonth);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    reverseArr(input) {
        var ret = new Array;
        for(var i = input.length-1; i >= 0; i--) {
            ret.push(input[i]);
        }
        return ret;
    },
    async getUserDtl() {
      console.log("token", this.token, this.base_url);

      axios
        .get(
          this.base_url +
            "user/get-remitter-by/" +
            this.selectedData[0].Remitter_code,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.userDtl = response.data.data[0];
          if (response.data.data[1]) {
            axios
              .get(
                this.transaction_base_url +
                  "/transaction_limit/all-limits-by-txn-type?transaction_type=B2B",
                {
                  headers: {
                    Authorization: `Bearer ${this.token}`,
                  },
                }
              )
              .then((response) => {
                // this.dealsTableData = JSON.parse(response.data.data);
                // this.userDtl = JSON.parse(JSON.stringify(response.data.data[0]));
                // console.log("this.transaction limits", JSON.parse(JSON.stringify(response.data.data[0][0])));
                this.transLimitData = response.data.data[0][0];
              })
              .catch((e) => {
                console.log(e);
              });
            this.busUserDetails = JSON.parse(
              JSON.stringify(response.data.data[1])
            );
          } else {
            axios
              .get(
                this.transaction_base_url +
                  "/transaction_limit/all-limits-by-txn-type?transaction_type=C2C",
                {
                  headers: {
                    Authorization: `Bearer ${this.token}`,
                  },
                }
              )
              .then((response) => {
                this.transLimitData = response.data.data[0][0];
              })
              .catch((e) => {
                console.log(e);
              });
          }
          console.log("this.userDtl", this.userDtl);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getTransactions() {
      console.log("token", this.token, this.transaction_base_url);

      axios
        .get(
          this.transaction_base_url +
            "/transaction/transaction/" +
            this.selectedData[0].Remitter_code,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.transactionDtl = JSON.parse(JSON.stringify(response.data.data));
          console.log("this.transactionDtl", this.transactionDtl);
          this.transactionDtl = this.reverseArr(this.transactionDtl);
          this.transactionDtl.forEach((element) => {
            const d = new Date(element.transaction_date);
            let month = d.getMonth();

            const d_currunt = new Date(element.transaction_date);
            let month_currunt = d_currunt.getMonth();

            console.log("test data month elemtnt", month, element);
            if (month === month_currunt) {
              var json = {
                date: element.transaction_date,
                amount: element.pay_amount,
              };
              this.chartDataForCurruntMonth.push(json);
            }
            this.chartKey = "1M"
          });
          console.log("Transactions for month", this.chartDataForCurruntMonth);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAvatar(transaction) {
      let first =
        transaction.Remitter_first_name &&
        transaction.Remitter_first_name.charAt(0);
      let last =
        transaction.Remitter_last_name &&
        transaction.Remitter_last_name.charAt(0);
      console.log(first, last);

      return first + last;
    },
    format(date) {
      if (date) {
        date = new Date(date);
        let month = date.toLocaleString("en-US", { month: "short" });
        return date.getDate() + " " + month + " " + date.getFullYear();
      }
    },
  },
};
</script>

<style scoped>

.text-warning{
  color: black !important;
}
.btn-graph{
  color: black !important;
  background-color: #ff4500;
}

/* .btn {
  color: orangered;
  border: 1px solid orangered;
} */

.btn:hover {
  background-color: orangered;
  color: white;
}

.block {
  background-color: orangered;
  color: white;
  float: right;
}

.data {
  font-size: 0.8rem;
  font-weight: 500;
  color: black;
}

.info {
  width: 350px;
  height: 400px;
  color: black;
  box-shadow: 5px 8px gainsboro;
}

.info1 {
  width: 350px;
  height: 400px;
  margin-left: 50px;
  color: black;
  box-shadow: 5px 8px gainsboro;
}

.prgs {
  color: orangered;
  background-color: orangered;
}

.label {
  font-size: 0.8rem;
  color: gray;
}

.lab2 {
  font-size: 0.8rem;
  color: gray;
  float: right;
  margin-top: 5px;
}

.trans {
  color: black;
}

.contain {
  border: 3px solid gainsboro;
  height: 80px;
  border-radius: 10px;
}

.transdata {
  font-size: 0.8rem;
}
</style>