<h1 class="title">Autocomplete</h1>
<input on:input={(e) => autocomplete(e.target.value)}>
<ul>
    {#each categories as category}
        <li>{category.id}</li>
    {/each}
</ul>

<script>

  import debounce from 'lodash/debounce'
  import { onMount } from 'svelte';
  import { getCategories } from '../api';

  let categories = [];

  const autocomplete = debounce(async (value) => {
    categories = await getCategories(value);
  }, 300)

</script>