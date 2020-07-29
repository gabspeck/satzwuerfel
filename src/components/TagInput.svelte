<script>
  import '@creativebulma/bulma-tagsinput/dist/css/bulma-tagsinput.min.css';
  import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
  import { createEventDispatcher, onMount } from 'svelte';

  export let value = null;
  export let placeholder = '';
  export let selectable = false;
  export let freeInput = true;
  export let removable = true;

  const dispatch = createEventDispatcher();
  let element;
  let tagInput;

  const onInput = (v) => {
    value = v;
    dispatch('input', v);
  };

  $: {
    if (tagInput) {
      tagInput.flush();
      if (value) {
        tagInput.add(value);
      }
    }
  }

  onMount(() => {
    tagInput = new BulmaTagsInput(element, {
      selectable,
      freeInput,
      placeholder,
      removable,
    });
    ['after.add', 'after.remove'].forEach((i) => {
      tagInput.on(i, () => onInput(tagInput.value));
    });
    ['after.select', 'after.unselect'].forEach((i) => {
      tagInput.on(i, () => dispatch('selectionChanged', tagInput.selected));
    });
  });
</script>

<div class="field">
  <div class="control">
    <input
      class="input"
      bind:value
      bind:this="{element}"
      on:input="{(e) => onInput(e.target.value)}" />
  </div>
</div>
