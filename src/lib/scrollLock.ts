// Reference-counted page-scroll lock for open overlays (drawer, modal).
let count = 0

export const lockScroll = (): void => {
  count += 1
  document.documentElement.style.overflow = 'hidden'
}

export const unlockScroll = (): void => {
  count = Math.max(0, count - 1)
  if (count === 0) document.documentElement.style.overflow = ''
}
