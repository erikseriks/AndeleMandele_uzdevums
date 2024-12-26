import type {SingleItemInterface} from "@/types/RickAndMorty/SingleItemInterface.ts";

export interface ResponseInterface {
  info: {
    count: number
    pages: number
  }
  results: SingleItemInterface[]
}
