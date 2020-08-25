<script>
  import TagInput from '../components/TagInput.svelte';
  import { onMount } from 'svelte';
  import { getCategories, drawSentence } from '../api';

  let categories = null;
  let sentence = null;
  let selectedTag = null;

  onMount(async () => {
    categories = await getCategories();
  });

  const draw = async () => {
    sentence = await drawSentence(selectedTag);
  };
</script>

<svelte:head>
  <title>Ziehen</title>
</svelte:head>
<h1 class="title">Ziehen</h1>
<div class="columns">
  <div class="column has-text-centered">
    <p>Wähle eine Kategorie aus...</p>
    <TagInput
      value="{categories}"
      selectable="{true}"
      freeInput="{false}"
      removable="{false}"
      on:selectionChanged="{(e) => {
        selectedTag = e.detail;
      }}" />
    <button class="button is-large" on:click="{draw}">
      <span class="icon">
        <i class="fas fa-dice"></i>
      </span>
      <span>Satz Ziehen</span>
    </button>
    {#if sentence}
      <p class="is-size-1">{sentence}</p>
    {/if}
  </div>
</div>
