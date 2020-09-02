<script context="module">
  import { createPoint } from '../utils/factory.js';
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
  
  export let location; // {Object|String}
  export let keyword; // String
  export let panel; // {String|HTMLElement}
  export let autoViewport; // Boolean
  export let selectFirstResult; // Boolean
  export let highlightMode; // String
  
  let busline;

  function search(keyword) {
    busline.getBusList(keyword);
  }

  onMount( async () => {

    const _location = location ? isPoint(location) ? createPoint(bdmap, location) : location : map;

    const route = busline = new bdmap.BusLineSearch(_location, {
      renderOptions: {
        map: map,
        panel: panel,
        selectFirstResult,
        autoViewport,
        highlightMode
      },

      onGetBusListComplete(e) {
        if (busline && busline !== route) {
          busline.clearResults();
        }

        dispatch('getbuslistcomplete', e);
      },

      onGetBusLineComplete(e) {
        if (busline && busline !== route) {
          busline.clearResults();
        }

        dispatch('getbuslinecomplete', e);
      },

      onBusListHtmlSet(e) {
        dispatch('buslisthtmlset', e);
      },

      onBusLineHtmlSet(e) {
        dispatch('buslinehtmlset', e);
      },

      onMarkersSet(e) {
        dispatch('markersset', e);
      },

      onPolylinesSet(e) {
        dispatch('polylinesset', e);
      }

    });
    search(keyword);
  })
</script>