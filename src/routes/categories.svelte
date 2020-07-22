<script>
  import {
    deleteCategory,
    getCategories,
    insertCategory,
    updateCategory,
  } from '../api';

  import DataTable from '../components/DataTable.svelte';
</script>

<svelte:head>
  <title>Kategorien | Satzwürfel</title>
</svelte:head>
<h1 class="title">Kategorien</h1>
<DataTable
  get="{getCategories}"
  insert="{insertCategory}"
  update="{updateCategory}"
  del="{deleteCategory}" />
