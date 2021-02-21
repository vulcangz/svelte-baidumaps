<script>
	/**
	 * 城市选择列表控件组件
	 *
	 * @component CityListControl
	 * @example
	 * <CityListControl position={"top-left"} offset={{width: 10, height: 20}} />
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
	export let position = 'top-right';

	/**
	 * 控件的偏移值
	 * @type {{width: number, height: number }}
	 */
	export let offset = {
		width: 0,
		height: 0
	}

	let options = {
		anchor: BMAP_ANCHOR_TOP_RIGHT,
		offset: createSize(bdmap, {
			width: (offset || {}).width || 10,
			height: (offset || {}).height || 20,
		}),
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
			options.anchor = BMAP_ANCHOR_TOP_LEFT;
			break;
	}

	const clctl = new bdmap.CityListControl(options);
	map.addControl(clctl);
</script>
