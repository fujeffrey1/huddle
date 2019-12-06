<script>
  import { goto } from "@sapper/app";
  import { slide } from "svelte/transition";
  import Icon from "fa-svelte";
  import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
  import Modal from "./Modal.svelte";
  import { activeStore } from "./stores/active";
  import { userStore } from "./stores/user";

  let visible = false;

  function handleOpen(event) {
    visible = true;
  }

  function handleClose(event) {
    visible = false;
  }
</script>

<style>
  ul {
    padding: 0;
    margin: 0;
    overflow-y: auto;
    height: 100%;
  }

  li {
    display: flex;
    height: 50px;
    line-height: 50px;
    padding-left: 1rem;
    padding-right: 1.5rem;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    position: relative;
    align-items: center;
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

  .badge {
    display: inline-block;
    border-radius: 5px;
    background-color: teal;
    color: white;
    padding: 0 10px;
    font-size: 12px;
  }

  .room {
    margin-left: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .join-button {
    display: flex;
    justify-content: center;
    margin: 10px auto;
    padding: 5px;
    font-size: 22px;
    width: 90%;
  }

  .selected {
    background-color: rgba(0, 0, 0, 0.05);
  }
</style>

<ul>
  <button on:click={handleOpen} class="join-button theme-button">
    <Icon icon={faPlusCircle} />
  </button>
  {#each Object.entries($userStore).reverse() as [room, { me, others }] (room)}
    <li
      transition:slide
      class:selected={room === $activeStore.activeRoom}
      on:click={() => {
        activeStore.setActive(room, me);
        goto(`/${room}`);
      }}>
      <div class="tooltip">
        <span class="badge">{Object.keys(others).length + 1}</span>
        <span class="tooltiptext right">
          <strong>{me}</strong>
          {#each Object.keys(others) as other}
            {other}
            <br />
          {/each}
        </span>
      </div>
      <span class="room">{room}</span>
    </li>
  {/each}
</ul>

{#if visible}
  <Modal on:close={handleClose} />
{/if}
