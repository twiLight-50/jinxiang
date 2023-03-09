<template>
  <div class="Jx-break-item">
    <RouterLink v-if="to" :to="to"><slot/></RouterLink>
    <span v-else><slot/></span>
  </div>
</template>

<script>
export default {
  name: "JxBreakItem",
  props: {
    to: {
      type: [Object, String],
      default: "",
    },
  },
};
</script>

<style>
</style>