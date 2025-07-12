<template>
    <v-card style="">
        <v-card-title class="text-h5">
            Can they eat it?
        </v-card-title>

        <v-card-text>
            <v-autocomplete v-model="selectedFood" label="Type to search" placeholder="Search for food" clearable
                hide-details variant="solo-filled" :items="foodItems" item-title="name" item-value="id"
                :loading="loading">
            </v-autocomplete>

            <div v-if="selectedFoodData" class="mt-4">
                <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-2" />

                <v-card>
                    <v-card-title class="text-h6">
                        {{ selectedFoodData.name }}
                    </v-card-title>
                    <v-card-text>
                        {{ selectedFoodData.description }}
                    </v-card-text>
                    <v-card-actions>
                        <v-chip :color="selectedFoodData.can_eat ? 'success' : 'error'"
                            :text="selectedFoodData.can_eat ? 'Safe to eat' : 'Not recommended'" />
                        <v-chip :color="getQuantityColor(selectedFoodData.quantity)"
                            :text="getQuantityLabel(quantityList, selectedFoodData.quantity)" />
                    </v-card-actions>
                </v-card>
            </div>

            <div v-if="error" class="mt-4">
                <v-alert type="error" :text="error" />
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
const { foods } = useApi()

const foodItems = ref([])
const selectedFood = ref(null)
const selectedFoodData = ref(null)
const loading = ref(false)
const error = ref('')
const quantityList = ref([
    { value: 'free', label: 'Freely' }, 
    { value: 'moderate', label: 'In moderation' }, 
    { value: 'rarely', label: 'Rarely' },
    { value: 'never', label: 'Never' }
])

const getQuantityColor = (quantity) => {
    switch (quantity) {
        case 'free':
            return 'success'
        case 'moderate':
            return 'warning'
        case 'rarely':
            return 'deep-orange'
        case 'never':
            return 'error'
        default:
            return 'grey'
    }
}

const getQuantityLabel = (quantityArray, searchValue) => {
    const item = quantityArray.find(q => q.value === searchValue)
    return item ? item.label : 'Unknown'
}

// Fetch foods on component mount
onMounted(async () => {
    await fetchFoods()
})

// Watch for selected food changes
watch(selectedFood, async (newValue) => {
    if (newValue) {
        await fetchFoodDetails(newValue)
    } else {
        selectedFoodData.value = null
    }
})

const fetchFoods = async () => {
    try {
        loading.value = true
        error.value = ''

        const response = await foods.getAll()

        foodItems.value = response || []
    } catch (err) {
        error.value = `Failed to fetch foods: ${err.message}`
        console.error('Error fetching foods:', err)
    } finally {
        loading.value = false
    }
}

const fetchFoodDetails = async (foodId) => {
    loading.value = true
    try {
        const response = await foods.getById(foodId)
        selectedFoodData.value = response
    } catch (err) {
        error.value = `Failed to fetch food details: ${err.message}`
        console.error('Error fetching food details:', err)
    } finally {
        loading.value = false
    }
}
</script>