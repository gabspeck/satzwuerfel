<script>
  export let item;
  export let field;
  export let onInput = null;
</script>

{#if field.rendering && field.rendering.component}
  <svelte:component
    this="{field.rendering.component}"
    placeholder="{field.label || field.name}"
    bind:value="{item[field.name]}"
    on:input="{onInput || (() => {})}"
    {...field.rendering.props || {}} />
{:else}
  <input
    placeholder="{field.label || field.name}"
    class="input"
    on:input="{onInput || (() => {})}"
    bind:value="{item[field.name]}" />
{/if}
