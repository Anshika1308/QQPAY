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
                <!-- <b-avatar  
                  square
                  :src="row.item.avatarImg"
                  size="3rem"
                ></b-avatar>   -->
                <b-avatar :variant="getVariant()" :text="getAvatar(row.item.Full_Name)"></b-avatar>
                <!-- <img :src="row.item.avatarImg" alt="Image" /> -->
                <div class="name-label">
                  {{ row.item.Full_Name }}
                  <br />
                  <small>{{ row.item.Occupation_Code }}</small>
                </div>
              </div>
            </template>
            <template v-slot:cell(Risk)="row">
              <!-- <b-form-select
                :v-model="row.item.Risk"
                :options="riskStatusOptions"
                @change="onChangeRiskStatus($event)"
              ></b-form-select> -->
              {{ getRiskLabel(row.item.Risk) }}
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
              <template v-if="row.item.Is_Negativelisted === 2">
                <b-icon icon="flag-fill" variant="danger"></b-icon>
              </template>
               <template v-else>
                <b-icon icon="flag-fill" variant="success"></b-icon>
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
    ]),

  },
  data() {
    return {
      base_url: process.env.VUE_APP_USER_SERVICE,
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
          key: 'country',
          label: 'Country',
        },
        {
          key: 'user_type_name',
          label: 'User Type',
        },
        {
          key: 'Risk',
          label: 'Risk Status',
        },
        // "risk_status",
        {
          key: 'Is_Active',
          label: 'User Status',
        },
        {
          key: 'Is_Negativelisted',
          label: 'Fraudulent',
        },
       
      ],
      items: [
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
    getRiskLabel(riskVal) {
      if (riskVal >=0 && riskVal <= 50) {
        return 'Low risk'
      } else if (riskVal >50 && riskVal <= 80) {
        return 'Medium risk'
      } else {
        return 'High risk'
      }
    },
    getAvatar(name) {
      const nameArr = name.split(' ');
      if (nameArr && nameArr.length > 0) {
        return nameArr[0].charAt(0) + nameArr[nameArr.length -1]?.charAt(0)
      }
      
    },
    getVariant() {
      const variantArr = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'];
      const randomVal = variantArr[Math.floor(Math.random() * variantArr.length)];
      return randomVal;
    }
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
  // justify-content: space-between;
  align-items: center;
  .name-label {
    margin-left: 10px;
  }
 /*  img {
    border-radius: 50%;
    width: 50px;
  } */
}

.compliance-table {
  // overflow-x: auto;
  // text-align: center;
  font-size: 14px;
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
::v-deep .table {
  td {
    vertical-align: middle !important;
  }
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