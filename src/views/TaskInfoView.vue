<script setup>
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import AppButton from '../components/AppButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>
<template>
    <AppNavbar />


    <AppFooter />
</template>