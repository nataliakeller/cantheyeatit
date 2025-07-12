<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5">Add New Food Item</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="food.name" label="Food Name"
                        :rules="[v => !!v || 'Food name is required']"></v-text-field>

                    <v-text-field v-model="food.description" label="Description"
                        :rules="[v => !!v || 'Food description is required']"></v-text-field>
                    <v-select v-model="food.quantity" :items="quantityList" :item-title="'label'" :item-value="'value'"
                        label="Quantity" :rules="[v => !!v || 'Please select a quantity']"></v-select>
                    <v-switch class="pb-3" color="green" v-model="food.can_eat" inset hide-details
                        :label="food.can_eat ? 'They can eat this food' : 'They should not eat this food'"></v-switch>

                    <v-btn @click="submitForm" color="primary">Submit</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const { foods } = useApi()

const form = ref(null)
const valid = ref(false)
const food = ref({
    name: '',
    description: '',
    quantity: null,
    can_eat: true
})

const quantityList = [
    { value: 'free', label: 'Freely' },
    { value: 'moderate', label: 'In moderation' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'never', label: 'Never' }
]

const submitForm = async () => {
    if (form.value.validate()) {
        try {
            const payload = {
                ...food.value,
                can_eat: food.value.can_eat ? 1 : 0 // convert boolean to numeric
            }

            console.log('Submitting food item:', payload)
            await foods.create(payload)
            router.push('/')
        } catch (error) {
            console.error('Error creating food item:', error)
            alert('Failed to create food item. Please try again.')
        }
    } else {
        alert('Please correct the errors in the form.')
    }
}

</script>