<template>
  <div class="transaction">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar title="KYC" />
      <b-container>
        <b-row align-v="center" align-h="center" class="my-auto">
          <b-col col sm="12" md="12" lg="12" class="mt-5">
            <step-progress
              :current="currentStep"
              :steps="steps"
            ></step-progress>
          </b-col>
        </b-row>
         <!-- ---------------------------Demographics Section  ------------------------------------------->
        <b-row align-h="center my-5">
          <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="danger"
            @dismiss-count-down="countDownChanged"
          >
            {{submitError}}
          </b-alert>
          <b-col col sm="12" md="12" lg="10">
            <!-- <b-form @submit.stop.prevent="onSubmit"> -->
            <b-card :header="$t('kyc.demographics')" header-tag="header" class="mt-2" v-if="currentStep == 1">
              <b-row align-h="center">
                <b-col>
                  <b-form-group
                    :label="$t('kyc.nationality')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-select
                    v-model="user_details.nationality"
                    placeholder="Select Nationality"
                    :options="nationality_options">
                    </b-form-select>
                  </b-form-group>
                  <div v-if="errorNationality" class="floating-placeholder">
                    <span >{{errorNationality}}</span>
                  </div>
                </b-col>
                <b-col>
                  <b-form-group
                    :label="$t('kyc.DOB')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-datepicker
                      id="example-datepicker"
                      v-model="user_details.dob"
                      class="mb-2"
                    ></b-form-datepicker>
                  </b-form-group>
                  <div v-if="errorDOB" class="floating-placeholder">
                    <span >{{errorDOB}}</span>
                  </div>
                </b-col>
                <b-col>
                  <b-form-group
                    :label="$t('kyc.gender')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-select
                    v-model="user_details.gender"
                    placeholder="Select Nationality"
                    :options="gender_options">
                    </b-form-select>
                  </b-form-group>
                  <div v-if="errorGender" class="floating-placeholder">
                    <span >{{errorGender}}</span>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button
                    type="submit"
                    class="float-right mt-4 px-5"
                    variant="primary"
                    @click="onClickDemographics"
                    >{{$t('nextLabel')}}</b-button
                  >
                </b-col>
              </b-row>
            </b-card>
            <!-- </b-form> -->
             <!-- ---------------------------Income Source Section  ------------------------------------------->
            <b-card :header="$t('kyc.incomeSource')" header-tag="header" class="mt-2" v-if="currentStep == 2">
              <b-row align-h="center">
                <b-col>
                  <b-form-group
                    :label="$t('kyc.fundSource')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-dropdown
                      id="input-type"
                      :text="user_details.fund"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in fund_options"
                        :key="option.value"
                        :value="option.value"
                        @click="user_details.fund = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    :label="$t('kyc.occupation')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-dropdown
                      id="input-type"
                      :text="user_details.occupation"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in occupation_options"
                        :key="option.value"
                        :value="option.value"
                        @click="user_details.occupation = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    :label="$t('kyc.employer')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="user_details.employer"
                    ></b-form-input>
                  </b-form-group>
                  <div v-if="employerError" class="floating-placeholder">
                    <span >{{employerError}}</span>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col col sm="12" md="12" lg="6">
                  <b-form-group
                    :label="$t('kyc.incomeRange')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input v-model="user_details.incomeRange"></b-form-input>
                  </b-form-group>
                  <div v-if="submitErrorMessage" class="floating-placeholder">
                    <span >{{submitErrorMessage}}</span>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button
                    class="float-left mt-4 px-5"
                    variant="outline-secondary"
                    @click="onClickBack"
                    >{{$t('backLabel')}}</b-button
                  >
                  <b-button
                    class="float-right mt-4 px-5"
                    variant="primary"
                    @click="onClickNextIncomeSource"
                    >{{$t('nextLabel')}}</b-button
                  >
                </b-col>
              </b-row>
            </b-card>

             <!-- --------------------------- Current Address Section  ------------------------------------------->

            <b-card :header="$t('kyc.address')" header-tag="header" class="mt-2" v-if="currentStep == 3">
              <b-row align-h="center">
                <b-col col sm="12" md="12" lg="12">
                  <b-form-group
                    :label="$t('kyc.addressLinn1')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input v-model="user_details.firstAddressLine"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="12">
                  <b-form-group
                    :label="$t('kyc.addressLinn2')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input v-model="user_details.secondAddressLine"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group
                    :label="$t('kyc.country')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-select
                      v-model="user_details.country"
                      placeholder="Select Country"
                      :options="country_options">
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group
                    :label="$t('kyc.state')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="user_details.state"
                    ></b-form-input>
                  </b-form-group>
                  <div v-if="employerError" class="floating-placeholder">
                    <span >{{employerError}}</span>
                  </div>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group
                    :label="$t('kyc.city')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="user_details.city"
                    ></b-form-input>
                  </b-form-group>
                  <div v-if="submitErrorMessage" class="floating-placeholder">
                    <span >{{submitErrorMessage}}</span>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button
                    class="float-left mt-4 px-5"
                    variant="outline-secondary"
                    @click="onClickBack"
                    >{{$t('backLabel')}}</b-button
                  >
                  <b-button
                    class="float-right mt-4 px-5"
                    variant="primary"
                    @click="onClickNextAddress"
                    >{{$t('nextLabel')}}</b-button
                  >
                </b-col>
              </b-row>
            </b-card>

             <!-- ---------------------------Identity Proof Section  ------------------------------------------->
            <b-card header="$t('kyc.identityProof')" header-tag="header" class="mt-2" v-if="currentStep == 4">
              <b-row align-h="center">
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group
                    :label="$t('kyc.IDProof')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-dropdown
                      id="input-type"
                      :text="user_details.id_proof"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in proof_options"
                        :key="option.value"
                        :value="option.value"
                        @click="user_details.id_proof = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="8">
                  <b-form-group
                    :label="$t('kyc.idNumber')"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="user_details.idNumber"
                    ></b-form-input>
                  </b-form-group>
                  <div v-if="errorMessage" class="floating-placeholder">
                    <span >{{errorMessage}}</span>
                  </div>
                </b-col>
                <b-col col sm="12" md="12" lg="6">
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-center
                      upload-div
                    "
                  >
                    <!-- <h6>Upload ID</h6> -->
                    
                    <img :src="image" class="upload-image"/>
                    <b-button-group class="mx-1">
                      <h6 v-if="IDfileName"> {{IDfileName}}</h6>
                      <h6 class="selfie-image" v-else>{{$t('kyc.uploadSelfieId')}}</h6>
                      <b-button variant="success" v-if="uploadSuccess" class="mr-1"
                        ><b-icon icon="cloud-check-fill"></b-icon
                      ></b-button>
                      <b-button variant="warning" v-else class="mr-1"
                        ><input type="file" @change="onFileChange" class="file-select">
                        <b-icon icon="cloud-upload-fill"></b-icon
                      ></b-button>
                      
                      <b-button variant="light"
                        ><b-icon icon="eye-fill"></b-icon
                      ></b-button>
                    </b-button-group>
                    <!-- <div v-if="errorMessage" class="floating-placeholder">
                      <span >{{errorMessage}}</span>
                    </div> -->
                  </div>
                  <div v-if="errorProofID" class="floating-placeholder">
                    <span >{{errorProofID}}</span>
                  </div>
                </b-col>
                <b-col col sm="12" md="12" lg="6">
                  <div
                    class="
                      d-flex
                      justify-content-between
                      align-items-center
                      upload-div
                    "
                  >
                    <img :src="image" class="upload-image"/>
                    <b-button-group class="mx-1">
                      <h6 v-if="SelfiefileName"> {{SelfiefileName}}</h6>
                      <h6 class="selfie-image" v-else>{{$t('kyc.uploadSelfieId')}}</h6>
                      <b-button variant="success" v-if="uploadSuccess" class="mr-1"
                        ><b-icon icon="cloud-check-fill"></b-icon
                      ></b-button>
                      <b-button variant="warning" v-else class="mr-1"
                        ><input type="file" @change="onSelfiFileChange" class="file-select">
                        <b-icon icon="cloud-upload-fill"></b-icon
                      ></b-button>
                      
                      <b-button variant="light"
                        ><b-icon icon="eye-fill"></b-icon
                      ></b-button>
                    </b-button-group>
                  </div>
                  <div v-if="errorSelfieID" class="floating-placeholder">
                    <span >{{errorSelfieID}}</span>
                  </div>
                </b-col>
                <div v-if="type != 'Business'" class="mx-auto mt-5">
                <b-form-checkbox
                  v-model="facetoface"
                  size="lg"
                  name="check-button"
                  switch
                >
                  {{$t('kyc.faceToFaceKYC')}}
                </b-form-checkbox>
                </div>
              </b-row>
              <b-row>
                <b-col>
                  <b-button
                    class="float-left mt-4 px-5"
                    variant="outline-secondary"
                    @click="onClickBack"
                    >Back</b-button
                  >
                  <b-button
                    variant="primary"
                    @click="$router.push('/')"
                    v-if="type === 'Business' || facetoface"
                    class="float-right mt-4 px-5"
                    >Submit and Schedule Interview</b-button
                  >
                  <b-button
                    variant="primary"
                    @click="onSubmitEkycDetails"
                    v-else
                    class="float-right mt-4 px-5"
                    >
                    <div class="button-loader" v-if="loader">
                      <span class="spinner-border spinner-border-sm"></span>
                    </div>
                    <div v-else>Submit</div>
                      </b-button
                    >
                </b-col>
              </b-row>
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
import NavBarLeft from "@/components/navigations/NavBarLeft.vue";
import StepProgress from "@/components/tools/StepProgress.vue";
//import {mapGetters} from "vuex";

