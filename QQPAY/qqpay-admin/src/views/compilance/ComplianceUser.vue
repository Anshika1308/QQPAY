<template>
  <div>
    <div v-if="!showUserDetails">
      <h1>Compliance user</h1>
      <b-container>
        <div class="search-area">
          <b-row>
            <b-col class="input-feild" lg="8">
              <b-form-select
                v-model="filterSelected"
                :options="filterOptions"
              ></b-form-select>
              <b-form-input
                v-model="searchValue"
                placeholder="Search for user"
              ></b-form-input>
            </b-col>
            <b-col lg="2">
              <b-button class="search-btn">Search</b-button>
            </b-col>
            <b-col lg="2">
              <b-button class="status-btn">Update Status</b-button>
            </b-col>
          </b-row>
        </div>
        <div class="compliance-table">
          <b-table
            :items="items"
            :fields="fields"
            :select-mode="selectMode"
            :filter="searchValue"
            responsive="sm"
            ref="selectableTable"
            selectable
            @row-selected="onRowSelected"
          >
            <!-- Example scoped slot for select state illustrative purposes -->
            <!-- <template #cell(selected)="{ rowSelected }">
                      <template v-if="rowSelected">
                      <span aria-hidden="true">&check;</span>
                      <span class="sr-only">Selected</span>
                      </template>
                      <template v-else>
                      <span aria-hidden="true">&nbsp;</span>
                      <span class="sr-only">Not selected</span>
                      </template>
                  </template> -->
            <template v-slot:head(risk_status)="header">
              <div class="risk-status-header">
                <span>{{ header.field.label }}</span>
                <!-- <span><a href="javascript:void(0)"><b-icon icon="arrow-down" aria-hidden="true"></b-icon></a></span> -->
                <!-- <span>
                  <b-dropdown
                    variant="transparent"
                    text="Split Link"
                    checkbox-menu
                    allow-focus
                    ref="riskStatusFilter"
                  >
                    <template #button-content>
                      <span>
                        <font-awesome-icon size="1x" :icon="['fas', 'filter']" />
                      </span>
                    </template>
                    <b-dropdown-form>
                      <b-form-checkbox
                        id="checkbox-all"
                        name="checkbox-all"
                        :checked="riskStatus.all"
                        @change="checkAllClick()"
                        >All
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-low"
                        name="checkbox-low"
                        :checked="riskStatus.low"
                        @change="riskStatus.low = !riskStatus.low"
                        >Low risk
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-high"
                        name="checkbox-high"
                        :checked="riskStatus.high"
                        @change="riskStatus.high = !riskStatus.high"
                        >High risk
                      </b-form-checkbox>
                      <b-form-checkbox
                        id="checkbox-critical"
                        name="checkbox-critical"
                        :checked="riskStatus.critical"
                        @change="riskStatus.critical = !riskStatus.critical"
                        >Critical risk
                      </b-form-checkbox>
                      <b-button class="apply-btn" @click="riskFilterApply()">Apply</b-button>
                    </b-dropdown-form>
                  </b-dropdown>
                </span> -->

              </div>
            </template>
            <template v-slot:cell(name_&_occupation)="row">
              <div class="name-occupation">
                <b-avatar  
                  square
                  :src="row.item.avatarImg"
                  size="3rem"
                ></b-avatar>                
                <!-- <img :src="row.item.avatarImg" alt="Image" /> -->
                <div>
                  {{ row.item.Full_Name }}
                  <br />
                  <small>{{ row.item.Occupation_Code }}</small>
                </div>
              </div>
            </template>
            <template v-slot:cell(risk_status)="row">
              <b-form-select
                v-model="row.item.risk_status"
                :options="riskStatusOptions"
                @change="onChangeRiskStatus($event)"
              ></b-form-select>
              <!-- <b-button size="sm" @click="row.toggleDetails" class="mr-2 apply-btn">
                {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
              </b-button> -->
            </template>
            <template v-slot:cell(Is_Active)="row">
              <template v-if="row.item.Is_Active">
                Active
              </template>
              <template v-if="!row.item.Is_Active">
                Inactive
              </template>
            </template>
            <template v-slot:cell(Is_Negativelisted)="row">
              <template v-if="row.item.Is_Negativelisted === 1">
                <b-icon icon="flag-fill" variant="danger"></b-icon>
              </template>
            </template>
            
            <template #row-details="row">
              <b-card>
                <b-row class="mb-2">
                  <b-col sm="3" class=""><b>Comments:</b></b-col>
                  <!-- <b-col>{{ row.item.age }}</b-col> -->
                  <!-- <b-col>Status change status</b-col> -->
                </b-row>
                <b-row class="mb-2">
                  <!-- <b-col sm="3" class=""><b>Comments:</b></b-col> -->
                  <!-- <b-col>{{ row.item.age }}</b-col> -->
                  <b-col>Status change status</b-col>
                </b-row>
                

                <!-- <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
                  <b-col>{{ row.item.isActive }}</b-col>
                </b-row> -->

                <b-button class="apply-btn" size="sm" @click="row.toggleDetails">Hide Details</b-button>
              </b-card>
            </template>

          </b-table>
        </div>
      </b-container>
      <!-- <p>
          Selected Rows:<br>
          {{ selected }}
          </p> -->

    </div>
    <div v-if="showUserDetails">
      <UserDetails :selectedData="selectedData" @backBtnClick="backBtnClick"/>  
    </div>

    <b-modal ref="risk-status-modal" hide-footer modal-class="risk-status-modal">
      <b-container fluid>
        <b-row>
          <b-col><h3>Please add your comments: </h3></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-textarea
              id="textarea"
              v-model="riskChangeComment"
              placeholder="Comment.."
              rows="3"
              max-rows="6"
              class="comment-text-area"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="mt-01">
          <b-col cols="6" md="2" lg="2" offset-md="8">
            <b-button class="btn" variant="primary" @click="AddRiskComment()"
              >Submit</b-button
            >
          </b-col>
          <b-col cols="6" md="2" lg="2">
            <b-button class="btn" variant="secondary" @click="hideCancelModel()"
              >Cancel</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import UserDetails from './UserDetails';
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "ComplianceUser",
  components: {
    UserDetails
  },
  computed: {
    ...mapGetters([
      "token",
      // "base_url",
    ]),

  },
  data() {
    return {
      base_url: 'http://3.111.140.40:5000/api/v1/',
      showUserDetails: false,
      riskChangeComment: '',
      selectMode: "single",
      filterOptions: [
        { value: "null", text: "Filter" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
      ],
      filterSelected: null,
      selectedData: [],
      fields: [
        "name_&_occupation",
        {
          key: 'Phone_Number',
          label: 'Number',
        },
        {
          key: 'Email_ID',
          label: 'Email',
        },
        {
          key: 'Country_Code',
          label: 'Country',
        },
        {
          key: 'User_Type',
          label: 'User Type',
        },
        "risk_status",
        {
          key: 'Is_Active',
          label: 'User Status',
        },
        {
          key: 'Is_Negativelisted',
          label: 'Fraudulent',
        },
        // "user_status",
        // "fraudulent",
       /*  {
          key: 'deal_type',
          label: 'Deal Type',
        }, */
      ],
      items: [
/*         {
          name: "Yammi Peter",
          occupation: "Software Engineer",
          avatarImg:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
          number: "+91 9172131234",
          email: "Test2@mail.com",
          country: "India",
          user_type: "Indiviual",
          risk_status: "Low risk",
          user_status: "Active",
          fraudulent: true,
        },
        {
          name: "Jason",
          occupation: "Software Engineer",
          avatarImg:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
          email: "Test1@mail.com",
          number: "+1 9812121211",
          country: "USA",
          user_type: "Indiviual",
          risk_status: "Low risk",
          user_status: "Active",
          fraudulent: false,
        },
        {
          name: "Peter Jain",
          occupation: "Traveller",
          avatarImg:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
          number: "+91 9172131224",
          email: "peter@mail.com",
          country: "India",
          user_type: "Indiviual",
          risk_status: "Critical risk",
          user_status: "Active",
          fraudulent: true,
        },
        {
          name: "Arvind",
          occupation: "Media Manager",
          avatarImg:
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
          email: "Arvind@mail.com",
          number: "+91 9812123811",
          country: "India",
          user_type: "Indiviual",
          risk_status: "High risk",
          user_status: "Active",
          fraudulent: false,
        }, */
      ],
      tableData: [],
      riskStatusOptions: [
        { value: "Low risk", text: "Low risk" },
        { value: "High risk", text: "High risk" },
        { value: "Critical risk", text: "Critical risk" },
      ],
      riskStatus: {
        all: false,
        low: false,
        high: false,
        critical: false
      },
      searchValue: "",
    };
  },
  created() {
    this.tableData = this.items // Dummy chnage will change logic after Api integration
    this.getComplianceDtls();
  },
  methods: {
    async getComplianceDtls() {
      console.log("token", this.token);

      axios
        .get(this.base_url + "user/get-all-remitters", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then(response => {
          // this.dealsTableData = JSON.parse(response.data.data);
          this.items = JSON.parse(JSON.stringify(response.data.data));
          console.log("this.items", this.items);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onRowSelected(data) {
      console.log(data);
      this.selectedData = data;
      this.showUserDetails = true;
      // this.$router.push("userDetails");
    },
/*     riskFilterApply() {
      // this.items = this.tableData
      console.log(this.riskStatus);
      this.items = this.tableData.filter(ele => {
        if (this.riskStatus.all) {
          return ele.risk_status === 'Low risk' || ele.risk_status === 'High risk' || ele.risk_status === 'Critical risk'
        }
        if (this.riskStatus.high) {
          return ele.risk_status === 'High risk'
        }
        if (this.riskStatus.critical) {
          return ele.risk_status === 'Critical risk'
        }
      })
      const dropdown = this.$refs.riskStatusFilter;
      if (dropdown) {
        dropdown.hide();
      }
    },

    checkAllClick() {
      this.riskStatus.all = !this.riskStatus.all;
      this.riskStatus.low = this.riskStatus.all
      this.riskStatus.high = this.riskStatus.all
      this.riskStatus.critical = this.riskStatus.all
    }, */
    onChangeRiskStatus(eve) {
      console.log(eve);
      // eve.preventDefault();
      this.$refs["risk-status-modal"].show();

    },
    AddRiskComment() {
      this.$refs["risk-status-modal"].hide();
    },
    hideCancelModel() {
      this.$refs["risk-status-modal"].hide();
    },
    backBtnClick() {
      this.showUserDetails = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.search-area {
  margin: 40px 20px;
  .input-feild {
    display: flex;
    select {
      width: 50%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    input {
      border-left: none;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }
  .search-btn {
    width: 100%;
    background-color: $primary;
    border: none;
    border-radius: 5px;
  }
  .status-btn {
    border-color: $primary;
    width: 100%;
    background: transparent !important;
    color: $primary !important;
  }
}
.name-occupation {
  display: flex;
  justify-content: space-between;
  align-items: center;
 /*  img {
    border-radius: 50%;
    width: 50px;
  } */
}

.compliance-table {
  overflow-x: auto;
  text-align: center;
}
.risk-status-header {
  display: flex;
}
.apply-btn {
  margin-top: 20px;
  float: right;
  background-color: $primary;
  border: none;
  border-radius: 5px;
}
</style>