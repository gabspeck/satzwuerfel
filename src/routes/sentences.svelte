<script>
  import DataTable from '../components/DataTable.svelte';
  import TagList from '../components/TagList.svelte';
  import { getSentences } from '../api';

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
        props: {
          allCaps: true,
        },
      },
    },
  ];
</script>

<h1 class="title">Sätze</h1>
<DataTable {fields} get="{getSentences}" />
