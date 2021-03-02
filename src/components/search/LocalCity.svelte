<script context="module">
	import { createPoint, createBounds } from '../utils/factory.js';
	import { isPoint } from '../utils/util.js';
</script>

<script>
	/**
	 * 获取用户所在的城市位置信息组件
	 *
	 * @component LocalSearch
	 * @example
	 * <LocalCity on:get={handleGetLocalCity} />
	 */

	import { onMount, getContext, createEventDispatcher } from 'svelte';
	import { contextKey } from '../stores.js';

	const dispatch = createEventDispatcher();
	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 结果列表的 HTML 容器 id 或容器元素
	 * @type {string|HTMLElement}
	 */
	export let panel = 'r-result';

	/**
	 * 检索结束后是否自动调整地图视野
	 * @type {boolean}
	 */
	export let autoViewport = true;

	/**
	 * 是否选择第一个检索结果
	 * @type {boolean}
	 */
	export let selectFirstResult = true;

	/**
	 * 驾车结果展现中点击列表后的展现策略
	 * @type {BMAP_HIGHLIGHT_STEP|BMAP_HIGHLIGHT_ROUTE}
	 */
	export let highlightMode = BMAP_HIGHLIGHT_STEP;

	function handleGet(e) {
		/**
		 * 当获取城市信息后触发的事件。
		 * @returns {e} LocalCityResult
		 */
		dispatch('get', e);
	}

	onMount(async () => {
		let _opts = {
			map: map,
			panel,
			selectFirstResult,
			autoViewport,
			highlightMode,
		};

		const local = new bdmap.LocalCity(_opts);

		local.get(handleGet);
	});
</script>
