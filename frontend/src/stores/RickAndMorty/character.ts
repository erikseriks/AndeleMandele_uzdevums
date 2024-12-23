import { defineStore } from 'pinia'

interface ResponseInterface {
  info: {
    count: number
    pages: number
  }
  results: SingleItem[]
}

interface SingleItem {
  id: number
  name: string
  status: string
  species: string
  image: string
}

const baseUrl = '/api/rick-and-morty/character/'

export const useCharacterStore = defineStore('character', {
  state: () => ({
    response: {} as ResponseInterface | void,
    singleItem: {} as SingleItem,
    items: [] as SingleItem[],
    count: 826,
    totalPages: 42,
    pageLoaded: 0,
    nextPage: 1,
    scrollPosition: 0,
  }),

  actions: {
    async fetchList() {
      if (this.nextPage <= this.pageLoaded || this.nextPage > this.totalPages) return

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
