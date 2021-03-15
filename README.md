## svelte-baidumaps components

English | [简体中文](./README-zh_CN.md)

Svelte components based on Baidu Map JavaScript API package.

## Demo

* Demo with REPL support: [https://svelte.worldlink.com.cn/examples](https://svelte.worldlink.com.cn/examples)
* Simple Demo: [https://vulcangz.github.io/svelte-baidumaps/demo/](https://vulcangz.github.io/svelte-baidumaps/demo/)

## Install

```bash
npm install --save @vulcangz/svelte-baidumaps
```
## Usage

* Documentation: [https://svelte.worldlink.com.cn/docs](https://svelte.worldlink.com.cn/docs)
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

#### 3. Basic Usage (PointCollection)

See [PointCollection](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b21) for more information on API.

```jsx
<Map apiKey="your_api_key" options={ pointCollectionMapConfig }>
  <PointCollection markers={ data } />
  <NavigationControl />
  <ScalingControl />
</Map>

<script>
  import { Map, PointCollection, NavigationControl, GeolocationControl } from '@vulcangz/svelte-baidumaps'
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
- [x] OverviewMapControl
- [x] CityListControl

### Overlay components
- [x] Marker
- [x] MarkerList
- [x] Circle
- [x] ~~Icon~~
- [x] InfoWindow
- [x] Label
- [x] PointCollection
- [x] Polygon
- [x] Polyline

### Service components
- [x] LocalSearch
- [x] Bus
- [x] Transit
- [x] Walking
- [x] Driving
- [x] LocalCity
- [x] Autocomplete

### ContextMenu components
- [x] Menu
- [x] Item

## Todo

* test
* ~~docs~~

## Credits and Inspiration

* [百度地图开放平台](http://lbsyun.baidu.com/)
* [Svelte framework](https://svelte.dev/) & [Context API](https://svelte.dev/tutorial/context-api)
* Based on [Svelte 3 Component Template](https://github.com/YogliB/svelte-component-template)
* [beyonk-adventures/svelte-mapbox](https://github.com/beyonk-adventures/svelte-mapbox)
* [Dafrok/vue-baidu-map](https://github.com/Dafrok/vue-baidu-map)
* [Material Design icons by Google](https://github.com/google/material-design-icons)
