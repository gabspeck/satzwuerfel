<script>
  import DataTable from '../components/DataTable.svelte';
  import TagInput from '../components/TagInput.svelte';
  import { deleteSentence, getSentences, putSentence } from '../api';

  let fields = [
    {
      name: 'text',
      label: 'Satz',
    },
    {
      name: 'categories',
      label: 'Kategorien',
      rendering: {
        component: TagInput,
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
  put="{putSentence}"
  del="{deleteSentence}" />
