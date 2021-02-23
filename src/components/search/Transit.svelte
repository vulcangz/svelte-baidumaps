<script context="module">
  import { createPoint } from '../utils/factory.js'
  import { isPoint, getPosition } from '../utils/util.js'
</script>

<script>
  /**
   * 公交路线规划组件
   * 
   * @component Transit
   * @example
   * <Transit start={"百度大厦"} end={"北京邮电大学西门"} autoViewport="true" location={"北京"} panel={"d-result"} />
   * 
   */

  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { contextKey } from '../stores.js'
  
  const dispatch = createEventDispatcher();
  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()

  /** 
   * TransitPolicy
   * 此常量表示公交方案的策略。
   *
   * @see {@link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a7b9|百度地图JavaScript API v2.0类参考--TransitPolicy}
   */
  const transitRoutePolicy = [
    BMAP_TRANSIT_POLICY_LEAST_TIME,     // 最少时间
    BMAP_TRANSIT_POLICY_LEAST_TRANSFER, // 最少换乘
    BMAP_TRANSIT_POLICY_LEAST_WALKING,  // 最少步行
    BMAP_TRANSIT_POLICY_AVOID_SUBWAYS   // 不乘地铁
  ];
  
	/**
	 * 检索区域，其类型可为地图实例、坐标点或城市名称的字符串。
	 * @type {object|string}
	 */
  export let location; // {Object|String}

	/**
	 * 起点，参数可以是关键字、坐标点（自1.1版本支持）和LocalSearchPoi实例
	 * @type {object|string}
	 */
  export let start; // {Object|String}

	/**
	 * 起点，参数可以是关键字、坐标点（自1.1版本支持）和LocalSearchPoi实例
	 * @type {object|string}
	 */
  export let end; // {Object|String}

	/**
	 * 公交导航的策略参数
	 * @type {0|1|2|3}
	 */
  export let policy

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
  export let autoViewport = true

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
  
  let originInstance

  $: if ((policy < 0 && policy > 3 ) || policy === 'undefined') {
    policy = 0
  }
  
  function search(start, end) {
    originInstance.search(start, end)
  }

  onMount( async () => {
    const _location = location ? isPoint(location) ? createPoint(bdmap, location) : location : map

    const route = originInstance = new bdmap.TransitRoute(_location, {
      renderOptions: {
        map: map,
        panel: panel,
        selectFirstResult,
        autoViewport,
        highlightMode
      },
      policy: transitRoutePolicy[policy],
      pageCapacity,

      onSearchComplete(e) {
        if (originInstance && originInstance !== route) {
          originInstance.clearResults()
        }

        dispatch('searchcomplete', e)
      },

      onMarkersSet(e) {
        dispatch('markersset', e)
      },

      onInfoHtmlSet(e) {
        dispatch('infohtmlset', e)
      },

      onPolylinesSet(e) {
        dispatch('polylinesset', e)
      },

      onResultsHtmlSet(e) {
        dispatch('resultshtmlset', e)
      }

    });
    search(isPoint(start) ? createPoint(bdmap, start) : start, isPoint(end) ? createPoint(bdmap, end) : end)
  })
</script>
