<script>
	/**
	 * 缩略地图控件组件
	 *
	 * @component OverviewMapControl
	 * @example
	 * <OverviewMapControl position={"bottom-left"} offset={{width:30, height:30}} size={{width:300, height:200}} isOpen={true} />
	 */

	import { getContext } from 'svelte';
	import { contextKey } from '../stores.js';
	import { createSize } from '../utils/factory.js';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 控件的停靠位置
	 * @type {'top-left'|'top-right'|'bottom-left'|'bottom-right'}
	 */
	export let position = 'bottom-right';

	/**
	 * 控件的偏移值
	 * @type {{width: number, height: number }}
	 */
	export let offset = null;

	/**
	 * 缩略地图控件的大小
	 * @type {{width: number, height: number }}
	 */
	export let size = null;

	/**
	 * 缩略地图添加到地图后的开合状态，默认为关闭
	 * @type {boolean}
	 */
	export let isOpen = false;

	let options = {
		anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
		offset: createSize(bdmap, {
			width: (offset || {}).width || 20,
			height: (offset || {}).height || 20,
		}),
		size: createSize(bdmap, {
			width: (size || {}).width || 200,
			height: (size || {}).height || 200,
		}),
		isOpen: isOpen,
	};

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
			options.anchor = BMAP_ANCHOR_BOTTOM_RIGHT;
			break;
	}

	const ovctl = new bdmap.OverviewMapControl(options);
	map.addControl(ovctl);
</script>
