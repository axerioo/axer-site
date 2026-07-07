import { loadJson, saveJson } from './storage'

export interface Gradient {
  id: string
  name: string
  image: string
}

export const GRADIENTS: Gradient[] = [
  {
    id: 'default',
    name: 'Default',
    image: 'linear-gradient(90deg, #00dbde 0%, #fc00ff 100%)',
  },
  {
    id: 'aurora',
    name: 'Aurora',
    image: 'linear-gradient(115deg, #0f2027 0%, #2c5364 40%, #24fe41 100%)',
  },
  {
    id: 'sunrise',
    name: 'Sunrise',
    image: 'linear-gradient(115deg, #ff512f 0%, #f09819 100%)',
  },
  {
    id: 'cherry',
    name: 'Cherry',
    image: 'linear-gradient(115deg, #5e0a1e 0%, #c9184a 55%, #ff5c72 100%)',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    image: 'linear-gradient(115deg, #1a2980 0%, #26d0ce 100%)',
  },
  {
    id: 'forest',
    name: 'Forest',
    image: 'linear-gradient(115deg, #134e5e 0%, #71b280 100%)',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    image: 'linear-gradient(115deg, #0f0c29 0%, #302b63 55%, #24243e 100%)',
  },
  {
    id: 'graphite',
    name: 'Graphite',
    image: 'linear-gradient(115deg, #16181d 0%, #2f3439 100%)',
  },
]

const STORAGE_KEY = 'axer:background'
const DEFAULT_ID = 'default'

const initialId = (): string => {
  const saved = loadJson<string>(localStorage, STORAGE_KEY, DEFAULT_ID)
  return GRADIENTS.some((g) => g.id === saved) ? saved : DEFAULT_ID
}

const state = $state({ id: initialId() })

export const background = {
  get id(): string {
    return state.id
  },
  get gradient(): Gradient {
    return GRADIENTS.find((g) => g.id === state.id) ?? GRADIENTS[0]
  },
  set(id: string): void {
    if (!GRADIENTS.some((g) => g.id === id)) return
    state.id = id
    saveJson(localStorage, STORAGE_KEY, id)
  },
}
