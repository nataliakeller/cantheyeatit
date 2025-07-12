<template>
  <v-container fluid>
    <v-alert v-if="error" type="error" class="mb-4" :text="error" />
    <v-row>
      <v-col v-for="food in foods" :key="food.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="h-100">
          <v-card-title class="text-h6">
            {{ food.name }}
          </v-card-title>

          <v-card-subtitle class="ma-1">
            {{ food.description }}
          </v-card-subtitle>

          <v-card-text>
            <v-chip size="small" class="ma-1" :color="food.can_eat ? 'success' : 'error'" variant="tonal">
              {{ food.can_eat ? 'They can eat this' : 'Not recommended' }}
            </v-chip>

            <v-chip size="small" class="ma-1" :color="getQuantityColor(food.quantity)" variant="outlined">
              {{ getQuantityLabel(food.quantity) }}
            </v-chip>
            <div class="ma-1 mt-2">
              <v-chip v-if="food.preparation?.length" size="x-small" prepend-icon="mdi-food-apple" :color="getPreparationColor(
                food.preparation.length === 1
                  ? food.preparation[0]
                  : 'multiple'
              )" variant="tonal" class="pa-3">
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
  </v-container>
</template>

<script setup>
const { foods: foodsApi } = useApi()

const foods = ref([])
const error = ref('')

const quantityList = [
  { value: 'free', label: 'Freely' },
  { value: 'moderate', label: 'In moderation' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'never', label: 'Never' }
]

const getQuantityLabel = (value) => {
  const found = quantityList.find(q => q.value === value)
  return found ? found.label : 'Unknown'
}

const getQuantityColor = (value) => {
  switch (value) {
    case 'free': return 'success'
    case 'moderate': return 'warning'
    case 'rarely': return 'deep-orange'
    case 'never': return 'error'
    default: return 'grey'
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
