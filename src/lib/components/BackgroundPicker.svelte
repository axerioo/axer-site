<script lang="ts">
  import { background, GRADIENTS } from '../background.svelte'
  import Popover from './Popover.svelte'
</script>

<Popover label="Change background">
  {#snippet icon()}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  {/snippet}

  <div class="swatches" role="listbox" aria-label="Background gradient">
    {#each GRADIENTS as gradient (gradient.id)}
      <button
        class="swatch"
        class:active={gradient.id === background.id}
        role="option"
        aria-selected={gradient.id === background.id}
        title={gradient.name}
        style="background-image: {gradient.image}"
        onclick={() => background.set(gradient.id)}
      >
        <span class="name">{gradient.name}</span>
      </button>
    {/each}
  </div>
</Popover>

<style>
  .swatches {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .swatch {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 44px;
    border-radius: var(--radius-md);
    border: none;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
    color: var(--text-on-gradient);
    font-size: 12px;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    transition: transform 0.15s var(--ease-out), box-shadow 0.15s var(--ease-out);
  }

  .swatch:hover {
    transform: scale(1.04);
  }

  .swatch.active {
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.92);
  }

  .name {
    pointer-events: none;
  }
</style>
