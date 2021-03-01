<script>
	import { getContext } from 'svelte'
	import { contextKey } from './stores.js';

	const { getMap, getBdMap } = getContext(contextKey);
  const map = getMap();
  const bdmap = getBdMap();

	export let markers;

	function clearMarkers() {
		for (var i = 0; i < markers.length; i++) {
				map.removeOverlay(markers[i]);
				markers[i] = null;
		}
		markers.length = 0;
	}

	if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
			var points = [];  // 添加海量点数据
			for (var i = 0; i < markers.length; i++) {
        // console.log(markers[i]);
        if (typeof markers[i].lng != "undefined" && typeof markers[i].lat != "undefined") {
          points.push(new bdmap.Point(markers[i].lng, markers[i].lat));
        } else if (typeof markers[i][0] != "undefined" && typeof markers[i][1] != "undefined") {
          points.push(new bdmap.Point(markers[i][0], markers[i][1]));
        } else {
          console.log("Error: Point data format error!")
        }
			}
			var options = {
				size: BMAP_POINT_SIZE_SMALL,
				shape: BMAP_POINT_SHAPE_STAR,
				color: '#d340c3'
			}
			var pointCollection = new bdmap.PointCollection(points, options);  // 初始化PointCollection
			pointCollection.addEventListener('click', function (e) {
				alert('单击点的坐标为：' + e.point.lng + '。位于：' + e.point.lat);  // 监听点击事件
			});
			map.addOverlay(pointCollection);  // 添加Overlay
  		//让所有点在视野范围内
			map.setViewport(points);
	} else {
			alert('请在chrome、safari、IE8+以上浏览器查看');
	}
</script>