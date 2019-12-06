<script>
  export let segment;
</script>

<style>
  nav {
    border-bottom: 1px solid #ccc;
    font-weight: 300;
    padding: 0 1em;
    height: 6%;
  }

  ul {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
    height: 100%;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: inline-block;
    height: 100%;
    position: relative;
    color: black;
    font-weight: bold;
  }

  a::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }
</style>

<nav>
  <ul>
    <li>
      <a href=".">Huddle</a>
    </li>
  </ul>
</nav>
