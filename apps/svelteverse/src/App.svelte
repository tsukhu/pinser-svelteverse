<script lang="ts">
  import Router from 'svelte-spa-router';
  // Import the list of routes
  import routes from './routes';
  // export let name: string;
</script>

<main class="flex items-center justify-center  h-screen w-screen">
  <!--   <h1>svelte-spa-router sample</h1>
  <h2>Basic routing</h2>

  <ul class="flex flex-col w-full h-full">
    <li><a href="#/">Home</a></li>
    <li><a href="#/metaverse">Metaverse</a></li>
  </ul> -->
  <!-- Show the router -->
  <Router {routes} />
</main>
