## Svelte Baidu Maps components

Svelte components based on Baidu Map JavaScript Api package.

## Demo

[demo](https://vulcangz.github.io/svelte-baidumaps/demo/)

## Usage

Simple reference: [App.svelte](https://github.com/vulcangz/svelte-baidumaps/tree/master/src/App.svelte)

### To use within a Svelte application:

First set the api key in [constants.js](https://github.com/vulcangz/svelte-baidumaps/tree/master/src/components/constants.js)

```javascript
export const apiKey = "your_api_key";
```
The key can be applied to [the official website of Baidu map open platform](http://lbsyun.baidu.com/apiconsole/key)

### To use within a Svelte application:

#### Basic Usage (Map)

The container component is the map, and there are a variety of components which go on the map.

```jsx
<Map options={ baseMapConfig } withCenterMarker={ true } >
  <Marker lat={someLat} lng={someLng} label="text label" /> // built in Marker component
  <NavigationControl />
  <ScaleControl />
</Map>

<script>
  import { Map, Marker, NavigationControl, ScaleControl } from './components/components.module.js'

  let baseMapConfig = {
    label: "this is a map base demo",
    address: "china beijing",
    lng: "116.404",
    lat: "39.915",
    zoom: 15
  };
</script>
```

#### Basic Usage (MarkerList)

See [PointCollection](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b21) for more information on API.

```jsx
<Map options={ pointCollectionMapConfig }>
  <MarkerList markers={ data } />
  <NavigationControl />
  <ScalingControl />
</Map>

<script>
  import { Map, MarkerList, NavigationControl, GeolocationControl } from './components/components.module.js'
  import { data } from './your-data.js';

  let pointCollectionMapConfig = {
    label: "this is map point collection demo",
    address: "china beijing",
    lng: "105.000",
    lat: "38.000",
    zoom: 12
	}; 
</script>
```

## Demo

To see the simple app demo:

`
npm run dev
`

## Todo

* other components
* test
* docs

## Credits and Inspiration

* [百度地图开放平台](http://lbsyun.baidu.com/)
* [Svelte framework](https://svelte.dev/) & [Context API](https://svelte.dev/tutorial/context-api)
* Based on [Svelte 3 Component Template](https://github.com/YogliB/svelte-component-template)
* [beyonk-adventures/svelte-mapbox](https://github.com/beyonk-adventures/svelte-mapbox)
* [Dafrok/vue-baidu-map](https://github.com/Dafrok/vue-baidu-map)

