<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <b-row>
      <b-col cols="4">
        <div class="mt-3">
          <strong></strong>
        </div>
      </b-col>
      <b-col cols="2">
        <div class="mt-3">
          <b-button class="float-right" variant="primary" @click="onSearch"
            >Search</b-button
          >
        </div>
      </b-col>
      <b-col cols="2">
        <div class="mt-3">
          <b-button
            class="float-right"
            variant="primary"
            @click="showParameterForm()"
            >Add Parameter</b-button
          >
        </div>
      </b-col>
      <b-col cols="2">
        <div class="mt-3">
          <b-button
            class="float-right"
            variant="primary"
            @click="showValueForm()"
            >Add Value</b-button
          >
        </div>
      </b-col>
      <b-col cols="2">
        <div class="float-right mt-3">
          <b-button-group size="md">
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="this.showParameter" class="mt-3">
      <b-col cols="3">
        <b-form-group>
          <b-form-input
            placeholder="Name"
            v-model="parameter_form.name"
            size="sm"
          ></b-form-input
        ></b-form-group>
      </b-col>
      <b-col cols="3">
        <b-button
          class="float-left"
          variant="primary"
          size="sm"
          @click="submitParameter()"
          >Save</b-button
        >
      </b-col>
    </b-row>
    <b-row v-if="this.showValue" class="mt-3">
      <b-col cols="3">
        <b-form-group>
          <b-form-input
            placeholder="Name"
            v-model="value_form.name"
            size="sm"
          ></b-form-input
        ></b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group
        >
          <b-dropdown
            block
            id="input-relation"
            :text="value_form.parameter_name"
            variant="light"
            label-size="sm"
            size="sm"
          >
            <b-dropdown-item
              v-for="option in parameter_name_options"
              :key="option.value"
              :value="option.value"
              size="sm"
            >
              {{ option.text }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group
        >
          <b-dropdown
            block
            id="input-relation"
            :text="value_form.score"
            variant="light"
            label-size="sm"
            size="sm"
          >
            <b-dropdown-item
              v-for="option in score_options"
              :key="option.value"
              :value="option.value"
              size="sm"
            >
              {{ option.text }}
            </b-dropdown-item>
          </b-dropdown>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-button
          class="float-left"
          variant="primary"
          size="sm"
          @click="submitValue()"
          >Save</b-button
        >
      </b-col>
    </b-row>
    <div>
      <b-row>
        <b-col sm="12" md="12" lg="12">
          <div>
            <b-table striped hover :items="values" :fields="fields">
              <template #cell(id)="row">
                {{ row.index + 1 }}
              </template>
              <template #cell(is_active)="row">
                <b-form-checkbox
                  v-model="row.item.is_active"
                  switch
                  class="checkbox"
                  @change="onChangeActive(row.item.is_active)"
                >
                </b-form-checkbox> </template
              ><template #cell(actions)="row" size="sm">
                <div class="action-div">
                  <b-button
                    variant="light"
                    size="sm"
                    @click="EditValue(row.item.id)"
                    class="mr-2 expand-btn"
                  >
                    <b-icon icon="pencil-square"></b-icon>
                  </b-button>
                  <b-button
                    variant="light"
                    size="sm"
                    @click="deleteValue(row.item.id)"
                    class="mr-2 expand-btn"
                  >
                    <b-icon icon="trash"></b-icon>
                  </b-button>
                </div>
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showParameter: false,
      showValue: false,
      parameter_form: {
        name: null,
      },
      value_form: {
        name: null,
        parameter_name: "Source of Income",
        score: "1"
      },
      menu_hierarchy: [
        {
          text: "Setup",
          active: true,
        },
        {
          text: "Compliance Settings",
          active: true,
        },
      ],
      fields: [
        { key: "id", label: "SNO" },
        { key: "parameter_name", label: "Parameter" },
        { key: "name", label: "Value" },
        { key: "score", label: "Score", class: "text-center" },
        { key: "is_active", label: "Active" },
        { key: "actions", label: "Action", class: "text-right" },
      ],
      values: [
        {
          id: "1",
          parameter_id: "1",
          parameter_name: "Payment Mode",
          name: "Bank Transfer",
          score: "3",
          is_active: "True",
        },
        {
          id: "2",
          parameter_id: "1",
          parameter_name: "Payment Mode",
          name: "Cash Payment",
          score: "2",
          is_active: "True",
        },
        {
          id: "3",
          parameter_id: "2",
          parameter_name: "Source of Income",
          name: "Salary",
          score: "3",
          is_active: "True",
        },
        {
          id: "4",
          parameter_id: "2",
          parameter_name: "Source of Income",
          name: "Business Income",
          score: "1",
          is_active: "True",
        },
        {
          id: "5",
          parameter_id: "3",
          parameter_name: "Sender Occupation",
          name: "Government",
          score: "3",
          is_active: "True",
        },
        {
          id: "6",
          parameter_id: "3",
          parameter_name: "Sender Occupation",
          name: "Self Service",
          score: "1",
          is_active: "True",
        },
      ],
      parameter_name_options: [
        {
          text: "Payment Mode",
          value: "1",
        },
        {
          text: "Source of Income",
          value: "2",
        },
        {
          text: "Sender Occupation",
          value: "3",
        },
      ],
      score_options: [
        {
          text: "1",
          value: "1",
        },
        {
          text: "2",
          value: "2",
        },
        {
          text: "3",
          value: "3",
        },
      ],
    };
  },
  methods: {
    onSearch() {},
    showParameterForm() {
      this.showParameter = true;
    },
    submitParameter() {
      this.showParameter = false;
    },
    showValueForm() {
      this.showValue = true;
    },
    EditValue(item) {
      this.value_form = item
      this.showValue = true;
    },
    submitValue() {
      this.showValue = false;
    },
    onChangeActive(item) {
      console.log(item);
    },
    deleteValue() {},
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.menu-sec {
  margin-top: 0.5rem;
}
.card-body {
  padding: 0 !important;
}
.card {
  margin-bottom: 1rem !important;
}
.btn-outline-light {
  color: $txt !important;
  border-color: $primary !important;
}
.btn-secondary {
  background: $txt !important;
}
.row {
  margin: 5px;
}
.expand-btn {
  color: $primary !important;
  border: none !important;
  background: $white !important;
}
.action-btn {
  background: $primary;
  border-radius: 4px;
  color: $white;
  border: none !important;
}
.action-div {
  text-align: end;
}
::v-deep .table {
  td {
    vertical-align: middle !important;
  }
}
.title-lbl {
  width: 100%;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  color: $txt;
  border-bottom: 1px solid $txt;
}
.form-group {
  margin-bottom: 0;
}
.list-group-item {
  padding: 0;
}

::v-deep th {
  color: $txt !important;
  font-size: 12px;
  font-weight: 600;
}
::v-deep td {
  font-size: 12px !important;
}
::v-deep .col-form-label {
  color: $dimgrey;
}
.modal-footer {
  justify-content: center !important;
}
#sr-country-wise___BV_modal_footer_ {
  justify-content: center !important;
}
.my-custom-class .card-title {
  background-color: #ff6b00;
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: #ff6b00 !important;
}
.nav-pills .nav-link.active {
  background-color: #ff6b00 !important;
}
</style>