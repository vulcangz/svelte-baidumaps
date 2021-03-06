<script context="module">	
	import { createSize, createSymbol } from '../utils/factory.js';
	import { ICONS, createDefaultSymbolIcon } from '../utils/icon.js';
</script>

<script>
	/**
	 * 图像标注组件
	 *
	 * @component Marker
	 * @example
	 * <Marker lng={116.404113} lat={39.919852} label="西雁翅楼" labelOffset={{weight: 30, height: 50}}
	 * 		icon={{ path: 'PIN_DROP', opts: { anchor: { width: 10, height: 10 }, fillColor: 'green', scale: 2 } }} />
	 */

	import { getContext, setContext } from 'svelte';
	import { contextKey, contextMarker } from '../stores.js';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	setContext(contextMarker, {
		getMarker: () => marker,
	});

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
	 * 文本标注的位置偏移值
	 * @type {{width: Number, height: Number}}
	 */
	export let labelOffset = {
		width: 20, // 水平方向的数值
		height: -10, // 竖直方向的数值
	};

	/**
	 * 标注拖拽功能, 默认关闭
	 * @type {boolean}
	 */
	export let enableDragging = false;

	/**
	 * 矢量图标参数
	 * @type {{ path: string, opts: {anchor: {width: number, height: number}, rotation: number,
	 *          fillColor: string, fillOpacity: number, scale: number,
	 *          strokeColor: string, strokeWeight: number  }}}
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
	// 创建标注
	marker = new bdmap.Marker(point, { icon: myIcon });

	if (enableDragging) {
		// marker可拖拽
		marker.enableDragging();
	}
	// 在地图中添加marker
	map.addOverlay(marker);
	marker.setAnimation(bdmap.BMAP_ANIMATION_BOUNCE);

	labelObject = new bdmap.Label(label, {
		offset: createSize(bdmap, labelOffset),
	});
	labelObject.setStyle({ color: 'red', fontSize: '1.2rem' });
	marker.setLabel(labelObject);
</script>

<slot />
