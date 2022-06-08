export const responseHandler = async (statusCode, vm, message) => {
  if (statusCode === 200) {
    vm.$bvToast.toast(message, {
      title: "Success",
      variant: "success",
      solid: true
    })
  } else {
    vm.$bvToast.toast(message, {
      title: "Error",
      variant: "danger",
      solid: true
    })
  }
}