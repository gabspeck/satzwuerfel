<script context="module">
  export async function preload() {
    const categories = await (await this.fetch('api/categories')).json();
    return { categories };
  }
</script>

<script>
  export let categories = [];

  const del = async (id) => {
    await fetch(`api/categories/${id}`, { method: 'delete' });
    await refresh();
  };

  const refresh = async () => {
    categories = await (await fetch('api/categories')).json();
  };

  const captureEnterKey = async (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await fetch(`api/categories/${category.id}`, {
        method: 'put',
        body: JSON.stringify(category),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      e.target.blur();
    }
  };
</script>

<svelte:head>
  <title>Kategorien | Satzwürfel</title>
</svelte:head>
<h1 class="title">Kategorien</h1>
<table class="table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Aktionen</th>
    </tr>
  </thead>
  <tbody>
    {#each categories as category}
      <tr>
        <td
          contenteditable="true"
          on:keydown="{(e) => captureEnterKey(e, category)}"
          bind:innerHTML="{category.name}"></td>
        <td>
          <a on:click="{() => del(category.id)}">Löschen</a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
