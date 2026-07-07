<nav class="footer">
  <div class="links">
    <a href="/">Home</a>
    <span class="sep" aria-hidden="true">·</span>
    <a href="/clock/">Clock</a>
  </div>
</nav>

<style>
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 10px 18px;
    border-radius: var(--radius-full);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(var(--glass-blur));
    box-shadow: var(--shadow-soft);
    color: var(--text-on-gradient);
    font-size: 15px;
    line-height: 1.2;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sep {
    color: var(--text-on-gradient-dim);
    user-select: none;
  }

  a {
    text-decoration: none;
    padding: 4px 8px;
    border-radius: var(--radius-full);
    transition: background 0.2s var(--ease-out);
  }

  a:hover {
    background: var(--glass-bg-hover);
  }

  @media (max-width: 480px) {
    .footer {
      font-size: 13px;
      padding: 8px 12px;
    }
  }
</style>
