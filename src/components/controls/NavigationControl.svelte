<script>
    import { getContext } from 'svelte'
    import { contextKey } from '../stores.js'

    const { getMap, getBdMap } = getContext(contextKey)
    const map = getMap()
    const bdmap = getBdMap()

    // ControlAnchor: top-left, top-right, bottom-left, bottom-right
    // @link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a2b1
    export let position = 'top-left'
    export let ctltype = 'large'
    // @link http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a2b3
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

        switch (ctltype) {
        case "large":
            options.type = BMAP_NAVIGATION_CONTROL_LARGE;
            break;
        case "small":
            options.type = BMAP_NAVIGATION_CONTROL_SMALL;
            break;
        case "pan":
            options.type = BMAP_NAVIGATION_CONTROL_PAN;
            break;
        case "zoom":
            options.type = BMAP_NAVIGATION_CONTROL_ZOOM;
            break;
        default:
            options.type = BMAP_NAVIGATION_CONTROL_LARGE;
            break;
        }
    }

    const navctl = new bdmap.NavigationControl(options)
    map.addControl(navctl)
</script>