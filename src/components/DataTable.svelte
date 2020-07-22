<script>
  import { _ } from 'lodash';
  import { onMount } from 'svelte';

  export let get = async () => [];
  export let del = async () => {};
  export let update = async () => {};
  export let insert = async () => {};
  export let rowTemplate = { id: null, name: null };
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
    console.log(item);
    if (item.id) {
      await del(item.id);
      await refresh();
    } else {
      items = items.filter((c) => c !== item);
    }
  };

  const save = _.debounce(async (item) => {
    if (item.id) {
      await update(item);
    } else {
      item.id = await (await insert(item)).json();
    }
  }, 300);

  const addRow = () => {
    items = [Object.assign(rowTemplate), ...items];
  };

  onMount(async () => {
    await awaitPromise(refresh());
  });
</script>

<button class="button is-primary" on:click="{addRow}">Erstellen</button>
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
              <td class="is-wrapped">
                <input
                  class="input"
                  style="border: none; box-shadow: none"
                  on:input="{() => save(item)}"
                  bind:value="{item[field.name]}" />
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
