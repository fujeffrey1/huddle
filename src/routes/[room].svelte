<script>
  import { goto } from "@sapper/app";
  import { stores } from "@sapper/app";
  import Modal from "../components/Modal.svelte";
  import Room from "../components/Room.svelte";
  import { activeStore } from "../components/stores/active";

  const { page } = stores();

  $: room = $page.params.room;
  $: activeRoom = $activeStore.activeRoom;
  $: activeUsername = $activeStore.activeUsername;
</script>

{#if !activeUsername}
  <Modal
    {room}
    on:close={() => {
      goto('/');
    }} />
{:else}
  <Room {activeRoom} {activeUsername} />
{/if}
