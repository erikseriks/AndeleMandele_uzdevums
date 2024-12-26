<script setup lang="ts">
import ViewItem from '@/components/RickAndMorty/ViewItem.vue'
import { RouterLink, useRoute } from 'vue-router'
import { useCharacterStore } from '@/stores/RickAndMorty/character.ts'
import { onMounted } from 'vue'

const route = useRoute()
const id = parseInt(route.params.id as string)
const characterStore = useCharacterStore()

onMounted(() => {
  characterStore.fetchSingle(id)
})
</script>

<template>
  <header>
    <nav>
      <h1>
        <RouterLink :to="'/#' + id">Uz sarakstu</RouterLink>
      </h1>
    </nav>
  </header>

  <view-item />
</template>
