<script lang="ts">
  import Router from 'svelte-spa-router';
  // Import the list of routes
  import routes from './routes';
</script>

<main class="flex items-center justify-center  h-screen w-screen">
  <!-- Show the router -->
  <Router {routes} />
</main>
