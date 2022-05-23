import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import io from "socket.io-client";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken =
  "pk.eyJ1IjoianVhbnNlYmFzdGlhbjI4IiwiYSI6ImNraDllZ3NpMDBpb2wyc3FpazE4dTl2bzAifQ.Hl0cvQVf_0jP-LEOFcGUWQ";

export const Map = ({ coords }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-75.6946);
  const [lat, setLat] = useState(4.81321);
  const [zoom, setZoom] = useState(12);
  const markerDriver = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8080`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    buildMap();
  });

  useEffect(() => {
    if (coords.length && socket) {
      drawCoords(coords);
      socket.on("position", ({ coords }) => {
        console.log("Coords:", coords);
        addMarker(coords);
      });
    }
  }, [coords, socket]);

  const buildMap = () => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom,
    });
    map.current.addControl(new mapboxgl.FullscreenControl());
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
          "line-color": "gray",
          "line-width": 5,
        },
      });

      map.current.fitBounds([coords[0], coords[coords.length - 1]], {
        padding: 100,
      });

      socket.emit("find-driver", { points: coords });
      console.log(socket);
    });
  };

  const addMarker = (coords) => {
    const marker = new mapboxgl.Marker({ color: "black", rotation: 45 });
    if (!markerDriver.current) {
      markerDriver.current = marker;
    } else {
      markerDriver.current.setLngLat(coords).addTo(map.current);
    }
  };

  return <div ref={mapContainer} className="map-container" />;
};
