<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    label,
    icon,
    children,
  }: {
    label: string
    icon: Snippet
    children: Snippet
  } = $props()

  let open = $state(false)
  let root: HTMLDivElement | undefined = $state()

  const onWindowPointerDown = (event: PointerEvent) => {
    if (open && root && !root.contains(event.target as Node)) open = false
  }

  const onWindowKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') open = false
  }
</script>

<svelte:window onpointerdown={onWindowPointerDown} onkeydown={onWindowKeyDown} />

<div class="popover" bind:this={root}>
  <button class="trigger" title={label} aria-label={label} aria-expanded={open} onclick={() => (open = !open)}>
    {@render icon()}
  </button>

  {#if open}
    <div class="panel">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .popover {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    color: var(--text-on-gradient);
    box-shadow: var(--shadow-soft);
    transition: background 0.2s var(--ease-out);
  }

  .trigger:hover {
    background: var(--glass-bg-hover);
  }

  .panel {
    position: absolute;
    top: 48px;
    right: 0;
    padding: 10px;
    border-radius: var(--radius-lg);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(var(--glass-blur));
    box-shadow: var(--shadow-soft);
    z-index: 10;
  }
</style>
