import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { getCoords } from "../actions/map";

mapboxgl.accessToken =
  "pk.eyJ1IjoianVhbnNlYmFzdGlhbjI4IiwiYSI6ImNraDllZ3NpMDBpb2wyc3FpazE4dTl2bzAifQ.Hl0cvQVf_0jP-LEOFcGUWQ";

export const Map = () => {
  const dispatch = useDispatch();
  const { coords } = useSelector((state) => state.map);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-75.6946);
  const [lat, setLat] = useState(4.81321);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    loadCoords();
  }, []);

  useEffect(() => {
    if (coords.length) {
      buildMap();
      drawCoords(coords);
    }
  }, [coords]);

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
    // geocoder.on("result", (event) => {
    //   console.log(event);
    //   const { result } = event;
    //   geocoder.clear();
    // });

    map.current.addControl(geocoder);
  };

  const drawCoords = (coords) => {
    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coords,
          },
        },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "red",
          "line-width": 5,
        },
      });

      map.current.fitBounds([coords[0], coords[coords.length - 1]], {
        padding: 100,
      });
    });
  };

  const loadCoords = () => {
    const coords = [
      [-75.6946, 4.81321],
      [-75.7149711, 4.8362411],
    ];
    dispatch(getCoords({ coords, mapboxgl }));
  };

  return <div ref={mapContainer} className="map-container" />;
};
