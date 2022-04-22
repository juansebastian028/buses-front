import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoianVhbnNlYmFzdGlhbjI4IiwiYSI6ImNraDllZ3NpMDBpb2wyc3FpazE4dTl2bzAifQ.Hl0cvQVf_0jP-LEOFcGUWQ";

export const MapRegister = ({ handleCoords }) => {
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
    const coords = [];
    markersRefs.forEach((element) => {
      const lngLat = element.getLngLat();
      coords.push([lngLat.lng, lngLat.lat]);
      element.on("dragend", onDragEnd);
    });
    setCoords(coords);
  }, [markersRefs]);

  useEffect(() => {
    handleCoords(coords);
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
    const coords = [];
    markersRefs.forEach((element) => {
      const lngLat = element.getLngLat();
      coords.push([lngLat.lng, lngLat.lat]);
    });
    setCoords(coords);
  };

  const addNewMaker = () => {
    const marker = new mapboxgl.Marker({
      draggable: true,
    });
    marker.setLngLat([lng, lat]).addTo(map.current);
    setMarkersRefs([...markersRefs, marker]);
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
