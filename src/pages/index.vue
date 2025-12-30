<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <pre>
    {{ router }}
  </pre>
  <router-view />
</template>
