<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5">
                {{ isLoading ? 'Loading...' : isViewMode ? 'Food Details' : 'Edit Food Item' }}
            </v-card-title>

            <v-card-text>
                <div v-if="error" class="mb-4">
                    <v-alert type="error" :text="error" />
                </div>

                <v-form ref="form" v-model="valid" lazy-validation v-if="!isLoading">
                    <v-text-field v-model="food.name" label="Food Name" :readonly="isViewMode"
                        :rules="[v => !!v || 'Food name is required']" required />

                    <v-textarea v-model="food.description" label="Description" :readonly="isViewMode"
                        :rules="[v => !!v || 'Food description is required']" rows="3" required />

                    <v-select v-model="food.quantity" :items="quantityList" item-title="label" item-value="value"
                        label="Quantity" :readonly="isViewMode" :rules="[v => !!v || 'Please select a quantity']"
                        required />

                    <v-switch v-model="food.can_eat" color="success" inset hide-details class="mb-4"
                        :readonly="isViewMode" :label="food.can_eat ? 'Safe to eat' : 'Not recommended'" />

                    <div v-if="!isViewMode" class="d-flex gap-2">
                        <v-btn @click="submitForm" color="primary" :loading="isSubmitting"
                            :disabled="!valid || isSubmitting">
                            Update Food
                        </v-btn>

                        <v-btn class="mx-3" @click="goBack" color="grey" variant="outlined" :disabled="isSubmitting">
                            Cancel
                        </v-btn>

                        <v-btn @click="deleteFood" color="error" variant="outlined" :loading="isDeleting"
                            :disabled="isSubmitting || isDeleting">
                            Delete
                        </v-btn>
                    </div>
                </v-form>

                <div v-else class="text-center py-4">
                    <v-progress-circular indeterminate color="primary" />
                    <p class="mt-2">Loading food details...</p>
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { foods } = useApi()

const form = ref(null)
const valid = ref(false)
const isLoading = ref(true)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const error = ref('')

const food = ref({
    id: null,
    name: '',
    description: '',
    quantity: '',
    can_eat: false
})

const quantityList = [
    { value: 'free', label: 'Freely' },
    { value: 'moderate', label: 'In moderation' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'never', label: 'Never' }
]

const foodId = route.params.id
const isViewMode = computed(() => route.query.view !== undefined)

onMounted(async () => {
    await loadFood()
})

const loadFood = async () => {
    try {
        isLoading.value = true
        error.value = ''

        const response = await foods.getById(foodId)

        if (response.food) {
            food.value = {
                id: response.food.id,
                name: response.food.name,
                description: response.food.description,
                quantity: response.food.quantity || '',
                can_eat: response.food.can_eat === 1 || response.food.can_eat === true
            }
        } else {
            error.value = 'Food not found'
        }
    } catch (err) {
        error.value = `Failed to load food: ${err.message}`
        console.error('Error loading food:', err)
    } finally {
        isLoading.value = false
    }
}

const submitForm = async () => {
    if (!form.value?.validate()) {
        return
    }

    try {
        isSubmitting.value = true
        error.value = ''

        const payload = {
            name: food.value.name,
            description: food.value.description,
            quantity: food.value.quantity,
            can_eat: food.value.can_eat ? 1 : 0
        }

        await foods.update(foodId, payload)
        router.push('/')
    } catch (err) {
        error.value = `Failed to update food: ${err.message}`
        console.error('Error updating food:', err)
    } finally {
        isSubmitting.value = false
    }
}

const deleteFood = async () => {
    if (!confirm('Are you sure you want to delete this food item? This action cannot be undone.')) {
        return
    }

    try {
        isDeleting.value = true
        error.value = ''

        await foods.delete(foodId)
        router.push('/')
    } catch (err) {
        error.value = `Failed to delete food: ${err.message}`
        console.error('Error deleting food:', err)
    } finally {
        isDeleting.value = false
    }
}

const goBack = () => {
    router.back()
}
</script>
