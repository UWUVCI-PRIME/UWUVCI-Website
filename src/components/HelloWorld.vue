<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto "
      max-width="xs:370 700"
    > 

    <v-img
        class="mb-4"
        height="150"
        src="@/assets/UWUVCI_LOGO.png"
      />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

        <h1 class="text-h2 font-weight-bold">UWUVCI</h1>
      </div>

      <div class="py-4" />

      <v-row> 
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"
            rounded="lg"
            variant="outlined"> 
          
            <v-card-text class="xs:text-sm-body-2 text-h5 font-weight-bold" style="text-align:center">
              The UWUVCI Webpage will be available soon
            </v-card-text>

            <v-overlay
              opacity=".12"
              scrim="primary"
              contained
              model-value
              persistent
            ></v-overlay>
          
          </v-card>
        </v-col>
      </v-row>       
          

    </v-responsive> 
  </v-container>
</template>

<script setup>

</script>
