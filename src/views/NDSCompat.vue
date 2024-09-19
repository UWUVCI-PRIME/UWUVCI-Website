<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height mx-auto" max-width="xs:370 700">
      <div>

        <!-- Title Card -->
        <v-row>
          <v-col cols="12">
            <v-card class="py-4" color="surface-variant" rounded="lg" variant="outlined">
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
// Import the global compatibility service
import { fetchCompatibilityData, fixCompatibilityData } from '@/services/compatibilityService';
import { ref, onMounted } from 'vue';

const search = ref('');  // Bound to the search field
const compatibility = ref({});  // Holds compatibility data
const headers = ref([
  { title: 'Game Name', align: 'start', sortable: true, value: 'game_name' },
  { title: 'Game Region', sortable: true, value: 'game_region' },
  { title: 'Base Game', sortable: true, value: 'base_name' },
  { title: 'Base Region', sortable: true, value: 'base_region' },
  { title: 'Status', sortable: true, value: 'status' },
  { title: 'Notes', sortable: false, value: 'notes' },
]);

// Fetch and process compatibility data when the component is mounted
onMounted(async () => {
  const data = await fetchCompatibilityData();  // Fetch JSON data dynamically
  if (data) {
    compatibility.value = data;  // Assign fetched data to compatibility ref
    fixCompatibilityData(compatibility.value);  // Process and fix data
  }
});
</script>
