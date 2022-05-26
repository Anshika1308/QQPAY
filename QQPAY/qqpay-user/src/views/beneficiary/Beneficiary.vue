<template>
  <div class="beneficiary">
    <NavBar />
    <div class="page-body">
      <TitleBar :title="$t('beneficiary.addBeneficiary')" />
      <b-container>
        <b-row align-v="center" align-h="center" class="mt-5">
          <b-col col sm="12" md="12" lg="12">
            <step-progress
              :current="currentStep"
              :steps="steps"
            ></step-progress>
          </b-col>
        </b-row>
        <b-row align-h="center" class="my-5">
          <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="danger"
            @dismiss-count-down="countDownChanged"
          >
            {{submitError}}
            </b-alert>
          <b-col col sm="12" md="12" lg="8">
            <b-card
              v-if="currentStep == 1"
              class="card-style"
              :title="$t('beneficiary.kindOfBenficiary')"
            >
              <b-button-group size="lg">
                <b-button
                  pressed.sync="false"
                  variant="light"
                  size="lg"
                  class="px-5 py-3"
                  @click="onClickIndividualAccount"
                >
                  <b-icon
                    icon="person-circle"
                    style="width: 80px; height: 80px; color: #b4b4b4"
                  ></b-icon>
                  <br />
                  {{$t('beneficiary.individual')}}
                  <br />
                  <small
                    >{{$t('beneficiary.individualSubHeader')}}.</small
                  >
                </b-button>
                <b-button
                  pressed.sync="false"
                  variant="light"
                  size="lg"
                  class="px-5 py-3"
                  @click="onClickBusinessAccount"
                >
                  <b-icon
                    icon="briefcase-fill"
                    style="width: 80px; height: 80px; color: #b4b4b4"
                  ></b-icon>
                  <br />
                  {{$t('beneficiary.business')}}
                  <br />
                  <small>{{$t('beneficiary.businessSubHeader')}}.</small>
                </b-button>
              </b-button-group>
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >{{$t('beneficiary.next')}}</b-button
              >
            </b-card>
            <!-- ---------------------------Personal Detail Section  ------------------------------------------->
            <b-card
              v-if="currentStep == 2"
              class="card-style"
              :title="$t('beneficiary.letusSomeBasic')"
            >
              <b-form-group
                :label="$t('beneficiary.fullName')"
                label-for="input-name"
              >
                <b-form-input
                  id="input-name"
                  v-model="beneficiary.name"
                ></b-form-input>
              </b-form-group>
              <div v-if="errorMessage" class="floating-placeholder-name">
                <span>{{errorMessage}}</span>
              </div>
              <b-row>
                <b-col
                  ><b-form-group
                    :label="$t('beneficiary.country')"
                    label-for="input-country"
                  >
                    <b-dropdown
                      id="input-country"
                      :text="beneficiary.country"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in country_options"
                        :key="option.value"
                        :value="option.value"
                        @click="beneficiary.country = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group></b-col
                >
                <b-col
                  ><b-form-group
                    :label="$t('beneficiary.relationship')"
                    label-for="input-relation"
                  >
                    <b-dropdown
                      id="input-relation"
                      :text="beneficiary.relationship"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in relation_options"
                        :key="option.value"
                        :value="option.value"
                        @click="beneficiary.relationship = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group></b-col
                >
              </b-row>
              <b-row>
                <b-col>
                  <b-form-group
                    :label="$t('beneficiary.phoneNumber')"
                    :description="$t('beneficiary.optional')"
                    label-for="input-phone"
                  >
                    <b-form-input
                      id="input-phone"
                      type="number"
                      v-model="beneficiary.phone"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    :label="$t('beneficiary.emailAddress')"
                    :description="$t('beneficiary.optional')"
                    label-for="input-email"
                  >
                    <b-form-input
                      id="input-email"
                      type="email"
                      v-model="beneficiary.email"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{$t('backLabel')}}</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNextSecondSection"
                >{{$t('next')}}</b-button
              >
            </b-card>
            <!-- ---------------------------Address Section  ------------------------------------------->
            <b-card
              v-if="currentStep == 3"
              class="card-style"
              :title="$t('beneficiary.enterAddressBeneficiary')"
            >
              <b-form-group
                :label="$t('beneficiary.address')"
                :description="$t('beneficiary.optional')"
                label-for="input-address"
              >
                <b-form-textarea
                  rows="3"
                  max-rows="6"
                  id="input-address"
                  v-model="beneficiary.address"
                ></b-form-textarea>
              </b-form-group>

              <b-row>
                <b-col>
                  <b-form-group :label="$t('beneficiary.state')" label-for="input-state">
                    <b-dropdown
                      id="input-state"
                      :text="beneficiary.state"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in state_options"
                        :key="option.value"
                        :value="option.value"
                        @click="beneficiary.state = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group :label="$t('beneficiary.city')" label-for="input-city">
                    <b-dropdown
                      id="input-city"
                      :text="beneficiary.city"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in city_options"
                        :key="option.value"
                        :value="option.value"
                        @click="beneficiary.city = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{$t('backLabel')}}</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >{{$t('next')}}</b-button
              >
            </b-card>

          <!-- ---------------------------Account Section  ------------------------------------------->
            <b-card
              v-if="currentStep == 4"
              class="card-style"
              :title="$t('beneficiary.bankAccuntDetails')"
            >
              <b-form-group :label="$t('beneficiary.bankAccountNumber')" label-for="input-acc">
                <b-form-input
                  id="input-acc"
                  type="password"
                  v-model="beneficiary.account"
                ></b-form-input>
              </b-form-group>
              <div v-if="errorAccount" class="floating-placeholder-name">
                <span>{{errorAccount}}</span>
              </div>
              <b-form-group
                :label="$t('beneficiary.renterBankAccount')"
                label-for="input-acc-re"
              >
                <b-form-input
                  id="input-acc-re"
                  type="number"
                  v-model="beneficiary.confirmAccount"
                ></b-form-input>
              </b-form-group>
              <div v-if="errorConfirm" class="floating-placeholder-name">
                <span>{{errorConfirm}}</span>
              </div>
              <b-form-group :label="$t('beneficiary.swiftCode')" label-for="input-ifsc">
                <b-form-input
                  id="input-ifsc"
                  v-model="beneficiary.ifsc"
                ></b-form-input>
              </b-form-group>
              <div v-if="errorSwiftCode" class="floating-placeholder-name">
                <span>{{errorSwiftCode}}</span>
              </div>
              <div v-if="errorMessage" class="floating-placeholder-name">
                <span>{{errorMessage}}</span>
              </div>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{$t('backLabel')}}</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onCreateBeneficiary"
                >
                <div class="button-loader" v-if="loader">
                  <span class="spinner-border spinner-border-sm"></span>
                </div>
                <div v-else>{{$t('beneficiary.createBeneficiary')}}</div>
                </b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";
