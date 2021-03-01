<script context="module">
	import { createPoint, createSize } from '../utils/factory.js';
</script>

<script>
	/**
	 * 文本标注组件
	 *
	 * @component Label
	 * @see {@link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b9|Label}
	 * @example
	 * <Label content="中南海" title="南海" position={{lng: 116.392006, lat: 39.915106}} />
	 */

	import { onMount, createEventDispatcher } from 'svelte';
	import { getContext } from 'svelte';
	import { contextKey } from '../stores.js';

	const dispatch = createEventDispatcher();
	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 文本标注的内容。支持HTML
	 * @type {string}
	 */
	export let content = null;

	/**
	 * 文本标注的标题，当鼠标移至标注上时显示此标题
	 * @type {string}
	 */
	export let title = null;

	/**
	 * 文本标注的偏移量
	 * @type {{width: number, height: number}}
	 */
	export let offset = {
		width: 20,
		height: -20
	};

	/**
	 * 文本标注所在的地理位置
	 * @type {{lng: number, lat: number}} Point
	 */
	export let position = null;

	/**
	 * 文本标注样式。其中styles为JavaScript对象常量，比如： setStyle({ color : "red", fontSize : "12px" })
	 * @type {string}
	 */
	export let style = null;

	/**
	 * 覆盖物的zIndex
	 * @type {number}
	 */
	export let zIndex = 0;

	/**
	 * 允许/禁止覆盖物在 map.clearOverlays 方法中被清除
	 * @type {string}
	 */
	export let massClear = true;

	onMount(async () => {
		const overlay = new bdmap.Label(content, {
			offset: createSize(bdmap, offset),
			position: createPoint(bdmap, position),
			enableMassClear: massClear,
		});
		map.addOverlay(overlay);

		title && overlay.setTitle(title);
		style && overlay.setStyle(style);
		zIndex && overlay.setZIndex(zIndex);
	});
</script>
