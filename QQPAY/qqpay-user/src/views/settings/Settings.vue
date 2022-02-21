<template>
  <div class="transaction">
    <NavBar />
    <NavBarLeft />
    <div class="page-body">
      <TitleBar title="Settings" />
      <b-container>
        <b-row align-h="center my-5">
          <b-col>
            <div v-for="setting in settings" :key="setting.heading">
              <b-card :header="setting.heading" header-tag="header" class="mt-2">
                <div
                  v-for="data in setting.data"
                  :key="data.id"
                >
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h4>{{ data.title }}</h4>
                    <b-form-checkbox
                      switch
                      size="lg"
                      v-model="data.value"
                      variant="Success"
                    />
                  </div>
                  <b-card-text>{{ data.text }}</b-card-text>
                  <br />
                  <br />
                </div>
              </b-card>
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

export default {
  name: "Settings",
  components: {
    NavBar,
    TitleBar,
    NavBarLeft
  },
  data() {
    return {
      settings: [
        {
          heading: "Notification Settings",
          data: [
            {
              id: 1,
              title: "Transactional Notifications",
              text: "These are to keep you updated about the transactions happening over QQ Pay, QQ Pay vowes to share the details of the money transfer happening.",
              value: true,
            },
            {
              id: 2,
              title: "Feature Updates Notifications",
              text: "These are to keep you updated about the new features updates released by QQ Pay, as QQ Pay is evolving to make remittance easy as click, we would love to keep you updated about it.",
              value: true,
            },
            {
              id: 3,
              title: "Promotional Notifications",
              text: "These are to keep you updated about the new persoanlised offers we got just for you, so that you can make the most of it.",
              value: true,
            },
          ],
        },
        {
          heading: "Data Privacy",
          data: [
            {
              id: 1,
              title: "Share data with our Partners",
              text: "Allow QQ Pay to share non-senstive data with our banking and non-banking partners, so as to we can roll out best in class offers for you.",
              value: true,
            },
            {
              id: 2,
              title: "App Data Usage",
              text: "Allow QQ Pay to collect data related to the app usage, the data gathered is completely non-sensitve, this helps QQ pay to fix bugs, improve the user exeperince, bring in new features.",
              value: true,
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
::v-deep .custom-control-input {
	&:checked~.custom-control-label {
		&::before {
			color: #fff;
			border-color: $green !important;
			background-color: $green !important;
		}
	}
}
</style>