import StepProgress from "@/components/tools/StepProgress.vue";

export default {
  name: "Beneficiary",
  components: {
    "step-progress": StepProgress,
    NavBar,
    TitleBar,
  },
  data() {
    return {
      steps: [
        { text: this.$t('beneficiary.accountType') },
        { text: this.$t('beneficiary.basicDetails') },
        { text: this.$t('beneficiary.address') },
        { text: this.$t('beneficiary.bankDetails') },
      ],
      currentStep: 1,
      loader: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      beneficiary: {
        type: "Business",
        country: "India",
        name: "",
        relationship: "Friend",
        phone: "",
        email: "",
        address: "",
        state: "Karnataka",
        city: "Bangalore",
        account: "",
        ifsc: "",
        confirmAccount: "",
      },
      errorAccount: '',
      errorConfirm: '',
      errorSwiftCode: '',
      fieldInputBlank: '',
      errorMessage: '',
      submitError: '',
      type_options: [
        {
          text: "Business",
          value: "Business",
        },
        {
          text: "Individual",
          value: "Individual",
        },
      ],
      country_options: [
        {
          text: "India",
          value: "India",
        },
        {
          text: "Malaysia",
          value: "Malaysia",
        },
      ],
      relation_options: [
        {
          text: "Friend",
          value: "Friend",
        },
        {
          text: "Family",
          value: "Family",
        },
      ],
      state_options: [
        {
          text: "Karnataka",
          value: "Karnataka",
        },
        {
          text: "Andrapradesh",
          value: "Andrapradesh",
        },
      ],
      city_options: [
        {
          text: "Bangalore",
          value: "Bangalore",
        },
        {
          text: "Chennai",
          value: "Chennai",
        },
      ],
    };
  },
  methods: {
    onClickNext: function () {
      this.currentStep++;
    },
    onClickBack: function () {
      this.currentStep--;
    },
    onClickBusinessAccount() {
      this.beneficiary.type = 'BUS'
    },
    onClickIndividualAccount() {
      this.beneficiary.type = 'PER'
    },
    onClickNextSecondSection() {
      if (!this.beneficiary.name) {
        this.errorMessage = 'Please enter the full name';
      } else {
        this.currentStep++;
        this.errorMessage = '';
      }
    }, 
    async onCreateBeneficiary() {
      if (!this.beneficiary.account || !this.beneficiary.confirmAccount || !this.beneficiary.ifsc) {
        this.errorMessage = '',
        this.confirmAccount = '';
        this.errorSwiftCode = '';
        this.errorAccount = 'Please enter the account number it can not be empty';
        this.errorConfirm = 'Please enter the confirm account number it can not be empty';
        this.errorSwiftCode = 'Please enter the SWIFT code of account it can not be empty';
      }
      if (this.beneficiary.account) {
        this.errorAccount = '';
      }
      if (this.beneficiary.confirmAccount) {
          this.errorConfirm = '';
      }
      if (this.beneficiary.ifsc) {
        this.errorSwiftCode = '';
      }
      if (this.beneficiary.account && this.beneficiary.confirmAccount && this.beneficiary.ifsc) {
        if (this.beneficiary.account !== this.beneficiary.confirmAccount) {
          this.errorSwiftCode = '',
          this.errorAccount = '';
          this.confirmAccount = '';
          this.errorMessage = 'Account and Confirm Account do not match please enter the correct number';
        } else {
          try {
            this.loader = true;
            const remiteeData = {
              Remittee_name: this.beneficiary.name,
              Title: "",
              first_name: "",
              middle_name: "",
              last_name: "",
              gender: "",
              nationality_cd: "",
              birth_cntry: this.beneficiary.country,
              Remittee_occup: this.beneficiary.type,
              occupation_text: "",
              address: this.beneficiary.address,
              phone_no: this.beneficiary.phone,
              Altr_Phone_no: "",
              email_id: this.beneficiary.email,
              Remittee_dob: "",
              State_Code: 0,
              district_Code: 0,
              city_Code: 0,
              Remittee_city: this.beneficiary.city,
              Remittee_state: this.beneficiary.state,
              Country_code: "",
              postal_cd: "",
              is_internal_staff: "",
              relation_with_Remitter_cd: "",
              relation_with_Remitter_others: this.beneficiary.relationship,
              pay_crncy_cd: "MYR",
              paying_cntry_cd: "IND",
              payment_mode_cd: "FPX",
              bank_ac_no: this.beneficiary.account,
              bank_ac_type: "",
              bank_branch_address: "",
              bank_branch_cd: "",
              bank_cd: "",
              iban_no: "",
              swift_no: this.beneficiary.ifsc,
              bic_cd: "",
              registration_type_cd: "",
              created_on: "2022-04-20T06:38:06.943107",
              modified_on: "2022-04-20T06:38:06.943114",
              created_by: "",
              modified_by: "",
              creation_parent_agent_cd: "",
              mod_parent_agent_cd: "",
              id_card_type_cd: 0,
              id_card_type_no: "",
              id_card_type_exp_date: "2022-04-20",
              parent_pay_agent_cd: "",
              parent_pay_sub_agent_cd: "",
              is_negativelisted: false,
              negative_match_criteria: "",
              del_flag: false,
              IsActive: false,
              IsResident: false
            }
            this.loader = true;
            const responseData = await this.$store.dispatch('Remittee/createRemitte', remiteeData);
            if (responseData && responseData.status === 200) {
              this.loader = false
              this.submitErrorMessage = '';
              this.submitError = '';
              this.$router.push({name: 'KYC'})
            }else if (responseData && responseData.status === 401) {
              this.loader = false
              this.errorOnSubmit = false;
              this.submitError = 'Please provde the correct beneficiary details';
            } else {
              this.submitError = 'User is not authorised please login the user';
              this.dismissCountDown = this.dismissSecs
              this.loader = false;
            }
          } catch (error) {
            this.loader = false
            this.submitError = 'User is not authorised';
          }
        }
        console.log('in')
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
::v-deep ul {
  list-style-type: none !important;
}
::v-deep h4 {
  color: $txt;
  text-align: center;
}
.btn-light {
  font-weight: bold;
  color: $dimgrey;
  background: $white;
  margin: 0 5px;
  &:not(:disabled) {
    &:not(.disabled).active {
      color: $secondary;
    }
    &:not(.disabled) {
      &:active {
        color: $secondary;
      }
    }
  }
  &:hover {
      border: 1px solid $txt !important;
      color: $dimgrey;
      background: $white;
  }
}
.card {
  border: none;
}
::v-deep label {
  color: $lightslategrey !important;
  margin-bottom: 0 !important;
}
::v-deep .btn-light {
  border: 1px solid $lightgrey !important;
}
.floating-placeholder-name {
  color: red;
  margin-top: -12px;
  font-size: 14px;
  text-align: -webkit-left;
}
</style>
