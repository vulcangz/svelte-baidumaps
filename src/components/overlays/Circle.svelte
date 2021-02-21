<script context="module">
  import { createPoint } from '../utils/factory.js';
</script>

<script>
  /**
   * 圆覆盖物组件
   * 
   * @component Circle
   * @example
   * <Circle center={{lng: 116.404, lat: 39.915}} radius={"500"} strokeColor={"blue"} strokeWeight={2} strokeOpacity={0.5} editing={true} />
   */

  import { onMount, createEventDispatcher } from 'svelte';
  import { getContext } from 'svelte'
  import { contextKey } from '../stores.js'
  
  const dispatch = createEventDispatcher();
  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()  
  
	/**
	 * 圆形的中心点坐标
	 * @type {{lng: Number, lat: Number}}
	 */
  export let center

	/**
	 * 圆形的半径，单位为米
	 * @type {number}
	 */
  export let radius

	/**
	 * 圆形边线颜色
	 * @type {string}
	 */
  export let strokeColor = "blue"

	/**
	 * 圆形边线的宽度，以像素为单位
	 * @type {number}
	 */
  export let strokeWeight = 2

	/**
	 * 圆形边线透明度，取值范围0 - 1
	 * @type {number}
	 */
  export let strokeOpacity = 0.5

	/**
	 * 圆形边线的样式，solid 或 dashed
	 * @type {'solid'|'dashed'}
	 */
  export let strokeStyle = 'solid'

	/**
	 * 圆形填充颜色。当参数为空时，圆形将没有填充效果
	 * @type {string}
	 */
  export let fillColor = ''

	/**
	 * 圆形填充的透明度，取值范围 0 - 1
	 * @type {number}
	 */
  export let fillOpacity = 0.5

	/**
	 * 是否在调用map.clearOverlays清除此覆盖物，默认为true
	 * @type {boolean}
	 */
  export let massClear = true

	/**
	 * 是否响应点击事件，默认为 true
	 * @type {boolean}
	 */
  export let clicking = true

	/**
	 * 是否启用线编辑，默认为 false
	 * @type {boolean}
	 */
  export let editing = false
  
  let originInstance
  
  $: if (originInstance) {
    editing ? originInstance.enableEditing() : originInstance.disableEditing()
  }

  onMount( async () => {
    const overlay = new bdmap.Circle(createPoint(bdmap, {
      lng: center.lng,
      lat: center.lat
    }), radius, {
      strokeColor,
      strokeWeight,
      strokeOpacity,
      strokeStyle,
      fillColor,
      fillOpacity,
      enableEditing: editing,
      enableMassClear: massClear,
      enableClicking: clicking
    })
    originInstance = overlay
        
    map.addOverlay(overlay)
  })
</script>

