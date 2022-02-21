<template>
  <div class="business_data">
    <NavBar />
    <div class="page-body">
      <TitleBar title="Business Details" />
      <b-container>
        <b-row align-h="center my-5">
          <b-col>
            <b-row>
              <b-col col sm="12" md="12" lg="12">
                <b-form-group
                  label="Registered Business Name"
                  label-for="input-reg-name"
                >
                  <b-form-input
                    id="input-reg-name"
                    v-model="business_data.registered_name"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col col sm="12" md="12" lg="12">
                <b-form-group
                  label="Business Trade Name"
                  label-for="input-trade-name"
                >
                  <b-form-input
                    id="input-trade-name"
                    v-model="business_data.trade_name"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col col sm="12" md="12" lg="6">
                <b-form-group
                  label="Business Registration Number"
                  label-for="registration-number"
                >
                  <b-form-input
                    id="registration-number"
                    v-model="business_data.registration_number"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col col sm="12" md="12" lg="4">
                <b-form-group label="Source of Funds" label-for="input-type">
                  <b-dropdown
                    id="input-type"
                    :text="business_data.fund"
                    class="wd-100p"
                    variant="light"
                  >
                    <b-dropdown-item
                      v-for="option in fund_options"
                      :key="option.value"
                      :value="option.value"
                      @click="business_data.fund = option.value"
                    >
                      {{ option.text }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-form-group>
              </b-col>
              <b-col col sm="12" md="12" lg="4">
                <b-form-group
                  label="Company Entity Type"
                  label-for="input-type"
                >
                  <b-dropdown
                    id="input-type"
                    :text="business_data.entity"
                    class="wd-100p"
                    variant="light"
                  >
                    <b-dropdown-item
                      v-for="option in entity_options"
                      :key="option.value"
                      :value="option.value"
                      @click="business_data.entity = option.value"
                    >
                      {{ option.text }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-form-group>
              </b-col>
              <b-col col sm="12" md="12" lg="4">
                <b-form-group
                  label="Nature of Business"
                  label-for="input-nature"
                >
                  <b-dropdown
                    id="input-nature"
                    :text="business_data.nature"
                    class="wd-100p"
                    variant="light"
                  >
                    <b-dropdown-item
                      v-for="option in nature_options"
                      :key="option.value"
                      :value="option.value"
                      @click="business_data.nature = option.value"
                    >
                      {{ option.text }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col col sm="12" md="12" lg="4">
                <b-form-group
                  label="Product/Service Type"
                  label-for="input-services"
                >
                  <b-dropdown
                    id="input-services"
                    :text="business_data.services"
                    class="wd-100p"
                    variant="light"
                  >
                    <b-dropdown-item
                      v-for="option in service_options"
                      :key="option.value"
                      :value="option.value"
                      @click="business_data.services = option.value"
                    >
                      {{ option.text }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-form-group>
              </b-col>
              <b-col col sm="12" md="12" lg="4">
                <b-form-group
                  label="Annual Net Revenue"
                  label-for="input-revenue"
                >
                  <b-dropdown
                    id="input-revenue"
                    :text="business_data.revenue"
                    class="wd-100p"
                    variant="light"
                  >
                    <b-dropdown-item
                      v-for="option in revenue_options"
                      :key="option.value"
                      :value="option.value"
                      @click="business_data.revenue = option.value"
                    >
                      {{ option.text }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-form-group>
              </b-col>
              <b-col col sm="12" md="12" lg="4">
                <b-form-group
                  label="Date Of Incorporation"
                  label-for="input-doi"
                >
                  <b-form-datepicker
                    id="input-doi"
                    v-model="business_data.DOI"
                    class="mb-2"
                  ></b-form-datepicker>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col col sm="12" md="12" lg="4">
                <b-form-group
                  label="Regulatory License Number"
                  label-for="input-license"
                >
                  <b-form-input
                    id="input-license"
                    v-model="business_data.license"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col col sm="12" md="12" lg="4">
                <b-form-group
                  label="Intended use of account"
                  label-for="input-purpose"
                >
                  <b-dropdown
                    id="input-purpose"
                    :text="business_data.purpose"
                    class="wd-100p"
                    variant="light"
                  >
                    <b-dropdown-item
                      v-for="option in purpose_options"
                      :key="option.value"
                      :value="option.value"
                      @click="business_data.purpose = option.value"
                    >
                      {{ option.text }}
                    </b-dropdown-item>
                  </b-dropdown>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col col sm="12" md="12" lg="12">
                <b-form-group label="Website URL" label-for="input-website">
                  <b-form-input
                    id="input-website"
                    v-model="business_data.website"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-card
              header="Registered Business Address"
              header-tag="header"
              class="mt-2"
            >
              <b-row>
                <b-col col sm="12" md="12" lg="12">
                  <b-form-group
                    label="Address Line 1"
                    label-for="input-address-1"
                  >
                    <b-form-input
                      id="input-address-1"
                      v-model="business_data.address1"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="12">
                  <b-form-group
                    label="Address Line 2"
                    label-for="input-address-2"
                  >
                    <b-form-input
                      id="input-address-2"
                      v-model="business_data.address2"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group label="Country" label-for="input-country">
                    <b-form-input
                      id="input-country"
                      v-model="business_data.country"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group label="State" label-for="input-state">
                    <b-form-input
                      id="input-state"
                      v-model="business_data.state"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group label="City" label-for="input-city">
                    <b-form-input
                      id="input-city"
                      v-model="business_data.city"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
            <b-card
              header="Operational Business Address"
              header-tag="header"
              class="mt-2"
            >
              <b-row>
                <b-col col sm="12" md="12" lg="12">
                  <b-form-group
                    label="Address Line 1"
                    label-for="input-address-1"
                  >
                    <b-form-input
                      id="input-address-1"
                      v-model="business_data.address1"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="12">
                  <b-form-group
                    label="Address Line 2"
                    label-for="input-address-2"
                  >
                    <b-form-input
                      id="input-address-2"
                      v-model="business_data.address2"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group label="Country" label-for="input-country">
                    <b-form-input
                      id="input-country"
                      v-model="business_data.country"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group label="State" label-for="input-state">
                    <b-form-input
                      id="input-state"
                      v-model="business_data.state"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col col sm="12" md="12" lg="4">
                  <b-form-group label="City" label-for="input-city">
                    <b-form-input
                      id="input-city"
                      v-model="business_data.city"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-card>
            <b-row align-h="center">
              <b-col col sm="12" md="12" lg="6" class="text-center">
                <b-button-group>
                  <b-button
                    variant="primary"
                    @click="$router.push('/')"
                    class="mt-5 mr-1 px-5"
                    >SAVE</b-button
                  >
                  <b-button
                    variant="primary"
                    @click="$router.push('/')"
                    class="btn-primary mt-5 ml-auto px-5"
                    >Save & Continue</b-button
                  >
                </b-button-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navigations/NavBar.vue";
import TitleBar from "@/components/navigations/TitleBar.vue";

export default {
  name: "BusinessDetails",
  components: {
    NavBar,
    TitleBar,
  },
  data() {
    return {
      temp_account: "",
      business_data: {
        registered_name: "",
        trade_name: "",
        registration_number: "",
        fund: "Profit",
        entity: "Private Limited",
        nature: "Fashion & Textile",
        services: "Designer Clothing",
        revenue: "0 to 2 Lakh",
        DOI: "10-01-2022",
        license: "123456789",
        purpose: "Receive payments",
        website: "",
      },
      fund_options: [
        {
          text: "Profit",
          value: "Profit",
        },
      ],
      entity_options: [
        {
          text: "Private Limited",
          value: "Private Limited",
        },
      ],
      nature_options: [
        {
          text: "Fashion & Textile",
          value: "Fashion & Textile",
        },
      ],
      service_options: [
        {
          text: "Designer Clothing",
          value: "Designer Clothing",
        },
      ],
      purpose_options: [
        {
          text: "Receive Payments",
          value: "Receive Payments",
        },
      ],
      revenue_options: [
        {
          text: "0 to 2 Lakh",
          value: "0 to 2 Lakh",
        },
        {
          text: "2 to 5 Lakh",
          value: "2 to 5 Lakh",
        },
        {
          text: "5 to 10 Lakh",
          value: "5 to 10 Lakh",
        },
        {
          text: "10 Lakh above",
          value: "10 Lakh above",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
::v-deep .btn-light {
  border: 1px solid #d3d3d3 !important;
}
</style>
