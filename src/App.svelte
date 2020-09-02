<script>
  import { Map, Marker, MarkerList, GeolocationControl, NavigationControl, CityListControl, MapTypeControl, CopyrightControl } from './components/components.module.js';
  import { LocalSearch } from './components/components.module.js';
  import { data } from '../sample-data/points-sample-data.js';

  let baseMapConfig = {
    label: "this is a map base demo",
    address: "china beijing",
    lng: "116.404",
    lat: "39.915",
		zoom: 15
	};

  let pointCollectionMapConfig = {
    label: "this is map point collection demo",
    address: "china beijing",
    lng: "105.000",
    lat: "38.000",
		zoom: 12
	};

  let copyrightControlContent = "<a href='#' style='font-size:24px;background:yellow'>山川异域，风月同天。</a>"
  let copyrightControlOffset = {
    width: 80,
    height: 160
  }

  let copyrightControlContent1 = "<a href='#' style='font-size:24px;background:yellow'>寄诸佛子，共结来缘。 </a>"
  let copyrightControlOffset1 = {
    width: 80,
    height: 220
  }

  let bounds1 = {
    sw: {
      lng: 116.294625,
      lat: 39.961627
    },
    ne: {
      lng: 116.357474,
      lat: 39.988609
    }
  }

  let nearby1 = {
    center: {
      lng: 116.404,
      lat: 39.915
    },
    radius: 1000
  }

  let waypoints = [
    '呼和浩特',
    {
      lng: 112.53,
      lat: 37.87
    },
    '陕西兵马俑'
  ]
</script>

<style>
  .map-wrap {
    height: 300px;
  }
	#r-result {
		width: 100%;
	}
	#d-result {
		width: 100%;
	}
</style>

<main class="wrapper">
  <header class="container">
    <h2 class="title text-center">Svelte BaiduMaps Components Demo</h2>
    <blockquote>
      <p><em>组件测试需要打开对应组件的注释! 3、4项地图中同时只能使用一个组件。</em></p>
    </blockquote>
  </header>

  <section class="container" id="examples">
    <h5 class="title">1）地图示例</h5>
    <p>地图展示及控件示例。</p>
    <div class="row map-wrap">
      <Map options={ baseMapConfig } withCenterMarker={ true } >
        <Marker lng={116.404113} lat={39.919852} label="西雁翅楼" />
        <Marker lng={116.392004} lat={39.915104} label="南海" />
        <Marker lng={116.408016} lat={39.91146} label="中国国家博物馆" />
        <NavigationControl />
        <MapTypeControl mtype={"Ns"} position={"bottom-right"} />
        <CopyrightControl
          id="{1}"
          content={ copyrightControlContent }
          offset={ copyrightControlOffset }
          position={"top-left"}
        />
        <CopyrightControl
          id="{2}"
          content={ copyrightControlContent1 }
          offset={ copyrightControlOffset1 }
          position={"top-left"}
        />
      </Map>
    </div>
  </section>

  <section class="container" id="examples">
    <h5 class="title">2）海量点示例</h5>
    <p>调用PointCollection海量点类。目前仅适用于html5浏览器。</p>
    <div class="row map-wrap">
      <div class="column column-70">
        <Map options={ pointCollectionMapConfig }>
          <CityListControl position={"top-left"} />
          <NavigationControl position={"top-right"} />
          <MarkerList markers={ data.data } />
          <GeolocationControl position={"bottom-right"} />
        </Map>
      </div>
  </section>

  <section class="container" id="examples">
    <h5 class="title">3）本地检索示例</h5>
    <p>位置检索、周边检索和范围检索。</p>
    <div class="row map-wrap">
      <div class="column column-70">
        <Map options={ baseMapConfig }>
          <NavigationControl />
          
          <!-- 关键字检索 -->
          <!--
          <LocalSearch location={"广州"} keyword={"景点"} autoViewport="true" panel={"r-result"} pageCapacity={5} />
          -->

          <!-- 矩形区域检索 -->
          <!--
          <LocalSearch bounds={bounds1} keyword={"景点"} autoViewport="true" panel={"r-result"} pageCapacity={4}>
          </LocalSearch>
          -->

          <!-- 圆形区域检索 -->
          <LocalSearch nearby={nearby1} keyword={"餐馆"} autoViewport="true" panel={"r-result"} pageCapacity={4}>
          </LocalSearch>
        </Map>
      </div>
      <div class="column column-30">
        <div id="r-result"></div>
      </div>
  </section>

  <footer class="footer">
    <section class="container">
      <p>
        Designed with ♥ by
        <a
          target="_blank"
          href="http://github.com/vulcangz"
          title="Vulcangz"
          >Vulcangz</a
        >. Licensed under the
        <a
          target="_blank"
          href="https://github.com/vulcangz/svelte-baidumaps"
          title="MIT License"
          >MIT License</a
        >.
      </p>
    </section>
  </footer>

</main>