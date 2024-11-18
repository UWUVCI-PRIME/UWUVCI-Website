<template>
  <v-app>
    <v-main>
      <!-- Navigation Bar -->
      <div>
        <v-toolbar app dark style="background-color: rgb(35 35 35);" class="hidden-xs-and-down">
          <v-toolbar-title>UWUVCI</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- Compatibility Dropdown Menu -->
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">
                  Compatibility ▾
                </v-btn>
              </template>
              <v-list>
                <!-- Links to Compatibility Pages -->
                <v-list-item>
                  <v-btn style="background-color: transparent; width: 100%; text-align: left" to="/ndscompat" title="">
                    NDS
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn style="background-color: transparent; width: 100%; text-align: left" to="/n64compat" title="">
                    N64
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn style="background-color: transparent; width: 100%; text-align: left" to="/nescompat" title="">
                    NES
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn color="primary" to="/" title="">
              Home
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </div>

      <!-- Page content, force re-render on route change -->
      <router-view :key="$route.fullPath"></router-view>
    </v-main>

    <!-- Footer -->
    <v-footer height="40" app>
      <a
        v-for="item in items"
        :key="item.title"
        :href="item.href"
        :title="item.title"
        class="d-inline-block mx-2 social-link"
        rel="noopener noreferrer"
        target="_blank"
        color="black"
      >
        <v-icon class="ico" :icon="item.icon" :size="item.icon === '$vuetify' ? 24 : 16" />
      </a>
      <div class="text-caption text-disabled" style="position: absolute; right: 16px;">
        &copy; {{ (new Date()).getFullYear() }} <span class="d-sm-inline-block">NicoAICP & ZestyTS</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
// Social Links
const items = [
  {
    title: 'UWUVCI GitHub',
    icon: 'mdi-github',
    href: 'https://github.com/UWUVCI-PRIME/',
  },
  {
    title: 'UWUVCI Discord',
    icon: [
      'M22,24L16.75,19L17.38,21H4.5A2.5,2.5 0 0,1 2,18.5V3.5A2.5,2.5 0 0,1 4.5,1H19.5A2.5,2.5 0 0,1 22,3.5V24M12,6.8C9.32,6.8 7.44,7.95 7.44,7.95C8.47,7.03 10.27,6.5 10.27,6.5L10.1,6.33C8.41,6.36 6.88,7.53 6.88,7.53C5.16,11.12 5.27,14.22 5.27,14.22C6.67,16.03 8.75,15.9 8.75,15.9L9.46,15C8.21,14.73 7.42,13.62 7.42,13.62C7.42,13.62 9.3,14.9 12,14.9C14.7,14.9 16.58,13.62 16.58,13.62C16.58,13.62 15.79,14.73 14.54,15L15.25,15.9C15.25,15.9 17.33,16.03 18.73,14.22C18.73,14.22 18.84,11.12 17.12,7.53C17.12,7.53 15.59,6.36 13.9,6.33L13.73,6.5C13.73,6.5 15.53,7.03 16.56,7.95C16.56,7.95 14.68,6.8 12,6.8M9.93,10.59C10.58,10.59 11.11,11.16 11.1,11.86C11.1,12.55 10.58,13.13 9.93,13.13C9.29,13.13 8.77,12.55 8.77,11.86C8.77,11.16 9.28,10.59 9.93,10.59M14.1,10.59C14.75,10.59 15.27,11.16 15.27,11.86C15.27,12.55 14.75,13.13 14.1,13.13C13.46,13.13 12.94,12.55 12.94,11.86C12.94,11.16 13.45,10.59 14.1,10.59Z',
    ],
    href: 'https://discord.gg/ultimate-wiiu-vc-injectors-386898225161961493',
  },
  {
    title: 'UWUVCI Reddit',
    icon: 'mdi-reddit',
    href: 'https://www.reddit.com/r/uwuvci/',
  },
];
</script>

<style>
.ico {
  color: #b37dff;
}
</style>
