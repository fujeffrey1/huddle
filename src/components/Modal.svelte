<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { socketStore as socket } from "./stores/socket";

  const dispatch = createEventDispatcher();

  let room = "";
  let username = "";

  $: roomTrimmed = room.trim();
  $: usernameTrimmed = username.trim();

  function handleSubmit() {
    $socket.emit(
      "join room",
      {
        room: roomTrimmed,
        username: usernameTrimmed
      },
      function(data) {
        dispatch("close");
        dispatch("joinRoom", data);
      }
    );
  }
</script>

<style>
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 10px;
    width: 35%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 24px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    cursor: pointer;
  }

  .form-group {
    position: relative;
    margin-top: 2.25rem;
    margin-bottom: 2.25rem;
  }

  .form-group input {
    height: 1.9rem;
    display: block;
    padding: 0.125rem 0.125rem 0.0625rem;
    font-size: 1rem;
    border-width: 0;
    width: 100%;
    transition: all 0.28s ease;
  }

  .form-group .control-label {
    position: absolute;
    top: 0.25rem;
    pointer-events: none;
    padding-left: 0.125rem;
    z-index: 1;
    color: #b3b3b3;
    font-size: 1rem;
    transition: all 0.28s ease;
  }

  .form-group .bar {
    border-bottom: 0.0625rem solid #999;
    display: block;
  }

  .form-group .bar::before {
    content: "";
    height: 0.125rem;
    width: 0;
    left: 50%;
    bottom: -0.0625rem;
    position: absolute;
    background: rgba(0, 200, 128, 0.7);
    transition: left 0.28s ease, width 0.28s ease;
    z-index: 2;
  }

  .form-group input:focus ~ .control-label,
  .form-group input:not(:placeholder-shown) ~ .control-label {
    font-size: 0.8rem;
    color: gray;
    top: -1rem;
    left: 0;
  }

  .form-group input:focus ~ .control-label {
    color: rgba(0, 200, 128, 0.7);
  }

  .form-group input:focus {
    outline: none;
  }

  .form-group input:focus ~ .bar::before {
    width: 100%;
    left: 0;
  }

  .submit-button {
    padding: 8px 20px;
    width: 100%;
    font-size: 16px;
  }

  .submit-button:disabled {
    opacity: 0.7;
  }
</style>

<div class="modal" transition:fade>
  <div class="modal-content">
    <span class="close" on:click={e => dispatch('close')}>&times;</span>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <input type="text" bind:value={room} placeholder=" " required />
        <label for="input" class="control-label">Room #</label>
        <i class="bar" />
      </div>
      <div class="form-group">
        <input type="text" bind:value={username} placeholder=" " />
        <label for="input" class="control-label">Username</label>
        <i class="bar" />
      </div>
      <button type="submit" class="submit-button" disabled={!roomTrimmed}>
        Join
      </button>
    </form>
  </div>
</div>
