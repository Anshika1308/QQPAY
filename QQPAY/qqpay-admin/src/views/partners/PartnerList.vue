<template>
  <div>
    <div class="d-flex justify-content-between">
      <h1>Partner List</h1>
      <b-button class="search-btn">Export</b-button>
    </div>
    <b-container>
      <div class="search-area">
        <b-row>
          <b-col class="input-feild" cols='8'>
            <b-form-select v-model="filterSelected" :options="filterOptions"></b-form-select>
            <b-form-input v-model="searchValue" placeholder="Search for user"></b-form-input>
          </b-col>
          <b-col cols='2'>
            <b-button class="search-btn">Search</b-button>
          </b-col>
          <b-col cols='2'>
            <b-button class="status-btn" @click="$emit('openTab', 'add_partner')">Add Partner</b-button>
          </b-col>
        </b-row>
      </div>
      <div class="compliance-table">
        <b-table :items="items" :fields="fields" :select-mode="selectMode" responsive="sm" ref="selectableTable"
                 selectable @row-selected="onRowSelected">
          <template v-slot:cell(name_&_occupation)="row">
            <div class="name-occupation">
              <img :src="row.item.avatarImg" alt="Image"/>
              <div>
                {{ row.item.name }}
                <br/>
                <small>{{ row.item.occupation }}</small>
              </div>
            </div>
          </template>
          <template v-slot:cell(risk_status)="row">
            <b-form-select v-model="row.item.risk_status" :options="riskStatusOptions"></b-form-select>
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
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "PartnerList",
  data() {
    return {
      selectMode: "single",
      filterOptions: [
        {value: "null", text: "Filter"},
        {value: "a", text: "This is First option"},
        {value: "b", text: "Selected Option"},
      ],
      filterSelected: null,
      selected: [],
      fields: [
        "partner_name",
        "id",
        "contact_person",
        "number",
        "email",
        "country",
        "partner_type",
        "action",
      ],
      items: [],
      riskStatusOptions: [
        {value: "Low risk", text: "Low risk"},
        {value: "High risk", text: "High risk"},
        {value: "Critical risk", text: "Critical risk"},
      ],
      searchValue: ''
    };
  },
  methods: {
    ...mapActions(["fetchPartners"]),
    onRowSelected(items) {
      this.selected = items;
    },
    formatTableData() {
      this.items = this.partnerLists.map(item => ({
        partner_name: item.contact_name1,
        id: item.agent_id,
        contact_person: item.contact_name2,
        number: item.phone1,
        email: item.email1,
        country: item.country,
        partner_type: item.agent_type,
      }))
    }
  },
  computed: {
    ...mapGetters(["partnerLists"]),
  },
  async created() {
    await this.fetchPartners()
    this.formatTableData()
  }
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";

.search-btn {
  background-color: $primary;
  border: none;
  border-radius: 5px;
  height: 35px;
}

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