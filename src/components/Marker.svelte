<script>
	import { getContext } from 'svelte';
	import { contextKey } from './stores.js';

	const { getMap, getBdMap } = getContext(contextKey);
  const map = getMap();
  const bdmap = getBdMap();

	export let lng;
	export let lat;
	export let label;
	export let enableDragging = false;

	let point;
	let marker;
	let options = {};
	let labelObject;

	point = new bdmap.Point(lng, lat);
	marker = new bdmap.Marker(point);  // 创建标注

	if (!enableDragging) {
		marker.enableDragging(); //marker可拖拽
	}
	map.addOverlay(marker); //在地图中添加marker
	marker.setAnimation(bdmap.BMAP_ANIMATION_BOUNCE);

	labelObject = new bdmap.Label(label, {offset:new bdmap.Size(20,-10)});
	labelObject.setStyle({ color : "red", fontSize : "1.2rem" });
	marker.setLabel(labelObject);
</script>