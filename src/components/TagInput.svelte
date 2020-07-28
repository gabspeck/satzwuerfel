<script>
  import '@creativebulma/bulma-tagsinput/dist/css/bulma-tagsinput.min.css';
  import BulmaTagsInput from '@creativebulma/bulma-tagsinput';
  import { createEventDispatcher, onMount } from 'svelte';

  export let value = null;
  export let placeholder = null;

  const dispatch = createEventDispatcher();
  let element;

  const onInput = (v) => {
    value = v;
    dispatch('input', v);
  };

  onMount(() => {
    let tagInput = new BulmaTagsInput(element, {
      selectable: false,
      placeholder,
    });
    ['after.add', 'after.remove'].forEach((i) => {
      tagInput.on(i, () => onInput(tagInput.value));
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
