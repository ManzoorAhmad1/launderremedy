"use client";

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
const GoogleMap: React.FC<any> = ({
  center,
  zoom = 14,
  marker,
  onClick,
  onLoad,
  options = {},
  style = {},
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.Marker | null>(null);
  const clickListener = useRef<google.maps.MapsEventListener | null>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const loader:any= new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
        libraries: ['places'],
      });

      try {
        await loader.load();
        
        const mapOptions: google.maps.MapOptions = {
          center,
          zoom,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          ...options,
        };

        const map = new google.maps.Map(mapRef.current, mapOptions);
        mapInstance.current = map;

        if (onLoad) {
          onLoad(map);
        }

        // Add click listener
        if (onClick) {
          clickListener.current = map.addListener('click', (event: google.maps.MapMouseEvent) => {
            const lat = event.latLng?.lat() || 0;
            const lng = event.latLng?.lng() || 0;
            
            // Get place ID for the clicked location
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              { location: { lat, lng } },
              (results, status) => {
                if (status === 'OK' && results?.[0]) {
                  onClick({
                    lat,
                    lng,
                    placeId: results[0].place_id,
                  });
                } else {
                  onClick({ lat, lng });
                }
              }
            );
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();

    return () => {
      if (clickListener.current) {
        google.maps.event.removeListener(clickListener.current);
      }
      if (markerInstance.current) {
        markerInstance.current.setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setCenter(center);
      mapInstance.current.setZoom(zoom);
    }
  }, [center, zoom]);

  useEffect(() => {
    if (!mapInstance.current) return;

    // Clear existing marker
    if (markerInstance.current) {
      markerInstance.current.setMap(null);
    }

    // Add new marker if provided
    if (marker) {
      markerInstance.current = new google.maps.Marker({
        position: marker,
        map: mapInstance.current,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#41154c', // Your primary color
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        },
        title: 'Selected Location',
      });

      // Center map on marker
      mapInstance.current.setCenter(marker);
    }
  }, [marker]);

  return (
    <div
      ref={mapRef}
      style={style}
      className={`rounded-xl overflow-hidden ${className}`}
    />
  );
};

export default GoogleMap;