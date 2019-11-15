<script>
  import { beforeUpdate, afterUpdate } from "svelte";
  import { messageStore } from "./stores/message";
  import { socketStore as socket } from "./stores/socket";

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
      $socket.emit(
        "message",
        {
          room: activeRoom,
          username: activeUsername,
          message
        },
        function({ room, username, message }) {
          messageStore.create(room, username, message);
        }
      );
      event.target.value = "";
    }
  }

  function leaveRoom() {
    $socket.emit("leave room", activeRoom);
  }
</script>

<style>
  .room {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .room-content {
    height: 100%;
    padding: 5px 15px;
  }

  .gray {
    background-color: #ccc;
  }

  .scrollable {
    height: 94%;
    overflow-y: auto;
  }

  article {
    padding: 4px 0;
  }

  article.me {
    text-align: right;
  }

  article.system {
    text-align: center;
    font-size: 12px;
  }

  .message {
    padding: 4px 1em;
    display: inline-block;
    color: white;
    word-break: break-all;
    background-color: #0074d9;
    border-radius: 1em 1em 1em 0;
  }

  .me .message {
    background-color: rgba(0, 200, 128, 0.7);
    border-radius: 1em 1em 0 1em;
  }

  .system .message {
    background: none;
    color: grey;
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
    <div class="room-content">
      <span class="close" on:click={leaveRoom}>&times;</span>
      <div class="scrollable" bind:this={div}>
        {#each messages as { username, message }}
          <article
            class:me={activeUsername === username}
            class:system={!username}>
            <span class="message">{message}</span>
          </article>
        {/each}
      </div>
    </div>
    <input on:keydown={handleKeydown} />
  {/if}
</div>
