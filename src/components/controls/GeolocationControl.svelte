<script>
	/**
	 * 地图定位的控件组件
	 *
	 * @component GeolocationControl
	 * @example
	 * <GeolocationControl position={"bottom-left"} offset={{width:30, height:30}} />
	 */

	import { getContext, createEventDispatcher } from 'svelte'
	import { contextKey } from '../stores.js'
	import { createSize } from '../utils/factory.js'

	const dispatch = createEventDispatcher()
	const { getMap, getBdMap } = getContext(contextKey)
	const map = getMap()
	const bdmap = getBdMap()

	/**
	 * 控件的停靠位置，默认定位到地图的右下角
	 * @type {'top-left'|'top-right'|'bottom-left'|'bottom-right'}
	 */
	export let position = 'bottom-right'

	/**
	 * 控件的水平偏移值
	 * @type {{width: number, height: number }}
	 */
	export let offset

	/**
	 * 是否显示定位信息面板。默认显示定位信息面板
	 * @type {boolean}
	 */
	export let showAddressBar = true;

	/**
	 * 添加控件时是否进行定位。默认添加控件时不进行定位
	 * @type {boolean}
	 */
	export let enableAutoLocation = false

	let options = {
		anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
		offset: createSize(bdmap, {
			width: (offset || {}).width || 20,
			height: (offset || {}).height || 20,
		}),
		showAddressBar: showAddressBar,
		enableAutoLocation: enableAutoLocation,
	}

	switch (position) {
		case 'top-left':
			options.anchor = BMAP_ANCHOR_TOP_LEFT;
			break;
		case 'top-right':
			options.anchor = BMAP_ANCHOR_TOP_RIGHT;
			break;
		case 'bottom-left':
			options.anchor = BMAP_ANCHOR_BOTTOM_LEFT;
			break;
		case 'bottom-right':
			options.anchor = BMAP_ANCHOR_BOTTOM_RIGHT;
			break;
		default:
			options.anchor = BMAP_ANCHOR_TOP_RIGHT;
			break;
	}

	const geolocation = new bdmap.GeolocationControl(options)
	geolocation.addEventListener('locationSuccess', function(e) {
		// 定位成功事件
		var address = ''
		address += e.addressComponent.province
		address += e.addressComponent.city
		address += e.addressComponent.district
		address += e.addressComponent.street
		address += e.addressComponent.streetNumber
		console.log('当前定位地址为：' + address)
	})
	geolocation.addEventListener('locationError', function(e) {
		// 定位失败事件
		console.log(e.message)
	})
	map.addControl(geolocation)
</script>
