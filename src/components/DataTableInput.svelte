<script>
  export let item;
  export let field;
  export let onInput;
</script>

{#if field.rendering && field.rendering.component}
  <svelte:component
    this="{field.rendering.component}"
    bind:value="{item[field.name]}"
    on:input="{onInput || (() => {})}"
    {...field.rendering.props || {}} />
{:else}
  <input
    class="input"
    on:input="{onInput || (() => {})}"
    bind:value="{item[field.name]}" />
{/if}
