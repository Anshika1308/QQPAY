<template>
  <div class="add-partner">
    <b-container>
      <form @submit.prevent="handleSubmit">
        <b-card class="mt-3" header="Contact Information">
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-contact-person-required" label="Contact Person"
                label-for="input-contact-person-required" description="This field is required">
                <b-form-input id="input-contact-person-required" v-model="contactInformation.contactPerson1" type="text"
                  required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-post-required" label="Post" label-for="input-post-required"
                description="This field is required">
                <b-form-input id="input-post-required" v-model="contactInformation.post1" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-contact-person-phone-required" label="Contact Person Phone"
                label-for="input-contact-person-phone-required" description="This field is required">
                <b-form-input id="input-contact-person-phone-required" v-model="contactInformation.contactPersonPhone1"
                  type="tel" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-contact-person-email-required" label="Contact Person Email"
                label-for="input-contact-person-email-required" description="This field is required">
                <b-form-input id="input-contact-person-email-required" v-model="contactInformation.contactPersonEmail1"
                  type="email" required></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-contact-person" label="Contact Person" label-for="input-contact-person">
                <b-form-input id="input-contact-person" v-model="contactInformation.contactPerson2" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-post" label="Post" label-for="input-post">
                <b-form-input id="input-post" v-model="contactInformation.post2" type="text"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-contact-person-phone" label="Contact Person Phone"
                label-for="input-contact-person-phone">
                <b-form-input id="input-contact-person-phone" v-model="contactInformation.contactPersonPhone2"
                  type="tel">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
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
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-name-of-employee" label="Name of Employer"
                label-for="input-name-of-employee" description="This field is required">
                <b-form-input id="input-name-of-employee" v-model="companyDetail.nameOfEmployer" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-short-code" label="Short Code" label-for="input-name-of-employee"
                description="This field is required">
                <b-form-input id="input-name-short-code" v-model="companyDetail.agentShortcode" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-short-code" label="Agent Code" label-for="input-name-of-employee"
                description="This field is required">
                <b-form-input id="input-name-short-code" v-model="companyDetail.agentCode" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-partner-type" label="Partner Type" label-for="input-partner-type">
                <b-form-select id="input-partner-type" required class="form-control" v-model="companyDetail.partnerType"
                  :options="companyDetail.partnerTypeOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-business-license" label="Business License"
                label-for="input-business-license">
                <b-form-input id="input-business-license" v-model="companyDetail.businessLicense" type="text" required>
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-address" label="Address" label-for="input-address">
                <b-form-input id="input-address" v-model="companyDetail.address" type="text" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-license-expiry-date" label="License Expiry Date"
                label-for="input-license-expiry-date">
                <b-form-input id="input-license-expiry-date" v-model="companyDetail.licenseExpiryDate" type="date"
                  required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-city" label="City" label-for="input-city">
                <b-form-input id="input-city" v-model="companyDetail.city" type="text" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-country" label="Country" label-for="input-country">
                <b-form-select id="input-partner-type" class="form-control" v-model="companyDetail.country"
                  :options="companyDetail.countryOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-phone-1" label="Phone 1" label-for="input-phone-1">
                <b-form-input id="input-phone-1" v-model="companyDetail.phone1" type="tel" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-phone-2" label="Phone 2" label-for="input-phone-2">
                <b-form-input id="input-phone-2" v-model="companyDetail.phone2" type="tel" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-email" label="Email" label-for="input-email">
                <b-form-input id="input-email" v-model="companyDetail.email" type="email" required></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-1" label="Website" label-for="input-1">
                <b-form-input id="input-1" v-model="companyDetail.website" type="url"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-zip-code" label="Zip Code" label-for="input-zip-code">
                <b-form-input id="input-zip-code" v-model="companyDetail.zipCode" type="text"></b-form-input>
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
              <b-form-checkbox class="mt-5" id="checkbox-is-this-non-irh-partner"
                v-model="companyDetail.isThisNonIRHPartner" name="checkbox-block-this-user" value="true"
                unchecked-value="false">
                Is This Non-IRH Partner
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-card>
        <b-card class="mt-3" header="Bank and Branch A/C Details">
          <b-row>
            <b-col md="6" sm="12" lg="6" xl="6" class="mb-4">
              <b-form-checkbox id="checkbox-calculate-payout-commission-daily"
                v-model="bankAndBranchAccountDetail.calculatePayoutCommissionDaily" name="checkbox-block-this-user"
                value="true" unchecked-value="false">
                Calculate Payout Commission Daily
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="6" xl="6" class="mb-4">
              <b-form-checkbox id="checkbox-do-not-allow-same-user-to-approve-transaction"
                v-model="bankAndBranchAccountDetail.doNotAllowSameUserToApprove" name="checkbox-block-this-user"
                value="accepted" unchecked-value="not_accepted">
                Do not Allow Same User To Approve Transaction
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-credit-limit-to-sdb-trn" label="Credit Limit To SBN TRN"
                label-for="input-credit-limit-to-sdb-trn">
                <b-form-input id="input-credit-limit-to-sdb-trn"
                  v-model="bankAndBranchAccountDetail.creditLimitToSBNTRN" type="text"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-limit-per-transaction-send" label="Credit Limit To SDN TRN"
                label-for="input-limit-per-transaction-send">
                <b-form-input id="input-limit-per-transaction-send"
                  v-model="bankAndBranchAccountDetail.creditLimitToSDNTRN" type="text"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-local-currency" label="Local Currency" label-for="input-local-currency">
                <b-form-select class="form-control" id="input-local-currency"
                  v-model="bankAndBranchAccountDetail.localCurrency"
                  :options="bankAndBranchAccountDetail.localCurrencyOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-mileage-defined" label="Mileage Defined" label-for="input-mileage-defined">
                <b-form-input id="input-mileage-defined" v-model="bankAndBranchAccountDetail.mileageDefined"
                  type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-max-payout-amt-per-txn" label="Max Payout Amt per TXN (Cash Pay)"
                label-for="input-max-payout-amt-per-txn">
                <b-form-input id="input-max-payout-amt-per-txn"
                  v-model="bankAndBranchAccountDetail.maxPayoutAmtPerTXNCashPay" type="text"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-max-payout-amt-per-txn" label="Max Payout Amt per TXN (AC Deposit)"
                label-for="input-max-payout-amt-per-txn">
                <b-form-input id="input-max-payout-amt-per-txn"
                  v-model="bankAndBranchAccountDetail.maxPayoutAmtPerTXNACDeposit" type="text"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-partner-settlement-in" label="Partner Settlement In"
                label-for="input-partner-settlement-in">
                <b-form-select class="form-control" id="input-partner-settlement-in"
                  v-model="bankAndBranchAccountDetail.partnerSettlementIn"
                  :options="bankAndBranchAccountDetail.partnerSettlementInOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
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
                  :options="bankAndBranchAccountDetail.partnerRightsOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-local-time" label="Local Time" label-for="input-local-time">
                <b-form-input id="input-local-time" v-model="bankAndBranchAccountDetail.localTime" type="time">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-date-format" label="Date Format" label-for="input-date-format">
                <b-form-input id="input-date-format" v-model="bankAndBranchAccountDetail.dateFormat" type="date">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-risk-levels" label="Risk Levels" label-for="input-risk-levels">
                <b-form-select class="form-control" id="input-risk-levels"
                  v-model="bankAndBranchAccountDetail.riskLevels"
                  :options="bankAndBranchAccountDetail.riskLevelsOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-tax-type" label="Tax Type" label-for="input-tax-type">
                <b-form-select class="form-control" id="input-tax-type" v-model="bankAndBranchAccountDetail.taxType"
                  :options="bankAndBranchAccountDetail.taxTypeOptions"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-settlement-date" label="Settlement Date" label-for="input-settlement-date">
                <b-form-input id="input-settlement-date" v-model="bankAndBranchAccountDetail.settlementDate"
                  type="date">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12" class="mb-4">

              <b-form-group id="input-group-partner-settlement-in" label="Payment Mode Allowed"
                label-for="input-partner-settlement-in">
                <b-form-checkbox-group v-model="bankAndBranchAccountDetail.paymentMethodAllowedSelected"
                  :options="bankAndBranchAccountDetail.paymentMethodAllowedOptions" class="mb-3" value-field="item"
                  text-field="name" disabled-field="notEnabled"></b-form-checkbox-group>
              </b-form-group>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12" class="mb-4">
              <b-form-group id="input-group-remarks" label="Remarks" label-for="input-remarks">
                <b-form-textarea id="input-remarks" v-model="bankAndBranchAccountDetail.remarks" rows="6">
                </b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col md="12" sm="12" lg="12" xl="12" class="mb-4">
              <b-form-group id="input-group-print-receipt-information" label="Print Receipt Information"
                label-for="input-print-receipt-information">
                <b-form-textarea id="input-print-receipt-information"
                  v-model="bankAndBranchAccountDetail.printReceiptInformation" rows="6"></b-form-textarea>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-fund-collection-day" label="Fund Collection Day"
                label-for="input-fund-collection-day">
                <b-form-select class="form-control" id="input-tax-type"
                  v-model="bankAndBranchAccountDetail.fundCollectionDay"
                  :options="bankAndBranchAccountDetail.fundCollectionDayOptions"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>

        </b-card>
        <b-card class="mt-3" header="Additional Details">
          <b-row>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-checkbox class="mt-5" id="checkbox-sms-notification-to-sender"
                v-model="additionalDetails.smsNotificationToSender" name="checkbox-sms-notification-to-sender"
                value="true" unchecked-value="false">
                SMS Notification To Sender
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="fundCollectionDayOptions12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-mobile-format" label="Mobile Format" label-for="input-mobile-format">
                <b-form-input id="input-mobile-format" v-model="additionalDetails.mobileFormat" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-mobile-digit-min" label="Mobile Digit Min"
                label-for="input-mobile-digit-min">
                <b-form-input id="input-mobile-digit-min" v-model="additionalDetails.mobileDigitMin" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-mobile-digit-max" label="Mobile Digit Max"
                label-for="input-mobile-digit-max">
                <b-form-input id="input-mobile-digit-max" v-model="additionalDetails.mobileDigitMax" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>

            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-country-code" label="Mobile Country Code" label-for="input-country-code">
                <b-form-input id="input-country-code" v-model="additionalDetails.mobileCountryCode" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-checkbox class="mt-5" id="checkbox-sms-notification-to-beneficiary" v-model="status"
                name="checkbox-sms-notification-to-beneficiary" value="accepted" unchecked-value="not_accepted">
                SMS Notification To Beneficiary
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-checkbox class="mt-5" id="checkbox-is-this-a-pre-funding-partner"
                v-model="additionalDetails.isThisAPreFundingPartner" name="checkbox-is-this-a-pre-funding-partner"
                value="true" unchecked-value="false">
                Is This a Pre-Funding Partner
              </b-form-checkbox>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-alert-notification"
                label="Alert Notification if Balance Below if Partner is Prepaid Agent"
                label-for="input-alert-notification">
                <b-form-input id="input-alert-notification"
                  v-model="additionalDetails.alertNotificationIfBalanceBelowIfPartnerIsPrepaidAgent" type="text">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
              <b-form-group id="input-group-branch-limit-to-make-payment" label="Branch Limit To make a Payment"
                label-for="input-branch-limit-to-make-payment">
                <b-form-input id="input-branch-limit-to-make-payment"
                  v-model="additionalDetails.branchLimitToMakeAPayment" type="text"></b-form-input>
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
import { getApiData, putApiData } from "@/helpers/AxiosInstance";
import APIS from "@/constants/EndPoint";
import { responseHandler } from "@/helpers/globalFunctions";

