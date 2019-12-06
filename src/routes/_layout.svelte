<script>
  import { NotificationDisplay } from "@beyonk/svelte-notifications";
  import Nav from "../components/Nav.svelte";
  import RoomList from "../components/RoomList.svelte";

  export let segment;
</script>

<style>
  main {
    position: fixed;
    height: 94%;
    width: 100%;
  }

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
    position: relative;
  }
</style>

<Nav {segment} />

<main>
  <div class="content">
    <div class="room-list">
      <RoomList />
    </div>
    <div class="room">
      <slot />
    </div>
  </div>
</main>

<NotificationDisplay />
