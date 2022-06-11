<template>
  <div class="add-partner">
    <b-container>
      <form @submit.prevent="handleSubmit">
        <b-card class="mt-3" header="Contact Information">
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Contact Person"/>
              <b-form-group id="input-group-contact-person-required" label="Contact Person"
                            label-for="input-contact-person-required">
                <b-form-input id="input-contact-person-required" v-model="contactInformation.contactPerson1" type="text"
                              required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Post"/>
              <b-form-group id="input-group-post-required" label="Post" label-for="input-post-required">
                <b-form-input id="input-post-required" v-model="contactInformation.post1" type="text" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Contact Person Phone"/>
              <b-form-group id="input-group-contact-person-phone-required" label="Contact Person Phone"
                            label-for="input-contact-person-phone-required">
                <b-form-input id="input-contact-person-phone-required" v-model="contactInformation.contactPersonPhone1"
                              type="tel" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Contact Person Email"/>
              <b-form-group id="input-group-contact-person-email-required" label="Contact Person Email"
                            label-for="input-contact-person-email-required">
                <b-form-input id="input-contact-person-email-required" v-model="contactInformation.contactPersonEmail1"
                              type="email" required/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-contact-person" label="Contact Person" label-for="input-contact-person">
                <b-form-input id="input-contact-person" v-model="contactInformation.contactPerson2" type="text"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-post" label="Post" label-for="input-post">
                <b-form-input id="input-post" v-model="contactInformation.post2" type="text"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-contact-person-phone" label="Contact Person Phone"
                            label-for="input-contact-person-phone">
                <b-form-input id="input-contact-person-phone" v-model="contactInformation.contactPersonPhone2"
                              type="tel"/>

              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-contact-person-email" label="Contact Person Email"
                            label-for="input-contact-person-email">
                <b-form-input id="input-contact-person-email" v-model="contactInformation.contactPersonEmail2"
                              type="email"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card class="mt-3" header="Company Details">
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Name of Employeer"/>
              <b-form-group id="input-group-name-of-employee" label="Name of Employer"
                            label-for="input-name-of-employee">
                <b-form-input id="input-name-of-employee" v-model="companyDetail.nameOfEmployer" type="text" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Short Code"/>
              <b-form-group id="input-group-short-code" label="Short Code" label-for="input-name-of-employee">
                <b-form-input id="input-name-short-code" v-model="companyDetail.agentShortcode" type="text" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Agent Code"/>
              <b-form-group id="input-group-partner-id" label="Agent Code" label-for="input-partner-id">
                <b-form-input id="input-partner-id" v-model="companyDetail.agentCode" type="text"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Agent Code"/>
              <b-form-group id="input-group-partner-type" label="Partner Type" label-for="input-partner-type">
                <b-form-select id="input-partner-type" class="form-control" v-model="companyDetail.partnerType"
                               :options="companyDetail.partnerTypeOptions" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Business License"/>
              <b-form-group id="input-group-business-license" label="Business License"
                            label-for="input-business-license">
                <b-form-input id="input-business-license" v-model="companyDetail.businessLicense" type="text"
                              required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Address"/>
              <b-form-group id="input-group-address" label="Address" label-for="input-address">
                <b-form-input id="input-address" v-model="companyDetail.address" type="text" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="License Expiry Date"/>
              <b-form-group id="input-group-license-expiry-date" label="License Expiry Date"
                            label-for="input-license-expiry-date">
                <b-form-input id="input-license-expiry-date" v-model="companyDetail.licenseExpiryDate" type="date"
                              required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="City"/>
              <b-form-group id="input-group-city" label="City" label-for="input-city">
                <b-form-input id="input-city" v-model="companyDetail.city" type="text" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Country"/>
              <b-form-group id="input-group-country" label="Country" label-for="input-country">
                <b-form-select id="input-partner-type" class="form-control" v-model="companyDetail.country"
                               :options="companyDetail.countryOptions"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Phone 1"/>
              <b-form-group id="input-group-phone-1" label="Phone 1" label-for="input-phone-1">
                <b-form-input id="input-phone-1" v-model="companyDetail.phone1" type="tel" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-phone-2" label="Phone 2" label-for="input-phone-2">
                <b-form-input id="input-phone-2" v-model="companyDetail.phone2" type="tel"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <UpdateLabel label="Email"/>
              <b-form-group id="input-group-email" label="Email" label-for="input-email">
                <b-form-input id="input-email" v-model="companyDetail.email" type="email" required/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-1" label="Website" label-for="input-1">
                <b-form-input id="input-1" v-model="companyDetail.website" type="url"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-zip-code" label="Zip Code" label-for="input-zip-code">
                <b-form-input id="input-zip-code" v-model="companyDetail.zipCode" type="text"/>
              </b-form-group>
            </b-col>

            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-checkbox class="mt-5 checkbox" id="checkbox-block-this-user"
                               v-model="companyDetail.blockThisPartner" name="checkbox-block-this-user" value="true"
                               unchecked-value="false">
                Block This Partner
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-checkbox id="checkbox-is-this-non-irh-partner" v-model="companyDetail.isThisNonIRHPartner"
                               name="checkbox-block-this-user" value="true" unchecked-value="false">
                Is This Non-IRH Partner
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-card>
        <b-card class="mt-3" header="Bank and Branch A/C Details">
          <b-row>
            <b-col md="6" sm="12" lg="6" xl="6" class="mb-4">
              <b-form-checkbox id="checkbox-calculate-payout-commission-daily"
                               v-model="bankAndBranchAccountDetail.calculatePayoutCommissionDaily"
                               name="checkbox-block-this-user"
                               value="true" unchecked-value="false">
                Calculate Payout Commission Daily
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6" class="mb-4">
              <b-form-checkbox id="checkbox-do-not-allow-same-user-to-approve-transaction"
                               v-model="bankAndBranchAccountDetail.doNotAllowSameUserToApprove"
                               name="checkbox-block-this-user"
                               value="true" unchecked-value="false">
                Do not Allow Same User To Approve Transaction
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-credit-limit-to-sdb-trn" label="Credit Limit To SBN TRN"
                            label-for="input-credit-limit-to-sdb-trn">
                <b-form-input id="input-credit-limit-to-sdb-trn"
                              v-model="bankAndBranchAccountDetail.creditLimitToSBNTRN" type="number"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-limit-per-transaction-send" label="Credit Limit To SDN TRN"
                            label-for="input-limit-per-transaction-send">
                <b-form-input id="input-limit-per-transaction-send"
                              v-model="bankAndBranchAccountDetail.creditLimitToSDNTRN" type="number"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-local-currency" label="Local Currency" label-for="input-local-currency">
                <b-form-select class="form-control" id="input-local-currency"
                               v-model="bankAndBranchAccountDetail.localCurrency"
                               :options="bankAndBranchAccountDetail.localCurrencyOptions"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-mileage-defined" label="Mileage Defined" label-for="input-mileage-defined">
                <b-form-input id="input-mileage-defined" v-model="bankAndBranchAccountDetail.mileageDefined"
                              type="number"/>

              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-max-payout-amt-per-txn" label="Max Payout Amt per TXN (Cash Pay)"
                            label-for="input-max-payout-amt-per-txn">
                <b-form-input id="input-max-payout-amt-per-txn"
                              v-model="bankAndBranchAccountDetail.maxPayoutAmtPerTXNCashPay" type="number"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-max-payout-amt-per-txn" label="Max Payout Amt per TXN (AC Deposit)"
                            label-for="input-max-payout-amt-per-txn">
                <b-form-input id="input-max-payout-amt-per-txn"
                              v-model="bankAndBranchAccountDetail.maxPayoutAmtPerTXNACDeposit" type="number"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-partner-settlement-in" label="Partner Settlement In"
                            label-for="input-partner-settlement-in">
                <b-form-select class="form-control" id="input-partner-settlement-in"
                               v-model="bankAndBranchAccountDetail.partnerSettlementIn"
                               :options="bankAndBranchAccountDetail.partnerSettlementInOptions"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-checkbox class="mt-5" id="checkbox-limit-for-a-customer-per-day"
                               v-model="bankAndBranchAccountDetail.limitForACustomerPerDay"
                               name="checkbox-limit-for-a-customer-per-day" value="true" unchecked-value="false">
                Limit for a customer per day
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-partner-rights" label="Partner Rights" label-for="input-partner-rights">
                <b-form-select class="form-control" id="input-partner-rights"
                               v-model="bankAndBranchAccountDetail.partnerRights"
                               :options="bankAndBranchAccountDetail.partnerRightsOptions"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-local-time" label="Local Time" label-for="input-local-time">
                <b-form-input id="input-local-time" v-model="bankAndBranchAccountDetail.localTime" type="text"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-date-format" label="Date Format" label-for="input-date-format">
                <b-form-input id="input-date-format" v-model="bankAndBranchAccountDetail.dateFormat" type="date"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-risk-levels" label="Risk Levels" label-for="input-risk-levels">
                <b-form-select class="form-control" id="input-risk-levels"
                               v-model="bankAndBranchAccountDetail.riskLevels"
                               :options="bankAndBranchAccountDetail.riskLevelsOptions"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-tax-type" label="Tax Type" label-for="input-tax-type">
                <b-form-select class="form-control" id="input-tax-type" v-model="bankAndBranchAccountDetail.taxType"
                               :options="bankAndBranchAccountDetail.taxTypeOptions"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-settlement-date" label="Settlement Date" label-for="input-settlement-date">
                <b-form-input id="input-settlement-date" v-model="bankAndBranchAccountDetail.settlementDate"
                              type="date"/>
              </b-form-group>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12">
              <b-form-group id="input-group-partner-settlement-in" label="Payment Mode Allowed"
                            label-for="input-partner-settlement-in">
                <b-form-checkbox-group v-model="bankAndBranchAccountDetail.paymentMethodAllowedSelected"
                                       :options="bankAndBranchAccountDetail.paymentMethodAllowedOptions" class="mb-3"
                                       value-field="item"
                                       text-field="name" disabled-field="notEnabled"/>
              </b-form-group>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12">
              <b-form-group id="input-group-remarks" label="Remarks" label-for="input-remarks">
                <b-form-textarea id="input-remarks" v-model="bankAndBranchAccountDetail.remarks" rows="6"/>
              </b-form-group>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12">
              <b-form-group id="input-group-print-receipt-information" label="Print Receipt Information"
                            label-for="input-print-receipt-information">
                <b-form-textarea id="input-print-receipt-information"
                                 v-model="bankAndBranchAccountDetail.printReceiptInformation" rows="6"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-fund-collection-day" label="Fund Collection Day"
                            label-for="input-fund-collection-day">
                <b-form-select class="form-control" id="input-tax-type"
                               v-model="bankAndBranchAccountDetail.fundCollectionDay"
                               :options="bankAndBranchAccountDetail.fundCollectionDayOptions"/>
              </b-form-group>
            </b-col>
          </b-row>

        </b-card>
        <b-card class="mt-3" header="Additional Details">
          <b-row>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-checkbox class="mt-5" id="checkbox-sms-notification-to-sender"
                               v-model="additionalDetails.smsNotificationToSender"
                               name="checkbox-sms-notification-to-sender"
                               value="true" unchecked-value="false">
                SMS Notification To Sender
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="fundCollectionDayOptions12" lg="4" xl="4">
              <b-form-group id="input-group-mobile-format" label="Mobile Format" label-for="input-mobile-format">
                <b-form-input id="input-mobile-format" v-model="additionalDetails.mobileFormat" type="text"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-mobile-digit-min" label="Mobile Digit Min"
                            label-for="input-mobile-digit-min">
                <b-form-input id="input-mobile-digit-min" v-model="additionalDetails.mobileDigitMin" type="text"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-mobile-digit-max" label="Mobile Digit Max"
                            label-for="input-mobile-digit-max">
                <b-form-input id="input-mobile-digit-max" v-model="additionalDetails.mobileDigitMax" type="text"/>
              </b-form-group>
            </b-col>

            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-country-code" label="Mobile Country Code" label-for="input-country-code">
                <b-form-input id="input-country-code" v-model="additionalDetails.mobileCountryCode" type="text"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-checkbox class="mt-5" id="checkbox-sms-notification-to-beneficiary" v-model="status"
                               name="checkbox-sms-notification-to-beneficiary" value="true" unchecked-value="false">
                SMS Notification To Beneficiary
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-checkbox class="mt-5" id="checkbox-is-this-a-pre-funding-partner"
                               v-model="additionalDetails.isThisAPreFundingPartner"
                               name="checkbox-is-this-a-pre-funding-partner"
                               value="true" unchecked-value="false">
                Is This a Pre-Funding Partner
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-alert-notification"
                            label="Alert Notification if Balance Below if Partner is Prepaid Agent"
                            label-for="input-alert-notification">
                <b-form-input id="input-alert-notification"
                              v-model="additionalDetails.alertNotificationIfBalanceBelowIfPartnerIsPrepaidAgent"
                              type="number"/>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4">
              <b-form-group id="input-group-branch-limit-to-make-payment" label="Branch Limit To make a Payment"
                            label-for="input-branch-limit-to-make-payment">
                <b-form-input id="input-branch-limit-to-make-payment"
                              v-model="additionalDetails.branchLimitToMakeAPayment" type="number"/>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-row>
          <b-button class="submit-btn" type="submit">Submit</b-button>
        </b-row>
      </form>
    </b-container>

  </div>
