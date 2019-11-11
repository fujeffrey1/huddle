<script>
  import { beforeUpdate, afterUpdate } from "svelte";

  export let activeRoom;
  let div;

  beforeUpdate(() => {});

  afterUpdate(() => {});

  function handleKeydown(event) {
    // if (event.which === 13) {
    //   const text = event.target.value;
    //   if (!text) return;
    //   event.target.value = "";
    // }
  }
</script>

<style>
  .chat {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .scrollable {
    height: 95%;
    overflow-y: auto;
  }

  input {
    font-size: 1.8vh;
    height: 5%;
    border: 1px solid #ccc;
    border-left: 0;
  }
</style>

<div class="chat">
  <h1>{activeRoom}</h1>
  <div class="scrollable" bind:this={div} />

  <input on:keydown={handleKeydown} />
</div>
