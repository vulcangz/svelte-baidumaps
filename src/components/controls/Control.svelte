<script context="module">
	import { createSize } from '../utils/factory.js';
</script>

<script>
	/**
	 * 自定义控件组件
	 *
	 * @component Control
	 * @example
	 * <Control offset={{width: 30, height: 20}} />
	 */

	import { onMount, getContext } from 'svelte';
	import { contextKey } from '../stores.js';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 控件默认的停靠位置。
	 * @type {BMAP_ANCHOR_TOP_LEFT|BMAP_ANCHOR_TOP_RIGHT|BMAP_ANCHOR_BOTTOM_LEFT|BMAP_ANCHOR_BOTTOM_RIGHT}
	 */
	export let anchor = BMAP_ANCHOR_TOP_LEFT;

	/**
	 * 控件默认的位置偏移值。
	 * @type {{width: Number, height: Number}}
	 */
	export let offset = null;

	let el;
	let customCtrl;

	onMount(async () => {
		const CustomControl = function () {
			this.defaultAnchor = anchor || BMAP_ANCHOR_TOP_LEFT;
			this.defaultOffset = createSize(bdmap, offset);
		};

		CustomControl.prototype = new bdmap.Control();
		CustomControl.prototype.initialize = (map) =>
			map.getContainer().appendChild(el);

    customCtrl = new CustomControl(anchor, offset);
		map.addControl(customCtrl);
	});
</script>

<div bind:this={el}>
	<slot />
</div>
