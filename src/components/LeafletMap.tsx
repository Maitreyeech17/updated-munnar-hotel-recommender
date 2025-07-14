import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

interface LeafletMapProps {
  hotels: Hotel[];
  touristSpots: TouristSpot[];
  center?: [number, number];
  zoom?: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ 
  hotels, 
  touristSpots, 
  center = [10.0889, 77.0622], // Munnar center
  zoom = 12 
}) => {
  return (
    <div style={{ height: '500px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Hotel Markers */}
        {hotels.map((hotel) => (
          <Marker 
            key={`hotel-${hotel.id}`} 
            position={[hotel.lat, hotel.lng]}
            icon={L.divIcon({
              className: 'custom-marker hotel-marker',
              html: '🏨',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>{hotel.name}</h4>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Rating:</strong> {'⭐'.repeat(Math.floor(hotel.rating))} {hotel.rating}
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Price:</strong> ₹{hotel.price}/night
                </p>
                <p style={{ margin: '4px 0', fontSize: '14px' }}>
                  <strong>Location:</strong> {hotel.location}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Tourist Spot Markers */}
        {touristSpots.map((spot) => (
          <Marker 
            key={`spot-${spot.id}`} 
            position={[spot.lat, spot.lng]}
            icon={L.divIcon({
              className: 'custom-marker spot-marker',
              html: '🏞️',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })}
          >
            <Popup>
              <div style={{ minWidth: '150px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#2c3e50' }}>{spot.name}</h4>
                <p style={{ margin: '4px 0', fontSize: '14px', color: '#7f8c8d' }}>
                  Tourist Attraction
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap; 