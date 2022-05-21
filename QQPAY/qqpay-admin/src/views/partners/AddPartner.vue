<template>
  <b-container>
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
            <b-form-input id="input-post-required" v-model="contactInformation.post1" type="email" required>
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
            <b-form-input id="input-contact-person" v-model="contactInformation.contactPerson1" type="text">
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
            <b-form-input id="input-contact-person-phone" v-model="text" type="tel">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-contact-person-email" label="Contact Person Email"
            label-for="input-contact-person-email">
            <b-form-input id="input-contact-person-email" v-model="text" type="email" required></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="mt-3" header="Company Details">
      <b-row class="mt-2">
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-name-of-employee" label="Name of Employer" label-for="input-name-of-employee"
            description="This field is required">
            <b-form-input id="input-name-of-employee" v-model="text" type="text" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-partner-id" label="Partner ID" label-for="input-partner-id">
            <b-form-input id="input-partner-id" v-model="text" type="text"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-partner-type" label="Partner Type" label-for="input-partner-type">
            <b-form-select id="input-partner-type" v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-business-license" label="Business License" label-for="input-business-license">
            <b-form-input id="input-business-license" v-model="text" type="text" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-address" label="Address" label-for="input-address">
            <b-form-input id="input-address" v-model="text" type="text" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-license-expiry-date" label="License Expiry Date"
            label-for="input-license-expiry-date">
            <b-form-input id="input-license-expiry-date" v-model="text" type="date" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-city" label="City" label-for="input-city">
            <b-form-input id="input-city" v-model="text" type="text" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-country" label="Country" label-for="input-country">
            <b-form-select id="input-partner-type" v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-phone-1" label="Phone 1" label-for="input-phone-1">
            <b-form-input id="input-phone-1" v-model="text" type="tel" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-phone-2" label="Phone 2" label-for="input-phone-2">
            <b-form-input id="input-phone-2" v-model="text" type="tel" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-email" label="Email" label-for="input-email">
            <b-form-input id="input-email" v-model="text" type="email" required></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-1" label="Website" label-for="input-1">
            <b-form-input id="input-1" v-model="text" type="url"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-zip-code" label="Zip Code" label-for="input-zip-code">
            <b-form-input id="input-zip-code" v-model="text" type="text"></b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-checkbox class="mt-5" id="checkbox-block-this-user" v-model="status" name="checkbox-block-this-user"
            value="accepted" unchecked-value="not_accepted">
            Block This Partner
          </b-form-checkbox>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-checkbox class="mt-5" id="checkbox-is-this-non-irh-partner" v-model="status"
            name="checkbox-block-this-user" value="accepted" unchecked-value="not_accepted">
            Is This Non-IRH Partner
          </b-form-checkbox>
        </b-col>
      </b-row>
    </b-card>
    <b-card class="mt-3" header="Bank and Branch A/C Details">
      <b-row>
        <b-col md="6" sm="12" lg="6" xl="6" class="mb-4">
          <b-form-checkbox id="checkbox-calculate-payout-commission-daily" v-model="status"
            name="checkbox-block-this-user" value="accepted" unchecked-value="not_accepted">
            Calculate Payout Commission Daily
          </b-form-checkbox>
        </b-col>
        <b-col md="6" sm="12" lg="6" xl="6" class="mb-4">
          <b-form-checkbox id="checkbox-do-not-allow-same-user-to-approve-transaction" v-model="status"
            name="checkbox-block-this-user" value="accepted" unchecked-value="not_accepted">
            Do not Allow Same User To Approve Transaction
          </b-form-checkbox>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-credit-limit-to-sdb-trn" label="Credit Limit To SDN TRN"
            label-for="input-credit-limit-to-sdb-trn">
            <b-form-input id="input-credit-limit-to-sdb-trn" v-model="text" type="text"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-limit-per-transaction-send" label="Credit Limit To SDN TRN"
            label-for="input-limit-per-transaction-send">
            <b-form-input id="input-limit-per-transaction-send" v-model="text" type="text"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-local-currency" label="Local Currency" label-for="input-local-currency">
            <b-form-select id="input-local-currency" v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-mileage-defined" label="Mileage Defined" label-for="input-mileage-defined">
            <b-form-input id="input-mileage-defined" v-model="text" type="text">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-max-payout-amt-per-txn" label="Max Payout Amt per TXN (Cash Pay)"
            label-for="input-max-payout-amt-per-txn">
            <b-form-input id="input-max-payout-amt-per-txn" v-model="text" type="text"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-max-payout-amt-per-txn" label="Max Payout Amt per TXN (AC Deposit)"
            label-for="input-max-payout-amt-per-txn">
            <b-form-input id="input-max-payout-amt-per-txn" v-model="text" type="text"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-partner-settlement-in" label="Partner Settlement In"
            label-for="input-partner-settlement-in">
            <b-form-select id="input-partner-settlement-in" v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-checkbox class="mt-5" id="checkbox-limit-for-a-customer-per-day" v-model="status"
            name="checkbox-limit-for-a-customer-per-day" value="accepted" unchecked-value="not_accepted">
            Limit for a customer per day
          </b-form-checkbox>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-partner-rights" label="Partner Rights" label-for="input-partner-rights">
            <b-form-select id="input-partner-rights" v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-local-time" label="Local Time" label-for="input-local-time">
            <b-form-input id="input-local-time" v-model="text" type="time"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-date-format" label="Date Format" label-for="input-date-format">
            <b-form-input id="input-date-format" v-model="text" type="date"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-risk-levels" label="Risk Levels" label-for="input-risk-levels">
            <b-form-select id="input-risk-levels" v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-tax-type" label="Tax Type" label-for="input-tax-type">
            <b-form-select id="input-tax-type" v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-settlement-date" label="Settlement Date" label-for="input-settlement-date">
            <b-form-input id="input-settlement-date" v-model="text" type="date">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="12" sm="12" lg="12" xl="12" class="mb-4">
          <b-form-group id="input-group-partner-settlement-in" label="Payment Mode Allowed"
            label-for="input-partner-settlement-in">
            <b-row>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Account Deposit to Other Bank
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Home Delivery Manila City
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  CUP Bank Card
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Wallet
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Cash Payment
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Home Delivery Provinces
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  BKASH
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Upay
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Account Deposit
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Other Bank Deposit
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  ROCKET PAY
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Instant Credit
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Home Delivery
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  NEFT
                </b-form-checkbox>
              </b-col>
              <b-col md="4" sm="12" lg="4" xl="4">
                <b-form-checkbox v-model="status" value="accepted" unchecked-value="not_accepted">
                  Mobile Payment Direct Credit
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col md="12" sm="12" lg="12" xl="12" class="mb-4">
          <b-form-group id="input-group-remarks" label="Remarks" label-for="input-remarks">
            <b-form-textarea id="input-remarks" v-model="text" rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col md="12" sm="12" lg="12" xl="12" class="mb-4">
          <b-form-group id="input-group-print-receipt-information" label="Print Receipt Information"
            label-for="input-print-receipt-information">
            <b-form-textarea id="input-print-receipt-information" v-model="text" rows="6"></b-form-textarea>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-fund-collection-day" label="Fund Collection Day"
            label-for="input-fund-collection-day">
            <b-form-select id="input-tax-type" v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

    </b-card>
    <b-card class="mt-3" header="Additional Details">
      <b-row>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-checkbox class="mt-5" id="checkbox-sms-notification-to-sender" v-model="status"
            name="checkbox-sms-notification-to-sender" value="accepted" unchecked-value="not_accepted">
            SMS Notification To Sender
          </b-form-checkbox>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-mobile-format" label="Mobile Format" label-for="input-mobile-format">
            <b-form-input id="input-mobile-format" v-model="text" type="text">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-mobile-digit-min" label="Mobile Digit Min" label-for="input-mobile-digit-min">
            <b-form-input id="input-mobile-digit-min" v-model="text" type="text">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-mobile-digit-max" label="Mobile Digit Max" label-for="input-mobile-digit-max">
            <b-form-input id="input-mobile-digit-max" v-model="text" type="text">
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-country-code" label="Mobile Country Code" label-for="input-country-code">
            <b-form-input id="input-country-code" v-model="text" type="text">
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
          <b-form-checkbox class="mt-5" id="checkbox-is-this-a-pre-funding-partner" v-model="status"
            name="checkbox-is-this-a-pre-funding-partner" value="accepted" unchecked-value="not_accepted">
            Is This a Pre-Funding Partner
          </b-form-checkbox>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-alert-notification"
            label="Alert Notification if Balance Below if Partner is Prepaid Agent"
            label-for="input-alert-notification">
            <b-form-input id="input-alert-notification" v-model="text" type="text"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12" lg="4" xl="4" class="mb-4">
          <b-form-group id="input-group-branch-limit-to-make-payment" label="Branch Limit To make a Payment"
            label-for="input-branch-limit-to-make-payment">
            <b-form-input id="input-branch-limit-to-make-payment" v-model="text" type="text"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <b-row>
      <b-button class="submit-btn">Submit</b-button>
    </b-row>
  </b-container>
