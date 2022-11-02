// Components
import Home from './routes/Home.svelte';
import Metaverse from './routes/Metaverse.svelte';
import NotFound from './routes/NotFound.svelte';
// import Wild from './routes/Wild.svelte';

// Export the route definition object
export default {
  // Exact path
  '/': Home,
  '/metaverse': Metaverse,
  /*   // Using named parameters, with last being optional
  '/hello/:first/:last?': Name,

  // Wildcard parameter
  // Included twice to match both `/wild` (and nothing after) and `/wild/*` (with anything after)
  '/wild': Wild,
  '/wild/*': Wild, */

  // Catch-all, must be last
  '*': NotFound,
};
