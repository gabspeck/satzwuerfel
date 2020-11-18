<script lang="ts">
  import 'bulma/css/bulma.min.css';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import Router, { replace } from 'svelte-spa-router';
  import Navbar from './components/Navbar.svelte';
  import { routes } from './routes';
</script>

<Navbar />
<main>
  <section class="section">
    <div class="container">
      <Router
        routes="{routes}"
        on:conditionsFailed="{() => replace('/login')}" />
    </div>
  </section>
</main>
