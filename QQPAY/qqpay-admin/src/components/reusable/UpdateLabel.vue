<template>
    <span>
        <span style="color:red; position: absolute;"><span style="color:transparent">{{ label }}</span>*</span>
        <span style="position:absolute ;color: red; bottom: 6px; font-size:14px;">{{ error }}</span>
    </span>
</template>
<script>
export default {
    name: "UpdateLabel",
    props: ["label", "error"]
}
</script>