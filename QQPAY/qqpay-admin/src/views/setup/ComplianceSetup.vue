<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light"  @click="newRecode">
              <b-icon
                icon="file-earmark-plus-fill"
                
              ></b-icon>
              New Recod
            </b-button>
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
      <b-col>
        <b-form-group
          label-for="filter-input"
          label-cols-sm="0"
          label-cols-lg="0"
          label-align-lg="right"
          content-cols-sm="12"
          content-cols-lg="8"
          label-align-sm="right"
          label-size="sm"
          class="mb-2"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-modal
      id="add-deal"
      ref="add-deal"
      title="Compliance Setup"
      size="xl"
      @ok="ok"
      @hidden="onHidden()"
      variant="primary"
      no-close-on-backdrop
    >
      <b-card :header="'Basic Details'" header-tag="header">
        <b-row>
      <b-col md="6">
        <b-form-group label="Occupation">
          <b-form-select
            v-model="occupation"
            :options="occupation_options"
          ></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="Transaction Type">
          <b-form-select
            v-model="transaction_type"
            :options="Transaction_Type_options"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6">
        <b-form-group label="per Transaction">
          <b-form-input
            v-model="per_transaction_upper_limit"
            size="md"
            v-on:keypress="isNumber($event)"
          ></b-form-input>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="per Daily">
          <b-form-input v-model="per_day_upper_limit" size="md" v-on:keypress="isNumber($event)"></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="6">
        <b-form-group label="per Month">
          <b-form-input
            v-model="per_month_upper_limit"
            size="md"
            v-on:keypress="isNumber($event)"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
      </b-card>
      <template #modal-footer="{ }">
        <b-button variant="primary" @click="postTransData()"> SUBMIT </b-button>
      </template>
    </b-modal>
    <b-table
      :items="items_per_transaction"
      :fields="feilds_for_transac"
      responsive
      class="align-middle"
    >
    <template v-slot:cell(action)="row">
          
            <!-- <i class="bi bi-eye-fill"></i> -->
              <b-icon
                class="btn"
                icon="pencil-square"
                variant="success"
                @click="onclickUpdate(row.item)"
              />
              <b-icon
                class=" btn"
                icon="trash-fill"
                variant="danger"
                @click="deleteTransactionLimit(row.item.id)"
              />
         
          </template>
    </b-table>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import axios from "axios";
import { mapGetters } from "vuex";
import {responseHandler} from "@/helpers/globalFunctions";