</template>


<script>
import moment from "moment";
import {getApiData, putApiData} from "@/helpers/AxiosInstance";
import APIS from "@/constants/EndPoint";
import {responseHandler} from "@/helpers/globalFunctions";
import UpdateLabel from "@/components/reusable/UpdateLabel";

export default {
  name: 'UpdatePartner',
  props: ["partner_id"],
  components: {
    UpdateLabel,
  },
  data() {
    return {
      text: '',
      selected: null,
      errors: {},
      status: false,
      options: [
        {value: null, text: 'Please select an option'},
        {value: 'a', text: 'This is First option'},
        {value: 'b', text: 'Selected Option'},
        {value: {C: '3PO'}, text: 'This is an option with object value'},
        {value: 'd', text: 'This one is disabled', disabled: true}
      ],
      contactInformation: {
        contactPerson1: "",
        post1: "",
        contactPersonEmail1: "",
        contactPersonPhone1: "",
        contactPerson2: "",
        post2: "",
        contactPersonEmail2: "",
        contactPersonPhone2: "",

      },
      companyDetail: {
        nameOfEmployer: "",
        agentShortcode: "",
        agentCode: "",
        partnerType: null,
        partnerTypeOptions: [
          {value: 'sender', text: 'Sender'},
          {value: 'receiver', text: 'Receiver'},
          {value: 'sender_and_receiver', text: 'Sender And Receiver'},
          {value: 'bank', text: 'Bank'},
          {value: 'sub_agent', text: 'Sub Agent'}
        ],
        businessLicense: "",
        address: "",
        licenseExpiryDate: "",
        city: "",
        country: "",
        countryOptions: [
          {value: 'a', text: 'Country Type 1'},
          {value: 'b', text: 'Country Type 1'},
          {value: 'c', text: 'Country Type 2'},
          {value: 'd', text: 'Country Type 3'},
          {value: 'e', text: 'Country Type 4', disabled: true}
        ],
        phone1: "",
        phone2: "",
        email: "",
        website: "",
        zipCode: "",
        blockThisPartner: false,
        isThisNonIRHPartner: false
      },
      bankAndBranchAccountDetail: {
        calculatePayoutCommissionDaily: false,
        doNotAllowSameUserToApprove: false,
        creditLimitToSDNTRN: null,
        creditLimitToSBNTRN: null,
        localCurrency: null,
        localCurrencyOptions: [
          {value: 'a', text: 'Currency Type 1'},
          {value: 'b', text: 'Currency Type 1'},
          {value: 'c', text: 'Currency Type 2'},
          {value: 'd', text: 'Currency Type 3'},
          {value: 'e', text: 'Currency Type 4', disabled: true}
        ],
        mileageDefined: 0,
        maxPayoutAmtPerTXNCashPay: null,
        maxPayoutAmtPerTXNACDeposit: null,
        partnerSettlementIn: null,
        partnerSettlementInOptions: [
          {value: 'a', text: 'Settlement In Type 1'},
          {value: 'b', text: 'Settlement In Type 1'},
          {value: 'c', text: 'Settlement In Type 2'},
          {value: 'd', text: 'Settlement In Type 3'},
          {value: 'e', text: 'Settlement In Type 4', disabled: true}
        ],
        limitForACustomerPerDay: false,
        partnerRights: null,
        partnerRightsOptions: [
          {value: 'a', text: 'Partner Rights Type 1'},
          {value: 'b', text: 'Partner Rights Type 1'},
          {value: 'c', text: 'Partner Rights Type 2'},
          {value: 'd', text: 'Partner Rights Type 3'},
          {value: 'e', text: 'Partner Rights Type 4', disabled: true}
        ],
        localTime: "",
        dateFormat: null,
        riskLevels: null,
        riskLevelsOptions: [
          {value: '1', text: 'Risk Level Type 1'},
          {value: '2', text: 'Risk Level Type 1'},
          {value: '3', text: 'Risk Level Type 2'},
          {value: '4', text: 'Risk Level Type 3'},
          {value: '5', text: 'Risk Level Type 4', disabled: true}
        ],
        taxType: null,
        taxTypeOptions: [
          {value: 'a', text: 'Tax Type 1'},
          {value: 'b', text: 'Tax Type 1'},
          {value: 'c', text: 'Tax Type 2'},
          {value: 'd', text: 'Tax Type 3'},
          {value: 'e', text: 'Tax Type 4', disabled: true}
        ],
        settlementDate: null,
        paymentMethodAllowedSelected: [],
        paymentMethodAllowedOptions: [
          "Account Deposit to Other Bank",
          "Home Delivery Manila City",
          "CUP Bank Card",
          "Wallet",
          "Cash Payment",
          "Home Delivery Provinces",
          "Upay",
          "Account Deposit",
          "Other Bank Deposit",
          "ROCKET PAY",
          "Instant Credit",
          "Home Delivery",
          "NEFT",
          "Mobile Payment Direct Credit",
        ],
        remarks: "",
        printReceiptInformation: "",
        fundCollectionDay: null,
        fundCollectionDayOptions: [
          {value: '1', text: 'Fund Collection Type 1'},
          {value: '2', text: 'Fund Collection Type 1'},
          {value: '3', text: 'Fund Collection Type 2'},
          {value: '4', text: 'Fund Collection Type 3'},
          {value: '5', text: 'Fund Collection Type 4', disabled: true}
        ],

      },
      additionalDetails: {
        smsNotificationToSender: false,
        mobileFormat: "",
        mobileDigitMin: "",
        mobileDigitMax: "",
        mobileCountryCode: "",
        smsNotificationToBeneficiary: false,
        isThisAPreFundingPartner: false,
        alertNotificationIfBalanceBelowIfPartnerIsPrepaidAgent: 0,
        branchLimitToMakeAPayment: null
      }
    }
  },
  methods: {

    async handleSubmit() {
      const formData = JSON.stringify({
        contact_person_1: this.contactInformation.contactPerson1,
        contact_person_1_post: this.contactInformation.post1,
        contact_person_1_phone: this.contactInformation.contactPersonPhone1,
        contact_person_1_email: this.contactInformation.contactPersonEmail1,
        contact_person_2: this.contactInformation.contactPerson2,
        contact_person_2_post: this.contactInformation.post2,
        contact_person_2_phone: this.contactInformation.contactPersonPhone2,
        contact_person_2_email: this.contactInformation.contactPersonEmail2,
        name_of_employer: this.companyDetail.nameOfEmployer,
        short_code: this.companyDetail.agentShortcode,
        agent_code: this.companyDetail.agentCode,
        partner_type: this.companyDetail.partnerType,
        business_license: this.companyDetail.businessLicense,
        company_address: this.companyDetail.address,
        license_expiry_date: moment(this.companyDetail.licenseExpiryDate).toDate(),
        company_city: this.companyDetail.city,
        company_country: this.companyDetail.country,
        company_phone_1: this.companyDetail.phone1,
        company_phone_2: this.companyDetail.phone2,
        company_email: this.companyDetail.email,
        company_website: this.companyDetail.website,
        company_zip_code: this.companyDetail.zipCode,
        block_this_partner: this.companyDetail.blockThisPartner,
        is_this_non_irh_partner: this.companyDetail.isThisNonIRHPartner,
        calculate_payout_commission_daily: this.bankAndBranchAccountDetail.calculatePayoutCommissionDaily,
        do_not_allow_same_user_to_approve_transaction: this.bankAndBranchAccountDetail.doNotAllowSameUserToApprove,
        credit_limit_to_sbn_trn: this.bankAndBranchAccountDetail.creditLimitToSBNTRN,
        credit_limit_to_sdn_trn: this.bankAndBranchAccountDetail.creditLimitToSDNTRN,
        local_currency: this.bankAndBranchAccountDetail.localCurrency,
        mileage_defined: this.bankAndBranchAccountDetail.mileageDefined,
        max_payout_amt_per_txn_cash_pay: this.bankAndBranchAccountDetail.maxPayoutAmtPerTXNCashPay,
        max_payout_amt_per_txn_ac_deposit: this.bankAndBranchAccountDetail.maxPayoutAmtPerTXNACDeposit,
        partner_settle_ment_in: this.bankAndBranchAccountDetail.partnerSettlementIn,
        limit_for_a_customer_per_day: this.bankAndBranchAccountDetail.limitForACustomerPerDay,
        partner_rights: this.bankAndBranchAccountDetail.partnerRights,
        local_time: this.bankAndBranchAccountDetail.localTime,
        date_format: this.bankAndBranchAccountDetail.dateFormat,
        risk_level: this.bankAndBranchAccountDetail.riskLevels,
        tax_type: this.bankAndBranchAccountDetail.taxType,
        settlement_date: this.bankAndBranchAccountDetail.settlementDate ? moment(this.bankAndBranchAccountDetail.settlementDate).format("YYYY-MM-DD") : null,
        payment_mode_allowed: this.bankAndBranchAccountDetail.paymentMethodAllowedOptions.toString(),
        remarks: this.bankAndBranchAccountDetail.remarks,
        print_receipt_information: this.bankAndBranchAccountDetail.printReceiptInformation,
        fund_collection_day: this.bankAndBranchAccountDetail.fundCollectionDay,
        sms_notification_to_sender: this.additionalDetails.smsNotificationToSender,
        mobile_format: this.additionalDetails.mobileFormat,
        mobile_min_digit: this.additionalDetails.mobileDigitMin,
        mobile_max_digit: this.additionalDetails.mobileDigitMax,
        mobile_country_code: this.additionalDetails.mobileCountryCode,
        sms_notification_to_beneficiary: this.additionalDetails.smsNotificationToBeneficiary,
        is_this_a_pre_funding_partner: this.additionalDetails.isThisAPreFundingPartner,
        alert_notification_if_balance_below_if_partner_is_pre_agent: this.additionalDetails.alertNotificationIfBalanceBelowIfPartnerIsPrepaidAgent,
        branch_limit_to_make_a_payment: this.additionalDetails.branchLimitToMakeAPayment
      })
      const response = await putApiData(`${APIS.UPDATE_PARTNER}/${this.partner_id}`, formData)
      await responseHandler(response.data.status_code, this, response.data.message)
      if (response.data.status_code === 200) {
        await this.$emit("getPartners")
        this.$bvModal.hide("update-partner-modal")
      } else {
        response.data.detail?.map((value) => {
          this.errors[`${value.loc[1]}`] = `${value.msg}`
        })
      }
    },
    async getPartner() {
      const res = await getApiData(`${APIS.GET_PARTNER}/${this.partner_id}`);
      console.log(res.data.data)
      if (res.data.status_code === 200) {
        this.contactInformation = {
          ...this.contactInformation,
          contactPerson1: res.data.data[0].contact_person_1,
          post1: res.data.data[0].contact_person_1_post,
          contactPersonEmail1: res.data.data[0].contact_person_1_email,
          contactPersonPhone1: res.data.data[0].contact_person_1_phone,
          contactPerson2: res.data.data[0].contact_person_2,
          post2: res.data.data[0].contact_person_2_post,
          contactPersonEmail2: res.data.data[0].contact_person_2_email,
          contactPersonPhone2: res.data.data[0].contact_person_2_phone,
        }
        this.companyDetail = {
          ...this.companyDetail,
          nameOfEmployer: res.data.data[0].name_of_employer,
          agentShortcode: res.data.data[0].short_code,
          agentCode: res.data.data[0].agent_code,
          partnerType: res.data.data[0].partner_type,
          businessLicense: res.data.data[0].business_license,
          address: res.data.data[0].company_address,
          licenseExpiryDate: moment(res.data.data[0].license_expiry_date).format("YYYY-MM-DD"),
          city: res.data.data[0].company_city,
          country: res.data.data[0].company_country,
          phone1: res.data.data[0].company_phone_1,
          phone2: res.data.data[0].company_phone_2,
          email: res.data.data[0].company_email,
          website: res.data.data[0].company_website,
          zipCode: res.data.data[0].company_zip_code,
          blockThisPartner: res.data.data[0].block_this_partner,
          isThisNonIRHPartner: res.data.data[0].is_this_non_irh_partner,
        }
        this.bankAndBranchAccountDetail = {
          ...this.bankAndBranchAccountDetail,
          calculatePayoutCommissionDaily: res.data.data[0].calculate_payout_commission_daily,
          doNotAllowSameUserToApprove: res.data.data[0].do_not_allow_same_user_to_approve_transaction,
          creditLimitToSDNTRN: res.data.data[0].credit_limit_to_sdn_trn,
          creditLimitToSBNTRN: res.data.data[0].credit_limit_to_sbn_trn,
          localCurrency: res.data.data[0].currency_type,
          mileageDefined: res.data.data[0].mileage_defined,
          maxPayoutAmtPerTXNCashPay: res.data.data[0].max_payout_amt_per_txn_cash_pay,
          maxPayoutAmtPerTXNACDeposit: res.data.data[0].max_payout_amt_per_txn_ac_deposit,
          partnerSettlementIn: res.data.data[0].partner_settle_ment_in,
          limitForACustomerPerDay: res.data.data[0].limit_for_a_customer_per_day,
          partnerRights: res.data.data[0].partner_rights,
          localTime: res.data.data[0].local_time,
          dateFormat: res.data.data[0].date_format,
          riskLevels: res.data.data[0].risk_level,
          taxType: res.data.data[0].tax_type,
          settlementDate: res.data.data[0].settlement_date,
          paymentMethodAllowedSelected: res.data.data[0]?.payment_mode?.split(","),
          remarks: res.data.data[0].remarks,
          printReceiptInformation: res.data.data[0].print_receipt_information,
          fundCollectionDay: res.data.data[0].fund_collection_day,
        }
        this.additionalDetails = {
          ...this.additionalDetails,
          smsNotificationToSender: res.data.data[0].sms_notification_to_sender,
          mobileFormat: res.data.data[0].mobile_format,
          mobileDigitMin: res.data.data[0].mobile_min_digit,
          mobileDigitMax: res.data.data[0].mobile_max_digit,
          mobileCountryCode: res.data.data[0].mobile_country_code,
          smsNotificationToBeneficiary: res.data.data[0].sms_notification_to_beneficiary,
          isThisAPreFundingPartner: res.data.data[0].is_this_a_pre_funding_partner,
          alertNotificationIfBalanceBelowIfPartnerIsPrepaidAgent: res.data.data[0].alert_notification_if_balance_below_if_partner_is_pre_agent,
          branchLimitToMakeAPayment: res.data.data[0].branch_limit_to_make_a_payment
        }
      }
    },


  },
  computed: {},
  async created() {
    await this.getPartner()
  }
}
</script>
<style lang="scss" scoped>
@import "@/global.scss";

.submit-btn {
  margin: 20px;
  background-color: $primary;
  border: none;
  border-radius: 5px;
  height: 35px;
}

.bv-no-focus-ring {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>