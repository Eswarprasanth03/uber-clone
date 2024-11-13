import React, { useCallback, useContext, useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: `${window.innerWidth * 0.45}px`,
  };

  const initialCenter = {
    lat: 16.4971,
    lng: 80.4992,
  };

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(initialCenter);
  const [directionRoutePoints, setDirectionRoutePoints] = useState(null);

  useEffect(() => {
    if (source && source.lat && source.lng && map) {
      const newCenter = {
        lat: parseFloat(source.lat),
        lng: parseFloat(source.lng),
      };

      if (isFinite(newCenter.lat) && isFinite(newCenter.lng)) {
        setCenter(newCenter);
        map.panTo(newCenter);
      } else {
        console.error("Invalid source coordinates: lat and lng must be finite numbers");
      }
    }
    if (source && destination) {
      directionRoute();
    }
  }, [source, map]);

  useEffect(() => {
    if (destination && destination.lat && destination.lng && map) {
      const destinationLocation = {
        lat: parseFloat(destination.lat),
        lng: parseFloat(destination.lng),
      };

      if (isFinite(destinationLocation.lat) && isFinite(destinationLocation.lng)) {
        map.panTo(destinationLocation);
      } else {
        console.error("Invalid destination coordinates: lat and lng must be finite numbers");
      }
    }
    if (source && destination) {
      directionRoute();
    }
  }, [destination, map]);

  const directionRoute = () => {
    // Ensure both source and destination have valid coordinates
    if (
      source && destination &&
      isFinite(source.lat) && isFinite(source.lng) &&
      isFinite(destination.lat) && isFinite(destination.lng)
    ) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: source.lat, lng: source.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') { // Corrected to use string 'OK' instead of google.maps.DirectionsStatus.OK
            setDirectionRoutePoints(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    } else {
      console.error("Invalid source or destination coordinates for routing");
    }
  };

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []); 

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: 'f0a2aca74fc0846d' }}
    >
      {source && source.lat && source.lng && (
        <>
          <MarkerF 
            position={{ lat: source.lat, lng: source.lng }}
            icon={{
              url: '/s.png',
              scaledSize: { width: 20, height: 20 },
            }}
          />
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{
              color: '#333',
              fontWeight: 'bold',
            }}>
              <p>{source.label}</p>
            </div>
          </OverlayView>
        </>
      )}
      
      {destination && destination.lat && destination.lng && (
        <>
          <MarkerF 
            position={{ lat: destination.lat, lng: destination.lng }}
            icon={{
              url: '/destination1.png',
              scaledSize: { width: 20, height: 20 },
            }}
          />
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{
              color: '#333',
              fontWeight: 'bold',
            }}>
              <p>Destination</p>
            </div>
          </OverlayView>
        </>
      )}
      
      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
              strokeColor: 'red', // Set the route color to red
            },
            suppressMarkers: true, // Hides default markers if custom markers are used
          }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
