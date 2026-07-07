<script lang="ts">
  import type { Snippet } from 'svelte'
  import { background } from '../background.svelte'
  import { zen } from '../zen.svelte'
  import SiteFooter from './SiteFooter.svelte'
  import BackgroundPicker from './BackgroundPicker.svelte'
  import GitHubButton from './GitHubButton.svelte'

  let {
    children,
    controls,
  }: {
    children: Snippet
    // Extra page-specific buttons rendered next to the background picker
    controls?: Snippet
  } = $props()

  let hintVisible = $state(false)
  let hintTimeout: ReturnType<typeof setTimeout> | undefined

  let cursorIdle = $state(false)
  let idleTimeout: ReturnType<typeof setTimeout> | undefined

  let helpOpen = $state(false)

  const showHint = () => {
    hintVisible = true
    clearTimeout(hintTimeout)
    hintTimeout = setTimeout(() => (hintVisible = false), 3200)
  }

  const toggleZen = () => {
    zen.toggle()
    if (zen.active) showHint()
    else hintVisible = false
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {})
    } else {
      void document.documentElement.requestFullscreen().catch(() => {})
    }
  }

  const onWindowKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (target.closest('input, select, textarea')) return
    if (event.key === 'i' || event.key === 'I') toggleZen()
    else if (event.key === 'f' || event.key === 'F') toggleFullscreen()
    else if (event.key === 'Escape') helpOpen = false
  }

  const onPointerMove = () => {
    cursorIdle = false
    clearTimeout(idleTimeout)
    if (zen.active) {
      idleTimeout = setTimeout(() => (cursorIdle = true), 2500)
    }
  }

  $effect(() => {
    if (!zen.active) {
      cursorIdle = false
      clearTimeout(idleTimeout)
    }
  })

  const onWindowPointerDown = (event: PointerEvent) => {
    if (helpOpen && !(event.target as HTMLElement).closest('.help')) helpOpen = false
  }
</script>

<svelte:window onkeydown={onWindowKeyDown} onpointermove={onPointerMove} onpointerdown={onWindowPointerDown} />

<div class="page" class:zen={zen.active} class:cursor-hidden={zen.active && cursorIdle}>
  <div class="backdrop" style="background-image: {background.gradient.image}"></div>
  <div class="veil"></div>

  <div class="chrome top-bar">
    <div class="top-controls">
      {@render controls?.()}
      <BackgroundPicker />
      <div class="help">
        <button
          class="help-btn"
          title="Shortcuts"
          aria-label="Shortcuts"
          aria-expanded={helpOpen}
          onclick={() => (helpOpen = !helpOpen)}
        >
          ?
        </button>
        {#if helpOpen}
          <div class="help-panel" role="dialog" aria-label="Shortcuts">
            <p class="help-title">Shortcuts</p>
            <div class="help-row"><span>Hide interface</span><kbd>I</kbd></div>
            <div class="help-row"><span>Fullscreen</span><kbd>F</kbd></div>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <main>
    {@render children()}
  </main>

  <div class="chrome bottom-bar">
    <SiteFooter />
    <div class="github-slot">
      <GitHubButton />
    </div>
  </div>

  <div class="hint" class:visible={hintVisible} aria-hidden="true">
    Press [I] to bring the interface back.
  </div>
</div>

<style>
  .page {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    overflow: hidden;
    color: var(--text-on-gradient);
  }

  .page.cursor-hidden,
  .page.cursor-hidden :global(*) {
    cursor: none !important;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    z-index: -2;
    background-size: 200% 200%;
    background-position: 0% 50%;
    animation: drift 30s ease-in-out infinite alternate;
    transition: background-image 0.4s var(--ease-out);
  }

  .veil {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: radial-gradient(120% 100% at 50% 50%, transparent 45%, rgba(8, 11, 16, 0.3) 100%);
    transition: opacity 0.45s var(--ease-out);
  }

  .page.zen .veil {
    opacity: 0;
  }

  @keyframes drift {
    from {
      background-position: 0% 50%;
    }
    to {
      background-position: 100% 50%;
    }
  }

  .chrome {
    transition: opacity 0.45s var(--ease-out), transform 0.45s var(--ease-out);
  }

  .page.zen .chrome {
    opacity: 0;
    pointer-events: none;
  }

  .top-bar {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }

  .page.zen .top-bar {
    transform: translateY(-8px);
  }

  .top-controls {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  main {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 24px;
  }

  .bottom-bar {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 20px;
  }

  .page.zen .bottom-bar {
    transform: translateY(8px);
  }

  .github-slot {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .help {
    position: relative;
  }

  .help-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    box-shadow: var(--shadow-soft);
    color: var(--text-on-gradient);
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    transition: background 0.2s var(--ease-out);
  }

  .help-btn:hover {
    background: var(--glass-bg-hover);
  }

  .help-panel {
    position: absolute;
    top: 48px;
    right: 0;
    min-width: 200px;
    padding: 12px 14px;
    border-radius: var(--radius-lg);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(var(--glass-blur));
    box-shadow: var(--shadow-soft);
    animation: help-in 0.18s var(--ease-out);
  }

  @keyframes help-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
  }

  .help-title {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-on-gradient-dim);
  }

  .help-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 0;
    font-size: 13.5px;
  }

  .help-row span {
    flex: 1;
  }

  kbd {
    font-family: var(--font-sans);
    font-size: 11.5px;
    padding: 2px 7px;
    border-radius: 6px;
    background: var(--glass-bg-hover);
    border: 1px solid var(--glass-border);
    white-space: nowrap;
  }

  .hint {
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 16px;
    border-radius: var(--radius-full);
    background: rgba(0, 0, 0, 0.4);
    color: rgba(255, 255, 255, 0.85);
    font-size: 13px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s var(--ease-out);
    white-space: nowrap;
  }

  .hint.visible {
    opacity: 1;
  }

  @media (max-width: 560px) {
    .top-bar,
    .bottom-bar {
      padding: 12px;
    }

    .bottom-bar {
      gap: 8px;
      align-items: center;
    }

    .github-slot {
      position: static;
      transform: none;
    }

    .hint {
      font-size: 12px;
      white-space: normal;
      text-align: center;
      max-width: 80vw;
    }
  }
</style>
