import '../styles/global.css'
import { mount } from 'svelte'
import ClockApp from './ClockApp.svelte'

export default mount(ClockApp, { target: document.getElementById('app')! })
