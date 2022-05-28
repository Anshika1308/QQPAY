<template>
  <div>
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
            @click="transaction_details.details.source_country = option.value"
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
                  @click="transaction_details.details.delivery = option.value"
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
          <div class="operations operation-padding">&#215;</div>
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
            @click="transaction_details.details.target_country = option.value"
          >
            {{ option.text }}
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-input-group>
    <b-button
      class="float-right mt-5 px-5"
      variant="primary"
      @click="buttonClickHandler"
      >{{ $t("next") }}</b-button
    >
  </div>
</template>

<script>
export default {
  props: ["txnDetails", "country_options", "delivery_options"],
  computed: {
    transaction_details: {
      get () {
        return this.txnDetails;
      },
      set (transaction_details) {
        this.$emit("input", transaction_details)
      }
    }
  },
  methods: {
    buttonClickHandler () {
      this.$emit('my-event')
    }
  },
}
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
