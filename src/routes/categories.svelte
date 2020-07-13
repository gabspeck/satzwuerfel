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

  const save = async (category) => {
    if (category.id) {
      await updateCategory(category);
    } else {
      await insertCategory(category);
    }
  };

  const captureEnterKey = async (e, category) => {
    if (e.key === 'Enter') {
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
          <td
            class="is-wrapped"
            style="vertical-align: middle;"
            contenteditable="false"
            on:click="{(e) => {
              e.target.contentEditable = true;
              e.target.focus();
            }}"
            on:keydown="{(e) => captureEnterKey(e, category)}"
            on:blur="{(e) => {
              e.target.contentEditable = false;
              save(category);
            }}"
            bind:innerHTML="{category.name}"></td>
          <td>
            <button
              class="button is-text is-danger"
              on:click="{() => del(category)}">
              {category.id ? 'Löschen' : 'Abbrechen'}
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
