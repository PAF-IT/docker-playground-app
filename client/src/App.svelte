<script>
  import {onMount} from "svelte"
  import {getData} from "./api.js"

  let data = ['Fetching data']
  onMount(async () => {
    data = await getData()
  })
</script>

<h2>Docker Playground Test App - Development</h2>
<div>
  Database entries: {#each data as entry}
    {JSON.stringify(entry)}<br>
  {/each}
</div>