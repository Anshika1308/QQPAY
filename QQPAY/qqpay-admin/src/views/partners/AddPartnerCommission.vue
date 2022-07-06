<template>
  <div class="add-partner-commission">
    <b-container>
      <b-row>
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light" @click="showPartnerCommitionForm">
              <b-icon
                icon="file-earmark-plus-fill" 
              ></b-icon>
              New Partner commistion
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
      <form v-if="isshowform" @submit.prevent="handleSubmit">
        <b-card class="mt-3" header="Add Partner Commission">
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Partner" :error="errors.partner_id"/>
              <b-form-group id="input-group-partner-type" label="Partner" required label-for="input-partner-type">
                <b-form-select v-model="partnerSelected" :options="partnerType" class="mb-3 form-control" required disabled/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Payment Method"/>
              <b-form-group id="input-group-payment-method" label="Payment Method"
                            label-for="input-payment-method">
                <b-form-select v-model="paymentMethodSelected" :options="paymentMethodOptions"
                               class="mb-3 form-control" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Service Charge Type"/>
              <b-form-group id="input-group-service-charge-typ" label="Service Charge Type"
                            label-for="input-service-charge-type">
                <b-form-select v-model="selectedServiceCharge" :options="selectedServiceChargeType"
                               class="mb-3 form-control" @change="toggleUpperLimit" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Service Charge"/>
              <b-form-group id="input-group-service-charge" label="Service Charge" label-for="input-service-charge">
                <b-form-input id="input-contact-service-charge" v-model="serviceCharge" type="number" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Country"/>
              <b-form-group id="input-group-currency" label="Country" label-for="input-currency">
                <b-form-select v-model="selectedCountry" :options="countryOptions" class="mb-3 form-control" required disabled/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <UpdateLabel label="Currency"/>
              <b-form-group id="input-group-currency" label="Currency" label-for="input-currency">
                <b-form-select v-model="selectedCurrency" :options="selectedCurrencyType" class="mb-3 form-control"
                               required disabled/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-group id="input-group-upper-limit" label="Upper Limit" label-for="input-group-upper-limit">
                <b-form-input id="input-group-upper-limit" v-model="upperLimit" type="number"
                              :disabled="isDisableUpperLimit"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6">
              <b-form-checkbox class="mt-5" id="checkbox-active-status" v-model="active" name="checkbox-active-status"
                               value="true" unchecked-value="false">
                Active Status
              </b-form-checkbox>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12">
              <b-form-group id="input-group-remarks" label="Remarks" label-for="input-remarks">
                <b-form-textarea id="input-remarks" v-model="remarks" rows="6"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-row class="d-flex justify-content-end">
          <b-button class="submit-btn " type="submit">Submit</b-button>
        </b-row>
      </form>
      <b-table
          class="table-hover"
          :items="items"
          :fields="fields"
          :select-mode="selectMode"
          responsive="sm"
          ref="selectableTable"
        >
          <template v-slot:cell(partner)>
            {{partner_name_selected}}
          </template>
          <template v-slot:cell(action)="row">
            <template v-if="row.item.action">
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
                @click="handleOpenUpdatePartnerCommission(row.item.action)"
              />
              <b-icon
                class="mr-3 btn"
                icon="trash-fill"
                variant="danger"
                @click="onSubmit(row.item.action)"
              />
            </template>
          </template>
        </b-table>
    </b-container>
    <b-modal
      id="update-partner-commission-modal"
      hide-footer
      size="xl"
      title="Update Partner Commission"
    >
      <UpdatePartnerCommission
        :partner_commission_id="updatePartnerCommissionId"
        @getPartnerCommissions="getPartnerCommissions"
      />
    </b-modal>
    <b-modal
      id="view-partner-commission-modal"
      hide-footer
      size="xl"
      title="View Partner Commission"
    >
      <ViewPartnerCommission
        :partner_commission_id="updatePartnerCommissionId"
        @getPartnerCommissions="getPartnerCommissions"
      />
    </b-modal>
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
  </div>
</template>


<script>
import {getApiData, postApiData, transactionGetApiData,deleteApiData} from "@/helpers/AxiosInstance";
import APIS from "@/constants/EndPoint";
import UpdatePartnerCommission from "@/views/partners/UpdatePartnerCommission";
import ViewPartnerCommission from "@/views/partners/ViewPartnerCommission";
import {responseHandler} from "@/helpers/globalFunctions";
import UpdateLabel from "@/components/reusable/UpdateLabel";

