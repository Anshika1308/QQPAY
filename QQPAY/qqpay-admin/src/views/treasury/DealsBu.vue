    <template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light" v-b-modal.add-dealBu @click="newDeal();">
              <b-icon icon="file-earmark-plus-fill"></b-icon>
              New Deal
            </b-button>
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
      <b-col>
        <b-form-group label-for="filter-input" label-cols-sm="0" label-cols-lg="0" label-align-lg="right"
          content-cols-sm="12" content-cols-lg="8" label-align-sm="right" label-size="sm" class="mb-2">
          <b-input-group size="sm">
            <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table :items="items" :fields="fields" :filter="filter" responsive class="align-middle">
      <template #cell(item)="row">
        {{ row.item.remitter }}
      </template>
      <template #cell(deal_date)="row">{{ format(row.item.deal_date) }}
      </template>
      <template #cell(actions)="row" size="sm">
        <div class="action-div">
          <b-button variant="light" size="sm" @click="row.toggleDetails" class="mr-2 expand-btn">
            <b-icon v-if="row.detailsShowing" icon="chevron-up"></b-icon>
            <b-icon v-else icon="chevron-down"></b-icon>
          </b-button>
        </div>
      </template>
      <template #row-details="row">
        <b-card>
          <b-row align-h="between">
            <b-col sm="12" md="6" lg="9">
              <b-row align-h="between">
                <label class="title-lbl">Additional Info</label>
                <b-col sm="12" md="6" lg="6">
                  <div class="menu-sec">
                    <b-list-group flush>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Contract Number</label>
                        <label>{{ row.item.deal_no }}</label>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Source of Fund</label>
                        <label>{{ row.item.source_of_funds }}</label>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>PP CCY</label>
                        <label>{{ row.item.pp_ccy }}</label>
                      </b-list-group-item>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Purchase Date</label>
                        <label>{{ format(row.item.purchase_date) }}</label>
                      </b-list-group-item>

                    </b-list-group>
                  </div>
                </b-col>

                <b-col sm="12" md="6" lg="6">
                  <div class="menu-sec">
                    <b-list-group flush>
                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Dealer</label>
                        <label>{{ row.item.bank_poc }}</label>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Created by</label>
                        <label>{{ row.item.created_by }}</label>
                      </b-list-group-item>

                      <b-list-group-item class="d-flex justify-content-between align-items-center">
                        <label>Edited by</label>
                        <label>{{ row.item.edited_by }}</label>
                      </b-list-group-item>                                           
                    </b-list-group>
                  </div>
                </b-col>

                <!-- <b-col sm="12" md="6" lg="6" align-h="center">
                <TreasuryFlow />
              </b-col> -->

              </b-row>
            </b-col>
            <b-col sm="12" md="6" lg="3">
              <!-- <b-col > -->
              <div class="menu-sec">
                <b-button variant="outline-light" size="sm" class="wd-100p mb-2 btn-light"
                  @click="onclickUpdate(row.item)" v-b-modal.add-dealBu>
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                  Update
                </b-button>

                <b-button variant="outline-light" size="sm" class="wd-100p mb-2 btn-light" @click="deleteClick(row.item)">
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon> Delete
                </b-button>
              </div>
              <!-- </b-col> -->
            </b-col>
          </b-row>

        </b-card>
      </template>
    </b-table>
    <b-modal id="add-dealBu" ref="modal" title="Deal Details" @ok="nav_update" size="xl" variant="primary">
      <b-card header="Deal Details" header-tag="header">
        <b-row>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Remitter">

              <b-form-input v-model="temp_dealBu.remitter" ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group id="fieldset-1" label="Deal Date" label-for="example-datepicker">
              <b-form-datepicker id="example-datepicker" v-model="temp_dealBu.deal_date" class="mb-2" size="sm">
              </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Deal No">
              <b-form-input v-model="temp_dealBu.deal_no" size="sm"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="USD Amount">
              <b-form-input v-model="temp_dealBu.usd_amount" size="sm" type="text" pattern="[0-9]+"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Col CCY">
              <b-form-input v-model="temp_dealBu.coll_amount" size="sm"></b-form-input>
            </b-form-group>
          </b-col>

          <b-col sm="12" md="4" lg="4">
            <b-form-group label="MYR Amount">
              <b-form-input v-model="temp_dealBu.rate_usd_myr" size="sm"></b-form-input>
            </b-form-group>
          </b-col>

        </b-row>
        <b-row align-h="start">
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Source of funds">
              <b-form-select v-model="temp_dealBu.source_of_funds" :options="fundSourceOption"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <b-card header="Purchase Details" header-tag="header">
        <b-row>
          <b-col sm="12" md="4" lg="4">
            <b-form-group id="purchase-date" label="Value Date" label-for="purchase-datepicker">
              <b-form-datepicker id="purchase-datepicker" v-model="temp_dealBu.purchase_date" class="mb-2" size="sm">
              </b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="PP CCY" label-for="input-1">
              <b-form-input id="input-1" v-model="temp_dealBu.pp_ccy" size="sm"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="PPCCY Amt">
              <b-form-input v-model="temp_dealBu.pp_amount" size="sm"></b-form-input>
            </b-form-group>
          </b-col>

        </b-row>

        <b-row align-h="start">
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Dealer">
              <b-form-input v-model="temp_dealBu.bank_poc" size="sm"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" md="4" lg="4">
            <b-form-group label="Service Tax">
              <b-form-input v-model="temp_dealBu.rate_coll" size="sm"></b-form-input>
            </b-form-group>
          </b-col>

        </b-row>
      </b-card>
      <!-- <b-form-textarea id="textarea" v-model="temp_deal.remarks" placeholder="Remarks" rows="3" max-rows="6">
      </b-form-textarea> -->
      <template #modal-footer="{ ok }">
        <b-button variant="primary" @click="ok(); postDealData()"> SUBMIT </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import {responseHandler} from "@/helpers/globalFunctions";
