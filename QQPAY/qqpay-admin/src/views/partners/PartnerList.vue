<template>
  <div>
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
   
    <!-- <b-container> -->
      <b-row>
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light" v-b-modal.add-partner-modal>
              <b-icon
                icon="file-earmark-plus-fill" 
              ></b-icon>
              New Partner
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
      
      <div class="compliance-table">
        <b-table
          class="table-hover"
          :items="items"
          :fields="fields"
          :select-mode="selectMode"
          responsive="sm"
          ref="selectableTable"
        >
          <template v-slot:cell(action)="row">
            <template v-if="row.item.action" >
            <!-- <i class="bi bi-eye-fill"></i> -->
              <b-icon
                class="btn"
                icon="eye"
                variant="primary"
                @click="onRowSelected(row.item.action)"
              />
              <b-icon
                class="btn"
                icon="pencil-square"
                variant="success"
                @click="handleOpenUpdatePartner(row.item.action)"
              />
              <b-icon
                class=" btn"
                icon="trash-fill"
                variant="danger"
                @click="onSubmit(row.item.action)"
              />
            </template>
          </template>
        </b-table>
      </div>
      <b-overlay :show="deleteConfirm" no-wrap>
        <template #overlay>
          <div
            v-if="processing"
            class="text-center p-4 loading text-light rounded"
          >
            <div class="mb-3">Processing...</div>
          </div>
          <div
            v-else
            ref="dialog"
            tabindex="-1"
            role="dialog"
            aria-modal="false"
            aria-labelledby="form-confirm-label"
            class="text-center p-3"
          >
            <p>
              <strong id="form-confirm-label"
                >Are you sure you want to delete?</strong
              >
            </p>
            <div class="d-flex">
              <b-button class="mr-3 search-btn" @click="onCancel">
                Cancel
              </b-button>
              <b-button variant="outline-success" @click="onOK">OK</b-button>
            </div>
          </div>
        </template>
      </b-overlay>
    <!-- </b-container> -->
    <b-modal id="add-partner-modal" hide-footer size="xl" title="Add Partner">
      <AddPartner @getPartners="getPartners" />
    </b-modal>
    <b-modal
      id="update-partner-modal"
      hide-footer
      size="xl"
      title="Update Partner"
    >
      <UpdatePartner
        :partner_id="updateSelectedPartner"
        @getPartners="getPartners"
      />
    </b-modal>
    <b-modal id="view-partner-modal" hide-footer size="xl" title="View Partner">
      <ViewPartners
        :partner_id="updateSelectedPartner"
        @getPartners="getPartners"
      />
    </b-modal>
  </div>
</template>


<script>
import Vue from "vue";
import UpdatePartner from "@/views/partners/UpdatePartner";
import ViewPartners from "@/views/partners/ViewPartners";
import { deleteApiData, getApiData } from "@/helpers/AxiosInstance";
import APIS from "@/constants/EndPoint";
import { responseHandler } from "@/helpers/globalFunctions";
import AddPartner from "@/views/partners/AddPartner";

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
    AddPartner,
    UpdatePartner,
    ViewPartners,
  },
  data() {
    return {
      updateSelectedPartner: null,
      togglePartnerFilter: false,
      deleteConfirm: false,
      processing: false,
      deleteSelectedId: null,
      selectMode: "single",
      filter:'',
      filterOptions: [
        { value: "null", text: "Filter" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
      ],
      filterSelected: null,
      selected: [],
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
        "no",
        "partner_name",
        "contact_person",
        "country",
        "partner_type",
        "action",
      ],
      items: [],
      riskStatusOptions: [
        { value: "Low risk", text: "Low risk" },
        { value: "High risk", text: "High risk" },
        { value: "Critical risk", text: "Critical risk" },
      ],
      searchValue: "",
    };
  },
  methods: {
    onRowSelected(id) {
      console.log(id);
      this.updateSelectedPartner = id;
      this.$bvModal.show("view-partner-modal");
      // this.$router.push("userDetails");
    },
    onSubmit(id) {
      this.deleteSelectedId = id;
      this.processing = false;
      this.deleteConfirm = true;
    },
    onCancel() {
      this.deleteConfirm = false;
    },
    async onOK() {
      this.deleteConfirm = false;
      const response = await deleteApiData(
        `${APIS.DELETE_PARTNER}/${this.deleteSelectedId}`
      );
      await responseHandler(
        response.data.status_code,
        this,
        response.data.message
      );
      if (response.data.status_code === 200) {
        this.getPartners();
      }
    },
    onClickOutside() {
      if (this.togglePartnerFilter)
        this.togglePartnerFilter = !this.togglePartnerFilter;
    },
    handleOpenUpdatePartner(id) {
      this.updateSelectedPartner = id;
      
      this.$bvModal.show("update-partner-modal");
      this.$bvModal.hide("view-partner-modal");
    },

    async getPartners() {
      const response = await getApiData(APIS.GET_PARTNER_LIST);
      await responseHandler(
        response.data.status_code,
        this,
        response.data.message
      );
      if (response.data.status_code === 200) {
        this.items = response.data.data.map((item) => ({
          partner_name: item.name_of_employer,
          id: item.agent_id,
          contact_person: item.contact_person_1,
          number: item.company_phone_1,
          email: item.company_email,
          country: item.company_country,
          partner_type: item.partner_type.toUpperCase().replaceAll("_", " "),
          action: item.agent_id,
        }));
        this.items.forEach(function callback(value, index) {
          // console.log(`${index}: ${value}`);
          value.no = index + 1;
        });
        console.log("partner list",this.items);
      }
    },
  },

  async created() {
    await this.getPartners();
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";


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

.btn-outline-light {
  color: $txt !important;
  border-color: $primary !important;
}

.btn-secondary {
  background: $txt !important;
}

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

.add-partner-commission {
  position: absolute;
  z-index: 99;
  right: 40px;
  top: 40px;
}

// .compliance-table {
//   text-align: center;
// }
</style>