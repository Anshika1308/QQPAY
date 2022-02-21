<template>
  <div class="transaction">
    <NavBar />
    <div class="page-body">
      <TitleBar title="Upload Business Documents" />
      <b-container>
        <b-row align-h="center my-5">
          <b-col>
            <b-list-group flush>
              <b-list-group-item
                v-for="uploads in upload_list"
                :key="uploads.id"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <h4>{{ uploads.title }}</h4>
                  <b-button-group class="mx-1">
                    <b-button variant="success" v-if="uploads.value" class="mr-1"><b-icon icon="cloud-check-fill"></b-icon></b-button>
                    <b-button variant="warning" v-else class="mr-1"><b-icon icon="cloud-upload-fill"></b-icon></b-button>
                    <b-button variant="light"><b-icon icon="eye-fill"></b-icon></b-button>
                  </b-button-group>
                </div>
                <em>{{ uploads.text }}</em>
              </b-list-group-item>
            </b-list-group>
            <b-row align-h="center">
              <b-col col sm="12" md="12" lg="6" class="text-center">
                <b-button-group>
                  <b-button
                    variant="secondary"
                    @click="$router.push('/')"
                    class="mt-5 mr-1 px-5"
                    >Back</b-button
                  >
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
  name: "BusinessDocuments",
  components: {
    NavBar,
    TitleBar,
  },
  data() {
    return {
      upload_list: [
        {
          id: 1,
          title: "SSM corporate profile report",
          text: "SSM corporate profile report is required as per Govt. mandate",
          value: true,
        },
        {
          id: 2,
          title: "Certified copy of Form 24",
          text: "Certified copy of Form 24 is required as per Govt. mandate",
          value: false,
        },
        {
          id: 3,
          title: "Certificate of Incorporation",
          text: "Certificate of incorporation is required as per Govt. mandate",
          value: true,
        },
        {
          id: 4,
          title: "Certified copy of Form 13",
          text: "Certified copy of Form 13 is required as per Govt. mandate",
          value: false,
        },
        {
          id: 5,
          title: "Certified copy of Form 49",
          text: "Certified copy of Form 49 is required as per Govt. mandate",
          value: false,
        },
        {
          id: 6,
          title: "Memorandum of Association",
          text: "Memorandum of Association is required as per Govt. mandate",
          value: false,
        },
        {
          id: 7,
          title: "Articles of Association",
          text: "Articles of association is required as per Govt. mandate",
          value: true,
        },
        {
          id: 8,
          title: "Business License",
          text: "Business License is required as per Govt. mandate",
          value: true,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
::v-deep .custom-control-input {
  &:checked ~ .custom-control-label {
    &::before {
      color: #fff;
      border-color: $green !important;
      background-color: $green !important;
    }
  }
}
</style>
