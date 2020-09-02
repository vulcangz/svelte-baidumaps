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
  
  export let location; // {Object|String}
  export let start; // {Object|String}
  export let end; // {Object|String}
  export let panel; // {String|HTMLElement}
  export let autoViewport; // Boolean
  export let selectFirstResult; // Boolean  
  export let highlightMode;
  
  let originInstance;

  function search(start, end) {
    originInstance.search(start, end);
  }

  onMount( async () => {
    const _location = location ? isPoint(location) ? createPoint(bdmap, location) : location : map;

    const route = originInstance = new bdmap.WalkingRoute(_location, {
      renderOptions: {
        map: map,
        panel: panel,
        selectFirstResult,
        autoViewport,
        highlightMode
      },

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