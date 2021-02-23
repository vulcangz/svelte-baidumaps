<script context="module">
  import { createPoint, createBounds } from '../utils/factory.js'
  import { isPoint } from '../utils/util.js'
</script>

<script>
  /**
   * 本地检索组件
   * 
   * @component LocalSearch
   * @example
   * <LocalSearch location={"广州"} keyword={"景点"} autoViewport="true" panel={"r-result"} pageCapacity={5} />
   */

  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { contextKey } from '../stores.js'

  const dispatch = createEventDispatcher();
  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()
  
	/**
	 * 检索区域，其类型可为地图实例、坐标点或城市名称的字符串。
	 * @type {object|string}
	 */
  export let location
  
	/**
	 * 本次检索关键字
	 * @type {string|Array.<string>}
	 */
  export let keyword
  
	/**
	 * 地理坐标的矩形区域
	 * @type {sw: {{lng: number, lat: number}} Point, ne: {{lng: number, lat: number}} Point}
	 */
  export let bounds

	/**
	 * 圆形区域
	 * @type {{center:{{lng: number, lat: number}}, radius: number}}
	 */
  export let nearby

	/**
	 * 每页容量
	 * @type {number}
	 */
  export let pageCapacity
  
	/**
	 * 结果列表的 HTML 容器 id 或容器元素
	 * @type {string|HTMLElement}
	 */
  export let panel; // {String|HTMLElement}

	/**
	 * 检索结束后是否自动调整地图视野
	 * @type {boolean}
	 */
  export let autoViewport =  true

	/**
	 * 是否选择第一个检索结果
	 * @type {boolean}
	 */
  export let selectFirstResult = true

	/**
	 * 驾车结果展现中点击列表后的展现策略
	 * @type {BMAP_HIGHLIGHT_STEP|BMAP_HIGHLIGHT_ROUTE}
	 */
  export let highlightMode
  
  let el;

  function searchNearby(local, nearby) {
    local.searchNearby(keyword, createPoint(bdmap, nearby.center), nearby.radius);
  }

  function searchInBounds(local, bounds) {
    local.searchInBounds(keyword, createBounds(bdmap, bounds));
  }

  function search(local) {
    nearby ? searchNearby(local, nearby) : bounds ? searchInBounds(local, bounds) : local.search(keyword);
  }

  onMount( async () => {

    const _location = location ? isPoint(location) ? createPoint(map, location) : location : map;
        
    let _opts = {
      map: map,
      selectFirstResult,
      autoViewport,
      highlightMode
    }
    
    if (panel !== "undefined") {
      _opts.panel = panel
    }

    const local = new bdmap.LocalSearch(_location, {
      onMarkersSet(e) {
        dispatch('markersset', e)
      },

      onInfoHtmlSet(e) {
        dispatch('infohtmlset', e)
      },

      onResultsHtmlSet(e) {
        dispatch('resultshtmlset', e)
      },

      onSearchComplete(e) {
        dispatch('searchcomplete', e)
      },      
      
      pageCapacity: pageCapacity,
      
      renderOptions: _opts
      
    })
    search(local)    
  })
</script>