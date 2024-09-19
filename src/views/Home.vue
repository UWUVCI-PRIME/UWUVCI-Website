<template> 

      <v-container class="fill-height">
        <v-responsive class="align-center fill-height mx-auto" max-width="xs:370 700">
          <!-- UWUVCI Logo -->
          <v-img
            class="mb-4"
            height="150"
            src="@/assets/UWUVCI_LOGO.png"
            alt="UWUVCI Logo"
          />

          <!-- Welcome message -->
          <div class="text-center">
            <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
            <h1 class="text-h2 font-weight-bold">UWUVCI</h1>
          </div>

          <!-- Closing this tag, is this really needed though? -->
          <div class="py-4"></div>

          <!-- Added example of linking somewhere -->
          <!--<v-row justify="center">
            <v-col cols="12" md="2">
              <router-link to="/ndscompat">
                <v-btn block color="primary">NDS Compatibility</v-btn>
              </router-link>
            </v-col>
          </v-row>-->

          <!-- Closing this tag, is this really needed though? -->
          <div class="py-4"></div>

          <!-- Notification card -->
          <v-row>
            <v-col cols="12">
              <v-card class="py-4" color="surface-variant" rounded="lg" variant="outlined">
                <v-card-text class="xs:text-sm-body-2 text-h5 font-weight-bold" style="text-align:center">
                  The UWUVCI Webpage will be available soon. <br />
                  The Table below is for testing.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Content specific to each page will be injected here -->
          <router-view />
        </v-responsive>
      </v-container>

</template>
