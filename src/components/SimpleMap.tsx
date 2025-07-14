import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Hotel {
  id: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  price: number;
  location: string;
  website?: string;
  amenities?: string[];
}

interface TouristSpot {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface SimpleMapProps {
  hotels: Hotel[];
  touristSpots: TouristSpot[];
  route?: Array<Array<[number, number]>>;
}

const colorPalette = [
  'blue', 'red', 'green', 'orange', 'purple', 'brown', 'magenta', 'teal', 'gold', 'pink'
];

const SimpleMap: React.FC<SimpleMapProps> = ({ hotels, touristSpots, route }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Ensure Leaflet is properly initialized
    if (typeof window !== 'undefined') {
      // Fix for default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    }
  }, []);

  const whenCreated = (map: L.Map) => {
    mapRef.current = map;
    // Force the map to be interactive
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
  };

  return (
    <div 
      style={{ 
        height: '500px', 
        width: '100%', 
        border: '2px solid #ccc', 
        borderRadius: '8px', 
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'auto',
        cursor: 'grab'
      }}
      onMouseDown={(e) => {
        // Ensure the map container gets focus
        e.currentTarget.focus();
      }}
    >
      <MapContainer 
        center={[10.0889, 77.0622]} // Munnar center
        zoom={11} 
        style={{ 
          height: '100%', 
          width: '100%',
          zIndex: 1,
          position: 'relative',
          cursor: 'grab'
        }}
        whenCreated={whenCreated}
        zoomControl={true}
        dragging={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        touchZoom={true}
        boxZoom={true}
        keyboard={true}
        attributionControl={true}
        tap={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {route && route.length > 0 && route.map((coords, idx) => (
          <>
            <FitBoundsOnRoute key={idx} route={coords} />
            <Polyline key={idx} positions={coords} color={colorPalette[idx % colorPalette.length]} weight={5} />
          </>
        ))}
        
        {/* Tourist Spots Markers */}
        {touristSpots.map((spot) => (
          <Marker 
            key={`spot-${spot.id}`} 
            position={[spot.lat, spot.lng]}
            icon={new L.Icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              shadowSize: [41, 41]
            })}
          >
            <Popup>
              <div>
                <h3>🏔️ {spot.name}</h3>
                <p>Tourist Spot</p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Hotel Markers */}
        {hotels.map((hotel) => (
          <Marker 
            key={`hotel-${hotel.id}`} 
            position={[hotel.lat, hotel.lng]}
            icon={new L.Icon({
              iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              shadowSize: [41, 41]
            })}
          >
            <Popup>
              <div>
                <h3>🏨 {hotel.name}</h3>
                <p><strong>Rating:</strong> {'⭐'.repeat(Math.floor(hotel.rating))} {hotel.rating}</p>
                <p><strong>Price:</strong> ₹{hotel.price}/night</p>
                <p><strong>Location:</strong> {hotel.location}</p>
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <p><strong>Amenities:</strong> {hotel.amenities.slice(0, 3).join(', ')}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const FitBoundsOnRoute: React.FC<{ route: Array<[number, number]> }> = ({ route }) => {
  const map = useMap();
  useEffect(() => {
    if (route && route.length > 0) {
      map.fitBounds(route);
    }
  }, [route, map]);
  return null;
};

export default SimpleMap; 