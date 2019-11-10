<script>
  import Modal from "./Modal.svelte";

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
    vertical-align: middle;
  }

  .join-button {
    margin: 10px auto;
    padding: 8px 20px;
    width: 90%;
    border-radius: 50px;
    background-color: rgba(0, 200, 128, 0.7);
    font-size: 16px;
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
    <span>Join Room</span>
  </button>
  <li class="selected">
    <span>
      testdakfkjandjkajnvdnknjvkajkjnvdakvknjavkjnvdaknjkjnvdakjndvakjnvadkjvnda
    </span>
  </li>
  <li>
    <span>test</span>
  </li>
  <li>
    <span>test</span>
  </li>
</ul>

{#if visible}
  <Modal on:click={handleClose} />
{/if}
