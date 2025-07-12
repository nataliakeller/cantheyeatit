<template>
  <v-container fluid>
    <v-alert v-if="error" type="error" class="mb-4" :text="error" />
    <v-row>
      <v-col
        v-for="food in paginatedFoods"
        :key="food.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="h-100">
          <v-card-title class="text-h6">
            {{ food.name }}
          </v-card-title>

          <v-card-subtitle class="ma-1">
            {{ food.description }}
          </v-card-subtitle>

          <v-card-text>
            <v-chip
              size="small"
              class="ma-1"
              :color="food.can_eat ? 'success' : 'error'"
              variant="tonal"
            >
              {{ food.can_eat ? 'They can eat this' : 'Not recommended' }}
            </v-chip>

            <v-chip
              size="small"
              class="ma-1"
              :color="getQuantityColor(food.quantity)"
              variant="outlined"
            >
              {{ getQuantityLabel(food.quantity) }}
            </v-chip>
            <div class="ma-1 mt-2">
              <v-chip
                v-if="food.preparation?.length"
                size="x-small"
                prepend-icon="mdi-food-apple"
                :color="getPreparationColor(
                  food.preparation.length === 1
                    ? food.preparation[0]
                    : 'multiple'
                )"
                variant="tonal"
                class="pa-3"
              >
                {{ getPreparationLabel(food.preparation) }}
              </v-chip>
            </div>

          </v-card-text>

          <v-card-actions>
            <v-btn :to="`/food/${food.id}`" color="primary" variant="text">
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :total-visible="5"
        class="mt-4"
      />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
const { foods: foodsApi } = useApi()

const foods = ref([])
const error = ref('')

// Pagination state
const page = ref(1)
const itemsPerPage = ref(8) // number of cards per page

const paginatedFoods = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value
  return foods.value.slice(start, start + itemsPerPage.value)
})

const pageCount = computed(() => {
  return Math.ceil(foods.value.length / itemsPerPage.value)
})

const quantityList = ref([
  { value: 'free',     label: 'A volontà' },
  { value: 'moderate', label: 'Con moderazione' },
  { value: 'rarely',   label: 'Rarely' },
  { value: 'treat',    label: 'Premietto' },
  { value: 'never',    label: 'Never' }
])

const getQuantityLabel = (value) => {
  const found = quantityList.value.find(q => q.value === value)
  return found ? found.label : 'Unknown'
}

const getQuantityColor = (quantity) => {
  switch (quantity) {
    case 'free':
      return 'success'
    case 'moderate':
      return 'warning'
    case 'rarely':
      return 'deep-orange'
    case 'treat':
      return 'pink-accent-1'
    case 'never':
      return 'error'
    default:
      return 'grey'
  }
}

const preparationList = ref([
  { value: 'raw', label: 'Crudo' },
  { value: 'cooked', label: 'Cotto' },
  { value: 'dried', label: 'Essiccato' },
  { value: 'canned', label: 'In scatola' },
  { value: 'frozen', label: 'Congelato' },
  { value: 'multiple', label: 'Più metodi' }
])

const getPreparationColor = (type) => {
  switch (type) {
    case 'raw': return 'teal'
    case 'cooked': return 'lime'
    case 'dried': return 'brown'
    case 'canned': return 'blue-grey'
    case 'frozen': return 'cyan'
    case 'multiple': return 'purple'
    default: return 'grey'
  }
}

const getPreparationLabel = (prepArray) => {
  if (!prepArray || prepArray.length === 0) return 'Non specificato'

  return prepArray
    .map(value => {
      const item = preparationList.value.find(p => p.value === value)
      return item ? item.label : value
    })
    .join(', ')
}

onMounted(async () => {
  try {
    const res = await foodsApi.getAll()
    foods.value = res || []
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load food list.'
  }
})
</script>
