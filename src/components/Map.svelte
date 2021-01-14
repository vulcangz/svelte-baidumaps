<script>
	/**
	 * 地图组件
	 *
	 * @component Map
	 * @example
	 * <Map apiKey={apiKey} 
	 * 		options={{ label: 'this is a map base demo', address: 'china beijing', lng: '116.404', lat: '39.915', zoom: 15 }}
	 * 		withCenterMarker={true}
	 * 		on:resize={e => console.log(e.detail.type, e.detail.size)}
				events={['dblclick', 'resize']}
		 >
	 */

  import { createEventDispatcher, setContext } from 'svelte'
  import ApiSdk from './ApiSdk.svelte'
  import { contextKey } from './stores.js'
	import { createDefaultSymbolIcon } from './utils/icon.js'
	import BaiduMapEvents from './utils/events.js'

  setContext(contextKey, {
    getMap: () => map,
    getBdMap: () => bdmap
  })
  
  const dispatch = createEventDispatcher()
  
	/**
	 * 百度地图 API KEY
	 * @type {string}
	 */
	export let apiKey
	
	/**
	 * 是否标注中心点。默认否。
	 * @type {boolean}
	 */  
	export let withCenterMarker = false

	/**
	 * 需要引入的 Map 事件。
	 * @see {@link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a0b0|Map 事件}
	 * @type {Array.<string>}
	 */  
	export let events = []

	/**
	 * 是否导入百度地图 Map 全部事件。默认否。建议通过 events 只引入需要用到的事件。
	 * @type {boolean}
	 */  
	export let withAllMapEvents = false
	
	/**
	 * 地图中心点配置
	 * @type {{label: string, address: string, lng: number, lat: number, zoom: number}}
	 */ 
  export let options = {
    zoom: 15
	}
	
  let mapElement
  let map
  let bdmap
  let point

	/**
	 * 获得地图元素的大小及其相对于视口的位置
	 * @param {}
	 * @returns {Object} DOMRect
	 */ 
  export function getDomBounds() {
    return mapElement.getBoundingClientRect()
  }

	/**
	 * 返回地图 document 对象所关联的 window 对象，如果没有，会返回 null
	 * @param {}
	 * @returns {?Object} window object
	 */ 
  export function getDefaultView() {
    return mapElement.ownerDocument.defaultView
  }

	/**
	 * 设置地图高度
	 * @param {number}
	 * @returns 
	 */ 
  export function setHeight(height) {
    mapElement.style.height = height
  }

	/**
	 * 设置地图最大高度
	 * @param {number}
	 * @returns 
	 */ 
  export function setMaxHeight(height) {
    mapElement.style.maxHeight = height
  }

	/**
	 * 设置地图中心点
	 * @param {{lng: number, lat: number}} Point
	 * @returns 
	 */ 
  export function setCentre(location) {
    map.setCenter(location)
  }

	/**
	 * 设置使`pointArray`中的所有点都显示在视口内
	 * @param {Array.<{{lng: number, lat: number}} Point>}
	 * @returns 
	 */ 
  export function setPointsInView(pointArray) {
    map.setViewport(pointArray)
  }

	/**
	 * 地图初始化回调
	 * @callback initialise
	 * @param 
	 * @returns 
	 */ 
	function initialise () {
    setTimeout(() => {
      bdmap = window['BMap'] = BMap;
      map = new bdmap.Map(mapElement, {
        enableBizAuthLogo: false
			});
			// 关闭JSAPI商用授权挂件
			map.disableBizAuthLogo();
			// 开启鼠标滚轮缩放
      // map.enableScrollWheelZoom(true);
      
      if (typeof options.lng !== "undefined" && typeof options.lat !== "undefined") {
        point = new bdmap.Point(options.lng, options.lat)
        
        map.centerAndZoom(point, options.zoom)
        
        if (withCenterMarker) {
					const myIcon = createDefaultSymbolIcon(bdmap)
					// 创建标注
          var marker = new bdmap.Marker(point, { icon: myIcon });
					// marker可拖拽
					marker.enableDragging()
					// 在地图中添加marker
          map.addOverlay(marker)
          var label = new bdmap.Label(options.label,{offset:new bdmap.Size(20,-10)})
          label.setStyle({ color : "red", fontSize : "1.2rem" })
          
          marker.setLabel(label)
        }
			}
			
			// `instance` 地图实例事件
			dispatch('instance', map)
			// `recentre` 事件
			dispatch('recentre', {
				center: map.getCenter()
			})

			const ev = events || (withAllMapEvents && BaiduMapEvents['svelte-map'])
			ev && ev.forEach(event => {
				const hasOn = event.slice(0, 2) === 'on'
				const eventName = hasOn ? event.slice(2) : event
				map.addEventListener(event, function(e) {
					dispatch(event, e)
				})
			})

			// map.addEventListener('dblclick', function(e) {
			//	dispatch('dblclick', e)
			// })

      dispatch('ready')
    }, 1)
  }
</script>

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
