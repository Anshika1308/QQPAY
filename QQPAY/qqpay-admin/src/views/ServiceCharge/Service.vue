<template>
  <div>
    <div class="title">
      <p>Service Charge Setup</p>
    </div>

    <div class=" ml-5 d-flex ">
      <b-input-group size="sm"  >
        <b-input-group-append  >
          <b-dropdown  text="Filter"  variant="light-dark" class="fbtn">
            <b-dropdown-item>First Action</b-dropdown-item>
            <b-dropdown-item>Second Action</b-dropdown-item>
            <b-dropdown-item>Third Action</b-dropdown-item>
          </b-dropdown>

          <b-form-input
            class="search"
            id="filter-input"
            v-model="filter"
            type="search"
            
            placeholder="Serach for user"
          ></b-form-input>
        </b-input-group-append>
         <button class="ml-3 mt-1 btn1">Search</button>
        <button class=" ml-1  mt-1 btn2">Add Service Charge</button>
      </b-input-group>

     
    </div>

    <hr class="mt-5" />

    

    <div>
      <b-container class="bv-example-row mt-5">
        <b-row class="transdata">
          <b-col cols="1">Country</b-col>
          <b-col cols="1">Payout partner</b-col>
          <b-col cols="1">Charge Type</b-col>
          <b-col cols="1">Upper Limit MYR</b-col>
          <b-col cols="1">Service Charge By</b-col>
          <b-col cols="2">Service Charge MYR</b-col>
          <b-col cols="2">Pay Comm</b-col>
          <b-col cols="1">Receive Comm</b-col>

          <b-col class="d-flex ">
          
              Remarks
            <b-form-checkbox class="ml-2" />
          </b-col>
        </b-row>
      </b-container>

      <b-container class="mt-3 bv-example-row contain2">
        <b-row class="mt-3 transdata">
          <b-col cols="1" class="data">India</b-col>
          <b-col cols="1" class="data">ICICI</b-col>
          <b-col cols="1" class="data">Cash Payment</b-col>
          <b-col cols="1" class="data">No Limit</b-col>
          <b-col cols="1" class="data">F</b-col>
          <b-col cols="2" class="data">15</b-col>
          <b-col cols="2" class="data">7.5</b-col>
          <b-col cols="1" class="data">7.5</b-col>

          <b-col class="d-flex ">
          

            <b-form-checkbox class="ml-5 " />
          </b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain2">
        <b-row class="mt-3 transdata">
          <b-col cols="1" class="data">India</b-col>
          <b-col cols="1" class="data">ICICI</b-col>
          <b-col cols="1" class="data">Cash Payment</b-col>
          <b-col cols="1" class="data">No Limit</b-col>
          <b-col cols="1" class="data">F</b-col>
          <b-col cols="2" class="data">15</b-col>
          <b-col cols="2" class="data">7.5</b-col>
          <b-col cols="1" class="data">7.5</b-col>

          <b-col class="d-flex">
          

            <b-form-checkbox class="ml-5" />
          </b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain2">
        <b-row class="mt-3 transdata">
          <b-col cols="1" class="data">India</b-col>
          <b-col cols="1" class="data">ICICI</b-col>
          <b-col cols="1" class="data">Cash Payment</b-col>
          <b-col cols="1" class="data">No Limit</b-col>
          <b-col cols="1" class="data">F</b-col>
          <b-col cols="2" class="data">15</b-col>
          <b-col cols="2" class="data">7.5</b-col>
          <b-col cols="1" class="data">7.5</b-col>

          <b-col class="d-flex">
          

            <b-form-checkbox class="ml-5" />
          </b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain2">
        <b-row class="mt-3 transdata">
          <b-col cols="1" class="data">India</b-col>
          <b-col cols="1" class="data">ICICI</b-col>
          <b-col cols="1" class="data">Cash Payment</b-col>
          <b-col cols="1" class="data">No Limit</b-col>
          <b-col cols="1" class="data">F</b-col>
          <b-col cols="2" class="data">15</b-col>
          <b-col cols="2" class="data">7.5</b-col>
          <b-col cols="1" class="data">7.5</b-col>

          <b-col class="d-flex">
          
           
            <b-form-checkbox class="ml-5" />
          </b-col>
        </b-row>
      </b-container>

      <b-container class="bv-example-row mt-2 contain2">
        <b-row class="mt-3 transdata">
          <b-col cols="1" class="data">India</b-col>
          <b-col cols="1" class="data">ICICI</b-col>
          <b-col cols="1" class="data">Cash Payment</b-col>
          <b-col cols="1" class="data">No Limit</b-col>
          <b-col cols="1" class="data">F</b-col>
          <b-col cols="2" class="data">15</b-col>
          <b-col cols="2" class="data">7.5</b-col>
          <b-col cols="1" class="data">7.5</b-col>

          <b-col class="d-flex">
          

            <b-form-checkbox class="ml-5" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "Service",
  components: {},

  
};
</script>

<style scoped>
.search {
  width: 500px;
  text-align: end;
}


.fbtn{
     border: 1px solid gainsboro;
    height: 40px;
    border-radius: 5px;
    margin-left: 80px;
}

.btn1 {
  background-color: orangered;
  color: white;
  font-size: 0.7rem;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  border: solid orangered;
}

.btn2 {
  background-color: white;
  color: orange;
  border: 1px solid orange;
  font-weight: 500;

  width: 150px;
  height: 35px;
  font-size: 0.7rem;
  border-radius: 5px;
}

.block {
  background-color: orangered;
  color: white;
  float: right;
}

.data {
  font-size: 0.6rem;
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

.contain2 {
  border: 3px solid gainsboro;
  height: 60px;
  border-radius: 10px;
}

.transdata {
  font-size: 0.6rem;
}
</style>

