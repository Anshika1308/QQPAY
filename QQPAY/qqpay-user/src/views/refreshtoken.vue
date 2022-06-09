<template></template>

<script>
import axios from "axios";
import constants from "../../constants.json";
export default {
  methods: {
    refreshToken () {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.userAccessToken}`,
          },
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style>
</style>