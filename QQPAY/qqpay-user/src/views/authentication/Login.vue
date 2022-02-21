<template>
  <div class="login">
    <div class="my-5">
      <b-container>
        <b-row align-v="center" align-h="center" class="my-auto">
          <b-col col sm="12" md="12" lg="6" class="mt-5">
            <b-jumbotron bg-variant="light" text-variant="secondary">
              <template #header><img
                alt="QQ Pay"
                class="logo_img_lg"
                src="../../assets/master_logo.png"
              /></template>

              <template #lead>
                Payment Across The Globe Just Got Easier
              </template>

              <hr class="my-4">

              <p>
                We remove complexities and introducing you to fast, cost-effective international payments with greater transparency.
              </p>
            </b-jumbotron>
          </b-col>
          <b-col col sm="12" md="12" lg="5">
            <b-card header="Sign In" header-tag="header" class="mt-2">
              <b-form-input
                v-model="email"
                type="email"
                placeholder="someone@example.com"
                class="mt-3"
              ></b-form-input>
              <b-form-input
                v-model="password"
                type="password"
                placeholder="Password"
                class="my-3"
              ></b-form-input>
              <b-link @click="$router.push('/forgotpassword')">Forgot Password?</b-link>
              <b-button
                variant="primary"
                @click="$router.push('/')"
                class="btn-primary mt-4 ml-auto px-5"
                >Sign In</b-button
              >
            </b-card>
            <b-card class="mt-3" size="lg">
              <div class="div-signup" @click="$router.push('/signup')">
                <b-icon icon="person-lines-fill" scale="1.2" aria-hidden="true"></b-icon
                >&nbsp;&nbsp;Sign-up options
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/navigations/Footer.vue";

export default {
  name: "Login",
  components: {
    Footer,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/global.scss";
.lead {
  font-weight: 400;
  color: $txt;
}
.logo_img {
  max-height: 50px;
}
.logo_img_lg {
  max-height: 100px;
}
.div-signup {
  color: $txt;
  cursor: pointer;
}
.login {
  height: 100%;
}
</style>
