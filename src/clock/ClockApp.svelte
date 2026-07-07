<script lang="ts">
  import GradientPage from '../lib/components/GradientPage.svelte'
  import Popover from '../lib/components/Popover.svelte'
  import { loadJson, saveJson } from '../lib/storage'

  interface ClockSettings {
    hour12: boolean
    showSeconds: boolean
    showDate: boolean
  }

  const STORAGE_KEY = 'axer:clock'

  const settings = $state<ClockSettings>(
    loadJson(localStorage, STORAGE_KEY, { hour12: false, showSeconds: true, showDate: true }),
  )

  $effect(() => {
    saveJson(localStorage, STORAGE_KEY, {
      hour12: settings.hour12,
      showSeconds: settings.showSeconds,
      showDate: settings.showDate,
    })
  })

  let now = $state(new Date())

  $effect(() => {
    const timer = setInterval(() => (now = new Date()), 250)
    return () => clearInterval(timer)
  })

  const timeParts = $derived.by(() => {
    const parts = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: settings.showSeconds ? '2-digit' : undefined,
      hour12: settings.hour12,
    }).formatToParts(now)

    let time = ''
    let dayPeriod = ''
    for (const part of parts) {
      if (part.type === 'dayPeriod') dayPeriod = part.value.trim()
      else time += part.value
    }
    return { time: time.trim(), dayPeriod }
  })

  const dateText = $derived(
    now.toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  )

</script>

<GradientPage>
  {#snippet controls()}
    <Popover label="Clock settings">
      {#snippet icon()}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      {/snippet}

      <div class="options">
        <label class="option">
          <span>12-hour format</span>
          <input class="switch" type="checkbox" bind:checked={settings.hour12} />
        </label>
        <label class="option">
          <span>Show seconds</span>
          <input class="switch" type="checkbox" bind:checked={settings.showSeconds} />
        </label>
        <label class="option">
          <span>Show date</span>
          <input class="switch" type="checkbox" bind:checked={settings.showDate} />
        </label>
      </div>
    </Popover>
  {/snippet}

  <div class="clock" class:with-seconds={settings.showSeconds}>
    <h1 class="time">
      {timeParts.time}{#if timeParts.dayPeriod}<span class="period">{timeParts.dayPeriod}</span>{/if}
    </h1>
    {#if settings.showDate}
      <p class="date">{dateText}</p>
    {/if}
  </div>
</GradientPage>

<style>
  .clock {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(4px, 1.5vh, 16px);
    user-select: none;
  }

  .time {
    margin: 0;
    font-size: clamp(3.4rem, 15vw, 13rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    text-shadow: 0 2px 24px rgba(0, 0, 0, 0.15);
  }

  .clock.with-seconds .time {
    font-size: clamp(2.8rem, 12.5vw, 11rem);
  }

  .period {
    margin-left: 0.18em;
    font-size: 0.32em;
    font-weight: 600;
    color: var(--text-on-gradient-dim);
    vertical-align: baseline;
  }

  .date {
    margin: 0;
    font-size: clamp(1rem, 2.6vw, 1.8rem);
    font-weight: 500;
    color: var(--text-on-gradient-dim);
    text-transform: capitalize;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 180px;
  }

  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
    border-radius: var(--radius-md);
    font-size: 14px;
    color: var(--text-on-gradient);
    cursor: pointer;
    transition: background 0.15s var(--ease-out);
  }

  .option:hover {
    background: var(--glass-bg);
  }

  .switch {
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    width: 38px;
    height: 22px;
    flex-shrink: 0;
    border-radius: var(--radius-full);
    border: 1px solid var(--glass-border);
    background: var(--glass-bg);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }

  .switch::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--text-on-gradient-dim);
    transition: transform 0.18s var(--ease-out), background 0.15s;
  }

  .switch:checked {
    background: var(--glass-bg-hover);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .switch:checked::after {
    transform: translateX(16px);
    background: #fff;
  }
</style>
