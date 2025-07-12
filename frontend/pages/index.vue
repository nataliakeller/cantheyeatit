<template>
    <v-card style="">
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

                        <div class="mt-2">
                            <v-chip prepend-icon="mdi-food-apple" :color="getPreparationColor(
                                selectedFoodData.preparation.length === 1
                                    ? selectedFoodData.preparation[0]
                                    : 'multiple'
                            )" variant="tonal" size="small" class="text-white">
                                {{ getPreparationLabel(selectedFoodData.preparation) }}
                            </v-chip>
                        </div>

                    </v-card-text>
                    <v-card-actions>
                        <v-chip variant="elevated" :color="selectedFoodData.can_eat ? 'success' : 'error'"
                            :text="selectedFoodData.can_eat ? 'Safe to eat' : 'Not recommended'" />
                        <v-chip variant="tonal" :color="getQuantityColor(selectedFoodData.quantity)"
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
        case 'raw': return 'green'
        case 'cooked': return 'orange'
        case 'dried': return 'brown'
        case 'canned': return 'blue-grey'
        case 'frozen': return 'cyan'
        case 'multiple': return 'purple'
        default: return 'grey'
    }
}

const getPreparationLabel = (prepArray) => {
    if (!prepArray || prepArray.length === 0) return 'Sconosciuto'

    return prepArray
        .map(value => {
            const item = preparationList.value.find(p => p.value === value)
            return item ? item.label : value
        })
        .join(', ')
}


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