<template>
    <v-container class="py-6">
        <v-card class="mx-auto" max-width="600" elevation="2" rounded="lg">
            <v-card-title class="text-h5 font-weight-bold">
                {{ isLoading ? 'Loading...' : food?.name || 'Food Details' }}
            </v-card-title>

            <v-divider />

            <v-card-text>
                <div v-if="error">
                    <v-alert type="error" :text="error" variant="outlined" />
                </div>

                <div v-else-if="isLoading" class="text-center my-6">
                    <v-progress-circular indeterminate color="primary" size="40" />
                    <p class="mt-3">Loading food details...</p>
                </div>

                <div v-else-if="food">
                    <v-row align="center">
                        <v-col cols="12">
                            <v-chip :color="food.can_eat ? 'green' : 'red'" dark size="large" prepend-icon="mdi-food">
                                {{ food.can_eat ? 'Safe to eat' : 'Not recommended' }}
                            </v-chip>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12">
                            <h3>Description</h3>
                            <p class="text-body-1">{{ food.description }}</p>
                        </v-col>

                         <v-col cols="12" v-if="food.preparation?.length">
                            <h3 class="mb-2">Preparation</h3>
                            <p class="text-body-1">
                                {{ food.preparation.map(preparationLabel).join(', ') }}
                            </p>
                        </v-col>

                        <v-col cols="12">
                            <h3 class="mb-2">Quantity</h3>
                            <v-chip :color="quantityColor(food.quantity)" text-color="white" class="ma-0" size="large"
                                prepend-icon="mdi-scale-balance">
                                {{ quantityLabel(food.quantity) }}
                            </v-chip>
                        </v-col>
                    </v-row>
                </div>

                <div v-else>
                    <p>Food not found.</p>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-btn to="/" color="secondary">Back</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const { foods } = useApi()

const food = ref(null)
const isLoading = ref(true)
const error = ref('')

const quantityList = ref([
  { value: 'free',     label: 'A volontà' },
  { value: 'moderate', label: 'Con moderazione' },
  { value: 'rarely',   label: 'Rarely' },
  { value: 'treat',    label: 'Premietto' },
  { value: 'never',    label: 'Never' }
])

const preparationList = [
    { value: 'raw', label: 'Crudo' },
    { value: 'cooked', label: 'Cotto' },
    { value: 'dried', label: 'Essiccato' },
    { value: 'canned', label: 'In scatola' },
    { value: 'frozen', label: 'Congelato' },
    { value: 'multiple', label: 'Più metodi' }
]

const quantityLabel = (value) => {
    const found = quantityList.find(q => q.value === value)
    return found ? found.label : value
}

const quantityColor = (value) => {
    switch (value) {
        case 'free': return 'green'
        case 'moderate': return 'amber'
        case 'treat': return 'pink-accent-1'
        case 'rarely': return 'deep-orange'
        case 'never': return 'red'
        default: return 'grey'
    }
}

const preparationLabel = (value) => {
    const found = preparationList.find(p => p.value === value)
    return found ? found.label : value
}

const preparationColor = (type) => {
    switch (type) {
        case 'raw': return 'teal'
        case 'cooked': return 'orange'
        case 'dried': return 'brown'
        case 'canned': return 'blue-grey'
        case 'frozen': return 'cyan'
        case 'multiple': return 'purple'
        default: return 'grey'
    }
}

onMounted(async () => {
    try {
        isLoading.value = true
        const result = await foods.getById(Number(route.params.id))
        if (result) {
            food.value = result
        } else {
            error.value = 'Food not found.'
        }
    } catch (err) {
        error.value = `Error loading food: ${err.message}`
        console.error(err)
    } finally {
        isLoading.value = false
    }
})
</script>
