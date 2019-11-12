<script>
  import { beforeUpdate, afterUpdate } from "svelte";

  export let activeRoom;
  let div;
  let autoscroll;
  let messages = [];

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
      messages = [...messages, { username: "user", message }];
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

  .scrollable {
    height: 95%;
    overflow-y: auto;
  }

  span {
    padding: 0.5em 1em;
    display: inline-block;
  }

  input {
    font-size: 1.8vh;
    height: 5%;
    border: 1px solid #ccc;
    border-left: 0;
  }
</style>

<div class="room">
  <h1>{activeRoom}</h1>
  <div class="scrollable" bind:this={div}>
    {#each messages as { username, message }}
      <article class={username}>
        <span>{message}</span>
      </article>
    {/each}
  </div>

  <input on:keydown={handleKeydown} />
</div>
