<script context="module">
  import { createPoint, createBounds } from '../utils/factory.js';
  import { isPoint } from '../utils/util.js';
</script>

<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { getContext } from 'svelte'
  import { contextKey } from '../stores.js'

  const dispatch = createEventDispatcher();
  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()
    
  // @see http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a7b0
  export let location; // Object, String
  export let keyword; // Array, String
  export let panel; // {String|HTMLElement}
  export let bounds; // Object
  export let nearby; // Object
  export let pageCapacity; // Number
  export let autoViewport; // Boolean
  export let selectFirstResult; // Boolean
  export let highlightMode; // String
  
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
        dispatch('markersset', e);
      },

      onInfoHtmlSet(e) {
        dispatch('infohtmlset', e);
      },

      onResultsHtmlSet(e) {
        dispatch('resultshtmlset', e);
      },

      onSearchComplete(e) {
        dispatch('searchcomplete', e);
      },      
      
      pageCapacity: pageCapacity,
      
      renderOptions: _opts
      
    });
    search(local);     
  })
</script>