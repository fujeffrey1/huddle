<script>
  import { goto } from "@sapper/app";
  import { beforeUpdate, afterUpdate } from "svelte";
  import debounce from "lodash.debounce";
  import EmojiSelector from "svelte-emoji-selector";
  import { notifier } from "@beyonk/svelte-notifications";
  import Icon from "fa-svelte";
  import { faCopy, faTimes } from "@fortawesome/free-solid-svg-icons";
  import { activeStore } from "./stores/active";
  import { userStore } from "./stores/user";
  import { messageStore } from "./stores/message";
  import { socketStore as socket } from "./stores/socket";

  const TYPING_TIMER = 5000;

  let previousActiveRoom;
  let previousActiveUsername;
  let div;
  let input;
  let autoscroll;
  let typingTimeout;

  $: activeRoom = $activeStore.activeRoom;
  $: activeUsername = $activeStore.activeUsername;
  $: users = activeRoom && $userStore[activeRoom]["others"];
  $: messages = $messageStore[activeRoom];

  // Handles bugs related to switching rooms
  $: if (activeRoom !== previousActiveRoom) {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      $socket.emit("stop typing", {
        room: previousActiveRoom,
        username: previousActiveUsername
      });
    }
    if (input) {
      input.value = "";
    }
    previousActiveRoom = activeRoom;
    previousActiveUsername = activeUsername;
  }

  beforeUpdate(() => {
    autoscroll = div && div.offsetHeight + div.scrollTop > div.scrollHeight - 1;
  });

  afterUpdate(() => {
    if (div && autoscroll) div.scrollTo(0, div.scrollHeight);
  });

  function stopTypingTimeout() {
    typingTimeout = setTimeout(() => {
      $socket.emit("stop typing", {
        room: activeRoom,
        username: activeUsername
      });
      typingTimeout = null;
    }, TYPING_TIMER);
  }

  let resetStopTypingTimeout = debounce(() => {
    clearTimeout(typingTimeout);
    stopTypingTimeout();
  }, 300);

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
        function({ room, username, message, timestamp }) {
          messageStore.create(room, username, message, timestamp);
        }
      );
      $socket.emit("stop typing", {
        room: activeRoom,
        username: activeUsername
      });
      event.target.value = "";
    } else if (!typingTimeout) {
      $socket.emit("typing", { room: activeRoom, username: activeUsername });
      stopTypingTimeout();
    } else {
      resetStopTypingTimeout();
    }
  }

  function leaveRoom() {
    $socket.emit("leave room", activeRoom, function(room) {
      goto("/");
      activeStore.setActive("", "");
      userStore.leave(room);
      messageStore.close(room);
    });
  }

  function copyLink() {
    let dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    notifier.success("Link copied");
  }

  function onEmoji(event) {
    input.value += event.detail;
    input.focus();
  }
</script>

<style>
  .room {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .room-icons {
    display: flex;
    position: absolute;
    right: 0;
    width: 70px;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 0 0;
    font-size: 20px;
  }

  .room-icons *:hover {
    cursor: pointer;
  }

  .room-content {
    height: 100%;
  }

  .scrollable {
    height: 100%;
    overflow-y: auto;
    padding: 5px 15px 40px;
  }

  article {
    padding: 2px 0;
  }

  article.me {
    text-align: right;
  }

  article.system {
    text-align: center;
    font-size: 12px;
  }

  .username {
    display: block;
    color: grey;
    font-size: 12px;
  }

  .message {
    padding: 4px 15px;
    display: inline-block;
    color: white;
    background-color: #0074d9;
    border-radius: 1em 1em 1em 0;
    text-align: left;
    word-break: break-all;
  }

  .me .message {
    background-color: rgba(0, 200, 128, 0.7);
    border-radius: 1em 1em 0 1em;
  }

  .system .message {
    background: none;
    color: grey;
    max-width: 100%;
  }

  .input {
    display: flex;
    height: 6%;
    border: 1px solid #ccc;
    border-left: 0;
  }

  .input input {
    flex: 15;
    font-size: 2vh;
    padding: 0 10px;
    border: none;
    border-left: 1px solid #ccc;
  }

  :global(.svelte-emoji-picker__trigger) {
    flex: 1;
    border: none;
    line-height: 6%;
    font-size: 25px;
    margin: 0;
    padding: 0;
  }

  :global(.svelte-emoji-picker__search input) {
    font-size: 16px;
    border-width: 1px;
  }

  :global(.svelte-emoji-picker__search .icon) {
    top: 6px;
  }

  :global(.svelte-emoji-picker__emoji-tabs) {
    height: 16rem !important;
  }
</style>

<div class="room">
  {#if activeRoom}
    <div class="room-icons">
      <span on:click={copyLink}>
        <Icon icon={faCopy} />
      </span>
      <span on:click={leaveRoom}>
        <Icon icon={faTimes} />
      </span>
    </div>
    <div class="room-content">
      <div class="scrollable" bind:this={div}>
        {#each messages as { username, message, timestamp }, i}
          <article
            class:me={activeUsername === username}
            class:system={!username}>
            {#if username && i > 0 && messages[i - 1].username !== username}
              <span class="username">{username}</span>
            {/if}
            <div class="tooltip">
              <span class="message">{message}</span>
              {#if username}
                <span
                  class={'tooltiptext ' + (activeUsername === username ? 'left' : 'right')}>
                  {timestamp}
                </span>
              {/if}
            </div>
          </article>
        {/each}
        {#each Object.entries(users) as [username, { typing }]}
          {#if typing}
            <article class="system">
              <span class="message">{username} is typing...</span>
            </article>
          {/if}
        {/each}
      </div>
    </div>
    <div class="input">
      <EmojiSelector on:emoji={onEmoji} />
      <input on:keypress={handleKeydown} bind:this={input} />
    </div>
  {/if}
</div>
