<script context="module">
	import { createPoint, createSize } from '../utils/factory.js';
	import { createDefaultSymbolIcon } from '../utils/icon.js';
	import { isPoint, getPosition } from '../utils/util.js';
</script>

<script>
	/**
   * 信息窗口组件
   * 
   * @component Circle
	 * @see {@link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b7|百度地图JavaScript API v2.0类参考--InfoWindow}
   * @example
   * <InfoWindow width="200" height="30" lng={116.408016} lat={39.91146} title="中国国家博物馆" />
	 * <InfoWindow width="200" height="30" lng={116.404} lat={39.915} title="天安门" message="这里是天安门"
	     content={`<div><h4 style='margin:0 0 5px 0;'>天安门</h4>
       <img style='float:right;margin:0 4px 22px' id='imgDemo' src='https://maponline0.bdimg.com/sty/map_icons2x/MapRes/tianam.png' width='139' height='104'/>
       <p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>
         天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...
       </p></div>`} />
   */

	import { onMount, getContext, createEventDispatcher } from 'svelte';
	import { contextKey, contextMarker } from '../stores.js';

	const dispatch = createEventDispatcher();
	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 是否显示信息窗口
	 * @type {boolean}
	 */
	export let show = true;

	/**
	 * 信息窗口所在的地理位置
	 * @type {{lng: number, lat: number}} Point
	 */
	export let position = null;

	/**
	 * 信息窗标题文字
	 * @type {string}	 */

	export let title = null;

	/**
	 * 信息窗宽度，单位像素。取值范围：0, 220 - 730。
	 * @type {number}
	 */
	export let width = 220;

	/**
	 * 信息窗高度，单位像素。取值范围：0, 60 - 650。
	 * @type {number}
	 */

	export let height = 60;

	/**
	 * 信息窗最大化时的宽度，单位像素。取值范围：220 - 730
	 * @type {number}
	 */
	export let maxWidth = 600;

	/**
	 * 信息窗位置偏移值。
	 * @type {number}
	 */
	export let offset = { width: 0, height: 0 };

	/**
	 * 启用窗口最大化功能。
	 * @type {number}
	 */
	export let maximize = false;

	/**
	 * 是否开启信息窗口打开时地图自动移动（默认开启）
	 * @type {boolean}
	 */
	export let autoPan = true;

	/**
	 * 是否开启点击地图关闭信息窗口（默认开启）
	 * @type {boolean}
	 */
	export let closeOnClick = true;

	/**
	 * 自定义部分的短信内容，可选项。
	 * @type {string}
	 */
	export let message = '';

	/**
	 * 设置信息窗口内容。支持HTML内容。
	 * @type {string}
	 */
	export let content = '';

	let el;
	let marker;
	let originInstance;
	
	if (!position) {
		const { getMarker } = getContext(contextMarker);
		marker = getMarker();
	}

	function redraw() {
		originInstance.redraw();
	}

	onMount(async () => {
		if (!position && !marker) {
			console.log(
				'Error: You must pass in the Marker instance or Point property of the message window!'
			);
		} else {
			let _overlay, _marker, _point;
			if (marker instanceof bdmap.Marker) {
				_marker = marker;
				_point = marker.getPosition();
			} else if (isPoint(position)) {
				_point = createPoint(bdmap, position);
				const myIcon = createDefaultSymbolIcon(bdmap);
				_marker = new bdmap.Marker(_point, { icon: myIcon });
			} else {
				_marker = null;
			}

			if (_marker instanceof bdmap.Marker) {
				map.addOverlay(_marker);
				if (content !== '') {
					_overlay = new bdmap.InfoWindow(content);
				} else {
					_overlay = new bdmap.InfoWindow(el, {
						width: width,
						height: height,
						title: title,
						maxWidth: maxWidth,
						offset: createSize(bdmap, offset),
						enableAutoPan: autoPan,
						enableCloseOnClick: closeOnClick,
						enableMessage: typeof message === 'undefined',
						message: message,
					});
				}
				maximize
					? _overlay.enableMaximize()
					: _overlay.disableMaximize();
				originInstance = _overlay;
				_marker.addEventListener('click', function () {
					show && openInfoWindow(_point);

					if (show && typeof content !== 'undefined') {
						// 防止在网速较慢时生成的信息框高度比图片总高度小，导致图片部分被隐藏
						[].forEach.call(el.querySelectorAll('img'), ($img) => {
							$img.onload = () => _overlay.redraw();
						});
					}
				});
			} else {
				console.log('Error: Marker or Point data format error!');
			}
		}
	});

	function openInfoWindow(point) {
		map.openInfoWindow(originInstance, point);
	}

	function closeInfoWindow() {
		map.closeInfoWindow(originInstance);
	}
</script>

{#if show}
	<div bind:this={el}>
		<slot />
	</div>
{/if}
