<script>
	import L from "leaflet";
	import proj4 from "proj4";
	import MapToolbar from "./MapToolbar.svelte";
	import Modal from "./Modal.svelte";
	import { Modals, openModal, modals, closeModal } from "svelte-modals";

	import * as markerIcons from "./markers.js";
	import * as network from "./network.js";
	import GeoUtil from "leaflet-geometryutil";

	import { showWaves, showWind, showTemp } from "./stores.js";
	import { element } from "svelte/internal";

	let map;

	const waveColor = "#0000cd";
	const windColor = "#04aa6d";
	const tempColor = "#b91c1c";

	const firstProjection =
		'PROJCS["ETRS89_UTM_zone_31N",GEOGCS["GCS_ETRS_1989",DATUM["D_ETRS_1989",SPHEROID["GRS_1980",6378137,298.257222101]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",3],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["Meter",1]]';

	const initialView = [52.440525, 5.394671];
	function createMap(container) {
		let m = L.map(container, { preferCanvas: true }).setView(
			initialView,
			7
		);
		L.tileLayer(
			"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
			{
				attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,
	        &copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`,
				subdomains: "abcd",
				maxZoom: 14,
			}
		).addTo(m);

		return m;
	}

	let toolbar = L.control({ position: "bottomleft" });
	let toolbarComponent;
	toolbar.onAdd = (map) => {
		let div = L.DomUtil.create("div");
		toolbarComponent = new MapToolbar({
			target: div,
			props: {},
		});

		toolbarComponent.$on("click-eye", ({ detail }) => showWind.set(detail));
		toolbarComponent.$on("click-lines", ({ detail }) =>
			showWaves.set(detail)
		);
		// toolbarComponent.$on("click-temp", ({ detail }) =>
		// 	console.log("test")
		// );
		toolbarComponent.$on("click-reset", () => {
			map.setView(initialView, 5, { animate: true });
		});

		return div;
	};

	toolbar.onRemove = () => {
		if (toolbarComponent) {
			toolbarComponent.$destroy();
			toolbarComponent = null;
		}
	};

	function bindPopup(marker, createFn) {
		let popupComponent;
		marker.bindPopup(() => {
			let container = L.DomUtil.create("div");
			popupComponent = createFn(container);
			return container;
		});

		marker.on("popupclose", () => {
			if (popupComponent) {
				let old = popupComponent;
				popupComponent = null;
				// Wait to destroy until after the fadeout completes.
				setTimeout(() => {
					old.$destroy();
				}, 500);
			}
		});
	}

	function createMarker(color, location) {
		let html = `
		<div class="map-marker">
			<div>
				<svg width="49.17" height="49.17">
					<defs>
						<marker id="ffffff ${color}" markerWidth="12.2925" markerHeight="12.2925" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" style="fill: #ffa461;">
						<path d="M0, 0.2 L0.7, 1 L1, 1.5 L1.4, 3 L1, 4.5 L0.7, 5 L0, 5.8 L4, 3 z"></path>
						</marker>
					</defs>
					<circle r="12.2925" cx="24.585" cy="24.585" style="stroke-width: 2.4585;
						fill: #ffffff;
						stroke: ${color};"></circle>
					<text text-anchor="middle" dy="0.3em" x="24.585" y="24.585" style="/*font-family: Verdana;
						font-size: 0.8em;*/
						fill: ${color};">${location.properties.measurements[0].latestValue}</text>
				</svg>
			</div>
			<div class="marker-text"></div>
			</div>`;

		let icon = L.divIcon({
			html,
			className: "map-marker",
		});

		icon.measurements = location.properties.measurements;

		return L.marker(location.geometry.coordinates.reverse(), {
			icon,
		}).addTo(map).bindPopup(`
		<div>${location.properties.name}</div> 
				<table>
  <tr>
    <th>latestValue</th>
    <th>dateTime</th>
  </tr>
  
  <tr>
    <td>${location.properties.measurements[0].latestValue}</td>
    <td>${location.properties.measurements[0].dateTime}</td>
  </tr>

				`);
	}

	let windLayer;
	let waveLayer;
	let tempLayer;

	let wavePolyLine = new L.polyline([], {
		color: waveColor,
	});

	let windPolyLine = new L.polyline([], {
		color: windColor,
	});

	let tempPolyLine = new L.polyline([], {
		color: tempColor,
	});

	var latlng = L.latLng(52.456054, 4.558415);

	function filterMerge(array1, array2) {
		array1.find((element) => {
			for (let i = 0; i < array2.length; i++) {
				if (
					element.properties.locationCode ==
					array2[i].properties.locationCode
				) {
					element.properties.measurements.push(
						array2[i].properties.measurements[0]
					);
				}
			}
		});
		return array1;
	}

	async function mapAction(container) {
		map = createMap(container);
		map.doubleClickZoom.disable();

		toolbar.addTo(map);

		wavePolyLine.addTo(map);
		windPolyLine.addTo(map);
		tempPolyLine.addTo(map);

		let closestWaveMeasure;
		let closestWindMeasure;
		let closestTempMeasure;

		windLayer = L.layerGroup();
		waveLayer = L.layerGroup();
		tempLayer = L.layerGroup();

		// Fetch data from the API
		let windData = await network.getData(
			"?parameterIds=Windsnelheid___20Lucht___20t.o.v.___20Mean___20Sea___20Level___20in___20m___2Fs&parameterIds=Windrichting___20Lucht___20t.o.v.___20ware___20Noorden___20in___20graad&parameterIds=Windsnelheid___20Lucht___20t.o.v.___20Mean___20Sea___20Level___20in___20m___2Fs"
		);

		let waveData = await network.getData("?parameterid=golfhoogte");

		let wavePeriodData = await network.getData(
			"?parameterIds=Gem.___20golfperiode___20langste___201___2F3___20deel___20v.d.___20golven___20(tijdsdomein)___20Oppervlaktewater___20s&parameterIds=Gem.___20golfperiode___20langste___201___2F3___20deel___20v.d.___20golven___20(tijdsdomein)___20Oppervlaktewater___20s"
		);

		let tempData = await network.getData(
			"?parameterids=Temperatuur___20Oppervlaktewater___20oC"
		);

		const filtered = filterMerge(
			waveData.features,
			wavePeriodData.features
		);

		// Create intial marker
		var marker = new L.marker(latlng, {
			draggable: "true",
			autoPan: true,
		});

		// Create wind markers
		for (let location of windData.features) {
			location.geometry.coordinates = proj4(
				firstProjection,
				"EPSG:4326",
				location.geometry.coordinates
			);

			let m = createMarker(windColor, location);
			windLayer.addLayer(m);
		}

		// Create wave markers
		for (let location of filtered) {
			location.geometry.coordinates = proj4(
				firstProjection,
				"EPSG:4326",
				location.geometry.coordinates
			);

			let m = createMarker(waveColor, location);
			waveLayer.addLayer(m);
		}

		// Create temp markers
		for (let location of tempData.features) {
			location.geometry.coordinates = proj4(
				firstProjection,
				"EPSG:4326",
				location.geometry.coordinates
			);

			let m = createMarker(tempColor, location);
			tempLayer.addLayer(m);
		}

		marker.on("move", function (e) {
			closestWaveMeasure = GeoUtil.closestLayer(
				map,
				waveLayer.getLayers(),
				e.latlng
			);

			wavePolyLine = wavePolyLine.setLatLngs([
				closestWaveMeasure.latlng,
				e.latlng,
			]);

			closestWindMeasure = GeoUtil.closestLayer(
				map,
				windLayer.getLayers(),
				e.latlng
			);

			windPolyLine = windPolyLine.setLatLngs([
				closestWindMeasure.latlng,
				e.latlng,
			]);

			closestTempMeasure = GeoUtil.closestLayer(
				map,
				tempLayer.getLayers(),
				e.latlng
			);

			tempPolyLine = tempPolyLine.setLatLngs([
				closestTempMeasure.latlng,
				e.latlng,
			]);
		});

		marker.on("dragend", function (e) {
			openModal(Modal, {
				title: `IJmuiden aan zee`,
				message: "This is an alert",
				temp: closestTempMeasure.layer.options.icon.measurements,
				wind: closestWindMeasure.layer.options.icon.measurements,
				wave: closestWaveMeasure.layer.options.icon.measurements,
				onCloseModel: () => {
					closeModal();
					console.log("closed");
				},
			});
		});

		marker.on("dragstart", function () {
			closeModal();
		});

		map.addLayer(marker);

		return {
			destroy: () => {
				toolbar.remove();
				map.remove();
				map = null;
			},
		};
	}

	$: if (windLayer && map) {
		if ($showWind) {
			setWindPolyLineVisibility(true);
			windLayer.addTo(map);
		} else {
			setWindPolyLineVisibility(false);
			windLayer.remove();
		}
	}

	$: if (waveLayer && map) {
		if ($showWaves) {
			setWavePolyLineVisibility(true);
			waveLayer.addTo(map);
		} else {
			setWavePolyLineVisibility(false);
			waveLayer.remove();
		}
	}

	$: if (tempLayer && map) {
		if ($showTemp) {
			setTempPolyLineVisibility(true);
			tempLayer.addTo(map);
		} else {
			setTempPolyLineVisibility(false);
			tempLayer.remove();
		}
	}

	function setWavePolyLineVisibility(visibility) {
		visibility ? wavePolyLine.addTo(map) : wavePolyLine.remove(map);
	}

	function setWindPolyLineVisibility(visibility) {
		visibility ? windPolyLine.addTo(map) : windPolyLine.remove(map);
	}

	function setTempPolyLineVisibility(visibility) {
		visibility ? tempPolyLine.addTo(map) : tempPolyLine.remove(map);
	}

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}
</script>

<svelte:window on:resize={resizeMap} />

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<link
	rel="stylesheet"
	href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
	integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
	crossorigin=""
/>

<div class="map" style="height:100%;width:100%" use:mapAction>
	<Modals>
		<div slot="backdrop" class="backdrop" />
	</Modals>
</div>

<style>
	.map :global(.marker-text) {
		width: 100%;
		text-align: center;
		font-weight: 600;
		background-color: #444;
		color: #eee;
		border-radius: 0.5rem;
	}

	.map :global(.map-marker) {
		width: 30px;
		transform: translateX(-50%) translateY(-25%);
	}
</style>
