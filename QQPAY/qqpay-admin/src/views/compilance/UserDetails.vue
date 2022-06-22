<template>
  <div>
    <div class="back-btn">
      <b-button @click="$emit('backBtnClick')" variant="outline-warning" class="mt-5 block"
        >Back</b-button
      >
    </div>
    <div class="d-flex ">
      <b-avatar  
        square
        
        src=""
        size="10rem"
      ></b-avatar>
      <b-container class="bv-example-row ml-5">
        <b-row>
          <b-col cols="4" style="font-size: 25px;color: black">{{ userDtl.Remitter_name }}</b-col>
          <b-col></b-col>
        </b-row>

        <b-row>
          <!-- <b-col cols="4">23rd Feb 1992</b-col> -->
          <b-col cols="4">{{ userDtl.Remitter_DOB || '23rd Feb 1992' }}</b-col>
          <b-col>{{ userDtl.Phone_Number || 9912110114 }}</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">{{ userDtl.Gender || 'Male' }}</b-col>
          <b-col>{{ userDtl.Email_ID || 'no-mail@gmail.com' }}</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">{{ userDtl.Country_Code || 'India' }}</b-col>
          <b-col>{{ userDtl.Address || 'New Town'}}</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">{{ userDtl.Occupation_Text || 'Software Engineer' }}</b-col>

          <b-col>{{ userDtl.Remitter_State || 'Karnataka' }}, {{ userDtl.Remitter_City || 'Bangalore' }} - {{ userDtl.Remitter_Zipcode || '560059' }}</b-col>
        </b-row>

        <b-row>
          <b-col cols="4"></b-col>
        </b-row>
      </b-container>
    </div>

    <div>
      <!-- <b-button variant="outline-warning" class="mt-5 btn"
        >View/Update E-KYC</b-button
      >
      <b-button variant="outline-warning" class="mt-5 ml-5 btn"
        >Update Status</b-button
      > -->
      <b-button variant="outline-warning" class="mt-5  btn"
        >View Compilance</b-button
      >
      <b-button variant="outline-warning" class="mt-5 block"
        >Block Account</b-button
      >
    </div>

    <b-container class="bv-example-row mt-5 justify-content-between">
      <b-row>
        <b-col cols="3" class="data">KYC Status</b-col>
        <b-col cols="4" class="data">{{ userDtl.Is_Ekyc_User ? 'Clear' : 'Pending' }}</b-col>
        <b-col cols="3" class="data">Account Status</b-col>
        <b-col cols="2" class="data">{{ userDtl.Is_Active ? 'Active' : 'Inactive' }}</b-col>
      </b-row>

      <b-row>
        <b-col cols="3" class="data mt-2">Daily txn. limit</b-col>
        <b-col cols="4" class="data mt-2">20,000 MYR</b-col>
        <b-col cols="3" class="data mt-2">Activated on</b-col>
        <b-col cols="2" class="data mt-2">01 Nov 2021</b-col>
      </b-row>

      <b-row>
        <b-col cols="3" class="data mt-2">Revised daily txn. limit</b-col>
        <b-col cols="4" class="data mt-2">25,000 MYR</b-col>
        <b-col cols="3" class="data mt-2">Last Review</b-col>
        <b-col cols="2" class="data mt-2">01 Nov 2021</b-col>
      </b-row>

      <b-row>
        <b-col cols="3" class="data mt-2">Monthly txn. limit</b-col>
        <b-col cols="4" class="data mt-2">1,00,000 MYR</b-col>
        <b-col cols="3" class="data mt-2">Next Review</b-col>
        <b-col cols="2" class="data mt-2">1 Dec 2021</b-col>
      </b-row>

      <b-row>
        <b-col cols="3" class="data mt-2">Revised Monthly txn. limit</b-col>
        <b-col cols="4" class="data mt-2">1,50,000</b-col>
        <b-col cols="3" class="data mt-2">Most transcated nation</b-col>
        <b-col cols="2" class="data mt-2">India</b-col>
      </b-row>
    </b-container>

    <div>
      <div>
        <b-card
          class="mt-5"
          
        >
        
        </b-card>
      </div>
    </div>

    <div class="mt-5 d-flex">
      <b-card
        class="info"
        border-variant="secondary"
        header="Transaction by Country"
        gn="left"
      >
        <b-card-text>
          <span class="label">India</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">USA</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">Malaysia</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">Australia</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">United Kingdom</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>
          <span class="label">Germany</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          >
          
          
          
          
          </b-progress>
         <div>
    
      <!-- <b-pagination  pills :total-row="row" size="sm"></b-pagination> -->
    </div>
          
        </b-card-text>

        
      </b-card>

      <b-card
        class="info1"
        border-variant="secondary"
        header="Transaction by reception"
        align="left"
      >
        <b-card-text>
          <span class="label">Bank transfer</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">Home delivery</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">Pickup</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">Wallet</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">3rd Party</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>
        </b-card-text>
      </b-card>

      <b-card
        class="info1"
        border-variant="secondary"
        header="Transaction by Currency"
        align="left"
      >
        <b-card-text>
          <span class="label">INR</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">USD</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">MYR</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">AUD</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <span class="label">Sterling Pound</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>
          <span class="label">Euro</span>
          <span class="lab2">50k</span>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>
        </b-card-text>
      </b-card>
    </div>

    <h5 class="mt-5 trans">Transactions</h5>

    <div>
      <b-container class="bv-example-row mt-5">
        <b-row class="transdata">
          <b-col> </b-col>
          <b-col cols="2" class="ml-5">Name</b-col>
          <b-col>Date</b-col>
          <b-col>Country</b-col>
          <b-col cols="2">Transaction ID</b-col>
          <b-col>Type</b-col>
          <b-col>Status</b-col>
          <b-col>Amount</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain" v-for="transaction in transactionDtl" :key="transaction.id">
        
        <b-row>

          <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="primary" :text="getAvatar(transaction)"></b-avatar>
          </b-col>



          <b-col class="mt-3 data" cols="2">{{ transaction.Remitter_first_name + ' ' + transaction.Remitter_last_name }}</b-col>
          <b-col class="mt-3 data">{{ format(transaction.created_on) }}</b-col>
          <b-col class="mt-3 ml-4 ml-4 data">{{ transaction.paying_cntry_cd }} </b-col>
          <b-col class="mt-3 data">{{ transaction.Remittee_id }}</b-col>
          <b-col class="mt-3 ml-2 ml-2 data">{{ transaction.remit_type }}</b-col>
          <b-col class="mt-3 data" >In-process</b-col>
          <b-col class="mt-3 data">{{ transaction.pay_amount }} MYR</b-col>
        </b-row>

      </b-container>

    </div>

      <!-- <div class="overflow-auto mt-5 float-right">
         <div>
      
      <b-pagination v-model="currentPage" :total-rows="rows" size="sm"></b-pagination>
    </div>
      </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "UserDetails",
  components:{
    
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
    console.log('selded row data', this.selectedData);
    this.getUserDtl();
    this.getTransactions();
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
      userDtl: null,
      transactionDtl: null
    };
  },
  methods: {
    async getUserDtl() {
      console.log("token", this.token, this.base_url);

      axios
        // .get(this.base_url + "user/profile", {
        //   headers: {
        //     Authorization: `Bearer ${this.token}`,
        //   },
        // })
        .get(this.base_url + "user/get-remitter-by/" + this.selectedData[0].Remitter_code, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.userDtl = JSON.parse(JSON.stringify(response.data.data[0]));
          console.log("this.userDtl", this.userDtl);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getTransactions() {
      console.log("token", this.token, this.transaction_base_url);

      axios
        .get(this.transaction_base_url + "/transaction/transaction/" + this.selectedData[0].Remitter_code, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.transactionDtl = JSON.parse(JSON.stringify(response.data.data));
          console.log("this.transactionDtl", this.transactionDtl);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAvatar(transaction) {
      let first = transaction.Remitter_first_name && transaction.Remitter_first_name.charAt(0);
      let last = transaction.Remitter_last_name && transaction.Remitter_last_name.charAt(0)
      console.log(first,last);
      return  first+last; 
      
    },
    format(date) {
      if (date) {
        date = new Date(date);
        let month = date.toLocaleString("en-US", { month: 'short' })
        return date.getDate() + ' ' + month + ' ' + date.getFullYear();
      }
    },
  }
};
</script>

<style scoped>



.btn {
  color: orangered;
  border: 1px solid orangered;
}

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