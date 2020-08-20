<script>
  import { getContext } from 'svelte'
  import { contextKey } from '../stores.js'

  const { getMap, getBdMap } = getContext(contextKey)
  const map = getMap()
  const bdmap = getBdMap()

  // MapTypeControlType: top-left, top-right, bottom-left, bottom-right
  // @see http://lbsyun.baidu.com/jsdemo.htm#b_07
  export let position = 'top-left';
  export let options = {};

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
          options.anchor = BMAP_ANCHOR_TOP_LEFT;
          break;
      }
      
      var size = new BMap.Size(10, 20);
      options.offset = size;
  }

  // @todo 事件
  // 切换城市之前事件
  // onChangeBefore: function(){
  //    alert('before');
  // },
  // 切换城市之后事件
  // onChangeAfter:function(){
  //   alert('after');
  // }
  
  const clctl = new bdmap.CityListControl(options)
  map.addControl(clctl)
</script>