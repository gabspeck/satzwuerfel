<script>
  import Nav from '../components/Navbar.svelte';
  import 'bulma/css/bulma.min.css';
  import '@fortawesome/fontawesome-free/css/all.min.css';
</script>

<Nav />
<main>
  <section class="section">
    <div class="container">
      <slot />
    </div>
  </section>
</main>
