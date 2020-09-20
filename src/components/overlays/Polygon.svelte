<script context="module">
  import { createPoint } from '../utils/factory.js';
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
  export let fillColor; // String
  export let fillOpacity; // Number
  export let massClear = true; // Boolean
  export let clicking = true; // Boolean  
  export let editing = false; // Boolean
  
  let originInstance;
  
  $: if (originInstance) {
    editing ? originInstance.enableEditing() : originInstance.disableEditing();
  }
  
  onMount( async () => {
    const overlay = new bdmap.Polygon(path.map(item => createPoint(bdmap, {
      lng: item.lng,
      lat: item.lat
    })), {
      strokeColor,
      strokeWeight,
      strokeOpacity,
      strokeStyle,
      fillColor,
      fillOpacity,
      enableEditing: editing,
      enableMassClear: massClear,
      enableClicking: clicking
    });
    originInstance = overlay;
    
    map.addOverlay(overlay);
            
    // bindEvents.call(this, overlay); // 这里有一个诡异的bug，直接给 editing 赋值时会出现未知错误，因为使用下面的方法抹平。

    // editing ? overlay.enableEditing() : overlay.disableEditing();
  })
</script>

