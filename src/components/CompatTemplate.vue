<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height mx-auto" max-width="xs:370 700">
      <div>
        <!-- Title Card -->
        <v-row>
          <v-col cols="12">
            <v-card class="py-4" color="surface-variant" rounded="lg" variant="outlined">
              <v-card-text class="xs:text-sm-body-2 text-h5 font-weight-bold" style="text-align:center">
                UWUVCI {{ title }} Compatibility List
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

        <!-- User Submitted Warning -->
        <v-row>
          <v-col cols="12">
            <v-card class="py-1" color="yellow" rounded="lg" variant="tonal">
              <v-card-text class="xs:text-sm-body-3 text-h5 font-weight-bold" style="text-align:center">
                🛈 All Entries in this List are User-Submitted and might not be 100% Correct. 
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Padding Div -->
        <div class="py-4"></div>

        <!-- Search Box -->
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>

        <!-- Data Table with Row Striping -->
        <v-data-table
          :headers="headers"
          :items="compatibility.compatibility"
          :search="search"
          class="striped-table"
        >
          <!-- Custom row content with conditional row striping -->
          <template v-slot:item="{ item, index }">
            <tr :class="index % 2 === 0 ? 'striped-row' : ''">
              <td>{{ item.game_name }}</td>
              <td>{{ item.game_region }}</td>
              <td>{{ item.base_name }}</td>
              <td>{{ item.base_region }}</td>
              <td>
                <v-chip
                  v-if="item.status == 'working'"
                  color="green"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  Working
                </v-chip>
                <v-chip
                  v-else-if="item.status == 'issues'"
                  color="yellow"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  Issues
                </v-chip>
                <v-chip
                  v-else
                  color="red"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  Broken
                </v-chip>
              </td>
              <td v-if="wii == true">
                <v-chip
                  v-if="item.gamepad == 2"
                  color="green"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  Supported
                </v-chip>
                <v-chip
                  v-else-if="item.gamepad == 1"
                  color="yellow"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  Issues
                </v-chip>
                <v-chip
                  v-else
                  color="red"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  Unsupported
                </v-chip>
              </td>
              <td>
                <p v-if="item.notes != 'None'">
                  <span v-linkify="item.notes"></span>
                </p>
              </td>
            </tr>
          </template>
        </v-data-table>

      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { fetchCompatibilityData, fixCompatibilityData } from '@/services/compatibilityService';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const search = ref('');
const wii = ref(false);
const compatibility = ref({});
 const headers = ref([
  { title: 'Game Name', align: 'start', sortable: true, value: 'game_name' },
  { title: 'Game Region', sortable: true, value: 'game_region' },
  { title: 'Base Game', sortable: true, value: 'base_name' },
  { title: 'Base Region', sortable: true, value: 'base_region' },
  { title: 'Status', sortable: true, value: 'status' },
  { title: 'Notes', sortable: false, value: 'notes' },
]);

// Function to capitalize the first letter of the console name (e.g., ndscompat -> NDS)
function formatTitleFromRoute(routeName) {
  return routeName.charAt(0).toUpperCase() + routeName.slice(1, 3).toUpperCase(); // For "ndscompat" => "NDS"
}

const title = ref('');
const jsonFileName = ref('');

// Function to fetch the compatibility data
async function loadCompatibilityData() {
  try {
    const data = await fetchCompatibilityData(jsonFileName.value);  // Fetch JSON data dynamically
    if (data) {
      compatibility.value = data;
      fixCompatibilityData(compatibility.value);
    }
  } catch (error) {
    console.error("Error fetching compatibility data:", error);
  }
}

// Initialize title and jsonFileName, and then fetch the data
function initializePageData() {
  const routeCompat = route.params.consolecompat; // Get consolecompat from route
  title.value = formatTitleFromRoute(routeCompat);
  
  if( title.value.toLowerCase().includes("wii") ){
    headers.value = [
      { title: 'Game Name', align: 'start', sortable: true, value: 'game_name' },
      { title: 'Game Region', sortable: true, value: 'game_region' },
      { title: 'Base Game', sortable: true, value: 'base_name' },
      { title: 'Base Region', sortable: true, value: 'base_region' },
      { title: 'Status', sortable: true, value: 'status' },
      { title: 'Gamepad Support', sortable: true, value: 'gamepad' },
      { title: 'Notes', sortable: false, value: 'notes' },
    ];
    wii.value = true;
  }
  jsonFileName.value = `${title.value}Compat.json`;  // Construct the JSON filename
  loadCompatibilityData();  // Fetch compatibility data
  if(title.value.toLowerCase().includes("tg")){
    title.value = "TG16";
  }else if(title.value.toLowerCase().includes("sne")){
    title.value = "SNES";
  }
}

// Fetch data on component mount after initializing page data
onMounted(() => {
  initializePageData();  // Run initialization on mount
});

// Watch for route changes and update the title and json file name dynamically
watch(() => route.params.consolecompat, () => {
  title.value = formatTitleFromRoute(route.params.consolecompat);  // Update title for the new route
  jsonFileName.value = `${title.value}Compat.json`;  // Update JSON filename
  loadCompatibilityData();  // Fetch compatibility data for the new route
});
</script>
