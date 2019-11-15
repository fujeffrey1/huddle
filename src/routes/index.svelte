<script>
  import { NotificationDisplay } from "@beyonk/svelte-notifications";
  import RoomList from "../components/RoomList.svelte";
  import Room from "../components/Room.svelte";
  import { messageStore } from "../components/stores/message";

  let rooms = {};
  let activeRoom = "";
  let activeUsername = "";

  function joinRoom({ detail: { room, username } }) {
    rooms[room] = username;
    messageStore.join(room, username);
    activeRoom = room;
    activeUsername = username;
  }

  function clickRoom({ detail: { room, username } }) {
    activeRoom = room;
    activeUsername = username;
  }

  function leaveRoom({ detail: room }) {
    delete rooms[room];
    rooms = rooms;
    activeRoom = "";
    activeUsername = "";
    messageStore.close(room);
  }
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
    <RoomList
      {rooms}
      {activeRoom}
      {activeUsername}
      on:joinRoom={joinRoom}
      on:clickRoom={clickRoom} />
  </div>
  <div class="room">
    <Room {activeRoom} {activeUsername} on:leaveRoom={leaveRoom} />
  </div>
</div>

<NotificationDisplay />
