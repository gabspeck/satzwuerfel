<script>
  let menuActive = false;
  function toggleMenu(event) {
    menuActive = !menuActive;
  }
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">Satzwürfel</a>
    <a
      role="button"
      on:click="{toggleMenu}"
      class="navbar-burger"
      class:is-active="{menuActive}"
      aria-label="menu"
      aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div class="navbar-menu" class:is-active="{menuActive}" id="navMenu">
    <div class="navbar-start">
      <a class="navbar-item" href="/categories">Kategorien</a>
      <a class="navbar-item" href="/sentences">Sätze</a>
      <a class="navbar-item" href="/draw">Würfel</a>
    </div>
  </div>
</nav>
