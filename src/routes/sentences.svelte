<script>
  import DataTable from '../components/DataTable.svelte';
  import { getSentences } from '../api';

  let fields = [
    {
      name: 'text',
      label: 'Satz',
    },
    {
      name: 'categories',
      label: 'Kategorien',
    },
  ];
</script>

<h1 class="title">Sätze</h1>
<DataTable {fields} get="{getSentences}" />
