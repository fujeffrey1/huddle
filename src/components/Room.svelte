<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { messageStore } from "./stores/message";

  export let activeRoom;
  export let activeUsername;
  let div;
  let autoscroll;
  $: messages = $messageStore[activeRoom];

  beforeUpdate(() => {
    autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 1;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  function handleKeydown(event) {
    if (event.which === 13) {
      const message = event.target.value;
      if (!message) return;
      messageStore.create(activeRoom, activeUsername, message);
      event.target.value = "";
    }
  }
</script>

<style>
  .room {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .gray {
    background-color: #ccc;
  }

  .scrollable {
    height: 94%;
    overflow-y: auto;
  }

  span {
    padding: 0.5em 1em;
    display: inline-block;
  }

  input {
    font-size: 2vh;
    height: 6%;
    border: 1px solid #ccc;
    border-left: 0;
  }
</style>

<div class="room" class:gray={!activeRoom}>
  {#if activeRoom}
    <h1>{activeRoom}</h1>
    <h1>{activeUsername}</h1>
    <div class="scrollable" bind:this={div}>
      {#each messages as { username, message }}
        <!-- <article class={username}> -->
        <article>
          <span>{message}</span>
        </article>
      {/each}
    </div>

    <input on:keydown={handleKeydown} />
  {/if}
</div>
