<script lang="ts">
  import { onMount } from 'svelte'
  import GradientPage from '../lib/components/GradientPage.svelte'

const GREETINGS = [
    'Hello',
    'Cześć',
    '你好',
    'Ahoj',
    'مرحبا',
    'Hei',
    'Salut',
    'Hallo',
    'Γεια σου',
    'नमस्ते',
    'Halo',
    'Ciao',
    'こんにちは',
    'Sveiki',
    'Hoi',
    'Olá',
    'Привет',
    'Čau',
    '안녕',
    'Hola',
    'Hej',
    'Merhaba',
    'Привіт',
    'Xin chào',
  ]

  const TYPE_MS = 200
  const DELETE_MS = 75
  const HOLD_MS = 3000
  const GAP_MS = 500

  let text = $state('')

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  onMount(() => {
    let cancelled = false
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = async () => {
      let index = 0
      while (!cancelled) {
        const word = GREETINGS[index]

        if (reducedMotion) {
          text = word
          await sleep(HOLD_MS + 1000)
        } else {
          for (const char of word) {
            if (cancelled) return
            text += char
            await sleep(TYPE_MS)
          }
          await sleep(HOLD_MS)
          while (text.length > 0 && !cancelled) {
            text = text.slice(0, -1)
            await sleep(DELETE_MS)
          }
          await sleep(GAP_MS)
        }

        index = (index + 1) % GREETINGS.length
      }
    }

    run()
    return () => {
      cancelled = true
    }
  })
</script>

<GradientPage>
  <h1 class="greeting">
    <span class="text">{text}</span><span class="caret" aria-hidden="true"></span>
  </h1>
</GradientPage>

<style>
  .greeting {
    display: flex;
    align-items: baseline;
    justify-content: center;
    margin: 0;
    font-size: clamp(2.6rem, 11vw, 10rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    text-align: center;
    text-shadow: 0 2px 24px rgba(0, 0, 0, 0.15);
    min-height: 1.3em;
    user-select: none;
  }

  .caret {
    width: 0.06em;
    min-width: 3px;
    height: 0.95em;
    margin-left: 0.08em;
    border-radius: 2px;
    background: currentColor;
    align-self: center;
    animation: blink 1.1s steps(1) infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
</style>
