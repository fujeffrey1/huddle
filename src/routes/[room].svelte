<script>
  import { stores } from "@sapper/app";
  const { page } = stores();

  $: room = $page.params.room;
</script>

<h1>{room}</h1>
