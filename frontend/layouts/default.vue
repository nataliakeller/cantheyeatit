<template>
    <v-app>
        <v-toolbar color="grey-lighten-3" title="Can they eat it?">
             <v-btn stacked @click="navigateTo('/')">
                    <v-icon icon="mdi-home"></v-icon>
                Home
            </v-btn>
            <v-btn stacked @click="navigateTo('/food')">
                    <v-icon icon="mdi-list-box"></v-icon>
                Lista
            </v-btn>

            <v-btn stacked @click="navigateTo('/food/new')">
                    <v-icon icon="mdi-plus-box"></v-icon>
                Nuovo
            </v-btn>
        </v-toolbar>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const navigateTo = (path) => {
    router.push(path);
};
</script>