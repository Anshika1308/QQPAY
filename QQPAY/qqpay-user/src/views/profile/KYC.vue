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
        <b-row align-h="center my-5">
          <b-col col sm="12" md="12" lg="10">
            <b-card header="Demographics" header-tag="header" class="mt-2" v-if="currentStep == 1">
              <b-row align-h="center">
                <b-col>
                  <b-form-group
                    label="Nationality"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-dropdown
                      id="input-type"
                      :text="user_details.nationality"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in nationality_options"
                        :key="option.value"
                        :value="option.value"
                        @click="user_details.country = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    label="Date of Birth"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-datepicker
                      id="example-datepicker"
                      v-model="user_details.dob"
                      class="mb-2"
                    ></b-form-datepicker>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    label="Gender"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-dropdown
                      id="input-type"
                      :text="user_details.gender"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in gender_options"
                        :key="option.value"
                        :value="option.value"
                        @click="user_details.gender = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-button
                    class="float-right mt-4 px-5"
                    variant="primary"
                    @click="onClickNext"
                    >Next</b-button
                  >
                </b-col>
              </b-row>
            </b-card>

            <b-card header="Income Source" header-tag="header" class="mt-2" v-if="currentStep == 2">
              <b-row align-h="center">
                <b-col>
                  <b-form-group
                    label="Fund Source"
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
                    label="Occupation"
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
                    label="Employer"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="user_details.employer"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col col sm="12" md="12" lg="6">
                  <b-form-group
                    label="Income Range"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input v-model="user_details.range"></b-form-input>
                  </b-form-group>
                </b-col>
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
                    class="float-right mt-4 px-5"
                    variant="primary"
                    @click="onClickNext"
                    >Next</b-button
                  >
                </b-col>
              </b-row>
            </b-card>

            <b-card header="Address" header-tag="header" class="mt-2" v-if="currentStep == 3">
              <b-row align-h="center">
                <b-col col sm="12" md="12" lg="12">
                  <b-form-group
                    label="Address Line1"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input v-model="user_details.range"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="12">
                  <b-form-group
                    label="Address Line2"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input v-model="user_details.range"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group
                    label="Country"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-dropdown
                      id="input-type"
                      :text="user_details.nationality"
                      class="wd-100p"
                      variant="light"
                    >
                      <b-dropdown-item
                        v-for="option in nationality_options"
                        :key="option.value"
                        :value="option.value"
                        @click="user_details.country = option.value"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group
                    label="State"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="user_details.employer"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group
                    label="City"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="user_details.employer"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
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
                    class="float-right mt-4 px-5"
                    variant="primary"
                    @click="onClickNext"
                    >Next</b-button
                  >
                </b-col>
              </b-row>
            </b-card>

            <b-card header="Identity Proof" header-tag="header" class="mt-2" v-if="currentStep == 4">
              <b-row align-h="center">
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group
                    label="ID Proof"
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
                    label="ID Number"
                    label-for="input-type"
                    class="mt-1"
                  >
                    <b-form-input
                      v-model="user_details.employer"
                    ></b-form-input>
                  </b-form-group>
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
                    <h6>Upload ID</h6>
                    <b-button-group class="mx-1">
                      <b-button variant="success" v-if="true" class="mr-1"
                        ><b-icon icon="cloud-check-fill"></b-icon
                      ></b-button>
                      <b-button variant="warning" v-else class="mr-1"
                        ><b-icon icon="cloud-upload-fill"></b-icon
                      ></b-button>
                      <b-button variant="light"
                        ><b-icon icon="eye-fill"></b-icon
                      ></b-button>
                    </b-button-group>
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
                    <h6>Upload Selfie with ID</h6>
                    <b-button-group class="mx-1">
                      <b-button variant="success" v-if="false" class="mr-1"
                        ><b-icon icon="cloud-check-fill"></b-icon
                      ></b-button>
                      <b-button variant="warning" v-else class="mr-1"
                        ><b-icon icon="cloud-upload-fill"></b-icon
                      ></b-button>
                      <b-button variant="light"
                        ><b-icon icon="eye-fill"></b-icon
                      ></b-button>
                    </b-button-group>
                  </div>
                </b-col>
                <div v-if="type != 'Business'" class="mx-auto mt-5">
                <b-form-checkbox
                  v-model="facetoface"
                  size="lg"
                  name="check-button"
                  switch
                >
                  Face to Face KYC
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
                    @click="$router.push('/')"
                    v-else
                    class="float-right mt-4 px-5"
                    >Submit</b-button
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
  methods: {
    onClickNext: function () {
      this.currentStep++;
    },
    onClickBack: function () {
      this.currentStep--;
    },
  },
  data() {
    return {
      steps: [
        { text: "Demographics" },
        { text: "Income Source" },
        { text: "Current Address" },
        { text: "Identity Proof" },
      ],
      currentStep: 1,
      user_details: {
        fund: "Salary",
        dob: "18-10-1996",
        nationality: "Malaysia",
        gender: "Male",
        occupation: "Engineer",
        id_proof: "Passport",
        l_name: "Ponneth",
        account_type: "Business",

        email: "deepuponneth@softdevels.com",
        phone: "1234567894",
      },
      type: "Personal",
      facetoface: false,
      gender_options: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
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
          text: "Malaysia",
          value: "Malaysia",
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
    };
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
</style>
