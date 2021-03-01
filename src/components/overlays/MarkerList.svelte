<script>
	/**
	 * 多个图像标注组件
	 *
	 * @component MarkerList
	 * @example
	 * <MarkerList markers={[ [74.438,39.006,1], [74.932,38.382,1], [75.402,37.879,1], [75.24,38.777,1] ]} />
	 */

	import { getContext } from 'svelte';
	import { contextKey } from '../stores.js';
	import Marker from './Marker.svelte';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 要在地图上展示的点坐标集合
	 * @type {Array.<{lng: number, lat: number, label: string}}>}
	 */
	export let markers;

	function clearMarkers() {
		for (var i = 0; i < markers.length; i++) {
			map.removeOverlay(markers[i]);
			markers[i] = null;
		}
		markers.length = 0;
	}

	// 判断当前浏览器是否支持绘制海量点
	var points = []; // 添加海量点数据
	for (var i = 0; i < markers.length; i++) {
		// console.log(markers[i])
		if (
			typeof markers[i].lng != 'undefined' &&
			typeof markers[i].lat != 'undefined'
		) {
			points.push(new bdmap.Point(markers[i].lng, markers[i].lat));
		} else {
			console.log('Error: Point data format error!');
		}
	}

	// 让所有点在视野范围内
	map.setViewport(points);
</script>

{#each markers as marker}
	<Marker lng={marker.lng} lat={marker.lat} label={Marker.label} />
{/each}