export default {
  name: "DealsBu",
  components: {

  },
  created() {
    this.getContract();
  },
  computed: {
    ...mapGetters([
      "token",
      "base_url",
    ]),
    getAmtAndRate() {
      return {
        amt: this.temp_dealBu.usd_amount,
        rate: this.temp_dealBu.coll_amount
      };
    }
  },
  watch: {
    getAmtAndRate: function (newValue) {
      console.log(newValue, 'new value')
      if (newValue.amt >= 0 && newValue.rate >= 0) {
        this.temp_dealBu.coll_amount = (
          newValue.amt *
          newValue.rate
        ).toFixed(2);
      }
    },
  },

  data() {
    return {
      filter: null,
      dealsTableData: null,
      updateTrigger: false,
      // dealOption: [
      //   { value: 'i', text: 'Inward' },
      //   { value: 'o', text: 'Outward' },
      //   { value: 'irh', text: 'IRH' },
      // ],
      fundSourceOption: [
        { value: 'type1', text: 'Fund 1' },
        { value: 'type2', text: 'Fund 2' },
      ],

      temp_dealBu: {
        remitter: "",
        deal_date: "",
        source_of_funds: "",
        coll_amount: null,
        rate_usd_myr: null,
        usd_amount: null,
        rate_coll: null,
        pp_ccy: "",
        pp_amount: null,
        deal_no: null,
        purchase_date: "",
        status: "open",
        bank_poc: "",
        // deal_id: 0,
        // created_by: "string",
        // created_date: "2022-06-07T05:20:33.164Z",
        // modified_by: "string",
        // modified_date: "2022-06-07T05:20:33.164Z"

      },
      menu_hierarchy: [
        {
          text: "Treasury",
          active: true,
        },
        {
          text: "Deals",
          active: true,
        },
      ],
      fields: [
        {
          key: 'remitter',
          label: 'Remitter',
        },
        {
          key: 'deal_date',
          label: 'Input Date',
        },
        // {
        //   key: 'source_of_funds',
        //   label: 'Source of Funds',
        // },

        {
          key: ' rate_usd_myr',
          label: 'Amount in MYR',
        },

        {
          key: 'coll_amount',
          label: 'Col CCY',
        },

        {
          key: 'usd_amount',
          label: 'Amount in USD',
        },

        // {
        //   key: 'pp_ccy',
        //   label: 'PP CCY',
        // },

        {
          key: 'pp_amount',
          label: 'PPCCY Amt',
        },
        {
          key: 'status',
          label: 'Status',
        },
        { key: "actions", label: "" },
      ],
      items: [],
    };
  },
  methods: {
    ok() {
      console.log("ok");
    },
    nav_update() {
      console.log("nav update");
    },
    postDealData() {
      const request = this.getRequest();
       console.log('req', JSON.parse(JSON.stringify(request)))
      if (this.updateTrigger) {
        axios.put(this.base_url + "business/update-business-deal/" + request.deal_id, request, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            console.log(response.data.data);
            const index = this.items.findIndex(ele => ele.deal_id === this.temp_dealBu.deal_id);
            this.items[index] = response.data.data[0];
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Deal not posted', err);
          });

      } else {
        let body = JSON.parse(JSON.stringify(request))
         body.deal_date = body.deal_date.slice(0,10);
          console.log("request", request)
        axios.post(this.base_url + "business/new-business-deal", body, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
          .then((response) => {
            responseHandler(response.data.status_code, this, response.data.message)
            console.log(response.data.data)
            this.items.push(response.data.data[0]);
          })
          .catch((err) => {
            responseHandler(err.data.status_code, this, err.data.message)
            console.log('Deal not posted', err);
          });

      }
    },
    getRequest() {
      console.log("temp", this.temp_dealBu)
      const req = this.temp_dealBu;
      for (const key of Object.keys(req)) {
        console.log(key, req[key]);
        if (key === 'deal_date' || key === 'purchase_date' || key === 'updated_date' ) {
          if (req[key]) {
            req[key] = new Date(req[key]);
          }
        }
      }
      return req;
    },

    async getContract() {
      console.log("token", this.token);

      axios
        .get(this.base_url + "business/get-all-business-deals", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          responseHandler(response.data.status_code, this, response.data.message)
          this.items = JSON.parse(JSON.stringify(response.data.data[0]));
        })
        .catch((e) => {
          responseHandler(e.data.status_code, this, e.data.message)
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
    onclickUpdate(selectedRow) {
      this.updateTrigger = true;
      console.log('slected', selectedRow)
      this.temp_dealBu = selectedRow;
    },
    newDeal() {
      this.updateTrigger = false;
      this.temp_dealBu = {
        remitter: "",
        deal_date: "",
        source_of_funds: "",
        coll_amount: null,
        rate_usd_myr: null,
        usd_amount: null,
        rate_coll: null,
        pp_ccy: "",
        pp_amount: null,
        deal_no: null,
        purchase_date: "",
        status: "open",
        bank_poc: "",
        // deal_id: 0,
        // created_by: "string",
        // created_date: "2022-06-07T05:20:33.164Z",
        // modified_by: "string",
        // modified_date: "2022-06-07T05:20:33.164Z"
      }
    },
    deleteClick(selectedRow) {
      axios.delete(this.base_url + "business/delete-business-deal/" + selectedRow.deal_id, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          responseHandler(response.data.status_code, this, response.data.message)
          if (response.data.success) {
            const index = this.items.findIndex(ele => ele.deal_id === selectedRow.deal_id);
            this.items.splice(index, 1);
          }
        })
        .catch((err) => {
          responseHandler(err.data.status_code, this, err.data.message)
          console.log('Deal not posted', err);
      });
    },
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
  color: $txt  !important;
  border-color: $primary  !important;
}

.btn-secondary {
  background: $txt  !important;
}

.row {
  margin: 5px;
}

.expand-btn {
  color: $primary  !important;
  border: none !important;
  background: $white  !important;
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
  color: $txt  !important;
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
  color: $primary  !important;
}
</style>