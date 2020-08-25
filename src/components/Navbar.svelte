<script lang="ts">

  import {user} from '../stores';
  import * as auth from '../auth';

  let menuActive = false;
  const toggleMenu = () => {
    menuActive = !menuActive;
  };
  const toggleAuth = () => {
    if ($user){
      auth.logout();
    } else {
      auth.login();
    }
  };
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="#/">Satzwürfel</a>
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
      <a class="navbar-item" href="#/sentences">Sätze</a>
      <a class="navbar-item" href="#/draw">Ziehen</a>
    </div>
    <div class="navbar-end">
      <a class="navbar-item" on:click="{toggleAuth}">
        {#if $user}{$user.displayName} (Abmelden){:else}Anmelden{/if}
      </a>
    </div>
  </div>
</nav>
