<script>
    import { getContext } from 'svelte'
    import { contextKey } from '../stores.js'

    const { getMap, getBdMap } = getContext(contextKey)
    const map = getMap()
    const bdmap = getBdMap()
    
    // id: Number | 该版权信息的唯一标识符
    export let id = 1
    // content：String | 该版权的文本信息，用于显示在地图上，支持HTML内容
    export let content
    // ControlAnchor: top-left, top-right, bottom-left, bottom-right
    export let position = 'top-left'
    // offset: Size | 控件的偏移值
    // @see http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a1b3
    export let offset
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
            options.anchor = BMAP_ANCHOR_TOP_LEFT;
            break;
        }
    }
    
    if (typeof offset !== 'undefined') {
      options.offset = new bdmap.Size(offset.width, offset.height)
    }

    const crctl = new bdmap.CopyrightControl(options)
    map.addControl(crctl)
    
    var bs = map.getBounds();   //返回地图可视区域
    
    // @example {id: 1, content: "<a href='#' style='font-size:20px;background:yellow'>我是自定义版权控件呀</a>"
    // @see http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a2b14
    crctl.addCopyright({
      id: id,
      content: content,
      bounds: bs
    })
</script>