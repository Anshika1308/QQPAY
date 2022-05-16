<template>
  <div class="transaction">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar :title="$t('fundTransfers.fundTransfer')" />
      <b-container>
        <b-row align-v="center" align-h="center" class="mt-5">
          <b-col col sm="12" md="12" lg="12">
            <step-progress
              :current="currentStep"
              :steps="steps"
            ></step-progress>
          </b-col>
        </b-row>
        <b-row align-h="center my-5">
          <b-col col sm="12" md="12" lg="8">
            <div v-if="currentStep == 1">
              <h4>{{ $t("fundTransfers.howMuchTransfer") }}</h4>
              <b-input-group size="lg" class="mt-3">
                <b-form-input
                  placeholder="You Send"
                  v-model="transaction_details.details.source_amount"
                  class="converted"
                ></b-form-input>
                <template #append>
                  <b-dropdown
                    :text="transaction_details.details.source_country"
                    right
                    variant="primary"
                  >
                    <b-dropdown-item
                      v-for="option in country_options"
                      :key="option.value"
                      :value="option.value"
                      @click="
                        transaction_details.details.source_country =
                          option.value
                      "
                    >
                      {{ option.text }}
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-input-group>
              <b-list-group flush>
                <b-list-group-item href="#">
                  <b-row align-v="end">
                    <div class="operations minus">-</div>
                    <b-col cols="12">
                      <b-form-group
                        label-cols-sm="12"
                        label-cols-lg="3"
                        content-cols-sm="12"
                        content-cols-lg="4"
                        :label="$t('fundTransfers.deliveryMethod')"
                        label-for="input-relation"
                        label-size="sm"
                      >
                        <b-dropdown
                          id="input-relation"
                          :text="transaction_details.details.delivery"
                          variant="light"
                          label-size="sm"
                        >
                          <b-dropdown-item
                            v-for="option in delivery_options"
                            :key="option.value"
                            :value="option.value"
                            @click="
                              transaction_details.details.delivery =
                                option.value
                            "
                            size="sm"
                          >
                            {{ option.text }}
                          </b-dropdown-item>
                        </b-dropdown>
                      </b-form-group>
                      <b-form-group
                        label-cols-sm="12"
                        label-cols-lg="3"
                        content-cols-sm="12"
                        content-cols-lg="4"
                        label="1,822.75 INR"
                        label-size="sm"
                      >
                        <small>{{ $t("fundTransfers.ourFee") }}</small>
                      </b-form-group>
                      <b-form-group
                        label-cols-sm="12"
                        label-cols-lg="3"
                        content-cols-sm="12"
                        content-cols-lg="4"
                        label="1,822.75 INR"
                        label-size="sm"
                      >
                        <small>{{ $t("fundTransfers.totalFee") }}</small>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-list-group-item>
                <b-list-group-item href="#">
                  <b-row align-v="end">
                    <div class="operations operation-padding">=</div>
                    <b-col cols="12">
                      <b-form-group
                        label-cols-sm="12"
                        label-cols-lg="3"
                        content-cols-sm="12"
                        content-cols-lg="4"
                        label="98,177.25 INR"
                        label-size="sm"
                      >
                        <small>{{ $t("fundTransfers.amountConvert") }}</small>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-list-group-item>
                <b-list-group-item href="#">
                  <b-row align-v="end">
                    <div class="operations operation-padding">&#xf7;</div>
                    <b-col cols="12">
                      <b-row>
                        <b-col cols="3">
                          <small class="converted">74.6497</small>&nbsp;&nbsp;<b
                            ><b-icon
                              icon="graph-up"
                              animation="fade"
                              style="color: green"
                            ></b-icon
                          ></b>
                        </b-col>
                        <b-col cols="4">
                          <small style="margin-left: -5px">{{
                            $t("fundTransfers.guarantteRate")
                          }}</small>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-list-group-item>
              </b-list-group>
              <b-input-group size="lg">
                <b-form-input
                  placeholder="They Receive"
                  v-model="transaction_details.details.target_amount"
                  class="converted"
                ></b-form-input>
                <template #append>
                  <b-dropdown
                    :text="transaction_details.details.target_country"
                    right
                    variant="primary"
                  >
                    <b-dropdown-item
                      v-for="option in country_options"
                      :key="option.value"
                      :value="option.value"
                      @click="
                        transaction_details.details.target_country =
                          option.value
                      "
                    >
                      {{ option.text }}
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-input-group>
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >{{ $t("next") }}</b-button
              >
            </div>
            <div v-if="currentStep == 2">
              <h4>{{ $t("fundTransfers.isThisPersonalTransaction") }}</h4>
              <b-button-group size="lg">
                <b-button
                  pressed.sync="false"
                  variant="light"
                  size="lg"
                  class="px-5 py-3"
                  @click="notOnBehalf"
                >
                  <b-icon
                    icon="person"
                    style="width: 80px; height: 80px; color: #b4b4b4"
                  ></b-icon>
                  <br />
                  {{ $t("fundTransfers.myAccount") }}
                  <br />
                  <small>{{ $t("fundTransfers.payingFromOwnAccount") }}.</small>
                </b-button>
                <b-button
                  pressed.sync="false"
                  variant="light"
                  size="lg"
                  class="px-5 py-3"
                  @click="onBehalf"
                >
                  <b-icon
                    icon="person-bounding-box"
                    style="width: 80px; height: 80px; color: #b4b4b4"
                  ></b-icon>
                  <br />
                  {{ $t("fundTransfers.onBehalf") }}
                  <br />
                  <small>{{ $t("fundTransfers.payingOnBehalfSomeone") }}</small>
                </b-button>
              </b-button-group>
              <b-collapse v-model="on_behalf">
                <b-card
                  header="Personal Details"
                  header-tag="header"
                  class="mt-3"
                >
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Full legal first and middle names"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Date of birth"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="Full legal last name(s)"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Phone"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-card>
                <b-card header="Address" header-tag="header" class="mt-3">
                  <b-row>
                    <b-col>
                      <b-form-group
                        label="Country"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Address"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Occupation"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group
                        label="City"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                      <b-form-group
                        label="Postal code"
                        label-for="input-type"
                        class="mt-2"
                      >
                        <b-form-input id="input-name"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-card>
                <b-button
                  class="float-left mt-5 px-5"
                  variant="outline-secondary"
                  @click="onClickBack"
                  >Back</b-button
                >
              </b-collapse>
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Next</b-button
              >
            </div>
            <div v-if="currentStep == 3">
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
                  <template v-if="rowSelected">
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
                @click="onClickBack"
                >Back</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >Next</b-button
              >
            </div>
            <div v-if="currentStep == 4">
              <h4>{{ $t("fundTransfers.letusKnowWhySend") }}</h4>
              <b-row class="mt-5">
                <b-col
                  ><b-form-group
                    :label="$t('fundTransfers.paymentMethod')"
                    label-for="input-name"
                  >
                    <b-dropdown
                      id="input-relation"
                      :text="transaction_details.details.method"
                      variant="light"
                      class="wd-100p"
                    >
                      <b-dropdown-item
                        v-for="option in method_options"
                        :key="option.value"
                        :value="option.value"
                        @click="
                          transaction_details.details.method = option.value
                        "
                        size="sm"
                      >
                        {{ option.text }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </b-form-group></b-col
                >
                <b-col
                  ><b-form-group
                    :label="$t('fundTransfers.transactionReason')"
                    label-for="input-type"
                  >
                    <b-form-input
                      id="input-name"
                      v-model="transaction_details.details.reason"
                    ></b-form-input> </b-form-group
                ></b-col>
              </b-row>

              <b-form-group
                :label="$t('fundTransfers.sourceFund')"
                label-for="input-type"
                class="mt-2"
              >
                <b-form-input
                  id="input-name"
                  v-model="transaction_details.details.fund_source"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                :label="$t('fundTransfers.remarks')"
                label-for="input-type"
                class="mt-2"
              >
                <b-form-input
                  id="input-name"
                  v-model="transaction_details.details.remarks"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="12"
                label-cols-lg="6"
                label-align-lg="right"
                content-cols-sm="12"
                content-cols-lg="6"
                v-if="transaction_details.details.method === 'Bank Deposit'"
                :label="$t('fundTransfers.uploadBankReceipt')"
                label-for="input-type"
                class="mt-2"
              >
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
              </b-form-group>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >{{ $t("backLabel") }}</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="onClickNext"
                >{{ $t("next") }}</b-button
              >
            </div>
            <div v-if="currentStep == 5" class="text-center">
              <h4>{{ $t("letsReviewTransaction") }}</h4>
              <img
                center
                alt="QQ Pay"
                class="logo_img"
                src="../../assets/transaction.gif"
              />
              <div class="text-left">
                <ul>
                  <li
                    v-for="(value, key) in transaction_details.beneficiary"
                    :key="key"
                  >
                    {{ key.toUpperCase() }} : <b>{{ value }}</b>
                  </li>
                  <li
                    v-for="(value, key) in transaction_details.details"
                    :key="key"
                  >
                    {{ key.toUpperCase() }} : <b>{{ value }}</b>
                  </li>
                </ul>
              </div>
              <b-button
                class="float-left mt-5 px-5"
                variant="outline-secondary"
                @click="onClickBack"
                >Back</b-button
              >
              <b-button
                class="float-right mt-5 px-5"
                variant="primary"
                @click="ConfirmAndPay"
                >Confirm and PAY</b-button
              >
            </div>
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

export default {
  name: "Transaction",
  components: {
    NavBar,
    TitleBar,
    NavBarLeft,
    "step-progress": StepProgress,
  },
  data () {
    return {
      filter: null,
      on_behalf: false,
      tabIndex: 1,
      currentStep: 1,
      selected: [],
      steps: [
        { text: this.$t('fundTransfers.amount') },
        { text: this.$t('fundTransfers.you') },
        { text: this.$t('fundTransfers.receipient') },
        { text: this.$t('fundTransfers.transactionDetails') },
        { text: this.$t('fundTransfers.reviewPay') },
      ],
      transaction_details: {
        beneficiary: {},
        details: {
          source_amount: 100000,
          target_amount: 1315.17,
          source_country: "MALAYSIA",
          target_country: "INDIA",
          method: "Bank Deposit",
          delivery: "Bank Account",
          reason: "",
          fund_source: "",
          remarks: "",
        },
      },
      method_options: [
        {
          text: "FPX",
          value: "FPX",
        },
        {
          text: "Bank Deposit",
          value: "Bank Deposit",
        },
      ],
      country_options: [
        {
          text: "INDIA",
          value: "INDIA",
        },
        {
          text: "NEPAL",
          value: "NEPAL",
        },
        {
          text: "MALAYSIA",
          value: "MALAYSIA",
        },
      ],
      delivery_options: [
        {
          text: this.$t('fundTransfers.bankAccount'),
          value: "Bank Account",
        },
        {
          text: this.$t('fundTransfers.wallet'),
          value: "Wallet",
        },
        {
          text: this.$t('fundTransfers.homeDelivery'),
          value: "Home Delivery",
        },
        {
          text: this.$t('fundTransfers.pickup'),
          value: "Pick up",
        },
      ],
      fields: [
        // this.$t('fundTransfers.name'),
        // this.$t('fundTransfers.country'),
        // this.$t('fundTransfers.type'),
        // this.$t('fundTransfers.relationship'),
        'name',
        'country',
        'type',
        'relationship',
        { key: "actions", label: "" },
      ],
      items: [
        {
          name: "Dev Shah",
          country: "DenMark",
          type: "Individual",
          relationship: "Family",
        },
        {
          name: "Mactronics Limited",
          country: "Sweden",
          type: "Business",
          relationship: "Vendor",
        },
      ],
    };
  },
  methods: {
    select_beneficiary (data) {
      this.transaction_details.beneficiary = data;
      this.tabIndex++;
      console.log(this.transaction_details.beneficiary);
    },
    onClickNext: function () {
      this.currentStep++;
    },
    onClickBack: function () {
      this.currentStep--;
    },
    onRowSelected (items) {
      this.selected = items;
    },
    onBehalf () {
      this.on_behalf = true;
    },
    notOnBehalf () {
      this.on_behalf = false;
    },
    ConfirmAndPay () {
      this.$router.push({ name: 'PaymentGateway' })
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.operation-padding {
  padding-top: 4px;
}
.converted {
  color: $txt;
  font-weight: 600;
}
.logo_img {
  height: 120px;
}
h4 {
  color: $txt;
  text-align: center;
}
::v-deep .btn-primary {
  background-color: $txt !important;
  border-color: $txt !important;
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
.form-group {
  margin-bottom: 0 !important;
}
::v-deep th {
  color: $txt !important;
  font-size: 14px;
  font-weight: 600;
}
.operations {
  height: 20px;
  width: 20px;
  position: absolute;
  border-radius: 10px;
  background: #d3d3d3;
  text-align: center;
  font-size: 20px;
  margin-left: -15px;
  line-height: 15px;
  bottom: 15px;
}
.list-group-flush {
  border-left: 1px solid $txt;
  margin-left: 25px;
}
::v-deep .btn-light {
  border: 1px solid #d3d3d3 !important;
}
::v-deep ul {
  list-style-type: none !important;
}
::v-deep label {
  color: $lightslategrey !important;
  margin-bottom: 0 !important;
}
li {
  padding: 7px;
}
</style>