export default {
  name: 'AddPartnerCommission',
  props: ["partner_id","partner_name","partner_country","curruncy"],
  components: {
    UpdateLabel,
    UpdatePartnerCommission,
    ViewPartnerCommission
  },
  data() {
    return {
      errors: {},
      items: [],
      filter:"",
      deleteConfirm: false,
      processing: false,
      selectMode: "single",
      isshowform: false,
      deleteSelectedId:null,
      isDisableUpperLimit: false,
      updatePartnerCommissionId: null,
      partner_name_selected:this.partner_name,
      partnerSelected: this.partner_id,
      selectedCurrency:this.curruncy,
      partnerType: [
        {value: null, text: 'Please select an option', disabled: true}
      ],
      paymentMethodSelected: null,
      paymentMethodOptions: [
        {value: "cash_payment", text: 'Cash Payment'},
        {value: 'account_deposit', text: 'Account Payment'},
      ],
      selectedCountry: null,
      countryOptions: [],
      selectedServiceCharge: null,
      selectedServiceChargeType: [
        {value: 'percentage', text: 'Percentage'},
        {value: 'flat', text: 'Flat'},
      ],
      serviceCharge: "",
      selectedCurrencyType: [
        {value: 'local_currency', text: 'Local Currency'},
        {value: 'usd', text: 'USD Dollar'},
      ],
      upperLimit: null,
      payCommission: "",
      remarks: "",
      active: false
    }
  },
  methods: {
    onRowSelected(id) {
      console.log("commistion id " ,id);
      this.updatePartnerCommissionId = id;
      this.$bvModal.show("view-partner-commission-modal");
    },
    handleOpenUpdatePartnerCommission(id) {
      this.updatePartnerCommissionId = id;
      this.$bvModal.show("update-partner-commission-modal");
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
        `${APIS.DELETE_PARTNER_COMMISSION}/${this.deleteSelectedId}`
      );
      await responseHandler(
        response.data.status_code,
        this,
        response.data.message
      );
      if (response.data.status_code === 200) {
        await this.getPartnerCommissions();
      }
    },
    onClickOutside() {
      if (this.togglePartnerFilter)
        this.togglePartnerFilter = !this.togglePartnerFilter;
    },
    showPartnerCommitionForm(){
      this.isshowform = true;
    },
    async handleSubmit() {  
      const formData = JSON.stringify({
        partner_id: this.partnerSelected,
        country: this.selectedCountry,
        payment_method: this.paymentMethodSelected,
        service_charge_by: this.selectedServiceCharge,
        service_charge: this.serviceCharge,
        currency: this.selectedCurrency,
        upper_limit: this.upperLimit,
        is_active: this.active,
        remarks: this.remarks,
        pay_commission: 0,
      })
      const res = await postApiData(APIS.CREATE_PARTNER_COMMISSION, formData);
      await responseHandler(res.data.status_code, this, res.data.message)
      if (res.data.status_code === 200) {
        await this.$emit("getPartnerCommissions")
        await this.getPartnerCommissions();
        this.isshowform =false;
      } else {
        res.data.detail?.map((value) => {
          this.errors[`${value.loc[1]}`] = `${value.msg}`
        })
        console.log(this.errors);
      }
    },
    async formatPartnerOptions() {
      const res = await getApiData(APIS.GET_PARTNER_LIST);
      this.partnerType.push(...res.data.data.map(item => ({
        value: item.agent_id,
        text: item.name_of_employer
      })))
    },
    toggleUpperLimit() {
      this.isDisableUpperLimit = this.selectedServiceCharge === "percentage";
    },
    async getCountryList() {
      const res = await transactionGetApiData(`${APIS.GET_COUNTRY_NAME}`);
      this.countryOptions = res?.data?.map(item => ({
        value: item.country_name,
        text: item.country_name
      }))
      this.selectedCurrencyType = res?.data?.map(item => ({
        value: item.currency_code,
        text: `${item.currency_code}(${item.currency_name})`
      }))
    },
    async getPartnerCommissions() {
      const response = await getApiData(APIS.GET_PARTNER_COMMISSION_LIST_BY_PARTNER,{partner_id:this.partnerSelected});
      console.log(response, "data");
      await responseHandler(
        response.data.status_code,
        this,
        response.data.message
      );
      if (response.data.status_code === 200) {
        this.items = response.data.data[0].map((item) => ({
          country: item.country,
          partner: item.name_of_employer,
          payment_method: item.payment_method
            .replaceAll("_", " ")
            .toUpperCase(),
          comm_charge_ccy: item.currency,
          upper_limit: item.upper_limit,
          active: item.is_active,
          action: item.id,
        }));
      }
    },
  },

  async created() {
    this.selectedCountry = this.partner_country;
     await this.getPartnerCommissions();
    await this.formatPartnerOptions();
    await this.getCountryList()
  }
}
</script>
<style lang="scss" scoped>
@import "@/global.scss";

.btn-outline-light {
  color: $txt ;
  border-color: $primary ;
}

.btn-secondary {
  background: $txt ;
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

.submit-btn {
  margin: 20px;
  background-color: $primary !important;
  border: none;
  border-radius: 5px;
  height: 35px;
}

.cancel-button {
  height: 35px;
  margin: 20px;
}

.bv-no-focus-ring {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>