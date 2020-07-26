<script>
  import DataTable from '../components/DataTable.svelte';
  import TagList from '../components/TagList.svelte';
  import {
    insertSentence,
    getSentences,
    updateSentence,
    deleteSentence,
  } from '../api';

  let fields = [
    {
      name: 'text',
      label: 'Satz',
    },
    {
      name: 'categories',
      label: 'Kategorien',
      rendering: {
        component: TagList,
      },
    },
  ];
</script>

<svelte:head>
  <title>Sätze</title>
</svelte:head>
<h1 class="title">Sätze</h1>
<DataTable
  {fields}
  get="{getSentences}"
  insert="{insertSentence}"
  update="{updateSentence}"
  del="{deleteSentence}" />
