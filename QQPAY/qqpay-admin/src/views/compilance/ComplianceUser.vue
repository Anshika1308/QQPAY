<template>
  <div>
    <h1>Compliance user</h1>
    <b-container>
      <div class="search-area">
        <b-row>
          <b-col class="input-feild" cols='8'>
            <b-form-select
              v-model="filterSelected"
              :options="filterOptions"
            ></b-form-select>
            <b-form-input
              v-model="searchValue"
              placeholder="Search for user"
            ></b-form-input>
          </b-col>
          <b-col cols='2'>
            <b-button class="search-btn">Search</b-button>
          </b-col>
          <b-col cols='2'>
            <b-button class="status-btn">Update Status</b-button>
          </b-col>
        </b-row>
      </div>
      <div class="compliance-table">
        <b-table
          :items="items"
          :fields="fields"
          :select-mode="selectMode"
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
          <template v-slot:cell(name_&_occupation)="row">
            <div class="name-occupation">
              <img :src="row.item.avatarImg" alt="Image" />
              <div>
                {{ row.item.name }}
                <br />
                <small>{{ row.item.occupation }}</small>
              </div>
            </div>
          </template>
          <template v-slot:cell(risk_status)="row">
            <b-form-select
              v-model="row.item.risk_status"
              :options="riskStatusOptions"
            ></b-form-select>
          </template>
          <template v-slot:cell(fraudulent)="row">
            <template v-if="row.item.fraudulent">
              <b-icon icon="flag-fill" variant="danger"></b-icon>
            </template>
          </template>
        </b-table>
      </div>
    </b-container>
    <!-- <p>
        Selected Rows:<br>
        {{ selected }}
        </p> -->
  </div>
</template>


<script>
export default {
  name: "ComplianceUser",
  data() {
    return {
      selectMode: "single",
      filterOptions: [
        { value: "null", text: "Filter" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
      ],
      filterSelected: null,
      selected: [],
      fields: [
        "name_&_occupation",
        "number",
        "email",
        "country",
        "user_type",
        "risk_status",
        "user_status",
        "fraudulent",
      ],
      items: [
        {
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
          number: "+91 98121211",
          country: "India",
          user_type: "Indiviual",
          risk_status: "Low risk",
          user_status: "Active",
          fraudulent: false,
        },
      ],
      riskStatusOptions: [
        { value: "Low risk", text: "Low risk" },
        { value: "High risk", text: "High risk" },
        { value: "Critical risk", text: "Critical risk" },
      ],
      searchValue: ''
    };
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
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
  img {
    border-radius: 50%;
    width: 50px;
  }
}


.compliance-table {
  text-align: center;
}
</style>