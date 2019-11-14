<script>
  import { NotificationDisplay } from "@beyonk/svelte-notifications";
  import RoomList from "../components/RoomList.svelte";
  import Room from "../components/Room.svelte";

  let activeRoom;
  let activeUsername;
</script>

<style>
  .content {
    display: flex;
    height: 100%;
  }

  .room-list {
    flex: 1;
    border-right: 1px solid #ccc;
  }

  .room {
    flex: 4;
  }
</style>

<div class="content">
  <div class="room-list">
    <RoomList bind:activeRoom bind:activeUsername />
  </div>
  <div class="room">
    <Room {activeRoom} {activeUsername} />
  </div>
</div>

<NotificationDisplay />
