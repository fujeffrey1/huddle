<script>
  import io from "socket.io-client";
  import { onMount } from "svelte";
  import RoomList from "../components/RoomList.svelte";
  import Room from "../components/Room.svelte";

  onMount(() => {
    const socket = io();
  });
</script>

<style>
  .content {
    display: flex;
    height: 100%;
  }

  .room-list {
    flex: 1;
    border-right: 1px solid rgba(255, 62, 0, 0.1);
  }

  .room {
    flex: 4;
  }
</style>

<div class="content">
  <div class="room-list">
    <RoomList />
  </div>
  <div class="room">
    <Room />
  </div>
</div>
