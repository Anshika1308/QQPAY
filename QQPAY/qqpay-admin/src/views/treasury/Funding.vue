<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-card v-if="selected_Settlement">
      <b-row>
        <b-col
          sm="12"
          md="6"
          lg="4"
        >
          <div class="menu-sec">
            <b-list-group flush>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Deal Type</small>
                <small>{{ selected_Settlement.deal_type }}</small>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Deal Number</small>
                <small>{{ selected_Settlement.deal_no }}</small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col
          sm="12"
          md="6"
          lg="4"
        >
          <div class="menu-sec">
            <b-list-group flush>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Fund in  MYR</small>
                <small>{{ selected_Settlement.lcy_amount }} MYR</small>
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center"
              >
                <small>Fund in USD</small>
                <small>{{ selected_Settlement.fcy_amount }} USD</small>
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <div
            class="menu-sec d-flex justify-content-between align-items-center"
          >
            Balance:
            <h3>{{ selected_Settlement.fcy_amount }} USD</h3>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <div>
      <b-row v-for="partner in partner_balance" :key="partner.id">
        <b-col sm="12"
          md="4"
          lg="2"
          v-for="section in partner.section" :key="section.partner"
          class="col-p5">
          <b-card class="p-2">
            <country-flag :country="section.country_flag" size="normal" />
            <small>&nbsp;&nbsp;{{section.country}}</small><br/>
            <small>{{section.partner}}</small><br/>
            <small><b>{{section.balance}}</b></small>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-row class="mt-4">
      <b-col class="col-p5">
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light" v-b-modal.add-funding>
              <b-icon icon="file-earmark-plus-fill"></b-icon> New Funding
            </b-button>
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
      <b-col class="col-p5">
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
    <b-table
      :items="items"
      :fields="fields"
      :filter="filter"
      responsive
      class="align-middle"
    >
      <template #cell(Payout_partner)="row">
        <b>{{ row.item.payout_partner }} </b>
      </template>
      <template #cell(funding_date)="row"
        ><b>{{ row.item.funding_date }}</b>
      </template>
      <template #cell(actions)="row" size="sm">
        <div class="action-div">
          <b-button
            variant="light"
            size="sm"
            @click="row.toggleDetails"
            class="mr-2 expand-btn"
          >
            <b-icon v-if="row.detailsShowing" icon="chevron-up"></b-icon>
            <b-icon v-else icon="chevron-down"></b-icon>
          </b-button>
        </div>
      </template>
      <template #row-details="row">
        <b-card>
          <b-row align-h="between">
            <b-col sm="12" md="6" lg="9">
              <label class="title-lbl">Additional Info</label>
              <b-row align-h="between">
                <b-col sm="12" md="6" lg="6">
                  <div class="menu-sec">
                    <b-list-group flush>
                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >
                        <label>Contract Number</label>
                        <label>{{ row.item.contract_no }}</label>
                      </b-list-group-item>
                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >
                        <label>USD_PPCCY</label>
                        <label>{{ row.item.USD_PPCCY }}</label>
                      </b-list-group-item>
                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >
                        <label>FeesCCY_Type</label>
                        <label>{{ row.item.FeesCCY_Type }}</label>
                      </b-list-group-item>

                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >

                      <label>Fees</label>
                        <label>{{ row.item.Fees }}</label>
                      </b-list-group-item>

                     
                    </b-list-group>
                  </div>
                </b-col>
                <b-col sm="12" md="6" lg="6">
                  <div class="menu-sec">
                    <b-list-group flush>
                      

                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >

                      <label>created_by</label>
                        <label>{{ row.item.created_by }}</label>
                      </b-list-group-item>

                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >

                      <label>MY_RPPCY</label>
                        <label>{{ row.item.MY_RPPCY }}</label>
                      </b-list-group-item>

                      <b-list-group-item
                        class="d-flex justify-content-between align-items-center"
                      >

                      <label>edited_by</label>
                        <label>{{ row.item.edited_by }}</label>
                      </b-list-group-item>
                    </b-list-group>
                  </div>
                </b-col>

              </b-row>
            </b-col>
            <b-col sm="12" md="6" lg="3">
              <div class="menu-sec">
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2 btn-light"
                >
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  Update
                </b-button>
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2 btn-light"
                >
                  <b-icon icon="plus-circle" aria-hidden="true"></b-icon> New
                  Funding
                </b-button>
                <b-button
                  variant="outline-light"
                  size="sm"
                  class="wd-100p mb-2 btn-light"
                >
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
                </b-button>
              </div>
            </b-col>
          </b-row>
 
        </b-card>
      </template>
    </b-table>
    <b-modal
      id="add-funding"
      ref="modal"
      title="Funding Details"
      @ok="nav_update"
      size="xl"
      variant="primary"
    >
      <b-card header="Funding Details" header-tag="header">
        <b-row>
          <b-col>
               <b-form-group label="Payout Partner">
              <b-form-input
                v-model="temp_funding.Payout_partner"
                size="sm"
              ></b-form-input>
            </b-form-group>
            
          </b-col>
          <b-col>
            <b-form-group label="PPCCY Type">
              <b-form-input
                v-model="temp_funding.PPCCY_Type"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group label="USD Amt">
              <b-form-input
                v-model="temp_funding.USD_Amt"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

          <b-row>
          <b-col>

         <b-form-group label="USD PPCCY">
              <b-form-input
                v-model="temp_funding.USD_PPCCY"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

             <b-col>
            <b-form-group label="PP Amt">
              <b-form-input
                v-model="temp_funding.PP_Amt"
                size="sm"
              ></b-form-input>
            
            </b-form-group>
          </b-col>

           <b-col>
            <b-form-group label="Funding No" label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="temp_funding.Funding_No"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
         
         

      </b-card>
    
        
        <b-card header="Purchase Details" header-tag="header">
      
        <b-row>


           <b-col>
            
              <b-form-group label="Purchase DT">
              <b-form-datepicker
                v-model="temp_funding.Purchase_DT"
                class="mb-2"
                size="sm"
              ></b-form-datepicker>

            </b-form-group>
          </b-col>
         
         
          
          <b-col>
            <b-form-group label="Fees CCY Type">
              <b-form-input
                v-model="temp_funding.FeesCCY_Type"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
                <b-form-group label="Fees">
              <b-form-input
                v-model="temp_funding.Fees"
                size="sm"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

            <b-row>
           
           <b-col>
            <b-form-group label="MY RPPCCY">
              <b-form-input
                v-model="temp_funding.MY_RPPCCY"
                size="sm"
              ></b-form-input>
            </b-form-group>
           </b-col> 

           <b-col>
            <b-form-group label="Bank POC">
              <b-form-input
                v-model="temp_funding.Bank_POC"
                size="sm"
              ></b-form-input>
            </b-form-group>
           </b-col> 

           <b-col>
            <b-form-group label="Bank">
              <b-form-input
                v-model="temp_funding.Bank"
                size="sm"
              ></b-form-input>
            </b-form-group>
           </b-col> 

         
             
        </b-row>
      </b-card>
      
        
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok()"> SUBMIT </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Funding",
  components: {
    CountryFlag,
  },
  created() {
    this.getFunds();
  },
  computed: {
    ...mapGetters([
      "token",
      "base_url",
      "selected_Settlement"
    ]),
  },
  data() {
    return {
      filter: null,
      deal_details: [
        {
          id: 1,
          details: [
            {
              text: "I/O/IRH",
              value: "Outbound",
            },
            {
              text: "Contract No",
              value: "S1341125",
            },
          ],
        },
        {
          id: 2,
          details: [
            {
              text: "Fund in MYR",
              value: "2,80,003.89 MYR",
            },
            {
              text: "Fund in USD",
              value: "66,509 USD",
            },
          ],
        },
      ],
      partner_balance: [
        {
          id: 1,
          section: [
            {
              country_flag: "in",
              country: "India",
              partner: "ICICI",
              balance: "27000 USD"
            }
          ],
        },
      ],
      temp_funding: {
          payout_partner: "axis",
          PPCCY_Type: "INR",
          USD_Amt: "19,970",
          USD_PPCCY: "75",
          PP_Amt: "1,497,750",
          Funding_No: " ",
          purchase_DT: " ",
          FeesCCY_Type: "USD",
          Fees: "20",
          created_by : " ",
          MY_RPPCY: "17.4",
          Bank_POC: "",
          Bank: "",
          edited_by: "",
          settl_id: ""
      },
      menu_hierarchy: [
        {
          text: "Treasury",
          active: true,
        },
        {
          text: "Funding",
          active: true,
        },
      ],
      fields: [
        "payout_partner",
        "PPCCY_Type",
        "USD_Amt",
        "PP_Amt",
        "Funding No",
        "Purchase_DT",
        "Bank_POC",
        
        { key: "actions", label: "" },
      ],
      items: [
        {
          payout_partner: "axis",
          PPCCY_Type: "INR",
          USD_Amt: "19,970",
          PP_Amt: "1,497,750",
          Funding_No: " ",
          purchase_DT: " ",
          Bank_POC: "",
          
          
      
        },
      ],
    };
  },
  methods: {
    ok() {
      console.log('ok')
    },
    nav_update() {
      console.log('nav update')
    },
    async getFunds() {
      console.log('selected_Settlement', this.selected_Settlement);
      console.log("token", this.token);

      axios
        .get(this.base_url + "prefund/get-all-prefunds", {
          headers: {
            Authorization:  `Bearer ${this.token}`,
          },
        })
        .then(response => {
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
          console.log("this.items", this.items);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    format(date) {
      if (date) {
        date = new Date(date);
        let month = date.toLocaleString("en-US", { month: 'short' })
        return date.getDate() + ' ' + month + ' ' + date.getFullYear();
      }
    },

    submit() {
      const request = this.getRequest();
      // console.log('req', JSON.parse(JSON.stringify(request)))
      if (this.updateTrigger) {
        axios.put(this.base_url + "prefund/update-prefund/" + request.fund_id, request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            console.log(response.data.data);
            const index = this.items.findIndex(ele => ele.fund_id === this.temp_funding.fund_id);
            this.items[index] = response.data.data[0];
          })
          .catch((err) => {
            console.log('Deal not posted', err);
        });

      } else {
        request.settl_id = this.selected_Settlement.settl_id; // Need to check when we dont have deal ie when we click settlement from the sub menu.
        axios.post(this.base_url + "prefund/prefund-partner", request, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          })
          .then((response) => {
            console.log(response.data.data)
            this.items.push(response.data.data[0]);
          })
          .catch((err) => {
            console.log('Deal not posted', err);
        });
        
      }
    },
    getRequest() {
      const req = this.temp_funding;
      for (const key of Object.keys(req)) {
        console.log(key, req[key]);
        if (key === 'deal_date' || key === 'purchase_date' || key === 'updated_date' || key === 'approved_aate' || key === 'authorized_date') {
          if (req[key]) {
            req[key] = new Date(req[key]);
          }
        }
      }
      return req;
    },
    onclickUpdate(selectedRow) {
      this.updateTrigger = true;
      console.log('slected', selectedRow)
      this.temp_funding = selectedRow;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.col-p5 {
  padding-right: 5px !important;
  padding-left: 5px !important;
}
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
.btn-light {
  border-color: $primary;
  width: 100%;
  background: transparent !important;
  color: $primary !important;
}
</style>