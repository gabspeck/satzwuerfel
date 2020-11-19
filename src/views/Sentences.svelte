<script>
  import DataTable from '../components/DataTable.svelte';
  import TagInput from '../components/TagInput.svelte';
  import { deleteSentence, getCategories, getSentences, putSentence } from '../api';

  let fields = [
    {
      name: 'text',
      label: 'Satz'
    },
    {
      name: 'categories',
      label: 'Kategorien',
      rendering: {
        component: TagInput,
        props: {
          source: getCategories
        }
      }
    }
  ];
</script>

<svelte:head>
  <title>Sätze</title>
</svelte:head>
<h1 class="title">Sätze</h1>
<DataTable
  fields="{fields}"
  get="{getSentences}"
  put="{putSentence}"
  del="{deleteSentence}" />
