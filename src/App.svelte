<script>
  import { Map, Marker, MarkerList, GeolocationControl, NavigationControl } from './components/components.module.js';
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
</script>

<style>
	.map-wrap {
		width: 100%;
    height: 50vh;
	}
</style>

<div class="map-wrap">
  <Map options={ baseMapConfig } withCenterMarker={ true } >
    <Marker lng={116.404113} lat={39.919852} label="西雁翅楼" />
    <Marker lng={116.392004} lat={39.915104} label="南海" />
    <Marker lng={116.408016} lat={39.91146} label="中国国家博物馆" />
    <NavigationControl />
  </Map>
</div>

<div class="map-wrap">
  <Map options={ pointCollectionMapConfig }>
    <MarkerList markers={ data.data } />
    <NavigationControl position={"top-right"} />
    <GeolocationControl position={"bottom-right"} />
  </Map>
</div>