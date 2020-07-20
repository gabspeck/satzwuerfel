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

  import { _ } from 'lodash';

  export let categories = [];

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

  const save = _.debounce(async (category) => {
    if (category.id) {
      await updateCategory(category);
    } else {
      category.id = await (await insertCategory(category)).json();
    }
  }, 300);

  const addRow = () => {
    categories = [{ id: null, name: null }, ...categories];
  };
</script>

<svelte:head>
  <title>Kategorien | Satzwürfel</title>
</svelte:head>
<h1 class="title">Kategorien</h1>
<button class="button is-primary" on:click="{addRow}">Erstellen</button>
<div class="table-container">
  <table class="table is-fullwidth" style="table-layout: fixed;">
    <thead>
      <tr>
        <th style="width: 50%">Name</th>
        <th style="width: 50%">Aktionen</th>
      </tr>
    </thead>
    <tbody>
      {#each categories as category}
        <tr>
          <td class="is-wrapped">
            <input
              class="input"
              style="border: none; box-shadow: none"
              on:input="{save(category)}"
              bind:value="{category.name}" />
          </td>
          <td>
            <button class="button is-danger" on:click="{() => del(category)}">
              Löschen
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
