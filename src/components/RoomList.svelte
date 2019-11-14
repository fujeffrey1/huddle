<script>
  import { slide } from "svelte/transition";
  import Modal from "./Modal.svelte";
  import { messageStore } from "./stores/message";

  export let activeRoom = "";
  export let activeUsername = "";
  let visible = false;
  let rooms = {};

  function handleOpen(event) {
    visible = true;
  }

  function handleClose(event) {
    visible = false;
  }

  function handleClick(room, username) {
    activeRoom = room;
    activeUsername = username;
  }

  function joinRoom({ detail: { room, username } }) {
    rooms[room] = username;
    messageStore.join(room, username);
    activeRoom = room;
    activeUsername = username;
  }
</script>

<style>
  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    min-width: 285px;
    max-width: 360px;
    overflow: scroll;
    height: 100%;
  }

  li {
    display: flex;
    height: 50px;
    line-height: 50px;
    padding: 0 1.5rem;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    justify-content: center;
    position: relative;
  }

  li:not(.selected)::after {
    position: absolute;
    right: 35px;
    content: "»";
    opacity: 0;
    transition: all 0.25s ease-in-out;
  }

  li:not(.selected):hover {
    cursor: pointer;
  }

  li:not(.selected):hover::after {
    opacity: 1;
    transform: translateX(25px);
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .join-button {
    margin: 10px auto;
    padding: 4px;
    width: 90%;
  }

  img {
    vertical-align: middle;
  }

  .selected {
    background-color: rgba(0, 0, 0, 0.05);
  }
</style>

<ul>
  <button on:click={handleOpen} class="join-button">
    <img src="/join-room.svg" alt="Join Room" />
  </button>
  {#each Object.entries(rooms).reverse() as [room, username] (room)}
    <li
      transition:slide
      class:selected={room === activeRoom}
      on:click={() => handleClick(room, username)}>
      <span>{room}</span>
    </li>
  {/each}
</ul>

{#if visible}
  <Modal on:close={handleClose} on:joinRoom={joinRoom} />
{/if}
