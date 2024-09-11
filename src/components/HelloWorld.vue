<style lang="css">
.tg {
  border-radius: 5px;
	border-collapse:collapse;
	border-color:#000;
	border-spacing:0;
}
.tg .tg-green {
    background-color: #acfaac;
    border-color: inherit;
    text-align: center;
    vertical-align: middle;
}
.tg .tg-yellow {
    background-color: #fad202;
    border-color: inherit;
    text-align: center;
    vertical-align: middle;
}
.tg .tg-red {
    background-color: #e96a6a;
    border-color: inherit;
    text-align: center;
    vertical-align: middle;
}
.tg td{
	border-style:solid;
	border-width:1px;
	font-family:Arial, sans-serif;
	font-size:14px;
	overflow:hidden;
	padding:2px 4px;
	word-break:normal;
	height:33px;
}
.tg th{
	background-color:#409cff;
	border-color:#000;
	border-style:solid;
	border-width:1px;
  
	
	font-family:Arial, sans-serif;
	font-size:14px;
	font-weight:normal;
	overflow:hidden;
	padding:2px 4px;
	word-break:normal;
}
</style>
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
              The UWUVCI Webpage will be available soon. <br> The Table below is for testing.
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
          


    <div class="py-4" />
    <div>
      <table class="tg">
        <tbody>
      <tr>
      <th class="gbaindexwidth">L</th>
      <th class="gbanamewidth">Game Name</th>
      <th class="gbaregionwidth">Region</th>
      <th class="gbahostwidth">Host Game</th>
      <th class="gbahostregwith">Host Region</th>
      <th class="gbastatuswidth">Status</th>
      <th class="gbanoteswidth">Notes</th>
      </tr>
      
      <tr v-for="compat in compatibility.l">
          <td>L</td>
          <td>{{compat.game_name}}</td>
          <td>{{compat.game_region}}</td>
          <td>{{compat.base_name }}</td>
          <td>{{ compat.base_region }}</td>
          <td v-if="compat.status == 1" class="tg-green" style="color: black" >Works</td>
          <td v-else-if="compat.status == 2" class="tg-yellow" style="color: black">Issues</td>
          <td v-else class="tg-red" style="color: black">Doesn't Work</td>
          <td v-if="compat.notes != 'None'">{{ compat.notes }}</td>
          <td v-else></td>
        </tr>
        
    
  </tbody>
  </table>
</div>
</v-responsive> 
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            compatibility: {},
        }
    },
    async created() {
        const json = await this.getNDSJson();
        this.compatibility = json;
    },
    methods: {
        getNDSJson() {
            return fetch('https://raw.githubusercontent.com/UWUVCI-PRIME/UWUVCI-Compatibility/main/NDSCompat.json')
                .then(response => response.json())
                .then(data => data)
        },
    }
}
</script>

<script setup>



 function isMobile() 
 {

  if(window.screen.availWidth <= 700) {
     return true
   } 
   else 
   {
     return false
   }
  }
</script>


