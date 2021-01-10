<script>
  import { Map, Marker, MarkerList, GeolocationControl, NavigationControl, CityListControl, MapTypeControl, CopyrightControl } from './components/components.module.js';
  import { LocalSearch, Bus, Driving, Transit, Walking } from './components/components.module.js';
  import { Circle, Polygon, Polyline } from './components/components.module.js';
  import { data } from '../sample-data/points-sample-data.js';

  // Please change the apiKey to your key
  let apiKey = "your_api_key"
  
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

  /* for Circle demo */
  let circleCenter = {
    lng: 116.404,
    lat: 39.915
  }
  
  // Polygon
  let polygonPoints = [
    {
      lng: 116.387112,
      lat: 39.920977
    },
    {
      lng: 116.385243,
      lat: 39.913063
    },
    {
      lng: 116.394226,
      lat: 39.917988
    },
    {
      lng: 116.401772,
      lat: 39.921364
    },
    {
      lng: 116.41248,
      lat: 39.927893
    }
  ]

  // Polygon Rectangle
  let polygonRectanglePoints = [
    {
      lng: 116.392214,
      lat: 39.918985
    },
    {
      lng: 116.41478,
      lat: 39.918985
    },
    {
      lng: 116.41478,
      lat: 39.911901
    },
    {
      lng: 116.392214,
      lat: 39.911901
    }
  ]
  
  // Polyline
  let polylinePoints = [
    {
      lng: 116.399,
      lat: 39.910
    },
    {
      lng: 116.405,
      lat: 39.920
    },
    {
      lng: 116.425,
      lat: 39.900
    }
  ]
  
  // Set line and surface editable
  let editing = false

  $: handleEditing = () => {
    editing = !editing
  }
  
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

  <section class="container" id="example1">
    <h5 class="title">1）地图示例</h5>
    <p>地图展示及控件示例。</p>
    <div class="row map-wrap">
      <Map apiKey={apiKey} options={ baseMapConfig } withCenterMarker={ true } >
        <Marker lng={116.404113} lat={39.919852} label="西雁翅楼" icon={{ path: 'PIN_DROP', opts: { anchor: { width: 10, height: 10 }, fillColor: 'green', scale: 2 } }} />
				<Marker lng={116.392004} lat={39.915104} label="南海" icon={{ path: 'PLACE_PIN' }} />
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

        <Circle center={circleCenter} radius={"500"} strokeColor={"blue"} strokeWeight={2} strokeOpacity={0.5} editing={editing} />
        
        <Polygon path={polygonPoints} strokeColor={"blue"} strokeWeight={2} strokeOpacity={0.5}  editing={editing} />
        <Polygon path={polygonRectanglePoints} strokeColor={"blue"} strokeWeight={2} strokeOpacity={0.5} editing={editing} />
        
        <Polyline path={polylinePoints} strokeColor={"blue"} strokeWeight={2} strokeOpacity={0.5} editing={editing} />
      </Map>
    </div>
    <p>
      <br>
      <button on:click={handleEditing} >
        打开/关闭编辑功能
      </button>
    </p>
  </section>

  <section class="container" id="example2">
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
  
  <!--
  <section class="container" id="example3">
    <h5 class="title">3）本地检索示例</h5>
    <p>位置检索、周边检索和范围检索。</p>
    <div class="row map-wrap">
      <div class="column column-70">
        <Map apiKey={apiKey} options={ baseMapConfig }>
          <NavigationControl />          
          -->
          
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
          <!--
          <LocalSearch nearby={nearby1} keyword={"餐馆"} autoViewport="true" panel={"r-result"} pageCapacity={4}>
          </LocalSearch>
        </Map>
      </div>
      <div class="column column-30">
        <div id="r-result"></div>
      </div>
  </section>
  -->

  <!--
  <section class="container" id="examples4">
    <h5 class="title">4）线路规划</h5>
    <p>公交路线搜索；步行规划；公交路线规划；驾车线路规划。</p>
    <div class="row map-wrap">
      <div class="column column-70">
        <Map apiKey={apiKey} options={ baseMapConfig }>
          <NavigationControl position={"top-right"} />
  -->
          <!--<Bus location={"北京"} keyword={"331"} autoViewport="true" panel={"d-result"}/>   <!-- ok -->
          <!--<Bus location={"广州"} keyword={"331"} autoViewport="true" panel={"d-result"}/>  <!-- 331 增城 ok; BRT线路 B1,B2 等还不行 -->
          <!--<Bus location={"广州"} keyword={"B2"} autoViewport="true" panel={"d-result"}/>-->
          <!--<Walking start={"百度大厦"} end={"北京邮电大学西门"} autoViewport="true" location={"北京"} panel={"d-result"}>
          </Walking>-->
          <!--<Transit start={"百度大厦"} end={"北京邮电大学西门"} autoViewport="true" location={"北京"} panel={"d-result"}></Transit>-->
          <!--<Driving
            start="新街口"
            end="新街口"
            startCity="北京"
            endCity="南京"
            waypoints={waypoints}
            autoViewport="true"
            panel={"d-result"}>
          </Driving> -->
       <!-- 
        </Map>
      </div>

      <div class="column column-30">
        <div id="d-result"></div>
      </div>
    </div>
  </section> -->

  <footer class="footer">
    <section class="container">
      <p>
        Designed with ? by
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