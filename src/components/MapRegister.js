import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;


mapboxgl.accessToken =
  "pk.eyJ1IjoianVhbnNlYmFzdGlhbjI4IiwiYSI6ImNraDllZ3NpMDBpb2wyc3FpazE4dTl2bzAifQ.Hl0cvQVf_0jP-LEOFcGUWQ";

export const MapRegister = ({ handleCoords, previousCoords }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-75.6946);
  const [lat, setLat] = useState(4.81321);
  const [zoom, setZoom] = useState(12);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    buildMap();
  });

  useEffect(() => {
    handleCoords(coords);
  }, [coords, handleCoords]);

  const buildMap = () => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.current.addControl(geocoder, "top-left");
    map.current.addControl(new mapboxgl.FullscreenControl());

    const geojson = {
      type: "FeatureCollection",
      features: [],
    };

    const linestring = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [],
      },
    };

    if (previousCoords.length) {
      previousCoords.forEach((coords) => {
        const point = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [coords[0], coords[1]],
          },
          properties: {
            id: String(new Date().getTime()),
          },
        };
        const pixelCoords = map.current.project([coords[0], coords[1]]);

        map.current.queryRenderedFeatures(pixelCoords, {
          layers: ["measure-points"],
        });

        geojson.features.push(point);
      });
      const foundCoords = geojson.features.map(
        (feature) => feature.geometry.coordinates
      );
      setCoords(foundCoords);

      if (geojson.features.length > 1) {
        linestring.geometry.coordinates = geojson.features.map(
          (point) => point.geometry.coordinates
        );
        geojson.features.push(linestring);
      }
    }

    map.current.on("load", () => {
      map.current.addSource("geojson", {
        type: "geojson",
        data: geojson,
      });

      map.current.addLayer({
        id: "measure-points",
        type: "circle",
        source: "geojson",
        paint: {
          "circle-radius": 5,
          "circle-color": "#000",
        },
        filter: ["in", "$type", "Point"],
      });

      map.current.addLayer({
        id: "measure-lines",
        type: "line",
        source: "geojson",
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#000",
          "line-width": 2.5,
        },
        filter: ["in", "$type", "LineString"],
      });

      map.current.on("click", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["measure-points"],
        });

        if (geojson.features.length > 1) geojson.features.pop();

        if (features.length) {
          const id = features[0].properties.id;
          geojson.features = geojson.features.filter(
            (point) => point.properties.id !== id
          );
        } else {
          const point = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.lngLat.lng, e.lngLat.lat],
            },
            properties: {
              id: String(new Date().getTime()),
            },
          };

          geojson.features.push(point);
        }

        if (geojson.features.length > 1) {
          linestring.geometry.coordinates = geojson.features.map(
            (point) => point.geometry.coordinates
          );

          geojson.features.push(linestring);
        }
        const foundCoords = geojson.features.map(
          (feature) => feature.geometry.coordinates
        );
        setCoords(foundCoords[foundCoords.length - 1]);
        map.current.getSource("geojson").setData(geojson);
      });
    });

    map.current.on("mousemove", (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["measure-points"],
      });

      map.current.getCanvas().style.cursor = features.length
        ? "pointer"
        : "crosshair";
    });
  };

  return (
    <>
      <div ref={mapContainer} className="map-container" />
    </>
  );
};
