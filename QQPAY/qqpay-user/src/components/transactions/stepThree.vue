<template>
  <div>
    <h4>{{ $t("fundTransfers.whoAreYouSendingMoney") }}?</h4>
    <b-form-group
      label-for="filter-input"
      label-cols-sm="0"
      label-cols-lg="0"
      label-align-lg="right"
      content-cols-sm="12"
      content-cols-lg="4"
      label-align-sm="right"
      label-size="sm"
      class="mb-2"
    >
      <b-input-group size="sm">
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Search Beneficiary"
        ></b-form-input>

        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">{{
            $t("fundTransfers.clear")
          }}</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <span
      ><small
        >Selected Beneficiary:
        <span v-if="selectedBeneficiaryName !== ''">{{
          selectedBeneficiaryName
        }}</span>
        <span style="color: red" v-else>Please select Beneficiary</span></small
      ></span
    >
    <b-table
      :items="items"
      :fields="fields"
      :filter="filter"
      responsive
      selectable
      @row-selected="onRowSelected"
      select-mode="single"
      class="align-middle mt-2"
    >
      <template #cell(name)="row">
        <b-avatar
          variant="dark"
          :text="row.item.name.charAt(0) + row.item.name.charAt(1)"
          class="mr-2"
        ></b-avatar>
        <b>{{ row.item.name }}</b>
      </template>
      <template #cell(actions)="{ rowSelected }">
        <template v-if="rowSelected || selectedBeneficiary !== ''">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <b-button
      class="float-left mt-5 px-5"
      variant="outline-secondary"
      @click="buttonBackClickHandler"
      >Back</b-button
    >
    <b-button
      :disabled="disableNextBtn"
      class="float-right mt-5 px-5"
      variant="primary"
      @click="buttonClickHandler"
      >Next</b-button
    >
  </div>
</template>

<script>
import constants from "../../../constants.json"
import axios from "axios";
export default {
  props: ["txnDetails"],
  data () {
    return {
      Remittee_ID: null,
      selectedBeneficiaryName: "",
      fields: [
        { key: "Remittee_name", label: "Name" },
        { key: "Country_code", label: "Country" },
        { key: "registration_type_cd", label: "Type" },
        { key: "relation_with_Remitter_cd", label: "Relationship" },
        { key: "bankno", label: "Bank No" },
        { key: "bankcd", label: "Branch" },
        { key: "actions", label: "" },
      ],
      items: null,
      filter: null,
      rowSelected: false
    }
  },
  computed: {
    transaction_details: {
      get () {
        return this.txnDetails;
      },
      set (transaction_details) {
        this.$emit("input", transaction_details)
      }
    },
    disableNextBtn () {
      if (this.Remittee_ID !== null || this.Remittee_ID !== null) {
        return false
      }
      return true
    },
  },
  methods: {
    buttonClickHandler () {

      if (this.Remittee_ID !== null) {
        console.log("beneficiary", JSON.parse(localStorage.getItem('selectedBeneficiary')))
        this.$emit('my-event')
      } else {
        this.$bvToast.toast('Please Select Remittee', {
          title: 'Alert',
          variant: 'danger',
          solid: true
        })
      }
    },
    buttonBackClickHandler () {
      this.$emit('my-event-click-back')
    },
    onRowSelected (item) {
      console.log("item", item)
      if (item.length !== 0) {
        this.Remittee_ID = item[0].Remittee_ID
        this.selectedBeneficiaryName = item[0].Remittee_name
        this.selectedBeneficiary = item
        this.transaction_details.beneficiary = item[0]
        localStorage.setItem('transactionDetails', this.transaction_details)
        localStorage.setItem('selectedBeneficiary', JSON.stringify(item))
      } else {
        this.Remittee_ID = null
        this.selectedBeneficiaryName = ""
        this.selectedBeneficiary = ""
      }
      this.$store.commit('Transaction/Remittee_ID', { Remittee_ID: this.Remittee_ID })
      console.log(this.$store.getters['Transaction/transaction_details'])

    },
    getUserRemitteList () {
      axios
        .get(`${constants.REMITTER_API}/remitte_details/remitter/get_remittee_list`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${constants.ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          console.log('get-remitte-list', response)
          this.items = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
  created () {
    this.getUserRemitteList()
    console.log(this.$store.getters['Transaction/transaction_details'])
    if (this.selectedBeneficiaryName !== null || this.selectedBeneficiaryName !== "") {
      this.onRowSelected(JSON.parse(localStorage.getItem('selectedBeneficiary')))
    } else {
      let item = []
      this.onRowSelected(item)
    }

  }

}
</script>

<style>
</style>