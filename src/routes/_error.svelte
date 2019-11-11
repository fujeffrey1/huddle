<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  .center {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }
</style>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="center">
  <h1>{status}</h1>

  <p>{error.message}</p>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>
