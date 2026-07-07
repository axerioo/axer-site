import { loadJson, saveJson } from './storage'

const STORAGE_KEY = 'axer:zen'

const state = $state({ active: loadJson<boolean>(sessionStorage, STORAGE_KEY, false) })

export const zen = {
  get active(): boolean {
    return state.active
  },
  toggle(): void {
    state.active = !state.active
    saveJson(sessionStorage, STORAGE_KEY, state.active)
  },
  exit(): void {
    if (!state.active) return
    state.active = false
    saveJson(sessionStorage, STORAGE_KEY, false)
  },
}
