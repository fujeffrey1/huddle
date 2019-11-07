<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  main {
    position: fixed;
    height: 100%;
    width: 100%;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
