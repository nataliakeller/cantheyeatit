<template>
  <v-container fluid>
    <v-alert v-if="error" type="error" class="mb-4" :text="error" />
    <v-row>
      <v-col v-for="food in foods" :key="food.id" cols="12" sm="6" md="4" lg="3">
        <v-card class="h-100">
          <v-card-title class="text-h6">
            {{ food.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ food.description }}
          </v-card-subtitle>

          <v-card-text>
            <v-chip class="ma-1" :color="food.can_eat ? 'success' : 'error'" variant="elevated">
              {{ food.can_eat ? 'They can eat this' : 'Not recommended' }}
            </v-chip>

            <v-chip class="ma-1" :color="getQuantityColor(food.quantity)" variant="outlined">
              {{ getQuantityLabel(food.quantity) }}
            </v-chip>
          </v-card-text>

          <v-card-actions>
            <v-btn :to="`/food/${food.id}?view`" color="primary" variant="text">
              View Details
            </v-btn>
            <v-btn :to="`/food/${food.id}?edit`" color="secondary" variant="text">
              Edit
            </v-btn>

            <v-btn @click="deleteFood(food.id)" color="error" variant="text">
              Delete
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

const deleteFood = async (id) => {
  if (!confirm('Are you sure you want to delete this item?')) return;
  try {
    await foodsApi.delete(id)
    foods.value = foods.value.filter(food => food.id !== id)
  } catch (err) {
    console.error(err)
    error.value = 'Failed to delete food item.'
  }
}

onMounted(async () => {
  try {
    const res = await foodsApi.getAll()
    foods.value = res.foods || []
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load food list.'
  }
})
</script>
