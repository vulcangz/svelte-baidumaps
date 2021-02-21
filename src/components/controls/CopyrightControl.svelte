<script>
	/**
	 * 版权控件组件
	 *
	 * @component CopyrightControl
	 * @example
	 * <CopyrightControl id="{2}" content={"<a href='#' style='font-size:24px;background:yellow'>寄诸佛子，共结来缘。</a>"} offset={{width: 80,
    height: 220}}, position={"top-left"} />
	 */

	import { getContext } from 'svelte';
	import { contextKey } from '../stores.js';
	import { createSize } from '../utils/factory.js';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 该版权信息的唯一标识符
	 * @type {number}
	 */
	export let id = 1;

	/**
	 * 该版权的文本信息，用于显示在地图上，支持HTML内容
	 * @type {string}
	 */
	export let content;

	/**
	 * 控件的停靠位置
	 * @type {'top-left'|'top-right'|'bottom-left'|'bottom-right'}
	 */
	export let position = 'top-left';

	/**
	 * 控件的偏移值
	 * @type {{width: number, height: number }}
	 */
	export let offset;

	let options = {
		anchor: BMAP_ANCHOR_TOP_RIGHT,
		offset: createSize(bdmap, {
			width: (offset || {}).width || 20,
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

	const crctl = new bdmap.CopyrightControl(options);
	map.addControl(crctl);

	var bs = map.getBounds(); //返回地图可视区域

	crctl.addCopyright({
		id: id,
		content: content,
		bounds: bs,
	});
</script>
