<template>
  <v-container class="fill-height">
    <v-responsive class="align-center fill-height mx-auto" max-width="700">
      <div>
        <!-- Title Card -->
        <v-row>
          <v-col cols="12">
            <v-card class="py-4" color="surface-variant" rounded="lg" variant="outlined">
              <v-card-text class="text-center text-h5 font-weight-bold">
                UWUVCI {{ title }} Compatibility List
              </v-card-text>
              <v-overlay :model-value="loading" opacity=".12" scrim="primary" contained>
                <v-progress-circular indeterminate color="primary" />
              </v-overlay>
            </v-card>
          </v-col>
        </v-row>

        <!-- User Submitted Warning -->
        <v-row>
          <v-col cols="12">
            <v-card class="py-1" color="yellow" rounded="lg" variant="tonal">
              <v-card-text class="text-center text-body-2 font-weight-bold">
                🛈 All Entries in this List are user-submitted and might not be 100% Correct.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <div class="py-4"></div>

        <!-- Search -->
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        />

        <!-- Error Alert -->
        <v-alert v-if="errorMessage" type="error" border="start" class="my-2">
          {{ errorMessage }}
        </v-alert>

        <!-- Data Table -->
        <v-data-table
          :headers="headers"
          :items="compatibilityData"
          :search="search"
          class="striped-table"
        >
          <template v-slot:no-data>
            <v-alert type="info" border="start" text>
              No results found for "{{ search }}".
            </v-alert>
          </template>

          <template v-slot:item="{ item, index }">
            <tr :class="index % 2 === 0 ? 'striped-row' : ''">
              <td>{{ item.game_name }}</td>
              <td>{{ item.game_region }}</td>
              <td>{{ item.base_name }}</td>
              <td>{{ item.base_region }}</td>
              <td>
                <v-chip
                  :color="statusColor(item.status)"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  {{ formatStatus(item.status) }}
                </v-chip>
              </td>

              <!-- Wii Gamepad Support -->
              <td v-if="wii">
                <v-chip
                  :color="gamepadColor(item.gamepad)"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  {{ gamepadLabel(item.gamepad) }}
                </v-chip>
              </td>

              <!-- Render Size Column -->
              <td v-if="renderSizeEnabled">
                <v-chip
                  :color="renderSizeColor(item.rendersize)"
                  class="text-uppercase"
                  size="small"
                  label
                >
                  {{ renderSizeLabel(item.rendersize) }}
                </v-chip>
              </td>

              <!-- Notes -->
              <td>
                <p v-if="item.notes && item.notes !== 'None'" class="text-truncate" :title="item.notes">
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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchCompatibilityData, fixCompatibilityData } from '@/services/compatibilityService';

const route = useRoute();

const search = ref('');
const wii = ref(false);
const renderSizeEnabled = ref(false);
const loading = ref(false);
const errorMessage = ref('');
const compatibilityData = ref([]);
const title = ref('');
const jsonFileName = ref('');

const headers = ref([]);

/* ------------------------- Helper Functions ------------------------- */
function formatTitleFromRoute(routeName) {
  const mappings = {
    nds: 'NDS',
    gba: 'GBA',
    n64: 'N64',
    sne: 'SNES',
    nes: 'NES',
    tg16: 'TG16',
    msx: 'MSX',
    wii: 'WII',
  };
  const key = Object.keys(mappings).find(k => routeName.toLowerCase().includes(k));
  return key ? mappings[key] : routeName.toUpperCase();
}

function statusColor(status) {
  return status === 'working' ? 'green'
       : status === 'issues' ? 'yellow'
       : 'red';
}

function formatStatus(status) {
  if (!status) return 'Unknown';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function gamepadColor(val) {
  return val == 2 ? 'green' : val == 1 ? 'yellow' : 'red';
}
function gamepadLabel(val) {
  return val == 2 ? 'Supported' : val == 1 ? 'Issues' : 'Unsupported';
}

function renderSizeColor(size) {
  return size === 'native' ? 'green'
       : size === 'upscaled' ? 'yellow'
       : 'red';
}
function renderSizeLabel(size) {
  return size === 'native' ? 'Native'
       : size === 'upscaled' ? 'Upscaled'
       : 'Unknown';
}

/* ------------------------- Core Data Load ------------------------- */
async function loadCompatibilityData() {
  loading.value = true;
  errorMessage.value = '';
  try {
    const data = await fetchCompatibilityData(jsonFileName.value);
    compatibilityData.value = data?.compatibility ?? [];
    fixCompatibilityData(compatibilityData.value);
  } catch (err) {
    errorMessage.value = 'Failed to load compatibility data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

/* ------------------------- Initialization ------------------------- */
function initializePageData() {
  const routeCompat = route.params.consolecompat;
  title.value = formatTitleFromRoute(routeCompat);

  // Reset flags
  wii.value = false;
  renderSizeEnabled.value = false;

  if (title.value.toLowerCase().includes('wii')) {
    wii.value = true;
  } else if (['n64', 'snes', 'gba', 'nds'].includes(title.value.toLowerCase())) {
    renderSizeEnabled.value = true;
  }

  // Dynamic headers
  headers.value = [
    { title: 'Game Name', align: 'start', sortable: true, value: 'game_name' },
    { title: 'Game Region', sortable: true, value: 'game_region' },
    { title: 'Base Game', sortable: true, value: 'base_name' },
    { title: 'Base Region', sortable: true, value: 'base_region' },
    { title: 'Status', sortable: true, value: 'status' },
  ];

  if (wii.value) {
    headers.value.push({ title: 'Gamepad Support', sortable: true, value: 'gamepad' });
  } else if (renderSizeEnabled.value) {
    headers.value.push({ title: 'Render Size', sortable: true, value: 'rendersize' });
  }

  headers.value.push({ title: 'Notes', sortable: false, value: 'notes' });

  jsonFileName.value = `${title.value}Compat.json`;
  loadCompatibilityData();
}

onMounted(initializePageData);

watch(() => route.params.consolecompat, initializePageData);
</script>

<style scoped>
.striped-row {
  background-color: rgba(255, 255, 255, 0.04);
}
.text-truncate {
  max-width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
