## Svelte Baidu Maps components

Svelte components based on Baidu Map JavaScript Api package.

## Demo

* [https://vulcangz.github.io/svelte-baidumaps/demo/](https://vulcangz.github.io/svelte-baidumaps/demo/)
* [Demo with REPL support](https://svelte.worldlink.com.cn/examples)

## Install

```bash
npm install --save @vulcangz/svelte-baidumaps
```
## Usage

* Simple reference: [App.svelte](https://github.com/vulcangz/svelte-baidumaps/tree/master/src/App.svelte)
* Usage examples: [Demo with REPL support](https://svelte.worldlink.com.cn/examples)

### To use within a Svelte application:

#### 1. First you need to request and obtain the map api key:

The key can be applied to [the official website of Baidu map open platform](http://lbsyun.baidu.com/apiconsole/key)

#### 2. Basic Usage (Map)

The container component is the map, and there are a variety of components which go on the map.

```jsx
<Map apiKey="your_api_key" options={ baseMapConfig } withCenterMarker={ true } >
  <Marker lat={someLat} lng={someLng} label="text label" /> // built in Marker component
  <NavigationControl />
  <ScaleControl />
</Map>

<script>
  import { Map, Marker, NavigationControl, ScaleControl } from '@vulcangz/svelte-baidumaps'

  let baseMapConfig = {
    label: "this is a map base demo",
    address: "china beijing",
    lng: "116.404",
    lat: "39.915",
    zoom: 15
  };
</script>
```

#### 3. Basic Usage (MarkerList)

See [PointCollection](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b21) for more information on API.

```jsx
<Map apiKey="your_api_key" options={ pointCollectionMapConfig }>
  <MarkerList markers={ data } />
  <NavigationControl />
  <ScalingControl />
</Map>

<script>
  import { Map, MarkerList, NavigationControl, GeolocationControl } from '@vulcangz/svelte-baidumaps'
  import { data } from './your-marker-points-data.js';

  let pointCollectionMapConfig = {
    label: "this is map point collection demo",
    address: "china beijing",
    lng: "105.000",
    lat: "38.000",
    zoom: 12
	}; 
</script>
```

## Components

### Core component

- [x] Map

### Control components
- [x] NavigationControl
- [x] MapTypeControl
- [x] ScaleControl
- [x] CopyrightControl
- [ ] OverviewMapControl
- [x] CityListControl

### Overlay components
- [x] Marker
- [x] MarkerList
- [x] Circle
- [ ] Icon
- [ ] InfoWindow
- [ ] Label
- [x] Polygon
- [x] Polyline

### Service components
- [x] LocalSearch
- [x] Bus
- [x] Transit
- [x] Walking
- [x] Driving
- [ ] LocalCity
- [ ] Autocomplete

## Todo

* test
* docs

## Credits and Inspiration

* [百度地图开放平台](http://lbsyun.baidu.com/)
* [Svelte framework](https://svelte.dev/) & [Context API](https://svelte.dev/tutorial/context-api)
* Based on [Svelte 3 Component Template](https://github.com/YogliB/svelte-component-template)
* [beyonk-adventures/svelte-mapbox](https://github.com/beyonk-adventures/svelte-mapbox)
* [Dafrok/vue-baidu-map](https://github.com/Dafrok/vue-baidu-map)

