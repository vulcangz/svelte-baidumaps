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
   * TransitPolicy
   * 此常量表示公交方案的策略。
   *
   * @see http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a7b9
   */
  const transitRoutePolicy = [
    BMAP_TRANSIT_POLICY_LEAST_TIME,     // 最少时间
    BMAP_TRANSIT_POLICY_LEAST_TRANSFER, // 最少换乘
    BMAP_TRANSIT_POLICY_LEAST_WALKING,  // 最少步行
    BMAP_TRANSIT_POLICY_AVOID_SUBWAYS   // 不乘地铁
  ];
  
  export let location; // {Object|String}
  export let start; // {Object|String}
  export let end; // {Object|String}
  export let panel // {String|HTMLElement}
  export let policy; // {Number:0|1|2|3}
  export let pageCapacity; // Number
  export let autoViewport; // Boolean
  export let selectFirstResult; // Boolean
  export let highlightMode; // String
  
  let originInstance;

  $: if ((policy < 0 && policy > 3 ) || policy === 'undefined') {
    policy = 0;
  }
  
  function search(start, end) {
    originInstance.search(start, end);
  }

  onMount( async () => {
    const _location = location ? isPoint(location) ? createPoint(bdmap, location) : location : map;

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
    search(isPoint(start) ? createPoint(bdmap, start) : start, isPoint(end) ? createPoint(bdmap, end) : end);
  })
</script>
