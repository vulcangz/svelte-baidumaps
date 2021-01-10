<script context="module">
import commonMixin from '../base/mixins/common.js';
import bindEvents from '../base/bindEvent.js';
import { createLabel, createIcon, createPoint } from '../base/factory.js';
</script>

<script>
export let position;
export let offset;
export let icon;
export let massClear = true; // Boolean
export let dragging = false; // Boolean
export let clicking = true; // Boolean
export let raiseOnDrag = false; // Boolean
export let draggingCursor; // String
export let rotation; // Number
export let shadow; // Object
export let title; // String
export let label; // Object
export let animation; // String
export let top = false; // Boolean
export let zIndex = 0; // Number

function load() {
  const {
    BMap,
    map,
    position,
    offset,
    icon,
    massClear,
    dragging,
    clicking,
    raiseOnDrag,
    draggingCursor,
    rotation,
    shadow,
    title,
    label,
    animation,
    top,
    renderByParent,
    $parent,
    zIndex
  } = this;
  const overlay = new BMap.Marker(new BMap.Point(position.lng, position.lat), {
    offset,
    icon: icon && createIcon(BMap, icon),
    enableMassClear: massClear,
    enableDragging: dragging,
    enableClicking: clicking,
    raiseOnDrag,
    draggingCursor,
    rotation,
    shadow,
    title
  });
  originInstance = overlay;
  label && overlay && overlay.setLabel(createLabel(BMap, label));
  overlay.setTop(top);
  overlay.setZIndex(zIndex);
  bindEvents.call(this, overlay);

  if (renderByParent) {
    $parent.reload();
  } else {
    map.addOverlay(overlay);
  }

  overlay.setAnimation(global[animation]);
}
</script>

<div>
  <slot>
  </slot>
</div>
