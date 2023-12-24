<script>
    import '/src/styles/main.scss';
</script>

<nav class="wrap">
    <div class="left">
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/add">+</a>
            </li>
        </ul>
    </div>
    <div class="right">
        <ul>
            <li>
                <a href="/settings">Settings</a>
            </li>
            <li>
                <a href="/logout">Logout</a>
            </li>
        </ul>
    </div>
</nav>

<slot></slot>

<style lang="scss">
  nav {
    display: flex;
    justify-content: space-between;
    ul {
      gap: 1rem;
      display: flex;
      a:hover {
        color: var(--primary);
        text-decoration: underline;
      }
    }
  }
</style>