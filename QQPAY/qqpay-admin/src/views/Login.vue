<template>
  <div id="app">

    <div class="login-page">
      <transition name="fade">
        <div class="wallpaper-login"></div>
      </transition>

      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card login">
              <h1>Sign In</h1>
              <form class="form-group" @submit.prevent="handleSubmit">
                <input v-model="form.username" type="text" class="form-control" placeholder="Username" required>
                <input v-model="form.password" type="password" class="form-control" placeholder="Password" required>
                <input type="submit" class="btn btn-primary">
                <p><a href="#">Forgot your password?</a></p>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import APIS from '../constants/EndPoint'
import { userPostApiData } from "@/helpers/AxiosInstance";
import { responseHandler } from "@/helpers/globalFunctions";
import { setKey } from '../helpers/sessionKey';
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async handleSubmit(event) {
      event.preventDefault()
      let formData = new FormData()
      formData.append("username", this.form.username)
      formData.append("password", this.form.password)
      const res = await userPostApiData(APIS.LOGIN, formData);
      await responseHandler(res.data.status_code, this, res.data.message)
      console.log(res, "response");
      if (res.status === 200) {
        setKey("token", "test")
        this.$router.push('home')
        this.$bvToast.toast("Login Success", {
          title: "Success",
          variant: "success",
          solid: true
        })
      } else {
        this.$bvToast.toast("Login Failed", {
          title: "Error",
          variant: "danger",
          solid: true
        })
      }
    },
  }
}
</script>

<style scoped lang="scss">
p {
  line-height: 1rem;
}

.card {
  padding: 20px;
}

.form-group {
  input {
    margin-bottom: 20px;
  }
}

.login-page {
  align-items: center;
  display: flex;
  height: 100vh;

  .wallpaper-login {
    background: #d5cece;
    background-size: cover;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  h1 {
    margin-bottom: 1.5rem;
  }
}

.error {
  animation-name: errorShake;
  animation-duration: 0.3s;
}

@keyframes errorShake {
  0% {
    transform: translateX(-25px);
  }

  25% {
    transform: translateX(25px);
  }

  50% {
    transform: translateX(-25px);
  }

  75% {
    transform: translateX(25px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>