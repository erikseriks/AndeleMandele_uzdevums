<script setup lang="ts">
import router from '@/router'
import { useCharacterStore } from '@/stores/RickAndMorty/character.ts'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, onUnmounted, onUpdated } from 'vue'

const characterStore = useCharacterStore()
const { items, pageLoaded, scrollPosition } = storeToRefs(characterStore)

function viewItem(id: number) {
  scrollPosition.value = document.documentElement.scrollTop
  router.push({ name: 'character', params: { id: id } })
}

function isBottom() {
  return (
    document.documentElement.scrollTop + window.innerHeight + 1000 >
    document.documentElement.scrollHeight
  )
}

function scrollListener() {
  if (isBottom()) {
    characterStore.fetchList()

    window.removeEventListener('scroll', scrollListener)

    setTimeout(() => {
      if (isBottom()) {
        characterStore.fetchList()
      }

      window.addEventListener('scroll', scrollListener)
    }, 500)
  }
}

onBeforeMount(() => {
  if (items.value.length) return
  characterStore.fetchList()
})

onMounted(() => {
  window.scrollTo(0, scrollPosition.value)
  window.addEventListener('scroll', scrollListener)
})

onUpdated(() => {
  if (pageLoaded.value < 2) {
    window.scrollTo(0, 0)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollListener)
})
</script>

<template>
  <div class="clickable list" v-for="item in items" v-bind:key="item.id" @click="viewItem(item.id)">
    <img :src="item.image" alt="item image" />
  </div>
</template>
