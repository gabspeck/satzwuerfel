<script>
  import debounce from 'lodash/debounce';
  import { onMount } from 'svelte';
  import DataTableInput from './DataTableInput.svelte';

  export let get = async () => [];
  export let del = async () => {};
  export let put = async () => {};
  let newRow = {};
  export let fields = [
    {
      name: 'name',
      label: 'Name',
    },
  ];

  let items = [];
  let waiting = false;

  const awaitPromise = async (promise) => {
    waiting = true;
    try {
      await promise;
    } finally {
      waiting = false;
    }
  };

  const refresh = async () => {
    items = await get();
  };

  const deleteRow = async (item) => {
    if (item.id) {
      await del(item.id);
      await refresh();
    } else {
      items = items.filter((c) => c !== item);
    }
  };

  const save = debounce(async (item) => {
    await put(item);
  }, 300);

  const addRow = async () => {
    newRow.id = await put(newRow);
    items = [Object.assign({}, newRow), ...items];
    newRow = {};
  };

  onMount(async () => {
    await awaitPromise(refresh());
  });
</script>

<div class="field is-horizontal is-fullwidth columns">
  <div class="field-body">
    {#each fields as field}
      <div class="field column">
        <p class="control is-expanded">
          <DataTableInput item="{newRow}" field="{field}" />
        </p>
      </div>
    {/each}
    <div class="field-body column">
      <div class="field">
        <div class="control">
          <button class="button is-primary" on:click="{addRow}">
            Hinzufügen
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="table-container">
  <table class="table is-fullwidth" style="table-layout: fixed;">
    <thead>
      <tr>
        {#each fields as field}
          <th>
            {field.label || field.name}
            <!--            <button class="button is-small" on:click="{toggleSort}">-->
            <!--              <span class="icon">-->
            <!--                <i-->
            <!--                  class="fas"-->
            <!--                  class:fa-sort-alpha-down="{sortOrder === 'asc'}"-->
            <!--                  class:fa-sort-alpha-up="{sortOrder === 'desc'}"></i>-->
            <!--              </span>-->
            <!--            </button>-->
          </th>
        {/each}
        <th>Aktionen</th>
      </tr>
    </thead>
    <tbody>
      {#if waiting}
        <tr>
          <td colspan="{fields.length + 1}" class="has-text-centered">
            <button class="button is-text is-loading is-large"></button>
          </td>
        </tr>
      {:else}
        {#each items as item}
          <tr>
            {#each fields as field}
              <td>
                <DataTableInput
                  onInput="{() => save(item)}"
                  item="{item}"
                  field="{field}" />
              </td>
            {/each}
            <td>
              <button
                class="button is-danger"
                on:click="{() => deleteRow(item)}">
                Löschen
              </button>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
