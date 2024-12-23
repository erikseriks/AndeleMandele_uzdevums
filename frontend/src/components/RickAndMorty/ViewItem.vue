<script setup lang="ts">
import { useCharacterStore } from '@/stores/RickAndMorty/character.ts'
import { storeToRefs } from 'pinia'

const characterStore = useCharacterStore()
const { singleItem } = storeToRefs(characterStore)
</script>

<template>
  <div v-if="Object.keys(singleItem).length">
    <img :src="singleItem.image" alt="item image" />
    <p>Name: {{ singleItem.name }}</p>
    <p>Species: {{ singleItem.species }}</p>
    <p>Status: {{ singleItem.status }}</p>
  </div>
</template>
