<script context="module">
  export async function preload() {
    const categories = await (await this.fetch('api/categories')).json();
    return { categories };
  }
</script>

<script>
  import {
    deleteCategory,
    getCategories,
    insertCategory,
    updateCategory,
  } from '../api';

  export let categories = [];

  $: isAdding = categories.some((c) => !c.id);

  const del = async (category) => {
    if (category.id) {
      await deleteCategory(category.id);
      await refresh();
    } else {
      categories = categories.filter((c) => c !== category);
    }
  };

  const refresh = async () => {
    categories = await getCategories();
  };

  const captureEnterKey = async (e, category) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (category.id) {
        await updateCategory(category);
      } else {
        await insertCategory(category);
      }
      e.target.blur();
    }
  };

  const addRow = () => {
    categories = [{ id: null, name: null }, ...categories];
    document.getElementsByTagName('td')[0].focus();
  };
</script>

<svelte:head>
  <title>Kategorien | Satzwürfel</title>
</svelte:head>
<h1 class="title">Kategorien</h1>
<button class="button is-primary" disabled="{isAdding}" on:click="{addRow}">
  Erstellen
</button>
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
          style="vertical-align: middle"
          contenteditable="true"
          on:keydown="{(e) => captureEnterKey(e, category)}"
          bind:innerHTML="{category.name}"></td>
        <td>
          <button class="button is-text" on:click="{() => del(category)}">
            {category.id ? 'Löschen' : 'Abbrechen'}
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
