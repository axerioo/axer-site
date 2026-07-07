import '../styles/global.css'
import { mount } from 'svelte'
import HomeApp from './HomeApp.svelte'

export default mount(HomeApp, { target: document.getElementById('app')! })
