<script>
	/**
	 * 海量点组件
	 *
	 * @component PointCollection
	 * @example
	 * <PointCollection markers={[ [74.438,39.006,1], [74.932,38.382,1], [75.402,37.879,1], [75.24,38.777,1] ]} />
	 */

	import { getContext } from 'svelte'
	import { contextKey } from '../stores.js'

	const { getMap, getBdMap } = getContext(contextKey)
	const map = getMap()
	const bdmap = getBdMap()

	/**
	 * 要在地图上展示的点坐标集合
	 * @type {Array.<{{lng: number, lat: number}}>}
	 */
	export let markers = null

	function clearMarkers() {
		for (var i = 0; i < markers.length; i++) {
			map.removeOverlay(markers[i])
			markers[i] = null
		}
		markers.length = 0
	}

	if (document.createElement('canvas').getContext) {
		// 判断当前浏览器是否支持绘制海量点
		var points = []; // 添加海量点数据
		for (var i = 0; i < markers.length; i++) {
			// console.log(markers[i])
			if (
				typeof markers[i].lng != 'undefined' &&
				typeof markers[i].lat != 'undefined'
			) {
				points.push(new bdmap.Point(markers[i].lng, markers[i].lat))
			} else if (
				typeof markers[i][0] != 'undefined' &&
				typeof markers[i][1] != 'undefined'
			) {
				points.push(new bdmap.Point(markers[i][0], markers[i][1]))
			} else {
				console.log('Error: Point data format error!')
			}
		}
		
		var options = {
			size: BMAP_POINT_SIZE_SMALL,
			shape: BMAP_POINT_SHAPE_STAR,
			color: '#d340c3',
		}

		// 初始化PointCollection
		var pointCollection = new bdmap.PointCollection(points, options)
		pointCollection.addEventListener('click', function(e) {
			alert('单击点的坐标为：' + e.point.lng + ', ' + e.point.lat); // 监听点击事件
		});

		// 添加Overlay
		map.addOverlay(pointCollection)
		// 让所有点在视野范围内
		map.setViewport(points)
	} else {
		alert('请在chrome、safari、IE8+以上浏览器查看')
	}
</script>
