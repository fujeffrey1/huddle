<script>
  import { slide } from "svelte/transition";
  import { onDestroy } from "svelte";
  import { socketStore as socket } from "./store.js";
  import Modal from "./Modal.svelte";

  let visible = false;
  let activeRoom = "";
  let rooms = {};

  function handleOpen(event) {
    visible = true;
  }

  function handleClose(event) {
    visible = false;
  }

  function handleClick(room) {
    activeRoom = room;
  }

  function joinRoom({ detail: { room, username } }) {
    rooms[room] = username;
    activeRoom = room;
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

  li::after {
    position: absolute;
    right: 35px;
    content: "»";
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  li:hover {
    cursor: pointer;
  }

  li:hover::after {
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
    padding: 4px 20px;
    width: 90%;
    border-radius: 50px;
    background-color: rgba(0, 200, 128, 0.7);
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
  {#each Object.keys(rooms).reverse() as room}
    <li
      class:selected={room === activeRoom}
      transition:slide
      on:click={() => handleClick(room)}>
      <span>{room}</span>
    </li>
  {/each}
</ul>

{#if visible}
  <Modal on:close={handleClose} on:joinRoom={joinRoom} />
{/if}
