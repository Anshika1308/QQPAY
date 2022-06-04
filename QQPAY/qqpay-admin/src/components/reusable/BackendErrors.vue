<template>
    <b-form-invalid-feedback :state="validation">
        Your user ID must be 5-12 characters long.
    </b-form-invalid-feedback>
    <b-form-valid-feedback :state="validation">
        Looks Good.
    </b-form-valid-feedback>
</template>
<script>
export default {
    name: "BackendErrors",
    props: ["errors"],
    data() {
        return {
            error
        }

    },
    computed: {
        validation() {
            return this.userId.length > 4 && this.userId.length < 13
        }
    }
}
</script>