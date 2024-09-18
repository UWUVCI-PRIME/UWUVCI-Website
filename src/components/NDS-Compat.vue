<template>
<v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto "
      max-width="xs:370 700"
    > 
    <div>
   
        <v-row> 
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"
            rounded="lg"
            variant="outlined"> 
          
            <v-card-text class="xs:text-sm-body-2 text-h5 font-weight-bold" style="text-align:center">
              UWUVCI NDS Compatibility List
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
   <v-text-field
     v-model="search"
     label="Search"
     prepend-inner-icon="mdi-magnify"
     variant="outlined"
     hide-details
     single-line
     
   ></v-text-field>


   <v-data-table v-model:headers="headers" v-model:search="search" v-model:items="compatibility.compatibility" >
     <template v-slot:header.game_region>
       <div style="width: 90px;">Game Region</div>
     </template>
     <template v-slot:header.base_region>
       <div style="width: 90px;">Base Region</div>
     </template>
     <template v-slot:item.status="{ item }">
       <v-chip v-if="item.status == 'working'"
         color="green"
         text="Working"
         class="text-uppercase "
         size="small"
         label
       ></v-chip>
       <v-chip v-else-if="item.status == 'issues'"
         color="yellow"
         text="Issues"
         class="text-uppercase"
         size="small"
         label
       ></v-chip>
       <v-chip v-else
         color="red"
         text="Broken"
         class="text-uppercase"
         size="small"
         label
       ></v-chip>
     </template>
     <template v-slot:item.notes="{ item }">
      <p v-if="item.notes != 'None' ">
        <span v-linkify="item.notes"></span>
      </p>
    </template>

   </v-data-table>
   
  

</div>
    </v-responsive>
</v-container>
</template>
<script>
export default {
    data() {
        return {
            sortBy: [{ key: 'game_name', order: 'desc' }],
            search: '', 
            compatibility: {},
            headers: [
          {
            title: 'Game Name',
            align: 'start',
            sortable: false,
            value: 'game_name',
          },
          { title: 'Game Region', sortable: false,value: 'game_region' },
          { title: 'Base Game', sortable: false,value: 'base_name' },
          { title: 'Base Region', sortable: false,value: 'base_region' },
          { title: 'Status', sortable: false,value: 'status' },
          { title: 'Notes', sortable: false, value: 'notes' },
        ],
        }
    },
    async created() {
        let json = await this.getNDSJson();
        this.compatibility = json;
        await this.fixCompat();
    },
    methods: {
        getNDSJson() {
            return fetch('https://raw.githubusercontent.com/UWUVCI-PRIME/UWUVCI-Compatibility/main/NDSCompat.json')
                .then(response => response.json())
                .then(data => data)
        },
        fixCompat(){
          this.compatibility.compatibility.forEach(x => {
            if(x.status == 2){
              x.status = "working"
            }
            if(x.status == 1){
              x.status = "issues"
            }
            if(x.status == 0){
              x.status = "broken"
            }
            
          });
          this.compatibility.compatibility.sort(((a, b) => (a.game_name > b.game_name ? 1 : -1)))
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


