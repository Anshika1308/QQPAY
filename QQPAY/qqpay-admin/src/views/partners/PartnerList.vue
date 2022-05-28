<template>
  <div>
    <div class="d-flex justify-content-between">
      <h1>Partner List</h1>
      <b-button class="search-btn">Export</b-button>
    </div>
    <b-container>
      <div class="search-area">
        <b-row>
          <b-col class="input-field" cols='8' v-click-outside="onClickOutside">
            <span class="partner-filter" @click="togglePartnerFilter=!togglePartnerFilter">Filter</span>
            <b-form-input v-model="searchValue" placeholder="Search for user"></b-form-input>
            <div v-show="togglePartnerFilter" class="partner-filter-content">
              <b-row cols="2 m-1">
                <b-col cols="8" class="text-left">Country</b-col>
                <b-col cols="4" class="text-right">Column</b-col>
                <b-col cols="8" class="text-left">Partner Type</b-col>
                <b-col cols="4" class="text-right">Column</b-col>
              </b-row>
            </div>
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
        <b-table :items="items" :fields="fields" :select-mode="selectMode" responsive="sm" ref="selectableTable">
          <template v-slot:cell(action)="row">
            <template v-if="row.item.action">
              <b-icon class="btn" icon="pencil-square" variant="success"
                      @click="handleOpenUpdatePartner(row.item.action)"/>
              <b-icon class="mr-3 btn" icon="trash-fill" variant="danger" @click="onSubmit(row.item.action)"/>
            </template>
          </template>
        </b-table>
      </div>
      <b-overlay :show="deleteConfirm" no-wrap>
        <template #overlay>
          <div v-if="processing" class="text-center p-4 loading text-light rounded">
            <div class="mb-3">Processing...</div>
          </div>
          <div v-else ref="dialog" tabindex="-1" role="dialog" aria-modal="false" aria-labelledby="form-confirm-label"
               class="text-center p-3">
            <p><strong id="form-confirm-label">Are you sure you want to delete?</strong></p>
            <div class="d-flex">
              <b-button class="mr-3 search-btn" @click="onCancel">
                Cancel
              </b-button>
              <b-button variant="outline-success" @click="onOK">OK</b-button>
            </div>
          </div>
        </template>
      </b-overlay>
    </b-container>
    <b-modal id="update-partner-modal" hide-footer size="xl" title="Update Partner Commission">
      <UpdatePartner :partner_id="updateSelectedPartner"/>
    </b-modal>
  </div>
</template>


<script>
import {mapActions, mapGetters} from 'vuex'
import Vue from "vue";
import UpdatePartner from "@/views/partners/UpdatePartner";

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

export default {
  name: "PartnerList",
  components: {
    UpdatePartner
  },
  data() {
    return {
      updateSelectedPartner: null,
      togglePartnerFilter: false,
      deleteConfirm: false,
      processing: false,
      deleteSelectedId: null,
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
    ...mapActions(["fetchPartners", "deletePartner"]),
    formatTableData() {
      this.items = this.partnerLists.map(item => ({
        partner_name: item.contact_name1,
        id: item.agent_id,
        contact_person: item.contact_name2,
        number: item.phone1,
        email: item.email1,
        country: item.country,
        partner_type: item.agent_type,
        action: item.agent_id,
      }))
    },
    onSubmit(id) {
      this.deleteSelectedId = id
      this.processing = false
      this.deleteConfirm = true
    },
    onCancel() {
      this.deleteConfirm = false
    },
    async onOK() {
      await this.deletePartner({vm: this, id: this.deleteSelectedId})
      this.$store.dispatch("fetchPartners")
      this.deleteConfirm = false
    },
    onClickOutside() {
      if (this.togglePartnerFilter)
        this.togglePartnerFilter = !this.togglePartnerFilter
    },
    handleOpenUpdatePartner(id) {
      this.updateSelectedPartner = id
      this.$bvModal.show("update-partner-modal")
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

.loading {
  background-color: $primary;

}

.partner-filter {
  width: 200px;
  border: 1px solid grey;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  padding-left: 10px;
}

.partner-filter-content {
  position: absolute;
  width: 500px;
  background: white;
  margin-top: 40px;
  box-shadow: 2px 4px 10px 3px #888888;
  padding: 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.search-area {
  margin: 40px 20px;

  .input-field {
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