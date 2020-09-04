<ApiSdk {apiKey} on:ready={initialise} />
<div bind:this={mapElement}>
	{#if map}
		<slot></slot>
	{/if}
</div>

<style>
  div {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import { setContext } from 'svelte';
  import { createEventDispatcher } from 'svelte'
  import ApiSdk from './ApiSdk.svelte'
  import { contextKey } from './stores.js';

  setContext(contextKey, {
    getMap: () => map,
    getBdMap: () => bdmap
  });
  
  const dispatch = createEventDispatcher();
  
  export let apiKey

  let mapElement;
  let map;
  let bdmap;
  let point;
  
  export let withCenterMarker = false;
  export let options = {
    zoom: 15
  }

  export function getDomBounds() {
    return mapElement.getBoundingClientRect()
  }

  export function getDefaultView() {
    return mapElement.ownerDocument.defaultView
  }

  export function setHeight(height) {
    mapElement.style.height = height
  }

  export function setMaxHeight(height) {
    mapElement.style.maxHeight = height
  }

  export function setCentre(location) {
    map.setCenter(location)
  }

  export function setPointsInView(pointArray) {
    map.setViewport(pointArray)
  }

  function initialise () {
    setTimeout(() => {
      bdmap = window['BMap'] = BMap;
      map = new bdmap.Map(mapElement, {
        enableBizAuthLogo: false
      });
      map.disableBizAuthLogo(); //关闭JSAPI商用授权挂件
      // map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      
      if (typeof options.lng !== "undefined" && typeof options.lat !== "undefined") {
        point = new bdmap.Point(options.lng, options.lat)
        
        map.centerAndZoom(point, options.zoom)
        
        if (withCenterMarker) {
          var marker = new bdmap.Marker(point);  // 创建标注
          marker.enableDragging(); //marker可拖拽
          map.addOverlay(marker); //在地图中添加marker
          var label = new bdmap.Label(options.label,{offset:new bdmap.Size(20,-10)});
          label.setStyle({ color : "red", fontSize : "1.2rem" });
          
          marker.setLabel(label);
        }
      }

      dispatch('ready')
    }, 1)
  }
</script>
