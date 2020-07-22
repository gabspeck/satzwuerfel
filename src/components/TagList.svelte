<script>
  export let value = [];
  export let allCaps = false;
</script>

<style>
  .allCaps {
    text-transform: uppercase;
  }
</style>

<ul>
  {#each value as item}
    <li class:allCaps>{item}</li>
  {/each}
</ul>