</template>


<script>
export default {
  name: 'AddPartner',
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
        partnerId: "",
        partnerType: "",
        partnerTypeOptions: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ],
        businessLicense: "",
        address: "",
        licenseExpiryDate: "",
        city: "",
        country: "",
        phone1: "",
        phone2: "",
        email: "",
        website: "",
        zipCode: "",
        blockThisPartner: false,
        isThisNonIRHPartner: false
      },
      bankAndBranchAccountDetail: {
        calculatePayoutComissionDaily: false,
        doNotAllowSameUserToApprove: false,
        creditLimitToSDNTRN: "",
        localCurrency: "",
        localCurrencyOptins: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ],
        mileageDefined: "",
        maxPayoutAmtPerTXNCashPay: "",
        maxPayoutAmtPerTXNACDeposit: "",
        partnerSettlementIn: "",
        limitForACustomerPerDay: false,
        partnerRights: "",
        localTime: "",
        dateFormat: "",
        riskLevels: "",
        taxType: "",
        taxTypeOptions: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ],
        settlementDate: "",
        paymentMethodAllowed: [],
        paymentMethodAllowedOptions: [
          "Account Despoit to Other Bank"
        ],
        remarks: "",
        printReciptInformtion: "",
        fundCollectionDay: ""

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
        barnchLimitToMakeAPayment: ""
      }
    }
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
</style>