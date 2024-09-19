<template>
  <v-app>
    <v-main>
      <!-- This loads the correct page based on the current route -->
      <router-view />
    </v-main>

    <v-footer height="40" app>
      <div class="text-caption text-disabled" style="position: absolute; right: 16px;">
        &copy; {{ new Date().getFullYear() }} <span class="d-sm-inline-block">NicoAICP & ZestyTS</span>
      </div>
    </v-footer>
  </v-app>
</template>

