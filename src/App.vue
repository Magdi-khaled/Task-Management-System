<template>
  <div id="app">
    <router-view />

    <div id="expired" class="fixed inset-0 bg-[#0000003c] hidden justify-center items-center">
      <div class="bg-green-50 border-2 border-green-300">
        <p class="text-green-400 text-md sm:text-xl font-bold px-12 py-6">
          Session is expired
        </p>
      </div>
    </div>
  </div>
</template>