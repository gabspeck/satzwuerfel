<script lang="ts">
  import 'bulma/css/bulma.min.css';
  import Router, { replace } from 'svelte-spa-router';
  import Navbar from './components/Navbar.svelte';
  import { routes } from './routes';
</script>

<Navbar />
<main style="height: 100vh">
  <section class="section" style="height: 100%">
    <div class="container" style="height: 100%">
      <Router
        routes="{routes}"
        on:conditionsFailed="{() => replace('/login')}" />
    </div>
  </section>
</main>

