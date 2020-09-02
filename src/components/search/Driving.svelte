<script context="module">
  import { createPoint } from '../utils/factory.js';
  import { isPoint, getPosition } from '../utils/util.js';
</script>

<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { getContext } from 'svelte'
  import { contextKey } from '../stores.js'
  
  const dispatch = createEventDispatcher();
  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()
  
  /** 
   * DrivingPolicy
   * 此枚举类型表示驾车方案的策略配置。
   *
   * @see http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a7b19
   */
  const drivingRoutePolicy = [
    bdmap_DRIVING_POLICY_LEAST_TIME,     // 最少时间
    bdmap_DRIVING_POLICY_LEAST_DISTANCE, // 最短距离
    bdmap_DRIVING_POLICY_AVOID_HIGHWAYS  // 避开高速
  ];
  
  export let location; // {Object|String}
  export let start; // {Object|String}
  export let end; // {Object|String}
  export let startCity; // [String, Number]
  export let endCity; // [String, Number]
  export let waypoints; // Array
  export let policy; // String
  export let panel; // {String|HTMLElement}
  export let autoViewport; // Boolean
  export let selectFirstResult; // Boolean
  export let highlightMode; // String
  
  let originInstance;

  $: if ((policy < 0 && policy > 2 ) || policy === 'undefined') {
    policy = 0;
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
      return waypoints.map(position => getPosition(bdmap, position));
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
          originInstance.clearResults();
        }

        dispatch('searchcomplete', e);
      },

      onMarkersSet(e) {
        dispatch('markersset', e);
      },

      onInfoHtmlSet(e) {
        dispatch('infohtmlset', e);
      },

      onPolylinesSet(e) {
        dispatch('polylinesset', e);
      },

      onResultsHtmlSet(e) {
        dispatch('resultshtmlset', e);
      }

    });
    search(getPosition(bdmap, start), getPosition(bdmap, end), {
      startCity,
      endCity,
      waypoints: getWaypoints(waypoints)
    });
  })
</script>