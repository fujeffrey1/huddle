<script>
  import { NotificationDisplay } from "@beyonk/svelte-notifications";
  import RoomList from "../components/RoomList.svelte";
  import Room from "../components/Room.svelte";
  import { userStore } from "../components/stores/user";
  import { messageStore } from "../components/stores/message";

  let activeRoom = "";
  let activeUsername = "";

  function joinRoom({ detail: { room, me, others } }) {
    userStore.join(room, me, others);
    messageStore.join(room, me);
    activeRoom = room;
    activeUsername = me;
  }

  function clickRoom({ detail: { room, me } }) {
    activeRoom = room;
    activeUsername = me;
  }

  function leaveRoom({ detail: room }) {
    activeRoom = "";
    activeUsername = "";
    userStore.leave(room);
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
    max-width: 380px;
  }

  .room {
    flex: 4;
  }
</style>

<div class="content">
  <div class="room-list">
    <RoomList
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
