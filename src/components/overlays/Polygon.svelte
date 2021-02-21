<script context="module">
  import { createPoint } from '../utils/factory.js';
</script>

<script>
  /**
   * 多边形覆盖物组件
   * 
   * @component Polygon
   * @example
   * <Polygon path={[ { lng: 116.387112, lat: 39.920977 }, { lng: 116.385243, lat: 39.913063 }, { lng: 116.394226, lat: 39.917988 }, { lng: 116.401772, lat: 39.921364 }, { lng: 116.41248, lat: 39.927893 } ]} strokeColor={"blue"} strokeWeight={2} strokeOpacity={0.5}  editing={editing} />
   * <Polygon path={[ { lng: 116.392214, lat: 39.918985 }, { lng: 116.41478, lat: 39.918985 }, { lng: 116.41478, lat: 39.911901 }, { lng: 116.392214, lat: 39.911901 } ]} strokeColor={"blue"} strokeWeight={2} strokeOpacity={0.5} editing={editing} />
   */

  import { onMount, createEventDispatcher } from 'svelte';
  import { getContext } from 'svelte'
  import { contextKey } from '../stores.js'
  
  const dispatch = createEventDispatcher();
  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()
  
	/**
	 * 多边型的点数组
	 * @type {Array.<number, number>}
	 */
  export let path
  
	/**
	 * 边线颜色
	 * @type {string}
	 */
  export let strokeColor

	/**
	 * 边线的宽度，以像素为单位
	 * @type {number}
	 */
  export let strokeWeight = 2

	/**
	 * 边线透明度，取值范围 0 - 1
	 * @type {number}
	 */
  export let strokeOpacity = 0.5

  /**
	 * 边线的样式，solid 或 dashed
	 * @type {'solid'|'dashed'}
	 */
  export let strokeStyle = 'solid'

	/**
	 * 填充颜色。当参数为空时，折线覆盖物将没有填充效果
	 * @type {string}
	 */
  export let fillColor = ''

	/**
	 * 填充的透明度，取值范围 0 - 1
	 * @type {number}
	 */
  export let fillOpacity = 0.5

	/**
	 * 是否在调用 map.clearOverlays 清除此覆盖物，默认为 true
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
  
  let originInstance;
  
  $: if (originInstance) {
    editing ? originInstance.enableEditing() : originInstance.disableEditing();
  }
  
  onMount( async () => {
    const overlay = new bdmap.Polygon(path.map(item => createPoint(bdmap, {
      lng: item.lng,
      lat: item.lat
    })), {
      strokeColor,
      strokeWeight,
      strokeOpacity,
      strokeStyle,
      fillColor,
      fillOpacity,
      enableEditing: editing,
      enableMassClear: massClear,
      enableClicking: clicking
    });
    originInstance = overlay;
    
    map.addOverlay(overlay);
  })
</script>

