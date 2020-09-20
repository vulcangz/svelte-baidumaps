<script context="module">
  import { createPoint, createIconSequence } from '../utils/factory.js';
</script>

<script>
  import { onMount, createEventDispatcher } from 'svelte';
  import { getContext } from 'svelte'
  import { contextKey } from '../stores.js'
  
  const dispatch = createEventDispatcher();
  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()
  
  export let path; // Array
  export let strokeColor; // String
  export let strokeWeight; // Number
  export let strokeOpacity; // Number
  export let strokeStyle; // String
  export let massClear = true; // Boolean
  export let clicking = true; // Boolean
  export let editing = false; // Boolean
  export let icons = []; // Array
  
  let originInstance;
  
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

