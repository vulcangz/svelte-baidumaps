<script>
	/**
	 * 结果提示、自动完成组件
	 *
	 * @component AutoComplete
	 *
	 * @example
	 * <AutoComplete location={"北京市"} style={{ zIndex: 1 }} />
	 */

	import { onMount, getContext, createEventDispatcher } from 'svelte';
	import { contextKey } from '../stores.js';
	import BaiduMapEvents from '../utils/events.js';

	const dispatch = createEventDispatcher();
	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	/**
	 * 返回数据类型。
	 * @type {Array.<string>}
	 */
	export let types = null;

	/**
	 * 返回结果的所属范围。例如“北京市”
	 * @type {object|string}
	 */
	export let location = null;

	/**
	 * 定制提示框基本样式，通常用于调整 zIndex 防止被覆盖。
	 * @type {object}
	 */
	export let style;

	let el, inputEl;
	let ac;

	onMount(async () => {
		const input = el.querySelector('input');

		if (!input) {
			return;
		}
		ac = new bdmap.Autocomplete({
			input,
			types,
			location: location || map,
			onSearchComplete: (e) => {
				const sugs = document.querySelectorAll(
					'.tangram-suggestion-main'
				);

				for (const sug of sugs) {
					for (const name in style) {
						sug.style[name] = style[name].toString();
					}
				}

				dispatch('searchcomplete', e);
			},
		});

		ac.addEventListener('onconfirm', (e) => {
			const val = e.item.value;
			dispatch(
				'input',
				val.province +
					val.city +
					val.district +
					val.street +
					val.business
			);
		});

		const ev = BaiduMapEvents['svelte-autocomplete'];
		ev &&
			ev.forEach((event) => {
				const hasOn = event.slice(0, 2) === 'on';
				const eventName = hasOn ? event.slice(2) : event;
				map.addEventListener(event, function (e) {
					dispatch(event, e);
				});
			});
	});
</script>

<span bind:this={el}>
	<slot>
		<input />
	</slot>
</span>
