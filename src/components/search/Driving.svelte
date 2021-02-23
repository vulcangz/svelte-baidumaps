<script context="module">
  import { createPoint } from '../utils/factory.js'
  import { isPoint, getPosition } from '../utils/util.js'
</script>

<script>
  /**
   * 驾车路线规划组件
   * 
   * @component Driving
   * @example
   * <Driving start="新街口" end="新街口" startCity="北京" endCity="南京" waypoints={[ '呼和浩特', { lng: 112.53, lat: 37.87, }, '陕西兵马俑' ]} autoViewport="true" panel={"d-result"} />
   * 
   */

  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { contextKey } from '../stores.js'
  
  const dispatch = createEventDispatcher()
  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()
  
  /** 
   * DrivingPolicy
   * 此枚举类型表示驾车方案的策略配置。
   *
   * @see {@link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a7b19|百度地图JavaScript API v2.0类参考--DrivingPolicy}
   */
  const drivingRoutePolicy = [
    BMAP_DRIVING_POLICY_LEAST_TIME,     // 最少时间
    BMAP_DRIVING_POLICY_LEAST_DISTANCE, // 最短距离
    BMAP_DRIVING_POLICY_AVOID_HIGHWAYS  // 避开高速
  ]
  
	/**
	 * 检索区域，其类型可为地图实例、坐标点或城市名称的字符串。
	 * @type {object|string}
	 */
  export let location
  
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
	 * 驾车查询的起点城市，可以是城市名或者城市编码
	 * @type {object|string}
	 */
  export let startCity

	/**
	 * 驾车查询的终点城市，可以是城市名或者城市编码
	 * @type {object|string}
	 */
  export let endCity
  
	/**
	 * 途经点集合，最多支持10个途经点，可以是名称也可以是坐标
	 * @type {object|string}
	 */
  export let waypoints

	/**
	 * 驾车策略
	 * @type {BMAP_DRIVING_POLICY_LEAST_TIME|BMAP_DRIVING_POLICY_LEAST_DISTANCE|BMAP_DRIVING_POLICY_AVOID_HIGHWAYS}
	 */
  export let policy
	
	/**
	 * 结果列表的 HTML 容器 id 或容器元素
	 * @type {string|HTMLElement}
	 */
  export let panel

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
  
  let originInstance

  $: if ((policy < 0 && policy > 2 ) || policy === 'undefined') {
    policy = 0
  }

  function search(start, end, {
    startCity,
    endCity,
    waypoints
  }) {
    originInstance.search(start, end, {
      startCity,
      endCity,
      waypoints: getWaypoints(waypoints)
    });
  }

  function getWaypoints(waypoints) {
    if (waypoints) {
      return waypoints.map(position => getPosition(bdmap, position))
    }
  }

  onMount( async () => {
  
    const _location = location ? isPoint(location) ? createPoint(bdmap, location) : location : map;

    const route = originInstance = new bdmap.DrivingRoute(_location, {
      renderOptions: {
        map: map,
        panel: panel,
        selectFirstResult,
        autoViewport,
        highlightMode
      },
      policy: drivingRoutePolicy[policy],

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

    })
    search(getPosition(bdmap, start), getPosition(bdmap, end), {
      startCity,
      endCity,
      waypoints: getWaypoints(waypoints)
    })
  })
</script>