export default {
  mixins: [validationMixin],
  computed: {
    ...mapGetters([
      "token"
    ]),

  },
  data() {
    return {
      updateTrigger:false,
      transaction_base_url:"http://3.111.47.115:8000/api/v1/",
      per_transaction_upper_limit: "",
      per_day_upper_limit: "",
      per_month_upper_limit: "",
      transaction_type: "",
      occupation: "",
      temp_id:null,
      items_per_transaction: [
        {
          occupation: "Agri Worker",
          Transaction_Type: "C2C",
          perTransaction: "3000",
          perdaily: "5000",
          permonthly: "10000",
        },
      ],
      Transaction_Type_options: [
        { value: "C2C", text: "C2C" },
        { value: "B2B", text: "B2B" },
        { value: "B2C", text: "B2C" },
        { value: "C2C", text: "C2C" },
      ],
      occupation_options: null,
      feilds_for_transac: [
        { key: "occupation", label: "Occupation" },
        { key: "transaction_type", label: "Transaction Type" },
        { key: "per_transaction_limit", label: "Per Transaction" },
        { key: "per_day_limit", label: "Per Daily" },
        { key: "per_month_limit", label: "Per Monthly" },
        { key:"action", label:"action"}
      ],

      menu_hierarchy: [
        {
          text: "Set up",
          active: true,
        },
        {
          text: "Compliance Setup",
          active: true,
        },
      ],
    };
  },
  validations: {
    type: {
      country: {
        required,
      },
    },
    form: {
      search_user: {
        required,
      },
    },
  },
  methods: {
    postTransData(){
        if(!this.updateTrigger){
            const data = 
            {
            "transaction_type": this.transaction_type,
            "occupation": this.occupation,
            "occipation_code": 0,
            "per_transaction_limit": parseInt(this.per_transaction_upper_limit),
            "per_day_limit": parseInt(this.per_day_upper_limit),
            "per_month_limit": parseInt(this.per_month_upper_limit),
            "is_active": true
            }
            this.occupation_options.forEach(element => {
                if(element.value == this.occupation){
                    data.occipation_code = element.code
                }
            });
        axios.post(this.transaction_base_url + "transaction_limit/add-limit", data ,{
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
            .then((response) => {
              responseHandler(response.data.status_code, this, response.data.message)
              if(response.data.status_code === 200){
                this.transaction_type = "";
                this.occupation = "";
                this.per_transaction_upper_limit = "";
                this.per_day_upper_limit = "";
                this.per_month_upper_limit = "";
                this.getTransactionLimitData();
                this.$refs['add-deal'].hide();
                this.$swal({
                        title: "Transaction Limit Added Succesfully",
                        icon: "success",
                        button: "Done",
                });

              }
              if(response.data.status_code != 200){
                console.log("api failed");
              }
            })
            .catch((err) => {
              this.apiSideMessage = err.data.message;
              responseHandler(err.data.status_code, this, err.data.message)
              console.log('Deal not posted', err);
          });
        }else{
        const data = 
        {
        "transaction_type": this.transaction_type,
        "occupation": this.occupation,
        "occipation_code": 0,
        "per_transaction_limit": parseInt(this.per_transaction_upper_limit),
        "per_day_limit": parseInt(this.per_day_upper_limit),
        "per_month_limit": parseInt(this.per_month_upper_limit),
        "is_active": true
        }
          this.occupation_options.forEach(element => {
                if(element.value == this.occupation){
                    data.occipation_code = element.code
                }
            });
         axios.put(this.transaction_base_url + `transaction_limit/update-limit?id=${this.temp_id}`, data, {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            })
            .then((response) => {
              if(response.data.status_code === 200){
                this.$refs['add-deal'].hide();
                this.transaction_type = "";
                this.occupation = "";
                this.per_transaction_upper_limit = "";
                this.per_day_upper_limit = "";
                this.per_month_upper_limit = "";
                this.$swal({
                        title: "Transaction Limit Updated Succesfully",
                        icon: "success",
                        button: "Done",
                });
              }
              this.getTransactionLimitData();
            })
            .catch((err) => {
              responseHandler(err.data.status_code, this, err.data.message)
              console.log('Deal not posted', err);
          });
        }
        
    },
    onclickUpdate(selectedRow) {
      this.$refs['add-deal'].show();
      console.log("selectedRow",selectedRow)
      this.updateTrigger = true;
      this.transaction_type =  selectedRow.transaction_type;
      this.occupation = selectedRow.occupation;
      this.per_transaction_upper_limit =  selectedRow.per_transaction_limit;
      this.per_day_upper_limit =  selectedRow.per_day_limit;
      this.per_month_upper_limit =  selectedRow.per_month_limit;
      this.temp_id = selectedRow.id;
    //   this.temp_deal = selectedRow;
    },
    deleteTransactionLimit(selectedRow){
        console.log(selectedRow);
        axios.delete(this.transaction_base_url + `transaction_limit/delete-limit?id=${selectedRow}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          responseHandler(response.data.status_code, this, response.data.message)
          if (response.data.success) {
            this.getTransactionLimitData();
          }
        })
        .catch((err) => {
          responseHandler(err.data.status_code, this, err.data.message)
          console.log('Deal not posted', err);
      });
    },
    onHidden(){
        console.log("hiding");
    },
    newRecode(){
        this.$refs['add-deal'].show();
    },
    getTransactionLimitData(){
      axios
        .get(this.transaction_base_url + "transaction_limit/all-limits", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          responseHandler(response.data.status_code, this, response.data.message)
          console.log("limites",response.data.data)
          this.items_per_transaction = response.data.data[0];
          console.log("items_per_transaction",this.items_per_transaction);
        })
        .catch((e) => {
        //   responseHandler(e.data.status_code, this, e.data.message)
          console.log(e);
        });
    },

    getalloccutionData(){
      axios
        .get(this.transaction_base_url + "sub_category/occupations", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          this.occupation_options = response.data.data[0];
          this.formatPPoptions(response.data.data[0]);
        })
        .catch((e) => {
        //   responseHandler(e.data.status_code, this, e.data.message)
          console.log(e);
        });
    },
    formatPPoptions(data) {
      if (data && data.length > 0) {
        this.occupation_options = [];
        data.forEach((ele) => {
          this.occupation_options.push({
            text: ele.value,
            value: ele.value,
            code:ele.id,
            // pp_ccy: ele.pp_ccy
          });
        });
      }
    },
    isNumber(e) {
      let char = String.fromCharCode(e.keyCode); // Get the character
      let val = e.target.value; // Get the character
      if(/^\d*\.?\d{0,4}$/.test(char) && /^\d*\.?\d{0,3}$/.test(val)) return true; // Match with regex 
      // if(/^[0-9]+$/.test(char)) return true; // Match with regex 
      else e.preventDefault(); // If not match, don't add to input text
    }
  },
  async created() {
    this.getTransactionLimitData();
    this.getalloccutionData();
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
.my-tab {
  color: #ff6b00 !important;
}

.nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.tabs a:hover,
.tabs a.active {
  background-color: rgb(231, 8, 8);
}

.nav .nav-tabs .nav-item .nav-link {
  color: #ff6b00 !important;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
}

.tab-title-class {
  color: #ff6b00 !important;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #ff6b00 !important;
}

.a {
  color: #ff6b00 !important;
}
.nav-pills .mytab .nav-link:not(.active) {
  background-color: red !important;
}

.nav-pills .mytab .nav-link {
  background-color: rgb(34, 189, 52) !important;
}

.nav-link {
  color: #ff6b00 !important;
}

.tab-content > .tab-pane {
  border: 1px solid;
  border-left: 0px none;
}

.ul .li .a {
  color: #ff6b00 !important;
}

text-warning {
  color: #ff6b00 !important;
}
</style>