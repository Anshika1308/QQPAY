<template>
  <div>
    <div class="d-flex justify-content-between">
      <h1>Partner Commission List</h1>
      <b-button class="search-btn">Export</b-button>
    </div>
    <b-container>
      <div class="search-area">
        <b-row>
          <b-col class="input-field" cols='8'>
            <b-form-select
                v-model="country"
                :options="countryOptions"
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
            <b-button class="status-btn" v-b-modal.partner-commission-modal>Add P.C.</b-button>
          </b-col>
        </b-row>
      </div>
      <div class="compliance-table">
        <b-table :items="items" :fields="fields" :select-mode="selectMode" responsive="sm" ref="selectableTable">
          <template v-slot:cell(action)="row">
            <template v-if="row.item.action">
              <b-icon
                  class="btn"
                  icon="pencil-square"
                  variant="success"
                  @click="handleOpenUpdatePartnerCommission(row.item.action)"
              />
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
    <b-modal id="partner-commission-modal" hide-footer size="xl" title="Add Partner Commission">
      <AddPartnerCommission  @getPartnerCommissions="getPartnerCommissions"/>
    </b-modal>
    <b-modal id="update-partner-commission-modal" hide-footer size="xl" title="Update Partner Commission">
      <UpdatePartnerCommission :partner_commission_id="updatePartnerCommissionId" @getPartnerCommissions="getPartnerCommissions"/>
    </b-modal>
  </div>
</template>


<script>
import AddPartnerCommission from "@/views/partners/AddPartnerCommission";
import UpdatePartnerCommission from "@/views/partners/UpdatePartnerCommission";
import {responseHandler} from "@/helpers/globalFunctions";
import {deleteApiData, getApiData} from "@/helpers/AxiosInstance";
import APIS from "@/constants/EndPoint";


export default {
  name: "PartnerCommissions",
  components: {UpdatePartnerCommission, AddPartnerCommission},
  data() {
    return {
      updatePartnerCommissionId: null,
      togglePartnerFilter: false,
      deleteConfirm: false,
      processing: false,
      deleteSelectedId: null,
      selectMode: "single",
      countryOptions: [
        {value: "null", text: "Filter"},
        {value: "a", text: "This is First option"},
        {value: "b", text: "Selected Option"},
      ],
      country: null,
      selected: [],
      fields: [
        "country",
        "partner",
        "payment_method",
        "upper_limit",
        "comm_charge_by",
        "comm_charge_ccy",
        "active",
        "remarks",
        "action"
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
    handleOpenUpdatePartnerCommission(id) {
      this.updatePartnerCommissionId = id
      this.$bvModal.show("update-partner-commission-modal")
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
      this.deleteConfirm = false
      const response = await deleteApiData(`${APIS.DELETE_PARTNER_COMMISSION}/${this.deleteSelectedId}`);
      await responseHandler(response.data.status_code, this, response.data.message)
      if (response.data.status_code === 200) {
        this.getPartnerCommissions()
      }
    },
    onClickOutside() {
      if (this.togglePartnerFilter)
        this.togglePartnerFilter = !this.togglePartnerFilter
    },
    async getPartnerCommissions() {
      const response = await getApiData(APIS.GET_PARTNER_COMMISSION_LIST);
      await responseHandler(response.data.status_code, this, response.data.message)
      if (response.data.status_code === 200) {
        this.items = response.data.data.map(item => ({
          country: item.country,
          partner: item.partner_id,
          payment_method: item.payment_method,
          comm_charge_by: item.service_charge_by,
          comm_charge_ccy: item.service_charge_by,
          upper_limit: item.upper_limit,
          active: item.is_active,
          action: item.id,
          remarks: item.remarks
        }))
      }
    },
  },
  async created() {
    await this.getPartnerCommissions()
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