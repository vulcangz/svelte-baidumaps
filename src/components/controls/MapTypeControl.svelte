<script>
	/**
	 * 切换地图类型的控件组件
	 *
	 * @component MapTypeControl
	 * @example
	 * <MapTypeControl mtype={"Ns"} position={"bottom-right"} />
	 */

	import { getContext } from 'svelte';
	import { contextKey } from '../stores.js';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 控件的停靠位置
	 * @type {'top-left'|'top-right'|'bottom-left'|'bottom-right'}
	 */
	export let position = 'top-left';

	/**
	 * 自定义地图类型
	 * N: normal(普通街道视图), S: satellite(卫星视图), H: hybrid(卫星和路网的混合视图)。可组合，如'NS', 'NH'
	 * @see {@link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a5b0|百度地图JavaScript API v2.0类参考--MapType}
	 * @type {'N'|'S'|'H'|'NS'|'Ns'}
	 */
	export let mtype = 'NS'

  // 默认可选参数
	let options = {
		mapTypes: [],
		anchor: BMAP_ANCHOR_TOP_LEFT,
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

	if (mtype.length > 0) {
		if (mtype.toUpperCase().includes('N')) {
			options.mapTypes.push(BMAP_NORMAL_MAP); // 此地图类型展示普通街道视图
		}

		if (mtype.toUpperCase().includes('S')) {
			options.mapTypes.push(BMAP_SATELLITE_MAP); // 此地图类型展示卫星视图
		}

		if (mtype.toUpperCase().includes('H')) {
			options.mapTypes.push(BMAP_HYBRID_MAP); // 此地图类型展示卫星和路网的混合视图
		}

		const mtctl = new bdmap.MapTypeControl(options);
		map.addControl(mtctl);
	}
</script>
