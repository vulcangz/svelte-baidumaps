<script>
	import { getContext } from 'svelte';
	import { contextKey } from './stores.js';
  import { createSymbol } from './utils/factory.js';
  import { ICONS, createDefaultSymbolIcon } from './utils/icon.js';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 地理经度
	 * @type {number}
	 */
	export let lng;

	/**
	 * 地理纬度
	 * @type {number}
	 */
	export let lat;

	/**
	 * 标注的文本标注
	 * @type {string}
	 */
	export let label;

	/**
	 * 标注拖拽功能, 默认关闭
	 * @type {boolean}
	 */
	export let enableDragging = false;

	/**
	 * 矢量图标参数
	 * @type {{ path: string, anchor: object{width: number, height: number}, rotation: number,
   *          fillColor: string, fillOpacity: number, scale: number,
   *          strokeColor: string, strokeWeight: number  }}
	 */
  export let icon = {
		path: '',
		opts: {},
	};

	let point;
	let marker;
	let labelObject;
	let myIcon;

	if (icon && icon instanceof bdmap.Icon) {
		myIcon = icon;
	} else {
		if (icon && icon.path && ICONS[icon.path]) {
      myIcon = createSymbol(bdmap, {
				path: ICONS[icon.path],
				opts: {
					anchor: {
						width: ((icon.opts || {}).anchor || {}).width || 10,
						height: ((icon.opts || {}).anchor || {}).height || 10,
					},
					rotation: (icon.opts || {}).rotation || 0,
					fillColor: (icon.opts || {}).fillColor || 'red',
					fillOpacity: (icon.opts || {}).fillOpacity || 0.8,
					scale: (icon.opts || {}).scale || 1,
					strokeColor: (icon.opts || {}).strokeColor || '#555',
					strokeWeight: (icon.opts || {}).strokeWeight || 1,
				},
			});
		} else {
			myIcon = createDefaultSymbolIcon(bdmap);
		}
  }

	point = new bdmap.Point(lng, lat);
	marker = new bdmap.Marker(point, { icon: myIcon }); // 创建标注

	if (!enableDragging) {
		marker.enableDragging(); //marker可拖拽
	}
	map.addOverlay(marker); //在地图中添加marker
	marker.setAnimation(bdmap.BMAP_ANIMATION_BOUNCE);

	labelObject = new bdmap.Label(label, { offset: new bdmap.Size(20, -10) });
	labelObject.setStyle({ color: 'red', fontSize: '1.2rem' });
	marker.setLabel(labelObject);
</script>