export default {
  name: 'UpdatePartner',
  props: ["partner_id"],
  data() {
    return {
      text: '',
      selected: null,
      status: 'not_accepted',
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
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
          { value: 'a', text: 'Partner Type 1' },
          { value: 'b', text: 'Partner Type 1' },
          { value: 'c', text: 'Partner Type 2' },
          { value: 'd', text: 'Partner Type 3' },
          { value: 'e', text: 'Partner Type 4', disabled: true }
        ],
        businessLicense: "",
        address: "",
        licenseExpiryDate: "",
        city: "",
        country: "",
        countryOptions: [
          { value: 'a', text: 'Country Type 1' },
          { value: 'b', text: 'Country Type 1' },
          { value: 'c', text: 'Country Type 2' },
          { value: 'd', text: 'Country Type 3' },
          { value: 'e', text: 'Country Type 4', disabled: true }
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
        creditLimitToSDNTRN: "",
        creditLimitToSBNTRN: "",
        localCurrency: null,
        localCurrencyOptions: [
          { value: 'a', text: 'Currency Type 1' },
          { value: 'b', text: 'Currency Type 1' },
          { value: 'c', text: 'Currency Type 2' },
          { value: 'd', text: 'Currency Type 3' },
          { value: 'e', text: 'Currency Type 4', disabled: true }
        ],
        mileageDefined: "",
        maxPayoutAmtPerTXNCashPay: "",
        maxPayoutAmtPerTXNACDeposit: "",
        partnerSettlementIn: null,
        partnerSettlementInOptions: [
          { value: 'a', text: 'Settlement In Type 1' },
          { value: 'b', text: 'Settlement In Type 1' },
          { value: 'c', text: 'Settlement In Type 2' },
          { value: 'd', text: 'Settlement In Type 3' },
          { value: 'e', text: 'Settlement In Type 4', disabled: true }
        ],
        limitForACustomerPerDay: false,
        partnerRights: null,
        partnerRightsOptions: [
          { value: 'a', text: 'Partner Rights Type 1' },
          { value: 'b', text: 'Partner Rights Type 1' },
          { value: 'c', text: 'Partner Rights Type 2' },
          { value: 'd', text: 'Partner Rights Type 3' },
          { value: 'e', text: 'Partner Rights Type 4', disabled: true }
        ],
        localTime: "",
        dateFormat: "",
        riskLevels: null,
        riskLevelsOptions: [
          { value: '1', text: 'Risk Level Type 1' },
          { value: '2', text: 'Risk Level Type 1' },
          { value: '3', text: 'Risk Level Type 2' },
          { value: '4', text: 'Risk Level Type 3' },
          { value: '5', text: 'Risk Level Type 4', disabled: true }
        ],
        taxType: null,
        taxTypeOptions: [
          { value: 'a', text: 'Tax Type 1' },
          { value: 'b', text: 'Tax Type 1' },
          { value: 'c', text: 'Tax Type 2' },
          { value: 'd', text: 'Tax Type 3' },
          { value: 'e', text: 'Tax Type 4', disabled: true }
        ],
        settlementDate: "",
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
          { value: 'a', text: 'Fund Collection Type 1' },
          { value: 'b', text: 'Fund Collection Type 1' },
          { value: 'c', text: 'Fund Collection Type 2' },
          { value: 'd', text: 'Fund Collection Type 3' },
          { value: 'e', text: 'Fund Collection Type 4', disabled: true }
        ],

      },
      additionalDetails: {
        smsNotificationToSender: "",
        mobileFormat: "",
        mobileDigitMin: "",
        mobileDigitMax: "",
        mobileCountryCode: "",
        smsNotificationToBeneficiary: "",
        isThisAPreFundingPartner: false,
        alertNotificationIfBalanceBelowIfPartnerIsPrepaidAgent: "",
        branchLimitToMakeAPayment: ""
      }
    }
  },
  methods: {

    async handleSubmit() {
      const formData = JSON.stringify({
        agent_code: this.companyDetail.agentCode,
        contact_name1: this.contactInformation.contactPerson1,
        designation1: this.contactInformation.post1,
        email1: this.contactInformation.contactPersonEmail1,
        contact_name2: this.contactInformation.contactPerson2,
        designation2: this.contactInformation.post2,
        email2: this.contactInformation.contactPersonEmail2,
        company_name: this.companyDetail.nameOfEmployer,
        agent_lic_no: this.companyDetail.businessLicense,
        agent_type: this.companyDetail.partnerType,
        agent_sub_type: "string",
        address: this.companyDetail.address,
        zip_code: this.companyDetail.zipCode,
        city: this.companyDetail.city,
        country: this.companyDetail.country,
        phone1: this.companyDetail.phone1,
        alt_phone_number: this.companyDetail.phone2,
        email: this.companyDetail.email,
        current_balance: 0,
        currency_type: this.bankAndBranchAccountDetail.localCurrency,
        date_of_join: "2022-05-22T16:15:32.452Z",
        status: "string",
        remarks: this.bankAndBranchAccountDetail.remarks,
        commission: 0,
        cType: "string",
        limit: 0,
        limit_per_person: 0,
        zone_id: 0,
        gmt_value: 0,
        mobile_no_format: this.additionalDetails.mobileFormat,
        mobile_digit_min: this.additionalDetails.mobileDigitMin,
        mobile_digit_max: this.additionalDetails.mobileDigitMax,
        credit_bank_limit: 0,
        increased_credit_limit: 0,
        limit_for_customer: 0,
        agent_short_code: this.companyDetail.agentShortcode,
        current_commission: 0,
        door_to_door_charge: 0,
        trn_limit_per_day: 0,
        trn_limit_date: "2022-05-22T16:15:32.452Z",
        payout_agent_balance: 0,
        alert_balance_amount: 0,
        alert_balance_enable: false,
        receiver_mobile_format: "string",
        date_format: this.bankAndBranchAccountDetail.dateFormat,
        cal_commission_daily: this.bankAndBranchAccountDetail.calculatePayoutCommissionDaily,
        max_payout_amt_per_trans: 0,
        ext_agent_code: "string",
        settlement_type: "string",
        approve_by: "string",
        approve_date: "2022-05-22T16:15:32.452Z",
        non_IRH_agent: this.bankAndBranchAccountDetail.isThisNonIRHPartner,
        external_ledger_id: "string",
        super_agent_id: "string",
        agent_settlement_date: moment(this.bankAndBranchAccountDetail.settlementDate).toDate(),
        helpdesk_detail: "string",
        settlement_calc_by: this.bankAndBranchAccountDetail.partnerSettlementIn,
        is_uniteller_agent: false,
        max_payout_amt_per_trans_deposit: 0,
        ext_settlement_clm: "string",
        consolidate_balance: "string",
        enable_txn_password: false,
        fund_collect_nos_day: this.bankAndBranchAccountDetail.fundCollectionDay,
        generate_partner_pinno: false,
        img_name: "string",
        lic_exp_date: moment(this.companyDetail.licenseExpiryDate).toDate(),
        limit_per_tran_b2b: 0,
        mileage_points_per_txn: this.bankAndBranchAccountDetail.mileageDefined,
        payout_fund_limit: false,
        third_party_agent: false,
        disable_txn_approve: false,
        agent_risk_score: this.bankAndBranchAccountDetail.riskLevels,
        tax_type: this.bankAndBranchAccountDetail.taxType,
        softex_id: "string",
        disable_api_send: false,
        company_licence_number: this.companyDetail.businessLicense,
        limit_approved: false,
        is_ir_hub_partner: false,
        is_this_is_pre_funding_partner: this.additionalDetails.isThisAPreFundingPartner,
        sms_notification_to_benificiary: this.additionalDetails.smsNotificationToBeneficiary,
        branch_limit_to_make_payment: this.additionalDetails.branchLimitToMakeAPayment,
        alert_notification_balance_below: this.additionalDetails.alertNotificationIfBalanceBelowIfPartnerIsPrepaidAgent,
        payment_mode: this.bankAndBranchAccountDetail.paymentMethodAllowedOptions.toString(),
        print_receipt_information: this.bankAndBranchAccountDetail.printReceiptInformation,
        sms_to_sender: this.additionalDetails.smsNotificationToSender,
        partner_rights: this.bankAndBranchAccountDetail.partnerRights,
        do_not_allow_same_user_to_approve_transaction: this.bankAndBranchAccountDetail.doNotAllowSameUserToApprove,
        is_block_partner: this.companyDetail.blockThisPartner
      })
      const response = await putApiData(`${APIS.UPDATE_PARTNER}/${this.partner_id}`, formData)
      await responseHandler(response.data.status_code, this, response.data.message)
      if (response.data.status_code === 200) {
        await this.$emit("getPartners")
        this.$bvModal.hide("update-partner-modal")
      }
    },
    async getPartner() {
      const res = await getApiData(`${APIS.GET_PARTNER}/${this.partner_id}`);
      if (res.data.status_code === 200) {
        this.contactInformation = {
          ...this.contactInformation,
          contactPerson1: res.data.data[0].contact_name1,
          post1: res.data.data[0].designation1,
          contactPersonEmail1: res.data.data[0].email1,
          contactPersonPhone1: res.data.data[0].phone1,
          contactPerson2: res.data.data[0].contact_name2,
          post2: res.data.data[0].designation2,
          contactPersonEmail2: res.data.data[0].email2,
          contactPersonPhone2: res.data.data[0].phone1,
        }
        this.companyDetail = {
          ...this.companyDetail,
          nameOfEmployer: res.data.data[0].company_name,
          agentShortcode: res.data.data[0].agent_short_code,
          agentCode: res.data.data[0].agentCode,
          partnerType: res.data.data[0].test,
          businessLicense: res.data.data[0].license,
          address: res.data.data[0].address,
          licenseExpiryDate: res.data.data[0].lic_exp_date,
          city: res.data.data[0].city,
          country: res.data.data[0].country,
          phone1: res.data.data[0].company_phon1,
          phone2: res.data.data[0].comapny_phone2,
          email: res.data.data[0].email,
          website: res.data.data[0].website,
          zipCode: res.data.data[0].zip_code,
          blockThisPartner: res.data.data[0].is_block_partner,
          isThisNonIRHPartner: res.data.data[0].non_IRH_agent,
        }
        this.bankAndBranchAccountDetail = {
          ...this.bankAndBranchAccountDetail,
          calculatePayoutCommissionDaily: res.data.data[0].cal_commission_daily,
          doNotAllowSameUserToApprove: res.data.data[0].do_not_allow_same_user_to_approve_transaction,
          creditLimitToSDNTRN: res.data.data[0].credit_bank_limit,
          creditLimitToSBNTRN: res.data.data[0].limit_per_tran_b2b,
          localCurrency: res.data.data[0].currency_type,
          mileageDefined: res.data.data[0].mileage_points_per_txn,
          maxPayoutAmtPerTXNCashPay: res.data.data[0].max_payout_amt_per_trans,
          maxPayoutAmtPerTXNACDeposit: res.data.data[0].max_payout_amt_per_trans_deposit,
          partnerSettlementIn: res.data.data[0].settlement_type,
          limitForACustomerPerDay: res.data.data[0].limit_for_customer,
          partnerRights: res.data.data[0].partner_rights,
          localTime: res.data.data[0].gmt_value,
          dateFormat: res.data.data[0].date_format,
          riskLevels: res.data.data[0].agent_risk_score,
          taxType: res.data.data[0].tax_type,
          settlementDate: res.data.data[0].agent_settlement_date,
          paymentMethodAllowedSelected: res.data.data[0].payment_mode.split(","),
          remarks: res.data.data[0].remarks,
          printReceiptInformation: res.data.data[0].print_receipt_information,
          fundCollectionDay: res.data.data[0].fund_collect_nos_day,
        }
        this.additionalDetails = {
          ...this.additionalDetails,
          smsNotificationToSender: res.data.data[0].sms_to_sender,
          mobileFormat: res.data.data[0].mobile_no_format,
          mobileDigitMin: res.data.data[0].mobile_digit_min,
          mobileDigitMax: res.data.data[0].mobile_digit_max,
          mobileCountryCode: "",
          smsNotificationToBeneficiary: res.data.data[0].sms_notification_to_benificiary,
          isThisAPreFundingPartner: res.data.data[0].is_this_is_pre_funding_partner,
          alertNotificationIfBalanceBelowIfPartnerIsPrepaidAgent: res.data.data[0].alert_notification_balance_below,
          branchLimitToMakeAPayment: res.data.data[0].branch_limit_to_make_payment
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