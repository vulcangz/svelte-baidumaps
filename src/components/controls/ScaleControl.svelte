<script context="module">
  import { createSize } from '../utils/factory.js';
</script>

<script>
  /**
   * 比例尺控件组件
   * 
   * @component ScaleControl
   * @example
   * <ScaleControl position={"top-right"} offset={{width: 30, height: 20}} />
   */

	import { getContext } from 'svelte'
	import { contextKey } from '../stores.js'

	const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()

  /**
   * 控件的停靠位置
   * @type {'top-left'|'top-right'|'bottom-left'|'bottom-right'}
   */
  export let position = 'top-left'

  /**
   * 控件的偏移值
   * @type {{width: number, height: number}}
   */
  export let offset  
  
	let options = {
		anchor: BMAP_ANCHOR_TOP_LEFT,
		offset: createSize(bdmap, {
			width: (offset || {}).width || 20,
			height: (offset || {}).height || 20,
		})
	};
  
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
        options.anchor = BMAP_ANCHOR_TOP_LEFT;
        break;
  }

  const scale = new bdmap.ScaleControl(options)
  map.addControl(scale)
</script>