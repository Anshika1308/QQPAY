<template>
  <div class="transaction">
    <div class="page-body">
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
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {
  name: "BusinessDocuments",
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
.documents-container{
  background: #efebeb;
}
.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.upload-file-main {
  padding: 5px;
  background: #efebeb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.upload-btn {
  border: 1px solid gray;
  color: gray;
  background-color: white;
  padding: 0px 10px;
  border-radius: 20px;
  font-size: 20px;
  
}
</style>