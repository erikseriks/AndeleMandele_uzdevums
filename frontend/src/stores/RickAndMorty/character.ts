import { defineStore } from 'pinia'
import type { SingleItemInterface } from '@/types/RickAndMorty/SingleItemInterface.ts'
import type { ResponseInterface } from '@/types/RickAndMorty/ResponseInterface.ts'

const baseUrl = '/api/rick-and-morty/character/'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    response: {} as ResponseInterface | void,
    singleItem: {} as SingleItemInterface,
    items: [] as SingleItemInterface[],
    count: 826,
    totalPages: 42,
    pageLoaded: 0,
    nextPage: 1,
    listLoading: false,
  }),

  actions: {
    async fetchList() {
      if (this.listLoading || this.nextPage > this.totalPages) return

      this.listLoading = true

      this.response = await fetch(baseUrl + '?page=' + this.nextPage)
        .then(function (response) {
          if (response.ok) {
            return response.json()
          }

          return Promise.reject(response.status)
        })
        .then((result) => {
          this.pageLoaded = this.nextPage
          this.nextPage = this.nextPage + 1
          this.items = this.items.concat(result.results)
          this.count = result.info.count
          this.totalPages = result.info.pages
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.listLoading = false
        })
    },

    async fetchSingle(id = 1) {
      if (this.items[id - 1]) {
        this.singleItem = this.items[id - 1]
      } else {
        this.response = await fetch(baseUrl + id)
          .then(function (response) {
            if (response.ok) {
              return response.json()
            }

            return Promise.reject(response.status)
          })
          .then((result) => {
            this.singleItem = result
          })
          .catch((e) => {
            console.error(e)
          })
      }
    },
  },
})
