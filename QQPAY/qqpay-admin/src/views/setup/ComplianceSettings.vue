<template>
  <div class="home">
    <b-breadcrumb :items="menu_hierarchy"></b-breadcrumb>
    <!-- <b-row>
      <b-col cols="4">
        <div class="mt-3">
          <strong></strong>
        </div>
      </b-col>
      <b-col cols="2">
        <div class="mt-3">
          <b-button class="float-right" variant="primary" 
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
            >Add Record</b-button
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
    <b-row>
      <b-col>
        <b-alert v-model="isError" variant="danger" dismissible>
          {{ this.error }}
        </b-alert>
      </b-col>
    </b-row> -->
    


    <b-row style="margin-bottom: -25px;">
      <b-col>
        <div>
          <b-button-group size="sm">
            <b-button variant="outline-light"   @click="showParameterForm()">
              <b-icon
                icon="file-earmark-plus-fill"
                
              ></b-icon>
              Add Parameter
            </b-button>
            <b-button variant="outline-light"  @click="showValueForm()">
              <b-icon
                icon="file-earmark-plus-fill"
                
              ></b-icon>
              Add Record
            </b-button>
            <b-button variant="outline-light">
              <b-icon icon="cloud-download-fill"></b-icon> Export XLS
            </b-button>
          </b-button-group>
        </div>
      </b-col>
      <b-col>
        <b-form-group
          label-for="filter-input"
          label-cols-sm="0"
          label-cols-lg="0"
          label-align-lg="right"
          content-cols-sm="12"
          content-cols-lg="8"
          label-align-sm="right"
          label-size="sm"
          class="mb-2"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="showParameter" style="margin-top: 25px;">
      <b-col cols="3">
        <b-form-group label="Parameter">
          <b-form-input
            id="parameter_name"
            name="parameter_name"
            size="sm"
            v-model="parameterForm.parameter_name"
            required
            :class="{
              'is-invalid': $v.parameterForm.parameter_name.$error,
            }"
            aria-describedby="parameter_name-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="parameter_name-live-feedback">
            This is a required field.
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group style="margin-top: 31px">
          <b-button
            class="float-left"
            variant="primary"
            size="sm"
            @click="manageParameter()"
            >Save</b-button
          >
          <b-button
            class="float-left ml-2"
            variant="primary"
            size="sm"
            @click="cancelParameter()"
            >cancel</b-button
          >
        </b-form-group>
      </b-col>
    </b-row>

    <b-row v-if="showValue" style="margin-top: 25px;">
      <b-col cols="3">
        <b-form-group label="Select Parameter">
          <v-select
            :options="parameterList"
            label="parameter_name"
            v-model="form.parameter_code"
            :reduce="(item) => item.parameter_name"
            required
            :clearable="false"
            :class="{
              'is-invalid': $v.form.parameter_code.$error,
            }"
            aria-describedby="parameter_code-live-feedback"
          >
          </v-select>
          <b-form-invalid-feedback id="parameter_code-live-feedback">
            This is a required field.
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group label="Value">
          <b-form-input
            id="value"
            name="value"
            size="sm"
            v-model="form.value"
            required
            :class="{
              'is-invalid': $v.form.value.$error,
            }"
            aria-describedby="value-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="value-live-feedback">
            This is a required field.
          </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group label="Select Score"
          ><v-select
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
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group style="margin-top: 31px">
          <b-button
            class="float-left"
            variant="primary"
            size="sm"
            @click="manageValue()"
            >Save</b-button
          >
          <b-button
            class="float-left ml-2"
            variant="primary"
            size="sm"
            @click="cancelValue()"
            >cancel</b-button
          >
        </b-form-group>
      </b-col>
    </b-row>
    
    <div>
      <b-row>
        <b-col sm="12" md="12" lg="12">
          <div>
            <b-table
              striped
              hover
              :items="items"
              :fields="fields"
              :filter="filter"
              responsive
              class="align-middle mt-4"
            >
              <template #cell(id)="row">
                {{ row.index + 1 }}
              </template>
              <template #cell(is_active)="row">
                <b-form-checkbox
                  v-model="row.item.is_active"
                  switch
                  class="
                     color-checkbox
                  "
                  @change="onChangeActive(row.item)"
                >
                </b-form-checkbox>
              </template>
              <template #cell(actions)="row" size="sm">
                <div class="action-div">
                  <b-button
                    variant="light"
                    size="sm"
                    @click="edit(row.item)"
                    class="mr-2 expand-btn"
                  >
                    <b-icon icon="pencil-square"></b-icon>
                  </b-button>
                  <b-button
                    variant="light"
                    size="sm"
                    @click="onDelete(row.item)"
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
import { required, minLength } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins";
import { getAll } from "@/api/country";
import {
  getAll as list,
  getParameterList,
  getValueById,
  saveParameter,
  updateParameter,
  saveValue,
  updateValue,
  onDelete,
} from "@/api/compliance";
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
      isError: false,
      error: null,
      showParameter: false,
      showValue: false,
      defaultParameterForm: {
        parameter_name: null,
        is_active: null,
      },
      parameterForm: null,
       filter: null,
      defaultForm: {
        user_type:"IND",
        value_code: null,
        value: null,
        parameter:null,
        parameter_code: null,
        parameter_val_code: null,
        score: 0,
        is_active: null,
        is_del:false,
       
      },
      form: null,
      parameterList: [],
      items: [],
      fields: [
        { key: "id", label: "SNO" },
        { key: "parameter", label: "Parameter" },
        { key: "value", label: "Value" },
        { key: "score", label: "Score", class: "text-center" },
        { key: "is_active", label: "Active" },
        { key: "actions", label: "Action", class: "text-right" },
      ],
      scoreList: [
        {
          id: "1",
          value: "1",
        },
        {
          id: "2",
          value: "2",
        },
        {
          id: "3",
          value: "3",
        },
        {
          id: "4",
          value: "4",
        },
        {
          id: "5",
          value: "5",
        },
      ],
    };
  },
  validations: {
    form: {
      value: {
        required,
      },
      parameter_code: {
        required,
      },
      score: {
        required,
      },
    },
    parameterForm: {
      parameter_name: {
        required,
        minLength: minLength(2),
      },
    },
  },
  methods: {
    showParameterForm() {
      this.showParameter = true;
    },
    showValueForm() {
      this.showValue = true;
    },
    cancelParameter() {
      this.showParameter = false;
      this.parameterForm = Object.assign({}, this.defaultParameterForm);
    },
    cancelValue() {
      this.showValue = false;
      this.form = Object.assign({}, this.defaultForm);
    },
    resetForm() {
      this.parameterForm = Object.assign({}, this.defaultParameterForm);
      this.form = Object.assign({}, this.defaultForm);
      this.isError = false;
      this.error = null;
      this.$v.$reset();
      this.onSearch();
    },
    onSearch() {
      list().then((res) => {
        this.items = [];
        res.data.data[0].forEach(element => {
          if(element.user_type == 'IND'){
            this.items.push(element);
          }
        });
        // this.items = res.data.data[0];
      });

    },
    edit(item) {
      if (item.id > 0) {
        getValueById(item.parameter_code, item.value_code)
          .then((res) => {
      
            this.showValue = true;
            this.form = Object.assign({}, res.data.data[0])
            this.form.parameter_code = this.form.parameter;
            console.log(this.form);
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          });
      }
    },
    onDelete(item) {
      onDelete(item.parameter_code, item.value_code)
        .then(() => {
          this.resetForm();
        })
        .catch((error) => {
          this.isError = true;
          this.error = error.message;
        });
    },
    manageParameter() {
      //flag
      this.$v.parameterForm.$touch();
      if (this.$v.parameterForm.$invalid) {
        return;
      }
      
      if (this.parameterForm.id > 0) {
        updateParameter(this.parameterForm)
          .then((res) => {
            console.log(res);
            this.resetForm();
            getParameterList().then((response) => {
              console.log("parm List", response.data.data[0])
              this.parameterList = response.data.data[0];
            });
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      } else {
        this.parameterForm.is_active = true;
        saveParameter(this.parameterForm)
          .then((res) => {
            console.log(res);
            this.resetForm();
            getParameterList().then((response) => {
              console.log("parm List", response.data.data[0])
              this.parameterList = response.data.data[0];
            });
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      }
    },
    onChangeActive(item) {
       this.parameterList.forEach(element => {
          if(element.parameter_name == this.form.parameter_code){
            this.form.parameter_code = element.id;
          }
        });
      updateValue(item, item.parameter_code, item.value_code)
        .then((res) => {
          console.log(res);
          this.resetForm();
        })
        .catch((error) => {
          this.isError = true; 
          this.error = error.message;
        })
        .finally(() => {
          //done()
        });
    },
    manageValue() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return;
      }
      console.log("this form",this.form);
      if (this.form.id > 0) {
       this.form.parameter = this.form.parameter_code;
         this.form.user_type = 'IND';
        this.parameterList.forEach(element => {
          if(element.parameter_name == this.form.parameter_code){
            this.form.parameter_code = element.id;
            this.form.parameter_val_code  = element.id;
          }
        });
        // flag
        updateValue(
          this.form,
          this.form.parameter_code,
          this.form.value_code
        )
          .then((res) => {
            console.log(res);
            this.resetForm();
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
          })
          .finally(() => {
            //done()
          });
      } else {
        this.form.is_active = true;
        console.log(this.form)
        this.form.parameter = this.form.parameter_code;
        this.form.user_type = 'IND';
        this.parameterList.forEach(element => {
          if(element.parameter_name == this.form.parameter_code){
            this.form.parameter_code = element.id;
          }
        });
        saveValue(this.form)
          .then((res) => {
            console.log(res);
            this.resetForm();
          })
          .catch((error) => {
            this.isError = true;
            this.error = error.message;
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
      getParameterList().then((res) => {
        console.log("parm List", res.data.data[0])
        this.parameterList = res.data.data[0];
        
      }),
    ]);
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
// .custom-control-input:checked ~ .custom-control-label::before {
//   color: #fff;
//   border-color: #1eb795 !important;
//   background-color: #1eb795 !important;
// }
// .custom-control-label::before {
//   color: #fff;
//   border-color: #1eb795 !important;
//   background-color: #1eb795 !important;
// }
/*sets the background color of
          switch to violet when it is active*/
.custom-control-switch:active ~ .custom-control-label::before {
  background-color: violet !important;
  border-color: violet !important;
}
.custom-control-switch-label::before {
  border-color: $green !important;
  background-color: $green !important;
}
#checkboxes input[type=checkbox]:checked ::before{
  color: #fff;
  border-color: #1eb795 !important;
  background-color: #1eb795 !important;
}
// .custom-control-switch {
// }
// .custom-control-label {
//   background-color: #1eb795 !important;
// }
// .custom-control {
//   background-color: grey;
// }
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