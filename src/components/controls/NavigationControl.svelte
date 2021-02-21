<script>
	/**
	 * 地图的平移缩放控件组件
	 *
	 * @component NavigationControl
	 * @example
	 * <NavigationControl position={"bottom-right"} ctltype={"large"} offset={{width:30, height:30}} zoom={true} location={true} />
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
	export let position = 'top-left';

	/**
	 * 平移缩放控件的类型
	 * @type {'large'|'small'|'pan'|'zoom'}
	 */
	export let ctltype = 'large';

	/**
	 * 控件的水平偏移值
	 * @type {{width: number, height: number }}
	 */
	export let offset = {
		width: 0,
		height: 0
	};

	/**
	 * 是否显示级别提示信息
	 * @type {boolean}
	 */
	export let zoom = true;

	/**
	 * 控件是否集成定位功能，默认为 false
	 * @type {boolean}
	 */
	export let location = false;

	/**
	 * 可选参数
	 * @see {@link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a2b3|百度地图JavaScript API v2.0类参考--NavigationControlOptions}
	 * @type {{anchor: string, offset: {{width: number, height: number}}, type: string, showZoomInfo: boolean, enableGeolocation: boolean}}
	 */
	let options = {
		anchor: BMAP_ANCHOR_TOP_LEFT,
		offset: createSize(bdmap, {
			width: (offset || {}).width || 20,
			height: (offset || {}).height || 20,
		}),
		showZoomInfo:
			typeof zoom !== 'undefined' ? zoom : false,
		enableGeolocation: location,
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

	switch (ctltype) {
		case 'large':
			options.type = BMAP_NAVIGATION_CONTROL_LARGE;
			break;
		case 'small':
			options.type = BMAP_NAVIGATION_CONTROL_SMALL;
			break;
		case 'pan':
			options.type = BMAP_NAVIGATION_CONTROL_PAN;
			break;
		case 'zoom':
			options.type = BMAP_NAVIGATION_CONTROL_ZOOM;
			break;
		default:
			options.type = BMAP_NAVIGATION_CONTROL_LARGE;
			break;
	}

	const navctl = new bdmap.NavigationControl(options);
	map.addControl(navctl);
</script>
