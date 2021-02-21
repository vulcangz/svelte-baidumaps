<script context="module">
  import { createPoint, createIconSequence } from '../utils/factory.js';
</script>

<script>
  /**
   * 折线地图叠加层组件
   * 
   * @component Polyline
   * @example
   * <Polyline path={[ { lng: 116.399, lat: 39.910 }, { lng: 116.405, lat: 39.920 }, { lng: 116.425, lat: 39.900 } ]} strokeColor={"blue"} strokeWeight={2} strokeOpacity={0.5} editing={editing} />
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
  export let strokeWeight

	/**
	 * 边线透明度，取值范围 0 - 1
	 * @type {number}
	 */
  export let strokeOpacity

	/**
	 * 边线的样式，solid 或 dashed
	 * @type {'solid'|'dashed'}
	 */
  export let strokeStyle = 'solid'
  
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

	/**
	 * 配置贴合折线的图标
   * @see {@link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b13|百度地图JavaScript API v2.0类参考--IconSequence}
	 * @type {Array.<symbol: Symbol, offset: string, repeat: string, fixedRotation: boolean>}
	 */
  export let icons = []
  
  let originInstance
  
  const iconSequences = (() => {
    return icons.map(item => {
      return createIconSequence(bdmap, item);
    });
  })();
  
  $: if (originInstance) {
    editing ? originInstance.enableEditing() : originInstance.disableEditing();
  }

  onMount( async () => {
    const overlay = new bdmap.Polyline(path.map(item => createPoint(bdmap, {
      lng: item.lng,
      lat: item.lat
    })), {
      strokeColor,
      strokeWeight,
      strokeOpacity,
      strokeStyle,
      enableEditing: editing,
      enableMassClear: massClear,
      enableClicking: clicking,
      icons: iconSequences
    });
        
    originInstance = overlay;
    map.addOverlay(overlay);
  })
</script>

