import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoianVhbnNlYmFzdGlhbjI4IiwiYSI6ImNraDllZ3NpMDBpb2wyc3FpazE4dTl2bzAifQ.Hl0cvQVf_0jP-LEOFcGUWQ";

export const MapRegister = ({ handleCoords, setOldCoords }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-75.6946);
  const [lat, setLat] = useState(4.81321);
  const [zoom, setZoom] = useState(12);
  const [markersRefs, setMarkersRefs] = useState([]);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    buildMap();
  }, []);

  useEffect(() => {
    const newCoords = [];
    markersRefs.forEach((element) => {
      const lngLat = element.getLngLat();
      newCoords.push([lngLat.lng, lngLat.lat]);
      element.on("dragend", onDragEnd);
    });
    setCoords([...coords, ...newCoords]);
  }, [markersRefs]);

  useEffect(() => {
    handleSetOldCoords(setOldCoords);
  }, []);

  useEffect(() => {
    handleCoords(coords);
    drawCoords();
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

    map.current.addControl(geocoder, "top-left");
  };

  const onDragEnd = () => {
    const newCoords = [];
    markersRefs.forEach((element) => {
      const lngLat = element.getLngLat();
      newCoords.push([lngLat.lng, lngLat.lat]);
    });
    setCoords([...coords, ...newCoords]);
  };

  const handleSetOldCoords = (oldCoords) => {
    oldCoords.map((coord) => {
      addMaker(coord[0], coord[1]);
    });
    setCoords(oldCoords);
  }

  const addNewMaker = () => {
    const marker = new mapboxgl.Marker({
      draggable: true,
    });
    marker.setLngLat([lng, lat]).addTo(map.current);
    setMarkersRefs([...markersRefs, marker]);
  };

  const addMaker = (lng, lat) => {
    const marker = new mapboxgl.Marker({
      draggable: false,
    });
    marker.setLngLat([lng, lat]).addTo(map.current);
    setMarkersRefs([...markersRefs, marker]);
  };

  const drawCoords = () => {
    if (map.current.getLayer('route')) map.current.removeLayer('route');
    if (map.current.getSource('route')) map.current.removeSource('route');
    console.log(coords)
    if (coords.length) {
      map.current.once("data", () => {
        map.current.addSource("route", {
          type: "geojson",
          lineMetrics: true,
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
    }
  };

  return (
    <>
      <Button style={{ margin: "1rem 0" }} onClick={addNewMaker}>
        Agregar nuevo marcador
      </Button>
      <div ref={mapContainer} className="map-container" />
    </>
  );
};
