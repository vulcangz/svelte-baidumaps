<script>
  import loader from './loader.js'
  import { onMount, createEventDispatcher } from 'svelte'
  import { mapsLoaded, mapsLoading } from './stores.js'
  // Just used in local dev env
  // import { apiKey } from './constants.js'

  const dispatch = createEventDispatcher()
  
  export let apiKey

  $: $mapsLoaded && dispatch('ready')

  onMount(() => {
    window.byBmapsReady = () => {
      mapsLoaded.set(true)
      delete window['byBmapsReady']
    }

    if ($mapsLoaded) {
      dispatch('ready')
    }

    if (!$mapsLoading) {
      const url = [
        '//api.map.baidu.com/api?v=2.0&',
        apiKey ? `ak=${apiKey}&` : '',
        `&callback=byBmapsReady`
      ].join('')

      mapsLoading.set(true)

      loader(
        url,
        () => { return $mapsLoaded }
      )
    }
  })
</script>
