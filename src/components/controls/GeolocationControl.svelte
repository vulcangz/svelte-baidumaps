<script>
	import { getContext, createEventDispatcher } from 'svelte'
	import { contextKey } from '../stores.js'

  const dispatch = createEventDispatcher();
	const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()

  export let position = 'bottom-right'
  export let options = {}
  
  if (!!options) {
    switch (position) {
      case "top-left":
          options.anchor = BMAP_ANCHOR_TOP_LEFT;
          break;
      case "top-right":
          options.anchor = BMAP_ANCHOR_TOP_RIGHT;
          break;
      case "bottom-left":
          options.anchor = BMAP_ANCHOR_BOTTOM_LEFT;
          break;
      case "bottom-right":
          options.anchor = BMAP_ANCHOR_BOTTOM_RIGHT;
          break;
      default:
          options.anchor = BMAP_ANCHOR_TOP_RIGHT;
          break;
    }
  }

  const geolocation = new bdmap.GeolocationControl(options)
  geolocation.addEventListener("locationSuccess", function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  });
  geolocation.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
  map.addControl(geolocation);
</script>