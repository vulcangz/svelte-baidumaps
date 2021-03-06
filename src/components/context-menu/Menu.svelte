<script>
	import { getContext, setContext } from 'svelte';
	import { contextKey, contextMenu } from '../stores.js';

	const { getMap, getBdMap } = getContext(contextKey);
	const map = getMap();
	const bdmap = getBdMap();

	setContext(contextMenu, {
		getContextMemu: () => menu,
	});

	let menu;

	if ($$slots.default) {
		menu = new bdmap.ContextMenu();
		map.addContextMenu(menu);
	}
</script>

<div>
	<slot />
</div>
