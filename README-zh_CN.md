## Svelte 百度地图组件

[English](./README.md) | 简体中文

Svelte 百度地图组件基于[百度地图 JavaScript API v2.0 类参考](https://mapopen-pub-jsapi.bj.bcebos.com/jsapi/reference/jsapi_reference.html)。

## 演示

[在线演示](https://vulcangz.github.io/svelte-baidumaps/demo/)

## 用法

简单参考: [App.svelte](https://github.com/vulcangz/svelte-baidumaps/tree/master/src/App.svelte)

### 在 Svelte 应用中使用:

#### 首先您需要申请并取得地图 API 密钥:

API 密钥可以在 [百度地图开放平台官方网站](http://lbsyun.baidu.com/apiconsole/key) 申请。

#### 基本用法（Map）

Map 是容器组件，Map 内可以有各种各样的组件。

```jsx
<Map apiKey="your_api_key" options={ baseMapConfig } withCenterMarker={ true } >
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

#### 基本用法（MarkerList）

有关此 API 的更多信息，请参见 [PointCollection](http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a3b21)。

```jsx
<Map apiKey="your_api_key" options={ pointCollectionMapConfig }>
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

## 本地开发

要查看简单的应用演示：

`
npm run dev
`

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

## 致谢及参考

* [百度地图开放平台](http://lbsyun.baidu.com/)
* [Svelte framework](https://svelte.dev/) & [Context API](https://svelte.dev/tutorial/context-api)
* Based on [Svelte 3 Component Template](https://github.com/YogliB/svelte-component-template)
* [beyonk-adventures/svelte-mapbox](https://github.com/beyonk-adventures/svelte-mapbox)
* [Dafrok/vue-baidu-map](https://github.com/Dafrok/vue-baidu-map)
* [Material Design icons by Google](https://github.com/google/material-design-icons)

