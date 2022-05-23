<template>
  <div>
    <div class="d-flex ">
      <b-avatar  
        square
        
        src="https://www.mecgale.com/wp-content/uploads/2017/08/dummy-profile.png"
        size="10rem"
      ></b-avatar>

      <b-container class="bv-example-row ml-5">
        <b-row>
          <b-col cols="4" style="color: black">Hrishikesh Kale</b-col>
          <b-col></b-col>
        </b-row>

        <b-row>
          <b-col cols="4">23rd Feb 1992</b-col>
          <b-col>+91 77095 97813</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">Male</b-col>
          <b-col>h.kale0000@gmail.com</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">India</b-col>
          <b-col>Ankita Residency, Gadital,Hadapsar</b-col>
        </b-row>

        <b-row>
          <b-col cols="4">Software Engineer</b-col>

          <b-col>Pune,India- 411028</b-col>
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
        <b-col cols="4" class="data">Clear</b-col>
        <b-col cols="3" class="data">Account Status</b-col>
        <b-col cols="2" class="data">Active</b-col>
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
          <h8 class="label">India</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">USA</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">Malaysia</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">Australia</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">United Kingdom</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>
          <h8 class="label">Germany</h8>
          <h8 class="lab2">50k</h8>
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
          <h8 class="label">Bank transfer</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">Home delivery</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">Pickup</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">Wallet</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">3rd Party</h8>
          <h8 class="lab2">50k</h8>
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
          <h8 class="label">INR</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">USD</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">MYR</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">AUD</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>

          <h8 class="label">Sterling Pound</h8>
          <h8 class="lab2">50k</h8>
          <b-progress
            variant="warning"
            height="2px"
            :value="value"
            :max="max"
            class="mb-3"
          ></b-progress>
          <h8 class="label">Euro</h8>
          <h8 class="lab2">50k</h8>
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

      <b-container class="bv-example-row mt-2 contain">
        <b-row>

          <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="primary" text="IT"></b-avatar>
          </b-col>



          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data" >In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>

          
           
             <b-form-checkbox class="mt-3 ml-2"/>

          <b-col class="mt-2">
            <b-avatar variant="success" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>

            <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="warning" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>

            <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="success" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>

            <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="warning" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>

            <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="primary" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>
            <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="primary" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>
            <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="primary" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>
            <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="success" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain">
        <b-row>

            <b-form-checkbox class="mt-3 ml-2"/>
          <b-col class="mt-2">
            <b-avatar variant="warning" text="IT"></b-avatar>
          </b-col>

          <b-col class="mt-3 data" cols="2">Tata Consultancy</b-col>
          <b-col class="mt-3 data">1/11/2021</b-col>
          <b-col class="mt-3 ml-4 data">India</b-col>
          <b-col class="mt-3 data">QQ_pay_00010252</b-col>
          <b-col class="mt-3 ml-2 data">l2B</b-col>
          <b-col class="mt-3 data">In-process</b-col>
          <b-col class="mt-3 data">10,000MYR</b-col>
        </b-row>
      </b-container>
    </div>

      <div class="overflow-auto mt-5 float-right">
         <div>
      
      <b-pagination v-model="currentPage" :total-rows="rows" size="sm"></b-pagination>
    </div>
      </div>
  </div>
</template>

<script>




export default {
  name: "UserDetails",
  components:{
    
  },

  data() {
    return {
      value: 75,
      rows: 100,
      currentPage: 1,
      row: 3,
    };
  },
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