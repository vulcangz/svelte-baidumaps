<script>
	import { getContext } from 'svelte';
	import { contextKey, contextMenu } from '../stores.js';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	const { getContextMemu } = getContext(contextMenu);
	const menu = getContextMemu();

	/**
	 * 点击菜单时执行的回调函数，第一个参数为 {BMap, map, target, pixel, point}。
	 * @type {function}
	 */
	export let callback = function () {};

	/**
	 * 指定此菜单项的文本。
	 * @type {string}
	 */
	export let text = null;

	/**
	 * 指定此菜单项的宽度，菜单以最长的菜单项宽度为准
	 * @type {number}
	 */
	export let width = null;

	/**
	 * 指定此菜单项的icon URL（大小为17px*17px）。包括内置的放大和缩小图标。
	 * @type {string|BMAP_CONTEXT_MENU_ICON_ZOOMIN|BMAP_CONTEXT_MENU_ICON_ZOOMOUT}
	 */
	export let iconUrl = null;

	/**
	 * 指定此菜单项dom的id
	 * @type {string}
	 */
	export let id = null;

	/**
	 * 是否禁用菜单项。
	 * @type {boolean}
	 */
	export let disabled = false;

	/**
	 * 是否是分隔线（此属性为真时，其它属性会被忽略）。
	 * @type {boolean}
	 */
	export let seperator = false;

	function handleMenuItem(point, pixel) {
		callback({
			point,
			pixel,
			map,
			bdmap,
		});
	}

	function setText(text) {
		menu.setText(text);
	}

	function setIcon(iconUrl) {
		menu.setIcon(iconUrl);
	}

	if (seperator) {
		menu.addSeparator();
	} else {
		let opts = {
			width,
			id: id,
			iconUrl: iconUrl,
		};

		const menuItem = new bdmap.MenuItem(
			text,
			function (point, pixel) {
				handleMenuItem(point, pixel);
			},
			opts
		);

		disabled ? menuItem.disable() : menuItem.enable();

		menu.addItem(menuItem);
	}
</script>

<span>
	<slot />
</span>
