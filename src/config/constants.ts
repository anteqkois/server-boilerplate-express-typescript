import { Lang } from "../types"

export const GPT_35_TURBO = 'gpt-3.5-turbo'
export const GPT_4 = 'gpt-4'
export const GPT_MODEL_NAMES = [GPT_35_TURBO, GPT_4]

export const LANG: {
  [key in Lang]: string
} = {
  'pl-PL': 'polish',
  'en-US': 'english',
}
