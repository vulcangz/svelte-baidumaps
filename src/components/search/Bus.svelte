<script>
	/**
	 * 公交路线搜索组件
	 *
	 * @component Bus
	 * 
	 * @example
	 * <Bus location={"beijing"} keyword={"331"} autoViewport="true" panel={"d-result"} />
	 */

	import { onMount, createEventDispatcher } from 'svelte';
	import { getContext } from 'svelte';
	import { createPoint } from '../utils/factory.js';
	import { isPoint } from '../utils/util.js';
	import { contextKey } from '../stores.js';

	const dispatch = createEventDispatcher();
	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 检索区域，其类型可为地图实例、坐标点或城市名称的字符串。
	 * @type {object|string}
	 */
	export let location;

	/**
	 * 本次检索关键字
	 * @type {string}
	 */
	export let keyword;

	/**
	 * 结果列表的 HTML 容器 id 或容器元素
	 * @type {string|HTMLElement}
	 */
	export let panel;

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
	export let highlightMode;

	let busline;

	function search(keyword) {
		busline.getBusList(keyword);
	}

	onMount(async () => {
		const _location = location
			? isPoint(location)
				? createPoint(bdmap, location)
				: location
			: map;

		const route = (busline = new bdmap.BusLineSearch(_location, {
			renderOptions: {
				map: map,
				panel: panel,
				selectFirstResult,
				autoViewport,
				highlightMode,
			},

			onGetBusListComplete(e) {
				if (busline && busline !== route) {
					busline.clearResults();
				}

				/**
				 * 当公交列表查询后触发的事件。
				 * @returns {rs,busline}
				 */
				dispatch('getbuslistcomplete', { rs: e, busline });
			},

			onGetBusLineComplete(e) {
				if (busline && busline !== route) {
					busline.clearResults();
				}

				/**
				 * 当公交线路查询后触发的事件。
				 * @returns {e}
				 */
				dispatch('getbuslinecomplete', e);
			},

			onBusListHtmlSet(e) {
				/**
				 * 当公交列表结果页渲染后触发的事件。
				 * @returns {e}
				 */
				dispatch('buslisthtmlset', e);
			},

			onBusLineHtmlSet(e) {
				/**
				 * 当公交线路结果页渲染后触发的事件。
				 * @returns {e}
				 */
				dispatch('buslinehtmlset', e);
			},

			onMarkersSet(e) {
				/**
				 * 当添加公交站点时触发的事件。
				 * @returns {e}
				 */
				dispatch('markersset', e);
			},

			onPolylinesSet(e) {
				/**
				 * 当添加公交线时触发的事件。
				 * @returns {e}
				 */
				dispatch('polylinesset', e);
			},
		}));
		search(keyword);
	});
</script>
