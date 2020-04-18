<script>
	import { getContext } from 'svelte'
	import { contextKey } from '../stores.js'

	const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()

  export let position = 'top-left'
  export let options = {}
  
  if (!!options) {
    switch (position) {
      case "top-left":
          options.anchor = BMAP_ANCHOR_TOP_LEFT;
          break;
      case "top-right":
          options.anchor = BMAP_ANCHOR_TOP_RIGHT;
          break;
      case "bottom-left":
          options.anchor = BMAP_ANCHOR_BOTTOM_LEFT;
          break;
      case "bottom-right":
          options.anchor = BMAP_ANCHOR_BOTTOM_RIGHT;
          break;
      default:
          options.anchor = BMAP_ANCHOR_TOP_RIGHT;
          break;
    }
  }

  const scale = new bdmap.ScaleControl(options)
  map.addControl(scale)
</script>