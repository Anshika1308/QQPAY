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
    <b-row v-if="this.showValue" class="mt-3">
      <b-col cols="3">
        <b-form-input
          id="reuters_rate"
          name="reuters_rate"
          class="mt-3"
          placeholder="Reuters Rate"
          v-model="form.value"
          size="md"
          required
          :class="{
            'is-invalid': $v.form.value.$error,
          }"
          aria-describedby="value-live-feedback"
        ></b-form-input>
        <b-form-invalid-feedback id="value-live-feedback">
          This is a required field.
        </b-form-invalid-feedback>
      </b-col>
      <b-col cols="3">
        <v-select
          :options="parameterList"
          label="value"
          v-model="form.parameter_name"
          :reduce="(item) => item.id"
          placeholder="Available options here"
          required
          :clearable="false"
          :class="{
            'is-invalid': $v.form.parameter_name.$error,
          }"
          aria-describedby="parameter_name-live-feedback"
        >
        </v-select>
        <b-form-invalid-feedback id="parameter_name-live-feedback">
          This is a required field.
        </b-form-invalid-feedback>
      </b-col>
      <b-col cols="3">
         <v-select
          :options="scoreList"
          label="value"
          v-model="form.score"
          :reduce="(item) => item.id"
          placeholder="Available options here"
          required
          :clearable="false"
          :class="{
            'is-invalid': $v.form.score.$error,
          }"
          aria-describedby="score-live-feedback"
        >
        </v-select>
        <b-form-invalid-feedback id="score-live-feedback">
          This is a required field.
        </b-form-invalid-feedback>
      </b-col>
      <b-col cols="3">
        <b-button
          class="float-left"
          variant="primary"
          size="sm"
          @click="manage()"
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
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import { getAll } from "@/api/country";
import { getAll as list, getById, save, update } from "@/api/serviceCharge";
export default {
  mixins: [validationMixin],
  data() {
    return {
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
      showValue: false,
      defaultForm: {
        name: null,
        parameter_name: "Source of Income",
        score: "1",
        is_active: "True",
      },
      form: null,
      parameterList: [],
      items: [],
      filter: null,
      fields: [
        { key: "id", label: "SNO" },
        { key: "parameter_name", label: "Parameter" },
        { key: "name", label: "Value" },
        { key: "score", label: "Score", class: "text-center" },
        { key: "is_active", label: "Active" },
        { key: "actions", label: "Action", class: "text-right" },
      ],
      scoreList: [
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
        {
          text: "4",
          value: "4",
        },
        {
          text: "5",
          value: "5",
        },
      ],
    };
  },
  validations: {
    countryWiseForm: {
      value: {
        required,
      },
      parameter_name: {
        required,
        minLength: []
      },
      score: {
        required,
      },
    },
  },
  methods: {
    showValueForm() {
      this.showValue = true;
    },
    resetForm() {
      this.specialRatesForm = Object.assign({}, this.specialRatesDefaultForm);
      this.onSearch();
    },
    onSearch() {
      list().then((res) => {
        this.items = res.data[0];
        debugger; // eslint-disable-line no-debugger
      });
    },
    edit(item) {
      if (item.id > 0) {
        getById(item.id)
          .then((res) => {
            this.countryWiseForm = Object.assign({}, res.data);
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    manage() {
      console.log(this.countryWiseForm);
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (this.countryWiseForm.id > 0) {
        update(this.countryWiseForm)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            //done()
          });
      } else {
        save(this.countryWiseForm)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            //done()
          });
      }
    },
  },
  async created() {
    this.resetForm();
    this.onSearch();
    await Promise.all([
      getAll().then((res) => {
        this.countryList = res.data;
      }),
    ]);
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