export default {
  name: "Transaction",
  components: {
    NavBar,
    TitleBar,
    NavBarLeft,
    "step-progress": StepProgress,
  },
  computed: {
    //...mapGetters("Common",["user_details"]),
  },
  data() {
    return {
      steps: [
        { text: this.$t('kyc.demographics') },
        { text: this.$t('kyc.incomeSource') },
        { text: this.$t('kyc.currentAddress') },
        { text: this.$t('kyc.identityProof') },
      ],
      currentStep: 1,
      user_details: {
        fund: "Salary",
        dob: "",
        nationality: "",
        gender: "",
        occupation: "Engineer",
        id_proof: "Passport",
        idNumber: '',
        l_name: "Ponneth",
        account_type: "Business",
        employer: '',
        email: "deepuponneth@softdevels.com",
        phone: "1234567894",
        incomeRange: '',
        firstAddressLine: '',
        secondAddressLine: '',
        country: '',
        state: '',
        city: '',
      },
      submitError: '',
      dismissSecs: 5,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      type: "Personal",
      facetoface: false,
      uploadSuccess: false,
      gender_options: [
        {
          text: "Select Gender",
          value: "",
        },
        {
          text: "Male",
          value: "M",
        },
        {
          text: "Female",
          value: "F",
        },
        {
          text: "Others",
          value: "Others",
        },
      ],
      fund_options: [
        {
          text: "Salary",
          value: "Salary",
        },
        {
          text: "Business",
          value: "Business",
        },
      ],
      nationality_options: [
        {
          text: "Select Nationality",
          value: "",
        },
        {
          text: "India",
          value: "IND",
        },
        {
          text: "Malaysia",
          value: "MAL",
        },
        {
          text: "China",
          value: "CH",
        },
      ],
      country_options: [
        {
          text: "Select Country",
          value: "",
        },
        {
          text: "India",
          value: "IND",
        },
        {
          text: "Malaysia",
          value: "MAL",
        },
        {
          text: "China",
          value: "CH",
        },
      ],
      occupation_options: [
        {
          text: "Engineer",
          value: "Engineer",
        },
      ],
      proof_options: [
        {
          text: "Passport",
          value: "Passport",
        },
      ],
      submitErrorMessage: '',
      employerError: '',
      image: '',
      selfieImage: '',
      fileUpload: '',
      selfieFile: '',
      errorMessage: '',
      errorNationality: '',
      errorDOB: '',
      errorGender: '',
      uploadSelfieSuccess: false,
      errorProofID: '',
      errorSelfieID: '',
      IDfileName: '',
      SelfiefileName: '',
      loader: false,
    };
  },
  methods: {
    onClickNext: function () {
      this.currentStep++;
    },
    onClickBack: function () {
      this.currentStep--;
    },
    onClicnNationality(value) {
      this.user_details.nationality = value;
    },
    onClickDemographics() {
      console.log('userDetails', this.user_details);
      if (!this.user_details.nationality || !this.user_details.dob || !this.user_details.gender) {
        this.errorNationality =  'Please select the nationality';
        this.errorDOB = 'Please select the date of birth';
        this.errorGender = 'Please select the gender';
      }
      if (this.user_details.nationality) {
        this.errorNationality = '';
      }
      if (this.user_details.dob) {
        this.errorDOB = '';
      }
      if (this.user_details.gender) {
        this.errorGender = '';
      }
      if (this.user_details.nationality && this.user_details.dob && this.user_details.gender) {
        this.submitErrorMessage = '';
        this.errorNationality = '';
        this.errorDOB = '';
        this.errorGender = '';
        this.currentStep++;
      }
    },
    onClickNextIncomeSource() {
      if (!this.user_details.employer || !this.user_details.incomeRange) {
        this.employerError = 'Please enter the employer details';
        this.submitErrorMessage =  'Please enter the income range'
      }
      if (this.user_details.employer) {
        this.employerError = '';
      }
      if (this.user_details.incomeRange) {
        this.submitErrorMessage = ''
      }
      if (this.user_details.employer && this.user_details.incomeRange) {
        this.currentStep++;
      }
    },
    onClickNextAddress() {
      if (!this.user_details.state || !this.user_details.city) {
        this.employerError = 'Please enter the state';
        this.submitErrorMessage =  'Please enter city'
      }
       if (this.user_details.state) {
        this.employerError = '';
      }
      if (this.user_details.city) {
        this.submitErrorMessage = ''
      }
      if (this.user_details.state && this.user_details.city) {
        this.currentStep++;
      }
    },
    async onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
      return;
      this.IDfileName = files[0].name;
      const fileBase64 = await this.getBase64(files[0]);
      const extractBase64 = fileBase64.split(',').reverse()[0];
      this.fileUpload = extractBase64
    },
    async onSelfiFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length)
      return;
      this.SelfiefileName = files[0].name;
      const selfiBase64 = await this.getBase64(files[0]);
      const extractBase64 = selfiBase64.split(',').reverse()[0];
      this.selfieFile = extractBase64;
    },
    async getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
      });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    async onSubmitEkycDetails() {
      if (!this.user_details.idNumber || !this.fileUpload || !this.selfieFile) {
        this.errorMessage = 'Please enter the ID Number';
        this.errorProofID = 'Please upload the proof ID';
        this.errorSelfieID = 'Please upload the selfi proof ID';
      }
      if (this.user_details.idNumber) {
        this.errorMessage = '';
      }
      if (this.fileUpload) {
        this.errorProofID = '';
      }
      if (this.selfieFile) {
        this.errorSelfieID = '';
      }
      if (this.user_details.idNumber) {
        const kycData = {
          nationality: this.user_details.nationality,
          dob: this.user_details.dob,
          gender: this.user_details.gender,
          fund_source: this.user_details.fund,
          occupation: this.user_details.occupation,
          employer: this.user_details.employer,
          income_range: this.user_details.incomeRange,
          address: this.user_details.firstAddressLine + this.user_details.secondAddressLine,
          country: this.user_details.country,
          state: this.user_details.state,
          city: this.user_details.city,
          id_proof: this.user_details.id_proof,
          id_number: this.user_details.idNumber,
          issue_date: '2022-01-01',
          expiry_date: '2025-01-01',
          kyc_id_base64string: this.fileUpload,
          kyc_face_image_base64string: this.selfieFile
        }
        console.log('kyc', kycData);
        try {
            console.log('insdie');
            this.loader = true;
            const responseData = await this.$store.dispatch('Authentication/ekycUpdate', kycData);
            console.log('data', responseData);
            this.dismissCountDown = this.dismissSecs
            this.submitError = 'Please recharge the balanace';
            // if (responseData && responseData.status === 200) {
            //   this.showModal = true;
              this.loader = false
            //   this.errorOnSubmit = false;
            //   this.submitErrorMessage = '';
            //   this.currentStep++;
            // } else {
            //   this.countDownAlert = this.dismissSecs
            //   this.loader = false;
            //   this.showModal = false;
            // }
          } catch (error) {
            this.loader = false
            this.showModal = false;
          }
      } 
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
::v-deep ul {
  list-style-type: none !important;
}
::v-deep .btn-light {
  border: 1px solid #d3d3d3 !important;
}
.upload-div {
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #d3d3d3 !important;
}
::v-deep .custom-control-input {
  &:checked ~ .custom-control-label {
    &::before {
      color: #fff;
      border-color: $green !important;
      background-color: $green !important;
    }
  }
}
::v-deep label {
  margin-bottom: 0 !important;
  color: $lightslategrey;
}
.floating-placeholder {
  color: red;
  font-size: 14px;
  text-align: -webkit-left;
}
svg.bi-cloud-upload-fill.b-icon.bi {
  position: absolute;
  top: 15px;
  left: 15px;
}
.mx-1.btn-group {
    height: 46px;
}
.file-select {
  top: 1px;
  height: 57px !important;
  z-index: 333;
  position: absolute;
  left: -1px;
  opacity: 0;
}
button.btn.mr-1.btn-warning {
  width: 51px;
  margin-right: 5px;
}
.selfie-image {
  margin-top: 10px;
  margin-right: 122px;
}
</style>
